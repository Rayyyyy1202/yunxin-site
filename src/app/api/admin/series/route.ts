import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { seriesSlugs } from "@/data/series";
import {
  normalizeSeriesManifest,
  type SeriesManifest,
  type SeriesOverride,
} from "@/lib/managed-content";
import {
  readManagedContentState,
  writeManagedContentState,
} from "@/lib/managed-store";

const ADMIN_HEADER = "x-admin-secret";
const VALID_SLUGS = new Set(seriesSlugs);

const ctaSchema = z.object({
  label: z.string().max(120).optional(),
  href: z.string().max(500).optional(),
});

const heroSchema = z.object({
  topLabel: z.string().max(180).optional(),
  title: z.string().max(160).optional(),
  description: z.string().max(1000).optional(),
  primaryCta: ctaSchema.optional(),
  secondaryCta: ctaSchema.optional(),
  sideCards: z.array(z.string().max(160)).max(6).optional(),
  productImageSlot: z.string().max(120).optional(),
  productImageDefault: z.string().max(500).optional(),
  backgroundDefault: z.string().max(500).optional(),
});

const advantageSchema = z.object({
  icon: z.string().max(80),
  iconImage: z.string().max(500).optional(),
  title: z.string().max(160),
  description: z.string().max(1200),
});

const modelSchema = z.object({
  id: z.string().max(80),
  label: z.string().max(120),
  thumb: z.string().max(500).optional(),
});

const techSpecsSchema = z.object({
  headerLabel: z.string().max(80).optional(),
  productImage: z
    .object({
      src: z.string().max(500),
      alt: z.string().max(160),
    })
    .optional(),
  models: z.array(modelSchema).max(12),
  rows: z
    .array(
      z.object({
        label: z.string().max(160),
        values: z.array(z.string().max(500)).max(12),
      }),
    )
    .max(80),
});

const saveBodySchema = z.object({
  slug: z.string().min(1),
  override: z.object({
    metaTitle: z.string().max(200).optional(),
    metaDescription: z.string().max(500).optional(),
    hero: heroSchema.optional(),
    coreAdvantages: z.array(advantageSchema).max(8).optional(),
    coreAdvantagesBackground: z.string().max(500).optional(),
    techSpecs: techSpecsSchema.optional(),
  }),
});

const deleteBodySchema = z.object({
  slug: z.string().min(1),
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

function stripEmpty(value: SeriesOverride): SeriesOverride {
  return JSON.parse(JSON.stringify(value)) as SeriesOverride;
}

function persistSeriesManifest(
  manifest: Required<SeriesManifest>,
): SeriesManifest {
  return { overrides: manifest.overrides };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!authorize(request)) return unauthorizedResponse();

  try {
    const parsed = saveBodySchema.safeParse((await request.json()) as unknown);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    const { slug, override } = parsed.data;
    if (!VALID_SLUGS.has(slug as (typeof seriesSlugs)[number])) {
      return NextResponse.json({ error: "Unknown series slug" }, { status: 400 });
    }

    const state = await readManagedContentState();
    const manifest = normalizeSeriesManifest(state.series);
    const nextOverride = stripEmpty(override as SeriesOverride);
    if (Object.keys(nextOverride).length > 0) {
      manifest.overrides[slug] = nextOverride;
    } else {
      delete manifest.overrides[slug];
    }

    state.series = persistSeriesManifest(manifest);
    await writeManagedContentState(state);

    return NextResponse.json({
      success: true,
      slug,
      manifest: state.series,
      override: manifest.overrides[slug] ?? {},
    });
  } catch (err) {
    console.error("[admin/series/POST]", err);
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
    const { slug } = parsed.data;
    if (!VALID_SLUGS.has(slug as (typeof seriesSlugs)[number])) {
      return NextResponse.json({ error: "Unknown series slug" }, { status: 400 });
    }

    const state = await readManagedContentState();
    const manifest = normalizeSeriesManifest(state.series);
    delete manifest.overrides[slug];
    state.series = persistSeriesManifest(manifest);
    await writeManagedContentState(state);

    return NextResponse.json({ success: true, slug, manifest: state.series });
  } catch (err) {
    console.error("[admin/series/DELETE]", err);
    const message =
      err instanceof Error ? err.message : "恢复默认失败，请稍后重试。";
    const status = message.includes("BLOB_READ_WRITE_TOKEN") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
