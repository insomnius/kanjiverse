/**
 * Stealth SRS-style picker.
 *
 * Goal: keep the existing "draw a random kanji" feel, but lightly weight away from items
 * the user just got correct, and lightly toward items they just got wrong. No review
 * queue, no due-date UI, no "X cards due today" pressure — just smarter randomness.
 *
 * Tuned conservatively: even with no answer history, every item still has a >0
 * probability, and even a recently-correct item still has ~15% of baseline weight so
 * the user can still encounter it again. The goal is gentle bias, not strict scheduling.
 */

import type { ItemMastery, ItemReview } from "./store"

const HOUR_MS = 60 * 60 * 1000

interface WeightedPickOptions {
  /** Lookup table: item key -> mastery row. Keys must match what `getKey` returns. */
  mastery?: Map<string, ItemMastery>
  /** "Now" — overridable for tests; defaults to Date.now(). */
  now?: number
}

/** Compute the picker weight for one item given its mastery aggregate. Higher = more likely
 *  to be picked. Pure function so it's easy to unit-test the curve later. */
export function srsWeight(m: ItemMastery | undefined, now: number = Date.now()): number {
  if (!m || m.count === 0 || m.lastSeenAt === null) return 1.0 // unseen baseline
  const ageMs = now - m.lastSeenAt
  if (m.lastIsCorrect) {
    // Just got it right: heavily deprioritise but never zero — variety still matters.
    if (ageMs < HOUR_MS) return 0.15
    if (ageMs < 6 * HOUR_MS) return 0.45
    if (ageMs < 24 * HOUR_MS) return 0.75
    return 1.0
  }
  // Just got it wrong: pull it back into rotation soon.
  if (ageMs < HOUR_MS) return 1.6
  if (ageMs < 24 * HOUR_MS) return 1.3
  return 1.0
}

/** Weighted random pick. `getKey` extracts the lookup key from each candidate item.
 *  Falls back to uniform random when no mastery data is supplied. */
export function pickWeighted<T>(
  items: T[],
  getKey: (item: T) => string,
  options: WeightedPickOptions = {},
): T {
  if (items.length === 0) throw new Error("pickWeighted: empty candidate list")
  if (items.length === 1) return items[0]

  const { mastery, now = Date.now() } = options
  if (!mastery) return items[Math.floor(Math.random() * items.length)]

  let total = 0
  const weights: number[] = new Array(items.length)
  for (let i = 0; i < items.length; i++) {
    const w = srsWeight(mastery.get(getKey(items[i])), now)
    weights[i] = w
    total += w
  }

  // Defensive: if every weight rounded to ~0 (shouldn't happen with our floor of 0.15),
  // fall back to uniform.
  if (total <= 0) return items[Math.floor(Math.random() * items.length)]

  let r = Math.random() * total
  for (let i = 0; i < items.length; i++) {
    r -= weights[i]
    if (r <= 0) return items[i]
  }
  return items[items.length - 1]
}

/** SM-2 review-queue picker. Three-tier:
 *  1. Items whose SM-2 `dueAt <= now` (oldest-due first) — the actual review queue.
 *  2. Unseen items (no `ItemReview` row), capped per-day to avoid burying the user.
 *  3. Weighted random over not-yet-due items (fallback so quizzes never dead-end).
 *
 *  Tier 3 is the difference between this picker and the dedicated /review route:
 *  the review route shows "All caught up" when Tier 1 + 2 empty out, but the
 *  classic quiz pages keep going forever using the same SRS-flavored randomness
 *  the app shipped with — only now informed by SM-2 state instead of just last-seen.
 *
 *  `dailyNewLimit` and `newSeenToday` together implement the daily new-card cap.
 *  The caller computes `newSeenToday` from same-day Answer rows of unseen items
 *  (or just passes 0 for now — callers can ignore the limit until we wire the
 *  per-day counter). When the limit is reached, Tier 2 is skipped so the user
 *  doesn't get a fresh fire-hose of new cards in a single sitting. */
export interface ReviewQueueOptions extends WeightedPickOptions {
  reviews?: Map<string, ItemReview>
  /** Item to avoid (last picked) — preserves the existing "don't repeat in a row" UX. */
  excludeKey?: string | null
  dailyNewLimit?: number
  newSeenToday?: number
}

export function pickReviewQueue<T>(
  items: T[],
  getKey: (item: T) => string,
  options: ReviewQueueOptions = {},
): T {
  if (items.length === 0) throw new Error("pickReviewQueue: empty candidate list")
  if (items.length === 1) return items[0]

  const {
    reviews,
    excludeKey = null,
    now = Date.now(),
    dailyNewLimit = 20,
    newSeenToday = 0,
  } = options

  const eligible = excludeKey === null
    ? items
    : items.filter((it) => getKey(it) !== excludeKey)
  const candidates = eligible.length > 0 ? eligible : items

  // No SM-2 data yet — fall back to the legacy weighted picker so first-run users
  // (and IDB-unavailable contexts) get the same behavior as before.
  if (!reviews) return pickWeighted(candidates, getKey, options)

  // Tier 1: due items, oldest first. Tied dueAts are picked at random (filter-then-uniform)
  // so a calendar full of same-minute due times doesn't deterministically march down the list.
  const due: T[] = []
  let oldestDueAt = Infinity
  for (const it of candidates) {
    const r = reviews.get(getKey(it))
    if (r && r.dueAt <= now) {
      if (r.dueAt < oldestDueAt) oldestDueAt = r.dueAt
      due.push(it)
    }
  }
  if (due.length > 0) {
    // Pick uniformly from items whose dueAt is at or near the oldest (within 1 minute).
    // Keeps the queue feeling chronological without becoming deterministic.
    const tolerance = 60 * 1000
    const oldestBatch = due.filter((it) => {
      const r = reviews.get(getKey(it))
      return r ? r.dueAt - oldestDueAt <= tolerance : false
    })
    const batch = oldestBatch.length > 0 ? oldestBatch : due
    return batch[Math.floor(Math.random() * batch.length)]
  }

  // Tier 2: unseen items, capped at the daily new-card limit.
  if (newSeenToday < dailyNewLimit) {
    const unseen = candidates.filter((it) => !reviews.has(getKey(it)))
    if (unseen.length > 0) {
      return unseen[Math.floor(Math.random() * unseen.length)]
    }
  }

  // Tier 3: nothing due, no new headroom — weighted random over future-due items so
  // the user can keep practicing instead of hitting a dead-end.
  return pickWeighted(candidates, getKey, options)
}
