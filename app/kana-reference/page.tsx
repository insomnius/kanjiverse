"use client"

import { useState } from "react"
import Link from "next/link"
import { kanaData } from "@/data/kana-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft } from "lucide-react"

type KanaChar = {
  kana: string;
  romaji: string;
};

// Define a type for a row of kana characters
interface KanaRow {
  row: string;
  chars: KanaChar[];
}

export default function KanaReferencePage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Function to filter kana based on search term
  const filterKana = (kanaArray: KanaRow[]) => {
    if (!searchTerm) return kanaArray

    return kanaArray.filter((row) =>
      row.chars.some(
        (char) => char.kana.includes(searchTerm) || char.romaji.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
  }

  // Function to render a kana row
  const renderKanaRow = (row: KanaRow, index: number) => {
    // Skip rendering if all characters in the row are filtered out by search
    if (
      searchTerm &&
      !row.chars.some(
        (char) => char.kana.includes(searchTerm) || char.romaji.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    ) {
      return null
    }

    // Get row label based on the row type
    const getRowLabel = (rowType: string) => {
      switch (rowType) {
        case "vowels":
          return "Vowels"
        case "k":
          return "K-row"
        case "s":
          return "S-row"
        case "t":
          return "T-row"
        case "n":
          return "N-row"
        case "h":
          return "H-row"
        case "m":
          return "M-row"
        case "y":
          return "Y-row"
        case "r":
          return "R-row"
        case "w":
          return "W-row"
        case "g":
          return "G-row"
        case "z":
          return "Z-row"
        case "d":
          return "D-row"
        case "b":
          return "B-row"
        case "p":
          return "P-row"
        case "ky":
          return "KY-row"
        case "sh":
          return "SH-row"
        case "ch":
          return "CH-row"
        case "ny":
          return "NY-row"
        case "hy":
          return "HY-row"
        case "my":
          return "MY-row"
        case "ry":
          return "RY-row"
        case "gy":
          return "GY-row"
        case "j":
          return "J-row"
        case "by":
          return "BY-row"
        case "py":
          return "PY-row"
        case "f":
          return "F-row"
        case "w-ext":
          return "W-extended"
        case "v":
          return "V-row"
        case "foreign":
          return "Foreign sounds"
        case "foreign2":
          return "More foreign sounds"
        default:
          return rowType.toUpperCase()
      }
    }

    return (
      <div key={index} className="mb-6">
        <div className="flex items-center mb-2">
          <div className="text-sm font-medium text-muted-foreground w-20">{getRowLabel(row.row)}</div>
          <div className="h-px flex-1 bg-border"></div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {row.chars.map((char: KanaChar, charIndex: number) => (
            <div
              key={charIndex}
              className={`flex flex-col items-center justify-center border rounded-lg p-3 transition-colors ${char.kana ? "hover:bg-slate-100" : "border-transparent"
                }`}
            >
              {char.kana ? (
                <>
                  <div className="text-2xl font-bold">{char.kana}</div>
                  <div className="text-xs text-muted-foreground">{char.romaji}</div>
                </>
              ) : (
                <div className="text-2xl font-bold text-transparent">　</div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Function to render a kana section
  const renderKanaSection = (title: string, description: string, kanaArray: KanaRow[]) => {
    const filteredKana = filterKana(kanaArray)

    // Skip rendering if all rows in the section are filtered out by search
    if (filteredKana.length === 0) {
      return null
    }

    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">{filteredKana.map((row, index) => renderKanaRow(row, index))}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Hiragana & Katakana Reference</h1>

        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search kana or romaji..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="hiragana" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="hiragana">Hiragana</TabsTrigger>
            <TabsTrigger value="katakana">Katakana</TabsTrigger>
          </TabsList>

          <TabsContent value="hiragana">
            <div className="space-y-8">
              {renderKanaSection(
                "Basic Hiragana",
                "The basic hiragana characters represent the core sounds in Japanese.",
                kanaData.hiragana.basic,
              )}

              {renderKanaSection(
                "Dakuten & Handakuten Hiragana",
                "These are modifications of the basic hiragana with diacritical marks.",
                kanaData.hiragana.dakuten,
              )}

              {renderKanaSection(
                "Combination Hiragana",
                "These are combinations of hiragana that create new sounds.",
                kanaData.hiragana.combinations,
              )}
            </div>
          </TabsContent>

          <TabsContent value="katakana">
            <div className="space-y-8">
              {renderKanaSection(
                "Basic Katakana",
                "Katakana is primarily used for foreign words, loanwords, and emphasis.",
                kanaData.katakana.basic,
              )}

              {renderKanaSection(
                "Dakuten & Handakuten Katakana",
                "Modified katakana with diacritical marks.",
                kanaData.katakana.dakuten,
              )}

              {renderKanaSection(
                "Combination Katakana",
                "Combinations of katakana that create new sounds.",
                kanaData.katakana.combinations,
              )}

              {renderKanaSection(
                "Extended Katakana",
                "Special katakana used for foreign sounds not native to Japanese.",
                kanaData.katakana.extended,
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

