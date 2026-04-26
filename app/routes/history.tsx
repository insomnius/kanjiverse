import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { ContributionCalendar } from "@/components/contribution-calendar"
import { useProgress, getRecentSessions, type Session } from "@/lib/progress/use-progress"

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
})

const relativeFormatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })

function timeAgo(ms: number): string {
  const diffSec = Math.round((ms - Date.now()) / 1000)
  const diffMin = Math.round(diffSec / 60)
  const diffHour = Math.round(diffMin / 60)
  const diffDay = Math.round(diffHour / 24)
  if (Math.abs(diffSec) < 60) return relativeFormatter.format(diffSec, "second")
  if (Math.abs(diffMin) < 60) return relativeFormatter.format(diffMin, "minute")
  if (Math.abs(diffHour) < 24) return relativeFormatter.format(diffHour, "hour")
  return relativeFormatter.format(diffDay, "day")
}

const TYPE_LABELS: Record<Session["type"], string> = {
  kanji: "Kanji",
  vocab: "Vocabulary",
  kana: "Kana",
}

function HistoryPage() {
  const { recentDailyTotals } = useProgress()
  const [sessions, setSessions] = useState<Session[] | null>(null)

  useEffect(() => {
    void getRecentSessions(30).then(setSessions)
  }, [])

  return (
    <div className="py-6 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-sm font-display italic text-sumi/70 hover:text-vermilion-deep mb-6 transition-colors"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to Profile
        </Link>

        <header className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight mb-1">
            Your activity
          </h1>
          <p className="font-display italic text-sumi/70 text-base">
            Every day you've answered a question, painted a little gold.
          </p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium">
              Last 52 weeks
            </CardTitle>
            <CardDescription className="font-display italic text-sumi/70">
              Hover (or long-press) any cell to see that day's count.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContributionCalendar dailyTotals={recentDailyTotals} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium">
              Recent sessions
            </CardTitle>
            <CardDescription className="font-display italic text-sumi/70">
              Each session ends after 5 minutes of inactivity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sessions === null ? (
              <p className="font-display italic text-sm text-sumi/70 text-center py-8">
                Loading…
              </p>
            ) : sessions.length === 0 ? (
              <p className="font-display italic text-sm text-sumi/70 text-center py-8">
                No sessions yet. Take a quiz and your history will appear here.
              </p>
            ) : (
              <ul className="divide-y divide-sumi/10">
                {sessions.map((session) => {
                  const accuracy = session.totalQuestions > 0
                    ? Math.round((session.correctAnswers / session.totalQuestions) * 100)
                    : 0
                  const durationMin = Math.round((session.endedAt - session.startedAt) / 60_000)
                  return (
                    <li key={session.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display text-sumi font-medium text-base">
                            {TYPE_LABELS[session.type]}
                          </span>
                          {session.level && (
                            <Badge>{session.level}</Badge>
                          )}
                          <span className="font-display italic text-xs text-sumi/70">
                            {timeAgo(session.startedAt)}
                          </span>
                        </div>
                        <p className="text-xs text-sumi/70 mt-0.5">
                          {dateTimeFormatter.format(new Date(session.startedAt))}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-display text-lg text-sumi font-medium tabular-nums">
                          {session.correctAnswers}<span className="text-sumi/70">/{session.totalQuestions}</span>
                          <span className="text-sm text-sumi/70 font-normal italic ml-1">{accuracy}%</span>
                        </p>
                        <p className="text-[10px] text-sumi/70">
                          {durationMin < 1 ? "< 1 min" : `${durationMin} min`}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const PAGE_TITLE = "Activity · Kanji by Insomnius"
const PAGE_DESCRIPTION = "Calendar view of your study activity and recent quiz sessions."

export const Route = createFileRoute("/history")({
  component: HistoryPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { name: "robots", content: "noindex,follow" },
    ],
    links: [{ rel: "canonical", href: "https://kanji.insomnius.dev/history" }],
  }),
})
