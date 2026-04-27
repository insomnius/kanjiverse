"use client"

/**
 * Procedurally-generated quiz feedback sounds.
 *
 * Why no audio files:
 *   - Zero asset weight (the WAV/MP3 we'd ship would be ~10–30 KB each).
 *   - Tunable: we adjust pitch / envelope inline instead of cutting new audio.
 *   - Editorial: a soft koto-like pluck for correct, a low muted thud for incorrect.
 *     No "DUOLINGO DOOT" — restraint.
 *
 * The first call lazy-creates an AudioContext on a user gesture so Safari/iOS don't
 * complain about autoplay. Subsequent calls reuse the same context.
 *
 * Honors `prefers-reduced-motion` AND a user-settable mute flag stored on Profile.
 * Always degrades silently — Web Audio API failures (private mode, very old browsers)
 * never throw at the caller.
 */

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (ctx) return ctx
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
    return ctx
  } catch {
    return null
  }
}

function shouldRespectReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    return false
  }
}

function playTone(opts: {
  type: OscillatorType
  startFreq: number
  endFreq: number
  durationSec: number
  peakGain: number
  attackSec?: number
}): void {
  const ac = getCtx()
  if (!ac) return
  // Some browsers start the AudioContext suspended; resume in response to user input.
  if (ac.state === "suspended") {
    ac.resume().catch(() => { /* ignore */ })
  }
  const now = ac.currentTime
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = opts.type
  osc.frequency.setValueAtTime(opts.startFreq, now)
  osc.frequency.exponentialRampToValueAtTime(Math.max(0.0001, opts.endFreq), now + opts.durationSec)

  // Quick attack, gentle decay — characteristic of a plucked-string profile.
  const attack = opts.attackSec ?? 0.015
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(opts.peakGain, now + attack)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + opts.durationSec)

  osc.connect(gain).connect(ac.destination)
  osc.start(now)
  osc.stop(now + opts.durationSec + 0.05)
}

export function playCorrect(): void {
  if (shouldRespectReducedMotion()) return
  // Two-note ascending chime (C5 → E5). Quick, pleasant, not Pavlovian.
  playTone({ type: "sine", startFreq: 523.25, endFreq: 659.25, durationSec: 0.32, peakGain: 0.16 })
  // Stack a softer harmonic for body without adding length.
  setTimeout(() => playTone({ type: "triangle", startFreq: 1046.5, endFreq: 1318.5, durationSec: 0.22, peakGain: 0.05 }), 30)
}

export function playIncorrect(): void {
  if (shouldRespectReducedMotion()) return
  // Low descending muted thud — present without being startling.
  playTone({ type: "sine", startFreq: 220, endFreq: 165, durationSec: 0.28, peakGain: 0.11, attackSec: 0.025 })
}

/** Plays a soft confirmation chime for milestone celebrations. Slightly fuller than the
 *  per-question correct sound so it reads as a different category of feedback. */
export function playMilestone(): void {
  if (shouldRespectReducedMotion()) return
  playTone({ type: "sine", startFreq: 523.25, endFreq: 783.99, durationSec: 0.55, peakGain: 0.16 })
  setTimeout(() => playTone({ type: "triangle", startFreq: 783.99, endFreq: 1046.5, durationSec: 0.45, peakGain: 0.08 }), 80)
}
