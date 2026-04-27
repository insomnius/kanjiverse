"use client"

import { useEffect, useState } from "react"

interface Breakpoint {
  /** CSS min-width media query value, e.g. 768. */
  minWidth: number
  /** Number of columns at and above this breakpoint. */
  cols: number
}

/**
 * Returns the active column count for a Tailwind-aligned grid that
 * virtualization needs to know up front (chunking items into rows).
 *
 * Breakpoints are min-width thresholds in CSS px; the highest matching one wins.
 * Default falls back to the first breakpoint's cols when nothing matches (i.e.
 * narrowest viewport). Server-render gets `defaultCols` to avoid hydration flash.
 */
export function useResponsiveCols(breakpoints: Breakpoint[], defaultCols: number): number {
  const computeCols = () => {
    if (typeof window === "undefined") return defaultCols
    let active = defaultCols
    for (const bp of breakpoints) {
      if (window.matchMedia(`(min-width: ${bp.minWidth}px)`).matches) {
        active = bp.cols
      }
    }
    return active
  }

  const [cols, setCols] = useState<number>(computeCols)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mqls = breakpoints.map((bp) => window.matchMedia(`(min-width: ${bp.minWidth}px)`))
    const update = () => setCols(computeCols())
    for (const mql of mqls) mql.addEventListener("change", update)
    // Re-evaluate on mount so SSR fallback gets corrected.
    update()
    return () => {
      for (const mql of mqls) mql.removeEventListener("change", update)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(breakpoints)])

  return cols
}

/** Tailwind breakpoint defaults (md=768, lg=1024, xl=1280). Use directly with useResponsiveCols. */
export const TW_BREAKPOINTS = {
  md: 768,
  lg: 1024,
  xl: 1280,
} as const
