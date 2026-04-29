"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import type { RefObject } from "react"
import { Button } from "@/components/ui/button"
import { hasSeenOnboarding, markOnboardingSeen, useProgress } from "@/lib/progress/use-progress"
import { useTranslation } from "@/lib/i18n/use-translation"

const ONBOARDING_ID = "quiz-tour-v1"

type StepId = "level" | "tabs" | "speak"

const STEP_IDS: StepId[] = ["level", "tabs", "speak"]

export interface QuizTourAnchors {
  level: RefObject<HTMLElement | null>
  tabs: RefObject<HTMLElement | null>
  speak: RefObject<HTMLButtonElement | null>
}

interface Props {
  anchors: QuizTourAnchors
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

  // Estimate card height conservatively so the flip-above decision is stable
  // before the card has measured itself. Real card is ~180–220px tall.
  const cardHeightGuess = 220

  const spaceBelow = vh - rect.bottom - HIGHLIGHT_PADDING - CALLOUT_GAP
  const placeAbove = spaceBelow < cardHeightGuess + VIEWPORT_MARGIN
  const cardPlacement: "below" | "above" = placeAbove ? "above" : "below"

  const ringTop = rect.top - HIGHLIGHT_PADDING
  const ringLeft = rect.left - HIGHLIGHT_PADDING
  const ringWidth = rect.width + HIGHLIGHT_PADDING * 2
  const ringHeight = rect.height + HIGHLIGHT_PADDING * 2

  // Center horizontally on the anchor, then clamp into the viewport.
  let cardLeft = rect.left + rect.width / 2 - CALLOUT_WIDTH / 2
  cardLeft = Math.max(VIEWPORT_MARGIN, Math.min(vw - CALLOUT_WIDTH - VIEWPORT_MARGIN, cardLeft))

  const cardTop = placeAbove
    ? rect.top - cardHeightGuess - CALLOUT_GAP
    : rect.bottom + CALLOUT_GAP

  return { ringTop, ringLeft, ringWidth, ringHeight, cardTop, cardLeft, cardPlacement }
}

/**
 * First-run walkthrough for /quiz. Anchors a pulse ring + floating callout to
 * three live UI elements: the level selector, the quiz-type tabs, and the
 * speaker button on the kanji card. Non-modal — the user can still click the
 * highlighted control during the tour.
 *
 * Suppresses itself on subsequent visits via Profile.onboardingSeen.
 */
export function QuizTour({ anchors }: Props) {
  const { profile, hydrated } = useProgress()
  const { t } = useTranslation()
  const [stepIndex, setStepIndex] = useState(0)
  const [rect, setRect] = useState<DOMRect | null>(null)
  // Snapshot of focus when the tour opens so we can restore it on close.
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  // Strict-mode guard against double-marking onboarding seen.
  const markedRef = useRef(false)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  const seen = hasSeenOnboarding(profile ?? null, ONBOARDING_ID)
  const active = hydrated && !seen

  const close = useCallback(() => {
    if (markedRef.current) return
    markedRef.current = true
    void markOnboardingSeen(ONBOARDING_ID)
    const previously = previouslyFocusedRef.current
    if (previously && typeof previously.focus === "function") {
      try { previously.focus() } catch { /* element may have unmounted */ }
    }
  }, [])

  const advance = useCallback(() => {
    if (stepIndex >= STEP_IDS.length - 1) {
      close()
      return
    }
    setStepIndex((i) => i + 1)
  }, [stepIndex, close])

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

  // Auto-skip a step whose anchor is missing (e.g. speak step when no JP voice
  // is installed — SpeakButton returns null and never assigns the ref).
  useEffect(() => {
    if (!active) return
    const step = { id: STEP_IDS[stepIndex] }
    const el = anchors[step.id].current
    if (el) return
    // Try one frame later in case the element is mid-mount, then advance.
    const id = requestAnimationFrame(() => {
      const retry = anchors[step.id].current
      if (retry) return
      if (stepIndex >= STEP_IDS.length - 1) close()
      else setStepIndex((i) => i + 1)
    })
    return () => cancelAnimationFrame(id)
  }, [active, stepIndex, anchors, close])

  // Measure + re-measure on resize/scroll. Scroll the anchor into view first
  // when entering a new step so the pulse ring is on-screen.
  useEffect(() => {
    if (!active) return
    const step = { id: STEP_IDS[stepIndex] }
    const el = anchors[step.id].current
    if (!el) {
      setRect(null)
      return
    }

    // Don't scroll on the first step — level selector is already at the top
    // of /quiz and a smooth scroll would just nudge the page unnecessarily.
    if (stepIndex > 0) {
      try {
        el.scrollIntoView({
          block: "center",
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        })
      } catch { /* older browsers without options support */ }
    }

    let rafId = 0
    const measure = () => {
      rafId = requestAnimationFrame(() => {
        const live = anchors[step.id].current
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
  }, [active, stepIndex, anchors])

  // Move keyboard focus to the dialog's primary action when it opens / advances,
  // so screen-reader and keyboard users land in the tour.
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
  const step = { id: STEP_IDS[stepIndex] }
  const isLast = stepIndex === STEP_IDS.length - 1

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
          {t("tour.step", { current: stepIndex + 1, total: STEP_IDS.length })}
        </p>
        <p id={titleId} className="font-display text-base font-medium text-sumi tracking-tight mb-1.5">
          {t(`tour.${step.id}.title` as const)}
        </p>
        <p className="text-sm text-sumi/80 leading-snug mb-4">
          {t(`tour.${step.id}.body` as const)}
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
