"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import type { RefObject } from "react"
import { Button } from "@/components/ui/button"
import { hasSeenOnboarding, markOnboardingSeen, useProgress } from "@/lib/progress/use-progress"
import { useTranslation } from "@/lib/i18n/use-translation"
import type { MessageKey } from "@/lib/i18n/messages.en"

export interface FeatureTourStep {
  /** Stable identifier — only used for React keys and missing-anchor logging. */
  id: string
  /** Live ref pointing at the DOM element to highlight. Falsy ref auto-skips. */
  ref: RefObject<HTMLElement | null>
  /** i18n key for the step's title. */
  titleKey: MessageKey
  /** i18n key for the step's body. Supports {placeholders} via `bodyVars`. */
  bodyKey: MessageKey
  /** Optional interpolation values for the body string. */
  bodyVars?: Record<string, string | number>
}

interface FeatureTourProps {
  /** Persisted ID — once dismissed, this tour never reopens for the same user.
   *  Bump the suffix (e.g. "draw-tour-v2") to re-show after substantial changes. */
  id: string
  steps: FeatureTourStep[]
}

const HIGHLIGHT_PADDING = 8
const CALLOUT_GAP = 16
const CALLOUT_WIDTH = 320
const VIEWPORT_MARGIN = 12

interface CalloutPlacement {
  ringTop: number
  ringLeft: number
  ringWidth: number
  ringHeight: number
  cardTop: number
  cardLeft: number
  cardPlacement: "below" | "above"
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    return false
  }
}

function placeCallout(rect: DOMRect): CalloutPlacement {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const cardHeightGuess = 220

  const spaceBelow = vh - rect.bottom - HIGHLIGHT_PADDING - CALLOUT_GAP
  const placeAbove = spaceBelow < cardHeightGuess + VIEWPORT_MARGIN
  const cardPlacement: "below" | "above" = placeAbove ? "above" : "below"

  const ringTop = rect.top - HIGHLIGHT_PADDING
  const ringLeft = rect.left - HIGHLIGHT_PADDING
  const ringWidth = rect.width + HIGHLIGHT_PADDING * 2
  const ringHeight = rect.height + HIGHLIGHT_PADDING * 2

  let cardLeft = rect.left + rect.width / 2 - CALLOUT_WIDTH / 2
  cardLeft = Math.max(VIEWPORT_MARGIN, Math.min(vw - CALLOUT_WIDTH - VIEWPORT_MARGIN, cardLeft))

  const cardTop = placeAbove
    ? rect.top - cardHeightGuess - CALLOUT_GAP
    : rect.bottom + CALLOUT_GAP

  return { ringTop, ringLeft, ringWidth, ringHeight, cardTop, cardLeft, cardPlacement }
}

/**
 * Generalised first-run walkthrough. Anchors a pulse ring + floating callout
 * to a sequence of live UI elements, identified by ref. Non-modal — the user
 * can still interact with the highlighted control during the tour.
 *
 * Design echoes QuizTour but accepts arbitrary step configs so it can drive
 * the /draw and /kana-write onboardings without per-page subclassing.
 */
export function FeatureTour({ id, steps }: FeatureTourProps) {
  const { profile, hydrated } = useProgress()
  const { t } = useTranslation()
  const [stepIndex, setStepIndex] = useState(0)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const markedRef = useRef(false)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  const seen = hasSeenOnboarding(profile ?? null, id)
  const active = hydrated && !seen && steps.length > 0

  const close = useCallback(() => {
    if (markedRef.current) return
    markedRef.current = true
    void markOnboardingSeen(id)
    const previously = previouslyFocusedRef.current
    if (previously && typeof previously.focus === "function") {
      try { previously.focus() } catch { /* element may have unmounted */ }
    }
  }, [id])

  const advance = useCallback(() => {
    if (stepIndex >= steps.length - 1) {
      close()
      return
    }
    setStepIndex((i) => i + 1)
  }, [stepIndex, steps.length, close])

  const back = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1))
  }, [])

  // Snapshot focus on activation so we can restore on close.
  useEffect(() => {
    if (!active) return
    if (previouslyFocusedRef.current) return
    if (typeof document === "undefined") return
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
  }, [active])

  // Auto-skip a step whose anchor is missing.
  useEffect(() => {
    if (!active) return
    const step = steps[stepIndex]
    if (!step) return
    const el = step.ref.current
    if (el) return
    const id = requestAnimationFrame(() => {
      const retry = step.ref.current
      if (retry) return
      if (stepIndex >= steps.length - 1) close()
      else setStepIndex((i) => i + 1)
    })
    return () => cancelAnimationFrame(id)
  }, [active, stepIndex, steps, close])

  // Measure + re-measure on resize/scroll. Scroll the anchor into view first
  // when entering a new step so the pulse ring is on-screen.
  useEffect(() => {
    if (!active) return
    const step = steps[stepIndex]
    if (!step) return
    const el = step.ref.current
    if (!el) {
      setRect(null)
      return
    }

    if (stepIndex > 0) {
      try {
        el.scrollIntoView({
          block: "center",
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        })
      } catch { /* older browsers */ }
    }

    let rafId = 0
    const measure = () => {
      rafId = requestAnimationFrame(() => {
        const live = step.ref.current
        if (!live) return
        setRect(live.getBoundingClientRect())
      })
    }
    measure()
    window.addEventListener("scroll", measure, { passive: true, capture: true })
    window.addEventListener("resize", measure)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", measure, { capture: true } as EventListenerOptions)
      window.removeEventListener("resize", measure)
    }
  }, [active, stepIndex, steps])

  // Move keyboard focus to the dialog's primary action when it opens / advances.
  useEffect(() => {
    if (!active) return
    if (!rect) return
    nextButtonRef.current?.focus()
  }, [active, stepIndex, rect])

  // Esc dismisses (counts as skip — marks seen).
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, close])

  if (!active) return null
  if (!rect) return null

  const placement = placeCallout(rect)
  const step = steps[stepIndex]
  if (!step) return null
  const isLast = stepIndex === steps.length - 1

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed pointer-events-none rounded-lg animate-tour-pulse"
        style={{
          top: placement.ringTop,
          left: placement.ringLeft,
          width: placement.ringWidth,
          height: placement.ringHeight,
          zIndex: 50,
        }}
      />
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        className="fixed bg-cream border border-vermilion/40 rounded-lg shadow-[0_8px_24px_-8px_rgba(200,85,61,0.4)] p-4"
        style={{
          top: placement.cardTop,
          left: placement.cardLeft,
          width: CALLOUT_WIDTH,
          zIndex: 51,
        }}
      >
        <p className="font-display italic text-xs text-sumi/70 mb-1">
          {t("tour.step", { current: stepIndex + 1, total: steps.length })}
        </p>
        <p id={titleId} className="font-display text-base font-medium text-sumi tracking-tight mb-1.5">
          {t(step.titleKey)}
        </p>
        <p className="text-sm text-sumi/80 leading-snug mb-4">
          {t(step.bodyKey, step.bodyVars)}
        </p>
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={close}
            className="font-display italic text-sm text-sumi/70 hover:text-vermilion-deep transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 rounded"
          >
            {t("tour.skip")}
          </button>
          <div className="flex items-center gap-2">
            {stepIndex > 0 && (
              <Button type="button" variant="ghost" size="sm" onClick={back} className="font-display">
                {t("tour.back")}
              </Button>
            )}
            <Button
              ref={nextButtonRef}
              type="button"
              size="sm"
              onClick={advance}
              className="font-display"
            >
              {isLast ? t("tour.done") : t("tour.next")}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
