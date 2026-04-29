"use client"

import { useTranslation } from "@/lib/i18n/use-translation"

interface Props {
  className?: string
}

/**
 * Single source of truth for OS- and browser-specific Japanese-voice install
 * copy. Used by the /quiz first-run install card AND the Profile pronunciation
 * panel — keeping the same wording in both places, so a user who sees
 * instructions on /quiz and goes to /profile to confirm doesn't read different
 * steps.
 *
 * Two-step structure:
 *   Step 1 — install the voice at the OS level (per OS).
 *   Step 2 — browser-specific notes (per browser).
 *
 * Mobile is in its own section because the install path is engine-driven and
 * doesn't vary by browser app.
 */
export function JpVoiceInstallInstructions({ className }: Props) {
  const { t } = useTranslation()
  return (
    <div className={className}>
      <p className="font-display italic text-xs text-sumi/70 mb-3">
        {t("install.intro")}
      </p>

      {/* ─── DESKTOP ─── */}
      <p className="font-display text-xs font-semibold text-sumi mb-1.5 not-italic uppercase tracking-wide">
        {t("install.section.desktopStep1")}
      </p>
      <dl className="space-y-2 mb-4">
        <div>
          <dt className="font-display text-sm font-semibold text-sumi not-italic">{t("install.os.macos")}</dt>
          <dd className="text-xs text-sumi/80 leading-snug mt-0.5">
            {t("install.os.macos.steps")}
          </dd>
        </div>
        <div>
          <dt className="font-display text-sm font-semibold text-sumi not-italic">{t("install.os.windows")}</dt>
          <dd className="text-xs text-sumi/80 leading-snug mt-0.5">
            {t("install.os.windows.steps")}
          </dd>
        </div>
        <div>
          <dt className="font-display text-sm font-semibold text-sumi not-italic">{t("install.os.linux")}</dt>
          <dd className="text-xs text-sumi/80 leading-snug mt-0.5">
            {t("install.os.linux.steps.prefix")}{" "}
            <code className="font-mono not-italic text-sumi">sudo apt install espeak-ng mbrola-jp1</code>;{" "}
            {t("install.os.linux.steps.fedora")}{" "}
            <code className="font-mono not-italic text-sumi">sudo dnf install espeak-ng</code>;{" "}
            {t("install.os.linux.steps.arch")}{" "}
            <code className="font-mono not-italic text-sumi">sudo pacman -S espeak-ng</code>.
          </dd>
        </div>
        <div>
          <dt className="font-display text-sm font-semibold text-sumi not-italic">{t("install.os.chromeos")}</dt>
          <dd className="text-xs text-sumi/80 leading-snug mt-0.5">
            {t("install.os.chromeos.steps")}
          </dd>
        </div>
      </dl>

      <p className="font-display text-xs font-semibold text-sumi mb-1.5 not-italic uppercase tracking-wide">
        {t("install.section.desktopStep2")}
      </p>
      <dl className="space-y-2 mb-4">
        <div>
          <dt className="font-display text-sm font-semibold text-sumi not-italic">
            {t("install.browser.chromium")} <span className="font-normal text-sumi/70">{t("install.browser.chromium.suffix")}</span>
          </dt>
          <dd className="text-xs text-sumi/80 leading-snug mt-0.5">
            {t("install.browser.chromium.body", { url: "chrome://settings/?search=text-to-speech" })}
          </dd>
        </div>
        <div>
          <dt className="font-display text-sm font-semibold text-sumi not-italic">{t("install.browser.edge")}</dt>
          <dd className="text-xs text-sumi/80 leading-snug mt-0.5">
            {t("install.browser.edge.body")}
          </dd>
        </div>
        <div>
          <dt className="font-display text-sm font-semibold text-sumi not-italic">{t("install.browser.firefox")}</dt>
          <dd className="text-xs text-sumi/80 leading-snug mt-0.5">
            {t("install.browser.firefox.body")}
          </dd>
        </div>
        <div>
          <dt className="font-display text-sm font-semibold text-sumi not-italic">{t("install.browser.safari")} <span className="font-normal text-sumi/70">{t("install.browser.safari.suffix")}</span></dt>
          <dd className="text-xs text-sumi/80 leading-snug mt-0.5">
            {t("install.browser.safari.body")}
          </dd>
        </div>
      </dl>

      {/* ─── MOBILE ─── */}
      <p className="font-display text-xs font-semibold text-sumi mb-1.5 not-italic uppercase tracking-wide">
        {t("install.section.mobile")}
      </p>
      <dl className="space-y-2 mb-3">
        <div>
          <dt className="font-display text-sm font-semibold text-sumi not-italic">
            {t("install.os.ios")} <span className="font-normal text-sumi/70">{t("install.os.ios.suffix")}</span>
          </dt>
          <dd className="text-xs text-sumi/80 leading-snug mt-0.5">
            {t("install.os.ios.steps")}
          </dd>
        </div>
        <div>
          <dt className="font-display text-sm font-semibold text-sumi not-italic">
            {t("install.os.android")} <span className="font-normal text-sumi/70">{t("install.os.android.suffix")}</span>
          </dt>
          <dd className="text-xs text-sumi/80 leading-snug mt-0.5">
            {t("install.os.android.steps")}
          </dd>
        </div>
      </dl>

      <p className="font-display italic text-xs text-sumi/70 leading-snug">
        {t("install.outro")}
      </p>
    </div>
  )
}
