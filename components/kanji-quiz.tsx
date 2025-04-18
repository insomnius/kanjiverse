"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import type { Kanji } from "@/data/kanji-data"

interface KanjiQuizProps {
  kanji: Kanji
  onAnswer: (isCorrect: boolean) => void
}

export default function KanjiQuiz({ kanji, onAnswer }: KanjiQuizProps) {
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; showDetails?: boolean } | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [showAllExamples, setShowAllExamples] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Add keyboard event listener for Enter key when feedback is shown
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && feedback) {
        if (feedback.isCorrect) {
          // Go to next question when pressing Enter after a correct answer
          onAnswer(true)
          setUserAnswer("")
          setFeedback(null)
          setIsChecking(false)
        } else {
          // Go to next question when pressing Enter after an incorrect answer
          handleNextQuestion()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [feedback])

  // Focus the input when ready for a new question
  useEffect(() => {
    if (!feedback && inputRef.current) {
      inputRef.current.focus()
    }
  }, [feedback])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userAnswer.trim()) return

    setIsChecking(true)

    // Simple check - case insensitive and trim whitespace
    const isCorrect = kanji.meaning.some((m) => userAnswer.trim().toLowerCase().includes(m.toLowerCase()))

    setFeedback({
      isCorrect,
      message: isCorrect ? "Correct! (Press Enter for next)" : `Incorrect. The meaning is "${kanji.meaning}". (Press Enter for next)`,
      showDetails: true,
    })

    // No auto-continue timeout, allow the user to press Enter instead
  }

  const handleNextQuestion = () => {
    onAnswer(false)
    setUserAnswer("")
    setFeedback(null)
    setIsChecking(false)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <div className="text-8xl font-bold mb-2 text-center">{kanji.kanji}</div>
        <p className="text-sm text-center text-muted-foreground">Type the meaning of this kanji</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          ref={inputRef}
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter meaning..."
          disabled={isChecking}
          className="text-center text-lg"
        />

        <Button type="submit" className="w-full" disabled={!userAnswer.trim() || isChecking}>
          Check Answer
        </Button>
      </form>

      {feedback && (
        <div className="mt-6 w-full max-w-md">
          <div
            className={`flex items-center ${feedback.isCorrect ? "text-green-600" : "text-red-600"} mb-4 justify-center`}
          >
            {feedback.isCorrect ? <CheckCircle className="mr-2 h-5 w-5" /> : <AlertCircle className="mr-2 h-5 w-5" />}
            <span>{feedback.message}</span>
          </div>

          {feedback.showDetails && (
            <Card>
              <CardContent className="pt-4">
                <Tabs defaultValue="readings">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="readings">Readings</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>

                  <TabsContent value="readings" className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium">On Reading (音読み):</p>
                      <p className="text-sm">
                        {kanji.onReading} ({kanji.onReadingRomaji})
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Kun Reading (訓読み):</p>
                      <p className="text-sm">
                        {kanji.kunReading} ({kanji.kunReadingRomaji})
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="mt-4">
                    {kanji.examples && kanji.examples.length > 0 ? (
                      <div className="space-y-2">
                        {(showAllExamples ? [] : kanji.examples.slice(0, 2)).map((example, index) => (
                          <div key={index} className="p-2 bg-slate-50 rounded">
                            <p className="font-medium">{example.kana}</p>
                            <p className="text-sm text-muted-foreground">{example.KanaRomaji}</p>
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
                              <div key={`more-${index}`} className="p-2 bg-slate-50 rounded">
                                <p className="font-medium">{example.kana}</p>
                                <p className="text-sm text-muted-foreground">{example.KanaRomaji}</p>
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

                {/* Next button for incorrect answers */}
                {!feedback.isCorrect && (
                  <div className="mt-4">
                    <Button onClick={handleNextQuestion} className="w-full flex items-center justify-center">
                      Next Question <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

