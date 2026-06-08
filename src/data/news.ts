import uploadedNews from "./uploaded-news.json";
import type { NewsItem } from "@/lib/types";

export const news = uploadedNews satisfies NewsItem[];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((item) => item.slug === slug);
}
