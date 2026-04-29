import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Shuffle, Eye } from "lucide-react"
import KanaStrokeOrder from "@/components/kana-stroke-order"
import { SegmentedControl, type SegmentedControlItem } from "@/components/segmented-control"
import { kanaData } from "@/data/kana-data"
import {
  recordAnswer,
  getItemReviewMap,
  applyAnswerToReviewMap,
  pickReviewQueue,
  type ItemReview,
} from "@/lib/progress/use-progress"
import { useTranslation } from "@/lib/i18n/use-translation"

type Script = "hiragana" | "katakana"
type Section = "basic" | "dakuten" | "combinations" | "extended"

interface KanaItem {
  kana: string
  romaji: string
  glyph: string
}

function flatten(rows: { row: string; chars: { kana: string; romaji: string }[] }[]): KanaItem[] {
  const out: KanaItem[] = []
  for (const row of rows) {
    for (const c of row.chars) {
      if (!c.kana || !c.romaji) continue
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

interface KanaWriteQuizSearch {
  script?: Script
  section?: Section
}

type Phase = "drawing" | "revealed" | "givenUp"

function KanaWriteQuizPage() {
  const { t } = useTranslation()
  const search = Route.useSearch()
  const [script, setScript] = useState<Script>(search.script ?? "hiragana")
  const [section, setSection] = useState<Section>(search.section ?? "basic")
  const items = useMemo(() => getSection(script, section), [script, section])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("drawing")
  const [seen, setSeen] = useState(0)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const reviewsRef = useRef<Map<string, ItemReview>>(new Map())

  const current = items[currentIndex]

  useEffect(() => {
    let cancelled = false
    void getItemReviewMap("kana").then((m) => {
      if (!cancelled) reviewsRef.current = m
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (items.length === 0) {
      setCurrentIndex(0)
      return
    }
    const next = pickReviewQueue(items, (k) => k.glyph, {
      reviews: reviewsRef.current,
    })
    setCurrentIndex(items.indexOf(next))
    setPhase("drawing")
    setSeen(0)
    setScore({ correct: 0, total: 0 })
  }, [script, section, items])

  const recordResult = (isCorrect: boolean) => {
    if (!current) return
    applyAnswerToReviewMap(reviewsRef.current, "kana", current.glyph, isCorrect)
    void recordAnswer("kana", current.glyph, isCorrect)
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }))
  }

  const handleQuizComplete = (info: { mistakes: number }) => {
    if (phase !== "drawing") return
    const isCorrect = info.mistakes <= 2
    recordResult(isCorrect)
    setPhase("revealed")
  }

  const handleGiveUp = () => {
    if (phase !== "drawing") return
    recordResult(false)
    setPhase("givenUp")
  }

  const handleNext = () => {
    if (items.length === 0) return
    const next = pickReviewQueue(items, (k) => k.glyph, {
      reviews: reviewsRef.current,
      excludeKey: current?.glyph ?? null,
    })
    setCurrentIndex(items.indexOf(next))
    setPhase("drawing")
    setSeen((p) => p + 1)
  }

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

  return (
    <div className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3">
            <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight">
              {t("kanaWriteQuiz.title")}
            </h1>
            <p className="font-display italic text-sm text-sumi/70" role="status" aria-live="polite" aria-atomic="true">
              <span className="font-semibold not-italic text-sumi">{score.correct}</span>
              <span className="text-sumi/70"> / {score.total}</span>
              <span className="ml-2">·</span>
              <span className="ml-2 font-semibold not-italic text-sumi">{seen}</span> {t("draw.page.sessionCount")}
            </p>
          </div>
          <p className="font-display italic text-base text-sumi/70 mt-2 max-w-xl">
            {t("kanaWriteQuiz.subtitle")}
          </p>
        </header>

        <Card className="mb-6">
          <CardContent className="pt-6 space-y-4">
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
          <Card key={`${script}-${section}-${currentIndex}-${phase}`} className="border-vermilion/30 shadow-[0_4px_18px_-6px_rgba(168,124,47,0.18)]">
            <CardHeader className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-6 gap-y-3">
                <div className="flex-1 space-y-2">
                  <CardTitle className="font-display text-2xl sm:text-3xl text-sumi font-medium">
                    {phase === "drawing"
                      ? t("kanaWriteQuiz.prompt", { romaji: current.romaji })
                      : (
                        <span>
                          <span lang="ja" className="text-4xl sm:text-5xl text-sumi mr-3">{current.kana}</span>
                          <span className="text-sumi/70">— {current.romaji}</span>
                        </span>
                      )}
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge>{script === "hiragana" ? t("kanaRef.script.hiragana") : t("kanaRef.script.katakana")}</Badge>
                    {phase === "revealed" && (
                      <Badge variant="outline" className="border-gold-deep/50 text-gold-deep">
                        {t("kanaWriteQuiz.feedback.correct")}
                      </Badge>
                    )}
                    {phase === "givenUp" && (
                      <Badge variant="outline" className="border-vermilion/50 text-vermilion-deep">
                        {t("kanaWriteQuiz.feedback.givenUp")}
                      </Badge>
                    )}
                  </div>
                  {phase === "drawing" && current.kana.length > 1 && (
                    <CardDescription className="font-display italic text-sumi/70 text-base">
                      {t("kanaWrite.combinationHint", { whole: current.kana, glyph: current.glyph })}
                    </CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator />
              {/* The recall-mode key includes the phase so switching from "drawing" to
                  "revealed" tears down hanzi-writer (which can't transition out of quiz
                  mode mid-stroke) and re-mounts it in trace mode for the answer reveal. */}
              <KanaStrokeOrder
                key={`${current.glyph}-${phase}`}
                character={current.glyph}
                recallMode={phase === "drawing"}
                onQuizComplete={phase === "drawing" ? handleQuizComplete : undefined}
              />
              <div className="flex justify-center gap-2 flex-wrap">
                {phase === "drawing" ? (
                  <Button onClick={handleGiveUp} variant="outline" className="gap-2 min-h-[44px]">
                    <Eye aria-hidden="true" className="h-4 w-4" />
                    {t("kanaWriteQuiz.showAnswer")}
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="gap-2 min-w-[12rem]">
                    {seen === 0 && score.total === 0 ? (
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
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div role="status" className="py-16 text-center">
            <p className="font-display italic text-sm text-sumi/70">{t("kanaWrite.empty")}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const PAGE_TITLE = "Kana Writing Quiz — Recall & Draw · Kanji by Insomnius"
const PAGE_DESCRIPTION =
  "Recall a kana from its romaji and draw it from memory. Stroke order is graded against KanjiVG, and your performance feeds the same SRS schedule as the rest of the app."

export const Route = createFileRoute("/kana-write-quiz")({
  validateSearch: (search: Record<string, unknown>): KanaWriteQuizSearch => ({
    script: search.script === "katakana" ? "katakana" : search.script === "hiragana" ? "hiragana" : undefined,
    section:
      search.section === "basic" || search.section === "dakuten" ||
      search.section === "combinations" || search.section === "extended"
        ? search.section
        : undefined,
  }),
  component: KanaWriteQuizPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: "https://kanji.insomnius.dev/kana-write-quiz" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://kanji.insomnius.dev/kana-write-quiz" }],
  }),
})
