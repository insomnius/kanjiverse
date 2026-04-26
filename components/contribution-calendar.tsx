"use client"

import { useMemo } from "react"
import type { DailyTotal } from "@/lib/progress/use-progress"

interface ContributionCalendarProps {
  /** Map keyed by YYYY-MM-DD local date string */
  dailyTotals: Record<string, DailyTotal>
  /** How many days back from today. Default ~52 weeks. */
  daysBack?: number
}

interface Cell {
  date: string
  weekIndex: number
  dayOfWeek: number  // 0 = Sunday
  count: number
  intensity: 0 | 1 | 2 | 3 | 4
  isToday: boolean
}

function localDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function getIntensity(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 5) return 1
  if (count <= 15) return 2
  if (count <= 40) return 3
  return 4
}

const intensityClasses: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-sumi/[0.06]",
  1: "bg-gold/25",
  2: "bg-gold/50",
  3: "bg-gold/75",
  4: "bg-gold-deep",
}

const longDateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})

const monthFormatter = new Intl.DateTimeFormat(undefined, { month: "short" })

export function ContributionCalendar({ dailyTotals, daysBack = 364 }: ContributionCalendarProps) {
  const { cells, weekCount, monthLabels, summary } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayKey = localDateKey(today)

    const start = new Date(today)
    start.setDate(today.getDate() - daysBack)
    // Snap start back to Sunday so each column is a full week
    start.setDate(start.getDate() - start.getDay())

    const cells: Cell[] = []
    const monthLabels: { weekIndex: number; label: string }[] = []
    let lastMonth = -1
    const cursor = new Date(start)
    let weekIndex = 0
    let totalAnswers = 0
    let activeDays = 0
    let bestDay = { date: "", count: 0 }
    let todayCount = 0

    while (cursor <= today) {
      const dow = cursor.getDay()
      if (dow === 0 && cursor.getMonth() !== lastMonth) {
        monthLabels.push({ weekIndex, label: monthFormatter.format(cursor) })
        lastMonth = cursor.getMonth()
      }
      const dateKey = localDateKey(cursor)
      const total = dailyTotals[dateKey]
      const count = total?.questionsAnswered ?? 0
      if (count > 0) {
        activeDays++
        totalAnswers += count
        if (count > bestDay.count) bestDay = { date: dateKey, count }
      }
      if (dateKey === todayKey) todayCount = count
      cells.push({
        date: dateKey,
        weekIndex,
        dayOfWeek: dow,
        count,
        intensity: getIntensity(count),
        isToday: dateKey === todayKey,
      })
      cursor.setDate(cursor.getDate() + 1)
      if (cursor.getDay() === 0) weekIndex++
    }

    const weeks = Math.round(daysBack / 7)
    const summaryParts: string[] = [
      `Activity over the last ${weeks} weeks.`,
      activeDays === 0
        ? "No active days recorded yet."
        : `${activeDays} active day${activeDays === 1 ? "" : "s"}, ${totalAnswers} total answer${totalAnswers === 1 ? "" : "s"}.`,
      todayCount === 0
        ? "No activity today."
        : `${todayCount} answer${todayCount === 1 ? "" : "s"} today.`,
    ]
    if (bestDay.count > 0) {
      const bestLong = longDateFormatter.format(new Date(bestDay.date + "T00:00:00"))
      summaryParts.push(`Best day: ${bestDay.count} answers on ${bestLong}.`)
    }
    const summary = summaryParts.join(" ")

    return { cells, weekCount: weekIndex + 1, monthLabels, summary }
  }, [dailyTotals, daysBack])

  return (
    <div className="overflow-x-auto pb-2">
      <div className="inline-block min-w-full">
        <div className="flex items-start gap-2">
          {/* Day-of-week labels (Mon, Wed, Fri) */}
          <div
            aria-hidden="true"
            className="grid text-[10px] text-sumi/70 pt-4 select-none"
            style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))", rowGap: "2px" }}
          >
            {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
              <span key={i} className="leading-[12px] h-3 flex items-center">
                {label}
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1">
            {/* Month labels above the grid */}
            <div
              aria-hidden="true"
              className="relative h-4 text-[10px] text-sumi/70 select-none mb-1"
            >
              {monthLabels.map(({ weekIndex, label }) => (
                <span
                  key={weekIndex}
                  className="absolute"
                  style={{ left: `calc(${weekIndex} * (12px + 2px))` }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Calendar grid */}
            <div
              role="img"
              aria-label={summary}
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${weekCount}, 12px)`,
                gridTemplateRows: "repeat(7, 12px)",
                gridAutoFlow: "column",
                gap: "2px",
              }}
            >
              {cells.map((cell) => {
                const dateLong = longDateFormatter.format(new Date(cell.date + "T00:00:00"))
                const tooltip =
                  cell.count === 0
                    ? `No activity on ${dateLong}`
                    : `${cell.count} ${cell.count === 1 ? "answer" : "answers"} on ${dateLong}`
                return (
                  <div
                    key={cell.date}
                    title={tooltip}
                    className={`rounded-[2px] ${intensityClasses[cell.intensity]} ${
                      cell.isToday ? "ring-1 ring-vermilion/60 ring-offset-[1px] ring-offset-cream" : ""
                    }`}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-sumi/70 select-none">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <div
              key={level}
              aria-hidden="true"
              className={`w-3 h-3 rounded-[2px] ${intensityClasses[level]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
