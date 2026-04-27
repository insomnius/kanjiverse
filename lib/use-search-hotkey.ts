"use client"

import { useEffect, type RefObject } from "react"

interface Options {
  /** Ref to the text input that should receive focus. */
  inputRef: RefObject<HTMLInputElement | null>
  /** Called when the user presses Escape inside the focused input — typically clears the search. */
  onEscapeClear?: () => void
}

/**
 * Global search-hotkey listener: `/` or `⌘K` / `Ctrl+K` from anywhere on the
 * page focuses the input and smooth-scrolls it into view. Escape (when the
 * input itself is focused) clears + blurs.
 *
 * Why these keys:
 *   - `/`        de-facto standard on text-heavy sites (GitHub, Wikipedia,
 *                Google docs sidebar, Vim, etc.)
 *   - `⌘K`/`Ctrl+K`  the Linear/Raycast/Slack convention for command-palette
 *                style search; tactile and platform-portable
 *
 * Guarded against firing while the user is typing in *another* text field
 * (textarea, contenteditable, another input) so the hotkey doesn't steal
 * keystrokes from quiz inputs or form fields. Modifier-key combinations
 * other than the bare `/` and `⌘K`/`Ctrl+K` are also ignored to stay out of
 * platform shortcuts' way.
 */
export function useSearchHotkey({ inputRef, onEscapeClear }: Options) {
  useEffect(() => {
    const isInTextField = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) return false
      const tag = target.tagName
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        target.isContentEditable
      )
    }

    const handler = (e: KeyboardEvent) => {
      // Escape inside our search input → clear and blur. Only when our input is
      // the focused element (don't clear someone else's input).
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        e.preventDefault()
        onEscapeClear?.()
        inputRef.current?.blur()
        return
      }

      // Don't intercept while user is typing somewhere else.
      if (isInTextField(e.target)) return

      // `/` (no modifiers) → focus search.
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        focusInput(inputRef.current)
        return
      }

      // ⌘K / Ctrl+K → focus search.
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && !e.altKey && !e.shiftKey) {
        e.preventDefault()
        focusInput(inputRef.current)
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [inputRef, onEscapeClear])
}

function focusInput(el: HTMLInputElement | null) {
  if (!el) return
  // Bring it into view first — the user might be scrolled deep in the list.
  el.scrollIntoView({ behavior: "smooth", block: "start" })
  // Wait one frame for the scroll to start so focus doesn't fight it.
  requestAnimationFrame(() => {
    el.focus()
    el.select()
  })
}
