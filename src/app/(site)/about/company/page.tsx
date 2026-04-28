import type { Metadata } from "next";
import CompanyHero from "@/components/about/CompanyHero";
import CompanyBody from "@/components/about/CompanyBody";
import MissionVision from "@/components/about/MissionVision";
import PatentsAwards from "@/components/about/PatentsAwards";

export const metadata: Metadata = {
  title: "公司介紹",
  description:
    "AIeveR Robotics Limited 雲芯機器人有限公司 — 源自香港，智連大陸，視達全球。致力於打造多維視覺與具身智能的全棧解決方案。",
};

export default function CompanyPage() {
  return (
    <>
      <CompanyHero />
      <CompanyBody />
      <MissionVision />
      <PatentsAwards />
    </>
  );
}
