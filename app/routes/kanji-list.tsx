import { createFileRoute } from '@tanstack/react-router'

import { Fragment, useState } from "react"
import { kanjiData } from "@/data/kanji-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Pencil, PenLine } from "lucide-react"
import { Link } from "@tanstack/react-router"
import KanjiDetail from "@/components/kanji-detail"
import type { Kanji } from "@/data/kanji-data"

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

  const filterKanji = (_level: string, kanji: Kanji[]) => {
    if (!searchTerm) return kanji
    return kanji.filter(
      (k) =>
        k.kanji.includes(searchTerm) ||
        k.meaning.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
        k.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.onReading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.kunReading.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

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

        <Tabs defaultValue="N5" className="w-full" onValueChange={() => setSelectedKanji(null)}>
          <TabsList className="grid w-full grid-cols-5 mb-6 sm:mb-8" aria-label="JLPT level">
            <TabsTrigger value="N5" className="font-display">N5</TabsTrigger>
            <TabsTrigger value="N4" className="font-display">N4</TabsTrigger>
            <TabsTrigger value="N3" className="font-display">N3</TabsTrigger>
            <TabsTrigger value="N2" className="font-display">N2</TabsTrigger>
            <TabsTrigger value="N1" className="font-display">N1</TabsTrigger>
          </TabsList>

          {Object.keys(kanjiData).map((level) => {
            const filtered = filterKanji(level, kanjiData[level as keyof typeof kanjiData])
            return (
              <TabsContent key={level} value={level}>
                <div className="grid gap-6 lg:gap-10 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
                  {/* Index column — kanji grid */}
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-display text-xl text-sumi font-medium">
                          JLPT {level} Kanji <span className="text-sumi/70 font-normal italic">({filtered.length})</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {filtered.length === 0 ? (
                          <div className="py-16 text-center" role="status">
                            <p className="font-display italic text-lg text-sumi/70 mb-2">
                              No kanji match “{searchTerm}” at JLPT {level}
                            </p>
                            <p className="text-sm text-sumi/70">Try a different level tab, or clear the search.</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            {filtered.map((kanji, index) => {
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
                                  {/* Inline detail right after the tapped card — only below md */}
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

                  {/* Detail column — sticky on md+ */}
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
              </TabsContent>
            )
          })}
        </Tabs>
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
