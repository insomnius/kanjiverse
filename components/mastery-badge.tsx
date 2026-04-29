"use client"

import { useEffect, useState } from "react"
import { Sparkles, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ItemMastery, QuizType } from "@/lib/progress/use-progress"
import { getItemMastery } from "@/lib/progress/use-progress"
import { useTranslation } from "@/lib/i18n/use-translation"

interface MasteryBadgeProps {
  type: QuizType
  itemKey: string
  /** Tightens the visual when used in compact contexts like list cards. */
  size?: "default" | "sm"
}

const MASTERED_THRESHOLD = 0.8 // 80% accuracy
const MASTERED_MIN_ATTEMPTS = 3 // need a few attempts before "mastered" is meaningful

/**
 * Displays the user's per-item progress next to a kanji/vocab/kana detail header.
 * Self-fetches its data (one IDB scan per mount) so consumers don't have to thread
 * mastery state through. Returns null when the user has no answer history for the
 * item — keeps the UI quiet for first-time visitors.
 */
export function MasteryBadge({ type, itemKey, size = "default" }: MasteryBadgeProps) {
  const { t } = useTranslation()
  const [mastery, setMastery] = useState<ItemMastery | null>(null)

  useEffect(() => {
    let cancelled = false
    void getItemMastery(type, itemKey).then((m) => {
      if (!cancelled) setMastery(m)
    })
    return () => {
      cancelled = true
    }
  }, [type, itemKey])

  if (!mastery || mastery.count === 0) return null

  const accuracy = Math.round((mastery.correct / mastery.count) * 100)
  const isMastered =
    mastery.count >= MASTERED_MIN_ATTEMPTS && mastery.correct / mastery.count >= MASTERED_THRESHOLD

  const tone = isMastered
    ? "border-gold/40 bg-gold-soft text-gold-deep"
    : "border-sumi/15 bg-cream-deep text-sumi/80"

  return (
    <span
      role="status"
      aria-label={
        isMastered
          ? t("mastery.aria.mastered", { correct: mastery.correct, count: mastery.count, accuracy })
          : mastery.count === 1
            ? t("mastery.aria.seen.singular", { count: mastery.count, correct: mastery.correct, accuracy })
            : t("mastery.aria.seen.plural", { count: mastery.count, correct: mastery.correct, accuracy })
      }
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-display tabular-nums",
        size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-0.5",
        tone,
      )}
    >
      {isMastered ? (
        <Sparkles aria-hidden="true" className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      ) : (
        <Target aria-hidden="true" className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      )}
      <span className="font-semibold">{mastery.correct}</span>
      <span className="opacity-70">/{mastery.count}</span>
      <span className="italic opacity-70">· {accuracy}%</span>
    </span>
  )
}
