import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AirCalibratorEnginePage from "@/components/products/AirCalibratorEnginePage";
import AirIntelligentSoftwareEnginePage from "@/components/products/AirIntelligentSoftwareEnginePage";
import AirPickingStationPage from "@/components/products/AirPickingStationPage";
import AirPlannerEnginePage from "@/components/products/AirPlannerEnginePage";
import RobotScanStationPage from "@/components/products/RobotScanStationPage";
import { AirVisionProStationPage } from "@/components/products/StandardWorkstationPages";
import { getProductPage, productPageSlugs } from "@/data/productPages";
import { LOCALES } from "@/lib/i18n";

interface LocaleProductPageProps {
  params: Promise<{ locale: string; product: string }>;
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    productPageSlugs.map((product) => ({ locale, product })),
  );
}

export async function generateMetadata({
  params,
}: LocaleProductPageProps): Promise<Metadata> {
  const { product } = await params;
  const data = getProductPage(product);
  if (!data) return { title: "產品未找到" };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default async function LocaleProductPage({
  params,
}: LocaleProductPageProps) {
  const { product } = await params;
  const data = getProductPage(product);

  if (!data) notFound();

  if (data.slug === "air-intelligent-software-engine") {
    return <AirIntelligentSoftwareEnginePage />;
  }

  if (data.slug === "air-calibrator-engine") {
    return <AirCalibratorEnginePage />;
  }

  if (data.slug === "air-planner-engine") {
    return <AirPlannerEnginePage />;
  }

  if (data.slug === "air-picking-station") {
    return <AirPickingStationPage />;
  }

  if (data.slug === "robot-scan-station") {
    return <RobotScanStationPage />;
  }

  if (data.slug === "air-vision-pro-station") {
    return <AirVisionProStationPage />;
  }

  notFound();
}
