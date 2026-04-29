import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { vocabularyData, getVocabMeaning, type VocabItem } from '@/data/vocabulary-data'
import VocabDetail from '@/components/vocab-detail'
import { useTranslation } from '@/lib/i18n/use-translation'

const findVocabAcrossLevels = (word: string): { vocab: VocabItem; level: string } | null => {
  for (const level of Object.keys(vocabularyData) as Array<keyof typeof vocabularyData>) {
    const found = vocabularyData[level].find((v: VocabItem) => v.word === word)
    if (found) return { vocab: found, level }
  }
  return null
}

function VocabWordPage() {
  const { word } = Route.useParams()
  const decoded = decodeURIComponent(word)
  const result = findVocabAcrossLevels(decoded)
  const { t, locale } = useTranslation()
  const localizedMeaning = result ? getVocabMeaning(result.vocab, locale) : ""

  return (
    <div className="max-w-3xl mx-auto py-2 sm:py-4">
      <Link
        to="/vocab-list"
        className="inline-flex items-center gap-2 text-sm font-display italic text-sumi/70 hover:text-vermilion-deep mb-6 transition-colors"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        {t("page.vocab.back")}
      </Link>

      {result ? (
        <>
          <h1 className="sr-only">
            <span lang="ja">{result.vocab.word}</span> — {localizedMeaning} — {t("page.vocab.h1.suffix", { level: result.level })}
          </h1>
          <h2 className="sr-only">{t("page.vocab.h2")}</h2>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "DefinedTerm",
                name: result.vocab.word,
                inLanguage: "ja",
                alternateName: result.vocab.romaji,
                description: `Japanese word ${result.vocab.word} (${result.vocab.romaji}) means "${result.vocab.meaning}". JLPT level ${result.level}.`,
                url: `https://kanji.insomnius.dev/vocab/${encodeURIComponent(result.vocab.word)}`,
                inDefinedTermSet: {
                  "@type": "DefinedTermSet",
                  name: `JLPT ${result.level} Vocabulary`,
                  url: "https://kanji.insomnius.dev/vocab-list",
                },
              }),
            }}
          />
          <VocabDetail vocab={result.vocab} level={result.level} />
        </>
      ) : (
        <div className="text-center py-16">
          <p lang="ja" className="text-5xl font-bold text-sumi/30 mb-4">{decoded}</p>
          <h1 className="font-display text-2xl text-sumi mb-3">{t("page.vocab.notFound.title")}</h1>
          <p className="font-display italic text-sumi/70 max-w-md mx-auto">
            {t("page.vocab.notFound.body")}
          </p>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute('/vocab/$word')({
  component: VocabWordPage,
  head: ({ params }) => {
    const decoded = decodeURIComponent(params.word)
    const result = findVocabAcrossLevels(decoded)
    const url = `https://kanji.insomnius.dev/vocab/${params.word}`

    if (!result) {
      return {
        meta: [
          { title: `${decoded} — Kanji by Insomnius` },
          { name: 'description', content: `We don't have data for the Japanese word ${decoded} in our vocabulary set.` },
          { name: 'robots', content: 'noindex,follow' },
          { property: 'og:title', content: `${decoded} — Kanji by Insomnius` },
          { property: 'og:url', content: url },
        ],
        links: [{ rel: 'canonical', href: url }],
      }
    }

    const { vocab, level } = result
    const title = `${vocab.word} — ${vocab.meaning} · JLPT ${level} vocabulary · Kanji by Insomnius`
    const desc = `Japanese word ${vocab.word} (${vocab.romaji}) means "${vocab.meaning}". Reading, romaji, and the kanji it's built from. JLPT level ${level}.`

    return {
      meta: [
        { title },
        { name: 'description', content: desc },
        {
          name: 'keywords',
          content: `${vocab.word}, ${vocab.meaning}, ${vocab.romaji}, JLPT ${level} vocabulary, Japanese word, ${vocab.word} meaning`,
        },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: 'https://kanji.insomnius.dev/kv.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'article:tag', content: `JLPT ${level}` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: 'https://kanji.insomnius.dev/kv.png' },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
})
