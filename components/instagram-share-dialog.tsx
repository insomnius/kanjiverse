"use client"

import { useEffect, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Download, Share2, X, Loader2 } from "lucide-react"
import {
  generateStatsImage,
  buildShareImageFilename,
  type ImageFormat,
  type StatsImageData,
} from "@/lib/share/generate-stats-image"

interface InstagramShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: StatsImageData
}

export function InstagramShareDialog({ open, onOpenChange, data }: InstagramShareDialogProps) {
  const [format, setFormat] = useState<ImageFormat>("square")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const blobRef = useRef<Blob | null>(null)

  // Detect Web Share API with file support (mobile)
  const canShareFiles =
    typeof navigator !== "undefined" &&
    typeof navigator.canShare === "function"

  useEffect(() => {
    if (!open) return
    let cancelled = false
    setGenerating(true)
    setError(null)

    generateStatsImage(data, format)
      .then((blob) => {
        if (cancelled) return
        blobRef.current = blob
        const url = URL.createObjectURL(blob)
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev)
          return url
        })
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : "Couldn't generate image.")
      })
      .finally(() => {
        if (!cancelled) setGenerating(false)
      })

    return () => {
      cancelled = true
    }
  }, [open, format, data])

  // Cleanup object URL on close
  useEffect(() => {
    if (!open && previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
      blobRef.current = null
    }
  }, [open, previewUrl])

  const handleDownload = () => {
    if (!blobRef.current) return
    const url = URL.createObjectURL(blobRef.current)
    const a = document.createElement("a")
    a.href = url
    a.download = buildShareImageFilename(format)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleNativeShare = async () => {
    if (!blobRef.current) return
    const file = new File([blobRef.current], buildShareImageFilename(format), {
      type: "image/png",
    })
    if (!navigator.canShare?.({ files: [file] })) {
      // Fallback to download
      handleDownload()
      return
    }
    try {
      await navigator.share({
        files: [file],
        title: "My Kanji by Insomnius progress",
        text:
          data.streak > 0
            ? `${data.streak}-day kanji streak 🔥 — kanji.insomnius.dev`
            : "Learning Japanese kanji on kanji.insomnius.dev",
      })
    } catch {
      // User cancelled — silent
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-auto p-0 gap-0 sm:rounded-xl">
        <div className="flex items-start justify-between p-6 pb-3">
          <div className="flex-1">
            <DialogTitle className="font-display text-xl text-sumi font-medium">
              Share to Instagram
            </DialogTitle>
            <DialogDescription className="font-display italic text-sumi/70 text-sm mt-1">
              Pick a format, then share via your device or download to upload manually.
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close">
              <X aria-hidden="true" className="h-5 w-5" />
            </Button>
          </DialogClose>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Format toggle */}
          <ToggleGroup
            type="single"
            value={format}
            onValueChange={(value) => { if (value) setFormat(value as ImageFormat) }}
            aria-label="Image format"
            className="flex justify-center gap-2"
          >
            {([
              { value: "square", label: "Square", caption: "Feed post · 1080×1080" },
              { value: "story", label: "Story", caption: "Story · 1080×1920" },
            ] as const).map(({ value, label, caption }) => {
              const isActive = format === value
              return (
                <ToggleGroupItem
                  key={value}
                  value={value}
                  aria-label={`${label} — ${caption}`}
                  className="group flex-1 flex flex-col items-center min-h-[44px] px-4 pt-2 pb-1.5 rounded-none data-[state=on]:bg-transparent"
                >
                  <span
                    className={`font-display text-base leading-none tracking-tight transition-colors ${
                      isActive ? "text-sumi font-semibold" : "text-sumi/45 font-medium group-hover:text-sumi/75"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`font-display italic text-[0.65rem] mt-1 transition-colors tracking-wide ${
                      isActive ? "text-vermilion-deep" : "text-sumi/70 group-hover:text-sumi/75"
                    }`}
                  >
                    {caption}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 h-[2px] w-full transition-all duration-300 motion-reduce:transition-none ${
                      isActive ? "bg-vermilion" : "bg-transparent group-hover:bg-sumi/15"
                    }`}
                  />
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>

          {/* Preview */}
          <div
            className={`relative bg-cream-deep/40 border border-sumi/10 rounded-md overflow-hidden mx-auto ${
              format === "square" ? "aspect-square w-full max-w-[320px]" : "aspect-[9/16] w-full max-w-[200px]"
            }`}
          >
            {previewUrl && !generating && (
              <img
                src={previewUrl}
                alt={`Preview of ${format} share image`}
                className="w-full h-full object-contain"
              />
            )}
            {generating && (
              <div className="absolute inset-0 flex items-center justify-center bg-cream-deep/50">
                <Loader2 aria-hidden="true" className="h-6 w-6 text-sumi/70 animate-spin motion-reduce:animate-none" />
                <span className="sr-only">Generating image…</span>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <p className="font-display italic text-sm text-red-700 text-center">{error}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {canShareFiles && (
              <Button
                onClick={handleNativeShare}
                disabled={generating || !!error || !blobRef.current}
                className="w-full gap-2"
              >
                <Share2 aria-hidden="true" className="h-4 w-4" />
                Share via system…
              </Button>
            )}
            <Button
              onClick={handleDownload}
              disabled={generating || !!error || !blobRef.current}
              variant={canShareFiles ? "outline" : "default"}
              className="w-full gap-2"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Download image
            </Button>
            <p className="font-display italic text-xs text-sumi/70 text-center pt-1">
              Instagram doesn't accept link uploads.{" "}
              {canShareFiles
                ? "Use system share to send it to Instagram, then post or add to story."
                : "Download the image, then upload it manually in the Instagram app."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
