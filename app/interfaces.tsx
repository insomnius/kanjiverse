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

// Google Analytics interface
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        [key: string]: unknown;
        page_path?: string;
      }
    ) => void;
    dataLayer: unknown[];
  }
}

