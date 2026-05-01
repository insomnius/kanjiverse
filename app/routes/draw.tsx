import { createFileRoute, Link } from '@tanstack/react-router'

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ArrowRight, ExternalLink, Shuffle } from "lucide-react"
import KanjiStrokeOrder from "@/components/kanji-stroke-order"
import { kanjiData, getKanjiMeaning } from "@/data/kanji-data"
import {
  getItemReviewMap,
  pickReviewQueue,
  type ItemReview,
} from "@/lib/progress/use-progress"
import { useTranslation } from "@/lib/i18n/use-translation"

type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1"

const LEVEL_VALUES: JLPTLevel[] = ["N5", "N4", "N3", "N2", "N1"]

interface DrawSearch {
  /** Optional deep-link target — when present we boot into "focused" mode locked to this kanji
   *  (e.g. arriving from a /kanji/$char "Practice writing" button). */
  char?: string
}

function findKanjiAcrossLevels(char: string): { level: JLPTLevel; index: number } | null {
  for (const level of Object.keys(kanjiData) as JLPTLevel[]) {
    const idx = kanjiData[level].findIndex((k) => k.kanji === char)
    if (idx >= 0) return { level, index: idx }
  }
  return null
}

function DrawPage() {
  const { t, locale } = useTranslation()
  const search = Route.useSearch()
  const focusChar = search.char ?? null
  const focusLocation = useMemo(() => (focusChar ? findKanjiAcrossLevels(focusChar) : null), [focusChar])

  const [level, setLevel] = useState<JLPTLevel>(focusLocation?.level ?? "N5")
  const [currentIndex, setCurrentIndex] = useState(focusLocation?.index ?? 0)
  const [seen, setSeen] = useState(0)
  /** Focused mode locks the page to one kanji until user hits "Random" or changes level. */
  const [focusLocked, setFocusLocked] = useState<boolean>(focusLocation !== null)
  const reviewsRef = useRef<Map<string, ItemReview>>(new Map())

  const levelKanji = kanjiData[level]
  const current = levelKanji[currentIndex]

  const levels = LEVEL_VALUES.map((value) => ({
    value,
    label: t(`level.${value.toLowerCase()}.description` as
      | "level.n5.description"
      | "level.n4.description"
      | "level.n3.description"
      | "level.n2.description"
      | "level.n1.description"),
  }))

  useEffect(() => {
    let cancelled = false
    void getItemReviewMap("kanji").then((m) => {
      if (!cancelled) reviewsRef.current = m
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Reset position when level changes — pick a starting kanji using the SRS picker
  // so even the first card is biased correctly. Skipped while focus-locked so the
  // ?char= deep-link sticks until the user explicitly hits "Random next".
  useEffect(() => {
    if (focusLocked) return
    const next = pickReviewQueue(levelKanji, (k) => k.kanji, {
      reviews: reviewsRef.current,
    })
    setCurrentIndex(levelKanji.indexOf(next))
    setSeen(0)
  }, [level, levelKanji, focusLocked])

  const handleNext = () => {
    setFocusLocked(false)
    const next = pickReviewQueue(levelKanji, (k) => k.kanji, {
      reviews: reviewsRef.current,
      excludeKey: current?.kanji ?? null,
    })
    setCurrentIndex(levelKanji.indexOf(next))
    setSeen((prev) => prev + 1)
  }

  return (
    <div className="pt-4 pb-8 sm:pt-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-8 gap-1 sm:gap-4">
          <h1 className="font-display text-2xl sm:text-4xl font-medium text-sumi tracking-tight">
            {t("draw.page.heading")}
          </h1>
          <p className="font-display italic text-sm text-sumi/70" role="status" aria-live="polite" aria-atomic="true">
            <span className="font-semibold not-italic text-sumi">{seen}</span> {t("draw.page.sessionCount")}
          </p>
        </div>

        <p className="hidden sm:block font-display italic text-base text-sumi/70 mb-6 max-w-xl">
          {t("draw.page.intro")}
        </p>

        <Card className="mb-4 sm:mb-6">
          <CardContent className="pt-4 sm:pt-6">
            <fieldset>
              <legend className="font-display italic text-sm sm:text-base text-sumi/70 mb-2 sm:mb-4 text-center w-full tracking-wide">
                {t("level.legend")}
              </legend>
              <ToggleGroup
                type="single"
                value={level}
                onValueChange={(value) => {
                  if (value) {
                    setLevel(value as JLPTLevel)
                    setFocusLocked(false)
                  }
                }}
                aria-label={t("level.aria")}
                className="flex justify-center flex-wrap gap-x-1 sm:gap-x-2"
              >
                {levels.map(({ value, label }) => {
                  const isActive = level === value
                  return (
                    <ToggleGroupItem
                      key={value}
                      value={value}
                      aria-label={t("draw.page.levelItemAria", { value, label })}
                      className="group flex flex-col items-center min-h-[44px] min-w-[56px] sm:min-w-[72px] px-3 sm:px-4 pt-2 pb-1.5 rounded-none data-[state=on]:bg-transparent"
                    >
                      <span
                        className={`font-display text-2xl sm:text-3xl leading-none tracking-tight transition-colors motion-reduce:transition-none ${
                          isActive ? "text-sumi font-semibold" : "text-sumi/70 font-medium group-hover:text-sumi/80"
                        }`}
                      >
                        {value}
                      </span>
                      <span
                        className={`font-display italic text-[0.7rem] sm:text-xs mt-1 transition-colors motion-reduce:transition-none tracking-wide ${
                          isActive ? "text-vermilion-deep" : "text-sumi/70 group-hover:text-sumi/80"
                        }`}
                      >
                        {label}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-1.5 h-[2px] w-full transition-all duration-300 motion-reduce:transition-none ${
                          isActive ? "bg-vermilion" : "bg-transparent group-hover:bg-sumi/15"
                        }`}
                      />
                    </ToggleGroupItem>
                  )
                })}
              </ToggleGroup>
            </fieldset>
          </CardContent>
        </Card>

        {current && (
          <Card key={`${level}-${currentIndex}`} className="border-vermilion/30 shadow-[0_4px_18px_-6px_rgba(168,124,47,0.18)]">
            <CardHeader className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-6 gap-y-3">
                <div lang="ja" className="text-7xl sm:text-8xl font-bold text-sumi leading-none">
                  {current.kanji}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <CardTitle className="font-display text-2xl sm:text-3xl text-sumi font-medium">
                      {getKanjiMeaning(current, locale).join(", ")}
                    </CardTitle>
                    <Badge>{level}</Badge>
                  </div>
                  <CardDescription className="font-display italic text-sumi/70 text-base">
                    {t("draw.page.onLabel")} <span lang="ja" className="not-italic text-sumi">{current.onReading}</span>
                    {" · "}
                    {t("draw.page.kunLabel")} <span lang="ja" className="not-italic text-sumi">{current.kunReading}</span>
                  </CardDescription>
                  <Link
                    to="/kanji/$char"
                    params={{ char: current.kanji }}
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
              <KanjiStrokeOrder character={current.kanji} />
              <div className="flex justify-center gap-2 flex-wrap">
                <Button onClick={handleNext} className="gap-2 min-w-[12rem]">
                  {focusLocked ? (
                    <>
                      <Shuffle aria-hidden="true" className="h-4 w-4" />
                      {t("draw.page.pickRandom")}
                    </>
                  ) : (
                    <>
                      {t("draw.page.nextKanji")}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

const PAGE_TITLE = "Draw Kanji — Practice Stroke Order · Kanji by Insomnius"
const PAGE_DESCRIPTION =
  "Practice writing Japanese kanji by tracing each stroke. Pick a JLPT level (N1–N5) and learn proper stroke order at your own pace."

export const Route = createFileRoute('/draw')({
  validateSearch: (search: Record<string, unknown>): DrawSearch => ({
    char: typeof search.char === "string" ? search.char.slice(0, 4) : undefined,
  }),
  component: DrawPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: 'description', content: PAGE_DESCRIPTION },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { property: 'og:url', content: 'https://kanji.insomnius.dev/draw' },
      { name: 'twitter:title', content: PAGE_TITLE },
      { name: 'twitter:description', content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: 'https://kanji.insomnius.dev/draw' }],
  }),
})
