"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle } from "lucide-react"

interface KanaQuizProps {
  kana: string
  romaji: string
  options: string[]
  kanaType: "hiragana" | "katakana"
  onAnswer: (isCorrect: boolean) => void
}

export default function KanaQuiz({ kana, romaji, options, kanaType, onAnswer }: KanaQuizProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const handleOptionSelect = (option: string) => {
    if (isChecking) return
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    if (!selectedOption || isChecking) return

    setIsChecking(true)

    const isCorrect = selectedOption === romaji

    setFeedback({
      isCorrect,
      message: isCorrect ? "Correct!" : `Incorrect. The correct answer is "${romaji}".`,
    })

    setTimeout(() => {
      onAnswer(isCorrect)
      setSelectedOption(null)
      setFeedback(null)
      setIsChecking(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <div className="text-8xl font-bold mb-2 text-center">{kana}</div>
        <p className="text-sm text-center text-muted-foreground">
          Select the correct {kanaType === "hiragana" ? "hiragana" : "katakana"} pronunciation
        </p>
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

      {feedback && (
        <div className="mt-4 flex items-center">
          {feedback.isCorrect ? (
            <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="mr-2 h-5 w-5 text-red-600" />
          )}
          <span className={feedback.isCorrect ? "text-green-600" : "text-red-600"}>{feedback.message}</span>
        </div>
      )}
    </div>
  )
}

