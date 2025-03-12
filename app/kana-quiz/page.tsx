"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { kanaData } from "@/data/kana-data"
import KanaQuiz from "@/components/kana-quiz"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlignJustify } from "lucide-react"

// Helper function to flatten kana data for easier access
const flattenKanaData = (type: "hiragana" | "katakana", sections: string[]) => {
  const result: { kana: string; romaji: string }[] = []

  sections.forEach((section) => {
    kanaData[type][section as keyof typeof kanaData.hiragana].forEach((row) => {
      row.chars.forEach((char) => {
        if (char.kana && char.romaji) {
          result.push({ kana: char.kana, romaji: char.romaji })
        }
      })
    })
  })

  return result
}

// Generate a new kana question
const generateNewKana = (activeTab: "hiragana" | "katakana", difficulty: "basic" | "all", setCurrentKana: (kana: { kana: string; romaji: string; options: string[] }) => void) => {
  const sections = difficulty === "basic" ? ["basic"] : ["basic", "dakuten", "combinations"]
  if (activeTab === "katakana" && difficulty === "all") {
    sections.push("extended")
  }

  const kanaList = flattenKanaData(activeTab, sections)

  // Select a random kana
  const randomIndex = Math.floor(Math.random() * kanaList.length)
  const selectedKana = kanaList[randomIndex]

  // Generate options (including the correct answer)
  let options = [selectedKana.romaji]

  // Add 3 incorrect options
  while (options.length < 4) {
    const randomOptionIndex = Math.floor(Math.random() * kanaList.length)
    const randomOption = kanaList[randomOptionIndex].romaji
    if (!options.includes(randomOption)) {
      options.push(randomOption)
    }
  }

  // Shuffle options
  options = options.sort(() => Math.random() - 0.5)

  setCurrentKana({
    kana: selectedKana.kana,
    romaji: selectedKana.romaji,
    options,
  })
}

export default function KanaQuizPage() {
  const [currentKana, setCurrentKana] = useState<{ kana: string; romaji: string; options: string[] } | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">("hiragana")
  const [difficulty, setDifficulty] = useState<"basic" | "all">("basic")


  // Initialize and handle tab changes
  useEffect(() => {
    generateNewKana(activeTab, difficulty, setCurrentKana)
  }, [activeTab, difficulty])

  const handleAnswer = (isCorrect: boolean) => {
    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }))
    generateNewKana(activeTab, difficulty, setCurrentKana)
  }

  const handleDifficultyChange = (level: string) => {
    setDifficulty(level as "basic" | "all")
    setScore({ correct: 0, total: 0 })
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">
            Kana Quiz
          </h1>
          <div className="flex gap-2 px-2 flex-wrap">
            <Link href="/kana-reference">
              <Button variant="outline" className="flex items-center gap-2">
                <AlignJustify className="h-4 w-4" />
                Kana Reference
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 text-center">Select Difficulty</h2>
              <div className="flex justify-center space-x-4">
                <Button
                  variant={difficulty === "basic" ? "default" : "outline"}
                  onClick={() => handleDifficultyChange("basic")}
                  className="w-32"
                >
                  Basic
                </Button>
                <Button
                  variant={difficulty === "all" ? "default" : "outline"}
                  onClick={() => handleDifficultyChange("all")}
                  className="w-32"
                >
                  All Characters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium">
            Score: {score.correct}/{score.total} (
            {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
          </p>
        </div>

        <Tabs
          defaultValue="hiragana"
          className="w-full"
          onValueChange={(value) => setActiveTab(value as "hiragana" | "katakana")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="hiragana">Hiragana Quiz</TabsTrigger>
            <TabsTrigger value="katakana">Katakana Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="hiragana">
            <Card>
              <CardContent className="pt-6">
                {currentKana && (
                  <KanaQuiz
                    kana={currentKana.kana}
                    romaji={currentKana.romaji}
                    options={currentKana.options}
                    kanaType="hiragana"
                    onAnswer={handleAnswer}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="katakana">
            <Card>
              <CardContent className="pt-6">
                {currentKana && (
                  <KanaQuiz
                    kana={currentKana.kana}
                    romaji={currentKana.romaji}
                    options={currentKana.options}
                    kanaType="katakana"
                    onAnswer={handleAnswer}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

