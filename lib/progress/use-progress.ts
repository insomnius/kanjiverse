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
  recordAnswer,
  reset,
  getTotals,
  getDailyGoal,
  exportData,
  importData,
  getRecentSessions,
  DEFAULT_DAILY_GOAL,
  MIN_DAILY_GOAL,
  MAX_DAILY_GOAL,
} from "./store"

export type { Profile, Session, DailyTotal, QuizType, ProgressCallback, BackupBlob, ImportResult } from "./store"
