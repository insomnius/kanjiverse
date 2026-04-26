import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { kanjiData } from '@/data/kanji-data'
import KanjiDetail from '@/components/kanji-detail'

const findKanjiAcrossLevels = (char: string) => {
  for (const level of Object.keys(kanjiData) as Array<keyof typeof kanjiData>) {
    const found = kanjiData[level].find((k) => k.kanji === char)
    if (found) return found
  }
  return null
}

function KanjiCharacterPage() {
  const { char } = Route.useParams()
  const decoded = decodeURIComponent(char)
  const kanji = findKanjiAcrossLevels(decoded)

  return (
    <div className="max-w-3xl mx-auto py-2 sm:py-4">
      <Link
        to="/kanji-list"
        className="inline-flex items-center gap-2 text-sm font-display italic text-sumi/70 hover:text-vermilion-deep mb-6 transition-colors"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to Kanji
      </Link>

      {kanji ? (
        <>
          <script
            type="application/ld+json"
            // React 19 hoists scripts; this provides Google with structured data
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "DefinedTerm",
                name: kanji.kanji,
                inLanguage: "ja",
                alternateName: kanji.romaji,
                description: `Japanese kanji ${kanji.kanji} meaning "${kanji.meaning.join(", ")}". On reading: ${kanji.onReading}. Kun reading: ${kanji.kunReading}. JLPT level ${kanji.jlptLevel}.`,
                url: `https://kanji.insomnius.dev/kanji/${encodeURIComponent(kanji.kanji)}`,
                inDefinedTermSet: {
                  "@type": "DefinedTermSet",
                  name: `JLPT ${kanji.jlptLevel} Kanji`,
                  url: "https://kanji.insomnius.dev/kanji-list",
                },
              }),
            }}
          />
          <KanjiDetail kanji={kanji} />
        </>
      ) : (
        <div className="text-center py-16">
          <p lang="ja" className="text-6xl font-bold text-sumi/30 mb-4">{decoded}</p>
          <h1 className="font-display text-2xl text-sumi mb-3">Kanji not found</h1>
          <p className="font-display italic text-sumi/70 max-w-md mx-auto">
            We don't have data for this character in the JLPT N1–N5 set.
          </p>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute('/kanji/$char')({
  component: KanjiCharacterPage,
  head: ({ params }) => {
    const decoded = decodeURIComponent(params.char)
    const kanji = findKanjiAcrossLevels(decoded)
    const url = `https://kanji.insomnius.dev/kanji/${params.char}`

    if (!kanji) {
      return {
        meta: [
          { title: `${decoded} — Kanji by Insomnius` },
          { name: 'description', content: `We don't have data for the kanji ${decoded} in the JLPT N1–N5 set.` },
          { name: 'robots', content: 'noindex,follow' },
          { property: 'og:title', content: `${decoded} — Kanji by Insomnius` },
          { property: 'og:url', content: url },
        ],
        links: [{ rel: 'canonical', href: url }],
      }
    }

    const meanings = kanji.meaning.join(', ')
    const primaryMeaning = kanji.meaning[0]
    const title = `${kanji.kanji} — ${primaryMeaning} · JLPT ${kanji.jlptLevel} kanji · Kanji by Insomnius`
    const desc = `Learn the Japanese kanji ${kanji.kanji} meaning ${meanings}. On reading: ${kanji.onReading} (${kanji.onReadingRomaji}). Kun reading: ${kanji.kunReading || '—'}. Stroke order, examples, and JLPT ${kanji.jlptLevel} context.`

    return {
      meta: [
        { title },
        { name: 'description', content: desc },
        {
          name: 'keywords',
          content: `${kanji.kanji}, ${primaryMeaning} kanji, ${kanji.romaji}, JLPT ${kanji.jlptLevel} kanji, ${kanji.onReading}, ${kanji.kunReading}, Japanese kanji, stroke order`,
        },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: 'https://kanji.insomnius.dev/kv.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'article:tag', content: `JLPT ${kanji.jlptLevel}` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: 'https://kanji.insomnius.dev/kv.png' },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
})
