import { createFileRoute, Link } from "@tanstack/react-router"
import { useMemo, useRef, useState } from "react"
import { Eraser, RotateCcw, Search, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DrawingCanvas, type DrawingCanvasHandle, type Stroke } from "@/components/drawing-canvas"
import { kanjiData, type Kanji } from "@/data/kanji-data"
import strokeCountsRaw from "@/data/kanji-stroke-counts.json"
import strokeFeaturesRaw from "@/data/kanji-stroke-features.json"
import {
  strokeFeaturesFromPoints,
  strokeSetDistance,
  type StrokeFeatures,
} from "@/lib/stroke-similarity"

const strokeCounts = strokeCountsRaw as Record<string, number>
const strokeFeatures = strokeFeaturesRaw as Record<string, number[][]>

const CANVAS_SIZE = 280
const MAX_RESULTS = 24
const STROKE_COUNT_TOLERANCE = 1 // also include kanji ±1 stroke for tolerance to mis-counts

interface RankedKanji {
  kanji: Kanji
  count: number
  /** Stroke-set distance — lower is closer. null when we lack feature data. */
  distance: number | null
}

const allKanjiByChar: Record<string, Kanji> = (() => {
  const map: Record<string, Kanji> = {}
  for (const level of Object.keys(kanjiData)) {
    for (const k of kanjiData[level as keyof typeof kanjiData]) map[k.kanji] = k
  }
  return map
})()

/** Pre-bucketed by stroke count so the per-search filter is O(1) lookup, not O(2034). */
const indexByStrokeCount: Record<number, string[]> = (() => {
  const idx: Record<number, string[]> = {}
  for (const [char, count] of Object.entries(strokeCounts)) {
    ;(idx[count] ||= []).push(char)
  }
  return idx
})()

const levelRank: Record<string, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 }

function DrawSearchPage() {
  const canvasRef = useRef<DrawingCanvasHandle>(null)
  const [strokeCount, setStrokeCount] = useState(0)
  const [searched, setSearched] = useState<{
    userStrokes: Stroke[]
    userCount: number
  } | null>(null)
  const [touched, setTouched] = useState(false)

  const handleSearch = () => {
    const strokes = canvasRef.current?.getStrokes() ?? []
    if (strokes.length === 0) return
    setSearched({ userStrokes: strokes, userCount: strokes.length })
  }

  const handleClear = () => {
    canvasRef.current?.clear()
    setSearched(null)
    setTouched(false)
  }

  const handleUndo = () => {
    canvasRef.current?.undo()
  }

  const candidates = useMemo<RankedKanji[]>(() => {
    if (!searched) return []
    const { userStrokes, userCount } = searched

    // Pull candidates from a small window of stroke counts so off-by-one errors
    // (a quick second stroke not lifting cleanly, etc.) still surface near-matches.
    const candidateChars = new Set<string>()
    for (let delta = 0; delta <= STROKE_COUNT_TOLERANCE; delta++) {
      for (const c of indexByStrokeCount[userCount - delta] ?? []) candidateChars.add(c)
      if (delta > 0) {
        for (const c of indexByStrokeCount[userCount + delta] ?? []) candidateChars.add(c)
      }
    }

    const userFeatures: StrokeFeatures[] = userStrokes.map((s) =>
      strokeFeaturesFromPoints(s, CANVAS_SIZE),
    )

    const ranked: RankedKanji[] = []
    for (const char of candidateChars) {
      const kanji = allKanjiByChar[char]
      if (!kanji) continue
      const count = strokeCounts[char]
      const featuresRaw = strokeFeatures[char]
      const features: StrokeFeatures[] | null = featuresRaw
        ? (featuresRaw.map((s) => s as StrokeFeatures))
        : null

      let distance: number | null = null
      if (features && features.length > 0) {
        distance = strokeSetDistance(userFeatures, features)
        // Add a small penalty for stroke-count delta so exact matches still
        // outrank near-matches when their geometry is comparable.
        distance += 0.15 * Math.abs(count - userCount)
      }

      ranked.push({ kanji, count, distance })
    }

    // Sort: kanji with similarity scores first (lowest distance), then any without
    // features by JLPT rank as a fallback.
    ranked.sort((a, b) => {
      if (a.distance !== null && b.distance !== null) return a.distance - b.distance
      if (a.distance !== null) return -1
      if (b.distance !== null) return 1
      return (levelRank[a.kanji.jlptLevel] ?? 5) - (levelRank[b.kanji.jlptLevel] ?? 5)
    })

    return ranked.slice(0, MAX_RESULTS)
  }, [searched])

  const totalForBucket = searched
    ? Array.from(
        new Set(
          ((): string[] => {
            const out: string[] = []
            for (let delta = 0; delta <= STROKE_COUNT_TOLERANCE; delta++) {
              out.push(...(indexByStrokeCount[searched.userCount - delta] ?? []))
              if (delta > 0) out.push(...(indexByStrokeCount[searched.userCount + delta] ?? []))
            }
            return out
          })(),
        ),
      ).length
    : 0

  return (
    <div className="py-6 sm:py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight mb-1">
            Find a kanji by drawing
          </h1>
          <p className="font-display italic text-sumi/70 text-base">
            Sketch the character. We compare your stroke shapes to the JLPT N1–N5 set and rank the closest matches.
          </p>
        </header>

        <div className="grid gap-6 lg:gap-8 md:grid-cols-[320px_minmax(0,1fr)]">
          {/* Drawing column */}
          <div className="md:sticky md:top-20 md:self-start">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg text-sumi font-medium">
                  Sketch pad
                </CardTitle>
                <CardDescription className="font-display italic text-sumi/70 text-sm">
                  Stroke order doesn't have to be perfect — we match on shape and start/end points.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <DrawingCanvas
                  ref={canvasRef}
                  size={CANVAS_SIZE}
                  onStrokesChange={setStrokeCount}
                  onFirstStroke={() => setTouched(true)}
                />

                <div
                  role="status"
                  aria-live="polite"
                  className="font-display tabular-nums text-sm text-sumi"
                >
                  <span className="font-semibold">{strokeCount}</span>
                  <span className="text-sumi/70 italic"> stroke{strokeCount === 1 ? "" : "s"}</span>
                </div>

                <div className="flex gap-2 flex-wrap justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleUndo}
                    disabled={strokeCount === 0}
                    className="gap-1.5"
                  >
                    <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                    Undo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    disabled={strokeCount === 0}
                    className="gap-1.5"
                  >
                    <Eraser aria-hidden="true" className="h-3.5 w-3.5" />
                    Clear
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSearch}
                    disabled={strokeCount === 0}
                    className="gap-1.5 min-w-[6rem]"
                  >
                    <Search aria-hidden="true" className="h-3.5 w-3.5" />
                    Search
                  </Button>
                </div>

                {!touched && (
                  <p className="font-display italic text-xs text-sumi/70 text-center max-w-[26ch]">
                    Tip: draw inside the dotted guides for the most accurate match.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results column */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg text-sumi font-medium">
                  {!searched
                    ? "Results"
                    : `Top ${candidates.length} of ${totalForBucket} candidates`}
                </CardTitle>
                <CardDescription className="font-display italic text-sumi/70 text-sm">
                  {!searched
                    ? "Draw a kanji on the left, then tap Search."
                    : candidates.length === 0
                      ? "No matches in the JLPT N1–N5 set for that stroke shape."
                      : `Ranked by stroke-shape similarity. The closer your sketch, the better the top results.`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!searched ? (
                  <div role="status" className="py-16 text-center">
                    {/* Icon instead of a faded 漢字 watermark — text watermarks at low
                        opacity fail axe color-contrast checks; an icon with aria-hidden
                        and currentColor is decorative and exempt. */}
                    <Search
                      aria-hidden="true"
                      className="h-12 w-12 text-vermilion-deep/60 mx-auto mb-4"
                    />
                    <p className="font-display italic text-sumi/70">
                      Sketch a character to begin.
                    </p>
                  </div>
                ) : candidates.length === 0 ? (
                  <div role="status" className="py-16 text-center">
                    <p className="font-display italic text-lg text-sumi/70 mb-2">
                      No matches near {searched.userCount} stroke{searched.userCount === 1 ? "" : "s"}.
                    </p>
                    <p className="text-sm text-sumi/70 max-w-md mx-auto">
                      Try refining the sketch, or browse{" "}
                      <Link to="/kanji-list" className="underline underline-offset-2 hover:text-vermilion-deep">
                        the full kanji list
                      </Link>
                      .
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                    {candidates.map((entry, idx) => (
                      <Link
                        key={entry.kanji.kanji}
                        to="/kanji/$char"
                        params={{ char: entry.kanji.kanji }}
                        className={`block border rounded-lg p-3 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 ${
                          idx < 3
                            ? "border-vermilion/40 bg-vermilion/5 shadow-[0_2px_10px_-2px_rgba(200,85,61,0.15)]"
                            : "border-sumi/10 bg-white/60 hover:border-vermilion/40 hover:shadow-[0_2px_8px_-2px_rgba(168,124,47,0.15)]"
                        }`}
                        aria-label={`${entry.kanji.kanji}, ${entry.kanji.meaning.join(", ")}, JLPT ${entry.kanji.jlptLevel}, rank ${idx + 1}`}
                      >
                        <div lang="ja" className="text-3xl sm:text-4xl font-bold text-center text-sumi leading-none mb-1.5">
                          {entry.kanji.kanji}
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-sumi text-center line-clamp-1">
                          {entry.kanji.meaning.join(", ")}
                        </p>
                        <p className="text-[10px] text-sumi/70 text-center mt-1 inline-flex items-center gap-1 w-full justify-center">
                          <Badge className="text-[9px] px-1.5 py-0 leading-tight">{entry.kanji.jlptLevel}</Badge>
                          <BookOpen aria-hidden="true" className="h-2.5 w-2.5" />
                          {entry.kanji.examples.length}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const PAGE_TITLE = "Find a kanji by drawing · Kanji by Insomnius"
const PAGE_DESCRIPTION =
  "Sketch a Japanese kanji on a digital pad and find matching JLPT N1–N5 characters by stroke-shape similarity. Order-invariant, in-browser, no upload."

export const Route = createFileRoute("/draw-search")({
  component: DrawSearchPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "kanji search by drawing, draw kanji find, Japanese handwriting lookup, sketch kanji, kanji similarity search, JLPT kanji search",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: "https://kanji.insomnius.dev/draw-search" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://kanji.insomnius.dev/draw-search" }],
  }),
})
