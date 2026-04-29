"use client"

import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { kanjiData, getKanjiMeaning, type Kanji } from "@/data/kanji-data"
import { findSimilarKanji, type SimilarKanjiResult } from "@/lib/similar-kanji"
import { useTranslation } from "@/lib/i18n/use-translation"

interface SimilarKanjiProps {
  /** The character whose visual neighbours we should surface. */
  char: string
  /** How many to show. Default 6 fits a 2×3 / 3×2 grid cleanly. */
  count?: number
}

const allKanjiByChar: Record<string, Kanji> = (() => {
  const map: Record<string, Kanji> = {}
  for (const level of Object.keys(kanjiData)) {
    for (const k of kanjiData[level as keyof typeof kanjiData]) map[k.kanji] = k
  }
  return map
})()

/**
 * Surfaces visually-similar kanji on a detail panel — same matcher as /draw-search,
 * scoped to the JLPT N1–N5 set.
 *
 * Self-fetching. Lazy-loads the stroke-features chunk only when this tab/section
 * is actually rendered, so the kanji-detail bundle stays small for users who
 * never open the Similar tab.
 */
export function SimilarKanji({ char, count = 6 }: SimilarKanjiProps) {
  const { t, locale } = useTranslation()
  const [results, setResults] = useState<SimilarKanjiResult[] | null>(null)

  useEffect(() => {
    let cancelled = false
    setResults(null)
    void findSimilarKanji(char, count).then((r) => {
      if (!cancelled) setResults(r)
    })
    return () => {
      cancelled = true
    }
  }, [char, count])

  if (results === null) {
    return (
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        role="status"
        aria-live="polite"
        aria-label={t("similarKanji.loading.aria")}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-[88px] rounded-md bg-cream-deep/60 border border-sumi/5 animate-pulse motion-reduce:animate-none"
          />
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <p className="text-sm text-sumi/70 italic text-center py-4" role="status">
        {t("similarKanji.empty")}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {results.map(({ char: similarChar }) => {
        const k = allKanjiByChar[similarChar]
        const meanings = k ? getKanjiMeaning(k, locale).join(", ") : ""
        return (
          <Link
            key={similarChar}
            to="/kanji/$char"
            params={{ char: similarChar }}
            className="group flex items-center gap-3 p-3 bg-cream-deep rounded-md border border-sumi/5 hover:border-vermilion/40 hover:shadow-[0_2px_8px_-2px_rgba(168,124,47,0.15)] transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
            aria-label={meanings ? `${similarChar}, ${meanings}` : similarChar}
          >
            <span lang="ja" className="text-3xl font-bold text-sumi leading-none shrink-0">
              {similarChar}
            </span>
            {k && (
              <span className="text-xs text-sumi/70 line-clamp-2 group-hover:text-sumi transition-colors motion-reduce:transition-none">
                {meanings}
              </span>
            )}
          </Link>
        )
      })}
    </div>
  )
}
