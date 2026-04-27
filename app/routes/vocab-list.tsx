import { createFileRoute } from '@tanstack/react-router'

import { Fragment, useState } from "react"
import { vocabularyData } from "@/data/vocabulary-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Book } from "lucide-react"
import { Link } from "@tanstack/react-router"
import VocabDetail from "@/components/vocab-detail"
import { SegmentedControl } from "@/components/segmented-control"
import { JLPT_LEVELS } from "@/components/level-selector"

interface VocabItem {
  word: string;
  meaning: string;
  romaji: string;
}

const DetailEmptyState = () => (
  <Card className="border-dashed border-sumi/20 bg-white/40">
    <CardContent className="py-20 text-center">
      <p lang="ja" aria-hidden="true" className="font-jp text-6xl text-vermilion/30 mb-4 leading-none">
        言葉
      </p>
      <p className="font-display italic text-base text-sumi/70 mb-2">
        Pick a word to study its meaning
      </p>
      <p className="text-xs text-sumi/70 max-w-[26ch] mx-auto leading-relaxed">
        Tap any word on the left to see its reading and the kanji it's built from.
      </p>
    </CardContent>
  </Card>
)

function VocabListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVocab, setSelectedVocab] = useState<{ vocab: VocabItem; level: string } | null>(null)
  const [activeLevel, setActiveLevel] = useState<string>("N5")

  const filterVocab = (_level: string, vocab: VocabItem[]) => {
    if (!searchTerm) return vocab
    return vocab.filter(
      (v) =>
        v.word.includes(searchTerm) ||
        v.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.romaji.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="py-6 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight mb-1">
            JLPT Vocabulary
          </h1>
          <p className="font-display italic text-sumi/70 text-base">
            Browse Japanese vocabulary by JLPT level — readings, meanings, and the kanji that compose them.
          </p>
          <nav aria-label="Related actions" className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-display italic">
            <Link to="/kanji-list" className="inline-flex items-center gap-1.5 text-sumi/80 hover:text-vermilion-deep transition-colors motion-reduce:transition-none">
              <Book aria-hidden="true" className="h-3.5 w-3.5" />
              Browse kanji instead
            </Link>
            <Link to="/quiz" className="inline-flex items-center gap-1.5 text-sumi/80 hover:text-vermilion-deep transition-colors motion-reduce:transition-none">
              <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
              Quiz this vocabulary
            </Link>
          </nav>
        </header>

        <div className="relative mb-6">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sumi/70" />
          <Input
            type="search"
            aria-label="Search vocabulary by word, meaning, or pronunciation"
            placeholder="Search word, meaning, or pronunciation…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/70 border-sumi/15"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <SegmentedControl
            items={JLPT_LEVELS}
            value={activeLevel}
            onChange={(v) => {
              setActiveLevel(v)
              setSelectedVocab(null)
            }}
            ariaLabel="JLPT level"
          />
        </div>

        {(() => {
          const filtered = filterVocab(activeLevel, vocabularyData[activeLevel as keyof typeof vocabularyData])
          return (
            <div className="grid gap-6 lg:gap-10 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-xl text-sumi font-medium">
                      JLPT {activeLevel} Vocabulary <span className="text-sumi/70 font-normal italic">({filtered.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {filtered.length === 0 ? (
                      <div className="py-16 text-center" role="status">
                        <p className="font-display italic text-lg text-sumi/70 mb-2">
                          No vocabulary matches &ldquo;{searchTerm}&rdquo; at JLPT {activeLevel}
                        </p>
                        <p className="text-sm text-sumi/70">Try a different level, or clear the search.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                        {filtered.map((vocab, index) => {
                          const isSelected = selectedVocab?.vocab.word === vocab.word
                          return (
                            <Fragment key={index}>
                              <button
                                type="button"
                                aria-label={`${vocab.word}, ${vocab.meaning}. ${isSelected ? 'Hide details.' : 'View details.'}`}
                                aria-pressed={isSelected}
                                className={`block w-full text-left border rounded-lg p-3.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 ${
                                  isSelected
                                    ? "border-vermilion/60 bg-vermilion/5 shadow-[0_2px_10px_-2px_rgba(200,85,61,0.2)]"
                                    : "border-sumi/10 bg-white/60 hover:border-vermilion/40 hover:shadow-[0_2px_8px_-2px_rgba(168,124,47,0.15)]"
                                }`}
                                onClick={() => setSelectedVocab(isSelected ? null : { vocab, level: activeLevel })}
                              >
                                <div lang="ja" className="text-xl font-bold mb-1 text-sumi leading-tight">{vocab.word}</div>
                                <p className="text-sm font-medium text-sumi line-clamp-1">{vocab.meaning}</p>
                                <p className="text-xs text-sumi/70 italic">{vocab.romaji}</p>
                              </button>
                              {isSelected && (
                                <div className="md:hidden col-span-full mt-1 mb-2">
                                  <VocabDetail vocab={vocab} level={activeLevel} onClose={() => setSelectedVocab(null)} />
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
                  {selectedVocab ? (
                    <VocabDetail vocab={selectedVocab.vocab} level={selectedVocab.level} onClose={() => setSelectedVocab(null)} />
                  ) : (
                    <DetailEmptyState />
                  )}
                </div>
              </aside>
            </div>
          )
        })()}
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
