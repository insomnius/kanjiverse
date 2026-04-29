import { createFileRoute, Link } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight, BookOpen, Pencil, Calendar, Target, Flame, Zap,
  ShieldCheck, Share2, Languages, Sparkles, PenLine,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/use-translation"

// ---- Tiny live previews of real features (no screenshots — actual UI fragments) ----

function MiniCalendar() {
  const seed = [0, 1, 0, 2, 1, 0, 3, 2, 4, 1, 0, 2, 3, 1]
  return (
    <div
      aria-hidden="true"
      className="grid"
      style={{
        gridTemplateColumns: "repeat(14, 10px)",
        gridTemplateRows: "repeat(7, 10px)",
        gridAutoFlow: "column",
        gap: "2px",
      }}
    >
      {Array.from({ length: 98 }).map((_, i) => {
        const intensity = (seed[i % seed.length] + ((i * 7) % 5)) % 5
        const cls =
          intensity === 0 ? "bg-sumi/[0.06]" :
          intensity === 1 ? "bg-gold/25" :
          intensity === 2 ? "bg-gold/50" :
          intensity === 3 ? "bg-gold/75" :
          "bg-gold-deep"
        return <div key={i} className={`rounded-[2px] ${cls}`} />
      })}
    </div>
  )
}

function MiniKanjiCard() {
  const { t } = useTranslation()
  return (
    <div className="border border-sumi/15 bg-white/70 rounded-md p-3 inline-block shadow-[0_2px_10px_-4px_rgba(168,124,47,0.2)]">
      <p lang="ja" className="text-3xl font-bold text-sumi text-center leading-none">
        漢
      </p>
      <p className="text-xs font-medium text-sumi text-center mt-1.5">{t("landing.miniCard.meaning")}</p>
      <p className="text-[10px] text-sumi/70 text-center">{t("landing.miniCard.detail")}</p>
    </div>
  )
}

function MiniStreakPill() {
  const { t } = useTranslation()
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-medium tabular-nums font-display">
      <Flame aria-hidden="true" className="h-3.5 w-3.5 fill-gold/40" />
      <span><span className="font-semibold">12</span><span className="text-gold-deep/80"> {t("landing.miniStreak.days")}</span></span>
    </div>
  )
}

function MiniFlashcard() {
  const { t } = useTranslation()
  return (
    <div className="border border-vermilion/30 bg-white/70 rounded-md px-4 pt-3 pb-2.5 inline-block shadow-[0_2px_10px_-4px_rgba(168,124,47,0.2)]">
      <p lang="ja" className="text-3xl font-bold text-sumi text-center leading-none">
        書
      </p>
      <p className="text-[10px] text-sumi/70 text-center mt-1.5 italic font-display">
        {t("landing.miniFlash.hint")}
      </p>
      <div aria-hidden="true" className="flex gap-1 mt-2 justify-center">
        <span className="inline-flex items-center justify-center min-w-[20px] h-[18px] px-1 rounded text-[9px] font-display tabular-nums border border-vermilion/40 text-vermilion-deep">1</span>
        <span className="inline-flex items-center justify-center min-w-[20px] h-[18px] px-1 rounded text-[9px] font-display tabular-nums bg-sumi text-cream">2</span>
        <span className="inline-flex items-center justify-center min-w-[20px] h-[18px] px-1 rounded text-[9px] font-display tabular-nums border border-gold-deep/50 text-gold-deep">3</span>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  body: string
  className?: string
  preview?: React.ReactNode
}

function FeatureCard({ icon, title, body, className = "", preview }: FeatureCardProps) {
  return (
    <Card className={`bg-white/70 border-sumi/10 ${className}`}>
      <CardContent className="p-5 sm:p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 text-vermilion-deep mb-3">
          {icon}
          <h3 className="font-display text-base sm:text-lg font-semibold text-sumi">
            {title}
          </h3>
        </div>
        <p className="font-display italic text-sumi/70 text-sm leading-relaxed flex-1">
          {body}
        </p>
        {preview && <div className="mt-4 pt-4 border-t border-sumi/10 flex justify-center">{preview}</div>}
      </CardContent>
    </Card>
  )
}

function LandingPage() {
  const { t } = useTranslation()
  return (
    <div className="px-4 pb-16">
      {/* ───────── Hero ───────── */}
      <section className="max-w-4xl mx-auto pt-10 sm:pt-16 pb-16 sm:pb-24 text-center">
        <p
          lang="ja"
          aria-hidden="true"
          className="font-jp text-7xl sm:text-9xl text-vermilion font-semibold leading-none mb-6"
        >
          漢字
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-medium text-sumi tracking-tight leading-[1.05] mb-4">
          {t("landing.brand")} <span className="italic text-sumi/70 font-normal">{t("landing.brand.tagline")}</span>
        </h1>
        <p className="font-display italic text-lg sm:text-2xl text-sumi/70 max-w-2xl mx-auto leading-relaxed mb-2">
          {t("landing.hero.tagline")}
        </p>
        <p className="font-display italic text-base text-sumi/70 max-w-xl mx-auto mb-10">
          {t("landing.hero.subtagline")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/quiz"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-sumi text-cream hover:bg-vermilion-deep transition-colors font-display text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
          >
            {t("landing.hero.cta.startQuiz")}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            to="/review"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-vermilion/40 text-vermilion-deep hover:bg-vermilion/5 transition-colors font-display italic text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
          >
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            {t("landing.hero.cta.review")}
          </Link>
        </div>
        <p className="mt-6 font-display italic text-sm text-sumi/70">
          {t("landing.hero.draw.prefix")}{" "}
          <Link
            to="/draw-search"
            className="not-italic underline underline-offset-4 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
          >
            {t("landing.hero.draw.link")}
          </Link>
          .
        </p>
      </section>

      {/* ───────── What it is ───────── */}
      <section className="max-w-3xl mx-auto py-10 sm:py-16 text-center border-t border-sumi/10">
        <p className="font-display text-xl sm:text-2xl text-sumi leading-relaxed">
          {t("landing.intro.body.before")}{" "}
          <span className="text-vermilion-deep">{t("landing.intro.body.middle")}</span> {t("landing.intro.body.after")}{" "}
          <span className="italic text-sumi/70">{t("landing.intro.tail")}</span>
        </p>
      </section>

      {/* ───────── Feature grid ───────── */}
      <section className="max-w-6xl mx-auto py-10 sm:py-16">
        <header className="text-center mb-10 sm:mb-12">
          <p className="font-display italic text-sm text-vermilion-deep uppercase tracking-wider mb-2">
            {t("landing.features.eyebrow")}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight">
            {t("landing.features.heading")}
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <FeatureCard
            icon={<Zap aria-hidden="true" className="h-4 w-4" />}
            title={t("landing.features.quiz.title")}
            body={t("landing.features.quiz.body")}
          />
          <FeatureCard
            icon={<Pencil aria-hidden="true" className="h-4 w-4" />}
            title={t("landing.features.stroke.title")}
            body={t("landing.features.stroke.body")}
            preview={<MiniKanjiCard />}
          />
          <FeatureCard
            icon={<PenLine aria-hidden="true" className="h-4 w-4" />}
            title={t("landing.features.draw.title")}
            body={t("landing.features.draw.body")}
          />
          <FeatureCard
            icon={<Sparkles aria-hidden="true" className="h-4 w-4" />}
            title={t("landing.features.review.title")}
            body={t("landing.features.review.body")}
            preview={<MiniFlashcard />}
          />
          <FeatureCard
            icon={<Flame aria-hidden="true" className="h-4 w-4" />}
            title={t("landing.features.streak.title")}
            body={t("landing.features.streak.body")}
            preview={<MiniStreakPill />}
          />
          <FeatureCard
            icon={<Calendar aria-hidden="true" className="h-4 w-4" />}
            title={t("landing.features.calendar.title")}
            body={t("landing.features.calendar.body")}
            preview={<MiniCalendar />}
          />
        </div>
        <p className="text-center mt-8 font-display italic text-sm text-sumi/70 max-w-2xl mx-auto">
          <Share2 aria-hidden="true" className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
          {t("landing.features.share")}
        </p>
      </section>

      {/* ───────── Privacy moment ───────── */}
      <section className="max-w-4xl mx-auto py-12 sm:py-16">
        <Card className="bg-cream-deep/40 border-sumi/15">
          <CardContent className="p-8 sm:p-12 text-center">
            <ShieldCheck aria-hidden="true" className="h-10 w-10 text-vermilion mx-auto mb-4" />
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-sumi mb-3 tracking-tight">
              {t("landing.privacy.heading")}
            </h2>
            <p className="font-display italic text-sumi/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t("landing.privacy.body")}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ───────── Tech principles row ───────── */}
      <section className="max-w-5xl mx-auto py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <Languages aria-hidden="true" className="h-6 w-6 mx-auto text-vermilion-deep mb-3" />
            <p className="font-display font-medium text-sumi text-sm">{t("landing.principles.a11y.title")}</p>
            <p className="font-display italic text-xs text-sumi/70 mt-1">
              {t("landing.principles.a11y.body")}
            </p>
          </div>
          <div>
            <Target aria-hidden="true" className="h-6 w-6 mx-auto text-vermilion-deep mb-3" />
            <p className="font-display font-medium text-sumi text-sm">{t("landing.principles.fast.title")}</p>
            <p className="font-display italic text-xs text-sumi/70 mt-1">
              {t("landing.principles.fast.body")}
            </p>
          </div>
          <div>
            <BookOpen aria-hidden="true" className="h-6 w-6 mx-auto text-vermilion-deep mb-3" />
            <p className="font-display font-medium text-sumi text-sm">{t("landing.principles.design.title")}</p>
            <p className="font-display italic text-xs text-sumi/70 mt-1">
              {t("landing.principles.design.body")}
            </p>
          </div>
          <div>
            <Sparkles aria-hidden="true" className="h-6 w-6 mx-auto text-vermilion-deep mb-3" />
            <p className="font-display font-medium text-sumi text-sm">{t("landing.principles.free.title")}</p>
            <p className="font-display italic text-xs text-sumi/70 mt-1">
              {t("landing.principles.free.body.before")}{" "}
              <a href="https://insomnius.dev" className="underline underline-offset-2 hover:text-vermilion-deep">Insomnius</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="max-w-3xl mx-auto pt-12 sm:pt-16 pb-8 text-center border-t border-sumi/10">
        <p
          lang="ja"
          aria-hidden="true"
          className="font-jp text-5xl text-vermilion/60 font-semibold leading-none mb-6"
        >
          漢字
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight mb-4">
          {t("landing.cta.heading")}
        </h2>
        <p className="font-display italic text-base sm:text-lg text-sumi/70 max-w-xl mx-auto mb-8">
          {t("landing.cta.body")}
        </p>
        <Link
          to="/quiz"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-sumi text-cream hover:bg-vermilion-deep transition-colors font-display text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
        >
          {t("landing.cta.button")}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}

const PAGE_TITLE = "Kanji by Insomnius — Learn Japanese kanji, free and in your browser"
const PAGE_DESCRIPTION =
  "A focused study companion for JLPT N5–N1 kanji. Spaced-repetition flashcards, quizzes, stroke-order practice, searchable references, daily streak, and activity calendar — all in your browser. No account, no server."

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: "https://kanji.insomnius.dev/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://kanji.insomnius.dev/kv.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      { name: "twitter:image", content: "https://kanji.insomnius.dev/kv.png" },
    ],
    links: [{ rel: "canonical", href: "https://kanji.insomnius.dev/" }],
  }),
})
