import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { productPageSlugs } from "@/data/productPages";
import {
  normalizeProductPageManifest,
  type ProductPageManifest,
  type ProductPageOverride,
} from "@/lib/managed-content";
import {
  readManagedContentState,
  writeManagedContentState,
} from "@/lib/managed-store";

const ADMIN_HEADER = "x-admin-secret";
const VALID_SLUGS = new Set(productPageSlugs);

const featureSchema = z.object({
  title: z.string().max(160),
  description: z.string().max(1000),
});

const specSchema = z.object({
  label: z.string().max(120),
  value: z.string().max(600),
});

const saveBodySchema = z.object({
  slug: z.string().min(1),
  override: z.object({
    title: z.string().max(160).optional(),
    metaTitle: z.string().max(200).optional(),
    metaDescription: z.string().max(500).optional(),
    eyebrow: z.string().max(160).optional(),
    subtitle: z.string().max(240).optional(),
    description: z.string().max(1200).optional(),
    heroImage: z.string().max(500).optional(),
    heroImageAlt: z.string().max(240).optional(),
    tags: z.array(z.string().max(80)).max(12).optional(),
    features: z.array(featureSchema).max(12).optional(),
    workflow: z.array(featureSchema).max(12).optional(),
    specs: z.array(specSchema).max(20).optional(),
    applications: z.array(featureSchema).max(12).optional(),
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

function persistProductPageManifest(
  manifest: Required<ProductPageManifest>,
): ProductPageManifest {
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
    if (!VALID_SLUGS.has(slug as (typeof productPageSlugs)[number])) {
      return NextResponse.json({ error: "Unknown product slug" }, { status: 400 });
    }

    const state = await readManagedContentState();
    const manifest = normalizeProductPageManifest(state.productPages);
    const nextOverride = JSON.parse(
      JSON.stringify(override),
    ) as ProductPageOverride;
    if (Object.keys(nextOverride).length > 0) {
      manifest.overrides[slug] = nextOverride;
    } else {
      delete manifest.overrides[slug];
    }
    state.productPages = persistProductPageManifest(manifest);
    await writeManagedContentState(state);

    return NextResponse.json({
      success: true,
      slug,
      manifest: state.productPages,
      override: manifest.overrides[slug] ?? {},
    });
  } catch (err) {
    console.error("[admin/product-pages/POST]", err);
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
    if (!VALID_SLUGS.has(slug as (typeof productPageSlugs)[number])) {
      return NextResponse.json({ error: "Unknown product slug" }, { status: 400 });
    }

    const state = await readManagedContentState();
    const manifest = normalizeProductPageManifest(state.productPages);
    delete manifest.overrides[slug];
    state.productPages = persistProductPageManifest(manifest);
    await writeManagedContentState(state);

    return NextResponse.json({ success: true, slug, manifest: state.productPages });
  } catch (err) {
    console.error("[admin/product-pages/DELETE]", err);
    const message =
      err instanceof Error ? err.message : "恢复默认失败，请稍后重试。";
    const status = message.includes("BLOB_READ_WRITE_TOKEN") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
