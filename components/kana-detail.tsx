"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { kanaData } from "@/data/kana-data"

interface KanaDetailProps {
  kana: string
  romaji: string
  script: "hiragana" | "katakana"
  rowLabel: string
  onClose?: () => void
}

const findCounterpart = (
  kana: string,
  romaji: string,
  fromScript: "hiragana" | "katakana",
): string | undefined => {
  const otherScript = fromScript === "hiragana" ? "katakana" : "hiragana"
  for (const sectionKey of Object.keys(kanaData[otherScript]) as Array<keyof typeof kanaData.hiragana>) {
    const section = kanaData[otherScript][sectionKey]
    for (const row of section) {
      for (const char of row.chars) {
        if (char.romaji === romaji && char.kana && char.kana !== kana) {
          return char.kana
        }
      }
    }
  }
  return undefined
}

export default function KanaDetail({ kana, romaji, script, rowLabel, onClose }: KanaDetailProps) {
  const counterpart = findCounterpart(kana, romaji, script)
  const otherScript = script === "hiragana" ? "katakana" : "hiragana"

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
            <div lang="ja" className="text-7xl sm:text-8xl font-bold text-sumi leading-none">
              {kana}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <CardTitle className="font-display text-2xl sm:text-3xl text-sumi font-medium italic">
                  {romaji}
                </CardTitle>
                <Badge>{script === "hiragana" ? "Hiragana" : "Katakana"}</Badge>
              </div>
              <CardDescription className="font-display italic text-sumi/70 text-base">
                {rowLabel}
              </CardDescription>
            </div>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close kana details"
              className="shrink-0 -mt-1 -mr-1"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Button>
          )}
        </div>
        {onClose && (
          <Link
            to="/kana/$char"
            params={{ char: kana }}
            className="inline-flex items-center gap-1 text-xs font-display italic text-sumi/70 hover:text-vermilion-deep transition-colors w-fit"
          >
            Open as full page
            <ExternalLink aria-hidden="true" className="h-3 w-3" />
          </Link>
        )}
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <div>
          <h3 className="font-display text-base text-sumi font-semibold mb-3">
            {script === "hiragana" ? "Katakana" : "Hiragana"} counterpart
          </h3>
          {counterpart ? (
            <div className="flex items-center gap-4 p-4 bg-cream-deep rounded-md">
              <span lang="ja" className="text-5xl font-bold text-sumi leading-none">{counterpart}</span>
              <div className="text-sm">
                <p className="font-medium text-sumi">Same sound, different script</p>
                <p className="text-xs text-sumi/70 mt-1">
                  <span lang="ja">{kana}</span> ({script}) ↔ <span lang="ja">{counterpart}</span> ({otherScript})
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-sumi/70 italic p-4 bg-cream-deep rounded-md">
              No direct counterpart in the {otherScript} table.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
