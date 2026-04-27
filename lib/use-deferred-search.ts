"use client"

import { useEffect, useRef, useState } from "react"

interface Options {
  /** Debounce window in ms after last keystroke / IME end. 150ms feels live without thrashing. */
  debounceMs?: number
}

/**
 * Search-input value with two output channels:
 *   - `value`        the live string (binds to <input value=...>) — updates every keystroke
 *   - `deferred`     the value used for filtering — only updates after the user pauses typing
 *                    AND has finished any in-progress IME composition
 *
 * The IME guard matters because Japanese (and other CJK) input fires `onChange` for every
 * partial composition character. Without the guard, typing 'umi' would fire intermediate
 * filters on 'u', 'um', 'umi' — but also on the half-formed kana states the IME emits as
 * ghost-text, which makes the result list jitter and steals scroll position. The fix is
 * standard: don't update `deferred` while `compositionstart` has fired but `compositionend`
 * has not.
 *
 * Bind via:
 *   const search = useDeferredSearch()
 *   <Input
 *     value={search.value}
 *     onChange={(e) => search.setValue(e.target.value)}
 *     onCompositionStart={search.onCompositionStart}
 *     onCompositionEnd={(e) => search.onCompositionEnd(e.currentTarget.value)}
 *   />
 *
 * Filter against `search.deferred`.
 */
export function useDeferredSearch(initial = "", options: Options = {}) {
  const debounceMs = options.debounceMs ?? 150

  const [value, setValueState] = useState(initial)
  const [deferred, setDeferred] = useState(initial)
  const composingRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Schedule a deferred update unless we're mid-composition. Caller passes the
  // *latest* value so we don't read stale state.
  const schedule = (next: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (composingRef.current) return
    timerRef.current = setTimeout(() => setDeferred(next), debounceMs)
  }

  const setValue = (next: string) => {
    setValueState(next)
    schedule(next)
  }

  const onCompositionStart = () => {
    composingRef.current = true
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  // Pass the input's current value here — the React onChange that fires alongside
  // compositionend is sometimes a frame later, and we want the filter to commit to
  // the just-finalized text without that gap.
  const onCompositionEnd = (committedValue: string) => {
    composingRef.current = false
    setValueState(committedValue)
    schedule(committedValue)
  }

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    composingRef.current = false
    setValueState("")
    setDeferred("")
  }

  return { value, deferred, setValue, onCompositionStart, onCompositionEnd, clear }
}
