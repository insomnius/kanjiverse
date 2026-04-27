import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { kanaData } from '@/data/kana-data'
import KanaDetail from '@/components/kana-detail'

type Script = "hiragana" | "katakana"

interface KanaLookup {
  kana: string
  romaji: string
  script: Script
  rowLabel: string
}

const ROW_LABELS: Record<string, string> = {
  vowels: "Vowels", k: "K-row", s: "S-row", t: "T-row", n: "N-row", h: "H-row",
  m: "M-row", y: "Y-row", r: "R-row", w: "W-row", g: "G-row", z: "Z-row",
  d: "D-row", b: "B-row", p: "P-row", ky: "KY-row", sh: "SH-row", ch: "CH-row",
  ny: "NY-row", hy: "HY-row", my: "MY-row", ry: "RY-row", gy: "GY-row",
  j: "J-row", by: "BY-row", py: "PY-row", f: "F-row", "w-ext": "W-extended",
  v: "V-row", foreign: "Foreign sounds", foreign2: "More foreign sounds",
}

const findKana = (target: string): KanaLookup | null => {
  for (const script of ["hiragana", "katakana"] as Script[]) {
    for (const sectionKey of Object.keys(kanaData[script]) as Array<keyof typeof kanaData.hiragana>) {
      for (const row of kanaData[script][sectionKey]) {
        for (const char of row.chars) {
          if (char.kana === target) {
            return {
              kana: char.kana,
              romaji: char.romaji,
              script,
              rowLabel: ROW_LABELS[row.row] || row.row.toUpperCase(),
            }
          }
        }
      }
    }
  }
  return null
}

function KanaCharacterPage() {
  const { char } = Route.useParams()
  const decoded = decodeURIComponent(char)
  const lookup = findKana(decoded)

  return (
    <div className="max-w-3xl mx-auto py-2 sm:py-4">
      <Link
        to="/kana-reference"
        className="inline-flex items-center gap-2 text-sm font-display italic text-sumi/70 hover:text-vermilion-deep mb-6 transition-colors"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to Kana
      </Link>

      {lookup ? (
        <>
          <h1 className="sr-only">
            <span lang="ja">{lookup.kana}</span> ({lookup.romaji}) — {lookup.script === "hiragana" ? "Hiragana" : "Katakana"}
          </h1>
          <h2 className="sr-only">Kana details</h2>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "DefinedTerm",
                name: lookup.kana,
                inLanguage: "ja",
                alternateName: lookup.romaji,
                description: `The ${lookup.script} character ${lookup.kana} is pronounced "${lookup.romaji}". Part of the ${lookup.rowLabel}.`,
                url: `https://kanji.insomnius.dev/kana/${encodeURIComponent(lookup.kana)}`,
                inDefinedTermSet: {
                  "@type": "DefinedTermSet",
                  name: lookup.script === "hiragana" ? "Hiragana" : "Katakana",
                  url: "https://kanji.insomnius.dev/kana-reference",
                },
              }),
            }}
          />
          <KanaDetail kana={lookup.kana} romaji={lookup.romaji} script={lookup.script} rowLabel={lookup.rowLabel} />
        </>
      ) : (
        <div className="text-center py-16">
          <p lang="ja" className="text-6xl font-bold text-sumi/30 mb-4">{decoded}</p>
          <h1 className="font-display text-2xl text-sumi mb-3">Kana not found</h1>
          <p className="font-display italic text-sumi/70 max-w-md mx-auto">
            We don't have data for this character in the hiragana or katakana tables.
          </p>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute('/kana/$char')({
  component: KanaCharacterPage,
  head: ({ params }) => {
    const decoded = decodeURIComponent(params.char)
    const lookup = findKana(decoded)
    const url = `https://kanji.insomnius.dev/kana/${params.char}`

    if (!lookup) {
      return {
        meta: [
          { title: `${decoded} — Kanji by Insomnius` },
          { name: 'description', content: `We don't have data for the kana ${decoded} in the hiragana or katakana tables.` },
          { name: 'robots', content: 'noindex,follow' },
          { property: 'og:title', content: `${decoded} — Kanji by Insomnius` },
          { property: 'og:url', content: url },
        ],
        links: [{ rel: 'canonical', href: url }],
      }
    }

    const scriptCap = lookup.script === "hiragana" ? "Hiragana" : "Katakana"
    const title = `${lookup.kana} (${lookup.romaji}) — ${scriptCap} · Kanji by Insomnius`
    const desc = `The ${lookup.script} character ${lookup.kana} is pronounced "${lookup.romaji}". Part of the ${lookup.rowLabel}. See its counterpart in the other Japanese script.`

    return {
      meta: [
        { title },
        { name: 'description', content: desc },
        {
          name: 'keywords',
          content: `${lookup.kana}, ${lookup.romaji}, ${lookup.script}, ${scriptCap}, ${lookup.rowLabel}, Japanese kana`,
        },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: 'https://kanji.insomnius.dev/kv.png' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: 'https://kanji.insomnius.dev/kv.png' },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
})
