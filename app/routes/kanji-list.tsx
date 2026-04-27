import { createFileRoute } from '@tanstack/react-router'

import { Fragment, useMemo, useState } from "react"
import { kanjiData } from "@/data/kanji-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Pencil, PenLine } from "lucide-react"
import { Link } from "@tanstack/react-router"
import KanjiDetail from "@/components/kanji-detail"
import { SegmentedControl } from "@/components/segmented-control"
import { JLPT_LEVELS } from "@/components/level-selector"
import type { Kanji } from "@/data/kanji-data"

const ALL_KANJI_LEVELS: string[] = Object.keys(kanjiData)
const ALL_KANJI_FLAT: Array<Kanji & { _level: string }> = ALL_KANJI_LEVELS.flatMap((lvl) =>
  kanjiData[lvl as keyof typeof kanjiData].map((k) => ({ ...k, _level: lvl })),
)
const LEVEL_RANK: Record<string, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 }

function matchesSearch(k: Kanji, term: string): boolean {
  const lower = term.toLowerCase()
  return (
    k.kanji.includes(term) ||
    k.meaning.some((m) => m.toLowerCase().includes(lower)) ||
    k.romaji.toLowerCase().includes(lower) ||
    k.onReading.toLowerCase().includes(lower) ||
    k.onReadingRomaji.toLowerCase().includes(lower) ||
    k.kunReading.toLowerCase().includes(lower) ||
    k.kunReadingRomaji.toLowerCase().includes(lower)
  )
}

const DetailEmptyState = () => (
  <Card className="border-dashed border-sumi/20 bg-white/40">
    <CardContent className="py-20 text-center">
      <p lang="ja" aria-hidden="true" className="font-jp text-6xl text-vermilion/30 mb-4 leading-none">
        漢字
      </p>
      <p className="font-display italic text-base text-sumi/70 mb-2">
        Pick a kanji to start studying
      </p>
      <p className="text-xs text-sumi/70 max-w-[24ch] mx-auto leading-relaxed">
        Tap any character on the left to see its readings, strokes, and example words.
      </p>
    </CardContent>
  </Card>
)

function KanjiListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKanji, setSelectedKanji] = useState<Kanji | null>(null)
  const [activeLevel, setActiveLevel] = useState<string>("N5")

  const trimmed = searchTerm.trim()
  const isSearching = trimmed.length > 0

  // Cross-level results when searching. Sorted N5 → N1 so beginner matches come
  // first — same heuristic /draw-search uses.
  const searchResults = useMemo(() => {
    if (!isSearching) return [] as Array<Kanji & { _level: string }>
    return ALL_KANJI_FLAT
      .filter((k) => matchesSearch(k, trimmed))
      .sort((a, b) => (LEVEL_RANK[a._level] ?? 9) - (LEVEL_RANK[b._level] ?? 9))
  }, [trimmed, isSearching])

  return (
    <div className="py-6 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight mb-1">
            JLPT Kanji
          </h1>
          <p className="font-display italic text-sumi/70 text-base">
            Browse every kanji from N5 (beginner) to N1 (advanced).
          </p>
          <nav aria-label="Related actions" className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-display italic">
            <Link
              to="/draw-search"
              className="inline-flex items-center gap-1.5 text-sumi/80 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
            >
              <PenLine aria-hidden="true" className="h-3.5 w-3.5" />
              Don't know the character? Find by drawing
            </Link>
            <Link
              to="/draw"
              className="inline-flex items-center gap-1.5 text-sumi/80 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
            >
              <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
              Practice stroke order
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 text-sumi/80 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
            >
              <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
              Take a quiz
            </Link>
          </nav>
        </header>

        <div className="relative mb-6">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sumi/70" />
          <Input
            type="search"
            aria-label="Search kanji by character, meaning, or pronunciation"
            placeholder="Search kanji, meaning, or pronunciation…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/70 border-sumi/15"
          />
        </div>

        {isSearching ? (
          <div className="grid gap-6 lg:gap-10 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-xl text-sumi font-medium">
                    Search results <span className="text-sumi/70 font-normal italic">({searchResults.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {searchResults.length === 0 ? (
                    <div className="py-16 text-center" role="status">
                      <p className="font-display italic text-lg text-sumi/70 mb-2">
                        No kanji match &ldquo;{trimmed}&rdquo;
                      </p>
                      <p className="text-sm text-sumi/70">Try a meaning, on/kun reading, or the kanji itself.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                      {searchResults.map((kanji, index) => {
                        const isSelected = selectedKanji?.kanji === kanji.kanji
                        return (
                          <Fragment key={`${kanji.kanji}-${index}`}>
                            <button
                              type="button"
                              aria-label={`${kanji.kanji}, ${kanji.meaning.join(', ')}, JLPT ${kanji._level}. ${isSelected ? 'Hide details.' : 'View details.'}`}
                              aria-pressed={isSelected}
                              className={`block w-full text-left border rounded-lg p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 ${
                                isSelected
                                  ? "border-vermilion/60 bg-vermilion/5 shadow-[0_2px_10px_-2px_rgba(200,85,61,0.2)]"
                                  : "border-sumi/10 bg-white/60 hover:border-vermilion/40 hover:shadow-[0_2px_8px_-2px_rgba(168,124,47,0.15)]"
                              }`}
                              onClick={() => setSelectedKanji(isSelected ? null : kanji)}
                            >
                              <div lang="ja" className="text-3xl sm:text-4xl font-bold mb-1.5 text-center text-sumi leading-none">
                                {kanji.kanji}
                              </div>
                              <p className="text-xs sm:text-sm font-medium text-sumi text-center line-clamp-1">
                                {kanji.meaning.join(', ')}
                              </p>
                              <p className="text-[10px] text-sumi/70 text-center mt-1.5 flex items-center gap-1.5 justify-center">
                                <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-normal border-sumi/20">
                                  {kanji._level}
                                </Badge>
                                <span className="inline-flex items-center gap-1">
                                  <BookOpen aria-hidden="true" className="h-2.5 w-2.5" />
                                  {kanji.examples.length}
                                </span>
                              </p>
                            </button>
                            {isSelected && (
                              <div className="md:hidden col-span-full mt-1 mb-2">
                                <KanjiDetail kanji={kanji} onClose={() => setSelectedKanji(null)} />
                              </div>
                            )}
                          </Fragment>
                        )
                      })}
                    </div>
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
                items={JLPT_LEVELS}
                value={activeLevel}
                onChange={(v) => {
                  setActiveLevel(v)
                  setSelectedKanji(null)
                }}
                ariaLabel="JLPT level"
              />
            </div>

            {(() => {
              const list = kanjiData[activeLevel as keyof typeof kanjiData]
              return (
                <div className="grid gap-6 lg:gap-10 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-display text-xl text-sumi font-medium">
                          JLPT {activeLevel} Kanji <span className="text-sumi/70 font-normal italic">({list.length})</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                          {list.map((kanji, index) => {
                            const isSelected = selectedKanji?.kanji === kanji.kanji
                            return (
                              <Fragment key={index}>
                                <button
                                  type="button"
                                  aria-label={`${kanji.kanji}, ${kanji.meaning.join(', ')}. ${isSelected ? 'Hide details.' : 'View details.'}`}
                                  aria-pressed={isSelected}
                                  className={`block w-full text-left border rounded-lg p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 ${
                                    isSelected
                                      ? "border-vermilion/60 bg-vermilion/5 shadow-[0_2px_10px_-2px_rgba(200,85,61,0.2)]"
                                      : "border-sumi/10 bg-white/60 hover:border-vermilion/40 hover:shadow-[0_2px_8px_-2px_rgba(168,124,47,0.15)]"
                                  }`}
                                  onClick={() => setSelectedKanji(isSelected ? null : kanji)}
                                >
                                  <div lang="ja" className="text-3xl sm:text-4xl font-bold mb-1.5 text-center text-sumi leading-none">
                                    {kanji.kanji}
                                  </div>
                                  <p className="text-xs sm:text-sm font-medium text-sumi text-center line-clamp-1">
                                    {kanji.meaning.join(', ')}
                                  </p>
                                  <p className="text-[10px] text-sumi/70 text-center mt-1 inline-flex items-center gap-1 w-full justify-center">
                                    <BookOpen aria-hidden="true" className="h-2.5 w-2.5" />
                                    {kanji.examples.length}
                                  </p>
                                </button>
                                {isSelected && (
                                  <div className="md:hidden col-span-full mt-1 mb-2">
                                    <KanjiDetail kanji={kanji} onClose={() => setSelectedKanji(null)} />
                                  </div>
                                )}
                              </Fragment>
                            )
                          })}
                        </div>
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
              )
            })()}
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
