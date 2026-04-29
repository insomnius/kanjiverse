"use client"

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react"
import { useTranslation } from "@/lib/i18n/use-translation"

interface Point {
  x: number
  y: number
}

export type Stroke = Point[]

export interface DrawingCanvasHandle {
  /** Number of strokes currently drawn. */
  getStrokeCount: () => number
  /** Snapshot of all completed strokes (caller should treat as immutable). */
  getStrokes: () => Stroke[]
  /** Wipe everything. */
  clear: () => void
  /** Drop the most recent stroke. */
  undo: () => void
}

interface DrawingCanvasProps {
  /** Square edge length in CSS pixels. The internal buffer is scaled to devicePixelRatio. */
  size?: number
  /** Notified after every pen-up so the parent can refresh stroke-count UI. */
  onStrokesChange?: (count: number) => void
  /** Notified the moment the user puts the pen down for the very first time — useful
      for the "draw to begin" empty state. */
  onFirstStroke?: () => void
}

/**
 * Light-weight pointer-driven drawing surface. Captures strokes as point lists,
 * renders them with soft quadratic curves so the line doesn't look pixelated,
 * and exposes `getStrokeCount` / `clear` / `undo` to the parent via ref.
 *
 * Keeps zero dependencies: no canvas-libs, no fabric.js. The DPR-aware scaling
 * trick is the only non-obvious bit; without it, lines render fuzzy on retina.
 */
export const DrawingCanvas = forwardRef<DrawingCanvasHandle, DrawingCanvasProps>(
  function DrawingCanvas({ size = 280, onStrokesChange, onFirstStroke }, ref) {
    const { t } = useTranslation()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const strokesRef = useRef<Stroke[]>([])
    const currentStrokeRef = useRef<Stroke | null>(null)
    const dprRef = useRef(1)
    const [isDrawing, setIsDrawing] = useState(false)

    const redraw = useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      const dpr = dprRef.current

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Subtle guide lines so users know the drawing area / center.
      ctx.save()
      ctx.strokeStyle = "rgba(26, 24, 21, 0.06)"
      ctx.lineWidth = 1 * dpr
      ctx.setLineDash([4 * dpr, 4 * dpr])
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, 0)
      ctx.lineTo(canvas.width / 2, canvas.height)
      ctx.moveTo(0, canvas.height / 2)
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()
      ctx.restore()

      // Draw all completed strokes + current one.
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.strokeStyle = "#1a1815"
      ctx.lineWidth = 4 * dpr

      const allStrokes = currentStrokeRef.current
        ? [...strokesRef.current, currentStrokeRef.current]
        : strokesRef.current

      for (const stroke of allStrokes) {
        if (stroke.length === 0) continue
        ctx.beginPath()
        ctx.moveTo(stroke[0].x * dpr, stroke[0].y * dpr)
        if (stroke.length === 1) {
          // Render a single point as a small dot
          ctx.arc(stroke[0].x * dpr, stroke[0].y * dpr, 2 * dpr, 0, Math.PI * 2)
          ctx.fillStyle = "#1a1815"
          ctx.fill()
          continue
        }
        for (let i = 1; i < stroke.length - 1; i++) {
          const xc = (stroke[i].x + stroke[i + 1].x) / 2
          const yc = (stroke[i].y + stroke[i + 1].y) / 2
          ctx.quadraticCurveTo(stroke[i].x * dpr, stroke[i].y * dpr, xc * dpr, yc * dpr)
        }
        // Final segment
        const last = stroke[stroke.length - 1]
        ctx.lineTo(last.x * dpr, last.y * dpr)
        ctx.stroke()
      }
    }, [])

    // Initialise canvas dimensions / DPR on mount + on size change.
    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      dprRef.current = dpr
      canvas.width = size * dpr
      canvas.height = size * dpr
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      redraw()
    }, [size, redraw])

    const localPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
      const rect = e.currentTarget.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
      // Only respond to primary button on mouse, all on touch/pen.
      if (e.pointerType === "mouse" && e.button !== 0) return
      e.currentTarget.setPointerCapture(e.pointerId)
      const isFirst = strokesRef.current.length === 0
      currentStrokeRef.current = [localPoint(e)]
      setIsDrawing(true)
      redraw()
      if (isFirst) onFirstStroke?.()
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !currentStrokeRef.current) return
      currentStrokeRef.current.push(localPoint(e))
      redraw()
    }

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return
      try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* may have been lost */ }
      if (currentStrokeRef.current && currentStrokeRef.current.length > 0) {
        strokesRef.current.push(currentStrokeRef.current)
      }
      currentStrokeRef.current = null
      setIsDrawing(false)
      redraw()
      onStrokesChange?.(strokesRef.current.length)
    }

    useImperativeHandle(ref, () => ({
      getStrokeCount: () => strokesRef.current.length,
      getStrokes: () => strokesRef.current.map((s) => s.map((p) => ({ ...p }))),
      clear: () => {
        strokesRef.current = []
        currentStrokeRef.current = null
        setIsDrawing(false)
        redraw()
        onStrokesChange?.(0)
      },
      undo: () => {
        strokesRef.current.pop()
        redraw()
        onStrokesChange?.(strokesRef.current.length)
      },
    }))

    return (
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={t("drawCanvas.aria")}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={(e) => {
          // Stop drawing if pointer leaves canvas without lifting (mouse-out).
          if (e.pointerType === "mouse") handlePointerUp(e)
        }}
        className="bg-cream-deep border border-sumi/15 rounded-lg shadow-inner cursor-crosshair touch-none"
        style={{ width: size, height: size }}
      />
    )
  },
)
