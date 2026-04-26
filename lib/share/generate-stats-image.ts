// Canvas-based stats image generator for social sharing.
// Native Canvas API only — no html2canvas, no satori, no external deps.
//
// Sizing matches Instagram's recommended dimensions exactly so the image
// isn't downsampled or cropped on upload:
//   - "square"  — 1080×1080 (feed post)
//   - "story"   — 1080×1920 (story / reel cover)
// Same dimensions also work cleanly for Twitter image-attach (1200×630 prefers landscape
// but accepts these), Facebook posts, and any general "save & share" flow.

export type ImageFormat = "square" | "story"

export interface StatsImageData {
  displayName: string | null
  streak: number
  activeDays: number
  answered: number
  accuracy: number
  minutes: number
}

// Brand palette (mirrors tailwind tokens — keep in sync with tailwind.config.ts)
const C = {
  bg: "#faf6ed",
  sumi: "#1a1815",
  sumiSoft: "rgba(26, 24, 21, 0.55)",
  sumiMuted: "rgba(26, 24, 21, 0.72)",
  vermilion: "#c8553d",
  vermilionDeep: "#a3402b",
  gold: "#d4a04c",
  divider: "rgba(26, 24, 21, 0.15)",
}

/**
 * Force the relevant webfonts to load before drawing on canvas.
 * Without this, the first generation falls back to system serifs because Canvas
 * doesn't trigger font loads on its own.
 */
async function ensureFontsLoaded(): Promise<void> {
  if (typeof document === "undefined" || !document.fonts) return
  await Promise.all([
    document.fonts.load("500 280px Newsreader"),
    document.fonts.load("600 60px Newsreader"),
    document.fonts.load("italic 48px Newsreader"),
    document.fonts.load("italic 32px Newsreader"),
    document.fonts.load("600 60px \"Noto Serif JP\""),
  ]).catch(() => {/* non-fatal — fall back to system fonts */})
  await document.fonts.ready
}

export async function generateStatsImage(data: StatsImageData, format: ImageFormat): Promise<Blob> {
  const isSquare = format === "square"
  const W = 1080
  const H = isSquare ? 1080 : 1920

  await ensureFontsLoaded()

  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas 2D context unavailable")

  // ─── Background ──────────────────────────────────────────
  ctx.fillStyle = C.bg
  ctx.fillRect(0, 0, W, H)

  // Top + bottom vermilion accent rules — brand mark for the image
  ctx.fillStyle = C.vermilion
  ctx.fillRect(0, 0, W, 10)
  ctx.fillRect(0, H - 10, W, 10)

  // ─── Wordmark (top center) ───────────────────────────────
  const wordmarkY = isSquare ? 140 : 220

  ctx.textBaseline = "middle"

  // Measure each segment to center the composite wordmark
  const kanjiFont = "600 64px \"Noto Serif JP\", serif"
  const kanjiLatinFont = "600 56px Newsreader, Georgia, serif"
  const byFont = "italic 36px Newsreader, Georgia, serif"
  const gap = 14

  ctx.font = kanjiFont
  const kanjiW = ctx.measureText("漢字").width
  ctx.font = kanjiLatinFont
  const kanjiLatinW = ctx.measureText("Kanji").width
  ctx.font = byFont
  const byW = ctx.measureText("by Insomnius").width

  const totalW = kanjiW + gap + kanjiLatinW + gap + byW
  let cursor = (W - totalW) / 2

  ctx.textAlign = "left"
  ctx.font = kanjiFont
  ctx.fillStyle = C.vermilion
  ctx.fillText("漢字", cursor, wordmarkY)
  cursor += kanjiW + gap

  ctx.font = kanjiLatinFont
  ctx.fillStyle = C.sumi
  ctx.fillText("Kanji", cursor, wordmarkY)
  cursor += kanjiLatinW + gap

  ctx.font = byFont
  ctx.fillStyle = C.sumiMuted
  ctx.fillText("by Insomnius", cursor, wordmarkY)

  // Reset for centered drawing below
  ctx.textAlign = "center"

  // ─── Optional personalized line ──────────────────────────
  if (data.displayName) {
    const nameY = isSquare ? 230 : 320
    ctx.font = "italic 28px Newsreader, Georgia, serif"
    ctx.fillStyle = C.sumiSoft
    const truncatedName = data.displayName.length > 20 ? data.displayName.slice(0, 19) + "…" : data.displayName
    ctx.fillText(`${truncatedName}'s kanji journey`, W / 2, nameY)
  }

  // ─── Hero streak ─────────────────────────────────────────
  const heroNumberY = isSquare ? 480 : 820
  const heroLabelY = heroNumberY + 200

  // Faint vermilion "underglow" rectangle to make the hero stand out
  if (data.streak > 0) {
    ctx.fillStyle = "rgba(212, 160, 76, 0.10)"  // gold/10
    const padX = 80
    ctx.fillRect(padX, heroNumberY - 220, W - padX * 2, 380)
  }

  ctx.font = `500 ${isSquare ? 320 : 360}px Newsreader, Georgia, serif`
  ctx.fillStyle = C.sumi
  ctx.fillText(String(data.streak), W / 2, heroNumberY)

  ctx.font = "italic 48px Newsreader, Georgia, serif"
  ctx.fillStyle = C.sumiMuted
  ctx.fillText(
    data.streak === 1 ? "day streak" : "day streak",
    W / 2,
    heroLabelY,
  )

  // Subtle "day" pluralization handling — use the actual word
  // (kept simple: "day" for 1, "days" for 0/many — matches in-app text)
  const streakLabel = data.streak === 1 ? "day streak" : "days streak"
  // Re-draw to overwrite (cheaper than computing the right text twice above)
  ctx.fillStyle = C.bg
  ctx.fillRect(0, heroLabelY - 32, W, 64)
  ctx.fillStyle = C.sumiMuted
  ctx.font = "italic 48px Newsreader, Georgia, serif"
  ctx.fillText(streakLabel, W / 2, heroLabelY)

  // ─── Stats row / column ──────────────────────────────────
  const statsTopY = isSquare ? 880 : 1320

  type StatEntry = { value: number; label: string; suffix?: string }
  const baseStats: StatEntry[] = [
    { value: data.activeDays, label: "active days" },
    { value: data.answered, label: "answered" },
    { value: data.accuracy, label: "accuracy", suffix: "%" },
  ]
  const allStats: StatEntry[] = isSquare
    ? baseStats
    : [...baseStats, { value: data.minutes, label: "minutes" }]

  if (isSquare) {
    // Horizontal row
    const cellW = W / allStats.length
    allStats.forEach((stat, i) => {
      const cx = cellW * i + cellW / 2
      ctx.font = "600 88px Newsreader, Georgia, serif"
      ctx.fillStyle = C.sumi
      ctx.fillText(`${stat.value}${stat.suffix ?? ""}`, cx, statsTopY)

      ctx.font = "italic 28px Newsreader, Georgia, serif"
      ctx.fillStyle = C.sumiMuted
      ctx.fillText(stat.label, cx, statsTopY + 64)
    })

    // Subtle dividers between cells
    ctx.strokeStyle = C.divider
    ctx.lineWidth = 1
    for (let i = 1; i < allStats.length; i++) {
      const x = cellW * i
      ctx.beginPath()
      ctx.moveTo(x, statsTopY - 50)
      ctx.lineTo(x, statsTopY + 80)
      ctx.stroke()
    }
  } else {
    // Vertical stack with horizontal rule
    allStats.forEach((stat, i) => {
      const y = statsTopY + i * 140
      ctx.font = "600 88px Newsreader, Georgia, serif"
      ctx.fillStyle = C.sumi
      ctx.textAlign = "right"
      ctx.fillText(`${stat.value}${stat.suffix ?? ""}`, W / 2 + 40, y)

      ctx.font = "italic 36px Newsreader, Georgia, serif"
      ctx.fillStyle = C.sumiMuted
      ctx.textAlign = "left"
      ctx.fillText(stat.label, W / 2 + 80, y)
    })
    ctx.textAlign = "center"
  }

  // ─── Footer URL ──────────────────────────────────────────
  const footerY = H - 80
  ctx.font = "italic 30px Newsreader, Georgia, serif"
  ctx.fillStyle = C.sumiSoft
  ctx.fillText("kanji.insomnius.dev", W / 2, footerY)

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Failed to encode image"))),
      "image/png",
      0.95,
    )
  })
}

export function buildShareImageFilename(format: ImageFormat): string {
  const date = new Date().toISOString().slice(0, 10)
  return `kanji-by-insomnius-${format}-${date}.png`
}
