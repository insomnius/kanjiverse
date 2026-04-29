// Cloudflare geo signal — read the cf_country cookie that nginx mirrors from
// $http_cf_ipcountry. Used once on first hydrate to pick a default locale when
// the user hasn't chosen one yet. After the first explicit setLocale (or
// auto-derived persistence below), the IndexedDB profile takes over.

import type { Locale } from "./progress/store"

const COUNTRY_COOKIE = "cf_country"

function readCountryCookie(): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COUNTRY_COOKIE}=([^;]+)`))
  if (!match) return null
  const value = match[1].trim().toUpperCase()
  // Cloudflare uses ISO 3166-1 alpha-2 (e.g. "ID", "US"). "XX" or "T1" appear
  // for unknowns / Tor — treat anything outside our allowlist as "unknown".
  return /^[A-Z]{2}$/.test(value) ? value : null
}

const ID_DEFAULT_COUNTRIES = new Set(["ID"])

/** Returns the locale we'd default to based on Cloudflare geo, or null if we
 *  don't have a signal. Caller is responsible for only applying this when the
 *  user has no persisted locale. */
export function geoDefaultLocale(): Locale | null {
  const country = readCountryCookie()
  if (!country) return null
  return ID_DEFAULT_COUNTRIES.has(country) ? "id" : "en"
}
