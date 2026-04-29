/**
 * Automated accessibility check for kanji.insomnius.dev.
 *
 * Spawns `vite preview` against `dist/`, drives Chromium via Playwright,
 * runs axe-core (WCAG 2.1 AA) on every meaningful route, and prints a
 * grouped report. Exits non-zero on critical/serious violations so it can
 * be wired into CI.
 *
 * Usage:
 *   bun run a11y           — checks the default route set
 *   bun run a11y -- --all  — also samples per-character pages
 */

import { spawn, type ChildProcess } from "node:child_process"
import { setTimeout as wait } from "node:timers/promises"
import { chromium, type Page } from "playwright"
import AxeBuilder from "@axe-core/playwright"

const PREVIEW_PORT = 4173
const PREVIEW_URL = `http://localhost:${PREVIEW_PORT}`

interface RouteSpec {
  path: string
  name: string
  /** Selector that must appear before axe runs — guards against measuring a half-rendered SPA. */
  ready?: string
}

const STATIC_ROUTES: RouteSpec[] = [
  { path: "/", name: "Landing", ready: "main h1" },
  { path: "/quiz", name: "Kanji + Vocab quiz", ready: "main h1" },
  { path: "/kana-quiz", name: "Kana quiz", ready: "main h1" },
  { path: "/draw", name: "Draw / stroke practice", ready: "main h1" },
  { path: "/kana-write", name: "Kana write / practice", ready: "main h1" },
  { path: "/kana-write-quiz", name: "Kana write quiz", ready: "main h1" },
  { path: "/review", name: "Flashcard review", ready: "main h1" },
  { path: "/draw-search", name: "Find by drawing", ready: "main h1" },
  { path: "/kanji-list", name: "Kanji list", ready: "main h1" },
  { path: "/vocab-list", name: "Vocab list", ready: "main h1" },
  { path: "/kana-reference", name: "Kana reference", ready: "main h1" },
  { path: "/profile", name: "Profile", ready: "main h1" },
  { path: "/history", name: "History", ready: "main h1" },
  { path: "/share", name: "Public share card", ready: "main h1" },
  { path: "/credits", name: "Credits", ready: "main h1" },
]

// A small per-character sample so we exercise the dynamic head() / JSON-LD paths
const DYNAMIC_SAMPLE: RouteSpec[] = [
  { path: "/kanji/" + encodeURIComponent("一"), name: "Kanji detail (一)", ready: "main" },
  { path: "/vocab/" + encodeURIComponent("学生"), name: "Vocab detail (学生)", ready: "main" },
  { path: "/kana/" + encodeURIComponent("あ"), name: "Kana detail (あ)", ready: "main" },
]

const COLOR = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
}

const impactColor = (impact: string | null | undefined) => {
  switch (impact) {
    case "critical":
      return COLOR.red + COLOR.bold
    case "serious":
      return COLOR.red
    case "moderate":
      return COLOR.yellow
    case "minor":
      return COLOR.cyan
    default:
      return COLOR.dim
  }
}

async function startPreview(): Promise<ChildProcess> {
  const child = spawn("bun", ["run", "preview", "--", "--port", String(PREVIEW_PORT), "--strictPort"], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, FORCE_COLOR: "0" },
  })
  child.stdout?.on("data", () => { /* swallow */ })
  child.stderr?.on("data", () => { /* swallow */ })

  // Poll until the server answers
  const deadline = Date.now() + 30_000
  while (Date.now() < deadline) {
    try {
      const res = await fetch(PREVIEW_URL + "/", { method: "HEAD" })
      if (res.ok || res.status === 404) return child
    } catch {
      // not ready yet
    }
    await wait(250)
  }
  child.kill("SIGTERM")
  throw new Error("vite preview didn't come up within 30s")
}

interface RouteReport {
  route: RouteSpec
  violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"]
  passCount: number
}

async function checkRoute(page: Page, route: RouteSpec): Promise<RouteReport> {
  await page.goto(PREVIEW_URL + route.path, { waitUntil: "networkidle" })
  if (route.ready) {
    try {
      await page.waitForSelector(route.ready, { timeout: 8_000 })
    } catch {
      // Continue anyway — axe will still report what it sees
    }
  }
  const builder = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
  const results = await builder.analyze()
  return { route, violations: results.violations, passCount: results.passes.length }
}

function printReport(reports: RouteReport[]) {
  console.log()
  console.log(COLOR.bold + "=== Accessibility report ===" + COLOR.reset)
  console.log()

  let critical = 0
  let serious = 0
  let moderate = 0
  let minor = 0
  let totalViolations = 0
  let totalPasses = 0

  for (const report of reports) {
    totalPasses += report.passCount
    if (report.violations.length === 0) {
      console.log(`${COLOR.green}✓${COLOR.reset} ${report.route.name} ${COLOR.dim}(${report.route.path}, ${report.passCount} checks passed)${COLOR.reset}`)
      continue
    }
    console.log(`${COLOR.red}✗${COLOR.reset} ${COLOR.bold}${report.route.name}${COLOR.reset} ${COLOR.dim}(${report.route.path})${COLOR.reset}`)
    for (const v of report.violations) {
      totalViolations += v.nodes.length
      switch (v.impact) {
        case "critical": critical += v.nodes.length; break
        case "serious": serious += v.nodes.length; break
        case "moderate": moderate += v.nodes.length; break
        case "minor": minor += v.nodes.length; break
      }
      const tint = impactColor(v.impact)
      console.log(`  ${tint}[${(v.impact ?? "info").toUpperCase()}]${COLOR.reset} ${v.id} — ${v.help}`)
      console.log(`    ${COLOR.dim}${v.helpUrl}${COLOR.reset}`)
      for (const node of v.nodes.slice(0, 3)) {
        const target = node.target.join(" ")
        console.log(`    ${COLOR.dim}↳${COLOR.reset} ${target}`)
        if (node.failureSummary) {
          for (const line of node.failureSummary.split("\n")) {
            if (line.trim()) console.log(`      ${COLOR.dim}${line.trim()}${COLOR.reset}`)
          }
        }
      }
      if (v.nodes.length > 3) {
        console.log(`    ${COLOR.dim}… and ${v.nodes.length - 3} more node${v.nodes.length - 3 === 1 ? "" : "s"}${COLOR.reset}`)
      }
    }
    console.log()
  }

  console.log(COLOR.bold + "Summary" + COLOR.reset)
  console.log(`  Routes checked     : ${reports.length}`)
  console.log(`  Total passes       : ${COLOR.green}${totalPasses}${COLOR.reset}`)
  console.log(`  Total violations   : ${totalViolations === 0 ? COLOR.green : COLOR.red}${totalViolations}${COLOR.reset}`)
  if (totalViolations > 0) {
    console.log(`    Critical : ${COLOR.red}${COLOR.bold}${critical}${COLOR.reset}`)
    console.log(`    Serious  : ${COLOR.red}${serious}${COLOR.reset}`)
    console.log(`    Moderate : ${COLOR.yellow}${moderate}${COLOR.reset}`)
    console.log(`    Minor    : ${COLOR.cyan}${minor}${COLOR.reset}`)
  }
  console.log()

  return { critical, serious, moderate, minor, totalViolations }
}

async function main() {
  const args = process.argv.slice(2)
  const includeAll = args.includes("--all")
  const routes = includeAll ? [...STATIC_ROUTES, ...DYNAMIC_SAMPLE] : STATIC_ROUTES

  console.log(`${COLOR.dim}Booting vite preview on ${PREVIEW_URL}…${COLOR.reset}`)
  const preview = await startPreview()

  let exitCode = 0
  try {
    const browser = await chromium.launch()
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "reduce",
      // Some axe checks measure the rendered DOM — run with a real user-agent locale.
      locale: "en-US",
    })
    const page = await context.newPage()

    const reports: RouteReport[] = []
    for (const route of routes) {
      process.stdout.write(`${COLOR.dim}→ checking ${route.path}…${COLOR.reset}\n`)
      try {
        reports.push(await checkRoute(page, route))
      } catch (err) {
        console.log(`${COLOR.red}✗ ${route.name} failed to load: ${err instanceof Error ? err.message : String(err)}${COLOR.reset}`)
        exitCode = 1
      }
    }
    await browser.close()

    const summary = printReport(reports)
    if (summary.critical > 0 || summary.serious > 0) {
      exitCode = 1
    }
  } finally {
    preview.kill("SIGTERM")
  }

  process.exit(exitCode)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
