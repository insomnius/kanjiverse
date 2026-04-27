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
  recordAnswer,
  reset,
  getTotals,
  getDailyGoal,
  exportData,
  importData,
  getRecentSessions,
  getItemMastery,
  getItemMasteryMap,
  applyAnswerToMasteryMap,
  dismissMilestone,
  EMPTY_MASTERY,
  STREAK_MILESTONES,
  ANSWERED_MILESTONES,
  DEFAULT_DAILY_GOAL,
  DEFAULT_SOUND_ENABLED,
  MIN_DAILY_GOAL,
  MAX_DAILY_GOAL,
} from "./store"

export { srsWeight, pickWeighted, pickWeightedExcluding } from "./srs"

export type {
  Profile, Session, DailyTotal, QuizType, ProgressCallback, BackupBlob, ImportResult,
  ItemMastery, Milestone,
} from "./store"
