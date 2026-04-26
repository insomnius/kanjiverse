"use client"

import { Flame } from "lucide-react"
import { useProgress } from "@/lib/progress/use-progress"

export function StreakIndicator() {
  const { streak } = useProgress()

  if (streak < 1) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Current streak: ${streak} ${streak === 1 ? "day" : "days"}`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-medium tabular-nums"
    >
      <Flame aria-hidden="true" className="h-3.5 w-3.5 fill-gold/40" />
      <span>
        <span className="font-semibold">{streak}</span>
        <span className="ml-0.5 text-gold-deep/80"> day{streak === 1 ? "" : "s"}</span>
      </span>
    </div>
  )
}
