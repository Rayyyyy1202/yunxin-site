import { careerDetails, careers } from "@/data/careers";
import { news } from "@/data/news";
import { productPages } from "@/data/productPages";
import { seriesList } from "@/data/series";
import type { CareerDetail, CareerItem, NewsItem } from "@/lib/types";
import {
  applyCareerDetailManifest,
  applyCareerItemManifest,
  applyNewsManifest,
  applyProductPageManifest,
  applySeriesManifest,
  type CareerManifest,
  type NewsManifest,
  type ProductPageManifest,
  type SeriesManifest,
} from "@/lib/managed-content";
import { readManagedContentState } from "@/lib/managed-store";

export async function readNewsManifest(): Promise<NewsManifest> {
  return (await readManagedContentState()).news;
}

export async function readCareerManifest(): Promise<CareerManifest> {
  return (await readManagedContentState()).careers;
}

export async function readSeriesManifest(): Promise<SeriesManifest> {
  return (await readManagedContentState()).series;
}

export async function readProductPageManifest(): Promise<ProductPageManifest> {
  return (await readManagedContentState()).productPages;
}

export async function getManagedNews(): Promise<NewsItem[]> {
  return applyNewsManifest(news, await readNewsManifest());
}

export async function getManagedNewsBySlug(
  slug: string,
): Promise<NewsItem | undefined> {
  const items = await getManagedNews();
  return items.find((item) => item.slug === slug);
}

export async function getManagedCareers(): Promise<CareerItem[]> {
  return applyCareerItemManifest(careers, await readCareerManifest());
}

export async function getManagedCareerDetails(): Promise<CareerDetail[]> {
  return applyCareerDetailManifest(careerDetails, await readCareerManifest());
}

export async function getManagedCareerDetail(
  slug: string,
): Promise<CareerDetail | undefined> {
  const items = await getManagedCareerDetails();
  return items.find((item) => item.slug === slug);
}

export async function getManagedCareerDetailSlugs(): Promise<string[]> {
  const items = await getManagedCareerDetails();
  return items.map((item) => item.slug);
}

export async function getManagedSeriesList() {
  return applySeriesManifest(seriesList, await readSeriesManifest());
}

export async function getManagedSeries(slug: string) {
  return (await getManagedSeriesList()).find((item) => item.slug === slug);
}

export async function getManagedProductPages() {
  return applyProductPageManifest(productPages, await readProductPageManifest());
}

export async function getManagedProductPage(slug: string) {
  return (await getManagedProductPages()).find((item) => item.slug === slug);
}
