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

import type { ItemMastery } from "./store"

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

/** Variant that avoids picking the same item twice in a row, when caller has the previous pick.
 *  Useful for quiz pages that don't want a click-through-correct to immediately re-ask. */
export function pickWeightedExcluding<T>(
  items: T[],
  getKey: (item: T) => string,
  excludeKey: string | null,
  options: WeightedPickOptions = {},
): T {
  if (items.length === 0) throw new Error("pickWeightedExcluding: empty candidate list")
  if (items.length === 1) return items[0]
  const filtered = excludeKey === null ? items : items.filter((it) => getKey(it) !== excludeKey)
  if (filtered.length === 0) return pickWeighted(items, getKey, options)
  return pickWeighted(filtered, getKey, options)
}
