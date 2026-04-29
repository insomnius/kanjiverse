import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SegmentedControl, type SegmentedControlItem } from "@/components/segmented-control"
import { Flashcard, type ReviewItem } from "@/components/flashcard"
import { QuizMeter } from "@/components/quiz-meter"
import { kanjiData, getKanjiMeaning, type Kanji } from "@/data/kanji-data"
import { kanaData } from "@/data/kana-data"
import {
  recordAnswer,
  getItemReviewMap,
  applyAnswerToReviewMap,
  type ItemReview,
  type ReviewQuality,
} from "@/lib/progress/use-progress"
import { useTranslation } from "@/lib/i18n/use-translation"
import { Sparkles } from "lucide-react"

type TypeFilter = "all" | "kanji" | "hiragana" | "katakana"
type LevelFilter = "all" | "N5" | "N4" | "N3" | "N2" | "N1"

const KANJI_LEVELS: Array<"N5" | "N4" | "N3" | "N2" | "N1"> = ["N5", "N4", "N3", "N2", "N1"]

interface KanaCatalogEntry {
  glyph: string
  kana: string
  romaji: string
  script: "hiragana" | "katakana"
}

/**
 * Flatten all kana data into a single catalog. Multi-codepoint combinations
 * (e.g. "きゃ") use their first glyph as the SM-2 key — same convention as
 * /kana-write — so review state lines up with what the user practiced writing.
 */
function buildKanaCatalog(): KanaCatalogEntry[] {
  const out: KanaCatalogEntry[] = []
  const pushSection = (
    script: "hiragana" | "katakana",
    rows: { row: string; chars: { kana: string; romaji: string }[] }[],
  ) => {
    for (const row of rows) {
      for (const c of row.chars) {
        if (!c.kana || !c.romaji) continue
        const glyph = [...c.kana][0]
        out.push({ glyph, kana: c.kana, romaji: c.romaji, script })
      }
    }
  }
  const h = kanaData.hiragana
  pushSection("hiragana", h.basic)
  pushSection("hiragana", h.dakuten)
  pushSection("hiragana", h.combinations)
  const k = kanaData.katakana
  pushSection("katakana", k.basic)
  pushSection("katakana", k.dakuten)
  pushSection("katakana", k.combinations)
  pushSection("katakana", k.extended)
  // De-dupe on glyph — kana tables sometimes list the same character twice across sections.
  const seen = new Set<string>()
  return out.filter((e) => (seen.has(e.glyph) ? false : (seen.add(e.glyph), true)))
}

function ReviewPage() {
  const { t, locale } = useTranslation()
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all")
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all")
  // Session-scoped tally surfaced via QuizMeter — same engagement UI the
  // quizzes ship. Streak, daily totals, and milestones are already wired
  // through `recordAnswer` below; this state is the in-session score only.
  const [score, setScore] = useState({ correct: 0, total: 0 })

  // SM-2 maps: kept in refs so post-grade updates don't trigger re-renders mid-card.
  // After every grade we mutate the map in-place AND nudge `tick` to force the next
  // queue computation to use the updated review state.
  const kanjiReviewsRef = useRef<Map<string, ItemReview>>(new Map())
  const kanaReviewsRef = useRef<Map<string, ItemReview>>(new Map())
  const [tick, setTick] = useState(0)
  const [reviewsLoaded, setReviewsLoaded] = useState(false)
  /** Optional override that bypasses dueAt and force-shows N items "ahead of schedule".
   *  Only set by clicking the "Pull 10 ahead" empty-state button. Cleared on filter
   *  change so the user doesn't accidentally over-review. */
  const [aheadOfSchedule, setAheadOfSchedule] = useState<ReviewItem[] | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([getItemReviewMap("kanji"), getItemReviewMap("kana")]).then(([kj, kn]) => {
      if (cancelled) return
      kanjiReviewsRef.current = kj
      kanaReviewsRef.current = kn
      setReviewsLoaded(true)
    })
    return () => { cancelled = true }
  }, [])

  // Catalogs are stable per-locale (kanji meanings depend on locale).
  const kanjiCatalog = useMemo(() => {
    const out: ReviewItem[] = []
    for (const level of KANJI_LEVELS) {
      for (const k of kanjiData[level] as Kanji[]) {
        out.push({
          type: "kanji",
          key: k.kanji,
          glyph: k.kanji,
          meanings: getKanjiMeaning(k, locale),
          level: k.jlptLevel,
          onReading: k.onReading,
          kunReading: k.kunReading,
        })
      }
    }
    return out
  }, [locale])

  const kanaCatalog = useMemo(() => {
    const flat = buildKanaCatalog()
    return flat.map<ReviewItem>((e) => ({
      type: "kana",
      key: e.glyph,
      glyph: e.kana,
      meanings: [],
      romaji: e.romaji,
      script: e.script,
    }))
  }, [])

  // Apply the user's filters.
  const filtered = useMemo<ReviewItem[]>(() => {
    if (typeFilter === "kanji") {
      return levelFilter === "all"
        ? kanjiCatalog
        : kanjiCatalog.filter((it) => it.level === levelFilter)
    }
    if (typeFilter === "hiragana") return kanaCatalog.filter((it) => it.script === "hiragana")
    if (typeFilter === "katakana") return kanaCatalog.filter((it) => it.script === "katakana")
    return [...kanjiCatalog, ...kanaCatalog]
  }, [typeFilter, levelFilter, kanjiCatalog, kanaCatalog])

  // Resolve the SM-2 map for any single item (kanji vs kana go to different stores).
  const reviewMapFor = (item: ReviewItem): Map<string, ItemReview> =>
    item.type === "kanji" ? kanjiReviewsRef.current : kanaReviewsRef.current

  // Build the active queue: due first (oldest), then unseen up to a soft cap.
  // We deliberately omit Tier 3 (weighted random over future items) — when nothing's
  // due AND no new cards remain, the page should celebrate "all caught up" rather
  // than keep grinding the user. The "Pull 10 ahead-of-schedule" button is the
  // explicit opt-in if they want more.
  const queue = useMemo<ReviewItem[]>(() => {
    if (aheadOfSchedule) return aheadOfSchedule
    if (!reviewsLoaded) return []
    const now = Date.now()
    const NEW_LIMIT = 20
    const due: Array<{ item: ReviewItem; dueAt: number }> = []
    const unseen: ReviewItem[] = []
    for (const item of filtered) {
      const r = reviewMapFor(item).get(item.key)
      if (r) {
        if (r.dueAt <= now) due.push({ item, dueAt: r.dueAt })
      } else {
        unseen.push(item)
      }
    }
    due.sort((a, b) => a.dueAt - b.dueAt)
    // Shuffle unseen so the user doesn't see them in dictionary order.
    const unseenShuffled = unseen
      .map((it) => ({ it, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((x) => x.it)
      .slice(0, NEW_LIMIT)
    return [...due.map((d) => d.item), ...unseenShuffled]
    // `tick` participates so that grading an item — which mutates the underlying
    // map ref and increments `tick` — recomputes the queue with the post-grade state.
  }, [filtered, reviewsLoaded, aheadOfSchedule, tick])

  const dueCounts = useMemo(() => {
    if (!reviewsLoaded) return { kanji: 0, hiragana: 0, katakana: 0 }
    const now = Date.now()
    let kanji = 0
    let hiragana = 0
    let katakana = 0
    for (const item of kanjiCatalog) {
      const r = kanjiReviewsRef.current.get(item.key)
      if (r && r.dueAt <= now) kanji += 1
    }
    for (const item of kanaCatalog) {
      const r = kanaReviewsRef.current.get(item.key)
      if (!r || r.dueAt > now) continue
      if (item.script === "hiragana") hiragana += 1
      else if (item.script === "katakana") katakana += 1
    }
    return { kanji, hiragana, katakana }
    // tick changes whenever a card is graded — the counts must reflect that.
  }, [reviewsLoaded, kanjiCatalog, kanaCatalog, tick])

  const current = queue[0] ?? null

  const handleGrade = (quality: ReviewQuality) => {
    if (!current) return
    const isCorrect = quality !== "again"
    const map = reviewMapFor(current)
    applyAnswerToReviewMap(map, current.type, current.key, isCorrect, Date.now(), quality)
    void recordAnswer(current.type, current.key, isCorrect, current.level ?? null, quality)
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }))
    // If we're inside an ahead-of-schedule pull, drop the just-graded item from the
    // override list — otherwise the standard queue recomputes and the now-rescheduled
    // item naturally falls off.
    if (aheadOfSchedule) {
      const next = aheadOfSchedule.slice(1)
      setAheadOfSchedule(next.length > 0 ? next : null)
    }
    setTick((n) => n + 1)
  }

  const pullAhead = () => {
    const futureWithReviews: Array<{ item: ReviewItem; dueAt: number }> = []
    for (const item of filtered) {
      const r = reviewMapFor(item).get(item.key)
      if (r) futureWithReviews.push({ item, dueAt: r.dueAt })
    }
    futureWithReviews.sort((a, b) => a.dueAt - b.dueAt)
    const pulled = futureWithReviews.slice(0, 10).map((f) => f.item)
    if (pulled.length > 0) setAheadOfSchedule(pulled)
  }

  const typeItems: SegmentedControlItem[] = [
    { value: "all", label: t("review.filter.all"), description: t("review.filter.all.description") },
    { value: "kanji", label: t("review.type.kanji"), description: t("review.filter.kanji.description") },
    { value: "hiragana", label: t("kanaRef.script.hiragana"), description: t("kanaRef.script.hiragana.description") },
    { value: "katakana", label: t("kanaRef.script.katakana"), description: t("kanaRef.script.katakana.description") },
  ]

  const levelItems: SegmentedControlItem[] = [
    { value: "all", label: t("review.filter.all") },
    ...KANJI_LEVELS.map((lvl) => ({ value: lvl, label: lvl })),
  ]

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight">
            {t("review.title")}
          </h1>
          <p className="font-display italic text-base text-sumi/70 mt-2 max-w-xl">
            {t("review.subtitle")}
          </p>
        </header>

        <Card className="mb-6">
          <CardContent className="pt-6 space-y-4">
            <SegmentedControl
              items={typeItems}
              value={typeFilter}
              onChange={(v) => {
                setTypeFilter(v as TypeFilter)
                setAheadOfSchedule(null)
                setScore({ correct: 0, total: 0 })
              }}
              legend={t("review.filter.legend")}
              ariaLabel={t("review.filter.aria")}
            />
            {typeFilter === "kanji" && (
              <SegmentedControl
                items={levelItems}
                value={levelFilter}
                onChange={(v) => {
                  setLevelFilter(v as LevelFilter)
                  setAheadOfSchedule(null)
                  setScore({ correct: 0, total: 0 })
                }}
                legend={t("review.filter.levelLegend")}
                ariaLabel={t("review.filter.levelAria")}
              />
            )}
            <p className="font-display italic text-xs text-sumi/70 text-center" role="status" aria-live="polite">
              {t("review.dueSummary", {
                kanji: dueCounts.kanji,
                hiragana: dueCounts.hiragana,
                katakana: dueCounts.katakana,
              })}
            </p>
          </CardContent>
        </Card>

        {!reviewsLoaded ? (
          <div role="status" className="py-16 text-center">
            <p className="font-display italic text-sm text-sumi/70">{t("review.loading")}</p>
          </div>
        ) : current ? (
          <>
            <QuizMeter sessionCorrect={score.correct} sessionTotal={score.total} />
            <Flashcard key={`${current.type}-${current.key}-${tick}`} item={current} onGrade={handleGrade} />
          </>
        ) : (
          <Card className="border-dashed bg-white/40">
            <CardHeader className="text-center space-y-2">
              <Sparkles aria-hidden="true" className="h-8 w-8 text-gold-deep mx-auto" />
              <CardTitle className="font-display text-2xl text-sumi">
                {t("review.empty.title")}
              </CardTitle>
              <CardDescription className="font-display italic text-sumi/70">
                {t("review.empty.subtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-8">
              <Button
                type="button"
                variant="outline"
                onClick={pullAhead}
                disabled={filtered.every((it) => !reviewMapFor(it).has(it.key))}
                className="min-h-[44px]"
              >
                {t("review.empty.pullAhead")}
              </Button>
              <Link
                to="/quiz"
                className="font-display italic text-sm text-sumi/70 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
              >
                {t("review.empty.backToQuiz")}
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

const PAGE_TITLE = "Review — Spaced-Repetition Flashcards · Kanji by Insomnius"
const PAGE_DESCRIPTION =
  "Daily SM-2 spaced-repetition flashcard review for kanji, hiragana, and katakana. Three-button self-grading, keyboard shortcuts (1 / 2 / 3), and an honest 'all caught up' state."

export const Route = createFileRoute("/review")({
  component: ReviewPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: "https://kanji.insomnius.dev/review" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://kanji.insomnius.dev/review" }],
  }),
})
