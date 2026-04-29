"use client"

import { useSyncExternalStore } from "react"
import { getState, subscribe } from "./store"

/**
 * Subscribe to the progress store.
 * Component re-renders when any tracked piece of state changes.
 */
export function useProgress() {
  return useSyncExternalStore(subscribe, getState, getState)
}

// Re-export the actions so consumers have one import path for the public API.
export {
  setDisplayName,
  setDailyGoal,
  setSoundEnabled,
  isSoundEnabled,
  setTtsEnabled,
  isTtsEnabled,
  hasSeenOnboarding,
  markOnboardingSeen,
  setLocale,
  getActiveLocale,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  recordAnswer,
  reset,
  getTotals,
  getDailyGoal,
  exportData,
  importData,
  getRecentSessions,
  getItemMastery,
  getItemReviewMap,
  applyAnswerToReviewMap,
  dismissMilestone,
  EMPTY_MASTERY,
  STREAK_MILESTONES,
  ANSWERED_MILESTONES,
  DEFAULT_DAILY_GOAL,
  DEFAULT_SOUND_ENABLED,
  DEFAULT_TTS_ENABLED,
  MIN_DAILY_GOAL,
  MAX_DAILY_GOAL,
} from "./store"

export { srsWeight, pickWeighted, pickReviewQueue } from "./srs"

export type {
  Profile, Session, DailyTotal, QuizType, ProgressCallback, BackupBlob, ImportResult,
  ItemMastery, ItemReview, ReviewQuality, Milestone, Locale,
} from "./store"
