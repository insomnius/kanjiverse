"use client"

/**
 * Find visually-similar kanji to a given character.
 *
 * Reuses the same stroke-feature dataset and matcher as /draw-search:
 *   - data/kanji-stroke-features.json: per-kanji [startX, startY, endX, endY] vectors
 *   - lib/stroke-similarity.ts:strokeSetDistance: order-invariant greedy bipartite matching
 *
 * The features file is ~535 KB raw / ~150 KB gzipped, so we lazy-load it on first call
 * and cache the import promise. Per-character results are also memoized — the second
 * time the same KanjiDetail panel opens, ranking is instant (no re-scan of 2,000+
 * candidates).
 *
 * Stroke-count tolerance: ±1 around the target. Same heuristic /draw-search uses to
 * forgive off-by-one stroke-count mistakes.
 */

import { strokeSetDistance, type StrokeFeatures } from "./stroke-similarity"

export interface SimilarKanjiResult {
  /** The character. */
  char: string
  /** Stroke-set distance — lower is closer. Always finite for real results. */
  distance: number
}

const STROKE_COUNT_TOLERANCE = 1

let featuresPromise: Promise<Record<string, number[][]>> | null = null
let countsPromise: Promise<Record<string, number>> | null = null
const cache = new Map<string, SimilarKanjiResult[]>()

function loadFeatures(): Promise<Record<string, number[][]>> {
  if (!featuresPromise) {
    featuresPromise = import("@/data/kanji-stroke-features.json").then(
      (m) => (m.default ?? m) as unknown as Record<string, number[][]>,
    )
  }
  return featuresPromise
}

function loadCounts(): Promise<Record<string, number>> {
  if (!countsPromise) {
    countsPromise = import("@/data/kanji-stroke-counts.json").then(
      (m) => (m.default ?? m) as unknown as Record<string, number>,
    )
  }
  return countsPromise
}

/**
 * Returns the top-K visually-similar kanji to `char`, sorted ascending by distance.
 * Self-excluded. Returns [] when the target has no stroke-feature data (the 56
 * Japanese-only variants /draw-search reports as "unsearchable").
 *
 * Limited to characters that appear in stroke-features (i.e. the JLPT N1–N5 set
 * with feature data). The caller can intersect with `kanjiData` if it wants to
 * surface only entries that have a full detail page — but every character in
 * stroke-features comes from that same set, so there's no extra filter needed.
 */
export async function findSimilarKanji(char: string, k = 6): Promise<SimilarKanjiResult[]> {
  const cached = cache.get(char)
  if (cached) return cached.slice(0, k)

  const [features, counts] = await Promise.all([loadFeatures(), loadCounts()])

  const targetFeatures = features[char]
  if (!targetFeatures) {
    cache.set(char, [])
    return []
  }
  const targetCount = counts[char] ?? targetFeatures.length

  const target = targetFeatures as StrokeFeatures[]
  const ranked: SimilarKanjiResult[] = []

  for (const [otherChar, otherFeatures] of Object.entries(features)) {
    if (otherChar === char) continue
    const otherCount = counts[otherChar] ?? otherFeatures.length
    if (Math.abs(otherCount - targetCount) > STROKE_COUNT_TOLERANCE) continue
    const distance = strokeSetDistance(target, otherFeatures as StrokeFeatures[])
    if (!Number.isFinite(distance)) continue
    ranked.push({ char: otherChar, distance })
  }

  ranked.sort((a, b) => a.distance - b.distance)
  // Cache the larger window (top 24 ish) so different K values share work.
  const TOP_CACHE = 24
  const trimmed = ranked.slice(0, TOP_CACHE)
  cache.set(char, trimmed)
  return trimmed.slice(0, k)
}
