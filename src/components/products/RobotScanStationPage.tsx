import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Boxes,
  CheckCircle2,
  CircleX,
  Cpu,
  Database,
  FileText,
  Gauge,
  Layers3,
  Play,
  ScanLine,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import SeriesCTA from "@/components/series/SeriesCTA";

const LAYER_ROOT = "/images/products/robot-scan-station/layers";

type MetricItem = {
  label: string;
  value: string;
  image?: string;
};

type WorkflowStep = {
  number: string;
  title: string;
  description: string;
};

type AdvantageItem = {
  title: string;
  pain: string;
  solution: string;
  icon: LucideIcon;
  metrics?: Array<{ label: string; value: string }>;
};

const metrics: MetricItem[] = [
  {
    label: "目標空間定位精度",
    value: "±0.2mm",
    image: `${LAYER_ROOT}/metric-position.png`,
  },
  {
    label: "局部測量精度",
    value: "精度0.03mm",
    image: `${LAYER_ROOT}/metric-local.png`,
  },
];

const rangeItems = [
  { title: "汽車零部件", spec: "Φ300-700" },
  { title: "電池盒", spec: "Φ500-1200mm" },
  { title: "大型汽車車架", spec: "長度 <5000mm" },
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
    description: "機械臂按規劃路徑進行主動掃描，精準採集三維數據。",
  },
  {
    number: "04",
    title: "三維重建",
    description: "對掃描數據進行快速處理，生成精確的三維模型。",
  },
  {
    number: "05",
    title: "AI檢測與分析",
    description: "利用 AI 演算法對重建模型進行品質檢測與分析，自動定位工件並識別特徵。",
  },
  {
    number: "06",
    title: "報告與工藝輸出",
    description: "輸出報告、偏差色譜圖與工藝路徑，建立工藝模型庫並生成工藝參數。",
  },
];

const impactStats = [
  { value: "40X", label: "效率提升" },
  { value: "96%", label: "表面覆蓋率" },
  { value: "100%", label: "關鍵特征覆蓋" },
  { value: "2小時→3分鐘", label: "視點規劃" },
];

const advantages: AdvantageItem[] = [
  {
    title: "極致的柔性視野",
    pain: "視角固定存在盲區，特別是對於大工件和複雜工件。",
    solution: "主動式掃描，機械臂提供靈活視野，完美適應任意工件尺寸與曲面。",
    icon: ScanLine,
  },
  {
    title: "顛覆性的效率與覆蓋率",
    pain: "人工示教、視點規劃耗時長，覆蓋率不足。",
    solution: "ViewPlanner 智能視點規劃算法，根據 CAD 模型自動規劃視點並避障，作業效率提升 40 倍。",
    icon: Sparkles,
    metrics: [
      { value: "2小時→3分鐘", label: "視點規劃" },
      { value: "40X", label: "效率提升" },
      { value: "96%", label: "覆蓋率" },
      { value: "100%", label: "關鍵特征覆蓋" },
    ],
  },
  {
    title: "全棧可控的微米級精度",
    pain: "多設備拼接產生累積誤差。",
    solution: "DepthSight 感測器 + 閉環自研拼接演算法，實現微米級精度與低精度損失。",
    icon: Gauge,
    metrics: [
      { value: "DepthSight", label: "感測器" },
      { value: "閉環拼接", label: "算法" },
      { value: "微米級", label: "結果" },
    ],
  },
  {
    title: "免示教的高度智能化",
    pain: "依賴人工示教和經驗調參，每次換型都需重新示教。",
    solution: "系統自動定位、識別特徵及檢測缺陷，快速生成打磨、塗膠、裁剪等工藝引導路徑。",
    icon: ShieldCheck,
    metrics: [
      { value: "自動定位", label: "識別" },
      { value: "缺陷檢測", label: "分析" },
      { value: "路徑生成", label: "引導" },
      { value: "快速換型", label: "維護" },
    ],
  },
];

const useCases = ["鏈軌節無序抓取及上料", "汽車鈑金上料", "汽車零部件抓取"];

export default function RobotScanStationPage() {
  return (
    <div className="overflow-x-hidden bg-black">
      <HeroSection />
      <SystemSection />
      <WorkflowSection />
      <ImpactSection />
      <AdvantageSection />
      <UseCaseSection />
      <div id="robot-scan-cta">
        <SeriesCTA
          data={{
            title: "開啟工業具身智能 新紀元",
            subtitle:
              "確認 RobotScan 的機器人配置、掃描範圍、點雲拼接流程與現場導入路徑。",
            primaryCta: { label: "獲取報價/諮詢", href: "/about/contact" },
            secondaryCta: { label: "預約線下演示", href: "/about/contact" },
            backgroundDefault:
              "/images/series/shared/cta-overlay-border-blur.png",
          }}
        />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/12 bg-black pt-20">
      <div className="absolute inset-y-0 right-0 -z-20 hidden w-[57%] md:block">
        <Image
          src={`${LAYER_ROOT}/hero-machine.png`}
          alt="RobotScan 智能成像機器人工作站"
          fill
          priority
          sizes="57vw"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#000_0%,#000_33%,rgba(0,0,0,0.72)_49%,rgba(0,0,0,0.12)_100%)]"
      />
      <div className="mx-auto grid min-h-[585px] max-w-[1280px] items-center gap-8 px-6 py-14 md:grid-cols-[0.52fr_0.48fr] md:px-10">
        <div className="max-w-[620px]">
          <p className="bg-[linear-gradient(90deg,#492e8d,#7b66ff)] bg-clip-text text-2xl font-bold tracking-[2px] text-transparent md:text-4xl">
            智能成像機器人工作站
          </p>
          <h1 className="mt-7 text-6xl font-bold leading-none text-[#7b66ff] md:text-[82px]">
            RobotScan
          </h1>
          <p className="mt-9 text-xl font-semibold leading-9 text-white md:text-2xl">
            告別繁瑣的傳統系統集成，為您提供從測量、分析、檢測到工藝引導的一站式閉環解決方案
          </p>
          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              href="/about/contact"
              className="inline-flex min-w-[150px] items-center justify-center rounded-lg bg-purple-primary/90 px-8 py-4 text-sm font-semibold tracking-[1.4px] text-white transition-colors hover:bg-purple-primary"
            >
              立即咨詢
            </Link>
            <Link
              href="#robot-scan-system"
              className="inline-flex min-w-[150px] items-center justify-center gap-2 border border-white/18 bg-black/30 px-8 py-4 text-sm font-semibold tracking-[1px] text-white transition-colors hover:border-purple-light"
            >
              <Play size={15} fill="currentColor" strokeWidth={0} />
              功能演示
            </Link>
          </div>
        </div>
        <div className="relative min-h-[280px] overflow-hidden rounded-xl border border-purple-light/20 md:hidden">
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
      className="relative overflow-hidden border-b border-white/10 bg-[#010001] py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionTitle title="靈活配置  適配全尺寸工業場景" />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.36fr_0.64fr]">
          <div className="space-y-7">
            <FeatureHeading
              icon={<Cpu size={20} />}
              title="系統構成"
            />
            <p className="text-xl leading-9 text-white/78">
              由雲芯高精度 3D 相機、低成本機械臂與專屬掃描拼接軟件完美組合，打造高效的 3D 測量工作站。
            </p>
            <div className="grid gap-4">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} item={metric} />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <FeatureHeading
              icon={<Layers3 size={20} />}
              title="靈活的工作站形態"
            />
            <div className="relative overflow-hidden rounded-2xl border border-purple-light/25 bg-black/55 p-5">
              <div className="relative aspect-[787/221] min-h-[150px]">
                <Image
                  src={`${LAYER_ROOT}/workstation-forms.png`}
                  alt="單臂、雙臂、移動工作站形態"
                  fill
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="mt-4 grid gap-3 text-center md:grid-cols-3">
                {["單臂工作站", "雙臂工作站", "移動工作站"].map((item) => (
                  <p key={item} className="text-lg font-bold text-white">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <FeatureHeading
              icon={<Gauge size={20} />}
              title="處理范圍丨支援超大場景成像"
            />
            <div className="grid gap-4 md:grid-cols-3">
              {rangeItems.map((item) => (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-2xl border border-purple-light/25 bg-[#050713] p-6 text-center"
                >
                  <div className="absolute inset-0 opacity-25">
                    <Image
                      src={`${LAYER_ROOT}/range-panel-bg.png`}
                      alt=""
                      fill
                      sizes="260px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative">
                    <p className="text-xl font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-3 text-xl text-white/76">{item.spec}</p>
                  </div>
                </article>
              ))}
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
      className="relative overflow-hidden border-b border-white/10 bg-black py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionTitle
          title={
            <>
              從數據採集到工藝引導{" "}
              <span className="bg-[linear-gradient(90deg,#7b66ff,#492e8d)] bg-clip-text text-transparent">
                全流程自動化
              </span>
            </>
          }
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-6">
          {workflowSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-purple-light/25 bg-[linear-gradient(180deg,#080911,#020207)] p-5"
            >
              <p className="text-3xl font-semibold text-purple-light">
                {step.number}
              </p>
              <h3 className="mt-5 min-h-[64px] text-xl font-semibold leading-8 text-white">
                {step.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/72">
                {step.description}
              </p>
            </article>
          ))}
        </div>
        <ReportPanel />
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section
      id="robot-scan-impact"
      className="relative overflow-hidden bg-[#010001] py-14"
    >
      <div className="absolute inset-0 opacity-35">
        <Image
          src={`${LAYER_ROOT}/transition-bg.png`}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="relative mx-auto max-w-[1280px] px-6 text-center md:px-10">
        <h2 className="text-3xl font-bold text-white md:text-[42px]">
          顛覆傳統 重新定義智能測量與引導
        </h2>
        <div className="mx-auto mt-8 grid max-w-[900px] gap-4 md:grid-cols-4">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-purple-light/25 bg-black/70 px-5 py-4"
            >
              <p className="bg-[linear-gradient(90deg,#7b66ff,#bf81ff)] bg-clip-text text-3xl font-bold text-transparent">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvantageSection() {
  return (
    <section
      id="robot-scan-advantages"
      className="border-y border-white/10 bg-black py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid gap-8">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="grid gap-5 rounded-2xl border border-white/10 bg-[#050611] p-5 md:grid-cols-[0.33fr_0.67fr] md:p-7"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <div className="mt-6 rounded-xl border border-red-400/25 bg-red-950/20 p-5">
                    <p className="flex items-center gap-3 text-lg font-semibold text-white">
                      <CircleX size={24} className="text-red-300" />
                      傳統痛點
                    </p>
                    <p className="mt-4 text-base leading-7 text-white/72">
                      {item.pain}
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-purple-light/30 bg-[radial-gradient(circle_at_78%_32%,rgba(123,102,255,0.24),transparent_40%),#080915] p-5">
                  <p className="flex items-center gap-3 text-lg font-semibold text-white">
                    <CheckCircle2 size={24} className="text-purple-light" />
                    我們的方案
                  </p>
                  <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-center">
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-purple-light/30 bg-purple-primary/12 text-purple-light">
                      <Icon size={48} strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base leading-8 text-white/76">
                        {item.solution}
                      </p>
                      {item.metrics ? (
                        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          {item.metrics.map((metric) => (
                            <div
                              key={`${item.title}-${metric.label}`}
                              className="rounded-lg border border-purple-light/20 bg-black/45 px-3 py-3 text-center"
                            >
                              <p className="text-lg font-bold text-purple-light">
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
          })}
        </div>
      </div>
    </section>
  );
}

function UseCaseSection() {
  return (
    <section
      id="robot-scan-use-cases"
      className="border-b border-white/10 bg-[#010001] py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionTitle title="RobotScan Station應用案例" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item}
              className="rounded-2xl border-2 border-purple-light/35 bg-black p-5"
            >
              <div className="flex aspect-[386/257] items-center justify-center rounded-xl border border-purple-light/20 bg-[#050611] text-purple-light/60">
                <Boxes size={44} strokeWidth={1.4} />
              </div>
              <h3 className="mt-6 text-center text-2xl font-bold leading-9 text-white">
                {item}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  title,
}: {
  title: ReactNode;
}) {
  return (
    <div className="relative flex min-h-[107px] items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(123,102,255,0.75),transparent)]"
      />
      <h2 className="relative bg-black px-8 text-center text-3xl font-semibold leading-tight text-white md:text-[42px]">
        {title}
      </h2>
    </div>
  );
}

function FeatureHeading({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-light/35 bg-purple-primary/16 text-purple-light">
        {icon}
      </span>
      <h3 className="text-2xl font-semibold leading-9 text-white">{title}</h3>
    </div>
  );
}

function MetricCard({ item }: { item: MetricItem }) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border-2 border-purple-light/35 bg-black p-4">
      {item.image ? (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      ) : null}
      <div>
        <p className="text-xl font-semibold text-white">{item.label}</p>
        <p className="mt-1 bg-[linear-gradient(90deg,#7b66ff,#bf81ff)] bg-clip-text text-3xl font-bold text-transparent">
          {item.value}
        </p>
      </div>
    </article>
  );
}

function ReportPanel() {
  const rows = [
    ["孔位偏差", "±0.05", "OK"],
    ["平面度", "±0.03", "OK"],
    ["尺寸偏差", "±0.10", "OK"],
  ];

  return (
    <div className="mx-auto mt-10 max-w-[560px] rounded-2xl border border-purple-light/30 bg-[#070812] p-5 shadow-[0_0_40px_rgba(123,102,255,0.12)]">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-lg font-semibold text-white">
          <Database size={20} className="text-purple-light" />
          檢測報告
        </p>
        <span className="rounded-full bg-purple-primary/20 px-3 py-1 text-xs font-semibold text-purple-light">
          Auto Output
        </span>
      </div>
      <div className="mt-5 overflow-hidden rounded-lg border border-white/10">
        <div className="grid grid-cols-3 bg-purple-primary/18 px-4 py-3 text-sm font-semibold text-white">
          <span>項目</span>
          <span>偏差（mm）</span>
          <span>結果</span>
        </div>
        {rows.map((row) => (
          <div
            key={row[0]}
            className="grid grid-cols-3 border-t border-white/10 px-4 py-3 text-sm text-white/72"
          >
            <span>{row[0]}</span>
            <span>{row[1]}</span>
            <span className="text-purple-light">{row[2]}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-white/55">
        <FileText size={16} />
        輸出報告、偏差色譜圖與工藝路徑參數
      </p>
    </div>
  );
}
