# CLAUDE.md — Kanji by Insomnius

Vite + React 19 + TanStack Router + Tailwind 3 + TypeScript (strict). Bun is the package manager.

## Quick reference

| Need | Command | Gate? |
|---|---|---|
| Run the app | `bun run dev` | — |
| **Deploy gate** | `bun run build` | ✅ tsc + vite, blocks on type errors |
| Accessibility (axe-core × 12 routes) | `bun run a11y` | ✅ before merging UI changes |
| Unused files / deps / exports | `bun run check:unused` | ✅ after adding files or imports |
| License audit (npm + data manifest) | `bun run check:licenses` | ✅ after `bun add`, after data changes |
| Bundle treemap (visual) | `bun run check:bundle` | manual, before chunking changes |
| Lighthouse perf + CWV | `bun run check:lighthouse` | manual, before deploy |
| Render-cause inspector | `VITE_WDYR=1 bun run dev` + `Component.whyDidYouRender = true` | manual, while debugging re-renders |

**Unbreakable rule** — adding a third-party data source means adding a row to `data/data-licenses.json` in the same commit. The `/credits` page is generated from the manifest; if the manifest is wrong, the credits are wrong, and we have a license problem. See [License hygiene SOP](#license-hygiene-sop).

## Commands

- `bun install` — install deps. Authoritative lockfile is `bun.lock`. Do **not** regenerate `package-lock.json` or `yarn.lock`.
- `bun run dev` — Vite dev server.
- `bun run build` — `tsc && vite build`. **This is the deploy gate** — `tsc` errors block deployment, including `noUnusedLocals` / `noUnusedParameters`. Always run the full `bun run build` before declaring work done; `vite build` alone is not sufficient.
- `bun run a11y` — Playwright + axe-core sweep across all 10 routes (WCAG 2.1 AA). Boots `vite preview` itself; exits non-zero on critical/serious violations. Add `--all` (`bun run a11y:all`) to also sample per-character pages. Run before merging UI changes.
- `bun run check:unused` — `knip` audit for unused files, dependencies, and exports. Configured in `knip.json`. Run when adding a file or import to confirm you haven't left orphans behind. The 3 reported unused shadcn exports (`DialogTrigger`, `DropdownMenuGroup`, `DropdownMenuPortal`) are intentional library surface — don't trim them.
- `bun run check:licenses` — license audit (`scripts/check-licenses.ts`). Two passes: (1) every npm package in `node_modules`, separating production-tree from dev-only and applying a strict allowlist to the former; (2) every bundled / runtime-fetched data source declared in `data/data-licenses.json`. Exits non-zero on any production-tree package with a denied or unrecognised license, or any data source missing from the manifest. **Run before:** adding a new dependency (`bun add` anything), integrating a new data source, and once before each deploy.
- `bun run check:bundle` — runs `ANALYZE=1 bun run build` and opens an interactive treemap (`dist/stats.html`) of every chunk via `rollup-plugin-visualizer`. Use when bundle sizes change unexpectedly or before a release to sanity-check that `manualChunks` rules still produce the splits we intend. The visualizer plugin is dev-only (deferred ESM import inside `defineConfig`) — normal builds don't load it.
- `bun run check:lighthouse` — `@lhci/cli` boots `vite preview` and runs Lighthouse against `/`, `/quiz`, `/kanji-list` (one run each, desktop preset). Asserts perf ≥ 90, a11y ≥ 95, LCP < 2.5s, CLS < 0.1, TBT < 300ms. HTML + JSON reports land in `.lighthouseci/` (gitignored) for visual review. Run before each deploy as a Core Web Vitals gut-check.
- **why-did-you-render** — opt-in render-cause inspector. Wired into `app/main.tsx` via a dynamic import gated on `import.meta.env.DEV && import.meta.env.VITE_WDYR === '1'`, so it's tree-shaken from prod AND dormant in normal `bun run dev`. **Off by default** because wdyr monkey-patches `useState` and collides with TanStack Router's `<Transitioner>`, causing a hooks-order crash. To use, run `VITE_WDYR=1 bun run dev` and mark suspect components with `MyComponent.whyDidYouRender = true`. Default config has `trackAllPureComponents: false` — turning that on floods the console.
- `make buildprod` — Docker build against the `production-vm-1` context. Wired into the monorepo `make deploy_all` target.

## Project layout

```
app/
  routes/             TanStack Router file-based routes (auto-generates routeTree.gen.ts)
  globals.css         Tailwind directives + design tokens (sumi/vermilion, font feature settings)
  main.tsx            Vite entry — mounts <RouterProvider />
components/
  ui/                 shadcn-style Radix wrappers (dialog, dropdown-menu, toggle-group, tabs, ...)
  navigation/         Top-level nav (main-nav.tsx)
  *-detail.tsx        Detail dialogs — see "Detail popup standard" below
  *-quiz.tsx          Quiz components (kanji, vocab, kana)
data/                 Static data: kanji-data.ts, vocabulary-data.ts, kana-data.ts (bundled, no fetch)
public/               Vite static assets (favicon, kv.png, robots.txt, sitemap.xml)
Dockerfile            Bun build → nginx:alpine runtime; do not reintroduce Next.js artifacts
nginx.conf            Per-app nginx config — must keep `try_files $uri $uri/ /index.html;` for SPA routing
```

Path alias: `@/*` → `./*` (project root). Use `@/components/...`, `@/data/...`, `@/lib/...` for cross-folder imports.

**Do not edit `app/routeTree.gen.ts`** — it's generated by the TanStack Router Vite plugin on every dev run.

## Design system: "Editorial Sumi"

The aesthetic is **refined editorial with traditional Japanese accents**. The bold choice is *restraint* — kanji characters are the visual heroes; chrome must frame them, not compete.

### Typography hierarchy — two-voice system

| Voice | Font | Used for |
|---|---|---|
| **Display** (`font-display`) | Newsreader (variable, opsz + wght axes, lining/tabular figures by default) | Wordmark, h1, h2, h3, `CardTitle`, `CardDescription`, `<TabsTrigger>` labels, `<legend>`, empty-state headlines, dialog titles |
| **Body** (default sans) | system-ui sans stack | Paragraphs, button labels, input text, badges, score displays, microcopy, status messages |
| **Japanese** (`font-jp`) | Noto Serif JP (subsetted to `漢字` only) | The 漢字 logo glyph in the wordmark only. Other Japanese text uses system Japanese fallback via `lang="ja"`. |

Same elements always get the same voice. New `CardTitle` → display. New `<button>` → body. No exceptions.

### Color tokens

| Token | Hex | Use |
|---|---|---|
| `text-sumi` | `#1a1815` | Primary text, headings, brand mark |
| `text-sumi/70` | 70% opacity | Muted text — italic captions, descriptions, "by Insomnius", recovery hints. **Minimum opacity for body text** (passes AA at ~4.7:1). Do not go below `/70` for any user-facing text. |
| `text-sumi/55` | 55% opacity | Decorative inline labels (e.g. count parentheses inside titles). **Never** for standalone body text. |
| `bg-cream` | `#faf6ed` | Page background (set on `body` in globals.css with subtle warm noise overlay). Don't apply `bg-slate-*` on route wrappers — it covers the cream. |
| `bg-cream-deep` | `#f3ebd6` | Card surfaces, code-block-style highlight panels. Replaces `bg-slate-100` for consistency with the warm palette. |
| `text-vermilion` | `#c8553d` | **Decorative only** — underlines, focus rings, the 漢字 stamp glyph. Fails AA on body text. |
| `text-vermilion-deep` | `#a3402b` | Vermilion in text contexts (passes AA). Use for active labels, hover transitions on text. |
| `text-gold` | `#d4a04c` | Reserved for "earned / progress" states (streaks, completion badges). Currently unused; will activate when progress system ships. |
| `text-gold-deep` | `#a87c2f` | Gold in text contexts. AA-compliant. |
| `bg-gold-soft` | `#f5e6c4` | Reserved for progress backgrounds (streak pill, mastery indicators). Currently unused. |

**Contrast rule**: any text the user reads must pass WCAG AA (≥4.5:1). Vermilion is for visual accent (underlines, icons, focus rings); vermilion-deep is for text.

### Numbers in display font

`globals.css:.font-display` enables `font-variant-numeric: lining-nums tabular-nums` globally. Newsreader uses lining figures by default (open-top 4, traditional shapes); the explicit declaration is defensive in case the typeface changes. **Never override this.** All `.font-display` numerics get clear, tabular-aligned figures so columns don't shift when values change.

## Detail panel standard (interaction lock-in)

The journey: modal → rejected (overlays context) → dedicated route → rejected (breaks spatial continuity) → inline expansion in multi-column → rejected (sibling cards shift) → inline at end of grid → rejected (mobile users had to scroll past the whole grid to find the detail). **Where we landed: master-detail at `md+`, inline-after-tapped-card below `md` (with single-column grid).**

The grid never reflows on click. On `md+`, the detail lives in a fixed-width sticky column beside the index. Below `md`, the inner grid is single-column, so the inline detail's `col-span-full` placement creates no sibling-shift (each card is its own row).

References: `components/kanji-detail.tsx`, `components/vocab-detail.tsx`, `components/kana-detail.tsx`.

### Detail components — dual-mode

The three detail components accept an optional `onClose` prop:
- **Inline / sticky mode (with `onClose`)**: shows a Close button in the header + an "Open as full page" link, listens for Escape to dismiss
- **Page mode (no `onClose`)**: no Close button, no Escape handler — the route's back link handles dismissal

### List page master-detail pattern (canonical)

```tsx
<TabsContent value={...}>
  <div className="grid gap-6 lg:gap-10 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
    {/* Index column */}
    <div>
      <Card>
        <CardHeader><CardTitle>...</CardTitle></CardHeader>
        <CardContent>
          {/* Single-col below md so inline detail can expand without shifting siblings */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {items.map(item => (
              <Fragment key={item.id}>
                <button
                  type="button"
                  aria-label={`${item.label}. ${isSelected ? 'Hide' : 'View'} details.`}
                  aria-pressed={isSelected}
                  onClick={() => setSelected(isSelected ? null : item)}
                  className={`... transition-all ${
                    isSelected
                      ? "border-vermilion/60 bg-vermilion/5 shadow-[0_2px_10px_-2px_rgba(200,85,61,0.2)]"
                      : "border-sumi/10 bg-white/60 hover:border-vermilion/40 hover:shadow-[0_2px_8px_-2px_rgba(168,124,47,0.15)]"
                  }`}
                >
                  {/* card content */}
                </button>
                {/* Inline detail right after the tapped card — only below md */}
                {isSelected && (
                  <div className="md:hidden col-span-full mt-1 mb-2">
                    <DetailComponent item={item} onClose={() => setSelected(null)} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Sticky detail aside — only on md+ */}
    <aside className="hidden md:block">
      <div className="sticky top-20">
        {selected ? (
          <DetailComponent item={selected} onClose={() => setSelected(null)} />
        ) : (
          <DetailEmptyState />
        )}
      </div>
    </aside>
  </div>
</TabsContent>
```

### Required behaviors

- The card button uses `aria-pressed={isSelected}` (toggle button semantics). Selected card carries the **vermilion-tinted highlight** (border + bg + shadow) — visual anchor connecting it to the detail aside.
- Inner grid is **single-column below `md`** so the inline detail's `col-span-full` placement creates no sibling-shift. At `md+`, the inline detail is hidden via `md:hidden` and the sticky aside takes over.
- Sticky aside uses `sticky top-20` (80px = nav height + breathing room).
- Empty state is required when `selected` is null on `md+`. Use a `border-dashed bg-white/40` Card with a faint vermilion `font-jp` glyph (e.g. `漢字`, `言葉`, `仮名`) and italic `font-display` invitation text.
- Switching tabs clears selection: `<Tabs onValueChange={() => setSelected(null)}>`.

### Deep-link routes (`/kanji/$char`, `/vocab/$word`, `/kana/$char`)

These exist as **shareable URLs only** — no list page navigates to them on click. They render the same detail components in page mode (no `onClose`). Useful for: chat-pasted links, bookmarks, OG-card-rich social shares. Each route has its own `head()` for SEO. Don't repurpose them for in-app navigation.

## Routes inventory

| Route | Purpose |
|---|---|
| `/` | **Landing page** — hero with 漢字 mark, feature grid with mini live previews (calendar, kanji card, streak pill), privacy moment, final CTA. Brand logo links here. |
| `/quiz` | Kanji + vocab quiz home (was `/`) — what most regular users want. CTA on landing brings them here. |
| `/kana-quiz` | Hiragana / katakana quiz |
| `/draw` | Stroke-order practice by JLPT level (uses hanzi-writer in animate + practice modes) |
| `/kanji-list` | Browse kanji by JLPT level (with inline detail expansion) |
| `/vocab-list` | Browse vocab by JLPT level (with inline detail expansion) |
| `/kana-reference` | Hiragana / katakana tables (with inline detail expansion) |
| `/kanji/$char`, `/vocab/$word`, `/kana/$char` | Deep-link detail pages — direct URL access only, not linked from list pages |

## Component patterns

### Always prefer Radix-backed shadcn wrappers from `components/ui/`

| Need | Use | Don't roll your own |
|---|---|---|
| Modal / dialog | `@/components/ui/dialog` (Radix `Dialog`) | No `position: fixed` divs with `useEffect` for Escape |
| Dropdown menu (popover) | `@/components/ui/dropdown-menu` (Radix `DropdownMenu`) | No custom click-outside `useRef` machinery |
| Segmented control / mutually exclusive toggles | `@/components/ui/toggle-group` (Radix `ToggleGroup` with `type="single"`) | No two `<Button>`s side-by-side managing shared state |
| Tabs | `@/components/ui/tabs` (Radix `Tabs`) | — |
| Radio group | `@/components/ui/radio-group` (Radix `RadioGroup`) — but for level/difficulty selection use `ToggleGroup` instead (better affordance) | — |

### Editorial segmented-control pattern

When building a mutually-exclusive selector with ≤7 options, follow the `LevelSelector` / kana-quiz difficulty selector style:
- Wrap in `<fieldset>` + `<legend className="font-display italic text-base text-sumi/70">`
- `ToggleGroup type="single"` with `onValueChange={(v) => { if (v) callback(v) }}` — guard prevents click-active-to-deselect
- Each item: stacked layout with **Fraunces letterform** (active: `text-sumi font-semibold`, inactive: `text-sumi/45`) + **italic descriptor** (active: `text-vermilion-deep`, inactive: `text-sumi/55→/75 on hover`) + **2px vermilion underline** (active only)
- Touch target: `min-h-[44px] min-w-[56px]` (sm:72px)
- Transitions: `transition-colors motion-reduce:transition-none`

## Accessibility — WCAG 2.1 AA is the floor, not the goal

**Every feature in this codebase must ship accessible.** Not "we'll add a11y later," not "the design has a11y issues but it's polished." Inaccessible UI is unfinished UI. Treat the checklist below the way you treat tests: if it's not green, the feature isn't done.

### Pre-merge checklist (run for every PR that touches UI)

- [ ] Keyboard-only walkthrough: can you use this feature with **Tab / Shift-Tab / Enter / Space / Arrow keys / Escape** alone, no mouse, no touch?
- [ ] Focus is **visible** at every step (`focus-visible:ring-vermilion focus-visible:ring-offset-2` — never blue, never invisible).
- [ ] Focus order matches reading order. No tabindex > 0 anywhere.
- [ ] Screen-reader walkthrough (VoiceOver / NVDA / TalkBack on mobile): every interactive element announces a name + role + state.
- [ ] No information conveyed by color alone (e.g. correct/incorrect must include an icon + text label, not just red/green).
- [ ] Contrast: any text the user reads must pass WCAG AA (≥4.5:1; ≥3:1 for ≥18pt). Use `text-sumi/70` as the floor for body text, never below.
- [ ] Touch targets ≥ 44×44px. Set `min-h-[44px] min-w-[44px]` explicitly when relying on font-size for height.
- [ ] All animations / transitions wrap behavior with `motion-reduce:transition-none` (or skip animation entirely under `prefers-reduced-motion`).

### Mandatory patterns

- **Japanese text** must be wrapped in `<span lang="ja">…</span>` or have `lang="ja"` on the parent. Screen readers default to English pronunciation for `lang="en"` containers — Japanese is read as garbled romaji or unicode codepoint names without this. *Especially* on quiz pages: every kanji and kana shown to the user gets `lang="ja"`.
- **Icon-only buttons** require `aria-label`. Lucide icons should have `aria-hidden="true"` when accompanying visible text. External-link icons say "(opens in new tab)" in the label.
- **Empty states** use `role="status"` and provide a recovery hint ("Try a different level tab, or clear the search.").
- **Quiz feedback** containers use `role="status" aria-live="assertive" aria-atomic="true"` with an `sr-only` "Correct: " / "Incorrect: " prefix. Score displays use `aria-live="polite"`.
- **Forms** must associate every input with a visible or `sr-only` `<Label htmlFor=…>`. Use `aria-describedby` for hints. Disabled buttons must remain focusable for screen-reader users (do not hide).
- **Modals / dropdowns** use the Radix wrappers in `components/ui/` — they handle focus traps, Escape, and ARIA correctly. **Do not roll your own.** A custom `position: fixed` div with a click handler is the wrong answer every time.
- **Disclosure widgets** (collapsible menus, "show more" toggles) need `aria-expanded` + `aria-controls` referencing the panel's `id`.
- **Don't render `<button>` inside `<button>`.** For card-shaped clickable surfaces with nested interactive elements, use `role="button" tabIndex={0}` + `onKeyDown` for Enter/Space.
- **Toggle buttons** (segmented control items, sort selectors) use `aria-pressed` to convey state.
- **Skip-to-content link** lives in `app/routes/__root.tsx`; the `<main>` element has `id="main"` as the target. Don't move or remove it.
- **Touch targets** must be ≥ 44×44px. For toggle items, set `min-h-[44px]` explicitly (don't rely on font-derived height).
- **Transitions** must include `motion-reduce:transition-none` to respect `prefers-reduced-motion`. Custom keyframe animations must also branch on `@media (prefers-reduced-motion: reduce)`.
- **Focus rings** use `focus-visible:ring-vermilion` (not blue). Brand-aligned a11y indicators.

### Common a11y traps in this codebase

- **Array meanings rendered as strings**: `kanji.meaning` is `string[]`. Templating it directly (`` `…${kanji.meaning}…` ``) produces "a,b,c" which screen readers read as "a comma b comma c." **Always `.join(", ")`** before interpolating into user-visible text.
- **`bg-slate-*` / `text-slate-*` leftovers from shadcn defaults** — not just a design issue: the cool grays clash with the warm cream palette and were chosen for a different contrast baseline. Migrate to `bg-cream-deep` / `text-sumi/70` etc. when you see them.
- **`<div>` with `aria-label` for non-interactive content** isn't always announced. Prefer giving the kanji a proper landmark (`<p>` / `<h1>`) and putting the description in surrounding text.

## Progress system (local-first, no backend)

Lives in `lib/progress/`:
- `db.ts` — ~80-line Promise wrapper around native IndexedDB. No Dexie, no idb. Stores: `profile` (singleton), `sessions`, `answers`, `dailyTotals` (write-through aggregate keyed by `YYYY-MM-DD`).
- `store.ts` — module-level state with subscribe/notify. Hydrates from IndexedDB on app load. Mirrors `displayName` and `streak` to `localStorage` so first-paint reads are sync (no "loading…" flash for the user's own name).
- `use-progress.ts` — public API. Exports `useProgress()` hook (uses `useSyncExternalStore`, the React 18+ canonical pattern for external stores) and the actions `setDisplayName`, `recordAnswer`, `reset`, `getTotals`.

### Native Web APIs used (no libraries)

| API | What it does |
|---|---|
| **IndexedDB** | Persistent storage — sessions, answers, daily aggregates |
| **localStorage** | Sync-readable mirror of `displayName` + `streak` for instant first paint |
| **BroadcastChannel** | Tab-to-tab sync — change name in tab 1, tab 2 updates instantly |
| **`crypto.randomUUID()`** | Session and answer IDs |
| **`useSyncExternalStore`** | React's idiomatic external-store subscription |

### Sessions

Auto-start on the first answer. Auto-end after 5 minutes of inactivity (`SESSION_IDLE_TIMEOUT_MS`). Per-answer duration is capped at 60s (`DURATION_GAP_CAP_MS`) so a user who walks away mid-quiz doesn't inflate their "time studied."

### Recording from quiz components

Each quiz component calls `recordAnswer(type, itemKey, isCorrect, level?)` directly when the user submits. The host route's existing `onAnswer` callback continues to work for in-session score display — the two are independent.

```tsx
import { recordAnswer } from "@/lib/progress/use-progress"

// In handleSubmit:
void recordAnswer("kanji", kanji.kanji, isCorrect, kanji.jlptLevel)
```

### Streak rules

- Day boundary uses **local timezone** (not UTC). Midnight in Jakarta resets the streak window for a Jakarta user.
- Today + yesterday count as "current" — if today has activity, today counts. If today is empty but yesterday had activity, yesterday's streak is still shown (gives the user grace until the day ends).
- Walks backward from today; breaks on first empty day.

### Where it surfaces

- **Nav (right meta tier)**: `<StreakIndicator>` (gold pill, hidden when streak < 1) + `<ProfileLink>` (initial-letter avatar when name set, User icon otherwise) — sit between the divider and the GitHub icon.
- **Profile page (`/profile`)**: name editor, totals (streak, active days, answered, accuracy, time), reset.

### Activity calendar + backup/import (shipped)

- **`/history`** route renders a GitHub-style contribution calendar (`components/contribution-calendar.tsx`) over the last ~52 weeks, plus a recent-sessions list (last 30 sessions, fetched async via `getRecentSessions`).
- Calendar is **hand-rolled CSS Grid + `Intl.DateTimeFormat`** — no library. Reads directly from the in-memory `recentDailyTotals` so no IndexedDB round-trip on render.
- Intensity buckets: 0 / 1–5 / 6–15 / 16–40 / 40+ — gold-tinted scale matching the streak indicator.
- **Backup**: gzipped JSON via native `CompressionStream` (falls back to plain JSON if unavailable). Filename: `kanji-by-insomnius-backup-YYYY-MM-DD.kbi.{gz,json}`. Download via `Blob` + anchor for cross-browser support (incl. Safari/iOS — File System Access API would be Chrome-only).
- **Import**: auto-detects gzip via magic bytes (`0x1f 0x8b`), decompresses with `DecompressionStream`, parses, runs migrations to bring older schema versions up to current, then restores via chunked IndexedDB writes (`putMany` with 500-row transactions and event-loop yield between chunks for UI responsiveness).
- **Schema spec & migration policy** — see [`docs/BACKUP_SCHEMA.md`](./docs/BACKUP_SCHEMA.md). **Treat that file as a contract.** When the schema changes: bump `CURRENT_SCHEMA_VERSION`, add a migration to the `migrations` map in `store.ts`, document the change in BACKUP_SCHEMA.md. Never remove old migrations — old user backups must keep importing.

### Gamification (shipped — pass 1)

Two retention mechanics, deliberately editorial-restrained:

- **Daily goal**: configurable target (default 10, 1–200 range). Stored as `Profile.dailyGoal` — an **additive optional field** that demonstrates the schema policy: no version bump required because old backups without the field fall back to `DEFAULT_DAILY_GOAL` via the `getDailyGoal()` read-time helper. See docs/BACKUP_SCHEMA.md.
- **Goal counts correct answers only.** Wrong answers don't count toward the daily goal. This frames practice as "learn 10 things right" rather than "submit 10 attempts" — measures real practice, not button-mashing. SessionStrip and Profile Daily Goal card both display `todayCorrect / goal` with a "correct" label.
- **Session strip variants** in `components/session-strip.tsx`:
  - **Normal**: streak · today's count vs goal (with slim gold bar) · accuracy. Bar fills `bg-gold` until the goal is hit, then `bg-gold-deep` for the "earned" feel.
  - **Goal-hit transition**: when today's count crosses the goal threshold, the strip briefly pulses with a 1.2s `box-shadow` ring (`shadow-[0_0_0_6px_rgba(212,160,76,0.18)]`). No confetti, no overlay — typography + color + a subtle pulse. Editorial restraint applied to gamification.
  - **At-risk variant**: when `streak > 0 && todayAnswered === 0`, the strip swaps to vermilion-tinted ("days streak at risk · Answer one to keep it going"). Loss-aversion nudge that disappears the moment the user answers anything.
- **Profile page**: Daily Goal card with number input (clamped to 1–200) + a today-progress mini-bar mirroring what the strip shows.

### What's NOT done yet

- Per-day expansion in the calendar (click a date → see what was studied)
- Per-character mastery in `KanjiDetail` ("seen 7 times — 5 correct" badge) — needs a new `itemMastery` IDB store (or derive on demand from `answers`)
- Stealth SRS item picker (lightly weight quiz pickers away from recently-correct items)
- Milestone celebrations at 5/10/25/50/100 streaks; 100/500/1000 questions
- Streak freeze (1 free skip-day per week) — requires a new IDB field

## External data dependencies

- **Stroke order**: `hanzi-writer` (MIT) lazy-loads kanji stroke data from jsdelivr CDN at runtime. Library code is in a code-split chunk loaded only when a user opens the Strokes tab in `KanjiDetail`. **Offline support breaks for stroke order** — the rest of the app continues to work, but the stroke viewer shows an error message. If you ever need offline stroke data, install `hanzi-writer-data-jp` and configure `charDataLoader` in `kanji-stroke-order.tsx`. Attribution lives in the README under "Data sources".

## SEO / head management

- `index.html` carries the no-JS fallback meta + the static JSON-LD blocks (`WebSite`, `EducationalOrganization`, `WebApplication`) — these are visible to crawlers that don't execute JS.
- Each route's `head()` in `createFileRoute` adds per-page `meta` and `links`. `<HeadContent />` is placed in `__root.tsx`; React 19 auto-hoists `<title>`, `<meta>`, `<link>`, and `<script type="application/ld+json">` to `<head>`.
- Per-page meta should override at minimum: `title`, `description`, `og:title`, `og:description`, `og:url`, `twitter:title`, `twitter:description`, plus a `rel="canonical"` link.
- **Per-character pages (`/kanji/$char`, `/vocab/$word`, `/kana/$char`)** inject the actual character data (meanings, readings, JLPT level) into the title/description and emit a `DefinedTerm` JSON-LD block. This is what makes those URLs indexable for long-tail Google queries like "漢 kanji meaning" — keep that data flowing.
- **Private pages (`/profile`, `/history`)** ship `<meta name="robots" content="noindex,follow">`. Don't accidentally remove it; we don't want personal pages in Google.
- **Sitemap is generated at build time** by `vite-plugins/sitemap.ts` (registered in `vite.config.ts`). It enumerates every kanji, vocab, and kana URL from the data files. Do **not** hand-write `public/sitemap.xml` — it's emitted directly into `dist/`.

## PWA & service worker

- Configured via `vite-plugin-pwa` in `vite.config.ts` (`registerType: "autoUpdate"`, Workbox-generated `dist/sw.js`).
- The web app manifest is generated into `dist/manifest.webmanifest`; `index.html` links to it via `<link rel="manifest">`.
- **Workbox precaches** all built `js`/`css`/`html`/`png`/`woff2` etc. — except the heavy `kanji-data-*.js` chunk, which is **runtime-cached** (`CacheFirst`) so the first visit isn't blocked by a 1.2 MB precache fetch.
- Hanzi-writer stroke data (loaded from jsdelivr CDN) is also runtime-cached so stroke order works offline after first use.
- When you change the data files, the Vite content hash in the chunk filename changes, the SW cache key changes, the new chunk gets fetched and the old one evicted. **That hash is the invalidation strategy** — do not add a manual cache-busting layer on top.
- Don't precache fonts.googleapis.com directly; the runtime-caching rule (StaleWhileRevalidate / CacheFirst) handles it correctly.

## Build chunking

- `vite.config.ts` uses `manualChunks` to separate vendor and data:
  - `react-vendor`, `router-vendor`, `radix-vendor` — long-lived caches across deploys.
  - `kanji-data`, `vocabulary-data`, `kana-data` — keep heavy data files isolated so route code splitting can lazy-load them.
- The landing page (`/`) does **not** import the data files, so first-paint JS stays small (~280 KB total over react-vendor + router-vendor + the route entry). Don't import `@/data/kanji-data` from the landing route or shared components.

## License hygiene SOP

The site is private (no source license declared) but redistributes a number of third-party assets — fonts, vocabulary lists, stroke-data lookups, radical decompositions, the Insomnius brand mark. We keep an explicit audit trail so a clean "we're safe to ship" answer is always available without digging through `node_modules` by hand.

### 🚨 The unbreakable rule — always update credits

**Any time you add, swap, remove, or materially change a third-party data source, you MUST update `data/data-licenses.json` in the same commit.** No exceptions. No "I'll add it later." No "it's just a small file." If the bytes came from outside this repo, the manifest gets a row.

The `/credits` page (`app/routes/credits.tsx`) reads the manifest directly and renders one entry per source — license badge, attribution, upstream URL, audit note. **There is no separate "credits page" to update**: editing the manifest IS updating the credits. That asymmetry is deliberate — a single source of truth means the page can never drift from reality.

Why this rule is non-negotiable:

1. **CC BY / CC BY-SA / OFL all *require* visible attribution.** A missing manifest entry is a missing credit, which is a license violation.
2. **`bun run check:licenses` enforces it.** The audit refuses to pass if a redistributed file isn't declared. If you're tempted to silence the audit instead of adding the entry, you're doing it wrong.
3. **Future-you will not remember where a file came from.** A data file with no manifest row is forensic work in six months — sometimes impossible work, if the upstream URL has rotted.

The workflow when adding a new source:

1. Add the entry to `data/data-licenses.json` (`id`, `description`, `license`, `url`, `redistributedAs`, `attribution`, optional `note` / `manualOverride`).
2. Run `bun run check:licenses` — must come back clean.
3. Spot-check `/credits` in the browser to confirm the entry renders sensibly (license badge, attribution line, source link).
4. Commit the manifest change with the data change. Never split them across commits.

### Rule of thumb

- **npm dep**: must end up MIT / ISC / Apache-2.0 / BSD-* / MPL-2.0 / 0BSD / Unlicense / CC0 / OFL / BlueOak in the production tree (anything copyleft like GPL/LGPL/AGPL is denied if it ships to users; dev-only is OK). Allowlist + denylist live in `scripts/check-licenses.ts`.
- **Bundled data** (anything we redistribute as a static asset): record in `data/data-licenses.json` with `id`, `description`, `license`, `url`, `redistributedAs`, `attribution`, and a `note` if anything's non-obvious. The audit refuses any data source not listed there.
- **Runtime-fetched data** (e.g. hanzi-writer JSON from jsdelivr): also recorded in the manifest. We're not redistributing it ourselves, but the audit trail matters for facts like "we never ship the LGPL stroke paths into our bundle."
- **Removing or replacing a source**: delete the manifest entry in the same commit that removes/replaces the data file. Stale entries on `/credits` are as bad as missing ones — they advertise an attribution we no longer owe (or, worse, a data source we no longer ship under that license).

### When to run `bun run check:licenses`

1. **Before** running `bun add <anything>` — actually do this in this order: install, then run the audit. If a new transitive lands a denied license, you'll see it before committing.
2. **Before** integrating a new bundled / runtime-fetched data source. After adding the entry to `data/data-licenses.json`, re-run.
3. **Once per deploy.** Not strictly automated; the build doesn't gate on it. But it's a 2-second sanity check.

### Adding a new permissive license to the allowlist

If `check:licenses` flags an unfamiliar license that's actually permissive (e.g. a new SPDX token surfaces in a transitive), add it to the `ALLOWED` set in `scripts/check-licenses.ts` with a brief comment. Do **not** silence the warning by removing the package — fix the allowlist with intent.

### Manual override for non-SPDX strings

When a data source has a license string that isn't a clean SPDX identifier but a human review concludes our usage is compliant (the hanzi-writer-data case), set `manualOverride: { reason: "..." }` on the entry in `data/data-licenses.json`. The reason becomes the audit trail — write it for the next person, not for yourself.

## What's intentionally NOT here

- **No analytics, no tracking pixels, no telemetry.** The landing copy promises "no tracking, no ads, no upsells" and the privacy section says progress never leaves the browser. Any addition of GA, Plausible, Posthog, Sentry, etc. is a brand-and-trust regression — discuss before adding.

## Build & deployment

- The deploy gate is `bun run build` (not `vite build` alone) — `tsc` errors block deployment.
- Production build: `make buildprod` runs `docker --context production-vm-1 build -t kanjiverse:latest .` which builds on the production VM directly.
- `make deploy_all` (at monorepo root) runs `_deploy_kanjiverse` as part of the chain.
- Static files in `public/` (robots.txt, sitemap.xml, kv.png, favicon.ico) are copied to `dist/` by Vite and served as-is by nginx.
- nginx config requires `try_files $uri $uri/ /index.html;` for SPA routing — without it, deep-linking to `/kanji-list` returns 404.
- The internal Docker image is still tagged `kanjiverse:latest` — this is intentional and decoupled from the user-facing brand name "Kanji by Insomnius". Don't rename without coordinating the GitHub repo rename.

## What NOT to do

- **Don't reintroduce Next.js anything.** No `next/`, no `app/metadata.ts` / `app/sitemap.ts` / `app/robots.ts` server-helper files, no `getServerSideProps`, no `.next/` references in the Dockerfile.
- **Don't use the blue→purple gradient** or any AI-cliche aesthetic. The brand is sumi + vermilion. Solid colors only.
- **Don't add npm or yarn lockfiles.** Bun is the package manager.
- **Don't change `--muted-foreground`** in `globals.css` casually — it's a shadcn token used everywhere; touching it cascades through every component. Any change deserves its own focused PR.
- **Don't write multi-line code comments.** WHY-only, single-line comments where the rationale isn't obvious from the code.
- **Don't hand-roll modals, dropdowns, or focus traps.** Use the Radix wrappers in `components/ui/`.
- **Don't use raw `<button>` for clickable cards** containing other interactive elements — use `role="button" tabIndex={0}` + `onKeyDown` (nested buttons are invalid HTML).
- **Don't commit `dist/`.** It's in `.gitignore`. The build artifact is regenerated on every deploy.
