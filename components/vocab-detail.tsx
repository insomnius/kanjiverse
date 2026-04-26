"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { kanjiData } from "@/data/kanji-data"
import type { Kanji } from "@/data/kanji-data"

interface VocabItem {
  word: string
  meaning: string
  romaji: string
}

interface VocabDetailProps {
  vocab: VocabItem
  level: string
  onClose?: () => void
}

const KANJI_RANGE = /[一-龯㐀-䶿]/

const findKanji = (char: string): Kanji | undefined => {
  for (const lvl of Object.keys(kanjiData) as Array<keyof typeof kanjiData>) {
    const found = kanjiData[lvl].find((k) => k.kanji === char)
    if (found) return found
  }
  return undefined
}

export default function VocabDetail({ vocab, level, onClose }: VocabDetailProps) {
  const kanjiBreakdown = Array.from(vocab.word)
    .filter((char) => KANJI_RANGE.test(char))
    .map((char) => ({ char, kanji: findKanji(char) }))

  useEffect(() => {
    if (!onClose) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <Card className="border-vermilion/30 shadow-[0_4px_18px_-6px_rgba(168,124,47,0.18)]">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-6 gap-y-3 flex-1">
            <div lang="ja" className="text-5xl sm:text-6xl font-bold text-sumi leading-none">
              {vocab.word}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <CardTitle className="font-display text-2xl sm:text-3xl text-sumi font-medium">
                  {vocab.meaning}
                </CardTitle>
                <Badge>{level}</Badge>
              </div>
              <CardDescription className="font-display italic text-sumi/70 text-base">
                {vocab.romaji}
              </CardDescription>
            </div>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close vocabulary details"
              className="shrink-0 -mt-1 -mr-1"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Button>
          )}
        </div>
        {onClose && (
          <Link
            to="/vocab/$word"
            params={{ word: vocab.word }}
            className="inline-flex items-center gap-1 text-xs font-display italic text-sumi/70 hover:text-vermilion-deep transition-colors w-fit"
          >
            Open as full page
            <ExternalLink aria-hidden="true" className="h-3 w-3" />
          </Link>
        )}
      </CardHeader>
      <CardContent>
        {kanjiBreakdown.length > 0 ? (
          <div className="space-y-4">
            <Separator />
            <div>
              <h3 className="font-display text-base text-sumi font-semibold mb-3">Kanji breakdown</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {kanjiBreakdown.map(({ char, kanji }, index) => {
                  const inner = (
                    <div className="flex items-start gap-3 p-3 bg-cream-deep rounded-md border border-sumi/5 transition-colors hover:border-sumi/15">
                      <span lang="ja" className="text-3xl font-bold text-sumi leading-none">{char}</span>
                      <div className="text-sm">
                        {kanji ? (
                          <>
                            <p className="font-medium text-sumi">{kanji.meaning.join(', ')}</p>
                            <p className="text-xs text-sumi/70 mt-1">
                              On: <span lang="ja">{kanji.onReading}</span> · Kun: <span lang="ja">{kanji.kunReading}</span>
                            </p>
                          </>
                        ) : (
                          <p className="text-sumi/70 italic">Not in JLPT N1–N5 dataset</p>
                        )}
                      </div>
                    </div>
                  )
                  return kanji ? (
                    <Link
                      key={index}
                      to="/kanji/$char"
                      params={{ char }}
                      className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div key={index}>{inner}</div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-sumi/70 italic text-center py-4">
            This word doesn't contain kanji characters in our dataset.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
