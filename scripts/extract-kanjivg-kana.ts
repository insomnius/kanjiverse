/**
 * Build-time fetcher for hiragana + katakana stroke data from KanjiVG.
 *
 * Pulls one SVG per kana glyph, transforms coordinates from KanjiVG's
 * 109×109 SVG space into hanzi-writer's 1024×1024 (Y-flipped) shape, and
 * writes data/kana-stroke-data.json keyed by single Unicode code point.
 *
 * Output matches hanzi-writer's `CharacterData` shape so we can pass it to
 * the same component that already drives /draw — no custom animator
 * required, only a custom `charDataLoader`.
 *
 *   Run once after the kana set changes (rare):
 *     bun run scripts/extract-kanjivg-kana.ts
 *
 * KanjiVG is licensed CC BY-SA 3.0; attribution lives in
 * data/data-licenses.json. The output JSON is checked in.
 */

import { kanaData } from "../data/kana-data"
import { writeFileSync } from "node:fs"
import { join } from "node:path"

const OUT = join(__dirname, "..", "data", "kana-stroke-data.json")
const CONCURRENCY = 16
const RETRIES = 3

// KanjiVG canonical viewBox edge (square).
const KVG_SIZE = 109
// hanzi-writer assumed coordinate space (square).
const HW_SIZE = 1024
const SCALE = HW_SIZE / KVG_SIZE

interface CharData {
  strokes: string[]
  medians: number[][][]
}

/**
 * Collects every distinct single-codepoint kana that appears in our kana
 * dataset. Multi-glyph combinations (e.g. "きゃ", "ヴァ") are decomposed —
 * the writing UI will guide users through one glyph at a time.
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

function codepointHex(ch: string): string {
  const cp = ch.codePointAt(0)
  if (cp === undefined) throw new Error(`Bad char: ${JSON.stringify(ch)}`)
  return cp.toString(16).padStart(5, "0").toLowerCase()
}

async function fetchSvg(codepoint: string): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${codepoint}.svg`
  for (let attempt = 0; attempt < RETRIES; attempt++) {
    try {
      const res = await fetch(url)
      if (res.status === 404) return null
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.text()
    } catch (err) {
      if (attempt === RETRIES - 1) {
        console.warn(`  ✗ ${codepoint}: ${(err as Error).message}`)
        return null
      }
      await new Promise(r => setTimeout(r, 200 * (attempt + 1)))
    }
  }
  return null
}

/**
 * Pulls every <path d="…" /> from the KanjiVG SVG, ignoring stroke-number
 * annotations (which live in a separate <g id="StrokeNumbers_…">). Order is
 * preserved — KanjiVG paths appear in stroke order.
 */
function extractStrokePaths(svg: string): string[] {
  const numbersStart = svg.indexOf("StrokeNumbers_")
  const strokesSegment = numbersStart >= 0 ? svg.slice(0, numbersStart) : svg
  const paths: string[] = []
  const re = /<path[^>]*\bd="([^"]+)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(strokesSegment)) !== null) {
    paths.push(m[1])
  }
  return paths
}

/**
 * Transforms a single path `d` string from KanjiVG's 109×109 (Y-down) space
 * to hanzi-writer's 1024×1024 (Y-up). Numeric pairs are walked in order;
 * commands and separators are passed through verbatim.
 *
 * KanjiVG paths use M, L, C, Q, S, T, Z and their lowercase relative forms.
 * Both absolute and relative coordinates are scaled. For relative commands
 * the Y-flip is a sign flip on dy; for absolute, it's `1024 - scaled`.
 */
function transformPath(d: string): string {
  const out: string[] = []
  // Tokenize into commands and number pairs. Commands are A-Za-z, numbers
  // can have leading -, decimal, scientific notation.
  const tokenRe = /([MmLlHhVvCcSsQqTtAaZz])|(-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/g
  type Tok = { cmd: string } | { num: number }
  const toks: Tok[] = []
  let mt: RegExpExecArray | null
  while ((mt = tokenRe.exec(d)) !== null) {
    if (mt[1]) toks.push({ cmd: mt[1] })
    else toks.push({ num: parseFloat(mt[2]) })
  }

  let i = 0
  let currentCmd = ""
  while (i < toks.length) {
    const t = toks[i]
    if ("cmd" in t) {
      currentCmd = t.cmd
      out.push(t.cmd)
      i++
      continue
    }
    // Number — interpret in the context of the most recent command.
    const isRelative = currentCmd === currentCmd.toLowerCase()
    const cmdUpper = currentCmd.toUpperCase()
    const transformXY = (x: number, y: number): [number, number] => {
      if (isRelative) {
        // Relative: scale magnitudes; Y flip means negate dy.
        return [x * SCALE, -y * SCALE]
      }
      return [x * SCALE, HW_SIZE - y * SCALE]
    }

    if (cmdUpper === "H") {
      // Horizontal line — single x value.
      const x = (t as { num: number }).num
      out.push((isRelative ? x * SCALE : x * SCALE).toFixed(2))
      i++
    } else if (cmdUpper === "V") {
      // Vertical line — single y value, must flip.
      const y = (t as { num: number }).num
      out.push((isRelative ? (-y * SCALE) : (HW_SIZE - y * SCALE)).toFixed(2))
      i++
    } else if (cmdUpper === "A") {
      // Arc — 7 numbers per arc: rx, ry, x-axis-rot, large, sweep, x, y.
      // Only the final pair is a coordinate; rx/ry are radii (scale, no flip),
      // rotation/large/sweep flags pass through, last pair flips like xy.
      const args = [t]
      for (let j = 1; j < 7; j++) args.push(toks[i + j])
      const [rx, ry] = [(args[0] as { num: number }).num, (args[1] as { num: number }).num]
      const rot = (args[2] as { num: number }).num
      const large = (args[3] as { num: number }).num
      const sweep = (args[4] as { num: number }).num
      const ex = (args[5] as { num: number }).num
      const ey = (args[6] as { num: number }).num
      const [tx, ty] = transformXY(ex, ey)
      out.push(
        `${(rx * SCALE).toFixed(2)},${(ry * SCALE).toFixed(2)},${rot},${large},${sweep},${tx.toFixed(2)},${ty.toFixed(2)}`,
      )
      i += 7
    } else {
      // Default: pairs of x, y. M/L/T expect 1 pair; Q/S expect 2; C expects 3.
      // We just consume pairs greedily until we hit a non-number or end.
      const pairs: Array<[number, number]> = []
      while (i + 1 < toks.length && "num" in toks[i] && "num" in toks[i + 1]) {
        const x = (toks[i] as { num: number }).num
        const y = (toks[i + 1] as { num: number }).num
        pairs.push(transformXY(x, y))
        i += 2
        // SVG continuation rule: after an explicit M, subsequent implicit
        // commands are L (or l). After other commands, repeat the same.
        // We don't insert command letters here — the outer loop handles that.
        // We must stop the pair loop when the next token is a command, which
        // is checked by the outer while.
        if (i < toks.length && "cmd" in toks[i]) break
      }
      out.push(pairs.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" "))
    }
  }

  return out.join(" ").replace(/\s+/g, " ").trim()
}

/**
 * Derive median waypoints for hanzi-writer's quiz-mode stroke matcher by
 * pulling absolute coordinates from the path commands. Three samples per
 * stroke is sufficient for kana — the matcher only needs rough start /
 * middle / end positions in 1024×1024 (Y-up) space.
 */
function deriveMedians(d: string): number[][] {
  const tokenRe = /([MmLlHhVvCcSsQqTtAaZz])|(-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/g
  const samples: Array<[number, number]> = []
  let cursor: [number, number] = [0, 0]
  let currentCmd = ""
  type Tok = { cmd: string } | { num: number }
  const toks: Tok[] = []
  let m: RegExpExecArray | null
  while ((m = tokenRe.exec(d)) !== null) {
    if (m[1]) toks.push({ cmd: m[1] })
    else toks.push({ num: parseFloat(m[2]) })
  }

  let i = 0
  while (i < toks.length) {
    const t = toks[i]
    if ("cmd" in t) { currentCmd = t.cmd; i++; continue }
    const cmdUpper = currentCmd.toUpperCase()
    const isRelative = currentCmd === currentCmd.toLowerCase()

    const stepXY = (x: number, y: number): [number, number] => (
      isRelative ? [cursor[0] + x, cursor[1] + y] : [x, y]
    )

    if (cmdUpper === "H") {
      const x = (t as { num: number }).num
      cursor = isRelative ? [cursor[0] + x, cursor[1]] : [x, cursor[1]]
      samples.push([cursor[0], cursor[1]])
      i++
    } else if (cmdUpper === "V") {
      const y = (t as { num: number }).num
      cursor = isRelative ? [cursor[0], cursor[1] + y] : [cursor[0], y]
      samples.push([cursor[0], cursor[1]])
      i++
    } else if (cmdUpper === "A") {
      const ex = (toks[i + 5] as { num: number }).num
      const ey = (toks[i + 6] as { num: number }).num
      cursor = stepXY(ex, ey)
      samples.push([cursor[0], cursor[1]])
      i += 7
    } else if (cmdUpper === "Z") {
      // Close — no coords.
      // (cursor would jump back to subpath start; KanjiVG kana don't need this.)
    } else {
      // M/L/T: 1 pair; S/Q: 2 pairs; C: 3 pairs. We sample only the endpoint.
      const pairs: Array<[number, number]> = []
      while (i + 1 < toks.length && "num" in toks[i] && "num" in toks[i + 1]) {
        const x = (toks[i] as { num: number }).num
        const y = (toks[i + 1] as { num: number }).num
        pairs.push(stepXY(x, y))
        i += 2
        if (i < toks.length && "cmd" in toks[i]) break
      }
      if (pairs.length > 0) {
        // Sample the endpoint of each command — a better median than just
        // the single ending cursor.
        for (const p of pairs) samples.push(p)
        cursor = pairs[pairs.length - 1]
      }
    }
  }

  if (samples.length === 0) return []
  // Reduce to up to 5 samples spread evenly along the stroke, then
  // transform to 1024×1024 (Y-up).
  const target = Math.min(5, samples.length)
  const stride = (samples.length - 1) / Math.max(1, target - 1)
  const out: number[][] = []
  for (let k = 0; k < target; k++) {
    const idx = Math.round(k * stride)
    const [x, y] = samples[idx]
    out.push([Math.round(x * SCALE), Math.round(HW_SIZE - y * SCALE)])
  }
  return out
}

async function buildOne(ch: string): Promise<[string, CharData] | null> {
  const cp = codepointHex(ch)
  const svg = await fetchSvg(cp)
  if (!svg) return null
  const rawStrokes = extractStrokePaths(svg)
  if (rawStrokes.length === 0) {
    console.warn(`  ⚠ ${ch} (U+${cp}): no strokes parsed`)
    return null
  }
  const strokes = rawStrokes.map(transformPath)
  const medians = rawStrokes.map(deriveMedians)
  return [ch, { strokes, medians }]
}

async function main() {
  const chars = collectCodepoints()
  console.log(`Resolving stroke data for ${chars.length} kana glyphs from KanjiVG…`)

  const results: Record<string, CharData> = {}
  let done = 0
  let missing = 0

  // Concurrent fetch with bounded parallelism.
  const queue = [...chars]
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length > 0) {
      const ch = queue.shift()
      if (!ch) break
      const out = await buildOne(ch)
      done++
      if (out) results[out[0]] = out[1]
      else missing++
      if (done % 25 === 0 || done === chars.length) {
        process.stdout.write(`\r  ${done}/${chars.length} (${missing} missing)`)
      }
    }
  })
  await Promise.all(workers)
  process.stdout.write("\n")

  // Stable sort keys by code point so diffs stay clean across re-runs.
  const sorted = Object.fromEntries(
    Object.entries(results).sort(([a], [b]) => (a.codePointAt(0)! - b.codePointAt(0)!)),
  )

  // Emit a header object so the file declares its KanjiVG provenance per
  // the CC BY-SA 3.0 attribution clause. Reader code ignores keys starting
  // with "_".
  const payload = {
    _: {
      source: "KanjiVG (kanji.tagaini.net)",
      license: "CC BY-SA 3.0",
      url: "https://github.com/KanjiVG/kanjivg",
      attribution: "Copyright © 2009–2011 Ulrich Apel and KanjiVG contributors",
      coordinateSpace: "1024×1024, Y-up (matches hanzi-writer-data)",
      generatedAt: new Date().toISOString(),
    },
    ...sorted,
  }

  writeFileSync(OUT, JSON.stringify(payload))
  const size = Bun.file(OUT).size
  console.log(`\n→ ${OUT}`)
  console.log(`  ${Object.keys(sorted).length} glyphs, ${(size / 1024).toFixed(1)} KB`)
  if (missing > 0) {
    console.log(`  ${missing} glyph(s) had no KanjiVG entry — UI degrades to drawing-only for those.`)
  }
}

void main().catch((err) => {
  console.error(err)
  process.exit(1)
})
