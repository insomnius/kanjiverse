import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kana Quiz - Test Your Hiragana and Katakana Knowledge",
  description:
    "Practice your Japanese hiragana and katakana recognition with our interactive quiz. Test your knowledge of Japanese writing systems with multiple choice questions.",
  keywords: [
    "hiragana quiz",
    "katakana quiz",
    "kana practice",
    "Japanese alphabet quiz",
    "learn hiragana",
    "learn katakana",
    "Japanese writing practice",
    "kana test",
  ],
  alternates: {
    canonical: "/kana-quiz",
  },
  openGraph: {
    title: "Kana Quiz - Test Your Hiragana and Katakana Knowledge",
    description:
      "Practice your Japanese hiragana and katakana recognition with our interactive quiz. Test your knowledge of Japanese writing systems with multiple choice questions.",
    url: "/kana-quiz",
    images: [
      {
        url: "/og-kana-quiz.png",
        width: 1200,
        height: 630,
        alt: "Japanese Kana Quiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kana Quiz - Test Your Hiragana and Katakana Knowledge",
    description:
      "Practice your Japanese hiragana and katakana recognition with our interactive quiz. Test your knowledge of Japanese writing systems with multiple choice questions.",
    images: ["/og-kana-quiz.png"],
  },
}

