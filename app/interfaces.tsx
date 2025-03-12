export interface KanjiExample {
  kana: string
  translation: string
  KanaRomaji: string
}

export interface Kanji {
  kanji: string
  meaning: string
  romaji: string
  onReading: string
  kunReading: string
  onReadingRomaji: string
  kunReadingRomaji: string
  examples: KanjiExample[]
  jlptLevel: string
  character?: string
}

