// Progress store. Module-level state with subscribe/notify, backed by IndexedDB.
// localStorage mirror for sync first-paint reads of hot values (displayName, streak).
// BroadcastChannel for cross-tab sync.

import * as db from "./db"

export type QuizType = "kanji" | "vocab" | "kana"

export interface Profile {
  id: "me"
  displayName: string | null
  createdAt: number
  /** Daily question target. Optional — undefined falls back to DEFAULT_DAILY_GOAL.
   *  Additive field, no schema migration required (see docs/BACKUP_SCHEMA.md). */
  dailyGoal?: number
}

export const DEFAULT_DAILY_GOAL = 10
export const MIN_DAILY_GOAL = 1
export const MAX_DAILY_GOAL = 200

export function getDailyGoal(profile: Profile | null): number {
  return profile?.dailyGoal && profile.dailyGoal >= MIN_DAILY_GOAL
    ? Math.min(MAX_DAILY_GOAL, profile.dailyGoal)
    : DEFAULT_DAILY_GOAL
}

export interface Session {
  id: string
  type: QuizType
  level: string | null
  startedAt: number
  endedAt: number
  totalQuestions: number
  correctAnswers: number
}

export interface Answer {
  id: string
  sessionId: string
  itemKey: string  // e.g. "kanji:漢"
  isCorrect: boolean
  answeredAt: number
}

export interface DailyTotal {
  date: string  // YYYY-MM-DD in user's local timezone
  questionsAnswered: number
  correct: number
  durationMs: number
}

interface State {
  profile: Profile | null
  todayTotal: DailyTotal | null
  streak: number
  /** Last 365 days of dailyTotals, keyed by date string. Used for streak + future calendar. */
  recentDailyTotals: Record<string, DailyTotal>
  hydrated: boolean
}

// ---- localStorage mirror keys (sync reads on first paint) ----
const LS_NAME = "kbi-display-name"
const LS_STREAK = "kbi-streak"
const LS_STREAK_LAST_DATE = "kbi-streak-last-date"

function safeLocalStorageGet(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}
function safeLocalStorageSet(key: string, value: string | null): void {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch { /* private mode etc. */ }
}

// ---- Date helpers (local timezone for streak day boundaries) ----
function localDateKey(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function addDays(date: Date, n: number): Date {
  const next = new Date(date)
  next.setDate(date.getDate() + n)
  return next
}

function computeStreak(dailyTotals: Record<string, DailyTotal>): number {
  const today = new Date()
  let cursor = today
  let streak = 0

  // If today has activity, count it. Walk backward.
  // If today has no activity yet, allow yesterday to start the streak (user hasn't studied today yet).
  if (!dailyTotals[localDateKey(today)] || dailyTotals[localDateKey(today)].questionsAnswered === 0) {
    cursor = addDays(today, -1)
  }

  while (true) {
    const total = dailyTotals[localDateKey(cursor)]
    if (total && total.questionsAnswered > 0) {
      streak++
      cursor = addDays(cursor, -1)
      if (streak > 3650) break // safety
    } else {
      break
    }
  }
  return streak
}

// ---- State ----
let state: State = {
  profile: (() => {
    const cached = safeLocalStorageGet(LS_NAME)
    return cached ? { id: "me", displayName: cached, createdAt: 0 } : null
  })(),
  todayTotal: null,
  streak: (() => {
    const lastDate = safeLocalStorageGet(LS_STREAK_LAST_DATE)
    const cached = safeLocalStorageGet(LS_STREAK)
    if (!cached || !lastDate) return 0
    // Cached streak is only valid if last activity was today or yesterday.
    const today = localDateKey()
    const yesterday = localDateKey(addDays(new Date(), -1))
    if (lastDate === today || lastDate === yesterday) return parseInt(cached, 10) || 0
    return 0
  })(),
  recentDailyTotals: {},
  hydrated: false,
}

const listeners = new Set<() => void>()

function notify(): void {
  for (const fn of listeners) fn()
}

// ---- Cross-tab sync ----
const channel = (typeof window !== "undefined" && "BroadcastChannel" in window)
  ? new BroadcastChannel("kbi-progress")
  : null

channel?.addEventListener("message", (event) => {
  if (event.data?.type === "state-changed") {
    void hydrate()
  }
})

function broadcast(): void {
  channel?.postMessage({ type: "state-changed" })
}

// ---- Session management (auto-start on first answer) ----
const SESSION_IDLE_TIMEOUT_MS = 5 * 60 * 1000  // 5 min idle = new session
const DURATION_GAP_CAP_MS = 60 * 1000          // 60s max counted per gap (prevents bloat from long pauses)

let activeSession: Session | null = null
let lastActivityAt = 0

// ---- Hydration from IndexedDB ----
async function hydrate(): Promise<void> {
  try {
    const [profile, dailyAll] = await Promise.all([
      db.get<Profile>("profile", "me"),
      db.getAll<DailyTotal>("dailyTotals"),
    ])

    const cutoff = localDateKey(addDays(new Date(), -365))
    const recentDailyTotals: Record<string, DailyTotal> = {}
    for (const total of dailyAll) {
      if (total.date >= cutoff) recentDailyTotals[total.date] = total
    }

    const todayKey = localDateKey()
    const todayTotal = recentDailyTotals[todayKey] ?? null
    const streak = computeStreak(recentDailyTotals)

    state = {
      profile: profile ?? null,
      todayTotal,
      streak,
      recentDailyTotals,
      hydrated: true,
    }

    // Refresh localStorage mirror
    safeLocalStorageSet(LS_NAME, profile?.displayName ?? null)
    safeLocalStorageSet(LS_STREAK, String(streak))
    if (todayTotal && todayTotal.questionsAnswered > 0) {
      safeLocalStorageSet(LS_STREAK_LAST_DATE, todayKey)
    }

    notify()
  } catch (err) {
    // IndexedDB unavailable (private browsing, etc.) — keep cached values, mark hydrated so UI proceeds
    state = { ...state, hydrated: true }
    notify()
    console.warn("Progress hydration failed:", err)
  }
}

if (typeof window !== "undefined") {
  void hydrate()
}

// ---- Public API ----

export function getState(): State {
  return state
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

export async function setDisplayName(name: string): Promise<void> {
  const trimmed = name.trim().slice(0, 32)
  const newProfile: Profile = {
    ...(state.profile ?? { id: "me", createdAt: Date.now() }),
    id: "me",
    displayName: trimmed.length > 0 ? trimmed : null,
  }
  await db.put("profile", newProfile)
  state = { ...state, profile: newProfile }
  safeLocalStorageSet(LS_NAME, newProfile.displayName)
  notify()
  broadcast()
}

export async function setDailyGoal(goal: number): Promise<void> {
  const clamped = Math.max(MIN_DAILY_GOAL, Math.min(MAX_DAILY_GOAL, Math.round(goal)))
  const newProfile: Profile = {
    ...(state.profile ?? { id: "me", displayName: null, createdAt: Date.now() }),
    id: "me",
    dailyGoal: clamped,
  }
  await db.put("profile", newProfile)
  state = { ...state, profile: newProfile }
  notify()
  broadcast()
}

export async function recordAnswer(
  type: QuizType,
  itemKey: string,
  isCorrect: boolean,
  level?: string | null,
): Promise<void> {
  const now = Date.now()

  // Auto-start session on first answer or after idle timeout
  if (!activeSession || now - lastActivityAt > SESSION_IDLE_TIMEOUT_MS) {
    activeSession = {
      id: crypto.randomUUID(),
      type,
      level: level ?? null,
      startedAt: now,
      endedAt: now,
      totalQuestions: 0,
      correctAnswers: 0,
    }
  }

  activeSession.totalQuestions += 1
  if (isCorrect) activeSession.correctAnswers += 1
  activeSession.endedAt = now
  void db.put("sessions", activeSession)

  const answer: Answer = {
    id: crypto.randomUUID(),
    sessionId: activeSession.id,
    itemKey: `${type}:${itemKey}`,
    isCorrect,
    answeredAt: now,
  }
  void db.put("answers", answer)

  // Write-through aggregate for fast calendar reads later
  const todayKey = localDateKey()
  const existing = state.recentDailyTotals[todayKey]
  const todayTotal: DailyTotal = existing
    ? { ...existing }
    : { date: todayKey, questionsAnswered: 0, correct: 0, durationMs: 0 }
  todayTotal.questionsAnswered += 1
  if (isCorrect) todayTotal.correct += 1
  if (lastActivityAt > 0) {
    todayTotal.durationMs += Math.min(now - lastActivityAt, DURATION_GAP_CAP_MS)
  }
  void db.put("dailyTotals", todayTotal)

  lastActivityAt = now

  const newDailyTotals = { ...state.recentDailyTotals, [todayKey]: todayTotal }
  const newStreak = computeStreak(newDailyTotals)

  state = {
    ...state,
    recentDailyTotals: newDailyTotals,
    todayTotal,
    streak: newStreak,
  }

  safeLocalStorageSet(LS_STREAK, String(newStreak))
  safeLocalStorageSet(LS_STREAK_LAST_DATE, todayKey)

  notify()
  broadcast()
}

export async function reset(): Promise<void> {
  await db.clearAll(["profile", "sessions", "answers", "dailyTotals"])
  safeLocalStorageSet(LS_NAME, null)
  safeLocalStorageSet(LS_STREAK, null)
  safeLocalStorageSet(LS_STREAK_LAST_DATE, null)
  activeSession = null
  lastActivityAt = 0
  state = {
    profile: null,
    todayTotal: null,
    streak: 0,
    recentDailyTotals: {},
    hydrated: true,
  }
  notify()
  broadcast()
}

// ---- Backup / Import ----
// Format: gzipped JSON via native CompressionStream. Falls back to plain JSON
// when CompressionStream is unavailable. Import auto-detects via gzip magic bytes
// (0x1f 0x8b) so old plain-JSON backups still restore cleanly.
//
// FULL SCHEMA SPECIFICATION + MIGRATION POLICY: see docs/BACKUP_SCHEMA.md
// Treat that file as the contract for backwards compatibility.

const CURRENT_SCHEMA_VERSION = 1
const EXPORT_APP_TAG = "kanji-by-insomnius"
const SUPPORTS_COMPRESSION = typeof CompressionStream !== "undefined"

// Migration map: from-version -> upgrade function.
// Each migration is a pure function that takes payload at version N and returns
// payload at version N+1. Importing a vK file into a vN app chains migrations[K], migrations[K+1], …
// Empty for now (only v1 exists). When schema changes, add entries here and document
// in docs/BACKUP_SCHEMA.md. Never remove entries — old user backups must keep importing.
const migrations: Record<number, (payload: AnyBackup) => AnyBackup> = {
  // 1: (v1) => ({ ...v1, version: 2, /* new fields with defaults */ }),
}

// Discriminated-by-version payload shape — narrowed by `version` field.
// Versioned interfaces are conservative aliases; the structural fields
// match the BackupV1 shape in docs/BACKUP_SCHEMA.md.
interface BackupV1 {
  version: 1
  app: typeof EXPORT_APP_TAG
  exportedAt: string
  profile: Profile | null
  sessions: Session[]
  answers: Answer[]
  dailyTotals: DailyTotal[]
}

type AnyBackup = BackupV1 // | BackupV2 | ... — extend as schema evolves

function migrateToCurrent(payload: AnyBackup): AnyBackup {
  let current = payload
  while (current.version < CURRENT_SCHEMA_VERSION) {
    const migrate = migrations[current.version]
    if (!migrate) {
      throw new Error(`No migration available from version ${current.version} to ${CURRENT_SCHEMA_VERSION}`)
    }
    current = migrate(current)
  }
  return current
}

export type ProgressCallback = (phase: string, done: number, total: number) => void

// Legacy alias — use BackupV1 directly going forward.
type ExportPayload = BackupV1

export interface BackupBlob {
  blob: Blob
  filename: string
  /** Bytes; for showing "compressed 12.3 KB → 1.4 KB (89% smaller)" */
  uncompressedSize: number
}

async function gzipString(text: string): Promise<Blob> {
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream("gzip"))
  return new Response(stream).blob()
}

async function gunzipBlob(blob: Blob): Promise<string> {
  const stream = blob.stream().pipeThrough(new DecompressionStream("gzip"))
  return new Response(stream).text()
}

export async function exportData(onProgress?: ProgressCallback): Promise<BackupBlob> {
  onProgress?.("Reading from storage", 0, 1)
  const [profile, sessions, answers, dailyTotals] = await Promise.all([
    db.get<Profile>("profile", "me"),
    db.getAll<Session>("sessions"),
    db.getAll<Answer>("answers"),
    db.getAll<DailyTotal>("dailyTotals"),
  ])

  onProgress?.("Serializing", 0.4, 1)
  const payload: ExportPayload = {
    version: CURRENT_SCHEMA_VERSION,
    app: EXPORT_APP_TAG,
    exportedAt: new Date().toISOString(),
    profile: profile ?? null,
    sessions,
    answers,
    dailyTotals,
  }
  // Minified — no pretty-print whitespace. Gzip will eat the difference anyway,
  // but smaller raw means smaller heap during pack.
  const json = JSON.stringify(payload)
  const uncompressedSize = new Blob([json]).size

  const dateStr = new Date().toISOString().slice(0, 10)

  if (SUPPORTS_COMPRESSION) {
    onProgress?.("Compressing", 0.7, 1)
    const blob = await gzipString(json)
    onProgress?.("Done", 1, 1)
    return {
      blob: new Blob([blob], { type: "application/gzip" }),
      filename: `kanji-by-insomnius-backup-${dateStr}.kbi.gz`,
      uncompressedSize,
    }
  }

  onProgress?.("Done", 1, 1)
  return {
    blob: new Blob([json], { type: "application/json" }),
    filename: `kanji-by-insomnius-backup-${dateStr}.kbi.json`,
    uncompressedSize,
  }
}

export type ImportResult = { ok: true } | { ok: false; reason: string }

export async function importData(file: File, onProgress?: ProgressCallback): Promise<ImportResult> {
  onProgress?.("Reading file", 0, 1)

  // Magic-byte detection: 0x1f 0x8b = gzip
  const magic = new Uint8Array(await file.slice(0, 2).arrayBuffer())
  const isGzipped = magic[0] === 0x1f && magic[1] === 0x8b

  let json: string
  try {
    if (isGzipped) {
      onProgress?.("Decompressing", 0.1, 1)
      json = await gunzipBlob(file)
    } else {
      json = await file.text()
    }
  } catch {
    return { ok: false, reason: "Couldn't read or decompress the file." }
  }

  onProgress?.("Parsing", 0.25, 1)
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return { ok: false, reason: "File is not valid JSON." }
  }
  if (!parsed || typeof parsed !== "object") {
    return { ok: false, reason: "File contents aren't in the expected shape." }
  }

  const partial = parsed as Partial<AnyBackup>
  if (partial.app !== EXPORT_APP_TAG) {
    return { ok: false, reason: "This backup file isn't from Kanji by Insomnius." }
  }
  if (typeof partial.version !== "number") {
    return { ok: false, reason: "Backup is missing the schema version." }
  }
  if (partial.version > CURRENT_SCHEMA_VERSION) {
    return {
      ok: false,
      reason: `Backup is from a newer app version (schema v${partial.version}). Please update the app to import.`,
    }
  }

  // Migrate older versions up to current. See docs/BACKUP_SCHEMA.md.
  let p: AnyBackup
  try {
    p = migrateToCurrent(parsed as AnyBackup)
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "Migration failed." }
  }

  if (!Array.isArray(p.sessions) || !Array.isArray(p.answers) || !Array.isArray(p.dailyTotals)) {
    return { ok: false, reason: "Backup is missing required tables." }
  }

  // ---- Restore with chunked writes + progress ----
  onProgress?.("Wiping existing data", 0.3, 1)
  await db.clearAll(["profile", "sessions", "answers", "dailyTotals"])

  const profileCount = p.profile ? 1 : 0
  const totalItems = profileCount + p.sessions.length + p.answers.length + p.dailyTotals.length
  let written = 0

  const reportRestore = () => {
    // Map [0..totalItems] -> [0.35..1.0]
    const ratio = totalItems === 0 ? 1 : written / totalItems
    onProgress?.("Restoring", 0.35 + ratio * 0.65, 1)
  }

  if (p.profile) {
    await db.put("profile", p.profile)
    written += 1
    reportRestore()
  }

  await db.putMany("sessions", p.sessions, {
    onChunkComplete: (n) => { written = profileCount + n; reportRestore() },
  })
  await db.putMany("answers", p.answers, {
    onChunkComplete: (n) => { written = profileCount + p.sessions!.length + n; reportRestore() },
  })
  await db.putMany("dailyTotals", p.dailyTotals, {
    onChunkComplete: (n) => {
      written = profileCount + p.sessions!.length + p.answers!.length + n
      reportRestore()
    },
  })

  // Reset in-memory session, re-hydrate from IDB, sync other tabs
  activeSession = null
  lastActivityAt = 0
  await hydrate()
  broadcast()
  onProgress?.("Done", 1, 1)
  return { ok: true }
}

export async function getRecentSessions(limit = 20): Promise<Session[]> {
  const all = await db.getAll<Session>("sessions")
  return all.sort((a, b) => b.startedAt - a.startedAt).slice(0, limit)
}

// ---- Aggregations for the profile page ----

export function getTotals(): { questionsAnswered: number; correct: number; durationMs: number; activeDays: number } {
  let questionsAnswered = 0
  let correct = 0
  let durationMs = 0
  let activeDays = 0
  for (const t of Object.values(state.recentDailyTotals)) {
    questionsAnswered += t.questionsAnswered
    correct += t.correct
    durationMs += t.durationMs
    if (t.questionsAnswered > 0) activeDays += 1
  }
  return { questionsAnswered, correct, durationMs, activeDays }
}
