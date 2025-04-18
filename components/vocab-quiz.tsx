"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react"

interface VocabQuizProps {
  word: string
  meaning: string
  romaji: string
  options: string[]
  onAnswer: (isCorrect: boolean) => void
}

export default function VocabQuiz({ word, meaning, romaji, options, onAnswer }: VocabQuizProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null)

  // Add keyboard event listener for Enter key when feedback is shown
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && feedback) {
        nextQuestion(feedback.isCorrect)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [feedback])

  const handleSubmit = () => {
    if (!selectedOption) return

    const isCorrect = selectedOption === meaning

    setFeedback({
      isCorrect,
      message: isCorrect ? "Correct! (Press Enter for next)" : `Incorrect. The meaning is "${meaning}". (Press Enter for next)`,
    })

    // No auto-continue timeout, allow the user to press Enter instead
  }

  const nextQuestion = (wasCorrect: boolean) => {
    onAnswer(wasCorrect)
    setSelectedOption(null)
    setFeedback(null)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <div className="text-4xl font-bold mb-2 text-center">{word}</div>
        <p className="text-lg text-center text-muted-foreground mb-1">{romaji}</p>
        <p className="text-sm text-center text-muted-foreground">Select the meaning of this word</p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="text-base cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={!selectedOption || feedback !== null}
        >
          Check Answer
        </Button>

        {feedback && (
          <div className="mt-2">
            <div
              className={`flex items-center ${
                feedback.isCorrect ? "text-green-600" : "text-red-600"
              } mb-4 justify-center`}
            >
              {feedback.isCorrect ? (
                <CheckCircle className="mr-2 h-5 w-5" />
              ) : (
                <AlertCircle className="mr-2 h-5 w-5" />
              )}
              <span>{feedback.message}</span>
            </div>
            
            {/* Next button shown for both correct and incorrect answers */}
            <Button
              onClick={() => nextQuestion(feedback.isCorrect)}
              className="w-full flex items-center justify-center"
            >
              Next Question <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

