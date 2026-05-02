import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import releaseNotesData from "@/data/release-notes.json"
import ReleaseNotesMarkdown from "@/components/release-notes-markdown"
import { useTranslation } from "@/lib/i18n/use-translation"

interface ReleaseEntry {
  tag: string
  title: string
  publishedAt: string
  body: string
  htmlUrl: string
}

interface ReleaseNotesFile {
  _?: { source?: string; generatedAt?: string }
  releases: ReleaseEntry[]
}

const data = releaseNotesData as ReleaseNotesFile
const releases = data.releases
const lastGeneratedAt = data._?.generatedAt ?? null

function formatDate(iso: string, locale: "en" | "id"): string {
  if (!iso) return ""
  try {
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function ReleaseNotesPage() {
  const { t, locale } = useTranslation()
  return (
    <div className="py-6 sm:py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight mb-1">
            {t("releaseNotes.title")}
          </h1>
          <p className="font-display italic text-sumi/70 text-base">
            {t("releaseNotes.subtitle")}
          </p>
        </header>

        {releases.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-sm text-sumi/70 italic" role="status">
              {t("releaseNotes.empty")}
            </CardContent>
          </Card>
        ) : (
          <ol className="space-y-6">
            {releases.map((r, idx) => (
              <li key={r.tag}>
                <Card className={idx === 0 ? "border-vermilion/30 shadow-[0_4px_18px_-6px_rgba(168,124,47,0.15)]" : undefined}>
                  <CardContent className="pt-6">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h2 className="font-display text-xl sm:text-2xl text-sumi font-medium tracking-tight">
                          {r.title}
                        </h2>
                        {idx === 0 && (
                          <Badge className="bg-vermilion-deep text-white hover:bg-vermilion-deep">
                            {t("releaseNotes.latest")}
                          </Badge>
                        )}
                      </div>
                      <a
                        href={r.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("releaseNotes.source.aria", { tag: r.tag })}
                        className="inline-flex items-center gap-1 text-xs font-display italic text-sumi/70 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
                      >
                        {t("releaseNotes.source.label")}
                        <ExternalLink aria-hidden="true" className="h-3 w-3" />
                      </a>
                    </div>
                    <p className="font-display italic text-xs text-sumi/70 mb-4">
                      <time dateTime={r.publishedAt}>{formatDate(r.publishedAt, locale)}</time>
                      {" · "}
                      <span className="font-mono not-italic">{r.tag}</span>
                    </p>
                    <ReleaseNotesMarkdown body={r.body} />
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        )}

        <p className="mt-6 font-display italic text-xs text-sumi/55 text-center">
          {t("releaseNotes.fromGitHub")}
          {lastGeneratedAt && ` · ${t("releaseNotes.lastSynced", { when: formatDate(lastGeneratedAt, locale) })}`}
        </p>
      </div>
    </div>
  )
}

const PAGE_TITLE = "Release notes · Kanji by Insomnius"
const PAGE_DESCRIPTION =
  "Every Kanji by Insomnius release with what changed and why — pulled from the project's GitHub releases."

export const Route = createFileRoute("/release-notes")({
  component: ReleaseNotesPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: "https://kanji.insomnius.dev/release-notes" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://kanji.insomnius.dev/release-notes" }],
  }),
})
