/**
 * Build-time fetcher for the GitHub Releases of insomnius/kanjiverse.
 *
 * Why bake at build time vs fetch at runtime:
 *   - GitHub's unauthenticated API is capped at 60 req/hr per IP. Behind a
 *     CDN that's a single shared bucket; one heavy day on /release-notes
 *     could throttle the whole site.
 *   - The app is local-first and PWA-cached; runtime fetches break offline.
 *   - Release notes change once per release, not per page load — fresh data
 *     is exactly as fresh as the last deploy, which is what users expect.
 *
 *   Run after cutting a release:
 *     bun run scripts/fetch-release-notes.ts
 *     git add data/release-notes.json && git commit
 *
 * The script filters out drafts and prereleases, sorts by published_at
 * descending, and emits a slim JSON keyed for stable diffs.
 */

import { writeFileSync } from "node:fs"
import { join } from "node:path"

const REPO = "insomnius/kanjiverse"
const OUT = join(__dirname, "..", "data", "release-notes.json")

interface GitHubRelease {
  tag_name: string
  name: string | null
  published_at: string | null
  draft: boolean
  prerelease: boolean
  body: string | null
  html_url: string
}

interface ReleaseEntry {
  tag: string
  title: string
  publishedAt: string
  body: string
  htmlUrl: string
}

async function main(): Promise<void> {
  const url = `https://api.github.com/repos/${REPO}/releases?per_page=100`
  console.log(`Fetching ${url}…`)

  // GitHub recommends an Accept header pinned to the v3 API; helps with
  // forward-compatibility when GitHub rotates the default.
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  // Local dev convenience: pass GITHUB_TOKEN through the env to avoid the
  // 60 req/hr unauthenticated cap when iterating on this script.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(url, { headers })
  if (!res.ok) {
    throw new Error(`GitHub API returned HTTP ${res.status}: ${await res.text()}`)
  }
  const all = (await res.json()) as GitHubRelease[]

  const entries: ReleaseEntry[] = all
    .filter((r) => !r.draft && !r.prerelease)
    .map((r) => ({
      tag: r.tag_name,
      title: r.name ?? r.tag_name,
      publishedAt: r.published_at ?? "",
      body: r.body ?? "",
      htmlUrl: r.html_url,
    }))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))

  const payload = {
    _: {
      source: `https://github.com/${REPO}/releases`,
      generatedAt: new Date().toISOString(),
      generatedBy: "scripts/fetch-release-notes.ts",
    },
    releases: entries,
  }

  writeFileSync(OUT, JSON.stringify(payload, null, 2))
  const size = Bun.file(OUT).size
  console.log(`\n→ ${OUT}`)
  console.log(`  ${entries.length} releases, ${(size / 1024).toFixed(1)} KB`)
}

void main().catch((err) => {
  console.error(err)
  process.exit(1)
})
