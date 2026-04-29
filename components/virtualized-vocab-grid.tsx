"use client"

import { Fragment, useEffect, useRef } from "react"
import { useWindowVirtualizer } from "@tanstack/react-virtual"
import VocabDetail from "@/components/vocab-detail"
import { useResponsiveCols, TW_BREAKPOINTS } from "@/lib/use-cols"
import { useTranslation } from "@/lib/i18n/use-translation"
import { getVocabMeaning, type VocabItem } from "@/data/vocabulary-data"

interface Props {
  items: VocabItem[]
  level: string
  selected: VocabItem | null
  onSelect: (v: VocabItem | null) => void
}

const ROW_ESTIMATE = 90

/**
 * Virtualized responsive grid of vocab cards. Mirrors VirtualizedKanjiGrid
 * (window scroll, row chunking, measureElement) but with vocab card markup
 * and vocab-list's column scale (1 → 2 at xl, never 3).
 *
 * Keeping the kanji and vocab grids as parallel components rather than one
 * generic grid because the card markup is materially different (vocab has
 * word + romaji + meaning vs kanji's glyph + meanings + JLPT badge + examples
 * count) and abstracting it forces a render-card prop that hurts readability.
 */
export function VirtualizedVocabGrid({ items, level, selected, onSelect }: Props) {
  const { t, locale } = useTranslation()
  const cols = useResponsiveCols(
    [{ minWidth: TW_BREAKPOINTS.xl, cols: 2 }],
    1,
  )

  const parentRef = useRef<HTMLDivElement | null>(null)
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
    overscan: 5,
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
              paddingBottom: 12,
            }}
          >
            {rowItems.map((vocab, i) => {
              const isSelected = selected?.word === vocab.word
              const meaning = getVocabMeaning(vocab, locale)
              const action = isSelected
                ? t("vocabList.card.hideDetails")
                : t("vocabList.card.viewDetails")
              return (
                <Fragment key={`${vocab.word}-${startIdx + i}`}>
                  <button
                    type="button"
                    aria-label={t("vocabList.card.aria", {
                      word: vocab.word,
                      meaning,
                      levelSuffix: "",
                      action,
                    })}
                    aria-pressed={isSelected}
                    onClick={() => onSelect(isSelected ? null : vocab)}
                    className={`block w-full text-left border rounded-lg p-3.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 ${
                      isSelected
                        ? "border-vermilion/60 bg-vermilion/5 shadow-[0_2px_10px_-2px_rgba(200,85,61,0.2)]"
                        : "border-sumi/10 bg-white/60 hover:border-vermilion/40 hover:shadow-[0_2px_8px_-2px_rgba(168,124,47,0.15)]"
                    }`}
                  >
                    <div lang="ja" className="text-xl font-bold mb-1 text-sumi leading-tight">
                      {vocab.word}
                    </div>
                    <p className="text-sm font-medium text-sumi line-clamp-1">{meaning}</p>
                    <p className="text-xs text-sumi/70 italic">{vocab.romaji}</p>
                  </button>
                  {isSelected && cols === 1 && (
                    <div className="md:hidden col-span-full mt-1 mb-2">
                      <VocabDetail vocab={vocab} level={level} onClose={() => onSelect(null)} />
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
