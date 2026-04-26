import { createFileRoute } from '@tanstack/react-router'

import { useState, useEffect } from "react"
import LevelSelector from "@/components/level-selector"
import KanjiQuiz from "@/components/kanji-quiz"
import VocabQuiz from "@/components/vocab-quiz"
import { QuizMeter } from "@/components/quiz-meter"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { kanjiData } from "@/data/kanji-data"
import { vocabularyData } from "@/data/vocabulary-data"
import type { Kanji } from "@/data/kanji-data"

function JapaneseLearningApp() {
  const [currentKanji, setCurrentKanji] = useState<Kanji | null>(null)
  const [currentVocab, setCurrentVocab] = useState<{
    word: string
    meaning: string
    romaji: string
    options: string[]
  } | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [selectedLevel, setSelectedLevel] = useState("N5")

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

    let options = [correctVocab.meaning]
    while (options.length < 4) {
      const randomVocabIndex = Math.floor(Math.random() * levelData.length)
      const randomOption = levelData[randomVocabIndex].meaning
      if (!options.includes(randomOption)) {
        options.push(randomOption)
      }
    }

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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi text-center mb-6 tracking-tight">Japanese Learning Quiz</h1>
        <LevelSelector selectedLevel={selectedLevel} onLevelChange={handleLevelChange} />
      </div>

      <QuizMeter sessionCorrect={score.correct} sessionTotal={score.total} />

      <Tabs defaultValue="kanji" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8" aria-label="Quiz type">
          <TabsTrigger value="kanji" className="font-display">Kanji Quiz</TabsTrigger>
          <TabsTrigger value="vocabulary" className="font-display">Vocabulary Quiz</TabsTrigger>
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
                  level={selectedLevel}
                  onAnswer={handleVocabAnswer}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const PAGE_TITLE = 'Quiz · Kanji by Insomnius'
const PAGE_DESCRIPTION =
  'Drill Japanese kanji and vocabulary by JLPT level (N1–N5). Tap to answer, track your score, and switch levels in one click.'

export const Route = createFileRoute('/quiz')({
  component: JapaneseLearningApp,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: 'description', content: PAGE_DESCRIPTION },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { property: 'og:url', content: 'https://kanji.insomnius.dev/quiz' },
      { name: 'twitter:title', content: PAGE_TITLE },
      { name: 'twitter:description', content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: 'https://kanji.insomnius.dev/quiz' }],
  }),
})
