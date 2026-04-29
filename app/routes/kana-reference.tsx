import { createFileRoute } from '@tanstack/react-router'

import { useEffect, useRef, useState } from "react"
import { kanaData } from "@/data/kana-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen } from "lucide-react"
import { Link } from "@tanstack/react-router"
import KanaDetail from "@/components/kana-detail"
import { SegmentedControl, type SegmentedControlItem } from "@/components/segmented-control"
import { useTranslation } from "@/lib/i18n/use-translation"

type KanaChar = {
  kana: string;
  romaji: string;
};

// Define a type for a row of kana characters
interface KanaRow {
  row: string;
  chars: KanaChar[];
}

type Script = "hiragana" | "katakana"

function DetailEmptyState() {
  const { t } = useTranslation()
  return (
    <Card className="border-dashed border-sumi/20 bg-white/40">
      <CardContent className="py-20 text-center">
        <p lang="ja" aria-hidden="true" className="font-jp text-6xl text-vermilion/30 mb-4 leading-none">
          仮名
        </p>
        <p className="font-display italic text-base text-sumi/70 mb-2">
          {t("kanaRef.empty.headline")}
        </p>
        <p className="text-xs text-sumi/70 max-w-[26ch] mx-auto leading-relaxed">
          {t("kanaRef.empty.body")}
        </p>
      </CardContent>
    </Card>
  )
}

function KanaReferencePage() {
  const { t } = useTranslation()
  const KANA_SCRIPTS: SegmentedControlItem[] = [
    { value: "hiragana", label: t("kanaRef.script.hiragana"), description: t("kanaRef.script.hiragana.description") },
    { value: "katakana", label: t("kanaRef.script.katakana"), description: t("kanaRef.script.katakana.description") },
  ]
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKana, setSelectedKana] = useState<{ kana: string; romaji: string; script: Script; rowLabel: string } | null>(null)
  const [activeScript, setActiveScript] = useState<Script>("hiragana")
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedKana && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [selectedKana])

  // Function to filter kana based on search term
  const filterKana = (kanaArray: KanaRow[]) => {
    if (!searchTerm) return kanaArray

    return kanaArray.filter((row) =>
      row.chars.some(
        (char) => char.kana.includes(searchTerm) || char.romaji.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
  }

  // Function to render a kana row
  const renderKanaRow = (row: KanaRow, index: number, script: Script) => {
    // Skip rendering if all characters in the row are filtered out by search
    if (
      searchTerm &&
      !row.chars.some(
        (char) => char.kana.includes(searchTerm) || char.romaji.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    ) {
      return null
    }

    // Row labels: phonetic-prefix rows ("K-row", "SH-row") stay as mnemonic
    // labels in any locale because they describe the consonant prefix; only the
    // descriptive ones (vowels / foreign / extended) get translated.
    const getRowLabel = (rowType: string) => {
      switch (rowType) {
        case "vowels": return t("kanaRef.row.vowels")
        case "w-ext": return t("kanaRef.row.wExt")
        case "foreign": return t("kanaRef.row.foreign")
        case "foreign2": return t("kanaRef.row.foreign2")
        case "k": return "K-row"
        case "s": return "S-row"
        case "t": return "T-row"
        case "n": return "N-row"
        case "h": return "H-row"
        case "m": return "M-row"
        case "y": return "Y-row"
        case "r": return "R-row"
        case "w": return "W-row"
        case "g": return "G-row"
        case "z": return "Z-row"
        case "d": return "D-row"
        case "b": return "B-row"
        case "p": return "P-row"
        case "ky": return "KY-row"
        case "sh": return "SH-row"
        case "ch": return "CH-row"
        case "ny": return "NY-row"
        case "hy": return "HY-row"
        case "my": return "MY-row"
        case "ry": return "RY-row"
        case "gy": return "GY-row"
        case "j": return "J-row"
        case "by": return "BY-row"
        case "py": return "PY-row"
        case "f": return "F-row"
        case "v": return "V-row"
        default: return rowType.toUpperCase()
      }
    }

    const rowLabel = getRowLabel(row.row)
    const rowHasSelection = selectedKana?.script === script && row.chars.some((c) => c.kana === selectedKana.kana)

    return (
      <div key={index} className="mb-6">
        <div className="flex items-center mb-2">
          <div className="text-sm font-medium text-muted-foreground w-20">{rowLabel}</div>
          <div className="h-px flex-1 bg-border"></div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {row.chars.map((char: KanaChar, charIndex: number) => {
            if (!char.kana) {
              return (
                <div
                  key={charIndex}
                  className="flex flex-col items-center justify-center border border-transparent rounded-lg p-3"
                >
                  <div aria-hidden="true" className="text-2xl font-bold text-transparent">　</div>
                </div>
              )
            }
            const isSelected = selectedKana?.kana === char.kana && selectedKana?.script === script
            return (
              <button
                type="button"
                key={charIndex}
                aria-label={t("kanaRef.card.aria", {
                  kana: char.kana,
                  romaji: char.romaji,
                  action: isSelected ? t("kanaRef.card.hideDetails") : t("kanaRef.card.viewDetails"),
                })}
                aria-expanded={isSelected}
                className={`flex flex-col items-center justify-center border rounded-lg p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-vermilion/50 bg-vermilion/5 shadow-[0_2px_10px_-2px_rgba(200,85,61,0.2)]"
                    : "border-sumi/10 bg-white/60 hover:border-vermilion/40 hover:shadow-[0_2px_8px_-2px_rgba(168,124,47,0.15)]"
                }`}
                onClick={() =>
                  setSelectedKana(
                    isSelected
                      ? null
                      : { kana: char.kana, romaji: char.romaji, script, rowLabel },
                  )
                }
              >
                <div lang="ja" className="text-2xl font-bold text-sumi">{char.kana}</div>
                <div className="text-xs text-sumi/70">{char.romaji}</div>
              </button>
            )
          })}
        </div>
        {rowHasSelection && selectedKana && (
          <div ref={detailRef} className="mt-4 md:hidden">
            <KanaDetail
              kana={selectedKana.kana}
              romaji={selectedKana.romaji}
              script={selectedKana.script}
              rowLabel={selectedKana.rowLabel}
              onClose={() => setSelectedKana(null)}
            />
          </div>
        )}
      </div>
    )
  }

  // Whether any of the given kana sections have rows matching the current search term
  const hasMatches = (sections: KanaRow[][]) =>
    sections.some((s) => filterKana(s).length > 0)

  const EmptyState = () => (
    <div className="py-16 text-center" role="status">
      <p className="font-display italic text-lg text-sumi/70 mb-2">{t("kanaRef.results.noMatches", { term: searchTerm })}</p>
      <p className="text-sm text-sumi/70">{t("kanaRef.results.tryHint")}</p>
    </div>
  )

  // Function to render a kana section
  const renderKanaSection = (title: string, description: string, kanaArray: KanaRow[], script: Script) => {
    const filteredKana = filterKana(kanaArray)

    // Skip rendering if all rows in the section are filtered out by search
    if (filteredKana.length === 0) {
      return null
    }

    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-display text-xl text-sumi font-medium">{title}</CardTitle>
          <CardDescription className="font-display italic text-sumi/70">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">{filteredKana.map((row, index) => renderKanaRow(row, index, script))}</div>
        </CardContent>
      </Card>
    )
  }

  const stickyAside = (
    <aside className="hidden md:block">
      <div className="sticky top-20">
        {selectedKana ? (
          <KanaDetail
            kana={selectedKana.kana}
            romaji={selectedKana.romaji}
            script={selectedKana.script}
            rowLabel={selectedKana.rowLabel}
            onClose={() => setSelectedKana(null)}
          />
        ) : (
          <DetailEmptyState />
        )}
      </div>
    </aside>
  )

  return (
    <div className="py-6 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight mb-1">
            {t("kanaRef.title")}
          </h1>
          <p className="font-display italic text-sumi/70 text-base">
            {t("kanaRef.subtitle")}
          </p>
          <nav aria-label={t("kanjiList.related.aria")} className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-display italic">
            <Link to="/kana-quiz" className="inline-flex items-center gap-1.5 text-sumi/80 hover:text-vermilion-deep transition-colors motion-reduce:transition-none">
              <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
              {t("kanaRef.related.quiz")}
            </Link>
          </nav>
        </header>

        <div className="relative mb-6">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sumi/70" />
          <Input
            type="search"
            aria-label={t("kanaRef.search.aria")}
            placeholder={t("kanaRef.search.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/70 border-sumi/15"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <SegmentedControl
            items={KANA_SCRIPTS}
            value={activeScript}
            onChange={(v) => {
              setActiveScript(v as Script)
              setSelectedKana(null)
            }}
            ariaLabel={t("kanaRef.script.aria")}
          />
        </div>

        {activeScript === "hiragana" ? (
          <div className="grid gap-6 lg:gap-10 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
            <div>
              {searchTerm && !hasMatches([kanaData.hiragana.basic, kanaData.hiragana.dakuten, kanaData.hiragana.combinations]) ? (
                <EmptyState />
              ) : (
                <div className="space-y-8">
                  {renderKanaSection(
                    t("kanaRef.section.hiragana.basic.title"),
                    t("kanaRef.section.hiragana.basic.description"),
                    kanaData.hiragana.basic,
                    "hiragana",
                  )}
                  {renderKanaSection(
                    t("kanaRef.section.hiragana.dakuten.title"),
                    t("kanaRef.section.hiragana.dakuten.description"),
                    kanaData.hiragana.dakuten,
                    "hiragana",
                  )}
                  {renderKanaSection(
                    t("kanaRef.section.hiragana.combinations.title"),
                    t("kanaRef.section.hiragana.combinations.description"),
                    kanaData.hiragana.combinations,
                    "hiragana",
                  )}
                </div>
              )}
            </div>
            {stickyAside}
          </div>
        ) : (
          <div className="grid gap-6 lg:gap-10 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
            <div>
              {searchTerm && !hasMatches([kanaData.katakana.basic, kanaData.katakana.dakuten, kanaData.katakana.combinations, kanaData.katakana.extended]) ? (
                <EmptyState />
              ) : (
                <div className="space-y-8">
                  {renderKanaSection(
                    t("kanaRef.section.katakana.basic.title"),
                    t("kanaRef.section.katakana.basic.description"),
                    kanaData.katakana.basic,
                    "katakana",
                  )}
                  {renderKanaSection(
                    t("kanaRef.section.katakana.dakuten.title"),
                    t("kanaRef.section.katakana.dakuten.description"),
                    kanaData.katakana.dakuten,
                    "katakana",
                  )}
                  {renderKanaSection(
                    t("kanaRef.section.katakana.combinations.title"),
                    t("kanaRef.section.katakana.combinations.description"),
                    kanaData.katakana.combinations,
                    "katakana",
                  )}
                  {renderKanaSection(
                    t("kanaRef.section.katakana.extended.title"),
                    t("kanaRef.section.katakana.extended.description"),
                    kanaData.katakana.extended,
                    "katakana",
                  )}
                </div>
              )}
            </div>
            {stickyAside}
          </div>
        )}
      </div>
    </div>
  )
}


const PAGE_TITLE = 'Hiragana & Katakana Reference · Kanji by Insomnius'
const PAGE_DESCRIPTION =
  'Searchable hiragana and katakana tables — full gojūon, dakuten, handakuten, and yōon rows with romaji.'

export const Route = createFileRoute('/kana-reference')({
  component: KanaReferencePage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: 'description', content: PAGE_DESCRIPTION },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { property: 'og:url', content: 'https://kanji.insomnius.dev/kana-reference' },
      { name: 'twitter:title', content: PAGE_TITLE },
      { name: 'twitter:description', content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: 'https://kanji.insomnius.dev/kana-reference' }],
  }),
})
