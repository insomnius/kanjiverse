import { createFileRoute, Link } from '@tanstack/react-router'

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ArrowRight, ExternalLink, Shuffle } from "lucide-react"
import KanjiStrokeOrder from "@/components/kanji-stroke-order"
import { kanjiData } from "@/data/kanji-data"
import {
  getItemMasteryMap,
  pickWeightedExcluding,
  type ItemMastery,
} from "@/lib/progress/use-progress"

const LEVELS = [
  { value: "N5", label: "Beginner" },
  { value: "N4", label: "Elementary" },
  { value: "N3", label: "Intermediate" },
  { value: "N2", label: "Upper-int." },
  { value: "N1", label: "Advanced" },
]

type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1"

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
  const search = Route.useSearch()
  const focusChar = search.char ?? null
  const focusLocation = useMemo(() => (focusChar ? findKanjiAcrossLevels(focusChar) : null), [focusChar])

  const [level, setLevel] = useState<JLPTLevel>(focusLocation?.level ?? "N5")
  const [currentIndex, setCurrentIndex] = useState(focusLocation?.index ?? 0)
  const [seen, setSeen] = useState(0)
  /** Focused mode locks the page to one kanji until user hits "Random" or changes level. */
  const [focusLocked, setFocusLocked] = useState<boolean>(focusLocation !== null)
  const masteryRef = useRef<Map<string, ItemMastery>>(new Map())

  const levelKanji = kanjiData[level]
  const current = levelKanji[currentIndex]

  useEffect(() => {
    let cancelled = false
    void getItemMasteryMap("kanji").then((m) => {
      if (!cancelled) masteryRef.current = m
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
    const next = pickWeightedExcluding(levelKanji, (k) => k.kanji, null, {
      mastery: masteryRef.current,
    })
    setCurrentIndex(levelKanji.indexOf(next))
    setSeen(0)
  }, [level, levelKanji, focusLocked])

  const handleNext = () => {
    setFocusLocked(false)
    const next = pickWeightedExcluding(levelKanji, (k) => k.kanji, current?.kanji ?? null, {
      mastery: masteryRef.current,
    })
    setCurrentIndex(levelKanji.indexOf(next))
    setSeen((prev) => prev + 1)
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight">
            Draw Kanji
          </h1>
          <p className="font-display italic text-sm text-sumi/70" role="status" aria-live="polite" aria-atomic="true">
            <span className="font-semibold not-italic text-sumi">{seen}</span> kanji practiced this session
          </p>
        </div>

        <p className="font-display italic text-base text-sumi/70 mb-6 max-w-xl">
          Pick a JLPT level, watch the strokes, then trace each one yourself with mouse or finger. Hints appear after two misses.
        </p>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <fieldset>
              <legend className="font-display italic text-base text-sumi/70 mb-4 text-center w-full tracking-wide">
                Select your level
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
                aria-label="JLPT level"
                className="flex justify-center flex-wrap gap-x-1 sm:gap-x-2"
              >
                {LEVELS.map(({ value, label }) => {
                  const isActive = level === value
                  return (
                    <ToggleGroupItem
                      key={value}
                      value={value}
                      aria-label={`${value} — ${label}`}
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
                      {current.meaning.join(", ")}
                    </CardTitle>
                    <Badge>{level}</Badge>
                  </div>
                  <CardDescription className="font-display italic text-sumi/70 text-base">
                    On: <span lang="ja" className="not-italic text-sumi">{current.onReading}</span>
                    {" · "}
                    Kun: <span lang="ja" className="not-italic text-sumi">{current.kunReading}</span>
                  </CardDescription>
                  <Link
                    to="/kanji/$char"
                    params={{ char: current.kanji }}
                    className="inline-flex items-center gap-1 text-xs font-display italic text-sumi/70 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
                  >
                    Open full details
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
                      Pick a random kanji
                    </>
                  ) : (
                    <>
                      Next kanji
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
