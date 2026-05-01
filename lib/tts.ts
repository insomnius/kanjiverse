"use client"

/**
 * Native Web Speech API wrapper for Japanese pronunciation.
 *
 * Why no third-party TTS:
 *   - Zero asset weight — the user's OS provides the voice.
 *   - No API keys, no server, no per-character cost. Fits the local-first promise.
 *   - Works offline once the OS voice is installed.
 *
 * The catch: voice availability is OS-dependent. macOS / iOS / Windows / most Android
 * builds ship a Japanese voice; Linux often does not. Callers should gate their UI
 * on `hasJapaneseVoice()` so users on systems without one don't see a button that
 * appears to do nothing.
 *
 * Honors `prefers-reduced-motion` (we treat motion preference as "keep things still
 * and quiet" — same convention as lib/sounds.ts) AND a user-settable mute flag stored
 * on Profile. Always degrades silently — Web Speech failures never throw.
 */

// Why fully lazy: Safari (especially iOS and private browsing) crashes or
// throws when speechSynthesis is touched at module-evaluation time. Every API
// access is wrapped in try/catch and deferred until first call from a user
// gesture, where Safari is most permissive.
function getSynth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null
  try {
    return "speechSynthesis" in window ? window.speechSynthesis : null
  } catch {
    return null
  }
}

let cachedVoices: SpeechSynthesisVoice[] = []
let initialized = false
const voiceListeners = new Set<() => void>()

function refreshVoices(): void {
  const synth = getSynth()
  if (!synth) return
  try {
    const next = synth.getVoices()
    if (next.length > 0) {
      cachedVoices = next
      voiceListeners.forEach((fn) => fn())
    }
  } catch {
    /* Safari content-blocker / private-mode quirk — swallow */
  }
}

function ensureInit(): void {
  if (initialized) return
  initialized = true
  const synth = getSynth()
  if (!synth) return
  try {
    refreshVoices()
    // Chrome populates voices asynchronously; the event fires when ready.
    // Safari sometimes throws when adding this listener — guard the call.
    synth.addEventListener?.("voiceschanged", refreshVoices)
  } catch {
    /* swallow — degrade silently */
  }
}

/** Subscribe to voice-list changes. Returns an unsubscribe fn. Useful for components
 *  that need to hide/show their TTS button once we know whether a JP voice exists. */
export function subscribeVoices(fn: () => void): () => void {
  ensureInit()
  voiceListeners.add(fn)
  return () => voiceListeners.delete(fn)
}

export function isTtsSupported(): boolean {
  return getSynth() !== null
}

/** Pick the best Japanese voice we can find. Returns null if none is installed. */
export function getJapaneseVoice(): SpeechSynthesisVoice | null {
  ensureInit()
  if (cachedVoices.length === 0) refreshVoices()
  // Exact ja-JP first, then any ja* (covers some platforms that report just "ja").
  return (
    cachedVoices.find((v) => v.lang === "ja-JP") ??
    cachedVoices.find((v) => v.lang.startsWith("ja")) ??
    null
  )
}

export function hasJapaneseVoice(): boolean {
  return getJapaneseVoice() !== null
}

function shouldRespectReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    return false
  }
}

export interface SpeakOptions {
  /** 0.1–10, default 0.9 (slightly slower than natural for learners). */
  rate?: number
  /** 0–2, default 1. */
  pitch?: number
  /** 0–1, default 1. */
  volume?: number
}

/**
 * Speak a Japanese string using the user's OS voice. Cancels any in-flight utterance
 * first so rapid taps don't queue up. No-op when:
 *   - the API isn't available
 *   - prefers-reduced-motion is set
 *   - no Japanese voice is installed
 *
 * Must be called from a user gesture (click/tap handler) — browsers reject autoplay.
 */
export function speakJapanese(text: string, opts: SpeakOptions = {}): void {
  const synth = getSynth()
  if (!synth) return
  if (shouldRespectReducedMotion()) return
  if (!text) return
  // Safari hard-crashes on very long utterances. The longest legitimate caller
  // (vocab examples) sits well under this; truncate defensively.
  const safeText = text.length > 200 ? text.slice(0, 200) : text

  const voice = getJapaneseVoice()
  if (!voice) return

  // Chrome occasionally locks up speechSynthesis if a previous utterance is still
  // pending — a defensive cancel keeps the queue clean. Safari crashes if cancel
  // is called while nothing is speaking on some versions, so guard on speaking.
  try {
    if (synth.speaking || synth.pending) synth.cancel()
  } catch {
    /* ignore */
  }

  try {
    const utterance = new SpeechSynthesisUtterance(safeText)
    utterance.lang = "ja-JP"
    utterance.voice = voice
    utterance.rate = opts.rate ?? 0.9
    utterance.pitch = opts.pitch ?? 1
    utterance.volume = opts.volume ?? 1
    synth.speak(utterance)
  } catch {
    /* swallow — TTS is a nicety, not load-bearing */
  }
}

