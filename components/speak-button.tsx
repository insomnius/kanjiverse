"use client"

import { forwardRef, useEffect, useState } from "react"
import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { hasJapaneseVoice, isTtsSupported, speakJapanese, subscribeVoices } from "@/lib/tts"
import { useProgress, isTtsEnabled } from "@/lib/progress/use-progress"

interface SpeakButtonProps {
  /** The Japanese text to speak. */
  text: string
  /** Accessible label, e.g. "Speak 漢 in Japanese". Required because the button is icon-only. */
  label: string
  /** Visual size — passed through to the underlying Button. */
  size?: "sm" | "icon"
  /** Slightly slower default (0.9) is friendlier for learners; pass 1 for native pace. */
  rate?: number
  className?: string
}

/**
 * Renders a speaker icon that speaks `text` aloud using the OS's Japanese voice.
 *
 * Self-gating: returns null when the API isn't supported, the user has muted TTS,
 * or no Japanese voice is installed. Subscribes to voiceschanged so the button
 * appears the moment the voice list resolves on Chrome's first paint.
 *
 * Forwards a ref to the underlying button — used by the quiz tour to anchor a
 * highlight ring. When the button doesn't render (no voice, muted, unsupported)
 * the ref simply stays null and the tour skips that step.
 */
export const SpeakButton = forwardRef<HTMLButtonElement, SpeakButtonProps>(
  function SpeakButton({ text, label, size = "icon", rate, className }, ref) {
    const { profile } = useProgress()
    const [voiceAvailable, setVoiceAvailable] = useState(() => hasJapaneseVoice())

    useEffect(() => {
      return subscribeVoices(() => setVoiceAvailable(hasJapaneseVoice()))
    }, [])

    if (!isTtsSupported()) return null
    if (!isTtsEnabled(profile ?? null)) return null
    if (!voiceAvailable) return null

    return (
      <Button
        ref={ref}
        type="button"
        variant="ghost"
        size={size}
        onClick={() => speakJapanese(text, { rate })}
        aria-label={label}
        className={className}
      >
        <Volume2 aria-hidden="true" className="h-4 w-4" />
        {size === "sm" && <span className="ml-1.5 text-xs font-display italic">Speak</span>}
      </Button>
    )
  },
)
