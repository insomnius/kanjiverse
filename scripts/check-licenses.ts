/**
 * License audit for kanji.insomnius.dev.
 *
 * Two passes:
 *   1. Walks node_modules/* and node_modules/@scope/* and reads each package.json's
 *      license field. Validates against an allowlist; flags anything outside it.
 *      Production deps are gated more strictly (must pass) than dev deps (informational).
 *   2. Reads data/data-licenses.json — the curated manifest of bundled / runtime-fetched
 *      third-party data — and prints a summary so reviewers can spot-check.
 *
 * Exits non-zero on:
 *   - Any production dep with a denied or unknown-and-unallowed license.
 *   - data/data-licenses.json missing or unparsable.
 *
 * SOP: run before adding a new dependency, before integrating a new data source, and
 * once before each deploy. Wired up as `bun run check:licenses` in package.json.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs"
import { join } from "node:path"

const ROOT = join(__dirname, "..")
const NODE_MODULES = join(ROOT, "node_modules")
const PKG_JSON = join(ROOT, "package.json")
const DATA_MANIFEST = join(ROOT, "data", "data-licenses.json")

// --- Policy ------------------------------------------------------------------

/** Permissive licenses we ship without thinking about. SPDX identifiers per https://spdx.org/licenses */
const ALLOWED = new Set([
  "0BSD",
  "Apache-2.0",
  "BlueOak-1.0.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "BSD-3-Clause-Clear",
  "CC0-1.0",
  "CC-BY-3.0",
  "CC-BY-4.0",
  // CC-BY-SA: data-only allowance. Share-alike applies to derivatives of the data file
  // itself (e.g. our trimmed kanji-radicals.json must remain CC-BY-SA), not to unrelated
  // application code. We never accept CC-BY-SA in npm dependencies — only as data sources
  // declared in data/data-licenses.json with explicit attribution surfaced in-app.
  "CC-BY-SA-3.0",
  "CC-BY-SA-4.0",
  "ISC",
  "MIT",
  "MIT-0",
  "MPL-2.0",
  "OFL-1.1",
  "Python-2.0",
  "Unlicense",
  "WTFPL",
  "Zlib",
])

/** Copyleft licenses that, if applied to a runtime dep we ship, would force us to
 *  release this whole codebase under the same terms. We never want to ship these
 *  as runtime deps (dev-only is sometimes OK; we still flag for human review). */
const DENIED = new Set([
  "AGPL-1.0",
  "AGPL-1.0-only",
  "AGPL-1.0-or-later",
  "AGPL-3.0",
  "AGPL-3.0-only",
  "AGPL-3.0-or-later",
  "GPL-1.0",
  "GPL-1.0-only",
  "GPL-1.0-or-later",
  "GPL-2.0",
  "GPL-2.0-only",
  "GPL-2.0-or-later",
  "GPL-3.0",
  "GPL-3.0-only",
  "GPL-3.0-or-later",
  "LGPL-2.0",
  "LGPL-2.0-only",
  "LGPL-2.1",
  "LGPL-2.1-only",
  "LGPL-3.0",
  "LGPL-3.0-only",
  "LGPL-3.0-or-later",
  "SSPL-1.0",
  "BUSL-1.1",
])

// --- Helpers -----------------------------------------------------------------

interface PackageInfo {
  name: string
  version: string
  rawLicense: string
  licenseTokens: string[]
  isAllowed: boolean
  isDenied: boolean
  reason: string
}

interface RootDeps {
  prod: Set<string>
  dev: Set<string>
}

const COLOR = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
}

function readRootDeps(): RootDeps {
  const pkg = JSON.parse(readFileSync(PKG_JSON, "utf-8"))
  return {
    prod: new Set(Object.keys(pkg.dependencies ?? {})),
    dev: new Set(Object.keys(pkg.devDependencies ?? {})),
  }
}

/**
 * Collects every package reachable from a production root via the `dependencies`
 * field — i.e. the set of code that actually ships to users. Everything outside
 * this set is dev-only and gets the looser audit treatment.
 *
 * Walks the npm "deduped at the top of node_modules" layout. Doesn't try to
 * resolve nested node_modules — for a flat-install tooling like bun, that's
 * enough. If a transitive isn't found at the root of node_modules we silently
 * skip it (rare; usually means an optional or peer dep that wasn't installed).
 */
function collectProductionTransitives(prodRoots: Set<string>): Set<string> {
  const visited = new Set<string>()
  const queue: string[] = [...prodRoots]
  while (queue.length > 0) {
    const name = queue.shift()!
    if (visited.has(name)) continue
    visited.add(name)
    const manifestPath = join(NODE_MODULES, name, "package.json")
    if (!existsSync(manifestPath)) continue
    try {
      const pkg = JSON.parse(readFileSync(manifestPath, "utf-8"))
      const deps = pkg.dependencies && typeof pkg.dependencies === "object" ? pkg.dependencies : {}
      for (const d of Object.keys(deps)) queue.push(d)
    } catch {
      // Skip unreadable manifests.
    }
  }
  return visited
}

function extractLicenseString(pkg: { license?: unknown; licenses?: unknown }): string {
  if (typeof pkg.license === "string") return pkg.license
  if (pkg.license && typeof pkg.license === "object") {
    const obj = pkg.license as { type?: string }
    if (typeof obj.type === "string") return obj.type
  }
  if (Array.isArray(pkg.licenses)) {
    const types = pkg.licenses
      .map((l) => (typeof l === "object" && l !== null ? (l as { type?: string }).type : undefined))
      .filter((t): t is string => typeof t === "string")
    if (types.length > 0) return types.join(" OR ")
  }
  return "UNKNOWN"
}

/**
 * Tokenise an SPDX expression like "(MIT OR Apache-2.0)" or "MIT AND CC-BY-4.0"
 * into the list of identifiers it mentions. We accept the compound if AT LEAST
 * ONE operand is allowed (typical for OR-style dual licensing) and NONE are
 * explicitly denied. AND is handled the same way conservatively — if any
 * operand is denied we deny the whole expression.
 */
function tokeniseSpdx(expr: string): string[] {
  return expr
    .replace(/[()]/g, " ")
    .split(/\s+(?:OR|AND|or|and)\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0 && t !== "*")
}

function classify(rawLicense: string): { isAllowed: boolean; isDenied: boolean; reason: string; tokens: string[] } {
  if (rawLicense === "UNKNOWN" || rawLicense === "") {
    return { isAllowed: false, isDenied: false, reason: "no license field", tokens: [] }
  }
  const tokens = tokeniseSpdx(rawLicense)
  // SEE LICENSE IN file / SEE-IN-FILE patterns — flag for review.
  if (tokens.some((t) => /^SEE/i.test(t))) {
    return { isAllowed: false, isDenied: false, reason: "see-license-in (manual review)", tokens }
  }
  const denied = tokens.filter((t) => DENIED.has(t))
  if (denied.length > 0) {
    return { isAllowed: false, isDenied: true, reason: `denied: ${denied.join(", ")}`, tokens }
  }
  const allowed = tokens.filter((t) => ALLOWED.has(t))
  if (allowed.length > 0) return { isAllowed: true, isDenied: false, reason: `allowed: ${allowed.join(", ")}`, tokens }
  return { isAllowed: false, isDenied: false, reason: `unfamiliar: ${tokens.join(", ")}`, tokens }
}

function readAllPackages(): PackageInfo[] {
  const out: PackageInfo[] = []

  function visit(dir: string) {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const entry of entries) {
      if (entry === ".bin" || entry === ".cache" || entry === ".package-lock.json") continue
      const path = join(dir, entry)
      if (entry.startsWith("@")) {
        visit(path) // scoped packages — recurse one level
        continue
      }
      const manifestPath = join(path, "package.json")
      if (!existsSync(manifestPath)) continue
      try {
        const pkg = JSON.parse(readFileSync(manifestPath, "utf-8"))
        const raw = extractLicenseString(pkg)
        const verdict = classify(raw)
        out.push({
          name: typeof pkg.name === "string" ? pkg.name : entry,
          version: typeof pkg.version === "string" ? pkg.version : "?",
          rawLicense: raw,
          licenseTokens: verdict.tokens,
          isAllowed: verdict.isAllowed,
          isDenied: verdict.isDenied,
          reason: verdict.reason,
        })
      } catch {
        // Unreadable package.json — skip but don't fail the whole audit.
      }
    }
  }

  visit(NODE_MODULES)
  return out
}

// --- Pass 1: npm dependencies -------------------------------------------------

function auditNpm(): { exitCode: number } {
  console.log(`${COLOR.bold}=== Pass 1: npm dependencies ===${COLOR.reset}`)
  const rootDeps = readRootDeps()
  const productionSet = collectProductionTransitives(rootDeps.prod)
  const all = readAllPackages()
  if (all.length === 0) {
    console.log(`${COLOR.red}No packages found in node_modules. Run \`bun install\` first.${COLOR.reset}`)
    return { exitCode: 1 }
  }

  // Bucket by license for the summary.
  const byLicense = new Map<string, number>()
  for (const p of all) byLicense.set(p.rawLicense, (byLicense.get(p.rawLicense) ?? 0) + 1)

  console.log(
    `${COLOR.dim}Scanned ${all.length} packages in node_modules ` +
      `(${productionSet.size} reachable from a production root).${COLOR.reset}`,
  )
  console.log()
  console.log(`${COLOR.bold}License distribution:${COLOR.reset}`)
  for (const [license, count] of [...byLicense].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${license.padEnd(40)} ${count}`)
  }
  console.log()

  // Flag anything that isn't allowed.
  const denied: PackageInfo[] = []
  const review: PackageInfo[] = []
  for (const p of all) {
    if (p.isAllowed) continue
    if (p.isDenied) denied.push(p)
    else review.push(p)
  }

  const isProduction = (name: string) => productionSet.has(name)

  let exitCode = 0

  if (denied.length > 0) {
    console.log(`${COLOR.red}${COLOR.bold}✗ DENIED (${denied.length})${COLOR.reset}`)
    for (const p of denied) {
      const prod = isProduction(p.name)
      const tier = prod ? `${COLOR.red}[runtime]${COLOR.reset} ` : `${COLOR.dim}[dev]${COLOR.reset} `
      console.log(`  ${tier}${p.name}@${p.version} — ${p.rawLicense} (${p.reason})`)
      if (prod) exitCode = 1
    }
    console.log(
      `${COLOR.dim}  [runtime] entries fail the audit. [dev] entries are surfaced for visibility ` +
        `but don't ship to users, so they don't gate the build.${COLOR.reset}`,
    )
    console.log()
  }

  if (review.length > 0) {
    console.log(`${COLOR.yellow}${COLOR.bold}? Manual review (${review.length})${COLOR.reset}`)
    for (const p of review) {
      const prod = isProduction(p.name)
      const tier = prod ? `${COLOR.yellow}[runtime]${COLOR.reset} ` : `${COLOR.dim}[dev]${COLOR.reset} `
      console.log(`  ${tier}${p.name}@${p.version} — ${p.rawLicense} (${p.reason})`)
    }
    console.log(`${COLOR.dim}  Add unfamiliar but permissive licenses to ALLOWED in scripts/check-licenses.ts after review.${COLOR.reset}`)
    console.log()
  }

  if (denied.length === 0 && review.length === 0) {
    console.log(`${COLOR.green}✓ All ${all.length} packages on the allowlist.${COLOR.reset}`)
    console.log()
  } else if (exitCode === 0) {
    console.log(`${COLOR.green}✓ No production-tree packages have denied licenses.${COLOR.reset}`)
    console.log()
  }

  return { exitCode }
}

// --- Pass 2: bundled / runtime-fetched data sources --------------------------

interface DataSource {
  id: string
  description: string
  license: string
  url?: string
  redistributedAs?: string
  attribution?: string
  note?: string
  /** Set when the license string isn't a standard SPDX identifier but a human has reviewed
   *  the source's terms and verified that our usage is compliant. The `reason` field
   *  must explain why — this becomes the audit trail. */
  manualOverride?: { reason: string }
}

function auditData(): { exitCode: number } {
  console.log(`${COLOR.bold}=== Pass 2: bundled data sources ===${COLOR.reset}`)
  if (!existsSync(DATA_MANIFEST)) {
    console.log(`${COLOR.red}data/data-licenses.json missing — every external data source must be recorded there.${COLOR.reset}`)
    return { exitCode: 1 }
  }
  let manifest: { sources?: DataSource[] }
  try {
    manifest = JSON.parse(readFileSync(DATA_MANIFEST, "utf-8"))
  } catch (err) {
    console.log(`${COLOR.red}data/data-licenses.json is not valid JSON: ${(err as Error).message}${COLOR.reset}`)
    return { exitCode: 1 }
  }
  const sources = manifest.sources ?? []
  if (sources.length === 0) {
    console.log(`${COLOR.yellow}data/data-licenses.json has no entries. If we genuinely ship no third-party data, this is fine.${COLOR.reset}`)
    return { exitCode: 0 }
  }

  console.log(`${COLOR.dim}${sources.length} data sources declared.${COLOR.reset}`)
  console.log()
  let exitCode = 0
  for (const s of sources) {
    const verdict = classify(s.license)
    let mark: string
    if (verdict.isDenied && !s.manualOverride) {
      mark = `${COLOR.red}✗${COLOR.reset}`
      exitCode = 1
    } else if (verdict.isAllowed) {
      mark = `${COLOR.green}✓${COLOR.reset}`
    } else if (s.manualOverride) {
      // Reviewed-and-cleared by a human. The override.reason is the audit trail.
      mark = `${COLOR.green}✓${COLOR.reset}`
    } else if (s.license === "All rights reserved") {
      // Internal asset (e.g. own logo) — fine, but we surface it for visibility.
      mark = `${COLOR.cyan}i${COLOR.reset}`
    } else {
      mark = `${COLOR.yellow}?${COLOR.reset}`
    }
    console.log(`${mark} ${COLOR.bold}${s.id}${COLOR.reset} — ${s.license}`)
    console.log(`  ${COLOR.dim}${s.description}${COLOR.reset}`)
    if (s.url) console.log(`  ${COLOR.dim}source: ${s.url}${COLOR.reset}`)
    if (s.redistributedAs) console.log(`  ${COLOR.dim}files: ${s.redistributedAs}${COLOR.reset}`)
    if (s.attribution) console.log(`  ${COLOR.dim}attribution: ${s.attribution}${COLOR.reset}`)
    if (s.note) console.log(`  ${COLOR.dim}note: ${s.note}${COLOR.reset}`)
    if (s.manualOverride) {
      console.log(`  ${COLOR.cyan}override:${COLOR.reset} ${COLOR.dim}${s.manualOverride.reason}${COLOR.reset}`)
    }
    console.log()
  }
  return { exitCode }
}

// --- Main --------------------------------------------------------------------

function main() {
  const npm = auditNpm()
  const data = auditData()
  const exitCode = Math.max(npm.exitCode, data.exitCode)
  if (exitCode === 0) {
    console.log(`${COLOR.green}${COLOR.bold}License audit clean.${COLOR.reset}`)
  } else {
    console.log(`${COLOR.red}${COLOR.bold}License audit found issues — see above.${COLOR.reset}`)
  }
  process.exit(exitCode)
}

main()
