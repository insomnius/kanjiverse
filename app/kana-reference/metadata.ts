import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hiragana & Katakana Reference - Complete Japanese Kana Charts",
  description:
    "Complete reference charts for Hiragana and Katakana, including basic characters, dakuten, handakuten, and combinations. Search and learn Japanese kana with our interactive tool.",
  keywords: [
    "hiragana",
    "katakana",
    "Japanese kana",
    "kana chart",
    "hiragana chart",
    "katakana chart",
    "Japanese alphabet",
    "Japanese writing",
    "kana reference",
    "learn hiragana",
    "learn katakana",
  ],
  alternates: {
    canonical: "/kana-reference",
  },
  openGraph: {
    title: "Hiragana & Katakana Reference - Complete Japanese Kana Charts",
    description:
      "Complete reference charts for Hiragana and Katakana, including basic characters, dakuten, handakuten, and combinations. Search and learn Japanese kana with our interactive tool.",
    url: "/kana-reference",
    images: [
      {
        url: "/og-kana-reference.png",
        width: 1200,
        height: 630,
        alt: "Japanese Kana Reference Charts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiragana & Katakana Reference - Complete Japanese Kana Charts",
    description:
      "Complete reference charts for Hiragana and Katakana, including basic characters, dakuten, handakuten, and combinations. Search and learn Japanese kana with our interactive tool.",
    images: ["/og-kana-reference.png"],
  },
}

