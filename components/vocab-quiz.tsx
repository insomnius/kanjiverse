"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react"
import { recordAnswer } from "@/lib/progress/use-progress"

interface VocabQuizProps {
  word: string
  meaning: string
  romaji: string
  options: string[]
  level?: string
  onAnswer: (isCorrect: boolean) => void
}

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded border border-sumi/20 bg-cream-deep text-sumi font-mono text-xs font-medium align-middle shadow-[0_1px_0_0_rgba(26,24,21,0.08)]">
    {children}
  </kbd>
)

export default function VocabQuiz({ word, meaning, romaji, options, level, onAnswer }: VocabQuizProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null)

  const handleSubmit = () => {
    if (!selectedOption || feedback) return
    const isCorrect = selectedOption === meaning
    void recordAnswer("vocab", word, isCorrect, level)
    setFeedback({
      isCorrect,
      message: isCorrect ? "Correct! (Press Enter for next)" : `Incorrect. The meaning is "${meaning}". (Press Enter for next)`,
    })
  }

  const nextQuestion = (wasCorrect: boolean) => {
    onAnswer(wasCorrect)
    setSelectedOption(null)
    setFeedback(null)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't intercept while user is typing in a text field
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return

      if (feedback) {
        if (event.key === 'Enter') {
          event.preventDefault()
          nextQuestion(feedback.isCorrect)
        }
        return
      }

      // Number keys select option at that 1-indexed position
      const num = parseInt(event.key, 10)
      if (!isNaN(num) && num >= 1 && num <= options.length) {
        event.preventDefault()
        setSelectedOption(options[num - 1])
        return
      }

      // Enter submits when an option is chosen
      if (event.key === 'Enter' && selectedOption) {
        event.preventDefault()
        handleSubmit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [feedback, selectedOption, options])

  return (
    <div className="flex flex-col items-center">
      {/* Screen-reader-only hint about hotkeys, announced once on render */}
      <p className="sr-only">
        Tip: press number keys 1 through {options.length} to choose an answer, then press Enter to submit.
      </p>

      <div className="mb-8">
        {/* No aria-label here — it would override the visible Japanese text and lose lang="ja" pronunciation. */}
        <p lang="ja" className="text-4xl font-bold mb-2 text-center text-sumi leading-none">{word}</p>
        <p className="text-lg text-center text-sumi/70 mb-1">{romaji}</p>
        <p className="text-sm text-center text-sumi/70">Select the meaning of this word</p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
          {options.map((option, index) => {
            const isSelected = selectedOption === option
            return (
              <div
                key={index}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md border transition-colors motion-reduce:transition-none ${
                  isSelected
                    ? "border-vermilion/40 bg-vermilion/5"
                    : "border-sumi/10 hover:bg-cream-deep/60"
                }`}
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <span aria-hidden="true">
                  <Kbd>{index + 1}</Kbd>
                </span>
                <Label htmlFor={`option-${index}`} className="text-base cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            )
          })}
        </RadioGroup>

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={!selectedOption || feedback !== null}
        >
          Check Answer
        </Button>

        {!feedback && (
          <p className="font-display italic text-sm text-sumi/70 text-center" aria-hidden="true">
            Press <Kbd>1</Kbd>{options.length > 1 ? <>–<Kbd>{options.length}</Kbd></> : null} to choose, <Kbd>Enter</Kbd> to submit
          </p>
        )}

        {feedback && (
          <div className="mt-2">
            <div
              role="status"
              aria-live="assertive"
              aria-atomic="true"
              className={`flex items-center ${feedback.isCorrect ? "text-green-600" : "text-red-600"
                } mb-4 justify-center`}
            >
              {feedback.isCorrect ? (
                <CheckCircle aria-hidden="true" className="mr-2 h-5 w-5" />
              ) : (
                <AlertCircle aria-hidden="true" className="mr-2 h-5 w-5" />
              )}
              <span><span className="sr-only">{feedback.isCorrect ? "Correct: " : "Incorrect: "}</span>{feedback.message}</span>
            </div>

            <Button
              onClick={() => nextQuestion(feedback.isCorrect)}
              className="w-full flex items-center justify-center"
            >
              Next Question <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Button>

            <p className="font-display italic text-sm text-sumi/70 text-center mt-3" aria-hidden="true">
              Press <Kbd>Enter</Kbd> for next
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
