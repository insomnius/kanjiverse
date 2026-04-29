"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Pencil, Eye } from "lucide-react"
import { useTranslation } from "@/lib/i18n/use-translation"

export interface CharacterData {
  strokes: string[]
  medians: number[][][]
}

interface KanjiStrokeOrderProps {
  character: string
  /**
   * Optional override for hanzi-writer's character-data lookup. The default
   * fetches from jsdelivr (CJK kanji). Pass a custom loader to back the same
   * component with local data — used by the kana writing flows that read from
   * the bundled `data/kana-stroke-data.json`.
   */
  charDataLoader?: (char: string) => Promise<CharacterData | null | undefined>
  /**
   * Fired when the user completes a quiz (traces every stroke). `mistakes` is
   * the total miss count across all strokes — 0 means a clean trace.
   */
  onQuizComplete?: (info: { mistakes: number }) => void
  /**
   * "Recall" mode used by /kana-write-quiz: the canvas starts blank (no outline
   * guide), the quiz auto-starts, and the animate-toggle/Replay button is
   * hidden so the user has to produce the glyph from memory. The "Show me"
   * button still works as an explicit give-up.
   */
  recallMode?: boolean
}

type Mode = "animate" | "quiz"

interface HanziWriterInstance {
  animateCharacter: () => void
  quiz: (opts?: Record<string, unknown>) => void
  cancelQuiz: () => void
}

export default function KanjiStrokeOrder({ character, charDataLoader, onQuizComplete, recallMode = false }: KanjiStrokeOrderProps) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const writerRef = useRef<HanziWriterInstance | null>(null)
  const [mode, setMode] = useState<Mode>(recallMode ? "quiz" : "animate")
  const [error, setError] = useState<string | null>(null)
  const [strokeCount, setStrokeCount] = useState<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let cancelled = false
    setError(null)
    setStrokeCount(null)
    containerRef.current.innerHTML = ""

    import("hanzi-writer")
      .then(({ default: HanziWriter }) => {
        if (cancelled || !containerRef.current) return

        // hanzi-writer's `charDataLoader` callback is signature
        // `(char, onComplete, onError) => void`. We adapt our promise-style
        // loader prop so callers don't have to know that detail.
        const loaderConfig = charDataLoader
          ? {
              charDataLoader: (
                char: string,
                onComplete: (data: CharacterData) => void,
                onError: (reason: Error) => void,
              ) => {
                charDataLoader(char).then(
                  (data) => {
                    if (data) onComplete(data)
                    else onError(new Error(`No stroke data for ${char}`))
                  },
                  (err) => onError(err instanceof Error ? err : new Error(String(err))),
                )
              },
            }
          : {}

        const writer = HanziWriter.create(containerRef.current, character, {
          width: 220,
          height: 220,
          padding: 8,
          showOutline: !recallMode,
          showCharacter: false,
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 120,
          strokeColor: "#1a1815",
          radicalColor: "#c8553d",
          outlineColor: "rgba(26, 24, 21, 0.18)",
          drawingColor: "#c8553d",
          highlightColor: "#a3402b",
          ...loaderConfig,
        })

        writerRef.current = writer as unknown as HanziWriterInstance

        // Look up stroke count from the loaded character data (non-fatal if unavailable).
        // When a charDataLoader is provided, prefer it so we don't hit the CDN.
        const lookup = charDataLoader
          ? charDataLoader(character)
          : HanziWriter.loadCharacterData(character)
        Promise.resolve(lookup)
          .then((data) => {
            if (cancelled) return
            const strokes = (data as { strokes?: string[] } | undefined | null)?.strokes
            if (strokes) setStrokeCount(strokes.length)
          })
          .catch(() => {
            // non-fatal; just no stroke count shown
          })

        if (recallMode) {
          // Auto-start the quiz so the user can begin drawing immediately —
          // no animate-then-trace toggle in recall mode.
          ;(writer as unknown as HanziWriterInstance).quiz({
            showHintAfterMisses: false,
            highlightOnComplete: true,
            onComplete: (info: { totalMistakes: number }) => {
              onQuizComplete?.({ mistakes: info?.totalMistakes ?? 0 })
            },
          })
        } else {
          writer.animateCharacter()
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(t("stroke.error", { char: character }))
        }
      })

    return () => {
      cancelled = true
      writerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character, charDataLoader])

  const handleReplay = () => {
    if (!writerRef.current) return
    if (mode === "quiz") {
      writerRef.current.cancelQuiz()
      setMode("animate")
    }
    writerRef.current.animateCharacter()
  }

  const handleStartQuiz = () => {
    if (!writerRef.current) return
    setMode("quiz")
    writerRef.current.quiz({
      showHintAfterMisses: 2,
      highlightOnComplete: true,
      onComplete: (info: { totalMistakes: number }) => {
        onQuizComplete?.({ mistakes: info?.totalMistakes ?? 0 })
      },
    })
  }

  const handleExitQuiz = () => {
    if (!writerRef.current) return
    writerRef.current.cancelQuiz()
    setMode("animate")
    writerRef.current.animateCharacter()
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="font-display italic text-sm text-sumi/70">{error}</p>
        <p className="text-xs text-sumi/70 mt-2">{t("stroke.error.note")}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div
        ref={containerRef}
        lang="ja"
        role="img"
        aria-label={
          strokeCount
            ? t("stroke.aria.withCount", { char: character, count: strokeCount })
            : t("stroke.aria.bare", { char: character })
        }
        className="bg-cream-deep rounded-lg border border-sumi/10"
      />

      <div className="flex flex-col items-center gap-2">
        {strokeCount !== null && (
          <p className="font-display italic text-sm text-sumi/70">
            <span className="font-semibold not-italic text-sumi">{strokeCount}</span> {strokeCount === 1 ? t("stroke.count.singular") : t("stroke.count.plural")}
          </p>
        )}

        <div className="flex gap-2">
          {!recallMode && (
            <Button onClick={handleReplay} variant="outline" size="sm" className="gap-2">
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              {t("stroke.replay")}
            </Button>
          )}
          {mode === "animate" ? (
            <Button onClick={handleStartQuiz} variant="outline" size="sm" className="gap-2">
              <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
              {t("stroke.practice")}
            </Button>
          ) : (
            <Button onClick={handleExitQuiz} variant="outline" size="sm" className="gap-2">
              <Eye aria-hidden="true" className="h-3.5 w-3.5" />
              {t("stroke.showMe")}
            </Button>
          )}
        </div>

        {mode === "quiz" && (
          <p className="font-display italic text-xs text-sumi/70 text-center max-w-[14rem]">
            {t("stroke.quiz.hint")}
          </p>
        )}
      </div>
    </div>
  )
}
