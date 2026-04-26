# Backup file schema — Kanji by Insomnius

This is the canonical reference for backup file contents. **Treat this file as a contract** — when you change the schema, bump the version, document the change here, and add a migration so old backups still import.

## File format

Backups are **gzipped JSON** (extension `.kbi.gz`) when `CompressionStream` is available, falling back to **plain JSON** (extension `.kbi.json`) otherwise. On import, format is auto-detected by reading the first two bytes:

| First 2 bytes | Format |
|---|---|
| `0x1f 0x8b` | gzip — pipe through `DecompressionStream("gzip")` |
| anything else | plain UTF-8 JSON — read directly |

Filename convention: `kanji-by-insomnius-backup-YYYY-MM-DD.kbi.{gz,json}`

## Required envelope

Every backup, regardless of internal version, has:

```jsonc
{
  "version": <number>,           // Schema version, see below
  "app": "kanji-by-insomnius",   // Required tag — import refuses any other value
  "exportedAt": "<ISO 8601>",    // When the backup was generated
  // ... per-version payload follows
}
```

If `app !== "kanji-by-insomnius"` → reject with "This backup file isn't from Kanji by Insomnius."
If `version > CURRENT_SCHEMA_VERSION` → reject with "Backup is from a newer app version; please update."
If `version < CURRENT_SCHEMA_VERSION` → run migrations to upgrade in-memory before writing.

## Version 1 (current)

```ts
interface BackupV1 {
  version: 1
  app: "kanji-by-insomnius"
  exportedAt: string                  // ISO 8601 UTC

  profile: {
    id: "me"
    displayName: string | null         // null = no name set
    createdAt: number                  // ms since epoch
  } | null

  sessions: Array<{
    id: string                         // crypto.randomUUID()
    type: "kanji" | "vocab" | "kana"
    level: string | null               // e.g. "N5", "N4", or null for kana-quiz
    startedAt: number                  // ms since epoch
    endedAt: number                    // ms since epoch
    totalQuestions: number
    correctAnswers: number
  }>

  answers: Array<{
    id: string                         // crypto.randomUUID()
    sessionId: string                  // foreign key into sessions[].id
    itemKey: string                    // "<type>:<value>", e.g. "kanji:漢", "vocab:学校", "kana:あ"
    isCorrect: boolean
    answeredAt: number                 // ms since epoch
  }>

  dailyTotals: Array<{
    date: string                       // YYYY-MM-DD in user's local timezone (when the answer was recorded)
    questionsAnswered: number
    correct: number
    durationMs: number                 // capped per-gap at 60s; total active study time
  }>
}
```

### Validation rules (v1)

- `sessions`, `answers`, `dailyTotals` MUST be arrays (can be empty).
- `profile` MAY be `null` (no name set).
- `dailyTotals[].date` MUST match `YYYY-MM-DD` and be in the user's *local* timezone (not UTC) — this is intentional so streak day boundaries match the user's lived experience.
- `answers[].itemKey` is `<type>:<value>` where type is one of `kanji`, `vocab`, `kana`. Mismatched keys are tolerated but won't link back to the in-app data.
- Foreign-key consistency between `answers[].sessionId` and `sessions[].id` is *not* enforced — orphans are allowed (importing a partial backup shouldn't fail).

### Storage layout (v1, IndexedDB)

| Object store | Key | Indexes |
|---|---|---|
| `profile` | `id` (always `"me"`, singleton) | — |
| `sessions` | `id` | `startedAt` |
| `answers` | `id` | `sessionId`, `answeredAt` |
| `dailyTotals` | `date` | — |

## Backward compatibility policy

The contract: **any backup file ever exported by any released version of the app must import successfully into the current version.**

When the schema needs to change:

1. **Bump `CURRENT_SCHEMA_VERSION`** in `lib/progress/store.ts`.
2. **Add a new `BackupV<N>` interface** above documenting the new shape.
3. **Add a migration function** mapping `BackupV<N-1>` → `BackupV<N>` to the `migrations` map. Migrations are pure functions; they don't touch IndexedDB.
4. **Document the migration** here under a "Version N" section explaining what changed and why.
5. **Test both directions**: a v1 file imports cleanly into vN, and a vN file is the new export shape.

Migrations chain — importing a v1 file into a vN app runs `v1→v2`, then `v2→v3`, ... until reaching vN.

### What constitutes a breaking change

| Change | Breaking? | Migration required? |
|---|---|---|
| Add a new optional field with sensible default | No | No (default is computed at read time) |
| Add a required field | Yes | Yes — derive a default in migration |
| Remove a field | Depends — if anything reads it, yes | Yes — migration drops the field |
| Rename a field | Yes | Yes — migration renames |
| Change a field's type | Yes | Yes — migration converts |
| Change a date format (e.g., local YYYY-MM-DD → UTC ISO) | Yes | Yes — migration re-derives values |
| Add a new object store | No (importing missing-store is a no-op for that store) | Optional — migration can backfill |

### Forbidden — never ship a backup file that can't be migrated

- Don't ever export with `version > CURRENT_SCHEMA_VERSION` from the current build.
- Don't remove old version entries from the `migrations` map without confirming no users in the wild have older exports — for a learning app with year-long backups, *never* remove migrations; the cost is a few KB of code.

## How a migration would look

Future example — say v2 adds `profile.bestStreak`:

```ts
// In store.ts:
const CURRENT_SCHEMA_VERSION = 2

interface BackupV2 extends Omit<BackupV1, "version" | "profile"> {
  version: 2
  profile: (BackupV1["profile"] & { bestStreak: number }) | null
}

const migrations: Record<number, (payload: any) => any> = {
  1: (v1: BackupV1): BackupV2 => ({
    ...v1,
    version: 2,
    profile: v1.profile ? { ...v1.profile, bestStreak: 0 } : null,
  }),
}
```

When importing a v1 file: `migrations[1](v1)` returns a v2 payload with `bestStreak: 0`. The user loses no data; they just don't have a historical best-streak record (the schema was never tracking it before).
