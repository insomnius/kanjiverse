import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, ExternalLink, Shuffle } from "lucide-react"
import KanaStrokeOrder from "@/components/kana-stroke-order"
import { FeatureTour, type FeatureTourStep } from "@/components/feature-tour"
import { SegmentedControl, type SegmentedControlItem } from "@/components/segmented-control"
import { kanaData } from "@/data/kana-data"
import {
  recordAnswer,
  getItemReviewMap,
  pickReviewQueue,
  type ItemReview,
} from "@/lib/progress/use-progress"
import { useTranslation } from "@/lib/i18n/use-translation"

type Script = "hiragana" | "katakana"
type Section = "basic" | "dakuten" | "combinations" | "extended"

interface KanaItem {
  /** The original entry from kana-data — could be 1 or 2 code points. */
  kana: string
  romaji: string
  /** First single-codepoint glyph; what we actually look up stroke data for. */
  glyph: string
}

function flatten(rows: { row: string; chars: { kana: string; romaji: string }[] }[]): KanaItem[] {
  const out: KanaItem[] = []
  for (const row of rows) {
    for (const c of row.chars) {
      if (!c.kana) continue
      const glyph = [...c.kana][0]
      out.push({ kana: c.kana, romaji: c.romaji, glyph })
    }
  }
  return out
}

function getSection(script: Script, section: Section): KanaItem[] {
  if (script === "katakana") {
    const k = kanaData.katakana
    if (section === "basic") return flatten(k.basic)
    if (section === "dakuten") return flatten(k.dakuten)
    if (section === "combinations") return flatten(k.combinations)
    if (section === "extended") return flatten(k.extended)
    return []
  }
  const h = kanaData.hiragana
  if (section === "basic") return flatten(h.basic)
  if (section === "dakuten") return flatten(h.dakuten)
  if (section === "combinations") return flatten(h.combinations)
  return []
}

interface KanaWriteSearch {
  script?: Script
  section?: Section
}

function KanaWritePage() {
  const { t } = useTranslation()
  const search = Route.useSearch()
  const [script, setScript] = useState<Script>(search.script ?? "hiragana")
  const [section, setSection] = useState<Section>(search.section ?? "basic")
  const items = useMemo(() => getSection(script, section), [script, section])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [seen, setSeen] = useState(0)
  const reviewsRef = useRef<Map<string, ItemReview>>(new Map())
  // Anchors for the first-run /kana-write onboarding (FeatureTour).
  const scriptAnchorRef = useRef<HTMLDivElement | null>(null)
  const previewAnchorRef = useRef<HTMLDivElement | null>(null)
  const nextAnchorRef = useRef<HTMLDivElement | null>(null)

  const current = items[currentIndex]

  useEffect(() => {
    let cancelled = false
    void getItemReviewMap("kana").then((m) => {
      if (!cancelled) reviewsRef.current = m
    })
    return () => { cancelled = true }
  }, [])

  // When script or section changes, pick a starting glyph using the SM-2 picker.
  useEffect(() => {
    if (items.length === 0) {
      setCurrentIndex(0)
      return
    }
    const next = pickReviewQueue(items, (k) => k.glyph, {
      reviews: reviewsRef.current,
    })
    setCurrentIndex(items.indexOf(next))
    setSeen(0)
  }, [script, section, items])

  const scriptItems: SegmentedControlItem[] = [
    { value: "hiragana", label: t("kanaRef.script.hiragana"), description: t("kanaRef.script.hiragana.description") },
    { value: "katakana", label: t("kanaRef.script.katakana"), description: t("kanaRef.script.katakana.description") },
  ]

  const sectionItems: SegmentedControlItem[] = [
    { value: "basic", label: t("kanaWrite.section.basic"), description: "" },
    { value: "dakuten", label: t("kanaWrite.section.dakuten"), description: "" },
    { value: "combinations", label: t("kanaWrite.section.combinations"), description: "" },
    ...(script === "katakana"
      ? [{ value: "extended", label: t("kanaWrite.section.extended"), description: "" }]
      : []),
  ]

  const handleQuizComplete = (info: { mistakes: number }) => {
    if (!current) return
    const isCorrect = info.mistakes <= 2
    void recordAnswer("kana", current.glyph, isCorrect)
  }

  const handleNext = () => {
    if (items.length === 0) return
    const next = pickReviewQueue(items, (k) => k.glyph, {
      reviews: reviewsRef.current,
      excludeKey: current?.glyph ?? null,
    })
    setCurrentIndex(items.indexOf(next))
    setSeen((p) => p + 1)
  }

  return (
    <div className="pt-4 pb-8 sm:pt-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-3 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-1 sm:gap-3">
            <h1 className="font-display text-2xl sm:text-4xl font-medium text-sumi tracking-tight">
              {t("kanaWrite.title")}
            </h1>
            <p className="font-display italic text-sm text-sumi/70" role="status" aria-live="polite" aria-atomic="true">
              <span className="font-semibold not-italic text-sumi">{seen}</span> {t("draw.page.sessionCount")}
            </p>
          </div>
          <p className="hidden sm:block font-display italic text-base text-sumi/70 mt-2 max-w-xl">
            {t("kanaWrite.subtitle")}
          </p>
        </header>

        <Card className="mb-4 sm:mb-6" ref={scriptAnchorRef}>
          <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
            <SegmentedControl
              items={scriptItems}
              value={script}
              onChange={(v) => {
                setScript(v as Script)
                if (v !== "katakana" && section === "extended") setSection("basic")
              }}
              legend={t("kanaWrite.scriptLegend")}
              ariaLabel={t("kanaRef.script.aria")}
            />
            <SegmentedControl
              items={sectionItems}
              value={section}
              onChange={(v) => setSection(v as Section)}
              legend={t("kanaWrite.sectionLegend")}
              ariaLabel={t("kanaWrite.sectionAria")}
            />
          </CardContent>
        </Card>

        {current ? (
          <Card key={`${script}-${section}-${currentIndex}`} className="border-vermilion/30 shadow-[0_4px_18px_-6px_rgba(168,124,47,0.18)]">
            <CardHeader className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-6 gap-y-3">
                <div lang="ja" className="text-7xl sm:text-8xl font-bold text-sumi leading-none">
                  {current.kana}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <CardTitle className="font-display text-2xl sm:text-3xl text-sumi font-medium">
                      {current.romaji}
                    </CardTitle>
                    <Badge>{script === "hiragana" ? t("kanaRef.script.hiragana") : t("kanaRef.script.katakana")}</Badge>
                  </div>
                  {current.kana.length > 1 && (
                    <CardDescription className="font-display italic text-sumi/70 text-base">
                      {t("kanaWrite.combinationHint", { whole: current.kana, glyph: current.glyph })}
                    </CardDescription>
                  )}
                  <Link
                    to="/kana/$char"
                    params={{ char: current.glyph }}
                    className="inline-flex items-center gap-1 text-xs font-display italic text-sumi/70 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
                  >
                    {t("draw.page.openDetails")}
                    <ExternalLink aria-hidden="true" className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator />
              <div ref={previewAnchorRef}>
                <KanaStrokeOrder character={current.glyph} onQuizComplete={handleQuizComplete} />
              </div>
              <div ref={nextAnchorRef} className="flex justify-center gap-2 flex-wrap">
                <Button onClick={handleNext} className="gap-2 min-w-[12rem]">
                  {seen === 0 ? (
                    <>
                      <Shuffle aria-hidden="true" className="h-4 w-4" />
                      {t("kanaWrite.pickRandom")}
                    </>
                  ) : (
                    <>
                      {t("kanaWrite.next")}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div role="status" className="py-16 text-center">
            <p className="font-display italic text-sm text-sumi/70">{t("kanaWrite.empty")}</p>
          </div>
        )}
      </div>
      <FeatureTour
        id="kana-write-tour-v1"
        steps={[
          { id: "script", ref: scriptAnchorRef, titleKey: "tour.kanaWrite.script.title", bodyKey: "tour.kanaWrite.script.body" },
          { id: "preview", ref: previewAnchorRef, titleKey: "tour.kanaWrite.preview.title", bodyKey: "tour.kanaWrite.preview.body" },
          { id: "next", ref: nextAnchorRef, titleKey: "tour.kanaWrite.next.title", bodyKey: "tour.kanaWrite.next.body" },
        ] satisfies FeatureTourStep[]}
      />
    </div>
  )
}

const PAGE_TITLE = "Draw Hiragana & Katakana — Practice Stroke Order · Kanji by Insomnius"
const PAGE_DESCRIPTION =
  "Practice writing Japanese kana by tracing each stroke. Hiragana and katakana, basic through extended sets, with proper stroke order."

export const Route = createFileRoute("/kana-write")({
  validateSearch: (search: Record<string, unknown>): KanaWriteSearch => ({
    script: search.script === "katakana" ? "katakana" : search.script === "hiragana" ? "hiragana" : undefined,
    section:
      search.section === "basic" || search.section === "dakuten" ||
      search.section === "combinations" || search.section === "extended"
        ? search.section
        : undefined,
  }),
  component: KanaWritePage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: "https://kanji.insomnius.dev/kana-write" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://kanji.insomnius.dev/kana-write" }],
  }),
})
