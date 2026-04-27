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
  for (const char of ourKanji) {
    const parts = all[char]
    if (parts && parts.length > 0) {
      // Drop the kanji from its own component list when it appears (atomic
      // radicals like 一 list themselves; the UI doesn't need that loop).
      const filtered = parts.filter((p) => p !== char)
      if (filtered.length > 0) {
        out[char] = filtered
        matched += 1
      }
    }
  }
  console.log(`Matched ${matched} of ${ourKanji.size} kanji to KRADFILE entries.`)

  writeFileSync(OUT, JSON.stringify(out))
  console.log(`Wrote ${OUT}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
