import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ApplicationsHero from "@/components/applications/ApplicationsHero";
import CaseDetailLayout from "@/components/applications/CaseDetailLayout";
import { allCaseParams, caseHasDetail, getCase } from "@/data/applications";

interface CasePageProps {
  params: Promise<{ topic: string; case: string }>;
}

export function generateStaticParams() {
  return allCaseParams();
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { topic, case: caseSlug } = await params;
  const found = getCase(topic, caseSlug);
  if (!found || !caseHasDetail(found.case)) return { title: "案例未找到" };
  return {
    title: `${found.case.title} — ${found.topic.title}`,
    description: found.case.cardDescription,
  };
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  const { topic, case: caseSlug } = await params;
  const found = getCase(topic, caseSlug);
  if (!found || !caseHasDetail(found.case)) notFound();

  const { topic: topicData, case: caseData } = found;

  return (
    <>
      {/* Breadcrumb */}
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
          <Link
            href={`/applications/${topicData.slug}`}
            className="hover:text-text-primary transition-colors"
          >
            {topicData.title}
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-text-primary">{caseData.title}</span>
        </div>
      </div>

      <ApplicationsHero
        title={caseData.title}
        eyebrow={topicData.eyebrow}
        background={topicData.heroBackground}
        productImage={caseData.productImage}
        productLabel={caseData.productLabel}
      />

      <CaseDetailLayout data={caseData} />

      {/* Back to topic */}
      <section className="bg-bg-primary border-t border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8">
          <Link
            href={`/applications/${topicData.slug}`}
            className="group inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ChevronLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="text-sm md:text-base font-medium">
              返回 {topicData.title}
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
