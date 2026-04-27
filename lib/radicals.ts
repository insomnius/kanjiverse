"use client"

/**
 * Lazy loader for the radical / component decomposition map.
 *
 * Source: KRADFILE (CC BY-SA 4.0) — see data/data-licenses.json. Our shipped
 * file is the trimmed JSON output of scripts/build-radicals.ts; ~60 KB raw,
 * ~15 KB gzipped, in its own chunk so the kanji-detail bundle stays small
 * for users who don't open a Parts section.
 */

let promise: Promise<Record<string, string[]>> | null = null

export function loadRadicals(): Promise<Record<string, string[]>> {
  if (!promise) {
    promise = import("@/data/kanji-radicals.json").then(
      (m) => (m.default ?? m) as unknown as Record<string, string[]>,
    )
  }
  return promise
}

/** Returns the components for `char`, or [] if no entry exists. */
export async function getRadicals(char: string): Promise<string[]> {
  const map = await loadRadicals()
  return map[char] ?? []
}
