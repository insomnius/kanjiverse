"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle } from "lucide-react"
import { SpeakButton } from "@/components/speak-button"
import { recordAnswer, isSoundEnabled, useProgress } from "@/lib/progress/use-progress"
import { playCorrect, playIncorrect } from "@/lib/sounds"
import { useTranslation } from "@/lib/i18n/use-translation"

interface KanaQuizProps {
  kana: string
  romaji: string
  options: string[]
  kanaType: "hiragana" | "katakana"
  onAnswer: (isCorrect: boolean) => void
}

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded border border-sumi/20 bg-cream-deep text-sumi font-mono text-xs font-medium align-middle shadow-[0_1px_0_0_rgba(26,24,21,0.08)]">
    {children}
  </kbd>
)

export default function KanaQuiz({ kana, romaji, options, kanaType, onAnswer }: KanaQuizProps) {
  const { profile } = useProgress()
  const { t } = useTranslation()
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
    void recordAnswer("kana", kana, isCorrect, kanaType)
    if (isSoundEnabled(profile ?? null)) {
      if (isCorrect) playCorrect()
      else playIncorrect()
    }

    setFeedback({
      isCorrect,
      message: isCorrect
        ? t("quiz.kana.feedback.correct")
        : t("quiz.kana.feedback.incorrect", { romaji }),
    })

    setTimeout(() => {
      onAnswer(isCorrect)
      setSelectedOption(null)
      setFeedback(null)
      setIsChecking(false)
    }, 2000)
  }

  // Hotkeys: 1–N select option, Enter submits. Mirrors vocab-quiz behavior.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't intercept while user is typing in a text field
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return

      // While feedback is showing, the auto-advance timer handles the next state.
      // Don't accept new input during this period.
      if (isChecking || feedback) return

      // Number keys 1..N select option at that 1-indexed position
      const num = parseInt(event.key, 10)
      if (!isNaN(num) && num >= 1 && num <= options.length) {
        event.preventDefault()
        setSelectedOption(options[num - 1])
        return
      }

      // Enter submits when an option is chosen
      if (event.key === "Enter" && selectedOption) {
        event.preventDefault()
        handleSubmit()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [feedback, selectedOption, options, isChecking])

  return (
    <div className="flex flex-col items-center">
      {/* SR-only hotkey hint, announced once on render */}
      <p className="sr-only">
        {t("quiz.vocab.srHint", { count: options.length })}
      </p>

      <div className="mb-8">
        {/* No aria-label here — it would override the visible kana and lose lang="ja" pronunciation. The instruction line below conveys script context. */}
        <p lang="ja" className="text-8xl font-bold mb-2 text-center text-sumi leading-none">{kana}</p>
        <div className="flex justify-center mb-1">
          <SpeakButton text={kana} label={t("speak.aria.kana", { value: kana })} />
        </div>
        <p className="text-sm text-center text-sumi/70">
          {kanaType === "hiragana" ? t("quiz.kana.instruction.hiragana") : t("quiz.kana.instruction.katakana")}
        </p>
      </div>

      <div className="w-full max-w-md space-y-2.5 mb-4">
        {options.map((option, index) => {
          const isSelected = selectedOption === option
          return (
            <Button
              key={index}
              variant={isSelected ? "default" : "outline"}
              className={`w-full justify-start text-left h-auto py-3 px-4 gap-3 ${
                isSelected ? "" : "hover:border-vermilion/40"
              }`}
              onClick={() => handleOptionSelect(option)}
              disabled={isChecking}
              aria-label={t("quiz.kana.option.aria", { index: index + 1, value: option })}
            >
              <span aria-hidden="true">
                <Kbd>{index + 1}</Kbd>
              </span>
              <span className="flex-1">{option}</span>
            </Button>
          )
        })}
      </div>

      <Button onClick={handleSubmit} className="w-full max-w-md" disabled={!selectedOption || isChecking}>
        {t("quiz.kana.checkAnswer")}
      </Button>

      {!feedback && (
        <p className="font-display italic text-sm text-sumi/70 text-center mt-3" aria-hidden="true">
          {t("quiz.kbdHint.before")} <Kbd>1</Kbd>{options.length > 1 ? <>–<Kbd>{options.length}</Kbd></> : null} {t("quiz.kbdHint.middle")} <Kbd>Enter</Kbd> {t("quiz.kbdHint.after")}
        </p>
      )}

      {feedback && (
        <div role="status" aria-live="assertive" aria-atomic="true" className="mt-4 flex items-center">
          {feedback.isCorrect ? (
            <CheckCircle aria-hidden="true" className="mr-2 h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle aria-hidden="true" className="mr-2 h-5 w-5 text-red-600" />
          )}
          <span className={feedback.isCorrect ? "text-green-600" : "text-red-600"}>
            <span className="sr-only">{feedback.isCorrect ? t("quiz.feedback.sr.correct") : t("quiz.feedback.sr.incorrect")}</span>{feedback.message}
          </span>
        </div>
      )}
    </div>
  )
}
