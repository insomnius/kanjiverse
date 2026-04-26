/**
 * Generates the PWA icon set from public/kv.png:
 *
 *   public/icons/icon-192.png         — purpose="any"     (192×192)
 *   public/icons/icon-512.png         — purpose="any"     (512×512)
 *   public/icons/icon-maskable-192.png — purpose="maskable" (192×192, padded)
 *   public/icons/icon-maskable-512.png — purpose="maskable" (512×512, padded)
 *
 * Maskable icons need an inner safe area: the platform may crop ~20% off the
 * edges to fit a circle/squircle/rounded-square mask. We composite the source
 * onto a cream square at 75% scale so the logo stays inside the safe zone
 * even after masking.
 *
 * Run when kv.png changes:
 *   bun run scripts/build-pwa-icons.ts
 */

import sharp from "sharp"
import { mkdirSync } from "node:fs"
import { join } from "node:path"

const SOURCE = join(__dirname, "..", "public", "kv.png")
const OUT_DIR = join(__dirname, "..", "public", "icons")
const CREAM = { r: 0xfa, g: 0xf6, b: 0xed, alpha: 1 } // matches body bg

mkdirSync(OUT_DIR, { recursive: true })

async function plain(size: number, outFile: string) {
  await sharp(SOURCE)
    .resize(size, size, { fit: "contain", background: CREAM })
    .png({ compressionLevel: 9 })
    .toFile(outFile)
  console.log(`  ✓ ${outFile} (${size}×${size}, plain)`)
}

async function maskable(size: number, outFile: string) {
  // 75% inner content => 12.5% padding all round, well within the 80% safe-area spec.
  const inner = Math.round(size * 0.75)
  const inset = Math.round((size - inner) / 2)

  const innerImage = await sharp(SOURCE)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: CREAM,
    },
  })
    .composite([{ input: innerImage, left: inset, top: inset }])
    .png({ compressionLevel: 9 })
    .toFile(outFile)
  console.log(`  ✓ ${outFile} (${size}×${size}, maskable, ${inner}px inner)`)
}

async function main() {
  console.log("Generating PWA icons from public/kv.png…")
  await Promise.all([
    plain(192, join(OUT_DIR, "icon-192.png")),
    plain(512, join(OUT_DIR, "icon-512.png")),
    maskable(192, join(OUT_DIR, "icon-maskable-192.png")),
    maskable(512, join(OUT_DIR, "icon-maskable-512.png")),
  ])
  console.log("Done.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
