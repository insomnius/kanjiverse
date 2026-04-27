import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Check, Download, Upload, ArrowRight, Flame, CalendarCheck, Target, Clock, Zap, Share2, Volume2, VolumeX, Mic, MicOff } from "lucide-react"
import { playCorrect } from "@/lib/sounds"
import { hasJapaneseVoice, isTtsSupported, speakJapanese, subscribeVoices } from "@/lib/tts"
import { ContributionCalendar } from "@/components/contribution-calendar"
import { ShareButtons } from "@/components/share-buttons"
import {
  useProgress, setDisplayName, setDailyGoal, setSoundEnabled, isSoundEnabled,
  setTtsEnabled, isTtsEnabled,
  reset, getTotals, getDailyGoal,
  exportData, importData,
  DEFAULT_DAILY_GOAL, MIN_DAILY_GOAL, MAX_DAILY_GOAL,
} from "@/lib/progress/use-progress"

// ---- Helpers ----

function formatDuration(ms: number): { primary: string; helper: string } {
  const minutes = Math.round(ms / 60_000)
  if (minutes < 1) return { primary: "< 1 min", helper: "Just getting started." }
  if (minutes < 60) return { primary: `${minutes} min`, helper: minutes === 1 ? "1 minute studied so far." : `${minutes} minutes studied total.` }
  const hours = Math.floor(minutes / 60)
  const remMin = minutes % 60
  return {
    primary: `${hours}h ${remMin}m`,
    helper: hours === 1 ? `1 hour ${remMin} min studied total.` : `${hours} hours ${remMin} min studied total.`,
  }
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(2)} MB`
}

// ---- Visual primitives ----

function ProgressBar({
  value,
  max,
  tone,
  label,
}: {
  value: number
  max: number
  tone: "vermilion" | "gold"
  /** Required accessible name. axe-core flags progressbar without aria-label as serious. */
  label: string
}) {
  const pct = max === 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100))
  const fillColor = tone === "vermilion" ? "bg-vermilion" : "bg-gold-deep"
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-1.5 w-full bg-cream-deep rounded-full overflow-hidden"
    >
      <div
        className={`h-full ${fillColor} rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  helper: string
  bar?: { value: number; max: number; tone: "vermilion" | "gold" }
}

function MetricCard({ icon, label, value, helper, bar }: MetricCardProps) {
  return (
    <div className="bg-cream-deep/40 border border-sumi/10 rounded-lg p-4 space-y-2.5">
      <div className="flex items-center gap-2 text-sumi/70">
        {icon}
        <p className="font-display italic text-xs uppercase tracking-wider">{label}</p>
      </div>
      <p className="font-display text-3xl font-medium text-sumi tabular-nums leading-none">
        {value}
      </p>
      {bar && <ProgressBar value={bar.value} max={bar.max} tone={bar.tone} label={`${label} progress`} />}
      <p className="font-display italic text-xs text-sumi/70 leading-snug">{helper}</p>
    </div>
  )
}

// ---- Page ----

function ProfilePage() {
  const { profile, streak, todayTotal, recentDailyTotals } = useProgress()
  const currentGoal = getDailyGoal(profile ?? null)
  const [nameInput, setNameInput] = useState(profile?.displayName ?? "")
  const [goalInput, setGoalInput] = useState(currentGoal)
  const [savedJustNow, setSavedJustNow] = useState(false)
  const [goalSavedJustNow, setGoalSavedJustNow] = useState(false)
  const [resetArmed, setResetArmed] = useState(false)
  const [importStatus, setImportStatus] = useState<{ kind: "ok" | "error"; message: string } | null>(null)
  const [pendingImportFile, setPendingImportFile] = useState<File | null>(null)
  const [progress, setProgress] = useState<{ kind: "backup" | "import"; phase: string; pct: number } | null>(null)
  const [lastBackupSize, setLastBackupSize] = useState<{ uncompressed: number; compressed: number } | null>(null)
  const [voiceAvailable, setVoiceAvailable] = useState(() => hasJapaneseVoice())
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isTtsSupported()) return
    return subscribeVoices(() => setVoiceAvailable(hasJapaneseVoice()))
  }, [])

  const handleBackup = async () => {
    setImportStatus(null)
    setProgress({ kind: "backup", phase: "Starting", pct: 0 })
    try {
      const result = await exportData((phase, done, total) => {
        setProgress({ kind: "backup", phase, pct: total === 0 ? 0 : (done / total) * 100 })
      })
      setLastBackupSize({ uncompressed: result.uncompressedSize, compressed: result.blob.size })

      const url = URL.createObjectURL(result.blob)
      const a = document.createElement("a")
      a.href = url
      a.download = result.filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } finally {
      setProgress(null)
    }
  }

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setPendingImportFile(file)
    setImportStatus(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const confirmImport = async () => {
    if (!pendingImportFile) return
    setProgress({ kind: "import", phase: "Starting", pct: 0 })
    try {
      const result = await importData(pendingImportFile, (phase, done, total) => {
        setProgress({ kind: "import", phase, pct: total === 0 ? 0 : (done / total) * 100 })
      })
      if (result.ok) {
        setImportStatus({ kind: "ok", message: "Imported. Your progress has been restored." })
      } else {
        setImportStatus({ kind: "error", message: result.reason })
      }
    } finally {
      setProgress(null)
      setPendingImportFile(null)
    }
  }

  const cancelImport = () => {
    setPendingImportFile(null)
    setImportStatus(null)
  }

  useEffect(() => {
    setNameInput(profile?.displayName ?? "")
  }, [profile?.displayName])

  useEffect(() => {
    if (!savedJustNow) return
    const t = setTimeout(() => setSavedJustNow(false), 1500)
    return () => clearTimeout(t)
  }, [savedJustNow])

  // Keep goal input in sync with hydrated profile
  useEffect(() => {
    setGoalInput(getDailyGoal(profile ?? null))
  }, [profile?.dailyGoal])

  useEffect(() => {
    if (!goalSavedJustNow) return
    const t = setTimeout(() => setGoalSavedJustNow(false), 1500)
    return () => clearTimeout(t)
  }, [goalSavedJustNow])

  const canSaveGoal =
    goalInput >= MIN_DAILY_GOAL &&
    goalInput <= MAX_DAILY_GOAL &&
    goalInput !== currentGoal

  const handleSaveGoal = async () => {
    if (!canSaveGoal) return
    await setDailyGoal(goalInput)
    setGoalSavedJustNow(true)
  }

  const todayCorrectForGoal = todayTotal?.correct ?? 0
  // Goal counts CORRECT answers — matches the SessionStrip behavior.
  const goalProgressPct = Math.min(100, (todayCorrectForGoal / currentGoal) * 100)
  const goalHit = todayCorrectForGoal >= currentGoal

  const totals = getTotals()
  const accuracy = totals.questionsAnswered > 0
    ? Math.round((totals.correct / totals.questionsAnswered) * 100)
    : 0
  const wrong = totals.questionsAnswered - totals.correct
  const duration = formatDuration(totals.durationMs)
  const avgPerActiveDay = totals.activeDays > 0
    ? Math.round(totals.questionsAnswered / totals.activeDays)
    : 0

  const trimmedInput = nameInput.trim()
  const currentName = profile?.displayName ?? ""
  const canSave = trimmedInput !== currentName && trimmedInput.length > 0

  const handleSave = async () => {
    if (!canSave) return
    await setDisplayName(trimmedInput)
    setSavedJustNow(true)
  }

  const handleReset = async () => {
    if (resetArmed) {
      await reset()
      setNameInput("")
      setResetArmed(false)
    } else {
      setResetArmed(true)
    }
  }

  const hasData = totals.questionsAnswered > 0
  const isOperating = progress !== null

  // Streak prose
  const streakHelper = streak === 0
    ? hasData
      ? "Start a fresh streak today — answer one question."
      : "Take your first quiz to start a streak."
    : streak === 1
      ? "First day! Come back tomorrow to keep it going."
      : `${streak} days in a row — answer one today to extend.`

  return (
    <div className="py-6 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight mb-1">
            Profile
          </h1>
          <p className="font-display italic text-sumi/70 text-base">
            Your name and progress live in your browser. Nothing leaves your device — no account, no server.
          </p>
        </header>

        {/* ---------- Name ---------- */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium">Name</CardTitle>
            <CardDescription className="font-display italic text-sumi/70">
              Pick a name to be greeted by. Skip it if you'd rather not.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="display-name" className="sr-only">Display name</Label>
            <form
              className="flex gap-2"
              onSubmit={(e) => { e.preventDefault(); void handleSave() }}
            >
              <Input
                id="display-name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Your name"
                maxLength={32}
                autoComplete="nickname"
                className="bg-white/70 border-sumi/15"
              />
              <Button type="submit" disabled={!canSave} className="min-w-[5rem]">
                {savedJustNow ? (<><Check aria-hidden="true" className="mr-1 h-4 w-4" /> Saved</>) : "Save"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* ---------- Daily goal ---------- */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium flex items-center gap-2">
              <Target aria-hidden="true" className="h-4 w-4 text-gold-deep" />
              Daily goal
            </CardTitle>
            <CardDescription className="font-display italic text-sumi/70">
              How many questions you want to answer each day. The session strip on quiz pages tracks your progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="daily-goal" className="sr-only">Daily goal</Label>
            <form
              className="flex gap-2 items-center"
              onSubmit={(e) => { e.preventDefault(); void handleSaveGoal() }}
            >
              <Input
                id="daily-goal"
                type="number"
                min={MIN_DAILY_GOAL}
                max={MAX_DAILY_GOAL}
                value={goalInput}
                onChange={(e) => setGoalInput(parseInt(e.target.value, 10) || MIN_DAILY_GOAL)}
                inputMode="numeric"
                className="bg-white/70 border-sumi/15 max-w-[7rem] text-center tabular-nums font-display text-lg"
              />
              <span className="font-display italic text-sumi/70 text-sm">
                question{goalInput === 1 ? "" : "s"} per day
              </span>
              <div className="flex-1" />
              <Button type="submit" disabled={!canSaveGoal} className="min-w-[5rem]">
                {goalSavedJustNow ? (<><Check aria-hidden="true" className="mr-1 h-4 w-4" /> Saved</>) : "Save"}
              </Button>
            </form>

            {/* Today's progress toward goal — counts correct answers only */}
            <div className="rounded-md border border-sumi/10 bg-cream-deep/40 p-3">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-display italic text-sm text-sumi/70">
                  {goalHit ? "Today's goal reached" : "Correct today"}
                </span>
                <span className="font-display tabular-nums text-sm text-sumi">
                  <span className="font-semibold">{todayCorrectForGoal}</span>
                  <span className="text-sumi/70"> / {currentGoal}</span>
                </span>
              </div>
              <div className="h-1.5 w-full bg-cream-deep rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none ${
                    goalHit ? "bg-gold-deep" : "bg-gold"
                  }`}
                  style={{ width: `${goalProgressPct}%` }}
                />
              </div>
              <p className="font-display italic text-xs text-sumi/70 mt-2">
                Only correct answers count toward the goal.
                {currentGoal !== DEFAULT_DAILY_GOAL && ` Default is ${DEFAULT_DAILY_GOAL}.`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ---------- Sound effects ---------- */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium flex items-center gap-2">
              {isSoundEnabled(profile ?? null) ? (
                <Volume2 aria-hidden="true" className="h-4 w-4 text-vermilion-deep" />
              ) : (
                <VolumeX aria-hidden="true" className="h-4 w-4 text-sumi/55" />
              )}
              Quiz sounds
            </CardTitle>
            <CardDescription className="font-display italic text-sumi/70">
              A soft chime on a correct answer, a low thud on an incorrect one, and a brighter tone for milestone celebrations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant={isSoundEnabled(profile ?? null) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const next = !isSoundEnabled(profile ?? null)
                  void setSoundEnabled(next)
                  if (next) playCorrect()
                }}
                aria-pressed={isSoundEnabled(profile ?? null)}
                className="gap-2"
              >
                {isSoundEnabled(profile ?? null) ? (
                  <>
                    <Volume2 aria-hidden="true" className="h-4 w-4" />
                    Sounds on
                  </>
                ) : (
                  <>
                    <VolumeX aria-hidden="true" className="h-4 w-4" />
                    Sounds off
                  </>
                )}
              </Button>
              {isSoundEnabled(profile ?? null) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => playCorrect()}
                  className="text-sumi/70"
                >
                  Preview the correct chime
                </Button>
              )}
            </div>
            <p className="font-display italic text-xs text-sumi/70 mt-3">
              Sounds also respect your system's reduced-motion preference — we won't play anything if you've asked the OS to keep things still.
            </p>
          </CardContent>
        </Card>

        {/* ---------- Japanese pronunciation (TTS) ---------- */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium flex items-center gap-2">
              {isTtsEnabled(profile ?? null) && voiceAvailable ? (
                <Mic aria-hidden="true" className="h-4 w-4 text-vermilion-deep" />
              ) : (
                <MicOff aria-hidden="true" className="h-4 w-4 text-sumi/55" />
              )}
              Japanese pronunciation
            </CardTitle>
            <CardDescription className="font-display italic text-sumi/70">
              Tap the speaker icon next to a kanji, vocab word, or kana to hear it spoken using your device's Japanese voice. Nothing is sent to a server.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isTtsSupported() ? (
              <p className="font-display italic text-xs text-sumi/70">
                Your browser doesn't expose the Web Speech API. Pronunciation buttons won't appear in detail panels.
              </p>
            ) : !voiceAvailable ? (
              <p className="font-display italic text-xs text-sumi/70">
                No Japanese voice is installed on this device, so pronunciation buttons stay hidden. On Linux, install <code className="font-mono not-italic text-sumi">espeak-ng</code> with a Japanese voice; on Android, add a Japanese voice in <span className="not-italic">Settings → Accessibility → Text-to-speech</span>.
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant={isTtsEnabled(profile ?? null) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    const next = !isTtsEnabled(profile ?? null)
                    void setTtsEnabled(next)
                    if (next) speakJapanese("こんにちは")
                  }}
                  aria-pressed={isTtsEnabled(profile ?? null)}
                  className="gap-2"
                >
                  {isTtsEnabled(profile ?? null) ? (
                    <>
                      <Mic aria-hidden="true" className="h-4 w-4" />
                      Pronunciation on
                    </>
                  ) : (
                    <>
                      <MicOff aria-hidden="true" className="h-4 w-4" />
                      Pronunciation off
                    </>
                  )}
                </Button>
                {isTtsEnabled(profile ?? null) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => speakJapanese("こんにちは")}
                    className="text-sumi/70"
                  >
                    Preview <span lang="ja" className="ml-1">こんにちは</span>
                  </Button>
                )}
              </div>
            )}
            <p className="font-display italic text-xs text-sumi/70 mt-3">
              Pronunciation also respects your system's reduced-motion preference.
            </p>
          </CardContent>
        </Card>

        {/* ---------- Activity (calendar) ---------- */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium">Activity</CardTitle>
            <CardDescription className="font-display italic text-sumi/70">
              Every day you've answered a question, painted a little gold. Hover, focus, or tap any cell for that day's count.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContributionCalendar dailyTotals={recentDailyTotals} />
            <div className="mt-4 pt-4 border-t border-sumi/10">
              <Link
                to="/history"
                className="inline-flex items-center gap-2 text-sm font-display italic text-sumi/70 hover:text-vermilion-deep transition-colors"
              >
                See session-by-session detail
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* ---------- Progress (redesigned) ---------- */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium">Progress</CardTitle>
            <CardDescription className="font-display italic text-sumi/70">
              Your kanji journey at a glance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hero: streak */}
            <div className="rounded-xl bg-gradient-to-br from-gold-soft/40 via-cream-deep/30 to-cream border border-gold/30 p-5 sm:p-6">
              <div className="flex items-baseline gap-3 flex-wrap">
                <Flame
                  aria-hidden="true"
                  className={`h-8 w-8 ${streak > 0 ? "text-vermilion fill-vermilion/30" : "text-sumi/25"}`}
                />
                <p className="font-display text-5xl sm:text-6xl font-medium text-sumi tabular-nums leading-none">
                  {streak}
                </p>
                <p className="font-display italic text-sumi/70 text-lg">
                  day{streak === 1 ? "" : "s"} streak
                </p>
              </div>
              <p className="font-display italic text-sumi/70 text-sm sm:text-base mt-3">
                {streakHelper}
              </p>
            </div>

            {/* Metric grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <MetricCard
                icon={<CalendarCheck aria-hidden="true" className="h-3.5 w-3.5" />}
                label="Active days"
                value={
                  <>
                    {totals.activeDays}
                    <span className="text-base text-sumi/70 font-normal italic ml-1">/ 365</span>
                  </>
                }
                helper={
                  totals.activeDays === 0
                    ? "No active days yet."
                    : `${Math.round((totals.activeDays / 365) * 100)}% of the last year.`
                }
                bar={{ value: totals.activeDays, max: 365, tone: "gold" }}
              />

              <MetricCard
                icon={<Target aria-hidden="true" className="h-3.5 w-3.5" />}
                label="Accuracy"
                value={
                  <>
                    {accuracy}
                    <span className="text-base text-sumi/70 font-normal italic ml-1">%</span>
                  </>
                }
                helper={
                  hasData
                    ? `${totals.correct} correct · ${wrong} missed`
                    : "Take a quiz to see accuracy."
                }
                bar={{ value: accuracy, max: 100, tone: "vermilion" }}
              />

              <MetricCard
                icon={<Zap aria-hidden="true" className="h-3.5 w-3.5" />}
                label="Answered"
                value={totals.questionsAnswered}
                helper={
                  hasData
                    ? `${avgPerActiveDay} per active day on average.`
                    : "Answer your first question to begin."
                }
              />

              <MetricCard
                icon={<Clock aria-hidden="true" className="h-3.5 w-3.5" />}
                label="Time studied"
                value={duration.primary}
                helper={duration.helper}
              />
            </div>
          </CardContent>
        </Card>

        {/* ---------- Share ---------- */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium flex items-center gap-2">
              <Share2 aria-hidden="true" className="h-4 w-4 text-vermilion" />
              Share your progress
            </CardTitle>
            <CardDescription className="font-display italic text-sumi/70">
              Open a pre-filled post on your favorite platform. Your stats live in the post text; the link goes to a public progress card anyone can view.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShareButtons
              streak={streak}
              activeDays={totals.activeDays}
              answered={totals.questionsAnswered}
              accuracy={accuracy}
              minutes={Math.round(totals.durationMs / 60_000)}
              displayName={profile?.displayName ?? null}
              hasData={hasData}
            />
          </CardContent>
        </Card>

        {/* ---------- Backup & import ---------- */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium">Backup &amp; import</CardTitle>
            <CardDescription className="font-display italic text-sumi/70">
              Move your progress between devices. Backups are gzip-compressed for size.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleBackup} disabled={isOperating} className="gap-2">
                <Download aria-hidden="true" className="h-4 w-4" />
                Download backup
              </Button>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isOperating}
                className="gap-2"
              >
                <Upload aria-hidden="true" className="h-4 w-4" />
                Import backup…
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".kbi,.gz,.json,application/gzip,application/json"
                onChange={handleImportFile}
                className="sr-only"
                aria-label="Choose backup file"
              />
            </div>

            {progress && (
              <div className="rounded-md border border-sumi/15 bg-cream-deep/30 p-3 space-y-2">
                <div className="flex justify-between items-baseline text-sm font-display italic text-sumi/70">
                  <span aria-live="polite">
                    {progress.kind === "backup" ? "Backing up" : "Importing"} — {progress.phase}…
                  </span>
                  <span className="tabular-nums text-sumi">{Math.round(progress.pct)}%</span>
                </div>
                <ProgressBar
                  value={progress.pct}
                  max={100}
                  tone="vermilion"
                  label={`${progress.kind === "backup" ? "Backup" : "Import"} progress, ${progress.phase}`}
                />
              </div>
            )}

            {lastBackupSize && !progress && (
              <p className="font-display italic text-xs text-sumi/70">
                Last backup: {formatBytes(lastBackupSize.compressed)} compressed
                {lastBackupSize.uncompressed > lastBackupSize.compressed && (
                  <>
                    {" "}— {Math.round((1 - lastBackupSize.compressed / lastBackupSize.uncompressed) * 100)}% smaller than raw JSON ({formatBytes(lastBackupSize.uncompressed)}).
                  </>
                )}
              </p>
            )}

            {pendingImportFile && !progress && (
              <div role="alert" className="rounded-md border border-amber-300 bg-amber-50/60 p-3 text-sm">
                <p className="font-display italic text-amber-900 mb-2">
                  Importing <span className="not-italic font-mono text-xs bg-amber-100 px-1 py-0.5 rounded">{pendingImportFile.name}</span> will <strong className="not-italic font-semibold">replace</strong> all current progress (including your name). This can't be undone.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={confirmImport} className="bg-amber-700 hover:bg-amber-800 text-white">
                    Confirm replace
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelImport}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {importStatus && !progress && (
              <p
                role="status"
                aria-live="polite"
                className={`text-sm font-display italic ${importStatus.kind === "ok" ? "text-green-700" : "text-red-700"}`}
              >
                {importStatus.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* ---------- Reset ---------- */}
        <Card className="border-red-300/40 bg-red-50/30">
          <CardHeader>
            <CardTitle className="font-display text-xl text-red-800 font-medium">Reset progress</CardTitle>
            <CardDescription className="font-display italic text-red-800/70">
              Deletes your name and all stored progress. This can't be undone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isOperating}
              className="border-red-300 text-red-800 hover:bg-red-100/50 hover:text-red-900"
              aria-live="polite"
            >
              <Trash2 aria-hidden="true" className="mr-2 h-4 w-4" />
              {resetArmed ? "Click again to confirm — this deletes everything" : "Reset all progress"}
            </Button>
            {resetArmed && (
              <button
                type="button"
                onClick={() => setResetArmed(false)}
                className="ml-3 text-sm font-display italic text-sumi/70 hover:text-sumi underline underline-offset-2"
              >
                Cancel
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const PAGE_TITLE = "Profile · Kanji by Insomnius"
const PAGE_DESCRIPTION = "Your name and learning progress, stored locally in your browser."

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { name: "robots", content: "noindex,follow" },
    ],
    links: [{ rel: "canonical", href: "https://kanji.insomnius.dev/profile" }],
  }),
})
