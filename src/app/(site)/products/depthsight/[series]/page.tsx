import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeries, seriesList, seriesSlugs } from "@/data/series";
import SeriesHeroSection from "@/components/series/SeriesHero";
import CoreFeatures from "@/components/series/CoreFeatures";
import CoreAdvantages from "@/components/series/CoreAdvantages";
import TechSpecsTable from "@/components/series/TechSpecsTable";
import ApplicationCases from "@/components/series/ApplicationCases";
import FOVCalculator from "@/components/series/FOVCalculator";
import CaseGallery from "@/components/series/CaseGallery";
import SeriesSiblingNav from "@/components/series/SeriesSiblingNav";
import SeriesCTA from "@/components/series/SeriesCTA";
import EmbodiedIntelligencePage from "@/components/series/EmbodiedIntelligencePage";

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

  if (data.slug === "embodied-intelligence") {
    return <EmbodiedIntelligencePage data={data} prev={prev} next={next} />;
  }

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

      <SeriesHeroSection data={data.hero} modelSlides={data.techSpecs?.models} />
      <CoreFeatures items={data.coreFeatures} />
      <CoreAdvantages
        items={data.coreAdvantages}
        background={data.coreAdvantagesBackground}
        variant={data.coreAdvantagesVariant}
      />
      <TechSpecsTable data={data.techSpecs} />
      <ApplicationCases items={data.applicationCases} />
      <FOVCalculator config={data.fovCalculator} />
      <CaseGallery items={data.caseGallery} />
      <SeriesSiblingNav prev={prev} next={next} />
      <SeriesCTA data={data.cta} />
    </>
  );
}
