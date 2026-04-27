"use client"

import { Fragment, useEffect, useRef } from "react"
import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"
import KanjiDetail from "@/components/kanji-detail"
import { useResponsiveCols, TW_BREAKPOINTS } from "@/lib/use-cols"
import type { Kanji } from "@/data/kanji-data"

export interface KanjiWithLevel extends Kanji {
  /** Optional JLPT level — when present, a small badge renders on each card. */
  _level?: string
}

interface Props {
  items: KanjiWithLevel[]
  selected: Kanji | null
  onSelect: (k: Kanji | null) => void
}

/** Estimate per virtual row in px — adjusted by react-virtual's measureElement on layout. */
const ROW_ESTIMATE = 120

/**
 * Virtualized responsive grid of kanji cards. Uses window scroll (no nested
 * scroller) so the page's native scroll, sticky aside, and sticky search
 * continue to behave normally.
 *
 * Columns: 1 / 2 / 3 at md / xl breakpoints. We chunk items into rows
 * client-side and virtualize over rows; the virtualizer never sees individual
 * cards, which keeps the math simple and the per-row layout responsive.
 *
 * Inline detail expansion: on mobile (cols=1), tapping a card expands a
 * `<KanjiDetail>` panel inside the same virtual row via `col-span-full`. The
 * `measureElement` callback picks up the height change so the rest of the
 * list shifts smoothly. On md+ the detail lives in the page's sticky aside,
 * so this branch doesn't render.
 *
 * Keying: items keyed on `kanji + index` because cross-level search can yield
 * the same character from different (deduped) JLPT entries — defensively safe.
 */
export function VirtualizedKanjiGrid({ items, selected, onSelect }: Props) {
  const cols = useResponsiveCols(
    [
      { minWidth: TW_BREAKPOINTS.md, cols: 2 },
      { minWidth: TW_BREAKPOINTS.xl, cols: 3 },
    ],
    1,
  )

  const parentRef = useRef<HTMLDivElement | null>(null)
  // Window scroll requires a scrollMargin equal to the offset between the page
  // top and where this grid actually starts, otherwise the virtualizer tracks
  // off-by-one and renders blank rows above the fold.
  const scrollMarginRef = useRef(0)
  useEffect(() => {
    if (parentRef.current) {
      scrollMarginRef.current = parentRef.current.offsetTop
    }
  }, [items])

  const rowsCount = Math.ceil(items.length / cols)

  const virtualizer = useWindowVirtualizer({
    count: rowsCount,
    estimateSize: () => ROW_ESTIMATE,
    overscan: 4,
    scrollMargin: scrollMarginRef.current,
  })

  const totalSize = virtualizer.getTotalSize()
  const virtualRows = virtualizer.getVirtualItems()

  return (
    <div ref={parentRef} className="relative" style={{ height: totalSize }}>
      {virtualRows.map((virtualRow) => {
        const startIdx = virtualRow.index * cols
        const rowItems = items.slice(startIdx, startIdx + cols)
        return (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
            className="absolute left-0 top-0 w-full grid gap-3"
            style={{
              transform: `translateY(${virtualRow.start - scrollMarginRef.current}px)`,
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              paddingBottom: 12, // matches gap-3 so consecutive rows don't collide
            }}
          >
            {rowItems.map((kanji, i) => {
              const isSelected = selected?.kanji === kanji.kanji
              return (
                <Fragment key={`${kanji.kanji}-${startIdx + i}`}>
                  <button
                    type="button"
                    aria-label={`${kanji.kanji}, ${kanji.meaning.join(", ")}${
                      kanji._level ? `, JLPT ${kanji._level}` : ""
                    }. ${isSelected ? "Hide details." : "View details."}`}
                    aria-pressed={isSelected}
                    onClick={() => onSelect(isSelected ? null : kanji)}
                    className={`block w-full text-left border rounded-lg p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 ${
                      isSelected
                        ? "border-vermilion/60 bg-vermilion/5 shadow-[0_2px_10px_-2px_rgba(200,85,61,0.2)]"
                        : "border-sumi/10 bg-white/60 hover:border-vermilion/40 hover:shadow-[0_2px_8px_-2px_rgba(168,124,47,0.15)]"
                    }`}
                  >
                    <div lang="ja" className="text-3xl sm:text-4xl font-bold mb-1.5 text-center text-sumi leading-none">
                      {kanji.kanji}
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-sumi text-center line-clamp-1">
                      {kanji.meaning.join(", ")}
                    </p>
                    <p className="text-[10px] text-sumi/70 text-center mt-1.5 flex items-center gap-1.5 justify-center">
                      {kanji._level && (
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-normal border-sumi/20">
                          {kanji._level}
                        </Badge>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <BookOpen aria-hidden="true" className="h-2.5 w-2.5" />
                        {kanji.examples.length}
                      </span>
                    </p>
                  </button>
                  {/* Inline detail expansion — mobile only (md+ uses the page's sticky aside). */}
                  {isSelected && cols === 1 && (
                    <div className="md:hidden col-span-full mt-1 mb-2">
                      <KanjiDetail kanji={kanji} onClose={() => onSelect(null)} />
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
