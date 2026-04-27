"use client"

import { useEffect, useRef } from "react"
import { Flame, Sparkles, X } from "lucide-react"
import { useProgress, dismissMilestone, isSoundEnabled } from "@/lib/progress/use-progress"
import { playMilestone } from "@/lib/sounds"

const AUTO_DISMISS_MS = 6000

interface ToastCopy {
  heading: string
  body: string
}

function copyFor(kind: "streak" | "answered", value: number): ToastCopy {
  if (kind === "streak") {
    return {
      heading: `${value}-day streak`,
      body:
        value >= 100
          ? "Three-digit streak. Keep going."
          : value >= 30
            ? "A month of daily practice — that's habit territory."
            : "Daily practice is the path. One more answer tomorrow keeps it alive.",
    }
  }
  return {
    heading: `${value.toLocaleString()} answers`,
    body:
      value >= 1000
        ? "Four digits answered. The kanji are starting to know you back."
        : value >= 100
          ? "Three digits in. The shapes are becoming familiar."
          : "First milestone — keep going.",
  }
}

/**
 * Site-wide milestone celebration. Mounted once in __root.tsx; reads the
 * pendingMilestone from the progress store and renders a small dismissible
 * card. Auto-clears after a few seconds.
 *
 * Editorial restraint: no confetti, no overlay, no full-screen modal. A small
 * gold-tinted card sliding in from the top-right is enough — the work itself
 * is the reward.
 */
export function MilestoneToast() {
  const { pendingMilestone, profile } = useProgress()
  // Track which milestone we've already chimed for so React strict-mode double-render
  // doesn't double-play the sound.
  const lastChimedIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!pendingMilestone) return
    if (lastChimedIdRef.current !== pendingMilestone.id) {
      lastChimedIdRef.current = pendingMilestone.id
      if (isSoundEnabled(profile ?? null)) playMilestone()
    }
    const t = setTimeout(() => dismissMilestone(), AUTO_DISMISS_MS)
    return () => clearTimeout(t)
  }, [pendingMilestone, profile])

  if (!pendingMilestone) return null

  const copy = copyFor(pendingMilestone.kind, pendingMilestone.value)
  const Icon = pendingMilestone.kind === "streak" ? Flame : Sparkles

  return (
    <div
      role="status"
      aria-live="assertive"
      aria-atomic="true"
      className="fixed top-20 right-4 z-50 max-w-sm animate-streak-extend motion-reduce:animate-none"
    >
      <div className="relative bg-cream border border-gold/40 rounded-lg shadow-[0_8px_24px_-8px_rgba(168,124,47,0.4)] p-4 pr-10">
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-gold-soft flex items-center justify-center">
            <Icon
              aria-hidden="true"
              className="h-4 w-4 text-gold-deep fill-gold/30"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-base font-medium text-sumi tracking-tight">
              {copy.heading}
            </p>
            <p className="font-display italic text-sm text-sumi/70 mt-0.5 leading-snug">
              {copy.body}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => dismissMilestone()}
          aria-label="Dismiss milestone"
          className="absolute top-2 right-2 p-1.5 rounded-md text-sumi/55 hover:text-sumi hover:bg-cream-deep/60 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion"
        >
          <X aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
