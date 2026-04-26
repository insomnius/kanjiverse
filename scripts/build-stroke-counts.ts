/**
 * Build-time fetcher for kanji stroke geometry.
 *
 * Pulls stroke data for every kanji in data/kanji-data.ts from jsdelivr
 * (hanzi-writer-data-jp, falling back to hanzi-writer-data for shared CJK
 * characters), extracts:
 *
 *   - stroke count (count of strokes)
 *   - per-stroke start + end positions, normalized to [0, 1]
 *
 * Results emitted to data/kanji-stroke-counts.json (kept as the simple
 * lookup map) AND data/kanji-stroke-features.json (for the search-by-drawing
 * feature's similarity ranking).
 *
 * Run once after data changes:
 *   bun run scripts/build-stroke-counts.ts
 *
 * Output is committed; jsdelivr is only contacted at build time, never by
 * end users at runtime.
 */

import { kanjiData } from "../data/kanji-data"
import { writeFileSync, existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const COUNTS_OUT = join(__dirname, "..", "data", "kanji-stroke-counts.json")
const FEATURES_OUT = join(__dirname, "..", "data", "kanji-stroke-features.json")
const CONCURRENCY = 24
const RETRIES = 3
const SOURCES = [
  "https://cdn.jsdelivr.net/npm/hanzi-writer-data-jp@0",
  "https://cdn.jsdelivr.net/npm/hanzi-writer-data@2",
]

interface CharData {
  strokes?: string[]
  medians?: number[][][]
}

/**
 * hanzi-writer's medians live in a 1024×1024 coordinate space with the Y axis
 * flipped (0 at the bottom). We normalize to [0,1] and flip Y so it lines up
 * with screen coordinates the user draws on.
 */
const SVG_SIZE = 1024
function normalize(p: number[]): [number, number] {
  const x = Math.max(0, Math.min(1, p[0] / SVG_SIZE))
  const y = Math.max(0, Math.min(1, 1 - p[1] / SVG_SIZE))
  return [x, y]
}

function extractFeatures(medians?: number[][][]): number[][] | null {
  if (!medians || medians.length === 0) return null
  const out: number[][] = []
  for (const stroke of medians) {
    if (!stroke || stroke.length === 0) continue
    const [sx, sy] = normalize(stroke[0])
    const [ex, ey] = normalize(stroke[stroke.length - 1])
    // Round to 3 decimal places to keep the JSON small.
    out.push([
      Math.round(sx * 1000) / 1000,
      Math.round(sy * 1000) / 1000,
      Math.round(ex * 1000) / 1000,
      Math.round(ey * 1000) / 1000,
    ])
  }
  return out
}

interface Result {
  count: number
  features: number[][] | null
}

async function fetchFromSource(char: string, base: string): Promise<Result | null> {
  const url = `${base}/${encodeURIComponent(char)}.json`
  for (let attempt = 0; attempt < RETRIES; attempt++) {
    try {
      const res = await fetch(url)
      if (res.status === 404) return null
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as CharData
      const count = data.strokes?.length
      if (count === undefined) return null
      return { count, features: extractFeatures(data.medians) }
    } catch (err) {
      if (attempt === RETRIES - 1) {
        console.warn(`  ✗ ${char} (${base}) — gave up after ${RETRIES} tries (${(err as Error).message})`)
        return null
      }
      await new Promise((r) => setTimeout(r, 250 * (attempt + 1)))
    }
  }
  return null
}

async function fetchOne(char: string): Promise<Result | null> {
  for (const source of SOURCES) {
    const result = await fetchFromSource(char, source)
    if (result !== null) return result
  }
  return null
}

async function main() {
  const all = new Set<string>()
  for (const level of Object.keys(kanjiData)) {
    for (const k of kanjiData[level as keyof typeof kanjiData]) all.add(k.kanji)
  }
  const list = Array.from(all)
  console.log(`Fetching stroke geometry for ${list.length} kanji…`)

  // Reuse existing entries when present. We need both files to be in sync to
  // skip a kanji, so check both.
  const existingCounts: Record<string, number> = existsSync(COUNTS_OUT)
    ? JSON.parse(readFileSync(COUNTS_OUT, "utf-8"))
    : {}
  const existingFeatures: Record<string, number[][]> = existsSync(FEATURES_OUT)
    ? JSON.parse(readFileSync(FEATURES_OUT, "utf-8"))
    : {}

  const counts: Record<string, number> = { ...existingCounts }
  const features: Record<string, number[][]> = { ...existingFeatures }

  // We re-fetch any kanji that's missing features (older runs only saved counts).
  const todo = list.filter((c) => !(c in counts) || !(c in features))
  console.log(`  ${list.length - todo.length} cached, ${todo.length} to fetch`)

  let done = 0
  const queue = todo.slice()
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length > 0) {
      const char = queue.shift()
      if (!char) break
      const result = await fetchOne(char)
      if (result !== null) {
        counts[char] = result.count
        if (result.features) features[char] = result.features
      }
      done++
      if (done % 100 === 0 || done === todo.length) {
        process.stdout.write(`  ${done}/${todo.length} fetched\r`)
      }
    }
  })
  await Promise.all(workers)
  process.stdout.write("\n")

  const sortedCounts: Record<string, number> = {}
  for (const key of Object.keys(counts).sort()) sortedCounts[key] = counts[key]

  const sortedFeatures: Record<string, number[][]> = {}
  for (const key of Object.keys(features).sort()) sortedFeatures[key] = features[key]

  writeFileSync(COUNTS_OUT, JSON.stringify(sortedCounts, null, 2) + "\n")
  // Features file is large enough that pretty-printing wastes ~100 KB; keep it compact.
  writeFileSync(FEATURES_OUT, JSON.stringify(sortedFeatures) + "\n")

  const missing = list.filter((c) => !(c in sortedCounts))
  const missingFeatures = list.filter((c) => !(c in sortedFeatures))
  console.log(`Wrote ${COUNTS_OUT} (${Object.keys(sortedCounts).length} entries)`)
  console.log(`Wrote ${FEATURES_OUT} (${Object.keys(sortedFeatures).length} entries)`)
  if (missing.length > 0) {
    console.log(`  ${missing.length} kanji missing all data: ${missing.slice(0, 10).join(", ")}${missing.length > 10 ? "…" : ""}`)
  }
  if (missingFeatures.length > missing.length) {
    console.log(`  ${missingFeatures.length - missing.length} have count but no medians`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
