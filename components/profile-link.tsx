"use client"

import { Link } from "@tanstack/react-router"
import { User } from "lucide-react"
import { useProgress } from "@/lib/progress/use-progress"

export function ProfileLink() {
  const { profile } = useProgress()
  const name = profile?.displayName ?? null
  const initial = name ? name[0]?.toUpperCase() : null

  return (
    <Link
      to="/profile"
      aria-label={name ? `Profile: ${name}` : "Set your name"}
      className="group flex items-center justify-center w-9 h-9 rounded-full text-sumi/70 hover:text-sumi transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
    >
      {initial ? (
        <span
          aria-hidden="true"
          className="w-7 h-7 rounded-full bg-sumi text-cream font-display text-sm font-semibold inline-flex items-center justify-center leading-none transition-transform group-hover:scale-105 group-hover:bg-vermilion-deep motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          style={{ fontVariationSettings: '"opsz" 12' }}
        >
          {initial}
        </span>
      ) : (
        <User aria-hidden="true" className="h-4 w-4" />
      )}
    </Link>
  )
}
