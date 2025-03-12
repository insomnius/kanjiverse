import rawKanjiData from "./raw-kanji-data.json"

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
}

interface KanjiData {
  [key: string]: Kanji[]
}

const transformKanjiData = (data: any[]): KanjiData => {
  const transformedData: KanjiData = {}

  data.forEach((item) => {
    const level = item.JLPTLevel
    if (!transformedData[level]) {
      transformedData[level] = []
    }

    transformedData[level].push({
      kanji: item.Kanji,
      meaning: item.Meaning,
      romaji: item.OnReadingRomaji, // For backward compatibility
      onReading: item.OnReading,
      kunReading: item.KunReading,
      onReadingRomaji: item.OnReadingRomaji,
      kunReadingRomaji: item.KunReadingRomaji,
      examples: item.Examples || [],
      jlptLevel: item.JLPTLevel,
    })
  })

  return transformedData
}

export const kanjiData: KanjiData = transformKanjiData(rawKanjiData)

