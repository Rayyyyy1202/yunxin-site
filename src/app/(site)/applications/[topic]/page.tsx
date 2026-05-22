import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplicationFullImageHero from "@/components/applications/ApplicationFullImageHero";
import ApplicationsHero from "@/components/applications/ApplicationsHero";
import TopicCaseFilterPanel from "@/components/applications/TopicCaseFilterPanel";
import {
  applicationIndustryFilters,
  getTopic,
  topicSlugs,
} from "@/data/applications";

interface TopicPageProps {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return topicSlugs.map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { topic } = await params;
  const data = getTopic(topic);
  if (!data) return { title: "主題未找到" };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;
  const data = getTopic(topic);
  if (!data) notFound();

  const fullImageHero = data.heroVariant === "full-image";

  return (
    <>
      {!fullImageHero && (
        <div className="bg-bg-primary border-b border-border-subtle">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex items-center gap-2 text-xs text-text-secondary">
            <Link href="/" className="hover:text-text-primary transition-colors">
              首頁
            </Link>
            <span className="opacity-50">/</span>
            <Link
              href="/applications"
              className="hover:text-text-primary transition-colors"
            >
              行業中心
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-text-primary">{data.title}</span>
          </div>
        </div>
      )}

      {fullImageHero ? (
        <ApplicationFullImageHero src={data.heroBackground} alt={data.title} />
      ) : (
        <ApplicationsHero
          title={data.title}
          eyebrow={data.eyebrow}
          background={data.heroBackground}
        />
      )}

      <section className="bg-bg-secondary py-12 md:py-20">
        <TopicCaseFilterPanel
          topicSlug={data.slug}
          cases={data.cases}
          filters={applicationIndustryFilters}
          caseListVariant={data.caseListVariant}
        />
      </section>
    </>
  );
}
