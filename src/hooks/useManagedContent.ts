"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductPageData } from "@/data/productPages";
import type { SeriesData } from "@/data/series";
import type { CareerDetail, CareerItem, NewsItem } from "@/lib/types";
import {
  applyCareerDetailManifest,
  applyCareerItemManifest,
  applyNewsManifest,
  applyProductPageManifest,
  applySeriesManifest,
  CAREERS_MANIFEST_URL,
  NEWS_MANIFEST_URL,
  PRODUCT_PAGES_MANIFEST_URL,
  SERIES_MANIFEST_URL,
  type CareerManifest,
  type NewsManifest,
  type ProductPageManifest,
  type SeriesManifest,
} from "@/lib/managed-content";

function useJsonManifest<T extends object>(url: string): T {
  const [manifest, setManifest] = useState<T>({} as T);

  useEffect(() => {
    let cancelled = false;
    fetch(url, { cache: "no-cache" })
      .then((response) => (response.ok ? (response.json() as Promise<T>) : ({} as T)))
      .then((data) => {
        if (!cancelled) setManifest(data);
      })
      .catch(() => {
        if (!cancelled) setManifest({} as T);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return manifest;
}

export function useManagedNews(items: NewsItem[]): NewsItem[] {
  const manifest = useJsonManifest<NewsManifest>(NEWS_MANIFEST_URL);
  return useMemo(() => applyNewsManifest(items, manifest), [items, manifest]);
}

export function useManagedCareers(
  items: CareerItem[],
  details: CareerDetail[],
): { careers: CareerItem[]; details: CareerDetail[] } {
  const manifest = useJsonManifest<CareerManifest>(CAREERS_MANIFEST_URL);
  return useMemo(
    () => ({
      careers: applyCareerItemManifest(items, manifest),
      details: applyCareerDetailManifest(details, manifest),
    }),
    [details, items, manifest],
  );
}

export function useManagedSeries(items: SeriesData[]): SeriesData[] {
  const manifest = useJsonManifest<SeriesManifest>(SERIES_MANIFEST_URL);
  return useMemo(() => applySeriesManifest(items, manifest), [items, manifest]);
}

export function useManagedProductPages(
  items: ProductPageData[],
): ProductPageData[] {
  const manifest = useJsonManifest<ProductPageManifest>(
    PRODUCT_PAGES_MANIFEST_URL,
  );
  return useMemo(
    () => applyProductPageManifest(items, manifest),
    [items, manifest],
  );
}
