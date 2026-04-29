"use client"

import { Flame } from "lucide-react"
import { useProgress } from "@/lib/progress/use-progress"
import { useTranslation } from "@/lib/i18n/use-translation"

export function StreakIndicator() {
  const { streak } = useProgress()
  const { t } = useTranslation()

  if (streak < 1) return null

  // Indonesian doesn't suffix-pluralize ("hari" is both day & days), so we read
  // a single `streak.unit` token for both forms in ID. EN keeps the day/days
  // distinction via the dedicated keys.
  const unit = t("streak.unit")

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={t("streak.aria", { n: streak, unit })}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-medium tabular-nums"
    >
      <Flame aria-hidden="true" className="h-3.5 w-3.5 fill-gold/40" />
      <span>
        <span className="font-semibold">{streak}</span>
        <span className="ml-0.5 text-gold-deep/80"> {unit}</span>
      </span>
    </div>
  )
}
