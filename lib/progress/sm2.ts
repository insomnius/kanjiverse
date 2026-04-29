/**
 * SM-2 spaced-repetition algorithm.
 *
 * Adapted from Piotr Wozniak's SuperMemo 2 with three small concessions:
 *
 * 1. Three-button quality scale (Again / Good / Easy → 1 / 4 / 5) instead of
 *    SM-2's six-button scale, matching the flashcard review UI we ship.
 * 2. A minimum ease floor of 1.3 so a string of misses can't drive ease
 *    arbitrarily low — when items get this hard we'd rather leech-tag them
 *    than infinitely shorten the interval.
 * 3. A "fuzz" of ±5% on the next interval to prevent a Monday review batch
 *    from showing up *exactly* in three weeks again on Monday morning.
 *
 * Pure functions only — no IDB, no time mocks. `now` is injectable so the
 * caller can keep tests deterministic.
 */

export type ReviewQuality = "again" | "good" | "easy"

export interface ItemReview {
  /** Composite key: "kanji:水", "kana:あ", "vocab:ありがとう". */
  itemKey: string
  /** SM-2 ease factor. Defaults to 2.5 for fresh items; floor of 1.3. */
  easeFactor: number
  /** Days until next review at the most recent grading. 0 means "in learning" (sub-day). */
  interval: number
  /** Successful repetitions in a row. Resets to 0 on a lapse. */
  repetitions: number
  /** Total times the user has missed this item after at least one success. */
  lapses: number
  /** Wall-clock ms when this item is next due. */
  dueAt: number
  /** Wall-clock ms of the most recent review (informational; not used in scheduling). */
  lastReviewedAt: number
}

const MIN_EASE = 1.3
const DAY_MS = 24 * 60 * 60 * 1000

/** Map a UI button to the SuperMemo 2 quality score (0–5 scale). */
function qualityScore(q: ReviewQuality): number {
  if (q === "again") return 1
  if (q === "good") return 4
  return 5 // easy
}

/** ±5% jitter so review batches don't all queue up on the same calendar day. */
function fuzz(intervalDays: number): number {
  if (intervalDays <= 1) return intervalDays
  const jitter = 1 + (Math.random() * 0.1 - 0.05)
  return intervalDays * jitter
}

/**
 * Apply one review event and return the updated state. `prev` is null when
 * the user is seeing the item for the first time.
 */
export function nextReview(
  prev: ItemReview | null,
  itemKey: string,
  quality: ReviewQuality,
  now: number = Date.now(),
): ItemReview {
  const q = qualityScore(quality)
  const failed = q < 3

  // Start with prior state or sensible defaults.
  let easeFactor = prev?.easeFactor ?? 2.5
  let interval = prev?.interval ?? 0
  let repetitions = prev?.repetitions ?? 0
  let lapses = prev?.lapses ?? 0

  // Update ease per SM-2's standard formula. Easy answers raise it; hard drop it.
  // q=1 (Again): -0.20  q=4 (Good): +0.00  q=5 (Easy): +0.10
  easeFactor = Math.max(MIN_EASE, easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))

  if (failed) {
    // Lapse: reset reps, count it, immediate retry today.
    repetitions = 0
    lapses += 1
    interval = 0
  } else {
    // Pass: advance the rep counter and pick a new interval.
    repetitions += 1
    if (repetitions === 1) interval = 1
    else if (repetitions === 2) interval = quality === "easy" ? 6 : 3
    else interval = Math.max(1, Math.round(fuzz(interval * easeFactor)))
  }

  const dueAt = failed
    ? now + 10 * 60 * 1000 // re-show in 10 min when in learning
    : now + interval * DAY_MS

  return {
    itemKey,
    easeFactor,
    interval,
    repetitions,
    lapses,
    dueAt,
    lastReviewedAt: now,
  }
}

/**
 * Map a binary correct/wrong answer (the legacy quiz path) onto a quality
 * grade. Used by `recordAnswer()` so existing quizzes feed the same SM-2
 * state as the dedicated flashcard review queue. "Wrong" → Again; "right" → Good.
 *
 * `easy` is reserved for the flashcard UI's explicit Easy button — quizzes
 * don't have one.
 */
export function qualityFromCorrect(isCorrect: boolean): ReviewQuality {
  return isCorrect ? "good" : "again"
}

/**
 * Replay a chronological list of (isCorrect, answeredAt) tuples through
 * `nextReview` to derive a current SM-2 state. Used by the v1→v2 backup
 * migration so existing users start with sensibly-scheduled cards rather
 * than every item flooding the queue as "new".
 */
export function deriveFromAnswerHistory(
  itemKey: string,
  answers: Array<{ isCorrect: boolean; answeredAt: number }>,
): ItemReview | null {
  if (answers.length === 0) return null
  const sorted = [...answers].sort((a, b) => a.answeredAt - b.answeredAt)
  let state: ItemReview | null = null
  for (const a of sorted) {
    state = nextReview(state, itemKey, qualityFromCorrect(a.isCorrect), a.answeredAt)
  }
  return state
}
