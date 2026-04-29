import { useEffect } from 'react'
import { createRootRoute, HeadContent, Link, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { MainNav } from '@/components/navigation/main-nav'
import { MilestoneToast } from '@/components/milestone-toast'
import { useTranslation } from '@/lib/i18n/use-translation'
// Vite resolves these to content-hashed URLs at build time. Importing as `?url` lets us preload
// them with the right hash baked in — the alternative (declaring them in index.html) goes stale
// every build.
import newsreaderRomanUrl from '@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2?url'
import newsreaderItalicUrl from '@fontsource-variable/newsreader/files/newsreader-latin-opsz-italic.woff2?url'

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
  component: RootComponent,
})

function RootComponent() {
  const { locale, t } = useTranslation()

  // Sync <html lang> to active locale so screen readers + spell-checkers and
  // any user-style sheets respond correctly when the user toggles ID.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
    }
  }, [locale])

  return (
    <>
      <HeadContent />
      {/* React 19 hoists these <link>s to <head>. They start the woff2 fetch in parallel with
          the main bundle, so by the time globals.css declares the @font-face the bytes are
          already on the wire. */}
      <link rel="preload" as="font" type="font/woff2" href={newsreaderRomanUrl} crossOrigin="anonymous" />
      <link rel="preload" as="font" type="font/woff2" href={newsreaderItalicUrl} crossOrigin="anonymous" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow focus:ring-2 focus:ring-vermilion"
      >
        {t("nav.skipToMain")}
      </a>
      <MainNav />
      <MilestoneToast />
      <main id="main" className="min-h-screen pt-8 px-4 pb-16">
        <Outlet />
      </main>
      <footer className="border-t border-sumi/10 bg-cream/60 mt-8" role="contentinfo">
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="https://insomnius.dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("footer.builtBy.aria")}
            className="group inline-flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:rounded-sm"
          >
            <img
              src="/insomnius-logo.webp"
              alt=""
              width={24}
              height={24}
              loading="lazy"
              decoding="async"
              className="h-6 w-6 rounded-sm"
            />
            <span className="font-display italic text-sm text-sumi/70 group-hover:text-vermilion-deep transition-colors motion-reduce:transition-none">
              {t("footer.builtBy")}
            </span>
          </a>
          <div className="flex flex-col sm:items-end gap-1">
            <p className="font-display italic text-xs text-sumi/70 text-center sm:text-right">
              {t("footer.tagline")}
            </p>
            <Link
              to="/credits"
              className="font-display italic text-xs text-sumi/70 hover:text-vermilion-deep transition-colors motion-reduce:transition-none outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:rounded-sm"
            >
              {t("footer.credits")}
            </Link>
          </div>
        </div>
      </footer>
      <ScrollRestoration />
    </>
  )
}
