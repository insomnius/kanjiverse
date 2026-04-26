import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from "path"
import sitemapPlugin from "./vite-plugins/sitemap"

const SITE_URL = "https://kanji.insomnius.dev"

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true, routesDirectory: './app/routes', generatedRouteTree: './app/routeTree.gen.ts' }),
    react(),
    sitemapPlugin({
      base: SITE_URL,
      staticRoutes: [
        { loc: "/", changefreq: "weekly", priority: 1.0 },
        { loc: "/quiz", changefreq: "weekly", priority: 0.9 },
        { loc: "/kana-quiz", changefreq: "weekly", priority: 0.8 },
        { loc: "/draw", changefreq: "weekly", priority: 0.8 },
        { loc: "/draw-search", changefreq: "weekly", priority: 0.8 },
        { loc: "/kanji-list", changefreq: "monthly", priority: 0.8 },
        { loc: "/vocab-list", changefreq: "monthly", priority: 0.8 },
        { loc: "/kana-reference", changefreq: "monthly", priority: 0.7 },
      ],
      dynamicRoutes: async () => {
        const [{ kanjiData }, { vocabularyData }, { kanaData }] = await Promise.all([
          import("./data/kanji-data"),
          import("./data/vocabulary-data"),
          import("./data/kana-data"),
        ])
        const entries: { loc: string; changefreq: "monthly"; priority: number }[] = []

        for (const level of Object.keys(kanjiData)) {
          for (const k of kanjiData[level as keyof typeof kanjiData]) {
            entries.push({
              loc: `/kanji/${encodeURIComponent(k.kanji)}`,
              changefreq: "monthly",
              priority: 0.6,
            })
          }
        }
        for (const level of Object.keys(vocabularyData)) {
          for (const v of vocabularyData[level as keyof typeof vocabularyData]) {
            entries.push({
              loc: `/vocab/${encodeURIComponent(v.word)}`,
              changefreq: "monthly",
              priority: 0.5,
            })
          }
        }
        for (const script of ["hiragana", "katakana"] as const) {
          for (const sectionKey of Object.keys(kanaData[script])) {
            const section = kanaData[script][sectionKey as keyof typeof kanaData.hiragana]
            for (const row of section) {
              for (const c of row.chars) {
                if (c.kana) {
                  entries.push({
                    loc: `/kana/${encodeURIComponent(c.kana)}`,
                    changefreq: "yearly" as never,
                    priority: 0.4,
                  })
                }
              }
            }
          }
        }
        return entries
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Kanji by Insomnius",
        short_name: "Kanji",
        description:
          "Practice Japanese with interactive JLPT-level quizzes (N1–N5). Drill kanji, vocabulary, hiragana, and katakana — all in your browser.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        background_color: "#faf6ed",
        theme_color: "#1a1815",
        lang: "en",
        categories: ["education", "books", "productivity"],
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "/icons/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
          { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest,xml,txt,woff2}"],
        // Don't precache the heavy kanji-data chunk — runtime cache it instead so first visit isn't slowed down by 1.2MB.
        globIgnores: ["**/kanji-data-*.js"],
        cleanupOutdatedCaches: true,
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/, /^\/manifest\.webmanifest$/],
        runtimeCaching: [
          {
            // Hanzi-writer fetches stroke data from this CDN at runtime. Cache it for offline.
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/npm\/hanzi-writer-data/,
            handler: "CacheFirst",
            options: {
              cacheName: "hanzi-writer-data",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Lazy-loaded kanji-data chunk: cache once fetched.
            urlPattern: /\/assets\/kanji-data-.*\.js$/,
            handler: "CacheFirst",
            options: {
              cacheName: "kanji-data",
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep heavy data files in their own chunks for lazy loading.
          if (id.includes("raw-kanji-data.json")) return "kanji-data"
          if (id.includes("vocabulary-data")) return "vocabulary-data"
          if (id.includes("kana-data")) return "kana-data"
          // Group React + router into a stable vendor chunk so it caches across deploys.
          if (id.includes("node_modules/react") || id.includes("node_modules/scheduler")) return "react-vendor"
          if (id.includes("@tanstack/react-router")) return "router-vendor"
          if (id.includes("@radix-ui/")) return "radix-vendor"
        },
      },
    },
  },
})
