"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { allImageSlots } from "@/data/site-images";
import type { CopyManifest } from "@/lib/copy";
import { COPY_MANIFEST_URL } from "@/lib/copy";
import type { ImageManifest } from "@/lib/images";
import { MANIFEST_URL } from "@/lib/images";

/**
 * Reverse map: defaultSrc → slotId.
 * Built once at module load from the static catalog.
 */
const defaultSrcToSlotId = new Map<string, string>();
for (const slot of allImageSlots) {
  defaultSrcToSlotId.set(slot.defaultSrc, slot.id);
}

const ManifestContext = createContext<ImageManifest>({});
const CopyManifestContext = createContext<CopyManifest>({});

export function SiteImageProvider({ children }: { children: ReactNode }) {
  const [manifest, setManifest] = useState<ImageManifest>({});
  const [copyManifest, setCopyManifest] = useState<CopyManifest>({});

  useEffect(() => {
    fetch(MANIFEST_URL, { cache: "no-cache" })
      .then((r) => (r.ok ? (r.json() as Promise<ImageManifest>) : {}))
      .then((data) => setManifest(data))
      .catch(() => {
        /* manifest unavailable — use defaults */
      });

    fetch(COPY_MANIFEST_URL, { cache: "no-cache" })
      .then((r) => (r.ok ? (r.json() as Promise<CopyManifest>) : {}))
      .then((data) => setCopyManifest(data))
      .catch(() => {
        /* copy manifest unavailable — use defaults */
      });
  }, []);

  return (
    <ManifestContext.Provider value={manifest}>
      <CopyManifestContext.Provider value={copyManifest}>
        {children}
      </CopyManifestContext.Provider>
    </ManifestContext.Provider>
  );
}

/**
 * Resolve an image path at runtime.
 * If the admin has uploaded a replacement for this default path, return the
 * uploaded URL; otherwise return the original path unchanged.
 *
 * Usage: `const src = useSiteImage("/images/hero/robot-arm-bg.jpg");`
 */
export function useSiteImage(defaultSrc: string): string {
  const manifest = useContext(ManifestContext);
  const slotId = defaultSrcToSlotId.get(defaultSrc);
  if (slotId && manifest[slotId]) {
    return manifest[slotId];
  }
  return defaultSrc;
}

export function useSiteCopy(slotId: string, defaultValue: string): string {
  const manifest = useContext(CopyManifestContext);
  return manifest[slotId] ?? defaultValue;
}
