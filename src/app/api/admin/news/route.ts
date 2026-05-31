import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { news } from "@/data/news";
import {
  hasOverrideValue,
  normalizeNewsManifest,
  type NewsManifest,
  type NewsOverride,
} from "@/lib/managed-content";
import {
  readManagedContentState,
  writeManagedContentState,
} from "@/lib/managed-store";
import type { NewsItem } from "@/lib/types";

const ADMIN_HEADER = "x-admin-secret";
const BASE_NEWS_BY_SLUG = new Map(news.map((item) => [item.slug, item]));
const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i);

const saveBodySchema = z.object({
  slug: slugSchema,
  title: z.string().min(1).max(240),
  summary: z.string().max(600).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.string().max(80).optional(),
  coverImage: z.string().max(500).optional(),
  galleryImages: z.array(z.string().max(500)).max(40).optional(),
  content: z.string().max(30000).optional(),
});

const deleteBodySchema = z.object({
  slug: slugSchema,
  mode: z.enum(["restore", "hide"]).optional(),
});

function unauthorizedResponse(): NextResponse {
  return NextResponse.json({ error: "未授权" }, { status: 401 });
}

function authorize(request: NextRequest): boolean {
  const expected = process.env.ADMIN_SECRET;
  if (!expected) return false;
  const provided = request.headers.get(ADMIN_HEADER);
  return Boolean(provided) && provided === expected;
}

function sameJson(left: unknown, right: unknown): boolean {
  return JSON.stringify(left ?? []) === JSON.stringify(right ?? []);
}

function normalizeOverride(slug: string, value: NewsOverride): NewsOverride {
  const base = BASE_NEWS_BY_SLUG.get(slug);
  if (!base) return {};

  const normalized: NewsOverride = {};
  for (const key of [
    "title",
    "summary",
    "date",
    "category",
    "coverImage",
    "content",
  ] as const) {
    const nextValue = value[key]?.trim();
    if (nextValue && nextValue !== base[key]) normalized[key] = nextValue;
  }

  if (value.galleryImages) {
    const nextImages = value.galleryImages
      .map((image) => image.trim())
      .filter(Boolean);
    if (!sameJson(nextImages, base.galleryImages ?? [])) {
      normalized.galleryImages = nextImages;
    }
  }

  return normalized;
}

function customNewsFromBody(value: z.infer<typeof saveBodySchema>): NewsItem {
  return {
    slug: value.slug,
    title: value.title.trim(),
    summary: value.summary?.trim() ?? "",
    date: value.date,
    category: value.category?.trim() ?? "公司动态",
    coverImage: value.coverImage?.trim() ?? "/images/about/news-hero.png",
    galleryImages:
      value.galleryImages?.map((image) => image.trim()).filter(Boolean) ?? [],
    content: value.content?.trim() ?? "",
  };
}

function persistNewsManifest(
  manifest: Required<NewsManifest>,
): NewsManifest {
  return {
    overrides: manifest.overrides,
    customItems: manifest.customItems,
    hiddenSlugs: manifest.hiddenSlugs,
  };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!authorize(request)) return unauthorizedResponse();

  try {
    const parsed = saveBodySchema.safeParse((await request.json()) as unknown);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const state = await readManagedContentState();
    const manifest = normalizeNewsManifest(state.news);
    const { slug, ...fields } = parsed.data;

    manifest.hiddenSlugs = manifest.hiddenSlugs.filter((item) => item !== slug);
    if (BASE_NEWS_BY_SLUG.has(slug)) {
      const nextOverride = normalizeOverride(slug, fields);
      if (Object.values(nextOverride).some(hasOverrideValue)) {
        manifest.overrides[slug] = nextOverride;
      } else {
        delete manifest.overrides[slug];
      }
      delete manifest.customItems[slug];
    } else {
      manifest.customItems[slug] = customNewsFromBody(parsed.data);
      delete manifest.overrides[slug];
    }

    state.news = persistNewsManifest(manifest);
    await writeManagedContentState(state);

    return NextResponse.json({
      success: true,
      slug,
      manifest: state.news,
      override: BASE_NEWS_BY_SLUG.has(slug)
        ? manifest.overrides[slug] ?? {}
        : manifest.customItems[slug],
    });
  } catch (err) {
    console.error("[admin/news/POST]", err);
    const message = err instanceof Error ? err.message : "保存失败，请稍后重试。";
    const status = message.includes("BLOB_READ_WRITE_TOKEN") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  if (!authorize(request)) return unauthorizedResponse();

  try {
    const parsed = deleteBodySchema.safeParse((await request.json()) as unknown);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const { slug, mode = "restore" } = parsed.data;
    const state = await readManagedContentState();
    const manifest = normalizeNewsManifest(state.news);

    if (BASE_NEWS_BY_SLUG.has(slug)) {
      delete manifest.overrides[slug];
      if (mode === "hide" && !manifest.hiddenSlugs.includes(slug)) {
        manifest.hiddenSlugs.push(slug);
      }
      if (mode === "restore") {
        manifest.hiddenSlugs = manifest.hiddenSlugs.filter(
          (item) => item !== slug,
        );
      }
    } else {
      delete manifest.customItems[slug];
      manifest.hiddenSlugs = manifest.hiddenSlugs.filter((item) => item !== slug);
    }

    state.news = persistNewsManifest(manifest);
    await writeManagedContentState(state);

    return NextResponse.json({ success: true, slug, manifest: state.news });
  } catch (err) {
    console.error("[admin/news/DELETE]", err);
    const message =
      err instanceof Error ? err.message : "恢复默认失败，请稍后重试。";
    const status = message.includes("BLOB_READ_WRITE_TOKEN") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
