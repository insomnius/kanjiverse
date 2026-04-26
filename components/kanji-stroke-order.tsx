"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Pencil, Eye } from "lucide-react"

interface KanjiStrokeOrderProps {
  character: string
}

type Mode = "animate" | "quiz"

interface HanziWriterInstance {
  animateCharacter: () => void
  quiz: (opts?: Record<string, unknown>) => void
  cancelQuiz: () => void
}

export default function KanjiStrokeOrder({ character }: KanjiStrokeOrderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const writerRef = useRef<HanziWriterInstance | null>(null)
  const [mode, setMode] = useState<Mode>("animate")
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

        const writer = HanziWriter.create(containerRef.current, character, {
          width: 220,
          height: 220,
          padding: 8,
          showOutline: true,
          showCharacter: false,
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 120,
          strokeColor: "#1a1815",
          radicalColor: "#c8553d",
          outlineColor: "rgba(26, 24, 21, 0.18)",
          drawingColor: "#c8553d",
          highlightColor: "#a3402b",
        })

        writerRef.current = writer as unknown as HanziWriterInstance

        // Look up stroke count from the loaded character data (non-fatal if unavailable)
        HanziWriter.loadCharacterData(character)
          .then((data) => {
            if (cancelled) return
            const strokes = (data as { strokes?: string[] } | undefined)?.strokes
            if (strokes) setStrokeCount(strokes.length)
          })
          .catch(() => {
            // non-fatal; just no stroke count shown
          })

        writer.animateCharacter()
      })
      .catch(() => {
        if (!cancelled) {
          setError(`Stroke data not available for ${character}`)
        }
      })

    return () => {
      cancelled = true
      writerRef.current = null
    }
  }, [character])

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
        <p className="text-xs text-sumi/70 mt-2">Stroke data covers most JLPT kanji but not every rare character.</p>
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
            ? `Stroke order animation for ${character}, ${strokeCount} strokes`
            : `Stroke order animation for ${character}`
        }
        className="bg-cream-deep rounded-lg border border-sumi/10"
      />

      <div className="flex flex-col items-center gap-2">
        {strokeCount !== null && (
          <p className="font-display italic text-sm text-sumi/70">
            <span className="font-semibold not-italic text-sumi">{strokeCount}</span> stroke{strokeCount === 1 ? "" : "s"}
          </p>
        )}

        <div className="flex gap-2">
          <Button onClick={handleReplay} variant="outline" size="sm" className="gap-2">
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            Replay
          </Button>
          {mode === "animate" ? (
            <Button onClick={handleStartQuiz} variant="outline" size="sm" className="gap-2">
              <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
              Practice
            </Button>
          ) : (
            <Button onClick={handleExitQuiz} variant="outline" size="sm" className="gap-2">
              <Eye aria-hidden="true" className="h-3.5 w-3.5" />
              Show me
            </Button>
          )}
        </div>

        {mode === "quiz" && (
          <p className="font-display italic text-xs text-sumi/70 text-center max-w-[14rem]">
            Trace each stroke with your mouse or finger. Hints appear after two misses.
          </p>
        )}
      </div>
    </div>
  )
}
