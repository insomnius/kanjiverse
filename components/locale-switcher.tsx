"use client"

import { Languages } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n/use-translation"
import { setLocale, SUPPORTED_LOCALES } from "@/lib/progress/use-progress"
import type { Locale } from "@/lib/progress/use-progress"

const LABELS: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  id: { short: "ID", full: "Bahasa Indonesia" },
}

interface Props {
  /** Mobile menu uses a wider button; desktop nav uses a compact pill. */
  variant?: "compact" | "stacked"
}

/**
 * Two-button language toggle. Editorial-restraint shape — same visual language
 * as the streak indicator pill (compact, vermilion-tinted active state). The
 * Languages icon makes the affordance discoverable without a label, and the
 * EN/ID short codes make the active option obvious at a glance.
 */
export function LocaleSwitcher({ variant = "compact" }: Props) {
  const { t, locale } = useTranslation()

  const onClick = (next: Locale) => {
    if (next === locale) return
    void setLocale(next)
  }

  if (variant === "stacked") {
    return (
      <div className="flex items-center gap-1.5" role="group" aria-label={t("nav.locale.aria")}>
        <Languages aria-hidden="true" className="h-4 w-4 text-sumi/70 shrink-0 mr-1" />
        {SUPPORTED_LOCALES.map((l) => {
          const active = l === locale
          return (
            <button
              key={l}
              type="button"
              onClick={() => onClick(l)}
              aria-pressed={active}
              aria-label={LABELS[l].full}
              className={cn(
                "min-h-[44px] min-w-[44px] px-3 rounded-md text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2",
                active
                  ? "bg-cream-deep text-sumi"
                  : "text-sumi/70 hover:bg-cream-deep/60 hover:text-sumi",
              )}
            >
              {LABELS[l].short}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      role="group"
      aria-label={t("nav.locale.aria")}
      className="flex items-center gap-0.5 px-1 h-9 rounded-md border border-sumi/15 bg-cream-deep/40"
    >
      <Languages aria-hidden="true" className="h-3.5 w-3.5 text-sumi/55 ml-1 mr-0.5 shrink-0" />
      {SUPPORTED_LOCALES.map((l) => {
        const active = l === locale
        return (
          <button
            key={l}
            type="button"
            onClick={() => onClick(l)}
            aria-pressed={active}
            aria-label={LABELS[l].full}
            className={cn(
              "h-7 px-2 rounded-sm text-[0.7rem] font-mono font-semibold tracking-wide transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-1",
              active
                ? "bg-cream text-sumi shadow-[0_1px_0_0_rgba(26,24,21,0.06)]"
                : "text-sumi/55 hover:text-sumi/80",
            )}
          >
            {LABELS[l].short}
          </button>
        )
      })}
    </div>
  )
}
