"use client"

import { Flame, Target, Check } from "lucide-react"
import { useProgress, getDailyGoal } from "@/lib/progress/use-progress"

interface QuizMeterProps {
  /** Correct answers in the current quiz session (resets when level changes). */
  sessionCorrect: number
  /** Total attempts in the current quiz session. */
  sessionTotal: number
}

/**
 * Compact session-and-goal meter that anchors directly above the quiz card.
 *
 * Replaces the scattered "Score: X/Y" + standalone SessionStrip on quiz pages.
 * The goal bar animates as the user answers correctly — that's the post-submit
 * success feedback (no separate confetti or toast needed).
 *
 * Editorial restraint: no emoji, Newsreader display font for numbers, gold for
 * goal progress, vermilion only for at-risk states. Lives in a single row above
 * the quiz card so the user's eye never has to leave the action.
 */
export function QuizMeter({ sessionCorrect, sessionTotal }: QuizMeterProps) {
  const { hydrated, profile, streak, todayTotal } = useProgress()
  if (!hydrated) return null

  const todayCorrect = todayTotal?.correct ?? 0
  const todayAnswered = todayTotal?.questionsAnswered ?? 0
  const goal = getDailyGoal(profile ?? null)
  const goalPct = Math.min(100, (todayCorrect / goal) * 100)
  const goalHit = todayCorrect >= goal
  const sessionPct =
    sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : null
  const atRisk = streak > 0 && todayAnswered === 0

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={
        `Session ${sessionCorrect} of ${sessionTotal}` +
        (sessionPct !== null ? `, ${sessionPct} percent accuracy.` : ".") +
        ` Today ${todayCorrect} of ${goal} correct toward daily goal` +
        (goalHit ? " — goal reached." : ".") +
        (streak > 0 ? ` Current streak ${streak} ${streak === 1 ? "day" : "days"}.` : "")
      }
      className="mb-6 px-4 py-3 sm:px-5 sm:py-3.5 rounded-md bg-cream-deep/50 border border-sumi/10"
    >
      {/* Top row — session score + streak chip */}
      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2.5">
        <div className="font-display tabular-nums text-sumi text-sm sm:text-base">
          <span className="font-semibold text-base sm:text-lg">{sessionCorrect}</span>
          <span className="text-sumi/70">/{sessionTotal}</span>
          <span className="font-display italic text-xs sm:text-sm text-sumi/70 ml-1.5">
            this session
          </span>
          {sessionPct !== null && (
            <>
              <span aria-hidden="true" className="mx-2 text-sumi/30">·</span>
              <span className="font-display italic text-xs sm:text-sm text-sumi/70">
                {sessionPct}% accuracy
              </span>
            </>
          )}
        </div>

        {streak > 0 && (
          <span
            className={`inline-flex items-center gap-1 font-display tabular-nums text-xs sm:text-sm ${
              atRisk ? "text-vermilion-deep" : "text-sumi"
            }`}
          >
            <Flame
              aria-hidden="true"
              className={`h-3.5 w-3.5 ${
                atRisk ? "text-vermilion-deep" : "text-vermilion fill-vermilion/40"
              }`}
            />
            <span className="font-semibold">{streak}</span>
            <span className="italic text-xs text-sumi/70">
              {streak === 1 ? "day" : "days"}
            </span>
            {atRisk && (
              <span className="font-display italic text-xs text-vermilion-deep ml-1">
                at risk
              </span>
            )}
          </span>
        )}
      </div>

      {/* Bottom row — daily goal meter, the eye-magnet */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 font-display tabular-nums text-xs sm:text-sm text-sumi shrink-0">
          {goalHit ? (
            <Check aria-hidden="true" className="h-3.5 w-3.5 text-gold-deep" />
          ) : (
            <Target aria-hidden="true" className="h-3.5 w-3.5 text-gold-deep" />
          )}
          <span className="font-semibold">{todayCorrect}</span>
          <span className="text-sumi/70">/{goal}</span>
          <span className="font-display italic text-xs text-sumi/70 ml-0.5 hidden xs:inline sm:inline">
            {goalHit ? "goal hit today" : "today's goal"}
          </span>
        </span>
        <div
          role="progressbar"
          aria-label="Daily goal progress"
          aria-valuenow={Math.round(goalPct)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="flex-1 h-2 bg-cream rounded-full overflow-hidden border border-sumi/10"
        >
          <div
            className={`h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none ${
              goalHit ? "bg-gold-deep" : "bg-gold"
            }`}
            style={{ width: `${goalPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
