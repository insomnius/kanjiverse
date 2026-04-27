/**
 * Builds the N1 vocabulary array from open-anki-jlpt-decks (MIT-licensed) and
 * patches it into data/vocabulary-data.ts.
 *
 * Source: https://github.com/jamsinclair/open-anki-jlpt-decks (MIT)
 *   The notes were curated by Jamie Sinclair, originally derived from
 *   tanos.co.uk's old JLPT 1-kyū vocabulary list (post-2010 N1 has no official
 *   word list; this is the de-facto community proxy).
 *
 * Run when the upstream list changes:
 *   bun run scripts/build-n1-vocab.ts
 */

import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import * as wanakana from "wanakana"

const SOURCE_URL =
  "https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n1.csv"
const VOCAB_FILE = join(__dirname, "..", "data", "vocabulary-data.ts")

interface VocabRow {
  word: string
  meaning: string
  romaji: string
}

/**
 * Minimal CSV row parser — handles double-quoted fields with embedded commas.
 * The upstream file is pretty regular, but `meaning` occasionally contains
 * commas inside double quotes (e.g. `"principle, general rule"`).
 */
function parseCsvLine(line: string): string[] {
  const out: string[] = []
  let buf = ""
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        buf += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (c === "," && !inQuotes) {
      out.push(buf)
      buf = ""
    } else {
      buf += c
    }
  }
  out.push(buf)
  return out
}

/** Hepburn romaji from hiragana, with our project's preferred macrons for long vowels. */
function toRomaji(reading: string): string {
  // wanakana uses Hepburn by default, but with `oo` / `ou` rendered as plain ASCII.
  // We post-process to add macrons (matches the existing N5/N4/N3/N2 style: gakkō, kuruma).
  let r = wanakana.toRomaji(reading)
  // Long vowels: ou, oo, uu typical patterns. Convert to macron form when not at a syllable
  // boundary that would change the word (heuristic — wanakana's default is fine for most
  // intra-word cases).
  r = r
    .replace(/ou/g, "ō")
    .replace(/oo/g, "ō")
    .replace(/uu/g, "ū")
    .replace(/aa/g, "ā")
    .replace(/ee/g, "ē")
    .replace(/ii/g, "ī")
  return r
}

function escapeForTs(s: string): string {
  // The TS literal uses double quotes per the existing file's style.
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

async function main() {
  console.log(`Fetching ${SOURCE_URL}…`)
  const res = await fetch(SOURCE_URL)
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.status}`)
  const csv = await res.text()
  const lines = csv.split("\n").filter((l) => l.trim().length > 0)

  // Drop the header
  const header = lines.shift()
  if (!header || !header.startsWith("expression")) {
    throw new Error(`Unexpected header: ${header}`)
  }

  const rows: VocabRow[] = []
  const seenWords = new Set<string>()
  let skipped = 0
  for (const line of lines) {
    const [expression, reading, meaning] = parseCsvLine(line)
    if (!expression || !reading || !meaning) {
      skipped += 1
      continue
    }
    // Some rows may share a kanji form with different readings (rare). We dedupe by
    // expression to keep the picker / mastery keys 1:1 with the displayed word.
    if (seenWords.has(expression)) {
      skipped += 1
      continue
    }
    seenWords.add(expression)
    rows.push({
      word: expression.trim(),
      meaning: meaning.trim(),
      romaji: toRomaji(reading.trim()),
    })
  }

  console.log(`Parsed ${rows.length} rows (${skipped} skipped).`)

  // Render the new N1 array as TypeScript, then patch into vocabulary-data.ts.
  const banner = [
    "  // ---------------------------------------------------------------",
    "  // N1 list sourced from open-anki-jlpt-decks (MIT) by Jamie Sinclair.",
    "  // https://github.com/jamsinclair/open-anki-jlpt-decks",
    "  // Originally derived from Jonathan Waller's tanos.co.uk JLPT 1-kyū",
    "  // vocabulary; that data is released into the public domain. The",
    "  // MIT license below covers Sinclair's curation + meanings.",
    "  // ---------------------------------------------------------------",
  ].join("\n")

  const body = rows
    .map((r) => `    { word: "${escapeForTs(r.word)}", meaning: "${escapeForTs(r.meaning)}", romaji: "${escapeForTs(r.romaji)}" }`)
    .join(",\n")

  const newN1Block = `  N1: [\n${body}\n  ],\n}`

  const current = readFileSync(VOCAB_FILE, "utf-8")
  const startMarker = "  N1: ["
  const startIdx = current.lastIndexOf(startMarker)
  if (startIdx < 0) throw new Error("Couldn't find N1 block start in vocabulary-data.ts")

  // Slice from the start of the N1 line — preserve everything before, replace from there.
  // We assume the N1 block is the last entry in the export object (currently true).
  const lineStart = current.lastIndexOf("\n", startIdx) + 1
  const before = current.slice(0, lineStart)
  const out = `${before}${banner}\n${newN1Block}\n`

  writeFileSync(VOCAB_FILE, out)
  console.log(`Wrote ${VOCAB_FILE} with ${rows.length} N1 entries.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
