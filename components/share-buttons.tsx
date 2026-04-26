"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Facebook, MessageCircle, Link as LinkIcon, Check, Share2, Instagram } from "lucide-react"
import { useState } from "react"
import { InstagramShareDialog } from "@/components/instagram-share-dialog"

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

function buildShareText(props: ShareButtonsProps): string {
  const parts: string[] = []
  if (props.streak > 0) {
    parts.push(`${props.streak}-day kanji streak 🔥`)
  } else if (props.answered > 0) {
    parts.push(`Learning Japanese kanji`)
  } else {
    return `I'm learning Japanese kanji on Kanji by Insomnius — free, in-browser, no account.`
  }

  const supplements: string[] = []
  if (props.answered > 0) supplements.push(`${props.answered} answered`)
  if (props.answered > 0 && props.accuracy >= 50) supplements.push(`${props.accuracy}% accuracy`)
  if (supplements.length) parts.push(`(${supplements.join(" · ")})`)

  parts.push(`Tracking on Kanji by Insomnius — free & in-browser.`)
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
  const [copied, setCopied] = useState(false)
  const [copyAnnounce, setCopyAnnounce] = useState("")
  const [igDialogOpen, setIgDialogOpen] = useState(false)
  const shareUrl = buildShareUrl(props)
  const shareText = buildShareText(props)

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
        await navigator.share({ title: "Kanji by Insomnius", text: shareText, url: shareUrl })
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
      setCopyAnnounce("Link copied to clipboard")
      setTimeout(() => {
        setCopied(false)
        setCopyAnnounce("")
      }, 1500)
    } catch {
      setCopyAnnounce("Couldn't copy. Your browser may have blocked clipboard access.")
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
          Share a link
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button variant="outline" onClick={handleTwitter} className="gap-2 justify-center">
            <Twitter aria-hidden="true" className="h-4 w-4" />
            Twitter / X
          </Button>
          <Button variant="outline" onClick={handleFacebook} className="gap-2 justify-center">
            <Facebook aria-hidden="true" className="h-4 w-4" />
            Facebook
          </Button>
          <Button variant="outline" onClick={handleThreads} className="gap-2 justify-center">
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            Threads
          </Button>
          <Button variant="outline" onClick={handleCopyLink} className="gap-2 justify-center">
            {copied ? (
              <>
                <Check aria-hidden="true" className="h-4 w-4 text-green-700" />
                Copied
              </>
            ) : (
              <>
                <LinkIcon aria-hidden="true" className="h-4 w-4" />
                Copy link
              </>
            )}
          </Button>
        </div>
      </div>

      <div>
        <p className="font-display italic text-xs text-sumi/70 uppercase tracking-wider mb-2">
          Share an image
        </p>
        <Button
          variant="outline"
          onClick={() => setIgDialogOpen(true)}
          className="w-full gap-2 justify-center border-vermilion/30 hover:bg-vermilion/5"
        >
          <Instagram aria-hidden="true" className="h-4 w-4 text-vermilion-deep" />
          Generate image for Instagram…
        </Button>
        <p className="font-display italic text-xs text-sumi/70 mt-2">
          Picks square or story format. Image works for Instagram, plus any photo-sharing platform.
        </p>
      </div>

      {hasNativeShare && (
        <div>
          <Button variant="outline" onClick={handleNativeShare} className="w-full gap-2 justify-center">
            <Share2 aria-hidden="true" className="h-4 w-4" />
            Share via system…
          </Button>
          <p className="font-display italic text-xs text-sumi/70 mt-2 text-center">
            Opens your device's share sheet — Instagram, WhatsApp, Messages, and more.
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
          You haven't taken any quizzes yet — the share post will be a generic invitation. Take a quiz first to share real numbers.
        </p>
      )}
    </div>
  )
}
