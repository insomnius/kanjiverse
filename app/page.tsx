"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import LevelSelector from "@/components/level-selector"
import KanjiQuiz from "@/components/kanji-quiz"
import VocabQuiz from "@/components/vocab-quiz"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Book, List, AlignJustify, Github } from "lucide-react"
import { kanjiData } from "@/data/kanji-data"
import { vocabularyData } from "@/data/vocabulary-data"
import type { Kanji } from "@/data/kanji-data"

export default function JapaneseLearningApp() {
  const [currentKanji, setCurrentKanji] = useState<Kanji | null>(null)
  const [currentVocab, setCurrentVocab] = useState<{
    word: string
    meaning: string
    romaji: string
    options: string[]
  } | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [selectedLevel, setSelectedLevel] = useState("N5")
  // const [activeTab, setActiveTab] = useState("kanji")

  useEffect(() => {
    generateNewKanji(selectedLevel)
    generateNewVocab(selectedLevel)
  }, [selectedLevel])

  const generateNewKanji = (selectedLevel: string) => {
    const levelData = kanjiData[selectedLevel as keyof typeof kanjiData]
    const randomIndex = Math.floor(Math.random() * levelData.length)
    setCurrentKanji(levelData[randomIndex])
  }

  const generateNewVocab = (selectedLevel: string) => {
    const levelData = vocabularyData[selectedLevel as keyof typeof vocabularyData]
    const randomIndex = Math.floor(Math.random() * levelData.length)
    const correctVocab = levelData[randomIndex]

    // Generate 3 random incorrect options
    let options = [correctVocab.meaning]
    while (options.length < 4) {
      const randomVocabIndex = Math.floor(Math.random() * levelData.length)
      const randomOption = levelData[randomVocabIndex].meaning
      if (!options.includes(randomOption)) {
        options.push(randomOption)
      }
    }

    // Shuffle options
    options = options.sort(() => Math.random() - 0.5)

    setCurrentVocab({
      word: correctVocab.word,
      meaning: correctVocab.meaning,
      romaji: correctVocab.romaji,
      options,
    })
  }

  const handleKanjiAnswer = (isCorrect: boolean) => {
    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }))
    generateNewKanji(selectedLevel)
  }

  const handleVocabAnswer = (isCorrect: boolean) => {
    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }))
    generateNewVocab(selectedLevel)
  }

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level)
    setScore({ correct: 0, total: 0 })
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Kanjiverse</h1>
          <div className="flex gap-2 flex-wrap">
            <Link href="/kanji-list">
              <Button variant="outline" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Kanji List
              </Button>
            </Link>
            <Link href="/vocab-list">
              <Button variant="outline" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Vocab List
              </Button>
            </Link>
            <Link href="/kana-quiz">
              <Button variant="outline" className="flex items-center gap-2">
                <AlignJustify className="h-4 w-4" />
                Kana Quiz
              </Button>
            </Link>
            <Link href="/kana-reference">
              <Button variant="outline" className="flex items-center gap-2">
                <AlignJustify className="h-4 w-4" />
                Kana Reference
              </Button>
            </Link>
            <Link href="https://github.com/insomnius/kanjiverse" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <LevelSelector selectedLevel={selectedLevel} onLevelChange={handleLevelChange} />
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium">
            Score: {score.correct}/{score.total} (
            {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
          </p>
        </div>

        <Tabs defaultValue="kanji" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="kanji">Kanji Quiz</TabsTrigger>
            <TabsTrigger value="vocabulary">Vocabulary Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="kanji">
            <Card>
              <CardContent className="pt-6">
                {currentKanji && <KanjiQuiz kanji={currentKanji} onAnswer={handleKanjiAnswer} />}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vocabulary">
            <Card>
              <CardContent className="pt-6">
                {currentVocab && (
                  <VocabQuiz
                    word={currentVocab.word}
                    meaning={currentVocab.meaning}
                    romaji={currentVocab.romaji}
                    options={currentVocab.options}
                    onAnswer={handleVocabAnswer}
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

