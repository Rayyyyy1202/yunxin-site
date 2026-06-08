import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CareerDetailPage from "@/components/about/CareerDetailPage";
import { careerDetailSlugs } from "@/data/careers";
import { getManagedCareerDetail } from "@/lib/managed-content.server";

interface CareerPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return careerDetailSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = await getManagedCareerDetail(slug);
  if (!career) return { title: "職位未找到" };

  return {
    title: `${career.title} | 加入 AIeveR`,
    description: career.summary,
  };
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const career = await getManagedCareerDetail(slug);

  if (!career) {
    notFound();
  }

  return <CareerDetailPage career={career} />;
}
