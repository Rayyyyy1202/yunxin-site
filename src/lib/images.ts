/**
 * Image manifest utilities.
 *
 * The manifest is a simple JSON map: { [slotId]: "/uploads/filename.jpg" }
 * stored at `public/uploads/manifest.json`.
 *
 * - Server code (API routes) reads/writes the file directly.
 * - Client code fetches `/uploads/manifest.json` at runtime.
 */

import { allImageSlots } from "@/data/site-images";

export type ImageManifest = Record<string, string>;

/** Path on disk for the manifest file. */
export const MANIFEST_PATH = "public/uploads/manifest.json";

/** Public URL the client fetches. */
export const MANIFEST_URL = "/uploads/manifest.json";

/**
 * Resolve the current image source for a given slot.
 * If the manifest has an override, use that; otherwise fall back to defaultSrc.
 */
export function resolveImageSrc(
  slotId: string,
  manifest: ImageManifest,
): string {
  if (manifest[slotId]) return manifest[slotId];
  const slot = allImageSlots.find((s) => s.id === slotId);
  return slot?.defaultSrc ?? "";
}
