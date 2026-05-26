import { allCopySlots } from "@/data/site-copy";

export type CopyManifest = Record<string, string>;

export const COPY_MANIFEST_PATH = "public/uploads/copy-manifest.json";

export const COPY_MANIFEST_URL = "/uploads/copy-manifest.json";

export function resolveCopyValue(
  slotId: string,
  manifest: CopyManifest,
): string {
  if (typeof manifest[slotId] === "string") return manifest[slotId];
  const slot = allCopySlots.find((item) => item.id === slotId);
  return slot?.defaultValue ?? "";
}
