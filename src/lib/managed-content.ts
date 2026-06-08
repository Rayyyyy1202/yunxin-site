import type { ProductPageData, ProductFeature, ProductSpec } from "@/data/productPages";
import type {
  ApplicationCase,
  CaseGalleryItem,
  SeriesAdvantage,
  SeriesData,
  SeriesHero,
  TechSpecsTable,
} from "@/data/series";
import type { CareerDetail, CareerItem, NewsItem } from "@/lib/types";

export const NEWS_MANIFEST_PATH = "public/uploads/news-manifest.json";
export const NEWS_MANIFEST_URL = "/api/managed-content?scope=news";
export const CAREERS_MANIFEST_PATH = "public/uploads/careers-manifest.json";
export const CAREERS_MANIFEST_URL = "/api/managed-content?scope=careers";
export const SERIES_MANIFEST_PATH = "public/uploads/series-manifest.json";
export const SERIES_MANIFEST_URL = "/api/managed-content?scope=series";
export const PRODUCT_PAGES_MANIFEST_PATH =
  "public/uploads/product-pages-manifest.json";
export const PRODUCT_PAGES_MANIFEST_URL =
  "/api/managed-content?scope=productPages";

export interface NewsOverride {
  slug?: string;
  title?: string;
  summary?: string;
  date?: string;
  category?: string;
  coverImage?: string;
  galleryImages?: string[];
  content?: string;
}

export interface NewsManifest {
  overrides?: Record<string, NewsOverride>;
  customItems?: Record<string, NewsItem>;
  hiddenSlugs?: string[];
}

export type LegacyNewsManifest = Record<string, NewsOverride>;

export interface CareerDetailSectionOverride {
  title: string;
  content: string;
}

export interface CareerOverride {
  slug?: string;
  title?: string;
  location?: string;
  type?: string;
  image?: string;
  summary?: string;
  tags?: string[];
  department?: string;
  workMode?: string;
  experience?: string;
  heroImage?: string;
  metrics?: { label: string; value: string }[];
  responsibilities?: string[];
  requirements?: string[];
  bonuses?: string[];
  process?: string[];
  applyHref?: string;
  consultHref?: string;
  qrImage?: string;
  detailSections?: CareerDetailSectionOverride[];
}

export interface CareerManifest {
  overrides?: Record<string, CareerOverride>;
  customItems?: Record<string, CareerOverride>;
  hiddenSlugs?: string[];
}

export type LegacyCareerManifest = Record<string, CareerOverride>;

export interface SeriesOverride {
  metaTitle?: string;
  metaDescription?: string;
  hero?: Partial<SeriesHero>;
  coreAdvantages?: SeriesAdvantage[];
  coreAdvantagesBackground?: string;
  techSpecs?: TechSpecsTable;
  applicationCases?: ApplicationCase[];
  caseGallery?: CaseGalleryItem[];
}

export interface SeriesManifest {
  overrides?: Record<string, SeriesOverride>;
}

export interface ProductPageOverride {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  eyebrow?: string;
  subtitle?: string;
  description?: string;
  heroImage?: string;
  heroImageAlt?: string;
  tags?: string[];
  features?: ProductFeature[];
  workflow?: ProductFeature[];
  specs?: ProductSpec[];
  applications?: ProductFeature[];
}

export interface ProductPageManifest {
  overrides?: Record<string, ProductPageOverride>;
}

function applyDefined<T extends object>(base: T, override?: Partial<T>): T {
  if (!override) return base;
  const next = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value !== undefined) {
      (next as Record<string, unknown>)[key] = value;
    }
  }
  return next;
}

function isLegacyManifest(value: unknown): value is Record<string, unknown> {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !("overrides" in value) &&
      !("customItems" in value) &&
      !("hiddenSlugs" in value),
  );
}

export function normalizeNewsManifest(
  manifest: NewsManifest | LegacyNewsManifest | undefined,
): Required<NewsManifest> {
  if (!manifest) return { overrides: {}, customItems: {}, hiddenSlugs: [] };
  if (isLegacyManifest(manifest)) {
    return {
      overrides: manifest as Record<string, NewsOverride>,
      customItems: {},
      hiddenSlugs: [],
    };
  }
  return {
    overrides: manifest.overrides ?? {},
    customItems: manifest.customItems ?? {},
    hiddenSlugs: manifest.hiddenSlugs ?? [],
  };
}

export function normalizeCareerManifest(
  manifest: CareerManifest | LegacyCareerManifest | undefined,
): Required<CareerManifest> {
  if (!manifest) return { overrides: {}, customItems: {}, hiddenSlugs: [] };
  if (isLegacyManifest(manifest)) {
    return {
      overrides: manifest as Record<string, CareerOverride>,
      customItems: {},
      hiddenSlugs: [],
    };
  }
  return {
    overrides: manifest.overrides ?? {},
    customItems: manifest.customItems ?? {},
    hiddenSlugs: manifest.hiddenSlugs ?? [],
  };
}

export function normalizeSeriesManifest(
  manifest: SeriesManifest | undefined,
): Required<SeriesManifest> {
  return { overrides: manifest?.overrides ?? {} };
}

export function normalizeProductPageManifest(
  manifest: ProductPageManifest | undefined,
): Required<ProductPageManifest> {
  return { overrides: manifest?.overrides ?? {} };
}

export function applyNewsManifest(
  items: NewsItem[],
  manifest: NewsManifest | LegacyNewsManifest,
): NewsItem[] {
  const normalized = normalizeNewsManifest(manifest);
  const hidden = new Set(normalized.hiddenSlugs);
  const managedDefaults = items
    .filter((item) => !hidden.has(item.slug))
    .map((item) => applyDefined(item, normalized.overrides[item.slug]));
  const customItems = Object.values(normalized.customItems).filter(
    (item) => !hidden.has(item.slug),
  );

  return [...managedDefaults, ...customItems].sort((left, right) =>
    right.date.localeCompare(left.date),
  );
}

export function applyCareerItemManifest(
  items: CareerItem[],
  manifest: CareerManifest | LegacyCareerManifest,
): CareerItem[] {
  const normalized = normalizeCareerManifest(manifest);
  const hidden = new Set(normalized.hiddenSlugs);
  const managedDefaults = items
    .filter((item) => !hidden.has(item.id))
    .map((item) => applyDefined(item, normalized.overrides[item.id]));
  const customItems = Object.entries(normalized.customItems)
    .filter(([slug]) => !hidden.has(slug))
    .map(([slug, override]) => careerOverrideToCard(slug, override));

  return [...managedDefaults, ...customItems];
}

export function applyCareerDetailManifest(
  items: CareerDetail[],
  manifest: CareerManifest | LegacyCareerManifest,
): CareerDetail[] {
  const normalized = normalizeCareerManifest(manifest);
  const hidden = new Set(normalized.hiddenSlugs);
  const managedDefaults = items
    .filter((item) => !hidden.has(item.slug))
    .map((item) => applyDefined(item, normalized.overrides[item.slug]));
  const customItems = Object.entries(normalized.customItems)
    .filter(([slug]) => !hidden.has(slug))
    .map(([slug, override]) => careerOverrideToDetail(slug, override));

  return [...managedDefaults, ...customItems];
}

export function hasOverrideValue(value: unknown): boolean {
  if (value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function careerOverrideToCard(slug: string, value: CareerOverride): CareerItem {
  return {
    id: slug,
    title: value.title ?? "未命名岗位",
    location: value.location ?? "待定",
    type: value.type ?? "全职",
    href: `/about/careers/${slug}`,
    image:
      value.image ??
      value.heroImage ??
      "/images/about/careers/careers-hero-bg.png",
    summary: value.summary,
    tags: value.tags ?? [],
    featured: false,
  };
}

function careerOverrideToDetail(
  slug: string,
  value: CareerOverride,
): CareerDetail {
  return {
    slug,
    title: value.title ?? "未命名岗位",
    department: value.department ?? "待定",
    location: value.location ?? "待定",
    type: value.type ?? "全职",
    workMode: value.workMode ?? "现场办公",
    experience: value.experience ?? "经验不限",
    summary: value.summary ?? "",
    heroImage: value.heroImage ?? value.image ?? "/images/about/careers/careers-hero-bg.png",
    metrics: value.metrics ?? [],
    responsibilities: value.responsibilities ?? [],
    requirements: value.requirements ?? [],
    bonuses: value.bonuses ?? [],
    process: value.process ?? [],
    applyHref: value.applyHref ?? "/about/contact",
    consultHref: value.consultHref,
    qrImage: value.qrImage,
    detailSections: value.detailSections,
  };
}

function mergeSeriesHero(
  base: SeriesHero,
  override?: Partial<SeriesHero>,
): SeriesHero {
  if (!override) return base;
  return {
    ...base,
    ...override,
    primaryCta: { ...base.primaryCta, ...override.primaryCta },
    secondaryCta: { ...base.secondaryCta, ...override.secondaryCta },
    sideCards: override.sideCards ?? base.sideCards,
  };
}

export function applySeriesManifest(
  items: SeriesData[],
  manifest: SeriesManifest | undefined,
): SeriesData[] {
  const normalized = normalizeSeriesManifest(manifest);
  return items.map((item) => {
    const override = normalized.overrides[item.slug];
    if (!override) return item;
    return {
      ...item,
      ...override,
      hero: mergeSeriesHero(item.hero, override.hero),
      coreAdvantages: override.coreAdvantages ?? item.coreAdvantages,
      techSpecs: override.techSpecs ?? item.techSpecs,
      applicationCases: override.applicationCases ?? item.applicationCases,
      caseGallery: override.caseGallery ?? item.caseGallery,
    };
  });
}

export function applyProductPageManifest(
  items: ProductPageData[],
  manifest: ProductPageManifest | undefined,
): ProductPageData[] {
  const normalized = normalizeProductPageManifest(manifest);
  return items.map((item) => applyDefined(item, normalized.overrides[item.slug]));
}
