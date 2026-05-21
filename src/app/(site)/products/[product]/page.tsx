import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircuitBoard, Layers3 } from "lucide-react";
import { notFound } from "next/navigation";
import AirCalibratorEnginePage from "@/components/products/AirCalibratorEnginePage";
import AirPickingStationPage from "@/components/products/AirPickingStationPage";
import AirPlannerEnginePage from "@/components/products/AirPlannerEnginePage";
import SeriesCTA from "@/components/series/SeriesCTA";
import {
  getProductPage,
  productPages,
  productPageSlugs,
} from "@/data/productPages";

interface ProductPageProps {
  params: Promise<{ product: string }>;
}

export function generateStaticParams() {
  return productPageSlugs.map((product) => ({ product }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { product } = await params;
  const data = getProductPage(product);
  if (!data) return { title: "產品未找到" };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;
  const data = getProductPage(product);

  if (!data) notFound();

  if (data.slug === "air-calibrator-engine") {
    return <AirCalibratorEnginePage />;
  }

  if (data.slug === "air-planner-engine") {
    return <AirPlannerEnginePage />;
  }

  if (data.slug === "air-picking-station") {
    return <AirPickingStationPage />;
  }

  const currentIndex = productPages.findIndex((page) => page.slug === data.slug);
  const prev = currentIndex > 0 ? productPages[currentIndex - 1] : null;
  const next =
    currentIndex !== -1 && currentIndex < productPages.length - 1
      ? productPages[currentIndex + 1]
      : null;

  return (
    <>
      <div className="bg-bg-primary border-b border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex items-center gap-2 text-xs text-text-secondary">
          <Link href="/" className="hover:text-text-primary transition-colors">
            首頁
          </Link>
          <span className="opacity-50">/</span>
          <span>產品中心</span>
          <span className="opacity-50">/</span>
          <span className="text-text-primary">{data.title}</span>
        </div>
      </div>

      <section className="relative isolate overflow-hidden bg-[#05060d]">
        <div className="absolute inset-0 -z-30">
          <Image
            src={data.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-45"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,6,13,0.98)_0%,rgba(5,6,13,0.9)_44%,rgba(5,6,13,0.4)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_78%_24%,rgba(141,119,207,0.28),transparent_70%)]"
        />

        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28 lg:py-32 grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.9fr)] lg:items-center">
          <div>
            <p className="text-purple-light text-xs md:text-sm uppercase tracking-[4px] font-bold mb-5">
              {data.eyebrow}
            </p>
            <h1 className="text-text-primary text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
              {data.title}
            </h1>
            <p className="mt-7 text-text-primary text-xl md:text-2xl font-semibold">
              {data.subtitle}
            </p>
            <p className="mt-5 text-text-secondary text-base md:text-lg leading-relaxed max-w-[620px]">
              {data.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-purple-light/25 bg-purple-primary/10 px-4 py-2 text-xs uppercase tracking-[2px] text-purple-light"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/about/contact"
                className="inline-flex items-center justify-center gap-2 bg-purple-primary text-white px-7 py-3.5 text-sm font-medium tracking-wider uppercase rounded-sm hover:bg-purple-primary/85 transition-colors"
              >
                立即諮詢
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/support/downloads"
                className="inline-flex items-center justify-center border border-border-color text-text-primary px-7 py-3.5 text-sm font-medium tracking-wider uppercase rounded-sm hover:border-purple-light hover:text-purple-light transition-colors"
              >
                獲取資料
              </Link>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden border border-purple-light/20 bg-[#0b0d18]/70 p-4 shadow-[0_0_40px_rgba(114,75,255,0.16)] backdrop-blur-sm">
            <Image
              src={data.heroImage}
              alt={data.heroImageAlt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(5,6,13,0.82)_100%)]" />
            <div className="absolute bottom-4 left-4 right-4 border border-white/10 bg-black/35 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[3px] text-purple-light">
                Product Module
              </p>
              <p className="mt-1 text-lg font-semibold text-text-primary">
                {data.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="CORE CAPABILITIES"
            title="核心能力"
            description="先按完整產品頁交付必備內容：定位、能力、流程、參數與應用場景。後續再按 Figma 做精修。"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {data.features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07080e] py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="WORKFLOW"
            title="標準工作流"
            description="用統一的頁面結構把產品從輸入、處理到產線部署的流程講清楚。"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {data.workflow.map((step, index) => (
              <div
                key={step.title}
                className="relative border border-border-subtle bg-bg-secondary/55 p-5"
              >
                <span className="text-purple-light text-xs font-semibold tracking-[3px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="SYSTEM SPECS"
              title="系統配置"
              description="當前先落地標準化產品信息，待 mentor 提供正式規格後可直接替換這一區。"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.specs.map((spec) => (
              <div
                key={spec.label}
                className="border border-border-subtle bg-bg-secondary/55 px-5 py-4"
              >
                <p className="text-xs uppercase tracking-[2px] text-purple-light">
                  {spec.label}
                </p>
                <p className="mt-2 text-text-primary">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07080e] py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="APPLICATIONS"
            title="典型應用"
            description="對應產品中心的標準頁面內容，確保每個入口都有可閱讀的應用說明。"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {data.applications.map((item) => (
              <div
                key={item.title}
                className="border border-purple-light/20 bg-[#0b0d18] p-6"
              >
                <CheckCircle2 className="text-purple-light" size={24} />
                <h3 className="mt-5 text-xl font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-primary border-t border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          {prev ? (
            <SiblingProductLink href={`/products/${prev.slug}`} label="上一個產品" title={prev.title} />
          ) : (
            <span aria-hidden />
          )}
          {next ? (
            <SiblingProductLink
              href={`/products/${next.slug}`}
              label="下一個產品"
              title={next.title}
              align="right"
            />
          ) : (
            <span aria-hidden />
          )}
        </div>
      </section>

      <SeriesCTA
        data={{
          title: "讓產品方案進入實際產線",
          subtitle:
            "聯繫 AIeveR 團隊，確認產品配置、工作站形態與現場導入路徑。",
          primaryCta: { label: "獲取方案諮詢", href: "/about/contact" },
          secondaryCta: { label: "查看資源下載", href: "/support/downloads" },
          backgroundDefault: "/images/series/shared/cta-overlay-border-blur.png",
        }}
      />
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-[720px]">
      <p className="text-purple-light text-xs uppercase tracking-[4px] font-bold">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl md:text-5xl font-bold text-text-primary">
        {title}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );
}

function FeatureCard({ feature }: { feature: { title: string; description: string } }) {
  return (
    <div className="border border-border-subtle bg-bg-secondary/55 p-6">
      <div className="flex h-11 w-11 items-center justify-center border border-purple-light/35 bg-purple-primary/10 text-purple-light">
        <CircuitBoard size={22} />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-text-primary">
        {feature.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {feature.description}
      </p>
    </div>
  );
}

function SiblingProductLink({
  href,
  label,
  title,
  align = "left",
}: {
  href: string;
  label: string;
  title: string;
  align?: "left" | "right";
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors ${
        align === "right" ? "md:text-right" : ""
      }`}
    >
      <span>
        <span className="block text-[10px] uppercase tracking-[3px] text-purple-light mb-0.5">
          {label}
        </span>
        <span className="text-sm md:text-base font-medium">{title}</span>
      </span>
      {align === "right" ? (
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      ) : (
        <Layers3 size={18} className="transition-transform group-hover:-translate-x-1" />
      )}
    </Link>
  );
}
