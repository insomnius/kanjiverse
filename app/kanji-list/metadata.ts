import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JLPT Kanji List - Comprehensive Reference by Level",
  description:
    "Browse a comprehensive list of JLPT kanji organized by level (N1-N5). Search by kanji, meaning, or pronunciation with our interactive reference tool.",
  keywords: [
    "JLPT kanji",
    "kanji list",
    "Japanese kanji",
    "N1 kanji",
    "N2 kanji",
    "N3 kanji",
    "N4 kanji",
    "N5 kanji",
    "kanji reference",
    "kanji search",
  ],
  alternates: {
    canonical: "/kanji-list",
  },
  openGraph: {
    title: "JLPT Kanji List - Comprehensive Reference by Level",
    description:
      "Browse a comprehensive list of JLPT kanji organized by level (N1-N5). Search by kanji, meaning, or pronunciation with our interactive reference tool.",
    url: "/kanji-list",
    images: [
      {
        url: "/og-kanji-list.png",
        width: 1200,
        height: 630,
        alt: "JLPT Kanji List Reference",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JLPT Kanji List - Comprehensive Reference by Level",
    description:
      "Browse a comprehensive list of JLPT kanji organized by level (N1-N5). Search by kanji, meaning, or pronunciation with our interactive reference tool.",
    images: ["/og-kanji-list.png"],
  },
}

