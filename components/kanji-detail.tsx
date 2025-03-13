"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Kanji } from "@/data/kanji-data"

interface KanjiDetailProps {
  kanji: Kanji
  onClose: () => void
}

export default function KanjiDetail({ kanji, onClose }: KanjiDetailProps) {
  const [showAllExamples, setShowAllExamples] = useState(false)

  // Get the examples to display based on the showAllExamples state
  const displayExamples = showAllExamples ? kanji.examples || [] : (kanji.examples || []).slice(0, 2)

  // Calculate how many more examples are hidden
  const hiddenExamplesCount = (kanji.examples?.length || 0) - displayExamples.length

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl flex items-center gap-3">
              {kanji.kanji} <span className="text-xl font-normal">{kanji.meaning.join(', ')}</span>
              <Badge>{kanji.jlptLevel || "N5"}</Badge>
            </CardTitle>
            <CardDescription>
              {kanji.onReadingRomaji && kanji.kunReadingRomaji
                ? `${kanji.onReadingRomaji} / ${kanji.kunReadingRomaji}`
                : kanji.romaji || ""}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="readings">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="readings">Readings</TabsTrigger>
              <TabsTrigger value="examples">Examples ({kanji.examples?.length || 0})</TabsTrigger>
            </TabsList>
            <TabsContent value="readings" className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold mb-2">On Reading (音読み)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-100 rounded-md">
                    <p className="text-lg">{kanji.onReading}</p>
                    <p className="text-sm text-muted-foreground">{kanji.onReadingRomaji}</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Kun Reading (訓読み)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-100 rounded-md">
                    <p className="text-lg">{kanji.kunReading}</p>
                    <p className="text-sm text-muted-foreground">{kanji.kunReadingRomaji}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="examples" className="space-y-4 mt-4">
              {kanji.examples && kanji.examples.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayExamples.map((example, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                          <p className="text-lg font-bold">{example.kana}</p>
                          <p className="text-sm text-muted-foreground mb-2">{example.KanaRomaji}</p>
                          <p className="text-md">{example.translation}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {hiddenExamplesCount > 0 && (
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => setShowAllExamples(true)}
                    >
                      <span>+ {hiddenExamplesCount} more examples</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  )}

                  {showAllExamples && kanji.examples.length > 2 && (
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => setShowAllExamples(false)}
                    >
                      <span>Show fewer examples</span>
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No examples available</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

