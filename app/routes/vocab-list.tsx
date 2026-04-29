import { createFileRoute } from '@tanstack/react-router'

import { useMemo, useRef, useState } from "react"
import { vocabularyData, type VocabItem } from "@/data/vocabulary-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Book, X } from "lucide-react"
import { Link } from "@tanstack/react-router"
import VocabDetail from "@/components/vocab-detail"
import { SegmentedControl } from "@/components/segmented-control"
import { useJlptLevels } from "@/components/level-selector"
import { VirtualizedVocabGrid } from "@/components/virtualized-vocab-grid"
import { useDeferredSearch } from "@/lib/use-deferred-search"
import { useSearchHotkey } from "@/lib/use-search-hotkey"
import { useTranslation } from "@/lib/i18n/use-translation"

function DetailEmptyState() {
  const { t } = useTranslation()
  return (
    <Card className="border-dashed border-sumi/20 bg-white/40">
      <CardContent className="py-20 text-center">
        <p lang="ja" aria-hidden="true" className="font-jp text-6xl text-vermilion/30 mb-4 leading-none">
          言葉
        </p>
        <p className="font-display italic text-base text-sumi/70 mb-2">
          {t("vocabList.empty.headline")}
        </p>
        <p className="text-xs text-sumi/70 max-w-[26ch] mx-auto leading-relaxed">
          {t("vocabList.empty.body")}
        </p>
      </CardContent>
    </Card>
  )
}

function VocabListPage() {
  const { t } = useTranslation()
  const jlptLevels = useJlptLevels()
  const search = useDeferredSearch("")
  const [selectedVocab, setSelectedVocab] = useState<{ vocab: VocabItem; level: string } | null>(null)
  const [activeLevel, setActiveLevel] = useState<string>("N5")
  const searchInputRef = useRef<HTMLInputElement>(null)

  useSearchHotkey({
    inputRef: searchInputRef,
    onEscapeClear: () => {
      search.clear()
      setSelectedVocab(null)
    },
  })

  const trimmed = search.deferred.trim()
  const filtered = useMemo<VocabItem[]>(() => {
    const list = vocabularyData[activeLevel as keyof typeof vocabularyData]
    if (!trimmed) return list
    const lower = trimmed.toLowerCase()
    return list.filter(
      (v) =>
        v.word.includes(trimmed) ||
        v.meaning.toLowerCase().includes(lower) ||
        (v.meaningId?.toLowerCase().includes(lower) ?? false) ||
        v.romaji.toLowerCase().includes(lower),
    )
  }, [activeLevel, trimmed])

  return (
    <div className="py-6 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight mb-1">
            {t("vocabList.title")}
          </h1>
          <p className="font-display italic text-sumi/70 text-base">
            {t("vocabList.subtitle")}
          </p>
          <nav aria-label={t("kanjiList.related.aria")} className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-display italic">
            <Link to="/kanji-list" className="inline-flex items-center gap-1.5 text-sumi/80 hover:text-vermilion-deep transition-colors motion-reduce:transition-none">
              <Book aria-hidden="true" className="h-3.5 w-3.5" />
              {t("nav.kanji")}
            </Link>
            <Link to="/quiz" className="inline-flex items-center gap-1.5 text-sumi/80 hover:text-vermilion-deep transition-colors motion-reduce:transition-none">
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
            aria-label={t("vocabList.search.aria")}
            aria-keyshortcuts="/"
            placeholder={t("vocabList.search.placeholder")}
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
                setSelectedVocab(null)
              }}
              aria-label={t("vocabList.search.clear.aria")}
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

        <div className="mb-6 sm:mb-8">
          <SegmentedControl
            items={jlptLevels}
            value={activeLevel}
            onChange={(v) => {
              setActiveLevel(v)
              setSelectedVocab(null)
            }}
            ariaLabel="JLPT level"
          />
        </div>

        <div className="grid gap-6 lg:gap-10 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sumi font-medium">
                  {t("vocabList.level.title", { level: activeLevel })} <span className="text-sumi/70 font-normal italic">({filtered.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filtered.length === 0 ? (
                  <div className="py-16 text-center" role="status">
                    <p className="font-display italic text-lg text-sumi/70 mb-2">
                      {t("vocabList.results.noMatches", { term: trimmed })}
                    </p>
                    <p className="text-sm text-sumi/70">{t("vocabList.results.tryHint")}</p>
                  </div>
                ) : (
                  <VirtualizedVocabGrid
                    items={filtered}
                    level={activeLevel}
                    selected={selectedVocab?.vocab ?? null}
                    onSelect={(v) => setSelectedVocab(v ? { vocab: v, level: activeLevel } : null)}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <aside className="hidden md:block">
            <div className="sticky top-20">
              {selectedVocab ? (
                <VocabDetail vocab={selectedVocab.vocab} level={selectedVocab.level} onClose={() => setSelectedVocab(null)} />
              ) : (
                <DetailEmptyState />
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

const PAGE_TITLE = 'Vocabulary Reference (JLPT N1–N5) · Kanji by Insomnius'
const PAGE_DESCRIPTION =
  'Search Japanese vocabulary by JLPT level (N1–N5). See readings, romaji, and English meanings at a glance.'

export const Route = createFileRoute('/vocab-list')({
  component: VocabListPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: 'description', content: PAGE_DESCRIPTION },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { property: 'og:url', content: 'https://kanji.insomnius.dev/vocab-list' },
      { name: 'twitter:title', content: PAGE_TITLE },
      { name: 'twitter:description', content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: 'https://kanji.insomnius.dev/vocab-list' }],
  }),
})
