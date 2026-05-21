import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { LOCALES, toLocalizedPath } from "@/lib/i18n";
import { careerDetailSlugs } from "@/data/careers";
import { news } from "@/data/news";
import { productPageSlugs } from "@/data/productPages";
import { seriesSlugs } from "@/data/series";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutePaths = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/about/company", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/about/careers", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/about/news", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/about/contact", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/support", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/support/docs", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/support/guides", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/support/downloads", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/support/software", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/products/air-vision-engine", changeFrequency: "monthly" as const, priority: 0.85 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    staticRoutePaths.map((route) => ({
      url: `${SITE_URL}${toLocalizedPath(locale, route.path)}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );

  const newsRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    news.map((item) => ({
      url: `${SITE_URL}${toLocalizedPath(locale, `/about/news/${item.slug}`)}`,
      lastModified: new Date(item.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  );

  const seriesRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    seriesSlugs.map((slug) => ({
      url: `${SITE_URL}${toLocalizedPath(locale, `/products/depthsight/${slug}`)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  );

  const productRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    productPageSlugs.map((slug) => ({
      url: `${SITE_URL}${toLocalizedPath(locale, `/products/${slug}`)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const careerRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    careerDetailSlugs.map((slug) => ({
      url: `${SITE_URL}${toLocalizedPath(locale, `/about/careers/${slug}`)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  );

  return [
    ...staticRoutes,
    ...seriesRoutes,
    ...productRoutes,
    ...careerRoutes,
    ...newsRoutes,
  ];
}
