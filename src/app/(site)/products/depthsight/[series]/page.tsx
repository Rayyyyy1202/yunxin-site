import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getSeries, seriesList, seriesSlugs } from "@/data/series";
import SeriesHeroSection from "@/components/series/SeriesHero";
import CoreFeatures from "@/components/series/CoreFeatures";
import CoreAdvantages from "@/components/series/CoreAdvantages";
import TechSpecsTable from "@/components/series/TechSpecsTable";
import ApplicationCases from "@/components/series/ApplicationCases";
import FOVCalculator from "@/components/series/FOVCalculator";
import CaseGallery from "@/components/series/CaseGallery";
import SeriesCTA from "@/components/series/SeriesCTA";

interface SeriesPageProps {
  params: Promise<{ series: string }>;
}

export function generateStaticParams() {
  return seriesSlugs.map((series) => ({ series }));
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { series } = await params;
  const data = getSeries(series);
  if (!data) return { title: "系列未找到" };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series } = await params;
  const data = getSeries(series);

  if (!data) notFound();

  const currentIndex = seriesList.findIndex((s) => s.slug === data.slug);
  const prev = currentIndex > 0 ? seriesList[currentIndex - 1] : null;
  const next =
    currentIndex !== -1 && currentIndex < seriesList.length - 1
      ? seriesList[currentIndex + 1]
      : null;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-bg-primary border-b border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex items-center gap-2 text-xs text-text-secondary">
          <Link href="/" className="hover:text-text-primary transition-colors">
            首頁
          </Link>
          <span className="opacity-50">/</span>
          <span className="hover:text-text-primary transition-colors">產品中心</span>
          <span className="opacity-50">/</span>
          <span className="text-text-primary">DepthSight {data.hero.title}</span>
        </div>
      </div>

      <SeriesHeroSection data={data.hero} />
      <CoreFeatures items={data.coreFeatures} />
      <CoreAdvantages
        items={data.coreAdvantages}
        background={data.coreAdvantagesBackground}
      />
      <TechSpecsTable data={data.techSpecs} />
      <ApplicationCases items={data.applicationCases} />
      <FOVCalculator config={data.fovCalculator} />
      <CaseGallery items={data.caseGallery} />
      <SeriesCTA data={data.cta} />

      {/* Sibling-series nav */}
      <section className="bg-bg-primary border-t border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          {prev ? (
            <Link
              href={`/products/depthsight/${prev.slug}`}
              className="group flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
            >
              <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="block text-[10px] uppercase tracking-[3px] text-purple-light mb-0.5">
                  上一個系列
                </span>
                <span className="text-sm md:text-base font-medium">
                  {prev.hero.title}
                </span>
              </span>
            </Link>
          ) : (
            <span aria-hidden />
          )}

          {next ? (
            <Link
              href={`/products/depthsight/${next.slug}`}
              className="group flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors md:text-right"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-[3px] text-purple-light mb-0.5">
                  下一個系列
                </span>
                <span className="text-sm md:text-base font-medium">
                  {next.hero.title}
                </span>
              </span>
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <span aria-hidden />
          )}
        </div>
      </section>
    </>
  );
}
