import { createFileRoute, Link } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import { Flame, ArrowRight, Sparkles } from "lucide-react"
import { useTranslation } from "@/lib/i18n/use-translation"

interface ShareSearch {
  name?: string
  streak?: number
  days?: number
  answered?: number
  acc?: number
  min?: number
}

function ShareView() {
  const search = Route.useSearch()
  const { t } = useTranslation()
  const name = search.name?.trim() ?? null
  const streak = search.streak ?? 0
  const activeDays = search.days ?? 0
  const answered = search.answered ?? 0
  const accuracy = search.acc ?? 0
  const minutes = search.min ?? 0
  const hasData = answered > 0

  const heroLine = name
    ? t("share.hero.named", { name })
    : t("share.hero.anonymous")

  return (
    <div className="py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <p className="font-display italic text-sm text-vermilion-deep tracking-wider uppercase mb-2">
            {t("share.eyebrow")}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight">
            {heroLine}
          </h1>
        </header>

        <Card className="mb-6 border-vermilion/30 shadow-[0_4px_24px_-8px_rgba(168,124,47,0.25)]">
          <CardContent className="p-6 sm:p-10">
            {/* Hero streak */}
            <div className="text-center mb-8">
              <div className="inline-flex items-baseline gap-3">
                <Flame
                  aria-hidden="true"
                  className={`h-10 w-10 ${streak > 0 ? "text-vermilion fill-vermilion/30" : "text-sumi/25"}`}
                />
                <p className="font-display text-7xl sm:text-8xl font-medium text-sumi tabular-nums leading-none">
                  {streak}
                </p>
              </div>
              <p className="font-display italic text-sumi/70 text-xl mt-3">
                {streak === 1 ? t("share.streak.singular") : t("share.streak.plural")}
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
              <Stat label={t("share.stat.activeDays")} value={activeDays} suffix="/ 365" />
              <Stat label={t("share.stat.answered")} value={answered} />
              <Stat label={t("share.stat.accuracy")} value={accuracy} suffix="%" />
            </div>

            {/* Brand mark */}
            <div className="border-t border-sumi/10 pt-6 flex items-center justify-center gap-2.5">
              <span lang="ja" aria-hidden="true" className="font-jp text-2xl text-vermilion font-semibold leading-none">
                漢字
              </span>
              <span className="font-display text-lg text-sumi font-semibold leading-none">Kanji</span>
              <span className="font-display italic text-base text-sumi/70 leading-none">by Insomnius</span>
            </div>
          </CardContent>
        </Card>

        {minutes > 0 && (
          <p className="text-center font-display italic text-sm text-sumi/70 mb-8">
            <Sparkles aria-hidden="true" className="inline h-4 w-4 mr-1 -mt-0.5" />
            {minutes < 60
              ? t("share.minutes.studied", { n: minutes })
              : t("share.hoursMinutes.studied", { h: Math.floor(minutes / 60), m: minutes % 60 })}
            {hasData && ` ${t("share.startedRecently")}`}
          </p>
        )}

        <div className="text-center">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-sumi text-cream hover:bg-vermilion-deep transition-colors font-display text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
          >
            {t("share.cta.start")}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <p className="mt-3 font-display italic text-xs text-sumi/70">
            {t("share.cta.tagline")}
          </p>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-3xl sm:text-4xl font-medium text-sumi tabular-nums leading-none">
        {value}
        {suffix && <span className="text-sm sm:text-base text-sumi/70 font-normal italic ml-1">{suffix}</span>}
      </p>
      <p className="font-display italic text-xs sm:text-sm text-sumi/70 mt-2 uppercase tracking-wider">
        {label}
      </p>
    </div>
  )
}

const PAGE_TITLE = "Shared kanji learning progress · Kanji by Insomnius"
const PAGE_DESCRIPTION =
  "Practice Japanese kanji, vocabulary, and kana with interactive JLPT-level quizzes. Track your progress in your browser — no account required."

export const Route = createFileRoute("/share")({
  validateSearch: (search: Record<string, unknown>): ShareSearch => ({
    name: typeof search.name === "string" ? search.name.slice(0, 32) : undefined,
    streak: typeof search.streak === "string" ? Math.max(0, parseInt(search.streak, 10) || 0) :
            typeof search.streak === "number" ? Math.max(0, Math.floor(search.streak)) : undefined,
    days: typeof search.days === "string" ? Math.max(0, parseInt(search.days, 10) || 0) :
          typeof search.days === "number" ? Math.max(0, Math.floor(search.days)) : undefined,
    answered: typeof search.answered === "string" ? Math.max(0, parseInt(search.answered, 10) || 0) :
              typeof search.answered === "number" ? Math.max(0, Math.floor(search.answered)) : undefined,
    acc: typeof search.acc === "string" ? Math.min(100, Math.max(0, parseInt(search.acc, 10) || 0)) :
         typeof search.acc === "number" ? Math.min(100, Math.max(0, Math.floor(search.acc))) : undefined,
    min: typeof search.min === "string" ? Math.max(0, parseInt(search.min, 10) || 0) :
         typeof search.min === "number" ? Math.max(0, Math.floor(search.min)) : undefined,
  }),
  component: ShareView,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: "https://kanji.insomnius.dev/share" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://kanji.insomnius.dev/kv.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      { name: "twitter:image", content: "https://kanji.insomnius.dev/kv.png" },
    ],
    links: [{ rel: "canonical", href: "https://kanji.insomnius.dev/share" }],
  }),
})
