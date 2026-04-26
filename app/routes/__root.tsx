import { createRootRoute, HeadContent, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { MainNav } from '@/components/navigation/main-nav'

const SITE_NAME = 'Kanji by Insomnius'
const SITE_URL = 'https://kanji.insomnius.dev'
const DEFAULT_TITLE = 'Kanji by Insomnius — Interactive Japanese Kanji & Vocabulary Quiz'
const DEFAULT_DESCRIPTION =
  'Practice Japanese with interactive JLPT-level quizzes (N1–N5). Drill kanji, vocabulary, hiragana, and katakana with quick-feedback questions and full reference tables.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/kv.png`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: DEFAULT_TITLE },
      { name: 'description', content: DEFAULT_DESCRIPTION },
      {
        name: 'keywords',
        content:
          'Japanese quiz, JLPT practice, kanji quiz, vocabulary quiz, hiragana, katakana, Japanese learning, language practice',
      },
      { name: 'theme-color', content: '#1a1815' },
      { name: 'application-name', content: SITE_NAME },
      { name: 'apple-mobile-web-app-title', content: 'Kanji' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: DEFAULT_TITLE },
      { property: 'og:description', content: DEFAULT_DESCRIPTION },
      { property: 'og:image', content: DEFAULT_OG_IMAGE },
      { property: 'og:image:width', content: '500' },
      { property: 'og:image:height', content: '500' },
      { property: 'og:image:alt', content: 'Kanji by Insomnius — the 漢字 mark' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:url', content: SITE_URL },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: DEFAULT_TITLE },
      { name: 'twitter:description', content: DEFAULT_DESCRIPTION },
      { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
      { name: 'twitter:image:alt', content: 'Kanji by Insomnius — the 漢字 mark' },
    ],
  }),
  component: () => (
    <>
      <HeadContent />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow focus:ring-2 focus:ring-vermilion"
      >
        Skip to main content
      </a>
      <MainNav />
      <main id="main" className="min-h-screen pt-8 px-4 pb-16">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  ),
})
