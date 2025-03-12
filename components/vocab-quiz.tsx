"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react"

// Update the interface to include romaji
interface VocabQuizProps {
  word: string
  meaning: string
  romaji: string
  options: string[]
  onAnswer: (isCorrect: boolean) => void
}

export default function VocabQuiz({ word, meaning, romaji, options, onAnswer }: VocabQuizProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  // Update the feedback state to include romaji
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; showRomaji?: boolean } | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const handleOptionSelect = (option: string) => {
    if (isChecking) return
    setSelectedOption(option)
  }

  // Update the handleSubmit function to include romaji in the feedback
  const handleSubmit = () => {
    if (!selectedOption || isChecking) return

    setIsChecking(true)

    const isCorrect = selectedOption === meaning

    setFeedback({
      isCorrect,
      message: isCorrect ? "Correct!" : `Incorrect. The meaning is "${meaning}".`,
      showRomaji: true,
    })

    // Only auto-continue if the answer is correct
    if (isCorrect) {
      setTimeout(() => {
        onAnswer(isCorrect)
        setSelectedOption(null)
        setFeedback(null)
        setIsChecking(false)
      }, 2500)
    }
  }

  const handleNextQuestion = () => {
    onAnswer(false)
    setSelectedOption(null)
    setFeedback(null)
    setIsChecking(false)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <div className="text-4xl font-bold mb-2 text-center">{word}</div>
        <p className="text-sm text-center text-muted-foreground">Select the correct meaning</p>
      </div>

      <div className="w-full max-w-md space-y-3 mb-4">
        {options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === option ? "default" : "outline"}
            className="w-full justify-start text-left h-auto py-3 px-4"
            onClick={() => handleOptionSelect(option)}
            disabled={isChecking}
          >
            {option}
          </Button>
        ))}
      </div>

      <Button onClick={handleSubmit} className="w-full max-w-md" disabled={!selectedOption || isChecking}>
        Check Answer
      </Button>

      {/* Add romaji display to the feedback section */}
      {feedback && (
        <div className="mt-4 flex flex-col items-center w-full max-w-md">
          <div className={`flex items-center ${feedback.isCorrect ? "text-green-600" : "text-red-600"} mb-2`}>
            {feedback.isCorrect ? <CheckCircle className="mr-2 h-5 w-5" /> : <AlertCircle className="mr-2 h-5 w-5" />}
            <span>{feedback.message}</span>
          </div>
          {feedback.showRomaji && (
            <div className="mt-2 text-center mb-4">
              <p className="text-sm text-muted-foreground">How to pronounce:</p>
              <p className="font-medium">{romaji}</p>
            </div>
          )}

          {/* Add Next button for incorrect answers */}
          {!feedback.isCorrect && (
            <Button onClick={handleNextQuestion} className="w-full flex items-center justify-center mt-2">
              Next Question <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

