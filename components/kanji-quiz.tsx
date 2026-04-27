"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { recordAnswer, isSoundEnabled } from "@/lib/progress/use-progress"
import { useProgress } from "@/lib/progress/use-progress"
import { playCorrect, playIncorrect } from "@/lib/sounds"
import type { Kanji } from "@/data/kanji-data"

interface KanjiQuizProps {
  kanji: Kanji
  onAnswer: (isCorrect: boolean) => void
}

export default function KanjiQuiz({ kanji, onAnswer }: KanjiQuizProps) {
  const { profile } = useProgress()
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; showDetails?: boolean } | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [showAllExamples, setShowAllExamples] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)

  // Move focus deliberately so a follow-up Enter goes to the right control.
  // After submit the form's Submit button gets disabled, which strands focus on
  // the body; we redirect it to "Next Question" so pressing Enter again advances.
  // When a new question loads, focus returns to the input.
  useEffect(() => {
    if (feedback && nextButtonRef.current) {
      nextButtonRef.current.focus()
    } else if (!feedback && inputRef.current) {
      inputRef.current.focus()
    }
  }, [feedback])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userAnswer.trim()) return

    setIsChecking(true)

    // Simple check - case insensitive and trim whitespace
    const isCorrect = kanji.meaning.some((m) => userAnswer.trim().toLowerCase().includes(m.toLowerCase()))

    void recordAnswer("kanji", kanji.kanji, isCorrect, kanji.jlptLevel)

    if (isSoundEnabled(profile ?? null)) {
      if (isCorrect) playCorrect()
      else playIncorrect()
    }

    setFeedback({
      isCorrect,
      message: isCorrect
        ? "Correct! (Press Enter for next)"
        : `Incorrect. The meaning is "${kanji.meaning.join(", ")}". (Press Enter for next)`,
      showDetails: true,
    })

    // No auto-continue timeout, allow the user to press Enter instead
  }

  const handleNextQuestion = () => {
    onAnswer(feedback?.isCorrect ?? false)
    setUserAnswer("")
    setFeedback(null)
    setIsChecking(false)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        {/* No aria-label here — it would override the visible kanji and lose lang="ja" pronunciation. */}
        <p lang="ja" className="text-8xl font-bold mb-2 text-center text-sumi leading-none">{kanji.kanji}</p>
        <p id="kanji-quiz-instructions" className="text-sm text-center text-sumi/70">Type the meaning of this kanji</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          ref={inputRef}
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter meaning..."
          aria-label="Meaning of the kanji"
          aria-describedby="kanji-quiz-instructions"
          disabled={isChecking}
          className="text-center text-lg"
        />

        <Button type="submit" className="w-full" disabled={!userAnswer.trim() || isChecking}>
          Check Answer
        </Button>
      </form>

      {
        feedback && (
          <div className="mt-6 w-full max-w-md">
            <div
              role="status"
              aria-live="assertive"
              aria-atomic="true"
              className={`flex items-center ${feedback.isCorrect ? "text-green-600" : "text-red-600"} mb-4 justify-center`}
            >
              {feedback.isCorrect ? <CheckCircle aria-hidden="true" className="mr-2 h-5 w-5" /> : <AlertCircle aria-hidden="true" className="mr-2 h-5 w-5" />}
              <span><span className="sr-only">{feedback.isCorrect ? "Correct: " : "Incorrect: "}</span>{feedback.message}</span>
            </div>

            {feedback.showDetails && (
              <Card>
                <CardContent className="pt-4">
                  <Tabs defaultValue="readings">
                    <TabsList className="grid w-full grid-cols-2" aria-label="Kanji details">
                      <TabsTrigger value="readings" className="font-display">Readings</TabsTrigger>
                      <TabsTrigger value="examples" className="font-display">Examples</TabsTrigger>
                    </TabsList>

                    <TabsContent value="readings" className="mt-4 space-y-3">
                      <div>
                        <p className="font-display text-sm text-sumi font-semibold">On Reading (<span lang="ja">音読み</span>):</p>
                        <p className="text-sm">
                          <span lang="ja">{kanji.onReading}</span> ({kanji.onReadingRomaji})
                        </p>
                      </div>
                      <div>
                        <p className="font-display text-sm text-sumi font-semibold">Kun Reading (<span lang="ja">訓読み</span>):</p>
                        <p className="text-sm">
                          <span lang="ja">{kanji.kunReading}</span> ({kanji.kunReadingRomaji})
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="examples" className="mt-4">
                      {kanji.examples && kanji.examples.length > 0 ? (
                        <div className="space-y-2">
                          {(showAllExamples ? [] : kanji.examples.slice(0, 2)).map((example, index) => (
                            <div key={index} className="p-2 bg-cream-deep rounded">
                              <p lang="ja" className="font-medium">{example.kana}</p>
                              <p className="text-sm text-sumi/70">{example.KanaRomaji}</p>
                              <p className="text-sm">{example.translation}</p>
                            </div>
                          ))}
                          {kanji.examples.length > 2 && !showAllExamples && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs w-full text-muted-foreground hover:text-foreground"
                              onClick={() => setShowAllExamples(true)}
                            >
                              + {kanji.examples.length - 2} more examples
                            </Button>
                          )}

                          {showAllExamples && (
                            <>
                              {kanji.examples.slice(2).map((example, index) => (
                                <div key={`more-${index}`} className="p-2 bg-cream-deep rounded">
                                  <p lang="ja" className="font-medium">{example.kana}</p>
                                  <p className="text-sm text-sumi/70">{example.KanaRomaji}</p>
                                  <p className="text-sm">{example.translation}</p>
                                </div>
                              ))}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs w-full text-muted-foreground hover:text-foreground"
                                onClick={() => setShowAllExamples(false)}
                              >
                                Show fewer examples
                              </Button>
                            </>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-center text-muted-foreground py-4">No examples available</p>
                      )}
                    </TabsContent>
                  </Tabs>

                  {isChecking && (
                    <div className="mt-4">
                      <Button
                        ref={nextButtonRef}
                        onClick={handleNextQuestion}
                        className="w-full flex items-center justify-center"
                      >
                        Next Question <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )
      }
    </div >
  )
}

