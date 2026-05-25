import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Box,
  Boxes,
  Layers3,
  LayoutGrid,
  MousePointer2,
  Plug,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import SeriesCTA from "@/components/series/SeriesCTA";

export const metadata: Metadata = {
  title: "AIR Vision Engine | AIeveR Robotics",
  description:
    "AIR Vision 是面向工業視覺與機械人引導的通用視覺演算法平台，支援低代碼流程搭建、2D/3D 視覺、深度學習與 AI Agent 輔助。",
};

const AIR_IMAGE_ROOT = "/images/products/air-vision-engine";
const AIR_FEATURE_SVG = `${AIR_IMAGE_ROOT}/feature.svg`;
const AIR_STORE_PRODUCT_IMAGE = `${AIR_IMAGE_ROOT}/store-product.png`;

const coreAdvantages: {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}[] = [
  {
    title: "低代碼，高靈活",
    description: "拖拉拽搭建視覺算法流程，無需編程。",
    image: AIR_STORE_PRODUCT_IMAGE,
    icon: MousePointer2,
  },
  {
    title: "全場景覆蓋",
    description: "2D/3D 視覺、深度學習、機器人引導、定位配準。",
    image: `${AIR_IMAGE_ROOT}/advantage-coverage.png`,
    icon: Layers3,
  },
  {
    title: "攻堅複雜場景",
    description: "針對透明物體、雜亂堆疊、小目標、自由曲面等傳統方法難以處理的場景，提供系統性解決方案。",
    image: `${AIR_IMAGE_ROOT}/advantage-complex-scene.png`,
    icon: Boxes,
  },
  {
    title: "AI Agent智能輔助",
    description: "支持自然語言交互，通過對話式指令自動生成視覺算法流程，進一步降低開發門檻。",
    image: `${AIR_IMAGE_ROOT}/advantage-ai-agent.png`,
    icon: Bot,
  },
];

const matrixItems = [
  {
    title: "低代碼流程編排",
    description: "以拖拽式節點快速完成採集、預處理、檢測、測量與輸出。",
  },
  {
    title: "AI Agent 輔助建模",
    description: "用自然語言描述任務，自動生成流程草案與算法配置建議。",
  },
  {
    title: "機械人引導",
    description: "面向抓取、定位、裝配與上下料，把視覺結果直接接入機械人動作。",
  },
  {
    title: "2D / 3D 融合",
    description: "覆蓋圖像、點雲、深度學習和幾何測量，適配多類工業視覺任務。",
  },
  {
    title: "模型部署與推理",
    description: "支持深度學習模型管理、快速部署與產線級推理。",
  },
  {
    title: "數據閉環",
    description: "沉澱檢測結果、流程參數與現場樣本，支撐後續優化迭代。",
  },
];

const capabilityModules: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    eyebrow: "FLOW",
    title: "可視化流程搭建",
    description: "將相機、算法、判定、通信和機械人動作組成可維護的流程。",
    icon: LayoutGrid,
  },
  {
    eyebrow: "VISION",
    title: "多模態視覺工具箱",
    description: "內置 2D、3D、點雲、深度學習與幾何測量能力。",
    icon: Box,
  },
  {
    eyebrow: "CONTROL",
    title: "產線通信與設備接入",
    description: "對接 PLC、機械人、工控機和標準設備，減少現場集成工作量。",
    icon: Plug,
  },
  {
    eyebrow: "AGENT",
    title: "AI Agent 任務助手",
    description: "把專家經驗轉化為流程建議，幫助非專業人員快速啟動任務。",
    icon: Sparkles,
  },
];

const painSolutions = [
  {
    pain: "視覺算法開發週期長，依賴專業算法工程師",
    solution: "低代碼拖拽式編排 + AI Agent 自然語言交互，非專業人員亦可快速搭建流程",
    painIcon: Bot,
    solutionIcon: MousePointer2,
  },
  {
    pain: "傳統算法難以處理透明物體、雜亂堆疊、小目標等複雜場景",
    solution: "深度融合 3D 視覺與深度學習，提供針對複雜場景的專用算法與模型",
    painIcon: Boxes,
    solutionIcon: Box,
  },
  {
    pain: "多項目並行時，技術分散，維護成本高",
    solution: "統一平台覆蓋測量、檢測、定位、引導等全場景，降低系統複雜度",
    painIcon: Layers3,
    solutionIcon: LayoutGrid,
  },
  {
    pain: "產線部署需與 PLC、機械人等多設備通信，接口複雜",
    solution: "內置通信 IO 與標準設備驅動，開箱即連，減少集成工作量",
    painIcon: Plug,
    solutionIcon: Plug,
  },
  {
    pain: "深度學習模型訓練樣本少，迭代週期長",
    solution: "基於通用大模型的預訓練架構，支持少樣本遷移學習，快速適配新場景",
    painIcon: Sparkles,
    solutionIcon: Sparkles,
  },
];

const industryCases = [
  {
    title: "新能源電池",
    description: "覆蓋電池蓋板測量、電池盒檢測、膠路定位等高精度視覺任務。",
    image: "/images/home/bento-battery.jpg",
  },
  {
    title: "3C 電子",
    description: "支援精密零部件定位、缺陷檢測與複雜裝配引導。",
    image: "/images/home/bento-3c.jpg",
  },
  {
    title: "機械人引導",
    description: "面向拋磨軌跡規劃、抓取放置、上下料等柔性生產場景。",
    image: "/applications/flexible-robot-vision/case-polishing.png",
  },
];

const heroStats = [
  { value: "2D / 3D", label: "視覺融合" },
  { value: "Low Code", label: "流程編排" },
  { value: "AI Agent", label: "智能輔助" },
];

export default function AirVisionEnginePage() {
  return (
    <div className="overflow-x-hidden">
      <div className="bg-bg-primary border-b border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex items-center gap-2 text-xs text-text-secondary">
          <Link href="/" className="hover:text-text-primary transition-colors">
            首頁
          </Link>
          <span className="opacity-50">/</span>
          <span>產品中心</span>
          <span className="opacity-50">/</span>
          <span className="text-text-primary">AIR Vision Engine</span>
        </div>
      </div>

      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#05060d]">
        <Image
          src={`${AIR_IMAGE_ROOT}/hero-bg.png`}
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 -z-30 object-cover object-center"
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,6,13,0.98)_0%,rgba(5,6,13,0.9)_34%,rgba(5,6,13,0.28)_72%,rgba(5,6,13,0.62)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_78%_20%,rgba(141,119,207,0.28),transparent_70%)]"
        />

        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32 lg:py-36">
          <div className="max-w-[620px]">
            <p className="text-purple-light text-xs md:text-sm uppercase tracking-[4px] font-bold mb-5">
              AIR 智能軟體引擎 · 視覺算法平台
            </p>
            <h1 className="text-text-primary text-5xl md:text-7xl font-bold tracking-tight leading-none">
              AIR Vision
            </h1>
            <p className="mt-7 text-text-primary text-xl md:text-2xl font-semibold">
              通用視覺演算法平台
            </p>
            <p className="mt-5 text-text-secondary text-base md:text-lg leading-relaxed max-w-[560px]">
              從測量檢測到機械人引導，一平台覆蓋 2D / 3D 視覺、深度學習與 AI Agent 輔助，破解複雜工業視覺難題。
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/about/contact"
                className="inline-flex items-center justify-center bg-purple-primary text-white px-7 py-3.5 text-sm font-medium tracking-wider uppercase rounded-sm hover:bg-purple-primary/85 transition-colors"
              >
                立即諮詢
              </Link>
              <Link
                href="#core-advantages"
                className="inline-flex items-center justify-center border border-border-color text-text-primary px-7 py-3.5 text-sm font-medium tracking-wider uppercase rounded-sm hover:border-purple-light hover:text-purple-light transition-colors"
              >
                功能演示
              </Link>
            </div>
          </div>

          <div className="mt-14 grid max-w-[640px] grid-cols-1 gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.value}
                className="border border-purple-light/20 bg-[#090a13]/55 px-5 py-4 backdrop-blur-sm"
              >
                <p className="text-text-primary text-lg font-semibold">
                  {stat.value}
                </p>
                <p className="mt-1 text-text-secondary text-xs tracking-[2px] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-purple-light/15 bg-[#05060d] py-16 md:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 md:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[4px] text-purple-light">
              Product Preview
            </p>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-text-primary md:text-5xl">
              AIRVision 通用視覺算法平台
            </h2>
            <p className="mt-5 text-base leading-8 text-text-secondary">
              AIRVision Master、AIRVision-DL 與底層算子 SDK 覆蓋低代碼流程搭建、深度學習標註訓練、2D/3D 視覺與機器人引導。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {["流程搭建", "點雲處理", "AI Agent", "PLC / 機器人通信"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-purple-light/30 bg-purple-primary/12 px-4 py-2 text-sm font-semibold text-purple-light"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-purple-light/25 bg-black shadow-[0_0_36px_rgba(123,102,255,0.18)]">
            <Image
              src={AIR_STORE_PRODUCT_IMAGE}
              alt="AIRVision 通用視覺算法平台界面"
              width={2560}
              height={1368}
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section
        id="core-advantages"
        className="relative scroll-mt-20 overflow-hidden bg-bg-primary py-20 md:py-0"
      >
        <div className="hidden max-w-[1280px] mx-auto md:block">
          <FigmaFeatureSlice />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 md:hidden">
          <SectionHeading
            eyebrow="CORE ADVANTAGES"
            title="核心優勢"
            description="以低代碼流程、全場景視覺能力與 AI Agent 輔助，降低工業視覺系統的開發與部署門檻。"
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {coreAdvantages.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="relative flex min-h-[560px] min-w-0 flex-col overflow-hidden rounded-[18px] border border-purple-light/25 bg-[#080a12] px-6 pb-9 pt-7 shadow-[0_0_30px_rgba(73,46,141,0.16)]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_80%_42%_at_50%_0%,rgba(141,119,207,0.13),transparent_70%)]"
                  />
                  <div className="relative mx-auto mb-8 h-[245px] w-full max-w-[280px]">
                    <Image
                      src={feature.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 38vw, 250px"
                      className="object-contain"
                    />
                  </div>
                  <div className="relative flex flex-1 flex-col items-center text-center">
                    <div className="mb-6 flex items-center gap-3 text-purple-light">
                      <Icon size={18} strokeWidth={1.7} />
                      <span className="h-px w-12 bg-purple-light/65" />
                    </div>
                    <h3 className="break-words text-[30px] font-bold leading-tight text-purple-light [overflow-wrap:anywhere] md:text-[26px] xl:text-[30px]">
                      {feature.title}
                    </h3>
                    <span
                      aria-hidden
                      className="mt-7 h-1 w-16 rounded-full bg-[#7c3cff]"
                    />
                    <p className="mt-8 text-lg leading-9 text-text-primary break-words [overflow-wrap:anywhere] md:text-base md:leading-8 xl:text-lg xl:leading-9">
                      {feature.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#05060d] py-20 md:hidden">
        <Image
          src={`${AIR_IMAGE_ROOT}/feature-matrix-bg.png`}
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-60"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,6,13,0.86)_0%,rgba(5,6,13,0.58)_48%,rgba(5,6,13,0.92)_100%)]"
        />
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="FUNCTION MATRIX"
            title="核心功能矩陣"
            description="把流程搭建、算法工具、模型部署、結果輸出和機械人引導收斂到同一套平台中。"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {matrixItems.map((item, index) => (
              <article
                key={item.title}
                className="group min-h-[180px] border border-purple-light/30 bg-[#080a14]/70 p-6 backdrop-blur-md transition-colors hover:border-purple-light/70"
              >
                <p className="text-purple-light/80 text-xs font-mono">
                  MODULE {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-xl font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bg-primary py-20 md:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(73,46,141,0.2),transparent_72%)]"
        />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="PRODUCT CAPABILITIES"
            title="產品能力模組"
            description="以模組化方式覆蓋從視覺採集、算法判定到設備通信的完整產線流程。"
          />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
            {capabilityModules.map((module) => {
              const Icon = module.icon;
              return (
                <article
                  key={module.title}
                  className="relative min-h-[260px] overflow-hidden rounded-lg border border-border-subtle bg-bg-secondary/75 p-6"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-purple-light/60"
                  />
                  <p className="text-purple-light/80 text-xs font-semibold tracking-[3px]">
                    {module.eyebrow}
                  </p>
                  <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-md border border-purple-light/30 bg-purple-primary/15 text-purple-light">
                    <Icon size={22} strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-text-primary">
                    {module.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">
                    {module.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="air-vision-pain-solution"
        className="relative overflow-hidden bg-[#05060d] py-20 md:py-28"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="PAIN POINTS & SOLUTION"
            title="客戶痛點與 AIR Vision 解決方案"
            description="將複雜算法、設備接入和模型迭代問題沉澱為可複用的平台能力。"
          />

          <div className="overflow-hidden rounded-[18px] border border-purple-light/25 bg-[#07090f] shadow-[0_0_34px_rgba(73,46,141,0.16)]">
            <div className="hidden grid-cols-[minmax(0,1fr)_76px_minmax(0,1.18fr)] border-b border-border-subtle md:grid">
              <div className="bg-[#11141c] px-8 py-7 text-center text-3xl font-bold text-text-primary">
                客戶痛點
              </div>
              <div className="border-x border-border-subtle bg-[#0b0d13]" />
              <div className="bg-[linear-gradient(90deg,rgba(73,46,141,0.72),rgba(73,46,141,0.38))] px-8 py-7 text-center text-3xl font-bold text-text-primary">
                AIR Vision 解決方案
              </div>
            </div>

            {painSolutions.map((row) => (
              <div
                key={row.pain}
                className="grid grid-cols-1 border-b border-border-subtle last:border-b-0 md:grid-cols-[minmax(0,1fr)_76px_minmax(0,1.18fr)]"
              >
                <PainCell
                  label="客戶痛點"
                  text={row.pain}
                  icon={row.painIcon}
                  tone="plain"
                />
                <div className="flex items-center justify-center px-5 py-2 text-purple-light md:border-x md:border-border-subtle md:py-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-light/65 bg-purple-primary/10">
                    <ArrowRight size={22} strokeWidth={2.2} />
                  </div>
                </div>
                <PainCell
                  label="AIR Vision 解決方案"
                  text={row.solution}
                  icon={row.solutionIcon}
                  tone="purple"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bg-primary py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="USE CASES"
            title="行業應用"
            description="AIR Vision 可與 DepthSight 感測器和機械人系統配合，支撐測量、檢測、定位與引導等產線場景。"
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {industryCases.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-lg border border-border-subtle bg-bg-secondary"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(5,6,13,0.82)_100%)]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="air-vision-cta">
        <SeriesCTA
          data={{
            title: "開啟工業具身智能 新紀元",
            subtitle:
              "我們的專家團隊已準備好為您量身定制工業智能解決方案。聯繫我們，獲取全方位的技術諮詢與報價建議。",
            primaryCta: { label: "獲取報價/諮詢", href: "/about/contact" },
            secondaryCta: { label: "預約線下演示", href: "/about/contact" },
            backgroundDefault: "/images/series/shared/cta-overlay-border-blur.png",
          }}
        />
      </div>
    </div>
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
    <div className="mb-10 max-w-[780px] md:mb-14">
      <p className="text-purple-light text-xs font-bold uppercase tracking-[4px]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-2xl font-bold leading-tight text-text-primary break-words md:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-text-secondary">
        {description}
      </p>
    </div>
  );
}

function FigmaFeatureSlice() {
  return (
    <div
      role="img"
      aria-label="AIR Vision 核心優勢與產品矩陣"
      className="w-full bg-[#05060d]"
      style={{
        aspectRatio: "1280 / 1742",
        backgroundImage: `url(${AIR_FEATURE_SVG})`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
      }}
    />
  );
}

function PainCell({
  label,
  text,
  icon: Icon,
  tone,
}: {
  label: string;
  text: string;
  icon: LucideIcon;
  tone: "plain" | "purple";
}) {
  return (
    <div className="grid grid-cols-1 gap-4 px-5 py-7 md:grid-cols-[86px_minmax(0,1fr)] md:gap-5 md:px-8 md:py-8">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-lg border md:h-16 md:w-16 ${
          tone === "purple"
            ? "border-purple-light/35 bg-purple-primary/18 text-purple-light"
            : "border-purple-light/20 bg-bg-secondary text-purple-light"
        }`}
      >
        <Icon size={30} strokeWidth={1.7} />
      </div>
      <div className="min-w-0">
        <p className="mb-3 text-xs font-semibold tracking-[2px] text-purple-light md:hidden">
          {label}
        </p>
        <p
          className={`max-w-[18rem] text-sm font-semibold leading-7 break-words [overflow-wrap:anywhere] md:max-w-none md:text-xl md:leading-9 ${
            tone === "purple" ? "text-purple-light" : "text-text-primary"
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
