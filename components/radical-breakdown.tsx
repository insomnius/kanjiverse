"use client"

import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { kanjiData, type Kanji } from "@/data/kanji-data"
import { getRadicals } from "@/lib/radicals"

interface RadicalBreakdownProps {
  /** The kanji whose components we should surface. */
  char: string
}

const allKanjiByChar: Record<string, Kanji> = (() => {
  const map: Record<string, Kanji> = {}
  for (const level of Object.keys(kanjiData)) {
    for (const k of kanjiData[level as keyof typeof kanjiData]) map[k.kanji] = k
  }
  return map
})()

/**
 * Lists the visual components ("radicals") this kanji is built from. Each
 * component is rendered as a glyph; if it's also a kanji we have detail data
 * for, the card becomes a link to that kanji's detail page.
 *
 * Self-fetching so consumers don't need to thread radical data through props.
 * Returns null while loading (avoids layout flash for the common case of a
 * cached lookup).
 */
export function RadicalBreakdown({ char }: RadicalBreakdownProps) {
  const [parts, setParts] = useState<string[] | null>(null)

  useEffect(() => {
    let cancelled = false
    setParts(null)
    void getRadicals(char).then((r) => {
      if (!cancelled) setParts(r)
    })
    return () => {
      cancelled = true
    }
  }, [char])

  if (parts === null) return null

  if (parts.length === 0) {
    return (
      <p className="text-sm text-sumi/70 italic" role="status">
        No component decomposition available for this character.
      </p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {parts.map((p, i) => {
        const k = allKanjiByChar[p]
        const labelMeanings = k ? k.meaning.join(", ") : null
        const ariaLabel = labelMeanings
          ? `Component ${p}, ${labelMeanings}`
          : `Component ${p}`
        const inner = (
          <div className="flex items-center gap-2 px-3 py-2 bg-cream-deep rounded-md border border-sumi/5">
            <span lang="ja" className="text-2xl font-bold text-sumi leading-none">
              {p}
            </span>
            {labelMeanings && (
              <span className="text-xs text-sumi/70 line-clamp-1 max-w-[10rem]">
                {labelMeanings}
              </span>
            )}
          </div>
        )
        return k ? (
          <Link
            key={`${p}-${i}`}
            to="/kanji/$char"
            params={{ char: p }}
            aria-label={ariaLabel}
            className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 hover:[&>div]:border-vermilion/40 transition-colors motion-reduce:transition-none"
          >
            {inner}
          </Link>
        ) : (
          <div
            key={`${p}-${i}`}
            role="img"
            aria-label={ariaLabel}
          >
            {inner}
          </div>
        )
      })}
    </div>
  )
}
