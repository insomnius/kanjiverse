"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Check, Copy } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ShareButtonProps {
  title: string
  text: string
  url?: string
  variant?: "icon" | "default" | "prominent"
}

export default function ShareButton({ title, text, url, variant = "default" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url: url || window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback to copy to clipboard
        await copyToClipboard(`${title}

${text}

${shareData.url}`)
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  if (variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleShare} className="h-9 w-9">
              {copied ? (
                <Check className="h-4 w-4" />
              ) : navigator.share ? (
                <Share2 className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Share</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "Copied!" : navigator.share ? "Share" : "Copy to clipboard"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (variant === "prominent") {
    return (
      <Button
        onClick={handleShare}
        size="lg"
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 animate-pulse"
      >
        {copied ? (
          <Check className="mr-2 h-5 w-5" />
        ) : navigator.share ? (
          <Share2 className="mr-2 h-5 w-5" />
        ) : (
          <Copy className="mr-2 h-5 w-5" />
        )}
        {copied ? "Copied!" : "Share Your Progress"}
      </Button>
    )
  }

  return (
    <Button onClick={handleShare} variant="default" className="flex items-center gap-2">
      {copied ? (
        <Check className="h-4 w-4" />
      ) : navigator.share ? (
        <Share2 className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      {copied ? "Copied!" : "Share"}
    </Button>
  )
}

