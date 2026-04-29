import { createFileRoute } from '@tanstack/react-router'

import { useMemo, useRef, useState } from "react"
import { kanjiData } from "@/data/kanji-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Pencil, PenLine, X } from "lucide-react"
import { Link } from "@tanstack/react-router"
import KanjiDetail from "@/components/kanji-detail"
import { SegmentedControl } from "@/components/segmented-control"
import { useJlptLevels } from "@/components/level-selector"
import { VirtualizedKanjiGrid, type KanjiWithLevel } from "@/components/virtualized-kanji-grid"
import { useDeferredSearch } from "@/lib/use-deferred-search"
import { useSearchHotkey } from "@/lib/use-search-hotkey"
import { useTranslation } from "@/lib/i18n/use-translation"
import type { Kanji } from "@/data/kanji-data"
import type { Locale } from "@/lib/progress/use-progress"

const ALL_KANJI_LEVELS: string[] = Object.keys(kanjiData)
const ALL_KANJI_FLAT: KanjiWithLevel[] = ALL_KANJI_LEVELS.flatMap((lvl) =>
  kanjiData[lvl as keyof typeof kanjiData].map((k) => ({ ...k, _level: lvl })),
)
const LEVEL_RANK: Record<string, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 }

function matchesSearch(k: Kanji, term: string, locale: Locale): boolean {
  const lower = term.toLowerCase()
  // Always also check English meanings — search should match either language
  // so a user typing "water" in ID locale still finds 水, and vice versa.
  const localizedMeanings = locale === "id" && k.meaningId ? k.meaningId : k.meaning
  return (
    k.kanji.includes(term) ||
    k.meaning.some((m) => m.toLowerCase().includes(lower)) ||
    localizedMeanings.some((m) => m.toLowerCase().includes(lower)) ||
    k.romaji.toLowerCase().includes(lower) ||
    k.onReading.toLowerCase().includes(lower) ||
    k.onReadingRomaji.toLowerCase().includes(lower) ||
    k.kunReading.toLowerCase().includes(lower) ||
    k.kunReadingRomaji.toLowerCase().includes(lower)
  )
}

function DetailEmptyState() {
  const { t } = useTranslation()
  return (
    <Card className="border-dashed border-sumi/20 bg-white/40">
      <CardContent className="py-20 text-center">
        <p lang="ja" aria-hidden="true" className="font-jp text-6xl text-vermilion/30 mb-4 leading-none">
          漢字
        </p>
        <p className="font-display italic text-base text-sumi/70 mb-2">
          {t("kanjiList.empty.headline")}
        </p>
        <p className="text-xs text-sumi/70 max-w-[24ch] mx-auto leading-relaxed">
          {t("kanjiList.empty.body")}
        </p>
      </CardContent>
    </Card>
  )
}

function KanjiListPage() {
  const { t, locale } = useTranslation()
  const jlptLevels = useJlptLevels()
  const search = useDeferredSearch("")
  const [selectedKanji, setSelectedKanji] = useState<Kanji | null>(null)
  const [activeLevel, setActiveLevel] = useState<string>("N5")
  const searchInputRef = useRef<HTMLInputElement>(null)

  useSearchHotkey({
    inputRef: searchInputRef,
    onEscapeClear: () => {
      search.clear()
      setSelectedKanji(null)
    },
  })

  const trimmed = search.deferred.trim()
  const isSearching = trimmed.length > 0

  // Cross-level results when searching. Sorted N5 → N1 so beginner matches come
  // first — same heuristic /draw-search uses.
  const searchResults = useMemo<KanjiWithLevel[]>(() => {
    if (!isSearching) return []
    return ALL_KANJI_FLAT
      .filter((k) => matchesSearch(k, trimmed, locale))
      .sort((a, b) => (LEVEL_RANK[a._level ?? ""] ?? 9) - (LEVEL_RANK[b._level ?? ""] ?? 9))
  }, [trimmed, isSearching, locale])

  const levelItems = useMemo<KanjiWithLevel[]>(
    () => kanjiData[activeLevel as keyof typeof kanjiData] as KanjiWithLevel[],
    [activeLevel],
  )

  return (
    <div className="py-6 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight mb-1">
            {t("kanjiList.title")}
          </h1>
          <p className="font-display italic text-sumi/70 text-base">
            {t("kanjiList.subtitle")}
          </p>
          <nav aria-label={t("kanjiList.related.aria")} className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-display italic">
            <Link
              to="/draw-search"
              className="inline-flex items-center gap-1.5 text-sumi/80 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
            >
              <PenLine aria-hidden="true" className="h-3.5 w-3.5" />
              {t("kanjiList.related.draw")}
            </Link>
            <Link
              to="/draw"
              className="inline-flex items-center gap-1.5 text-sumi/80 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
            >
              <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
              {t("kanjiList.related.practice")}
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 text-sumi/80 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
            >
              <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
              {t("kanjiList.related.quiz")}
            </Link>
          </nav>
        </header>

        <div className="relative mb-6">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sumi/70 pointer-events-none" />
          <Input
            ref={searchInputRef}
            type="search"
            aria-label={t("kanjiList.search.aria")}
            aria-keyshortcuts="/"
            placeholder={t("kanjiList.search.placeholder")}
            value={search.value}
            onChange={(e) => search.setValue(e.target.value)}
            onCompositionStart={search.onCompositionStart}
            onCompositionEnd={(e) => search.onCompositionEnd(e.currentTarget.value)}
            className="pl-10 pr-20 sm:pr-24 bg-white/80 border-sumi/15"
            enterKeyHint="search"
            autoComplete="off"
            spellCheck={false}
          />
          {search.value ? (
            <button
              type="button"
              onClick={() => {
                search.clear()
                setSelectedKanji(null)
              }}
              aria-label={t("kanjiList.search.clear.aria")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-sumi/60 hover:text-vermilion-deep hover:bg-sumi/5 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          ) : (
            <kbd
              aria-hidden="true"
              className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded border border-sumi/20 bg-cream-deep text-sumi/70 font-mono text-[0.65rem] font-medium pointer-events-none"
            >
              /
            </kbd>
          )}
        </div>

        {isSearching ? (
          <div className="grid gap-6 lg:gap-10 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-xl text-sumi font-medium">
                    {t("kanjiList.results.title")} <span className="text-sumi/70 font-normal italic">({searchResults.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {searchResults.length === 0 ? (
                    <div className="py-16 text-center" role="status">
                      <p className="font-display italic text-lg text-sumi/70 mb-2">
                        {t("kanjiList.results.noMatches", { term: trimmed })}
                      </p>
                      <p className="text-sm text-sumi/70">{t("kanjiList.results.tryHint")}</p>
                    </div>
                  ) : (
                    <VirtualizedKanjiGrid
                      items={searchResults}
                      selected={selectedKanji}
                      onSelect={setSelectedKanji}
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            <aside className="hidden md:block">
              <div className="sticky top-20">
                {selectedKanji ? (
                  <KanjiDetail kanji={selectedKanji} onClose={() => setSelectedKanji(null)} />
                ) : (
                  <DetailEmptyState />
                )}
              </div>
            </aside>
          </div>
        ) : (
          <>
            <div className="mb-6 sm:mb-8">
              <SegmentedControl
                items={jlptLevels}
                value={activeLevel}
                onChange={(v) => {
                  setActiveLevel(v)
                  setSelectedKanji(null)
                }}
                ariaLabel="JLPT level"
              />
            </div>

            <div className="grid gap-6 lg:gap-10 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-xl text-sumi font-medium">
                      {t("kanjiList.level.title", { level: activeLevel })} <span className="text-sumi/70 font-normal italic">({levelItems.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VirtualizedKanjiGrid
                      items={levelItems}
                      selected={selectedKanji}
                      onSelect={setSelectedKanji}
                    />
                  </CardContent>
                </Card>
              </div>

              <aside className="hidden md:block">
                <div className="sticky top-20">
                  {selectedKanji ? (
                    <KanjiDetail kanji={selectedKanji} onClose={() => setSelectedKanji(null)} />
                  ) : (
                    <DetailEmptyState />
                  )}
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const PAGE_TITLE = 'Kanji Reference (JLPT N1–N5) · Kanji by Insomnius'
const PAGE_DESCRIPTION =
  'Browse and search Japanese kanji by JLPT level (N1–N5). Look up meanings, on/kun readings, and example words.'

export const Route = createFileRoute('/kanji-list')({
  component: KanjiListPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: 'description', content: PAGE_DESCRIPTION },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { property: 'og:url', content: 'https://kanji.insomnius.dev/kanji-list' },
      { name: 'twitter:title', content: PAGE_TITLE },
      { name: 'twitter:description', content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: 'https://kanji.insomnius.dev/kanji-list' }],
  }),
})
