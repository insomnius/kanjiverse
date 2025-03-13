"use client"

import { useState } from "react"
import Link from "next/link"
import { kanjiData } from "@/data/kanji-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft, AlignJustify, BookOpen } from "lucide-react"
import KanjiDetail from "@/components/kanji-detail"
import type { Kanji } from "@/data/kanji-data"

export default function KanjiListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKanji, setSelectedKanji] = useState<Kanji | null>(null)

  // Function to filter kanji based on search term
  const filterKanji = (level: string, kanji: Kanji[]) => {
    if (!searchTerm) return kanji

    return kanji.filter(
      (k) =>
        k.kanji.includes(searchTerm) ||
        k.meaning.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
        k.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.onReading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.kunReading.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">JLPT Kanji List</h1>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/kana-reference">
              <Button variant="outline" className="flex items-center gap-2">
                <AlignJustify className="h-4 w-4" />
                Kana Reference
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Quiz
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search kanji, meaning, or pronunciation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="N5" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="N5">N5</TabsTrigger>
            <TabsTrigger value="N4">N4</TabsTrigger>
            <TabsTrigger value="N3">N3</TabsTrigger>
            <TabsTrigger value="N2">N2</TabsTrigger>
            <TabsTrigger value="N1">N1</TabsTrigger>
          </TabsList>

          {Object.keys(kanjiData).map((level) => (
            <TabsContent key={level} value={level}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    JLPT {level} Kanji ({filterKanji(level, kanjiData[level as keyof typeof kanjiData]).length} kanji)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filterKanji(level, kanjiData[level as keyof typeof kanjiData]).map((kanji, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 hover:bg-slate-100 transition-colors cursor-pointer"
                        onClick={() => setSelectedKanji(kanji)}
                      >
                        <div className="text-4xl font-bold mb-2 text-center">{kanji.kanji}</div>
                        <div className="text-sm text-center">
                          <p className="font-medium">{kanji.meaning.join(', ')}</p>
                          <div className="flex justify-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">On: {kanji.onReading}</p>
                            <p className="text-xs text-muted-foreground">Kun: {kanji.kunReading}</p>
                          </div>
                          <div className="mt-2 flex justify-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs flex items-center gap-1"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedKanji(kanji)
                              }}
                            >
                              <BookOpen className="h-3 w-3" />
                              {kanji.examples.length} examples
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {selectedKanji && <KanjiDetail kanji={selectedKanji} onClose={() => setSelectedKanji(null)} />}
      </div>
    </div>
  )
}

