/**
 * Stroke-shape similarity for kanji search-by-drawing.
 *
 * Given a user's drawn strokes (each a list of points) and a candidate kanji's
 * stored stroke features (start + end positions per stroke, normalized to
 * [0, 1]), produce a distance score where lower = closer match.
 *
 * Order-invariant: we don't assume the user drew strokes in canonical order.
 * Greedy bipartite matching pairs each user stroke with its closest candidate
 * stroke (without replacement). This isn't optimal in the Hungarian sense but
 * runs in O(n²) on ≤25-stroke inputs — well under 1ms per candidate — and
 * empirically gives good rankings.
 *
 * Input coordinates: user points should already be normalized to [0, 1] by the
 * caller (divide by canvas width/height).
 */

export interface Point {
  x: number
  y: number
}

/** [startX, startY, endX, endY] all in [0, 1]. */
export type StrokeFeatures = [number, number, number, number]

export function strokeFeaturesFromPoints(stroke: Point[], canvasSize: number): StrokeFeatures {
  if (stroke.length === 0) return [0.5, 0.5, 0.5, 0.5]
  const start = stroke[0]
  const end = stroke[stroke.length - 1]
  return [
    Math.max(0, Math.min(1, start.x / canvasSize)),
    Math.max(0, Math.min(1, start.y / canvasSize)),
    Math.max(0, Math.min(1, end.x / canvasSize)),
    Math.max(0, Math.min(1, end.y / canvasSize)),
  ]
}

/** L2 distance between two stroke feature vectors, summed across both endpoints. */
function strokeDistance(a: StrokeFeatures, b: StrokeFeatures): number {
  const dx1 = a[0] - b[0]
  const dy1 = a[1] - b[1]
  const dx2 = a[2] - b[2]
  const dy2 = a[3] - b[3]
  return Math.sqrt(dx1 * dx1 + dy1 * dy1) + Math.sqrt(dx2 * dx2 + dy2 * dy2)
}

/**
 * Greedy bipartite distance: pair each user stroke with the unused candidate
 * stroke that's closest, sum the per-pair distances. Counts mismatched lengths
 * by penalising leftover strokes (this should be filtered out at the candidate
 * step, but defend in depth).
 */
export function strokeSetDistance(
  userStrokes: StrokeFeatures[],
  candidateStrokes: StrokeFeatures[],
): number {
  const n = userStrokes.length
  const m = candidateStrokes.length
  if (n === 0 || m === 0) return Infinity

  const used = new Array(m).fill(false)
  let total = 0
  let matched = 0

  for (let i = 0; i < n; i++) {
    let bestJ = -1
    let bestD = Infinity
    for (let j = 0; j < m; j++) {
      if (used[j]) continue
      const d = strokeDistance(userStrokes[i], candidateStrokes[j])
      if (d < bestD) {
        bestD = d
        bestJ = j
      }
    }
    if (bestJ >= 0) {
      used[bestJ] = true
      total += bestD
      matched++
    }
  }

  // Penalty per unmatched stroke on either side — encourages exact stroke counts.
  const PENALTY = 0.5
  total += PENALTY * (Math.abs(n - m) + (n - matched))
  return total
}
