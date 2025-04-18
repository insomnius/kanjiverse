"use client"

import { useState } from "react"
import Link from "next/link"
import { vocabularyData } from "@/data/vocabulary-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft, AlignJustify } from "lucide-react"

interface VocabItem {
  word: string;
  meaning: string;
  romaji: string;
}

export default function VocabListPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Function to filter vocabulary based on search term
  const filterVocab = (level: string, vocab: VocabItem[]) => {
    if (!searchTerm) return vocab

    return vocab.filter(
      (v) =>
        v.word.includes(searchTerm) ||
        v.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.romaji.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">JLPT Vocabulary List</h1>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search word, meaning, or pronunciation..."
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

          {Object.keys(vocabularyData).map((level) => (
            <TabsContent key={level} value={level}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    JLPT {level} Vocabulary (
                    {filterVocab(level, vocabularyData[level as keyof typeof vocabularyData]).length} words)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filterVocab(level, vocabularyData[level as keyof typeof vocabularyData]).map((vocab, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-slate-100 transition-colors">
                        <div className="text-xl font-bold mb-2">{vocab.word}</div>
                        <div className="text-sm">
                          <p className="font-medium">{vocab.meaning}</p>
                          <p className="text-muted-foreground">{vocab.romaji}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

