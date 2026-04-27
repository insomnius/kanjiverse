import { createFileRoute } from '@tanstack/react-router'

import { useEffect, useRef, useState } from "react"
import { kanaData } from "@/data/kana-data"
import KanaQuiz from "@/components/kana-quiz"
import { QuizMeter } from "@/components/quiz-meter"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  getItemMasteryMap,
  applyAnswerToMasteryMap,
  pickWeightedExcluding,
  type ItemMastery,
} from "@/lib/progress/use-progress"

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

// Generate a new kana question. Stealth-SRS picker: weighted away from items the
// user just got right, weighted toward recently-missed ones. Falls back to uniform
// random when the mastery map is empty (first session).
const generateNewKana = (
  activeTab: "hiragana" | "katakana",
  difficulty: "basic" | "all",
  setCurrentKana: (kana: { kana: string; romaji: string; options: string[] }) => void,
  mastery: Map<string, ItemMastery>,
  excludeKana: string | null,
) => {
  const sections = difficulty === "basic" ? ["basic"] : ["basic", "dakuten", "combinations"]
  if (activeTab === "katakana" && difficulty === "all") {
    sections.push("extended")
  }

  const kanaList = flattenKanaData(activeTab, sections)
  const selectedKana = pickWeightedExcluding(kanaList, (k) => k.kana, excludeKana, { mastery })

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

function KanaQuizPage() {
  const [currentKana, setCurrentKana] = useState<{ kana: string; romaji: string; options: string[] } | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">("hiragana")
  const [difficulty, setDifficulty] = useState<"basic" | "all">("basic")
  const masteryRef = useRef<Map<string, ItemMastery>>(new Map())

  useEffect(() => {
    let cancelled = false
    void getItemMasteryMap("kana").then((m) => {
      if (!cancelled) masteryRef.current = m
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Initialize and handle tab changes
  useEffect(() => {
    generateNewKana(activeTab, difficulty, setCurrentKana, masteryRef.current, null)
  }, [activeTab, difficulty])

  const handleAnswer = (isCorrect: boolean) => {
    if (currentKana) {
      applyAnswerToMasteryMap(masteryRef.current, currentKana.kana, isCorrect)
    }
    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }))
    generateNewKana(activeTab, difficulty, setCurrentKana, masteryRef.current, currentKana?.kana ?? null)
  }

  const handleDifficultyChange = (level: string) => {
    setDifficulty(level as "basic" | "all")
    setScore({ correct: 0, total: 0 })
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight">
            Kana Quiz
          </h1>
        </div>

        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <fieldset>
                <legend className="font-display italic text-base text-sumi/70 mb-4 text-center w-full tracking-wide">
                  Select your difficulty
                </legend>
                <ToggleGroup
                  type="single"
                  value={difficulty}
                  onValueChange={(value) => {
                    if (value) handleDifficultyChange(value)
                  }}
                  aria-label="Difficulty"
                  className="flex justify-center gap-x-2 sm:gap-x-4"
                >
                  {[
                    { value: "basic", title: "Basic", caption: "Gojūon only" },
                    { value: "all", title: "All", caption: "Dakuten · Yōon" },
                  ].map(({ value, title, caption }) => {
                    const isActive = difficulty === value
                    return (
                      <ToggleGroupItem
                        key={value}
                        value={value}
                        aria-label={`${title} — ${caption}`}
                        className="group flex flex-col items-center min-h-[44px] min-w-[112px] px-4 pt-2 pb-1.5 rounded-none data-[state=on]:bg-transparent"
                      >
                        <span
                          className={`font-display text-xl sm:text-2xl leading-none tracking-tight transition-colors motion-reduce:transition-none ${
                            isActive ? "text-sumi font-semibold" : "text-sumi/70 font-medium group-hover:text-sumi/80"
                          }`}
                        >
                          {title}
                        </span>
                        <span
                          className={`font-display italic text-[0.7rem] sm:text-xs mt-1 transition-colors motion-reduce:transition-none tracking-wide ${
                            isActive ? "text-vermilion-deep" : "text-sumi/70 group-hover:text-sumi/80"
                          }`}
                        >
                          {caption}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`mt-1.5 h-[2px] w-full transition-all duration-300 motion-reduce:transition-none ${
                            isActive ? "bg-vermilion" : "bg-transparent group-hover:bg-sumi/15"
                          }`}
                        />
                      </ToggleGroupItem>
                    )
                  })}
                </ToggleGroup>
              </fieldset>
            </CardContent>
          </Card>
        </div>

        <QuizMeter sessionCorrect={score.correct} sessionTotal={score.total} />

        <Tabs
          defaultValue="hiragana"
          className="w-full"
          onValueChange={(value) => setActiveTab(value as "hiragana" | "katakana")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-8" aria-label="Kana script">
            <TabsTrigger value="hiragana" className="font-display">Hiragana Quiz</TabsTrigger>
            <TabsTrigger value="katakana" className="font-display">Katakana Quiz</TabsTrigger>
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


const PAGE_TITLE = 'Hiragana & Katakana Quiz · Kanji by Insomnius'
const PAGE_DESCRIPTION =
  'Drill hiragana and katakana with rapid-fire quizzes. Pick a kana set, answer with romaji, and watch your accuracy improve.'

export const Route = createFileRoute('/kana-quiz')({
  component: KanaQuizPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: 'description', content: PAGE_DESCRIPTION },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { property: 'og:url', content: 'https://kanji.insomnius.dev/kana-quiz' },
      { name: 'twitter:title', content: PAGE_TITLE },
      { name: 'twitter:description', content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: 'https://kanji.insomnius.dev/kana-quiz' }],
  }),
})
