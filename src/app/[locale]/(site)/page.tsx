import { notFound } from "next/navigation";
import HomeContent from "@/components/home/HomeContent";
import { isLocale } from "@/lib/i18n";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <HomeContent locale={locale} />;
}
