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
 * Derive on-curve median waypoints for hanzi-writer's stroke renderer.
 *
 * hanzi-writer renders each stroke as a thick line traced along the medians,
 * clipped to the stroke-shape path. If medians wander OFF the curve the
 * thick line gets clipped away and the stroke looks broken or partial.
 *
 * The previous implementation sampled raw path-command pairs — which for
 * cubic Beziers includes the two control points, NOT the curve trajectory.
 * Control points routinely sit far outside the visible curve (a hand-drawn
 * fluid stroke uses overshoot control points), so sampling them produced
 * zigzag medians that punched out of the clip region.
 *
 * This implementation walks the path command-by-command, evaluates each
 * Bezier segment at multiple parameter values, accumulates an on-curve
 * polyline approximation, then resamples to N points spread evenly along
 * arc length. Output is in 1024×1024 Y-up to match hanzi-writer's coord
 * space.
 */

const MEDIAN_TARGET = 5
// Density of intermediate samples per Bezier segment before arc-length
// resampling. 16 keeps short straight strokes accurate without bloating
// the JSON; cubic strokes through fluid-stroke control points need this
// many to capture the actual curvature.
const SEGMENT_SAMPLES = 16

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** Evaluate a cubic Bezier (4 points) at parameter t∈[0,1]. */
function cubicAt(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number,
): [number, number] {
  const u = 1 - t
  const w0 = u * u * u
  const w1 = 3 * u * u * t
  const w2 = 3 * u * t * t
  const w3 = t * t * t
  return [
    w0 * p0[0] + w1 * p1[0] + w2 * p2[0] + w3 * p3[0],
    w0 * p0[1] + w1 * p1[1] + w2 * p2[1] + w3 * p3[1],
  ]
}

/** Evaluate a quadratic Bezier (3 points) at parameter t∈[0,1]. */
function quadAt(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  t: number,
): [number, number] {
  const u = 1 - t
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ]
}

function deriveMedians(d: string): number[][] {
  const tokenRe = /([MmLlHhVvCcSsQqTtAaZz])|(-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/g
  type Tok = { cmd: string } | { num: number }
  const toks: Tok[] = []
  let m: RegExpExecArray | null
  while ((m = tokenRe.exec(d)) !== null) {
    if (m[1]) toks.push({ cmd: m[1] })
    else toks.push({ num: parseFloat(m[2]) })
  }

  // On-curve polyline: dense samples along each segment.
  const polyline: Array<[number, number]> = []
  let cursor: [number, number] = [0, 0]
  let subpathStart: [number, number] = [0, 0]
  let currentCmd = ""
  // Track the previous segment's last control point for S/T smoothing.
  let lastCubicControl: [number, number] | null = null
  let lastQuadControl: [number, number] | null = null

  function pushPoint(p: [number, number]): void {
    // De-dup consecutive identical points so resampling stride doesn't bias.
    const last = polyline[polyline.length - 1]
    if (!last || last[0] !== p[0] || last[1] !== p[1]) polyline.push(p)
  }

  function sampleSegment(evaluator: (t: number) => [number, number]): void {
    // Skip t=0 — it equals the previous segment's endpoint already in the polyline.
    for (let k = 1; k <= SEGMENT_SAMPLES; k++) {
      const t = k / SEGMENT_SAMPLES
      pushPoint(evaluator(t))
    }
  }

  let i = 0
  while (i < toks.length) {
    const t = toks[i]
    if ("cmd" in t) {
      currentCmd = t.cmd
      i++
      continue
    }

    const cmdUpper = currentCmd.toUpperCase()
    const isRelative = currentCmd === currentCmd.toLowerCase()
    const abs = (x: number, y: number): [number, number] =>
      isRelative ? [cursor[0] + x, cursor[1] + y] : [x, y]

    // Read a number from token i (typed) — helper to keep call sites tight.
    const num = (idx: number): number => {
      const tok = toks[idx]
      if (!("num" in tok)) throw new Error(`Expected number at token ${idx} in "${d}"`)
      return tok.num
    }

    if (cmdUpper === "M") {
      // First pair = move; subsequent implicit Ls.
      const start = abs(num(i), num(i + 1))
      cursor = start
      subpathStart = start
      pushPoint(cursor)
      i += 2
      // Implicit L after M: continue consuming pairs.
      while (i + 1 < toks.length && "num" in toks[i] && "num" in toks[i + 1]) {
        const next: [number, number] = abs(num(i), num(i + 1))
        // Linear segment from cursor to next — sample.
        const from = cursor
        sampleSegment((tt) => [lerp(from[0], next[0], tt), lerp(from[1], next[1], tt)])
        cursor = next
        i += 2
      }
      lastCubicControl = null
      lastQuadControl = null
    } else if (cmdUpper === "L") {
      while (i + 1 < toks.length && "num" in toks[i] && "num" in toks[i + 1]) {
        const next: [number, number] = abs(num(i), num(i + 1))
        const from = cursor
        sampleSegment((tt) => [lerp(from[0], next[0], tt), lerp(from[1], next[1], tt)])
        cursor = next
        i += 2
      }
      lastCubicControl = null
      lastQuadControl = null
    } else if (cmdUpper === "H") {
      while (i < toks.length && "num" in toks[i]) {
        const x = num(i)
        const next: [number, number] = isRelative ? [cursor[0] + x, cursor[1]] : [x, cursor[1]]
        const from = cursor
        sampleSegment((tt) => [lerp(from[0], next[0], tt), lerp(from[1], next[1], tt)])
        cursor = next
        i++
      }
      lastCubicControl = null
      lastQuadControl = null
    } else if (cmdUpper === "V") {
      while (i < toks.length && "num" in toks[i]) {
        const y = num(i)
        const next: [number, number] = isRelative ? [cursor[0], cursor[1] + y] : [cursor[0], y]
        const from = cursor
        sampleSegment((tt) => [lerp(from[0], next[0], tt), lerp(from[1], next[1], tt)])
        cursor = next
        i++
      }
      lastCubicControl = null
      lastQuadControl = null
    } else if (cmdUpper === "C") {
      while (i + 5 < toks.length && "num" in toks[i] && "num" in toks[i + 1]) {
        const c1 = abs(num(i), num(i + 1))
        const c2 = abs(num(i + 2), num(i + 3))
        const end = abs(num(i + 4), num(i + 5))
        const p0 = cursor
        sampleSegment((tt) => cubicAt(p0, c1, c2, end, tt))
        cursor = end
        lastCubicControl = c2
        lastQuadControl = null
        i += 6
      }
    } else if (cmdUpper === "S") {
      while (i + 3 < toks.length && "num" in toks[i] && "num" in toks[i + 1]) {
        // First control = reflection of previous cubic's c2 around cursor.
        const c1: [number, number] = lastCubicControl
          ? [2 * cursor[0] - lastCubicControl[0], 2 * cursor[1] - lastCubicControl[1]]
          : cursor
        const c2 = abs(num(i), num(i + 1))
        const end = abs(num(i + 2), num(i + 3))
        const p0 = cursor
        sampleSegment((tt) => cubicAt(p0, c1, c2, end, tt))
        cursor = end
        lastCubicControl = c2
        lastQuadControl = null
        i += 4
      }
    } else if (cmdUpper === "Q") {
      while (i + 3 < toks.length && "num" in toks[i] && "num" in toks[i + 1]) {
        const c = abs(num(i), num(i + 1))
        const end = abs(num(i + 2), num(i + 3))
        const p0 = cursor
        sampleSegment((tt) => quadAt(p0, c, end, tt))
        cursor = end
        lastQuadControl = c
        lastCubicControl = null
        i += 4
      }
    } else if (cmdUpper === "T") {
      while (i + 1 < toks.length && "num" in toks[i] && "num" in toks[i + 1]) {
        const c: [number, number] = lastQuadControl
          ? [2 * cursor[0] - lastQuadControl[0], 2 * cursor[1] - lastQuadControl[1]]
          : cursor
        const end = abs(num(i), num(i + 1))
        const p0 = cursor
        sampleSegment((tt) => quadAt(p0, c, end, tt))
        cursor = end
        lastQuadControl = c
        lastCubicControl = null
        i += 2
      }
    } else if (cmdUpper === "A") {
      // Arcs are rare in KanjiVG kana — approximate as a line to endpoint.
      // Good enough for medians; the visible stroke uses the path itself.
      const end = abs(num(i + 5), num(i + 6))
      const from = cursor
      sampleSegment((tt) => [lerp(from[0], end[0], tt), lerp(from[1], end[1], tt)])
      cursor = end
      lastCubicControl = null
      lastQuadControl = null
      i += 7
    } else if (cmdUpper === "Z") {
      // Close — line back to subpath start.
      const from = cursor
      const to = subpathStart
      sampleSegment((tt) => [lerp(from[0], to[0], tt), lerp(from[1], to[1], tt)])
      cursor = subpathStart
      lastCubicControl = null
      lastQuadControl = null
      // Z has no args; the outer loop already advanced past it via the cmd
      // branch — but we entered here with i pointing at a number? No, Z is
      // a cmd token consumed at the top. We arrive here only if a number
      // follows Z (malformed). Defensive: skip the number.
      if ("num" in toks[i]) i++
    } else {
      // Unknown command — skip the number to avoid an infinite loop.
      i++
    }
  }

  if (polyline.length === 0) return []

  // Compute cumulative arc length along the polyline.
  const cumLen: number[] = [0]
  for (let k = 1; k < polyline.length; k++) {
    const dx = polyline[k][0] - polyline[k - 1][0]
    const dy = polyline[k][1] - polyline[k - 1][1]
    cumLen.push(cumLen[k - 1] + Math.sqrt(dx * dx + dy * dy))
  }
  const totalLen = cumLen[cumLen.length - 1]

  // Resample to MEDIAN_TARGET points evenly spaced by arc length.
  const target = Math.min(MEDIAN_TARGET, polyline.length)
  const out: number[][] = []
  if (totalLen === 0 || target === 1) {
    // Degenerate — single point or zero-length stroke.
    const [x, y] = polyline[0]
    out.push([Math.round(x * SCALE), Math.round(HW_SIZE - y * SCALE)])
    return out
  }
  for (let k = 0; k < target; k++) {
    const targetLen = (k / (target - 1)) * totalLen
    // Find the polyline segment containing targetLen.
    let segIdx = 0
    while (segIdx < cumLen.length - 1 && cumLen[segIdx + 1] < targetLen) segIdx++
    const segStart = cumLen[segIdx]
    const segEnd = cumLen[segIdx + 1] ?? segStart
    const segLen = segEnd - segStart
    const tt = segLen > 0 ? (targetLen - segStart) / segLen : 0
    const [ax, ay] = polyline[segIdx]
    const [bx, by] = polyline[segIdx + 1] ?? polyline[segIdx]
    const x = lerp(ax, bx, tt)
    const y = lerp(ay, by, tt)
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
