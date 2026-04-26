# Kanji by Insomnius

A focused study companion for Japanese kanji, vocabulary, and kana. Free, in-browser, and zero-account — your progress lives entirely on your device.

Visit the website: [kanji.insomnius.dev](https://kanji.insomnius.dev)

## Features

- **Quizzes for kanji, vocabulary, and kana** — type meanings, pick from multiple choice, or drill hiragana/katakana with `1`–`4` + `Enter` hotkeys.
- **Stroke order practice** — watch each kanji drawn one stroke at a time, then trace it yourself. Hints appear after two misses. Dedicated `/draw` route lets you practice any JLPT level.
- **Searchable references** — browse all 2,000+ kanji from JLPT N5 to N1, the full vocabulary set, and complete hiragana/katakana tables. Master-detail layout on desktop, inline expansion on mobile.
- **Daily streak + goal** — set a daily target (default 10). Streak counts only correct answers, so it measures real practice. At-risk warning when you haven't started today.
- **Activity calendar** — GitHub-style heatmap of every day you've practiced, embedded on your profile page.
- **Backup, import, and share** — download a gzipped backup file anytime, restore on any device, share your progress card to Twitter / Facebook / Threads, or generate an Instagram-ready image (square or story format).
- **Accessible** — WCAG 2.1 AA: Japanese text wrapped with `lang="ja"` for screen readers, full keyboard navigation, live-region announcements for quiz feedback, vermilion focus rings, reduced-motion support.

## Privacy

Your name, streak, sessions, answers, and goal preferences live in IndexedDB on your device. There's no account to create, no server holding your data, and no analytics on individual learning behavior. Move between devices with the downloadable backup file (gzipped JSON, future-proofed schema with documented migration policy in [`docs/BACKUP_SCHEMA.md`](./docs/BACKUP_SCHEMA.md)).

## Tech stack

Vite · React 19 · TanStack Router · Tailwind 3 · TypeScript (strict). Bun is the package manager. Native browser APIs do the heavy lifting — IndexedDB, Web Share, CompressionStream, Canvas — no Dexie, no html2canvas, no SRS library.

## Data sources

Kanji stroke order data comes from the [Make Me a Hanzi](https://github.com/skishore/makemeahanzi) project (which combines KanjiVG with Arphic font data) via the [hanzi-writer](https://hanziwriter.org/) library. JLPT level groupings are community-curated — the JLPT organization no longer publishes official kanji lists since the 2010 test reform.

## Local development

```bash
bun install
bun run dev      # Vite dev server on http://localhost:5173
bun run build    # tsc + vite build — this is the deploy gate; tsc errors block deploy
```

See [`CLAUDE.md`](./CLAUDE.md) for the design system, accessibility patterns, and detail-panel pattern locked in for future contributions.

## License

Free to use, fork, and study from. Built by [Insomnius](https://insomnius.dev).
