import { createFileRoute } from '@tanstack/react-router'

import { useEffect, useRef, useState } from "react"
import LevelSelector from "@/components/level-selector"
import KanjiQuiz from "@/components/kanji-quiz"
import VocabQuiz from "@/components/vocab-quiz"
import { QuizMeter } from "@/components/quiz-meter"
import { JpTtsInstallCard } from "@/components/jp-tts-install-card"
import { QuizTour } from "@/components/quiz-tour"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { kanjiData } from "@/data/kanji-data"
import { vocabularyData, getVocabMeaning } from "@/data/vocabulary-data"
import type { Kanji } from "@/data/kanji-data"
import {
  getItemReviewMap,
  applyAnswerToReviewMap,
  pickReviewQueue,
  type ItemReview,
} from "@/lib/progress/use-progress"
import { useTranslation } from "@/lib/i18n/use-translation"

function JapaneseLearningApp() {
  const { t, locale } = useTranslation()
  const [currentKanji, setCurrentKanji] = useState<Kanji | null>(null)
  const [currentVocab, setCurrentVocab] = useState<{
    word: string
    meaning: string
    romaji: string
    options: string[]
  } | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [selectedLevel, setSelectedLevel] = useState("N5")

  // SM-2 review state lives in refs (no re-render needed when it updates). We hydrate on
  // mount from IDB and keep it current via applyAnswerToReviewMap as the user answers,
  // so pickReviewQueue's tier-1 (due) and tier-2 (unseen) decisions reflect the
  // session's most recent state without an IDB round-trip per pick.
  const kanjiReviewsRef = useRef<Map<string, ItemReview>>(new Map())
  const vocabReviewsRef = useRef<Map<string, ItemReview>>(new Map())

  // Tour anchors. Refs (not selectors) so we can detect missing elements when
  // the user is on the vocab tab and the kanji speaker isn't mounted.
  const levelAnchorRef = useRef<HTMLDivElement | null>(null)
  const tabsAnchorRef = useRef<HTMLDivElement | null>(null)
  const speakAnchorRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    let cancelled = false
    void getItemReviewMap("kanji").then((m) => {
      if (!cancelled) kanjiReviewsRef.current = m
    })
    void getItemReviewMap("vocab").then((m) => {
      if (!cancelled) vocabReviewsRef.current = m
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    generateNewKanji(selectedLevel, null)
    generateNewVocab(selectedLevel, null)
    // Re-generate when locale flips so the active vocab card immediately shows
    // the right-language options instead of the old set.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel, locale])

  const generateNewKanji = (selectedLevel: string, excludeKey: string | null) => {
    const levelData = kanjiData[selectedLevel as keyof typeof kanjiData]
    const next = pickReviewQueue(levelData, (k) => k.kanji, {
      reviews: kanjiReviewsRef.current,
      excludeKey,
    })
    setCurrentKanji(next)
  }

  const generateNewVocab = (selectedLevel: string, excludeKey: string | null) => {
    const levelData = vocabularyData[selectedLevel]
    const correctVocab = pickReviewQueue(levelData, (v) => v.word, {
      reviews: vocabReviewsRef.current,
      excludeKey,
    })

    const correctMeaning = getVocabMeaning(correctVocab, locale)
    let options = [correctMeaning]
    while (options.length < 4) {
      const randomVocabIndex = Math.floor(Math.random() * levelData.length)
      const randomOption = getVocabMeaning(levelData[randomVocabIndex], locale)
      if (!options.includes(randomOption)) {
        options.push(randomOption)
      }
    }

    options = options.sort(() => Math.random() - 0.5)

    setCurrentVocab({
      word: correctVocab.word,
      meaning: correctMeaning,
      romaji: correctVocab.romaji,
      options,
    })
  }

  const handleKanjiAnswer = (isCorrect: boolean) => {
    if (currentKanji) {
      applyAnswerToReviewMap(kanjiReviewsRef.current, "kanji", currentKanji.kanji, isCorrect)
    }
    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }))
    generateNewKanji(selectedLevel, currentKanji?.kanji ?? null)
  }

  const handleVocabAnswer = (isCorrect: boolean) => {
    if (currentVocab) {
      applyAnswerToReviewMap(vocabReviewsRef.current, "vocab", currentVocab.word, isCorrect)
    }
    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }))
    generateNewVocab(selectedLevel, currentVocab?.word ?? null)
  }

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level)
    setScore({ correct: 0, total: 0 })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <JpTtsInstallCard />

      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi text-center mb-6 tracking-tight">{t("quiz.title")}</h1>
        <div ref={levelAnchorRef}>
          <LevelSelector selectedLevel={selectedLevel} onLevelChange={handleLevelChange} />
        </div>
      </div>

      <QuizMeter sessionCorrect={score.correct} sessionTotal={score.total} />

      <Tabs defaultValue="kanji" className="w-full">
        <TabsList ref={tabsAnchorRef} className="grid w-full grid-cols-2 mb-8" aria-label={t("quiz.tabs.aria")}>
          <TabsTrigger value="kanji" className="font-display">{t("quiz.tabs.kanji")}</TabsTrigger>
          <TabsTrigger value="vocabulary" className="font-display">{t("quiz.tabs.vocab")}</TabsTrigger>
        </TabsList>

        <TabsContent value="kanji">
          <Card>
            <CardContent className="pt-6">
              {currentKanji && (
                <KanjiQuiz
                  kanji={currentKanji}
                  onAnswer={handleKanjiAnswer}
                  speakButtonRef={speakAnchorRef}
                />
              )}
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

      <QuizTour
        anchors={{
          level: levelAnchorRef,
          tabs: tabsAnchorRef,
          speak: speakAnchorRef,
        }}
      />
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
