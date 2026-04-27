import { createFileRoute, Link } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight, BookOpen, Pencil, Calendar, Target, Flame, Zap,
  ShieldCheck, Library, Share2, Languages, Sparkles, PenLine,
} from "lucide-react"

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
  return (
    <div className="border border-sumi/15 bg-white/70 rounded-md p-3 inline-block shadow-[0_2px_10px_-4px_rgba(168,124,47,0.2)]">
      <p lang="ja" className="text-3xl font-bold text-sumi text-center leading-none">
        漢
      </p>
      <p className="text-xs font-medium text-sumi text-center mt-1.5">Chinese character</p>
      <p className="text-[10px] text-sumi/70 text-center">N3 · 14 strokes</p>
    </div>
  )
}

function MiniStreakPill() {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-medium tabular-nums font-display">
      <Flame aria-hidden="true" className="h-3.5 w-3.5 fill-gold/40" />
      <span><span className="font-semibold">12</span><span className="text-gold-deep/80"> days</span></span>
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
          Kanji <span className="italic text-sumi/70 font-normal">by Insomnius</span>
        </h1>
        <p className="font-display italic text-lg sm:text-2xl text-sumi/70 max-w-2xl mx-auto leading-relaxed mb-2">
          Practice Japanese kanji at your own pace.
        </p>
        <p className="font-display italic text-base text-sumi/70 max-w-xl mx-auto mb-10">
          Free. No account. Lives entirely in your browser.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/quiz"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-sumi text-cream hover:bg-vermilion-deep transition-colors font-display text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
          >
            Start a quiz
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            to="/kanji-list"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-sumi/20 text-sumi hover:bg-cream-deep/60 transition-colors font-display italic text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
          >
            Browse the kanji
          </Link>
        </div>
        <p className="mt-6 font-display italic text-sm text-sumi/70">
          Don't know the character?{" "}
          <Link
            to="/draw-search"
            className="not-italic underline underline-offset-4 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
          >
            Find it by drawing
          </Link>
          .
        </p>
      </section>

      {/* ───────── What it is ───────── */}
      <section className="max-w-3xl mx-auto py-10 sm:py-16 text-center border-t border-sumi/10">
        <p className="font-display text-xl sm:text-2xl text-sumi leading-relaxed">
          A focused study companion for the{" "}
          <span className="text-vermilion-deep">2,000+ kanji</span> across JLPT N5–N1.{" "}
          <span className="italic text-sumi/70">Quiz, lookup, and write each character — all in one place.</span>
        </p>
      </section>

      {/* ───────── Feature grid ───────── */}
      <section className="max-w-6xl mx-auto py-10 sm:py-16">
        <header className="text-center mb-10 sm:mb-12">
          <p className="font-display italic text-sm text-vermilion-deep uppercase tracking-wider mb-2">
            What you get
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight">
            One quiet study room, many tools
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <FeatureCard
            icon={<Zap aria-hidden="true" className="h-4 w-4" />}
            title="Three quiz formats"
            body="Kanji by typing meaning, vocabulary by multiple-choice, hiragana/katakana with hotkeys. The picker quietly biases away from items you just nailed."
          />
          <FeatureCard
            icon={<Pencil aria-hidden="true" className="h-4 w-4" />}
            title="Stroke order practice"
            body="Watch each kanji drawn one stroke at a time, then trace it yourself. Hints appear after two misses."
            preview={<MiniKanjiCard />}
          />
          <FeatureCard
            icon={<PenLine aria-hidden="true" className="h-4 w-4" />}
            title="Find by drawing"
            body="Sketch a character you spotted somewhere. We rank the closest matches by stroke shape — handy when you don't know the readings yet."
          />
          <FeatureCard
            icon={<Library aria-hidden="true" className="h-4 w-4" />}
            title="Searchable references"
            body="Browse all 2,000+ kanji, the vocabulary set, and complete hiragana/katakana tables — filterable by JLPT level."
          />
          <FeatureCard
            icon={<Flame aria-hidden="true" className="h-4 w-4" />}
            title="Streak, goal, milestones"
            body="Daily target counts only correct answers. A small chime celebrates 7-, 30-, 100-day streaks; everything else stays out of your way."
            preview={<MiniStreakPill />}
          />
          <FeatureCard
            icon={<Calendar aria-hidden="true" className="h-4 w-4" />}
            title="Calendar + per-character mastery"
            body="GitHub-style heatmap of every day you've practiced, plus a small badge on each character showing your accuracy as you build it up."
            preview={<MiniCalendar />}
          />
        </div>
        <p className="text-center mt-8 font-display italic text-sm text-sumi/70 max-w-2xl mx-auto">
          <Share2 aria-hidden="true" className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
          Backup, import, and share your progress card any time — no account needed.
        </p>
      </section>

      {/* ───────── Privacy moment ───────── */}
      <section className="max-w-4xl mx-auto py-12 sm:py-16">
        <Card className="bg-cream-deep/40 border-sumi/15">
          <CardContent className="p-8 sm:p-12 text-center">
            <ShieldCheck aria-hidden="true" className="h-10 w-10 text-vermilion mx-auto mb-4" />
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-sumi mb-3 tracking-tight">
              Your progress never leaves your browser
            </h2>
            <p className="font-display italic text-sumi/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Every answer, streak, and session is stored locally in IndexedDB. There's no account to create,
              no server holding your data, and nothing to opt out of. Move between devices with a downloadable backup file.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ───────── Tech principles row ───────── */}
      <section className="max-w-5xl mx-auto py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <Languages aria-hidden="true" className="h-6 w-6 mx-auto text-vermilion-deep mb-3" />
            <p className="font-display font-medium text-sumi text-sm">Accessibility-first</p>
            <p className="font-display italic text-xs text-sumi/70 mt-1">
              WCAG 2.1 AA — proper Japanese language tags, keyboard nav, screen-reader announcements
            </p>
          </div>
          <div>
            <Target aria-hidden="true" className="h-6 w-6 mx-auto text-vermilion-deep mb-3" />
            <p className="font-display font-medium text-sumi text-sm">Fast by default</p>
            <p className="font-display italic text-xs text-sumi/70 mt-1">
              Native browser APIs — IndexedDB, Web Share, Compression Streams — no heavy libraries
            </p>
          </div>
          <div>
            <BookOpen aria-hidden="true" className="h-6 w-6 mx-auto text-vermilion-deep mb-3" />
            <p className="font-display font-medium text-sumi text-sm">Editorial design</p>
            <p className="font-display italic text-xs text-sumi/70 mt-1">
              Newsreader serif and Noto Serif JP — kanji as the visual hero
            </p>
          </div>
          <div>
            <Sparkles aria-hidden="true" className="h-6 w-6 mx-auto text-vermilion-deep mb-3" />
            <p className="font-display font-medium text-sumi text-sm">Free, forever</p>
            <p className="font-display italic text-xs text-sumi/70 mt-1">
              Open source. No tracking, no ads, no upsells. Built by{" "}
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
          Ready when you are
        </h2>
        <p className="font-display italic text-base sm:text-lg text-sumi/70 max-w-xl mx-auto mb-8">
          You can be quizzing in ten seconds. No sign-up, no email, no friction.
        </p>
        <Link
          to="/quiz"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-sumi text-cream hover:bg-vermilion-deep transition-colors font-display text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
        >
          Take your first quiz
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}

const PAGE_TITLE = "Kanji by Insomnius — Learn Japanese kanji, free and in your browser"
const PAGE_DESCRIPTION =
  "A focused study companion for JLPT N5–N1 kanji. Quizzes, stroke-order practice, searchable references, daily streak, and activity calendar — all in your browser. No account, no server."

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
