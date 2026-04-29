"use client"

import KanjiStrokeOrder, { type CharacterData } from "@/components/kanji-stroke-order"

/**
 * Lazy-imports the bundled kana stroke JSON the first time we need it. The
 * module-level promise caches the result so subsequent characters share one
 * fetch; the dynamic import keeps the ~85 KB JSON out of the landing-page
 * bundle and only pulled when /kana-write or /kana-write-quiz is visited.
 */
let kanaStrokeCache: Promise<Record<string, CharacterData>> | null = null

function loadKanaStrokeMap(): Promise<Record<string, CharacterData>> {
  if (!kanaStrokeCache) {
    kanaStrokeCache = import("@/data/kana-stroke-data.json").then((mod) => {
      const raw = (mod.default ?? mod) as Record<string, unknown>
      // Strip the SPDX/header `_` key that the build script emits.
      const clean: Record<string, CharacterData> = {}
      for (const key of Object.keys(raw)) {
        if (key === "_") continue
        clean[key] = raw[key] as CharacterData
      }
      return clean
    })
  }
  return kanaStrokeCache
}

async function kanaCharLoader(char: string): Promise<CharacterData | null> {
  const map = await loadKanaStrokeMap()
  return map[char] ?? null
}

interface KanaStrokeOrderProps {
  character: string
  onQuizComplete?: (info: { mistakes: number }) => void
  /** Recall-mode: blank canvas, no outline, auto-start quiz. See KanjiStrokeOrder. */
  recallMode?: boolean
}

export default function KanaStrokeOrder({ character, onQuizComplete, recallMode }: KanaStrokeOrderProps) {
  return (
    <KanjiStrokeOrder
      character={character}
      charDataLoader={kanaCharLoader}
      onQuizComplete={onQuizComplete}
      recallMode={recallMode}
    />
  )
}
