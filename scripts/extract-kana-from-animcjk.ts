/**
 * Build-time fetcher for hiragana + katakana stroke data from animCJK.
 *
 * Replaces the older KanjiVG-based extractor: KanjiVG ships *centerline*
 * paths (single-line `fill:none;stroke-width:3` SVGs) which don't fit the
 * shape hanzi-writer expects (closed filled stroke outlines + median
 * waypoints). animCJK already publishes data in hanzi-writer's exact
 * format, so the conversion collapses to "fetch + filter + transcribe."
 *
 *   Run once after the kana set changes (rare):
 *     bun run scripts/extract-kana-from-animcjk.ts
 *
 * animCJK's kana subset is licensed LGPL-3.0-or-later (the kana SVGs are
 * not derived from Arphic fonts, so the project's APL fallback doesn't
 * apply here). Attribution lives in data/data-licenses.json and surfaces
 * on the /credits page.
 */

import { kanaData } from "../data/kana-data"
import { writeFileSync } from "node:fs"
import { join } from "node:path"

const SOURCE_URL =
  "https://raw.githubusercontent.com/parsimonhi/animCJK/master/graphicsJaKana.txt"
const OUT = join(__dirname, "..", "data", "kana-stroke-data.json")

interface CharData {
  strokes: string[]
  medians: number[][][]
}

interface AnimCjkLine {
  character: string
  strokes: string[]
  medians: number[][][]
}

/**
 * Collect every distinct single-codepoint kana referenced in our kana
 * dataset. Multi-codepoint combinations (e.g. "きゃ", "ヴァ") are split into
 * their component glyphs — the writing UI guides users one glyph at a time.
 */
function collectCodepoints(): string[] {
  const seen = new Set<string>()
  const groups = [
    kanaData.hiragana.basic,
    kanaData.hiragana.dakuten,
    kanaData.hiragana.combinations,
    kanaData.katakana.basic,
    kanaData.katakana.dakuten,
    kanaData.katakana.combinations,
    kanaData.katakana.extended,
  ]
  for (const group of groups) {
    for (const row of group) {
      for (const { kana } of row.chars) {
        if (!kana) continue
        for (const ch of [...kana]) seen.add(ch)
      }
    }
  }
  return [...seen].sort()
}

async function main(): Promise<void> {
  const wanted = new Set(collectCodepoints())
  console.log(`Resolving stroke data for ${wanted.size} kana glyphs from animCJK…`)

  const res = await fetch(SOURCE_URL)
  if (!res.ok) {
    throw new Error(`Failed to fetch ${SOURCE_URL}: HTTP ${res.status}`)
  }
  const text = await res.text()
  const lines = text.split("\n").filter((l) => l.trim().length > 0)

  const results: Record<string, CharData> = {}
  let missing = 0

  for (const line of lines) {
    let parsed: AnimCjkLine
    try {
      parsed = JSON.parse(line) as AnimCjkLine
    } catch {
      continue
    }
    if (!wanted.has(parsed.character)) continue
    results[parsed.character] = {
      strokes: parsed.strokes,
      medians: parsed.medians,
    }
  }

  for (const ch of wanted) {
    if (!(ch in results)) {
      missing++
      console.warn(`  ⚠ missing in animCJK: ${ch} (U+${ch.codePointAt(0)!.toString(16)})`)
    }
  }

  // Stable sort keys by code point so re-runs produce clean diffs.
  const sorted = Object.fromEntries(
    Object.entries(results).sort(([a], [b]) => a.codePointAt(0)! - b.codePointAt(0)!),
  )

  // SPDX-style header so the file declares its provenance per LGPL §4.
  // Reader code ignores keys starting with "_".
  const payload = {
    _: {
      source: "animCJK (parsimonhi/animCJK)",
      license: "LGPL-3.0-or-later",
      url: "https://github.com/parsimonhi/animCJK",
      attribution: "Copyright © 2016–2026 FM-SH and animCJK contributors",
      coordinateSpace: "1024×1024, Y-up (hanzi-writer compatible)",
      generatedAt: new Date().toISOString(),
      generatedBy: "scripts/extract-kana-from-animcjk.ts",
    },
    ...sorted,
  }

  writeFileSync(OUT, JSON.stringify(payload))
  const size = Bun.file(OUT).size
  console.log(`\n→ ${OUT}`)
  console.log(`  ${Object.keys(sorted).length} glyphs, ${(size / 1024).toFixed(1)} KB`)
  if (missing > 0) {
    console.log(`  ${missing} glyph(s) had no animCJK entry — UI degrades to drawing-only for those.`)
  }
}

void main().catch((err) => {
  console.error(err)
  process.exit(1)
})
