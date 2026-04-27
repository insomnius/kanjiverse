/**
 * Build-time fetcher for kanji radical / component decomposition.
 *
 * Source: KRADFILE from EDRDG (CC BY-SA 4.0)
 *   https://www.edrdg.org/krad/kradinf.html
 *   http://ftp.edrdg.org/pub/Nihongo/kradfile.gz
 *
 * Format (EUC-JP encoded, gzipped):
 *
 *   亜 : 一 ｜ 口
 *   亞 : 一 ｜ 八 二
 *
 * Bun's TextDecoder("euc-jp") + Bun.gunzipSync handle decoding natively.
 *
 * Output: data/kanji-radicals.json — Record<kanji, components[]> trimmed to
 * the JLPT N1–N5 set. Components are bare characters; the renderer treats
 * them as glyphs and links to /kanji/$char only when we have detail data.
 *
 * Run once after data changes:
 *   bun run scripts/build-radicals.ts
 */

import { kanjiData } from "../data/kanji-data"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { gunzipSync } from "node:zlib"

const OUT = join(__dirname, "..", "data", "kanji-radicals.json")
const SOURCE = "http://ftp.edrdg.org/pub/Nihongo/kradfile.gz"

interface KradMap {
  [kanji: string]: string[]
}

function parseKradfile(text: string): KradMap {
  const map: KradMap = {}
  for (const line of text.split("\n")) {
    if (!line || line.startsWith("#")) continue
    // Format: "亜 : 一 ｜ 口"
    const colonAt = line.indexOf(":")
    if (colonAt < 0) continue
    const head = line.slice(0, colonAt).trim()
    const tail = line.slice(colonAt + 1).trim()
    if (!head || !tail) continue
    const components = tail.split(/\s+/).filter((c) => c.length > 0)
    if (components.length === 0) continue
    map[head] = components
  }
  return map
}

async function main() {
  const ourKanji = new Set<string>()
  for (const level of Object.keys(kanjiData) as Array<keyof typeof kanjiData>) {
    for (const k of kanjiData[level]) ourKanji.add(k.kanji)
  }
  console.log(`Our kanji set: ${ourKanji.size} characters.`)

  console.log(`Fetching ${SOURCE}…`)
  const res = await fetch(SOURCE)
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${SOURCE}`)
  const compressed = new Uint8Array(await res.arrayBuffer())
  const decompressed = gunzipSync(compressed)
  const text = new TextDecoder("euc-jp").decode(decompressed)
  console.log(`  → ${text.length} chars decoded.`)

  const all = parseKradfile(text)
  console.log(`  → parsed ${Object.keys(all).length} entries.`)

  const out: KradMap = {}
  let matched = 0
  let atomic = 0
  for (const char of ourKanji) {
    const parts = all[char]
    if (!parts || parts.length === 0) continue
    // KRADFILE entries like "水 : 水" mark atomic radicals — the kanji IS a
    // building block, not decomposed from anything else. We preserve that
    // signal by keeping `[char]` in the JSON, so the renderer can show a
    // meaningful "this kanji is a radical" state instead of treating it as
    // missing data. Decomposed kanji keep their full component list (we
    // filter out the self-reference, which sometimes appears alongside real
    // components).
    const isAtomic = parts.length === 1 && parts[0] === char
    if (isAtomic) {
      out[char] = [char]
      atomic += 1
    } else {
      const filtered = parts.filter((p) => p !== char)
      if (filtered.length > 0) {
        out[char] = filtered
        matched += 1
      }
    }
  }
  console.log(`Matched ${matched} decomposed + ${atomic} atomic = ${matched + atomic} of ${ourKanji.size} kanji.`)

  writeFileSync(OUT, JSON.stringify(out))
  console.log(`Wrote ${OUT}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
