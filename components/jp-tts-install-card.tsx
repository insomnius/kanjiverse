"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JpVoiceInstallInstructions } from "@/components/jp-voice-install-instructions"
import { hasJapaneseVoice, isTtsSupported, subscribeVoices } from "@/lib/tts"
import { hasSeenOnboarding, markOnboardingSeen, useProgress } from "@/lib/progress/use-progress"
import { useTranslation } from "@/lib/i18n/use-translation"

const ONBOARDING_ID = "jp-tts-install-v1"

/**
 * First-run guidance for users without a Japanese OS voice. Renders when:
 *   - the browser exposes Web Speech (no point on Safari without it)
 *   - the OS reports no Japanese voice
 *   - the user hasn't already dismissed this card
 *
 * Once dismissed, never shown again on this device. Reuses the install copy
 * from <JpVoiceInstallInstructions /> so /quiz and /profile stay in sync.
 */
export function JpTtsInstallCard() {
  const { profile, hydrated } = useProgress()
  const { t } = useTranslation()
  const [voiceAvailable, setVoiceAvailable] = useState(() => hasJapaneseVoice())
  // Strict-mode safety: don't double-write to IDB if the dismiss handler runs twice.
  const dismissedRef = useRef(false)

  useEffect(() => {
    return subscribeVoices(() => setVoiceAvailable(hasJapaneseVoice()))
  }, [])

  if (!hydrated) return null
  if (!isTtsSupported()) return null
  if (voiceAvailable) return null
  if (hasSeenOnboarding(profile ?? null, ONBOARDING_ID)) return null

  const dismiss = () => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    void markOnboardingSeen(ONBOARDING_ID)
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative mb-6 rounded-lg border border-vermilion/30 bg-vermilion/5 px-4 py-4 pr-10 shadow-[0_2px_10px_-4px_rgba(200,85,61,0.18)]"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-vermilion/10 flex items-center justify-center">
          <Mic aria-hidden="true" className="h-4 w-4 text-vermilion-deep" />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <p className="font-display text-base font-medium text-sumi tracking-tight">
            {t("install.title")}
          </p>
          <p className="font-display italic text-sm text-sumi/70 leading-snug">
            {t("install.body")}
          </p>
          <JpVoiceInstallInstructions />
          <div className="pt-1">
            <Button type="button" variant="outline" size="sm" onClick={dismiss} className="font-display">
              {t("install.gotIt")}
            </Button>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("install.dismiss.aria")}
        className="absolute top-2 right-2 p-1.5 rounded-md text-sumi/55 hover:text-sumi hover:bg-cream-deep/60 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
      >
        <X aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
