import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JLPT Vocabulary List - Comprehensive Reference by Level",
  description:
    "Browse a comprehensive list of JLPT vocabulary organized by level (N1-N5). Search by word, meaning, or pronunciation with our interactive reference tool.",
  keywords: [
    "JLPT vocabulary",
    "Japanese vocabulary",
    "vocab list",
    "N1 vocabulary",
    "N2 vocabulary",
    "N3 vocabulary",
    "N4 vocabulary",
    "N5 vocabulary",
    "Japanese words",
    "vocabulary reference",
  ],
  alternates: {
    canonical: "/vocab-list",
  },
  openGraph: {
    title: "JLPT Vocabulary List - Comprehensive Reference by Level",
    description:
      "Browse a comprehensive list of JLPT vocabulary organized by level (N1-N5). Search by word, meaning, or pronunciation with our interactive reference tool.",
    url: "/vocab-list",
    images: [
      {
        url: "/og-vocab-list.png",
        width: 1200,
        height: 630,
        alt: "JLPT Vocabulary List Reference",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JLPT Vocabulary List - Comprehensive Reference by Level",
    description:
      "Browse a comprehensive list of JLPT vocabulary organized by level (N1-N5). Search by word, meaning, or pronunciation with our interactive reference tool.",
    images: ["/og-vocab-list.png"],
  },
}

