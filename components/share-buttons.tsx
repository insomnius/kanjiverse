"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Facebook, MessageCircle, Link as LinkIcon, Check, Share2, Instagram } from "lucide-react"
import { useState } from "react"
import { InstagramShareDialog } from "@/components/instagram-share-dialog"
import { useTranslation, translate } from "@/lib/i18n/use-translation"
import type { Locale } from "@/lib/progress/store"

const SHARE_BASE = "https://kanji.insomnius.dev/share"

interface ShareButtonsProps {
  streak: number
  activeDays: number
  answered: number
  accuracy: number
  minutes: number
  displayName: string | null
  hasData: boolean
}

function buildShareUrl(props: ShareButtonsProps): string {
  const params = new URLSearchParams()
  if (props.displayName) params.set("name", props.displayName)
  if (props.streak > 0) params.set("streak", String(props.streak))
  if (props.activeDays > 0) params.set("days", String(props.activeDays))
  if (props.answered > 0) params.set("answered", String(props.answered))
  if (props.answered > 0) params.set("acc", String(props.accuracy))
  if (props.minutes > 0) params.set("min", String(props.minutes))
  const qs = params.toString()
  return qs ? `${SHARE_BASE}?${qs}` : SHARE_BASE
}

function buildShareText(props: ShareButtonsProps, locale: Locale): string {
  const parts: string[] = []
  if (props.streak > 0) {
    parts.push(translate(locale, "share.text.streak", { streak: props.streak }))
  } else if (props.answered > 0) {
    parts.push(translate(locale, "share.text.learning"))
  } else {
    return translate(locale, "share.text.generic")
  }

  const supplements: string[] = []
  if (props.answered > 0) supplements.push(translate(locale, "share.text.answered", { count: props.answered }))
  if (props.answered > 0 && props.accuracy >= 50) supplements.push(translate(locale, "share.text.accuracy", { percent: props.accuracy }))
  if (supplements.length) parts.push(`(${supplements.join(" · ")})`)

  parts.push(translate(locale, "share.text.tracking"))
  return parts.join(" ")
}

function openInPopup(url: string) {
  const w = 600
  const h = 600
  const left = window.screenX + (window.outerWidth - w) / 2
  const top = window.screenY + (window.outerHeight - h) / 2
  window.open(
    url,
    "share-popup",
    `width=${w},height=${h},left=${left},top=${top},noopener,noreferrer`,
  )
}

export function ShareButtons(props: ShareButtonsProps) {
  const { t, locale } = useTranslation()
  const [copied, setCopied] = useState(false)
  const [copyAnnounce, setCopyAnnounce] = useState("")
  const [igDialogOpen, setIgDialogOpen] = useState(false)
  const shareUrl = buildShareUrl(props)
  const shareText = buildShareText(props, locale)

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    openInPopup(url)
  }
  const handleFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    openInPopup(url)
  }
  const handleThreads = () => {
    const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    openInPopup(url)
  }
  const handleNativeShare = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: t("share.title"), text: shareText, url: shareUrl })
      } catch {
        // User cancelled or share failed — silent
      }
    } else {
      void handleCopyLink()
    }
  }
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      setCopied(true)
      setCopyAnnounce(t("share.copy.success"))
      setTimeout(() => {
        setCopied(false)
        setCopyAnnounce("")
      }, 1500)
    } catch {
      setCopyAnnounce(t("share.copy.failure"))
    }
  }

  // Detect Web Share API for mobile (Instagram + native share sheet)
  const hasNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function"

  return (
    <div className="space-y-4">
      {/* Live region announces copy success/failure to screen readers without stealing focus. */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {copyAnnounce}
      </div>
      <div>
        <p className="font-display italic text-xs text-sumi/70 uppercase tracking-wider mb-2">
          {t("share.section.link")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button variant="outline" onClick={handleTwitter} className="gap-2 justify-center">
            <Twitter aria-hidden="true" className="h-4 w-4" />
            {t("share.button.twitter")}
          </Button>
          <Button variant="outline" onClick={handleFacebook} className="gap-2 justify-center">
            <Facebook aria-hidden="true" className="h-4 w-4" />
            {t("share.button.facebook")}
          </Button>
          <Button variant="outline" onClick={handleThreads} className="gap-2 justify-center">
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            {t("share.button.threads")}
          </Button>
          <Button variant="outline" onClick={handleCopyLink} className="gap-2 justify-center">
            {copied ? (
              <>
                <Check aria-hidden="true" className="h-4 w-4 text-green-700" />
                {t("share.button.copied")}
              </>
            ) : (
              <>
                <LinkIcon aria-hidden="true" className="h-4 w-4" />
                {t("share.button.copyLink")}
              </>
            )}
          </Button>
        </div>
      </div>

      <div>
        <p className="font-display italic text-xs text-sumi/70 uppercase tracking-wider mb-2">
          {t("share.section.image")}
        </p>
        <Button
          variant="outline"
          onClick={() => setIgDialogOpen(true)}
          className="w-full gap-2 justify-center border-vermilion/30 hover:bg-vermilion/5"
        >
          <Instagram aria-hidden="true" className="h-4 w-4 text-vermilion-deep" />
          {t("share.button.instagram")}
        </Button>
        <p className="font-display italic text-xs text-sumi/70 mt-2">
          {t("share.image.note")}
        </p>
      </div>

      {hasNativeShare && (
        <div>
          <Button variant="outline" onClick={handleNativeShare} className="w-full gap-2 justify-center">
            <Share2 aria-hidden="true" className="h-4 w-4" />
            {t("share.button.system")}
          </Button>
          <p className="font-display italic text-xs text-sumi/70 mt-2 text-center">
            {t("share.system.note")}
          </p>
        </div>
      )}

      <InstagramShareDialog
        open={igDialogOpen}
        onOpenChange={setIgDialogOpen}
        data={{
          displayName: props.displayName,
          streak: props.streak,
          activeDays: props.activeDays,
          answered: props.answered,
          accuracy: props.accuracy,
          minutes: props.minutes,
        }}
      />

      {!props.hasData && (
        <p className="font-display italic text-xs text-sumi/70">
          {t("share.empty")}
        </p>
      )}
    </div>
  )
}
