import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kanjiverse - Interactive Kanji and Vocabulary Quiz",
  description:
    "Practice Japanese with interactive JLPT-level quizzes. Test your knowledge of kanji and vocabulary with our engaging learning tools.",
  keywords: [
    "Japanese quiz",
    "JLPT practice",
    "kanji quiz",
    "vocabulary quiz",
    "Japanese learning",
    "interactive Japanese",
    "language practice",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kanjiverse - Interactive Kanji and Vocabulary Quiz",
    description:
      "Practice Japanese with interactive JLPT-level quizzes. Test your knowledge of kanji and vocabulary with our engaging learning tools.",
    url: "/",
    images: [
      {
        url: "/og-quiz.png",
        width: 1200,
        height: 630,
        alt: "Japanese Quiz App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanjiverse - Interactive Kanji and Vocabulary Quiz",
    description:
      "Practice Japanese with interactive JLPT-level quizzes. Test your knowledge of kanji and vocabulary with our engaging learning tools.",
    images: ["/og-quiz.png"],
  },
}

