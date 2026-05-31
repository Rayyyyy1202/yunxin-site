import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { careerDetails, careers } from "@/data/careers";
import {
  hasOverrideValue,
  normalizeCareerManifest,
  type CareerManifest,
  type CareerOverride,
} from "@/lib/managed-content";
import {
  readManagedContentState,
  writeManagedContentState,
} from "@/lib/managed-store";

const ADMIN_HEADER = "x-admin-secret";
const BASE_DETAIL_BY_SLUG = new Map(careerDetails.map((item) => [item.slug, item]));
const BASE_CARD_BY_SLUG = new Map(careers.map((item) => [item.id, item]));
const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i);

const stringArraySchema = z.array(z.string().max(1000)).max(80);
const metricSchema = z.object({
  label: z.string().max(80),
  value: z.string().max(160),
});
const detailSectionSchema = z.object({
  title: z.string().min(1).max(80),
  content: z.string().max(12000),
});

const saveBodySchema = z.object({
  slug: slugSchema,
  title: z.string().min(1).max(160),
  location: z.string().max(120).optional(),
  type: z.string().max(80).optional(),
  image: z.string().max(500).optional(),
  summary: z.string().max(800).optional(),
  tags: stringArraySchema.optional(),
  department: z.string().max(160).optional(),
  workMode: z.string().max(120).optional(),
  experience: z.string().max(240).optional(),
  heroImage: z.string().max(500).optional(),
  metrics: z.array(metricSchema).max(10).optional(),
  responsibilities: stringArraySchema.optional(),
  requirements: stringArraySchema.optional(),
  bonuses: stringArraySchema.optional(),
  process: stringArraySchema.optional(),
  applyHref: z.string().max(500).optional(),
  consultHref: z.string().max(500).optional(),
  qrImage: z.string().max(500).optional(),
  detailSections: z.array(detailSectionSchema).max(8).optional(),
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

function normalizeString(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeStringArray(value?: string[]): string[] | undefined {
  if (!value) return undefined;
  const next = value.map((item) => item.trim()).filter(Boolean);
  return next.length > 0 ? next : [];
}

function normalizeOverride(slug: string, value: CareerOverride): CareerOverride {
  const baseDetail = BASE_DETAIL_BY_SLUG.get(slug);
  const baseCard = BASE_CARD_BY_SLUG.get(slug);
  if (!baseDetail || !baseCard) return {};

  const normalized: CareerOverride = {};

  for (const [key, baseValue] of [
    ["title", baseDetail.title],
    ["location", baseDetail.location],
    ["type", baseDetail.type],
    ["image", baseCard.image],
    ["summary", baseDetail.summary],
    ["department", baseDetail.department],
    ["workMode", baseDetail.workMode],
    ["experience", baseDetail.experience],
    ["heroImage", baseDetail.heroImage],
    ["applyHref", baseDetail.applyHref],
    ["consultHref", baseDetail.consultHref],
    ["qrImage", baseDetail.qrImage],
  ] as const) {
    const nextValue = normalizeString(value[key]);
    if (nextValue && nextValue !== baseValue) normalized[key] = nextValue;
  }

  for (const [key, baseValue] of [
    ["tags", baseCard.tags ?? []],
    ["responsibilities", baseDetail.responsibilities],
    ["requirements", baseDetail.requirements],
    ["bonuses", baseDetail.bonuses],
    ["process", baseDetail.process],
  ] as const) {
    const nextValue = normalizeStringArray(value[key]);
    if (nextValue && !sameJson(nextValue, baseValue)) normalized[key] = nextValue;
  }

  if (value.metrics && !sameJson(value.metrics, baseDetail.metrics)) {
    normalized.metrics = value.metrics
      .map((metric) => ({
        label: metric.label.trim(),
        value: metric.value.trim(),
      }))
      .filter((metric) => metric.label && metric.value);
  }

  if (
    value.detailSections &&
    !sameJson(value.detailSections, baseDetail.detailSections ?? [])
  ) {
    normalized.detailSections = value.detailSections
      .map((section) => ({
        title: section.title.trim(),
        content: section.content.trim(),
      }))
      .filter((section) => section.title && section.content);
  }

  return normalized;
}

function customCareerFromBody(
  value: z.infer<typeof saveBodySchema>,
): CareerOverride {
  return {
    slug: value.slug,
    title: value.title.trim(),
    location: value.location?.trim() ?? "待定",
    type: value.type?.trim() ?? "全职",
    image:
      value.image?.trim() ?? "/images/about/careers/careers-hero-bg.png",
    summary: value.summary?.trim() ?? "",
    tags: value.tags ?? [],
    department: value.department?.trim() ?? "待定",
    workMode: value.workMode?.trim() ?? "现场办公",
    experience: value.experience?.trim() ?? "经验不限",
    heroImage:
      value.heroImage?.trim() ?? "/images/about/careers/careers-hero-bg.png",
    metrics: value.metrics ?? [],
    responsibilities: value.responsibilities ?? [],
    requirements: value.requirements ?? [],
    bonuses: value.bonuses ?? [],
    process: value.process ?? [],
    applyHref: value.applyHref?.trim() ?? "/about/contact",
    consultHref: value.consultHref?.trim(),
    qrImage: value.qrImage?.trim(),
    detailSections: value.detailSections ?? [],
  };
}

function persistCareerManifest(
  manifest: Required<CareerManifest>,
): CareerManifest {
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
    const manifest = normalizeCareerManifest(state.careers);
    const { slug, ...fields } = parsed.data;

    manifest.hiddenSlugs = manifest.hiddenSlugs.filter((item) => item !== slug);
    if (BASE_DETAIL_BY_SLUG.has(slug)) {
      const nextOverride = normalizeOverride(slug, fields);
      if (Object.values(nextOverride).some(hasOverrideValue)) {
        manifest.overrides[slug] = nextOverride;
      } else {
        delete manifest.overrides[slug];
      }
      delete manifest.customItems[slug];
    } else {
      manifest.customItems[slug] = customCareerFromBody(parsed.data);
      delete manifest.overrides[slug];
    }

    state.careers = persistCareerManifest(manifest);
    await writeManagedContentState(state);

    return NextResponse.json({
      success: true,
      slug,
      manifest: state.careers,
      override: BASE_DETAIL_BY_SLUG.has(slug)
        ? manifest.overrides[slug] ?? {}
        : manifest.customItems[slug],
    });
  } catch (err) {
    console.error("[admin/careers/POST]", err);
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
    const manifest = normalizeCareerManifest(state.careers);

    if (BASE_DETAIL_BY_SLUG.has(slug)) {
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

    state.careers = persistCareerManifest(manifest);
    await writeManagedContentState(state);

    return NextResponse.json({ success: true, slug, manifest: state.careers });
  } catch (err) {
    console.error("[admin/careers/DELETE]", err);
    const message =
      err instanceof Error ? err.message : "恢复默认失败，请稍后重试。";
    const status = message.includes("BLOB_READ_WRITE_TOKEN") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
