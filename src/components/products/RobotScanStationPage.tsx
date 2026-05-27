import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  BarChart3,
  Boxes,
  Clock3,
  Crosshair,
  Gauge,
  Layers3,
  Play,
  Sparkles,
  Target,
} from "lucide-react";
import SeriesCTA from "@/components/series/SeriesCTA";
import WorkstationUseCasesSection from "@/components/products/WorkstationUseCasesSection";

const IMAGE_ROOT = "/images/products/robot-scan-station";
const LAYER_ROOT = `${IMAGE_ROOT}/layers`;

type MetricItem = {
  label: string;
  value: string;
  detail?: string;
  image?: string;
};

type WorkflowStep = {
  number: string;
  title: string;
  description: string;
};

type CapabilityItem = {
  number: string;
  title: string;
  painTitle: string;
  pain: string;
  solutionTitle: string;
  solution: string;
  metrics?: Array<{ label: string; value: string }>;
};

const precisionMetrics: MetricItem[] = [
  {
    label: "目標空間定位精度",
    value: "±0.2mm",
    image: `${LAYER_ROOT}/metric-position.png`,
  },
  {
    label: "局部測量精度",
    value: "0.03mm",
    detail: "精度",
    image: `${LAYER_ROOT}/metric-local.png`,
  },
];

const stationForms = [
  { title: "單臂工作站", description: "面向單工位掃描與測量任務" },
  { title: "雙臂工作站", description: "覆蓋大尺寸與多角度工件" },
  { title: "移動工作站", description: "支援柔性產線快速部署" },
];

const rangeItems = [
  { title: "汽車零部件", spec: "Φ300-700", icon: Target },
  { title: "電池盒", spec: "Φ500-1200mm", icon: Boxes },
  { title: "大型汽車車架", spec: "長度 <5000mm", icon: Layers3 },
];

const workflowSteps: WorkflowStep[] = [
  {
    number: "01",
    title: "基準匯入",
    description: "將零部件的 CAD 模型輸入系統，作為後續分析的基準。",
  },
  {
    number: "02",
    title: "智能規劃",
    description: "根據 CAD 模型自動生成最優掃描視點，大幅提升效率。",
  },
  {
    number: "03",
    title: "主動採集",
    description: "機械臂按規劃路徑主動掃描，精準採集三維數據。",
  },
  {
    number: "04",
    title: "三維重建",
    description: "對掃描數據快速處理，生成精確的三維模型。",
  },
  {
    number: "05",
    title: "AI檢測與分析",
    description: "利用 AI 演算法對重建模型進行品質檢測與特徵識別。",
  },
  {
    number: "06",
    title: "報告與工藝輸出",
    description: "輸出報告、偏差色譜圖與工藝路徑，形成工藝參數。",
  },
];

const impactStats = [
  { value: "40x", label: "效率提升", icon: BarChart3 },
  { value: "96%", label: "表面覆蓋率", icon: Crosshair },
  { value: "100%", label: "關鍵特徵覆蓋", icon: Target },
  { value: "2小時→3分鐘", label: "視點規劃", icon: Clock3 },
];

const capabilities: CapabilityItem[] = [
  {
    number: "01",
    title: "極致的柔性視野",
    painTitle: "傳統痛點",
    pain: "視角固定存在盲區，特別是對於大工件和複雜工件。",
    solutionTitle: "我們的方案",
    solution:
      "主動式掃描，機械臂提供靈活視野，完美適應任意工件尺寸與曲面。",
  },
  {
    number: "02",
    title: "顛覆性的效率與覆蓋率",
    painTitle: "傳統痛點",
    pain: "人工示教、視點規劃耗時長，覆蓋率不足。",
    solutionTitle: "我們的方案",
    solution:
      "ViewPlanner 智能視點規劃演算法根據 CAD 模型自動規劃視點並避障，作業效率提升 40 倍。",
    metrics: [
      { value: "2小時→3分鐘", label: "視點規劃" },
      { value: "40x", label: "效率提升" },
      { value: "96%", label: "覆蓋率" },
      { value: "100%", label: "關鍵特徵覆蓋" },
    ],
  },
  {
    number: "03",
    title: "全棧可控的微米級精度",
    painTitle: "傳統痛點",
    pain: "多設備拼接容易產生累積誤差，導致測量精度不穩定。",
    solutionTitle: "我們的方案",
    solution:
      "DepthSight 感測器與雲芯自研拼接演算法，實現微米級精度與低精度損失。",
    metrics: [
      { value: "DepthSight", label: "感測器" },
      { value: "無需 Marker", label: "拼接" },
      { value: "微米級", label: "結果" },
    ],
  },
  {
    number: "04",
    title: "免示教的高度智能化",
    painTitle: "傳統痛點",
    pain: "依賴人工示教和經驗參數，每次換型都需要重新示教。",
    solutionTitle: "我們的方案",
    solution:
      "自動定位、缺陷檢測與路徑生成能力，快速形成打磨、塗膠、裁剪等工藝引導路徑。",
    metrics: [
      { value: "自動定位", label: "識別" },
      { value: "缺陷檢測", label: "分析" },
      { value: "路徑生成", label: "引導" },
      { value: "快速換型", label: "維護" },
    ],
  },
];

const useCases = [
  "鏈軌節無序抓取及上料",
  "汽車鈑金上料",
  "汽車零部件抓取",
];

export default function RobotScanStationPage() {
  return (
    <div className="overflow-x-hidden bg-black text-white">
      <HeroSection />
      <SystemSection />
      <WorkflowSection />
      <ImpactSection />
      <CapabilitySection />
      <UseCaseSection />
      <div id="robot-scan-cta" className="scroll-mt-20 md:scroll-mt-24">
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

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-cyan-400/30 bg-black pt-16 md:pt-20">
      <GridGlow />
      <div className="absolute inset-y-0 right-0 -z-20 hidden w-[60%] md:block">
        <Image
          src={`${LAYER_ROOT}/hero-machine.png`}
          alt="RobotScan 智能成像機器人工作站"
          fill
          preload
          sizes="60vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#000_0%,#000_33%,rgba(0,0,0,0.84)_50%,rgba(0,0,0,0.18)_100%)]" />

      <div className="mx-auto grid min-h-[560px] max-w-[1280px] items-center gap-8 px-6 py-14 md:grid-cols-[0.48fr_0.52fr] md:px-10 lg:min-h-[590px]">
        <div className="max-w-[590px]">
          <p className="text-2xl font-bold tracking-[0.05em] text-[#7b66ff] md:text-[32px]">
            智能成像機器人工作站
          </p>
          <h1 className="mt-6 text-[64px] font-bold leading-none text-[#7b66ff] md:text-[88px]">
            RobotScan
          </h1>
          <p className="mt-8 max-w-[540px] text-xl font-semibold leading-9 text-white md:text-2xl">
            告別繁瑣的傳統系統集成，為您提供從測量、分析、檢測到工藝引導的一站式閉環解決方案
          </p>
          <div className="mt-10 flex flex-wrap gap-5">
            <Link href="/about/contact" className={primaryButtonClass}>
              立即咨詢
            </Link>
            <Link
              href="#robot-scan-workflow"
              className="inline-flex h-14 min-w-[150px] items-center justify-center gap-2 border border-white/18 bg-black/45 px-8 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:border-purple-light hover:text-purple-light"
            >
              <Play size={15} fill="currentColor" strokeWidth={0} />
              功能演示
            </Link>
          </div>
        </div>

        <div className="relative min-h-[300px] overflow-hidden border border-purple-light/25 bg-[#070711] md:hidden">
          <Image
            src={`${LAYER_ROOT}/hero-machine.png`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

function SystemSection() {
  return (
    <section
      id="robot-scan-system"
      className="relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-black py-16 md:scroll-mt-24 md:py-20"
    >
      <GridGlow />
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <TechTitle>靈活配置&nbsp;&nbsp;適配全尺寸工業場景</TechTitle>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="space-y-8">
            <FeatureHeading icon={<Sparkles size={18} />} title="系統構成" />
            <p className="max-w-[310px] text-lg leading-8 text-white/82">
              由雲芯高精度 3D 相機、低成本機械臂與專屬掃描拼接軟件完美組合，打造高效的 3D 測量工作站。
            </p>

            <FeatureHeading icon={<Gauge size={18} />} title="硬核性能指標" />
            <div className="grid gap-5">
              {precisionMetrics.map((metric) => (
                <MetricCard key={metric.label} item={metric} />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <FeatureHeading icon={<Layers3 size={18} />} title="靈活的工作站形態" />
            <div className="relative overflow-hidden border border-purple-light/35 bg-[#050611] p-4 shadow-[0_0_35px_rgba(123,102,255,0.14)]">
              <div className="relative aspect-[4/3] md:aspect-[2365/665] md:min-h-[160px]">
                <Image
                  src={`${LAYER_ROOT}/workstation-forms.png`}
                  alt="單臂、雙臂與移動 RobotScan 工作站"
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="mt-4 grid gap-3 text-center md:grid-cols-3">
                {stationForms.map((item) => (
                  <div key={item.title}>
                    <p className="text-xl font-bold text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-white/45">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <FeatureHeading icon={<Target size={18} />} title="處理範圍｜支援超大場景成像" />
            <div className="grid gap-4 md:grid-cols-3">
              {rangeItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="relative min-h-[150px] overflow-hidden border border-purple-light/35 bg-[#050611] p-5 text-center shadow-[inset_0_-18px_40px_rgba(90,61,255,0.18)]"
                  >
                    <Image
                      src={`${LAYER_ROOT}/range-panel-bg.png`}
                      alt=""
                      fill
                      sizes="260px"
                      className="object-cover opacity-55"
                      style={{ objectPosition: `${index * 50}% center` }}
                    />
                    <div className="relative flex min-h-[110px] flex-col items-center justify-end">
                      <Icon className="mb-auto mt-2 text-purple-light/70" size={34} />
                      <p className="text-lg font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-base text-white/76">{item.spec}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section
      id="robot-scan-workflow"
      className="relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-black py-16 md:scroll-mt-24 md:py-0"
    >
      <GridGlow />
      <div className="mx-auto max-w-[1280px] px-6 md:px-0">
        <div className="md:hidden">
          <TechTitle>
            從數據採集到工藝引導{" "}
            <span className="text-[#6e4dff]">全流程自動化</span>
          </TechTitle>
        </div>
        <h2 className="sr-only">
          從數據採集到工藝引導{" "}
          全流程自動化
        </h2>
        <div className="relative mx-auto hidden aspect-[1280/645] w-full md:block">
          <Image
            src={`${LAYER_ROOT}/group195-workflow-bg.png`}
            alt=""
            fill
            sizes="1280px"
            className="object-contain"
          />
        </div>
        <div className="mt-10 grid gap-4 md:hidden">
          {workflowSteps.map((step) => (
            <WorkflowCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section
      id="robot-scan-impact"
      className="relative isolate scroll-mt-20 overflow-hidden border-b border-white/10 bg-black py-12 md:scroll-mt-24 md:py-0"
    >
      <GridGlow />
      <div className="mx-auto max-w-[1280px] px-6 md:px-0">
        <div className="relative min-h-[260px] overflow-hidden border border-purple-light/25 bg-[#03040a] md:aspect-[1280/183] md:min-h-0 md:border-0">
          <Image
            src={`${LAYER_ROOT}/impact-banner-bg.png`}
            alt=""
            fill
            sizes="1280px"
            className="object-cover"
          />
          <div className="relative flex min-h-[260px] flex-col items-center justify-center px-5 py-8 text-center md:absolute md:inset-0 md:min-h-0 md:justify-start md:px-0 md:py-0">
            <h2 className="text-3xl font-bold leading-tight md:mt-[31px] md:text-[42px]">
              顛覆傳統&nbsp;&nbsp;重新定義智能測量與引導
            </h2>
            <div className="mt-8 grid w-full max-w-[836px] gap-3 sm:grid-cols-2 md:hidden">
              {impactStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="flex min-h-[63px] items-center justify-center gap-4 rounded-[9px] border border-purple-light/35 bg-[#090a18]/86 px-5 text-left shadow-[inset_0_0_24px_rgba(123,102,255,0.18)]"
                  >
                    <Icon
                      size={28}
                      strokeWidth={1.7}
                      className="shrink-0 text-purple-light"
                    />
                    <div>
                      <p className="bg-[linear-gradient(90deg,#7b66ff,#bf81ff)] bg-clip-text text-2xl font-bold leading-none text-transparent">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[10px] font-medium leading-[15px] text-white">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="hidden md:absolute md:left-1/2 md:top-[110px] md:grid md:h-[63px] md:w-[836px] md:-translate-x-1/2 md:grid-cols-4 md:gap-[10px]">
              {impactStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex h-[63px] items-center text-left ${
                    index === 0
                      ? "pl-[92px]"
                      : index === 3
                        ? "pl-[82px]"
                        : "pl-[108px]"
                  }`}
                >
                  <div className="min-w-0">
                    <p
                      className={`bg-[linear-gradient(90deg,#7b66ff,#bf81ff)] bg-clip-text font-bold leading-none text-transparent ${
                        index === 3 ? "text-[18px]" : "text-[22px]"
                      }`}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] font-medium leading-[15px] text-white">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilitySection() {
  return (
    <section
      id="robot-scan-advantages"
      className="relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-black py-16 md:scroll-mt-24 md:py-0"
    >
      <GridGlow />
      <div className="mx-auto max-w-[1281px] px-6 md:px-0">
        <h2 className="sr-only">RobotScan 核心能力</h2>
        <div className="relative mx-auto hidden aspect-[1281/1797] w-full md:block">
          <Image
            src={`${LAYER_ROOT}/group214-capabilities-bg.png`}
            alt=""
            fill
            sizes="1281px"
            className="object-contain"
          />
        </div>
        <div className="grid gap-5 md:hidden">
          {capabilities.map((item) => (
            <CapabilityMobileCard key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseSection() {
  return (
    <WorkstationUseCasesSection
      id="robot-scan-use-cases"
      title="RobotScan Station應用案例"
      cases={useCases}
      className="scroll-mt-20 border-b border-white/10 md:scroll-mt-24"
    />
  );
}

function WorkflowCard({ step }: { step: WorkflowStep }) {
  return (
    <article className="relative overflow-hidden border border-purple-light/35 bg-[linear-gradient(180deg,rgba(16,17,37,0.95),rgba(3,3,9,0.98))] p-5 shadow-[inset_0_0_26px_rgba(123,102,255,0.16)]">
      <div className="absolute left-0 top-0 flex h-11 min-w-12 items-center justify-center bg-[#5f43d5] px-2 text-xl font-bold">
        {step.number}
      </div>
      <div className="pt-8">
        <h3 className="text-xl font-bold text-white">{step.title}</h3>
        <p className="mt-5 text-sm leading-7 text-white/74">
          {step.description}
        </p>
      </div>
    </article>
  );
}

function CapabilityMobileCard({ item }: { item: CapabilityItem }) {
  return (
    <article className="relative overflow-hidden border border-purple-light/30 bg-[#050611] p-5 shadow-[0_0_38px_rgba(123,102,255,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(123,102,255,0.18),transparent_34%)]" />
      <div className="relative">
        <div className="mb-5 flex items-center gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-[#5636c8] text-lg font-bold">
            {item.number}
          </span>
          <h3 className="text-2xl font-bold text-white">{item.title}</h3>
        </div>
        <div className="grid gap-4">
          <div className="border border-white/10 bg-black/35 p-4">
            <p className="text-lg font-semibold text-white">{item.painTitle}</p>
            <p className="mt-3 text-sm leading-7 text-white/70">{item.pain}</p>
          </div>
          <div className="border border-purple-light/25 bg-[#0a0b18] p-4">
            <p className="text-lg font-semibold text-white">
              {item.solutionTitle}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/76">
              {item.solution}
            </p>
            {item.metrics ? (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {item.metrics.map((metric) => (
                  <div
                    key={`${item.number}-${metric.label}`}
                    className="border border-purple-light/20 bg-black/45 px-3 py-3 text-center"
                  >
                    <p className="text-base font-bold text-purple-light">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-xs text-white/58">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function MetricCard({ item }: { item: MetricItem }) {
  return (
    <article className="flex min-h-[104px] items-center gap-5 border border-purple-light/45 bg-black p-4 shadow-[inset_0_0_28px_rgba(123,102,255,0.12)]">
      {item.image ? (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
      ) : null}
      <div>
        <p className="text-lg font-semibold text-white">{item.label}</p>
        <p className="mt-1 text-3xl font-bold text-purple-light">
          {item.detail ? `${item.detail} ` : ""}
          {item.value}
        </p>
      </div>
    </article>
  );
}

function FeatureHeading({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center bg-purple-primary/15 text-purple-light">
        {icon}
      </span>
      <h3 className="text-xl font-bold leading-8 text-white">{title}</h3>
    </div>
  );
}

function TechTitle({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-[72px] items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(123,102,255,0.8),transparent)]" />
      <h2 className="relative bg-black px-5 text-3xl font-bold leading-tight text-white md:text-[38px]">
        {children}
      </h2>
    </div>
  );
}

function GridGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(111, 72, 255, 0.28), transparent 34%), linear-gradient(90deg, rgba(123,102,255,0.06) 1px, transparent 1px), linear-gradient(0deg, rgba(123,102,255,0.05) 1px, transparent 1px)",
          backgroundSize: "auto, 64px 64px, 64px 64px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cyan-400/30"
      />
    </>
  );
}

const primaryButtonClass =
  "inline-flex h-14 min-w-[150px] items-center justify-center bg-purple-primary px-8 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-purple-primary/85";
