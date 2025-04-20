import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MainNav } from "@/components/navigation/main-nav"
import GoogleAnalytics from "@/components/google-analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Kanjiverse",
    template: "%s | Kanjiverse",
  },
  description:
    "Learn Japanese kanji and vocabulary with JLPT levels N1-N5. Practice with interactive quizzes and reference materials.",
  keywords: [
    "Japanese",
    "JLPT",
    "kanji",
    "vocabulary",
    "language learning",
    "hiragana",
    "katakana",
    "quiz",
    "N1",
    "N2",
    "N3",
    "N4",
    "N5",
  ],
  authors: [{ name: "Kanjiverse" }],
  creator: "Kanjiverse",
  publisher: "Kanjiverse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kanjiverse.insomnius.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kanjiverse",
    description:
      "Learn Japanese kanji and vocabulary with JLPT levels N1-N5. Practice with interactive quizzes and reference materials.",
    url: "https://kanjiverse.insomnius.dev",
    siteName: "Kanjiverse",
    images: [
      {
        url: "/kv.png",
        width: 1200,
        height: 630,
        alt: "Kanjiverse",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanjiverse",
    description:
      "Learn Japanese kanji and vocabulary with JLPT levels N1-N5. Practice with interactive quizzes and reference materials.",
    images: ["/kv.png"],
    creator: "@insomnius_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/kv.png",
    apple: "/kv.png",
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "education",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <MainNav />
        <main className="min-h-screen bg-slate-50 pt-8 px-4 pb-16">
          {children}
        </main>
      </body>
    </html>
  )
}

