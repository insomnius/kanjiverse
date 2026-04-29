"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye } from "lucide-react"
import { useTranslation } from "@/lib/i18n/use-translation"
import type { ReviewQuality } from "@/lib/progress/use-progress"

export interface ReviewItem {
  type: "kanji" | "kana"
  /** Bare item identifier — what the data files key on (e.g. "漢" or "あ"). */
  key: string
  /** What renders huge on the front face. Same as `key` for kanji + single-codepoint kana;
   *  for combinations like "きゃ" the front uses the full string while `key` is the first glyph. */
  glyph: string
  /** Localized meanings list for the back face. Already passed through getKanjiMeaning() etc. */
  meanings: string[]
  /** Romaji for kana; primary reading for kanji (we keep on/kun separately below). */
  romaji?: string
  /** JLPT bucket — kanji only. */
  level?: string
  /** Hiragana / katakana — kana only. */
  script?: "hiragana" | "katakana"
  /** Onyomi / Kunyomi — kanji only. */
  onReading?: string
  kunReading?: string
}

interface FlashcardProps {
  item: ReviewItem
  onGrade: (quality: ReviewQuality) => void
}

/**
 * One spaced-repetition flashcard. Front shows the glyph; pressing Space (or the
 * Reveal button) uncovers the back face with meanings/readings; three buttons
 * grade the recall.
 *
 * Keyboard map: Space reveals; 1 = Again, 2 = Good, 3 = Easy. The buttons stay
 * rendered (disabled-looking) before reveal so the review pace stays physically
 * consistent — your fingers can rest in position from card to card.
 */
export function Flashcard({ item, onGrade }: FlashcardProps) {
  const { t } = useTranslation()
  const [revealed, setRevealed] = useState(false)

  // Reset to front face whenever the item changes — avoids flashing the back of card
  // N+1 for a beat after grading card N.
  useEffect(() => {
    setRevealed(false)
  }, [item.key, item.type])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't hijack typing in inputs/textareas (none on this route today, but defensive).
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return

      if (e.key === " " || e.code === "Space") {
        e.preventDefault()
        if (!revealed) setRevealed(true)
        return
      }
      if (!revealed) return
      if (e.key === "1") { e.preventDefault(); onGrade("again") }
      else if (e.key === "2") { e.preventDefault(); onGrade("good") }
      else if (e.key === "3") { e.preventDefault(); onGrade("easy") }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [revealed, onGrade])

  const typeLabel = item.type === "kanji"
    ? t("review.type.kanji")
    : item.script === "katakana"
      ? t("kanaRef.script.katakana")
      : t("kanaRef.script.hiragana")

  return (
    <Card className="border-vermilion/30 shadow-[0_4px_18px_-6px_rgba(168,124,47,0.18)]">
      <CardContent className="pt-6 pb-6 space-y-6">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge>{typeLabel}</Badge>
          {item.level && <Badge variant="outline">{item.level}</Badge>}
        </div>

        <div className="flex justify-center">
          <span
            lang="ja"
            className="font-display text-7xl sm:text-8xl font-semibold text-sumi leading-none tracking-tight"
          >
            {item.glyph}
          </span>
        </div>

        <Separator />

        {revealed ? (
          <div className="space-y-3 text-center">
            {item.romaji && (
              <p className="font-display text-xl sm:text-2xl text-sumi font-medium">
                {item.romaji}
              </p>
            )}
            {item.meanings.length > 0 && (
              <p className="font-display text-base sm:text-lg text-sumi/80">
                {item.meanings.join(", ")}
              </p>
            )}
            {(item.onReading || item.kunReading) && (
              <p className="font-display italic text-sm text-sumi/70">
                {item.onReading && (
                  <>
                    {t("draw.page.onLabel")}{" "}
                    <span lang="ja" className="not-italic text-sumi">{item.onReading}</span>
                  </>
                )}
                {item.onReading && item.kunReading && " · "}
                {item.kunReading && (
                  <>
                    {t("draw.page.kunLabel")}{" "}
                    <span lang="ja" className="not-italic text-sumi">{item.kunReading}</span>
                  </>
                )}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setRevealed(true)}
              className="gap-2 min-h-[44px]"
              aria-label={t("review.reveal.aria")}
            >
              <Eye aria-hidden="true" className="h-4 w-4" />
              {t("review.reveal")}
            </Button>
            <p className="font-display italic text-xs text-sumi/70">
              {t("review.reveal.hint")}
            </p>
          </div>
        )}

        <div className="flex justify-center gap-2 flex-wrap" role="group" aria-label={t("review.grade.aria")}>
          <Button
            type="button"
            onClick={() => onGrade("again")}
            disabled={!revealed}
            variant="outline"
            className="min-h-[48px] min-w-[7rem] border-vermilion/50 text-vermilion-deep hover:bg-vermilion/5 disabled:opacity-40"
            aria-keyshortcuts="1"
          >
            <span className="flex flex-col items-center leading-tight">
              <span className="font-display font-medium">{t("review.grade.again")}</span>
              <span className="font-display italic text-[0.65rem] text-current/70">1</span>
            </span>
          </Button>
          <Button
            type="button"
            onClick={() => onGrade("good")}
            disabled={!revealed}
            className="min-h-[48px] min-w-[7rem] disabled:opacity-40"
            aria-keyshortcuts="2"
          >
            <span className="flex flex-col items-center leading-tight">
              <span className="font-display font-medium">{t("review.grade.good")}</span>
              <span className="font-display italic text-[0.65rem] text-current/70">2</span>
            </span>
          </Button>
          <Button
            type="button"
            onClick={() => onGrade("easy")}
            disabled={!revealed}
            variant="outline"
            className="min-h-[48px] min-w-[7rem] border-gold-deep/60 text-gold-deep hover:bg-gold-soft/40 disabled:opacity-40"
            aria-keyshortcuts="3"
          >
            <span className="flex flex-col items-center leading-tight">
              <span className="font-display font-medium">{t("review.grade.easy")}</span>
              <span className="font-display italic text-[0.65rem] text-current/70">3</span>
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
