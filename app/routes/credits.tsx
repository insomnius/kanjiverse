import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import dataLicenses from "@/data/data-licenses.json"

interface DataSource {
  id: string
  description: string
  license: string
  url?: string
  redistributedAs?: string
  attribution: string
  note?: string
}

interface DataLicensesFile {
  $comment?: string
  sources: DataSource[]
}

const sources = (dataLicenses as DataLicensesFile).sources

function CreditsPage() {
  return (
    <div className="py-6 sm:py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-sumi tracking-tight mb-1">
            Credits
          </h1>
          <p className="font-display italic text-sumi/70 text-base">
            The data and typography this app stands on, with full attribution.
          </p>
        </header>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium">
              Data sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              {sources.map((s) => (
                <li key={s.id} className="border-l-2 border-vermilion/40 pl-4">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h2 className="font-display text-base text-sumi font-semibold">
                      {s.id}
                    </h2>
                    <Badge variant="outline" className="font-mono text-[10px] py-0 px-1.5 font-normal border-sumi/20">
                      {s.license}
                    </Badge>
                  </div>
                  <p className="text-sm text-sumi/80 mb-1.5">{s.description}</p>
                  <p className="text-xs text-sumi/70">
                    <span className="font-display italic">Attribution:</span>{" "}
                    {s.attribution}
                  </p>
                  {s.url && (
                    <p className="text-xs mt-1">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${s.id} upstream source (opens in new tab)`}
                        className="inline-flex items-center gap-1 text-sumi/70 hover:text-vermilion-deep transition-colors motion-reduce:transition-none"
                      >
                        Source
                        <ExternalLink aria-hidden="true" className="h-3 w-3" />
                      </a>
                    </p>
                  )}
                  {s.note && (
                    <p className="font-display italic text-xs text-sumi/70 mt-1.5">
                      {s.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl text-sumi font-medium">
              About licenses on this page
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-sumi/80">
            <p>
              This site bundles or runtime-fetches each of the data sources above. Permissive licenses (MIT, ISC, Apache, BSD, OFL, CC0, CC&nbsp;BY) only require attribution, which this page provides. Share-alike licenses (CC&nbsp;BY-SA) additionally require that any redistributed derivative of the data file remain under the same license — our shipped <code className="font-mono text-xs">data/kanji-radicals.json</code> stays CC&nbsp;BY-SA&nbsp;4.0.
            </p>
            <p className="font-display italic text-xs text-sumi/70">
              The site source itself is private; this page exists to satisfy attribution obligations and answer &ldquo;where did this data come from?&rdquo; for curious users.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const PAGE_TITLE = "Credits & data sources · Kanji by Insomnius"
const PAGE_DESCRIPTION =
  "Attribution and licensing for every third-party data source and typeface used in Kanji by Insomnius."

export const Route = createFileRoute("/credits")({
  component: CreditsPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: "https://kanji.insomnius.dev/credits" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://kanji.insomnius.dev/credits" }],
  }),
})
