"use client"

import { useProgress } from "@/lib/progress/use-progress"
import { getActiveLocale } from "@/lib/progress/store"
import type { Locale } from "@/lib/progress/store"
import { enMessages, type MessageKey } from "./messages.en"
import { idMessages } from "./messages.id"

export type { MessageKey, Locale }

const catalogs: Record<Locale, Partial<Record<MessageKey, string>>> = {
  en: enMessages,
  id: idMessages,
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => {
    const v = vars[key]
    return v === undefined ? `{${key}}` : String(v)
  })
}

/**
 * Translate a key into the active locale's string. Falls back to English when
 * the active locale doesn't have the key (e.g. partial Indonesian translation
 * during development), so the UI never shows raw `{key.path}` strings.
 *
 * Pure function — for non-component contexts. Component code should prefer
 * `useTranslation()` so they re-render on locale switch.
 */
export function translate(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  const localized = catalogs[locale][key]
  const fallback = enMessages[key]
  return interpolate(localized ?? fallback, vars)
}

/**
 * React hook returning the active locale and a `t()` function bound to it.
 * Re-renders on locale switch via the underlying progress store subscription.
 *
 *   const { t, locale } = useTranslation()
 *   <h1>{t("quiz.title")}</h1>
 *   <p>{t("tour.step", { current: 1, total: 3 })}</p>
 */
export function useTranslation() {
  const { profile } = useProgress()
  const locale = getActiveLocale(profile ?? null)

  function t(key: MessageKey, vars?: Record<string, string | number>): string {
    return translate(locale, key, vars)
  }

  return { t, locale }
}
