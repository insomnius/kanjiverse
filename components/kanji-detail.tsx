"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronUp, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import KanjiStrokeOrder from "@/components/kanji-stroke-order"
import { MasteryBadge } from "@/components/mastery-badge"
import type { Kanji } from "@/data/kanji-data"

interface KanjiDetailProps {
  kanji: Kanji
  /** When provided, renders a Close button in the header. Inline use cases pass this; standalone routes omit it. */
  onClose?: () => void
}

export default function KanjiDetail({ kanji, onClose }: KanjiDetailProps) {
  const [showAllExamples, setShowAllExamples] = useState(false)

  const displayExamples = showAllExamples ? kanji.examples || [] : (kanji.examples || []).slice(0, 4)
  const hiddenExamplesCount = (kanji.examples?.length || 0) - displayExamples.length

  // Escape key closes the inline panel (only when onClose is provided)
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
              {kanji.kanji}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="font-display text-2xl sm:text-3xl text-sumi font-medium">
                  {kanji.meaning.join(', ')}
                </CardTitle>
                <Badge>{kanji.jlptLevel || "N5"}</Badge>
                <MasteryBadge type="kanji" itemKey={kanji.kanji} />
              </div>
              <CardDescription className="font-display italic text-sumi/70 text-base">
                {kanji.onReadingRomaji && kanji.kunReadingRomaji
                  ? `${kanji.onReadingRomaji} · ${kanji.kunReadingRomaji}`
                  : kanji.romaji || ""}
              </CardDescription>
            </div>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close kanji details"
              className="shrink-0 -mt-1 -mr-1"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {onClose && (
            <Link
              to="/kanji/$char"
              params={{ char: kanji.kanji }}
              className="inline-flex items-center gap-1 text-xs font-display italic text-sumi/70 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
            >
              Open as full page
              <ExternalLink aria-hidden="true" className="h-3 w-3" />
            </Link>
          )}
          <Link
            to="/draw"
            search={{ char: kanji.kanji }}
            className="inline-flex items-center gap-1 text-xs font-display italic text-sumi/70 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
          >
            Practice writing this kanji
            <ExternalLink aria-hidden="true" className="h-3 w-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="readings">
          <TabsList className="grid w-full grid-cols-3" aria-label="Kanji details">
            <TabsTrigger value="readings" className="font-display">Readings</TabsTrigger>
            <TabsTrigger value="strokes" className="font-display">Strokes</TabsTrigger>
            <TabsTrigger value="examples" className="font-display">Examples ({kanji.examples?.length || 0})</TabsTrigger>
          </TabsList>
          <TabsContent value="readings" className="space-y-4 mt-4">
            <div>
              <h3 className="font-display text-base text-sumi font-semibold mb-2">On Reading (<span lang="ja">音読み</span>)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-cream-deep rounded-md">
                  <p lang="ja" className="text-lg">{kanji.onReading}</p>
                  <p className="text-sm text-sumi/70">{kanji.onReadingRomaji}</p>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-display text-base text-sumi font-semibold mb-2">Kun Reading (<span lang="ja">訓読み</span>)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-cream-deep rounded-md">
                  <p lang="ja" className="text-lg">{kanji.kunReading}</p>
                  <p className="text-sm text-sumi/70">{kanji.kunReadingRomaji}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="strokes" className="mt-4">
            <KanjiStrokeOrder character={kanji.kanji} />
          </TabsContent>
          <TabsContent value="examples" className="space-y-4 mt-4">
            {kanji.examples && kanji.examples.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayExamples.map((example, index) => (
                    <Card key={index} className="overflow-hidden bg-cream-deep border-sumi/10">
                      <CardContent className="p-4">
                        <p lang="ja" className="text-lg font-bold">{example.kana}</p>
                        <p className="text-sm text-sumi/70 mb-2">{example.KanaRomaji}</p>
                        <p className="text-md">{example.translation}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {hiddenExamplesCount > 0 && (
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => setShowAllExamples(true)}>
                    <span>+ {hiddenExamplesCount} more examples</span>
                    <ChevronDown aria-hidden="true" className="h-4 w-4" />
                  </Button>
                )}

                {showAllExamples && kanji.examples.length > 4 && (
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => setShowAllExamples(false)}>
                    <span>Show fewer examples</span>
                    <ChevronUp aria-hidden="true" className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-center text-sumi/70 py-8">No examples available</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
