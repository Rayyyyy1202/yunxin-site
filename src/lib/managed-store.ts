import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { del, get, put } from "@vercel/blob";
import type { CopyManifest } from "@/lib/copy";
import { COPY_MANIFEST_PATH } from "@/lib/copy";
import type { ImageManifest } from "@/lib/images";
import { MANIFEST_PATH } from "@/lib/images";
import {
  CAREERS_MANIFEST_PATH,
  NEWS_MANIFEST_PATH,
  PRODUCT_PAGES_MANIFEST_PATH,
  SERIES_MANIFEST_PATH,
  normalizeCareerManifest,
  normalizeNewsManifest,
  normalizeProductPageManifest,
  normalizeSeriesManifest,
  type CareerManifest,
  type NewsManifest,
  type ProductPageManifest,
  type SeriesManifest,
} from "@/lib/managed-content";

export interface ManagedContentState {
  images: ImageManifest;
  copy: CopyManifest;
  news: CareerIndependentNewsManifest;
  careers: CareerManifest;
  series: SeriesManifest;
  productPages: ProductPageManifest;
  updatedAt?: string;
}

type CareerIndependentNewsManifest = NewsManifest;

const MANAGED_STATE_PATH = "public/uploads/managed-content.json";
const BLOB_STATE_PATH = "managed-content/manifest.json";
const UPLOAD_DIR = "public/uploads";

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1";
}

export function getManagedStoreMode(): "blob" | "local" {
  return hasBlobToken() ? "blob" : "local";
}

export function assertManagedStoreWritable(): void {
  if (isVercelRuntime() && !hasBlobToken()) {
    throw new Error(
      "生产环境缺少 BLOB_READ_WRITE_TOKEN，无法保存后台素材。请在 Vercel 项目中绑定 Blob 存储并配置环境变量。",
    );
  }
}

function emptyState(): ManagedContentState {
  return {
    images: {},
    copy: {},
    news: { overrides: {}, customItems: {}, hiddenSlugs: [] },
    careers: { overrides: {}, customItems: {}, hiddenSlugs: [] },
    series: { overrides: {} },
    productPages: { overrides: {} },
  };
}

async function readJsonFile<T extends object>(
  relativePath: string,
  fallback: T,
): Promise<T> {
  try {
    const filepath = path.join(
      /* turbopackIgnore: true */ process.cwd(),
      relativePath,
    );
    const raw = await readFile(filepath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile(relativePath: string, value: unknown): Promise<void> {
  const filepath = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    relativePath,
  );
  await mkdir(path.dirname(filepath), { recursive: true });
  await writeFile(filepath, JSON.stringify(value, null, 2), "utf-8");
}

async function readLocalState(): Promise<ManagedContentState> {
  const persisted = await readJsonFile<Partial<ManagedContentState>>(
    MANAGED_STATE_PATH,
    {},
  );
  return {
    ...emptyState(),
    ...persisted,
    images:
      persisted.images ?? (await readJsonFile<ImageManifest>(MANIFEST_PATH, {})),
    copy:
      persisted.copy ?? (await readJsonFile<CopyManifest>(COPY_MANIFEST_PATH, {})),
    news: normalizeNewsManifest(
      persisted.news ??
        (await readJsonFile<NewsManifest | Record<string, unknown>>(
          NEWS_MANIFEST_PATH,
          {},
        )),
    ),
    careers: normalizeCareerManifest(
      persisted.careers ??
        (await readJsonFile<CareerManifest | Record<string, unknown>>(
          CAREERS_MANIFEST_PATH,
          {},
        )),
    ),
    series: normalizeSeriesManifest(
      persisted.series ??
        (await readJsonFile<SeriesManifest>(SERIES_MANIFEST_PATH, {})),
    ),
    productPages: normalizeProductPageManifest(
      persisted.productPages ??
        (await readJsonFile<ProductPageManifest>(
          PRODUCT_PAGES_MANIFEST_PATH,
          {},
        )),
    ),
  };
}

async function writeLocalState(state: ManagedContentState): Promise<void> {
  await writeJsonFile(MANAGED_STATE_PATH, state);
  await writeJsonFile(MANIFEST_PATH, state.images);
  await writeJsonFile(COPY_MANIFEST_PATH, state.copy);
  await writeJsonFile(NEWS_MANIFEST_PATH, state.news);
  await writeJsonFile(CAREERS_MANIFEST_PATH, state.careers);
  await writeJsonFile(SERIES_MANIFEST_PATH, state.series);
  await writeJsonFile(PRODUCT_PAGES_MANIFEST_PATH, state.productPages);
}

async function readBlobState(): Promise<ManagedContentState> {
  try {
    const result = await get(BLOB_STATE_PATH, { access: "public" });
    if (!result || result.statusCode !== 200) return emptyState();
    const raw = await new Response(result.stream).text();
    const parsed = JSON.parse(raw) as Partial<ManagedContentState>;
    return {
      ...emptyState(),
      ...parsed,
      news: normalizeNewsManifest(parsed.news),
      careers: normalizeCareerManifest(parsed.careers),
      series: normalizeSeriesManifest(parsed.series),
      productPages: normalizeProductPageManifest(parsed.productPages),
    };
  } catch {
    return emptyState();
  }
}

async function writeBlobState(state: ManagedContentState): Promise<void> {
  await put(BLOB_STATE_PATH, JSON.stringify(state, null, 2), {
    access: "public",
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 60,
    contentType: "application/json; charset=utf-8",
  });
}

export async function readManagedContentState(): Promise<ManagedContentState> {
  if (getManagedStoreMode() === "blob") return readBlobState();
  return readLocalState();
}

export async function writeManagedContentState(
  state: ManagedContentState,
): Promise<ManagedContentState> {
  assertManagedStoreWritable();
  const next = {
    ...state,
    news: normalizeNewsManifest(state.news),
    careers: normalizeCareerManifest(state.careers),
    series: normalizeSeriesManifest(state.series),
    productPages: normalizeProductPageManifest(state.productPages),
    updatedAt: new Date().toISOString(),
  };

  if (getManagedStoreMode() === "blob") {
    await writeBlobState(next);
  } else {
    await writeLocalState(next);
  }

  return next;
}

export async function updateManagedContentState(
  updater: (state: ManagedContentState) => ManagedContentState,
): Promise<ManagedContentState> {
  const current = await readManagedContentState();
  return writeManagedContentState(updater(current));
}

export async function uploadManagedAsset({
  slotId,
  buffer,
  extension,
  mimeType,
}: {
  slotId: string;
  buffer: Buffer;
  extension: string;
  mimeType: string;
}): Promise<string> {
  assertManagedStoreWritable();
  const safeId = slotId.replace(/[^a-zA-Z0-9_-]/g, "_");

  if (getManagedStoreMode() === "blob") {
    const blob = await put(
      `managed-assets/${safeId}-${Date.now()}.${extension}`,
      buffer,
      {
        access: "public",
        addRandomSuffix: false,
        cacheControlMaxAge: 31536000,
        contentType: mimeType,
      },
    );
    return blob.url;
  }

  const uploadDir = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    UPLOAD_DIR,
  );
  if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });
  const filename = `${safeId}.${extension}`;
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}?t=${Date.now()}`;
}

export async function deleteManagedAsset(url: string | undefined): Promise<void> {
  if (!url || getManagedStoreMode() !== "blob") return;
  try {
    await del(url);
  } catch {
    // Deleting a stale asset is best effort; manifest updates must still succeed.
  }
}
