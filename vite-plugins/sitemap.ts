import type { Plugin } from "vite"

interface SitemapEntry {
  loc: string
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}

interface SitemapOptions {
  base: string
  staticRoutes: SitemapEntry[]
  dynamicRoutes: () => SitemapEntry[] | Promise<SitemapEntry[]>
}

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")

const renderUrl = (e: SitemapEntry, base: string) => {
  const loc = e.loc.startsWith("http") ? e.loc : `${base}${e.loc}`
  const parts = [`    <loc>${escapeXml(loc)}</loc>`]
  if (e.changefreq) parts.push(`    <changefreq>${e.changefreq}</changefreq>`)
  if (typeof e.priority === "number") parts.push(`    <priority>${e.priority.toFixed(1)}</priority>`)
  return `  <url>\n${parts.join("\n")}\n  </url>`
}

export default function sitemapPlugin(options: SitemapOptions): Plugin {
  return {
    name: "kanji-sitemap",
    apply: "build",
    async generateBundle() {
      const base = options.base.replace(/\/$/, "")
      const dynamic = await options.dynamicRoutes()
      const all = [...options.staticRoutes, ...dynamic]
      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        all.map((e) => renderUrl(e, base)).join("\n") +
        `\n</urlset>\n`
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: xml,
      })
    },
  }
}
