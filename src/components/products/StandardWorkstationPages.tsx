import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import SeriesCTA from "@/components/series/SeriesCTA";
import WorkstationUseCasesSection from "@/components/products/WorkstationUseCasesSection";

type HeroStat = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

type CoreFeature = {
  id: string;
  title: string;
  description: string;
  details?: { label: string; value: string }[];
  stages?: string[];
};

type WorkflowStep = {
  id: string;
  title: string;
  description: string;
  meta: string;
  result?: { label: string; tone: "ok" | "ng" }[];
};

type SpecRow = {
  label: string;
  value: string;
};

type Capability = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

const AIR_VISION_PRO_ROOT = "/images/products/air-vision-pro-station";
const CORE_ADVANTAGES_COMPLETE_IMAGE = `${AIR_VISION_PRO_ROOT}/core-advantages-complete.png`;

const airVisionProHeroStats: HeroStat[] = [
  { title: "極致精準", detail: "重複精度 ±0.05mm", icon: Sparkles },
  { title: "極速檢測", detail: "節拍 ≤10s/pcs（400mm）", icon: Zap },
  { title: "雙面測量", detail: "正反面平整度與高度", icon: Layers3 },
];

const airVisionProCore: CoreFeature[] = [
  {
    id: "01",
    title: "強大的檢測能力",
    description: "正反面多區域平整度與高度檢測。",
    details: [
      { label: "正面檢測", value: "TP 面 / 內框面平整度檢測。" },
      { label: "背面檢測", value: "底面 / 螺柱台階面測量" },
    ],
  },
  {
    id: "02",
    title: "無限制的測量點位",
    description: "支援直接匯入 CAD 圖紙，測量點位數量完全無限制。",
    details: [{ label: "CAD", value: "圖紙點位導入" }],
  },
  {
    id: "03",
    title: "科學的檢測演算法",
    description:
      "系統自動選取平整區域擬合基準平面，精準提取所有測量點的高度差，自動計算峰值與谷值差值。",
  },
  {
    id: "04",
    title: "完善的數據追溯",
    description:
      "內建資料庫管理系統，檢測結果自動存檔並可輸出為 EXCEL 表格，實現品質數據完全可追溯。",
    stages: ["數據採集", "自動分析", "結果存檔", "報表輸出", "追溯查詢"],
  },
];

const airVisionProWorkflow: WorkflowStep[] = [
  {
    id: "01",
    title: "人工上料",
    description: "直角依靠定位，精準放置。",
    meta: "1s",
  },
  {
    id: "02",
    title: "自動掃碼（選配）",
    description: "支援新建機種料號資訊，掃碼耗時約 1 秒。",
    meta: "1s",
  },
  {
    id: "03",
    title: "3D 線掃描",
    description: "直線橫移掃描，運行速度達 100mm/s。",
    meta: "3s",
  },
  {
    id: "04",
    title: "軟件計算與判定",
    description: "運算耗時約 5 秒，完成 OK / NG 判定與結果記錄。",
    meta: "5s",
    result: [
      { label: "OK 產品：亮綠燈並自動記錄存檔", tone: "ok" },
      { label: "NG 產品：亮紅燈並觸發蜂鳴器報警", tone: "ng" },
    ],
  },
];

const workflowTimingLabels = [
  { label: "1s", x: 166, y: 628, size: "small" },
  { label: "1s", x: 472, y: 628, size: "small" },
  { label: "3s", x: 785, y: 628, size: "small" },
  { label: "5s", x: 1098, y: 628, size: "small" },
  { label: "10s", x: 640, y: 735, size: "total" },
] as const;

const workflowJudgementLabels = [
  {
    tone: "ok",
    title: "OK 產品：",
    description: "亮綠燈並自動記錄存檔",
    x: 1060,
    y: 291,
  },
  {
    tone: "ng",
    title: "NG 產品：",
    description: "亮紅燈並觸發蜂鳴器報警",
    x: 1060,
    y: 398,
  },
] as const;

const airVisionProSpecs: SpecRow[] = [
  {
    label: "掃描視野範圍",
    value: "長度範圍 ≤ 750mm，寬度範圍 ≤ 300mm，總厚度範圍 ≤ 60mm",
  },
  {
    label: "檢測位置",
    value: "正面 / 反面（背面檢測無需產品支撐載具，正面檢測需產品支撐載具）",
  },
  { label: "產品顏色材質", value: "材質為金屬，顏色無限制" },
  {
    label: "檢測內容",
    value:
      "A. 正面：TP 面 / 內框面平整檢測；B. 背面：底面 / 螺柱臺階面，最多能檢測兩種不同高度的螺柱臺階面",
  },
  { label: "產品定位方式", value: "直角依靠定位" },
  { label: "掃描方式", value: "直線橫移 3D 線掃描" },
  { label: "重複性精度", value: "±0.05mm（機差校驗不能作為核對指標）" },
  { label: "節拍要求", value: "掃描運行速度 ≤ 100mm/s" },
  { label: "測量點位數量要求", value: "無限制" },
  { label: "點位導入方式", value: "CAD 圖" },
  { label: "結果追溯方式", value: "資料庫管理，可自由追溯檢測結果" },
  { label: "電壓", value: "220V" },
  { label: "功率", value: "1kW" },
  { label: "設備尺寸", value: "L1110 * W650 * H1620mm" },
];

const airVisionProCapabilities: Capability[] = [
  { title: "3D 線掃技術", detail: "高精度三維重建", icon: Layers3 },
  { title: "高精度測量", detail: "重複性精度 ±0.05mm", icon: Gauge },
  { title: "高效節拍", detail: "≤10s/pcs（400mm 產品）", icon: Zap },
  { title: "穩定可靠", detail: "工業級結構設計", icon: ShieldCheck },
];

const airVisionProCases = [
  "鏈軌節無序抓取及上料",
  "汽車鈑金上料",
  "汽車零部件抓取",
];

export function AirVisionProStationPage() {
  return (
    <StationShell>
      <AirVisionProHero />
      <CoreAdvantagesSection />
      <WorkflowSection />
      <SpecsSection />
      <UseCasesSection />
      <ProductCTA subtitle="確認 AIR Vision Pro 的線掃配置、測量節拍、資料庫追溯與現場部署方式。" />
    </StationShell>
  );
}

function StationShell({ children }: { children: ReactNode }) {
  return <div className="overflow-x-hidden bg-black">{children}</div>;
}

function AirVisionProHero() {
  return (
    <section className="bg-black pt-16 md:pt-20">
      <div className="relative mx-auto hidden max-w-[1280px] overflow-hidden md:block md:aspect-[1280/550]">
        <Image
          src={`${AIR_VISION_PRO_ROOT}/hero-visual.png`}
          alt="AIR Vision Pro 3D 線掃平整度檢測專機"
          width={1280}
          height={550}
          priority
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="absolute inset-0 h-full w-full max-w-none object-fill"
        />
        <div
          className="absolute z-10 flex flex-col items-start"
          style={figmaLayerStyle(40, 45, 604, 412, 1280, 550)}
        >
          <p className="whitespace-nowrap bg-[linear-gradient(90deg,#492e8d_0%,#7b66ff_100%)] bg-clip-text font-bold leading-none tracking-[2.4px] text-transparent text-[clamp(28px,2.8125vw,36px)]">
            3D線掃平整度檢測專機
          </p>
          <h1 className="mt-[18px] whitespace-nowrap text-[clamp(56px,6.40625vw,82px)] font-bold leading-none text-[#7b66ff]">
            AIR Vision Pro
          </h1>
          <p className="mt-5 w-[606px] max-w-full text-[clamp(18px,1.875vw,24px)] font-semibold leading-9 text-white">
            專為金屬產品設計的高精度平整度與高度測量解決方案
          </p>

          <div className="mt-5 grid w-[321px] max-w-full gap-[7px]">
            {airVisionProHeroStats.map((stat) => (
              <HeroStatPill key={stat.title} stat={stat} />
            ))}
          </div>

          <div className="mt-[22px] flex gap-[30px]">
            <Link
              href="/about/contact"
              className="inline-flex h-[58px] w-[150px] items-center justify-center rounded-lg bg-[rgba(73,46,141,0.6)] px-8 text-base font-medium tracking-[1.6px] text-white transition-colors hover:bg-purple-primary"
            >
              立即咨詢
            </Link>
            <Link
              href="#workflow-demo"
              className="inline-flex h-[58px] w-[150px] items-center justify-center gap-2 border border-[rgba(71,72,74,0.6)] bg-black/30 px-8 text-base font-medium tracking-[0.8px] text-white transition-colors hover:border-purple-light hover:text-purple-light"
            >
              功能演示
            </Link>
          </div>
        </div>
      </div>

      <div className="relative min-h-[680px] overflow-hidden md:hidden">
        <Image
          src={`${AIR_VISION_PRO_ROOT}/hero-visual.png`}
          alt="AIR Vision Pro 3D 線掃平整度檢測專機"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.68)_56%,rgba(0,0,0,0.18)_100%)]" />
        <div className="relative z-10 flex min-h-[680px] flex-col justify-start px-6 pb-16 pt-14">
          <p className="bg-[linear-gradient(90deg,#492e8d_0%,#7b66ff_100%)] bg-clip-text text-3xl font-bold leading-9 tracking-[2.4px] text-transparent">
            3D線掃平整度檢測專機
          </p>
          <h1 className="mt-5 w-full min-w-0 break-words text-[40px] font-bold leading-none text-[#7b66ff] sm:text-6xl">
            AIR Vision Pro
          </h1>
          <p className="mt-7 w-full min-w-0 max-w-[606px] text-xl font-semibold leading-9 text-white">
            <span className="block">專為金屬產品設計的高精度</span>
            <span className="block">平整度與高度測量解決方案</span>
          </p>
          <div className="mt-7 grid max-w-[321px] gap-2">
            {airVisionProHeroStats.map((stat) => (
              <HeroStatPill key={stat.title} stat={stat} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link
              href="/about/contact"
              className="inline-flex h-[58px] min-w-[150px] items-center justify-center rounded-lg bg-purple-primary/80 px-8 text-base font-medium tracking-[1.6px] text-white transition-colors hover:bg-purple-primary"
            >
              立即咨詢
            </Link>
            <Link
              href="#workflow-demo"
              className="inline-flex h-[58px] min-w-[150px] items-center justify-center gap-2 border border-border-color/60 bg-black/30 px-8 text-base font-medium tracking-[0.8px] text-white transition-colors hover:border-purple-light hover:text-purple-light"
            >
              功能演示
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreAdvantagesSection() {
  return (
    <section id="core-content" className="bg-black">
      <CoreAdvantagesTitle />
      <div className="mx-auto hidden max-w-[1280px] md:block">
        <div className="relative aspect-[1536/1024]">
          <Image
            src={CORE_ADVANTAGES_COMPLETE_IMAGE}
            alt="AIR Vision Pro 核心優勢視覺"
            fill
            unoptimized
            sizes="1280px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="px-6 py-12 md:hidden">
        <div className="mx-auto max-w-[520px] overflow-hidden rounded-lg border border-purple-light/20 bg-[#05050b]">
          <Image
            src={CORE_ADVANTAGES_COMPLETE_IMAGE}
            alt="AIR Vision Pro 核心優勢視覺"
            width={1536}
            height={1024}
            unoptimized
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <div className="mx-auto mt-6 grid max-w-[520px] gap-4">
          {airVisionProCore.map((feature) => (
            <CoreMobileCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroStatPill({ stat }: { stat: HeroStat }) {
  const Icon = stat.icon;
  return (
    <div className="flex h-9 items-center gap-3 rounded-md border border-[#7b66ff] bg-black/20 px-4 text-sm text-white shadow-[0_0_18px_rgba(123,102,255,0.24)]">
      <Icon className="shrink-0 text-purple-light" size={20} strokeWidth={1.7} />
      <p className="whitespace-nowrap leading-6">
        <span className="font-semibold">{stat.title}</span>
        <span className="mx-2 text-white/55">丨</span>
        <span>{stat.detail}</span>
      </p>
    </div>
  );
}

function CoreMobileCard({ feature }: { feature: CoreFeature }) {
  return (
    <article className="rounded-lg border border-purple-light/30 bg-[#080911] p-5">
      <div className="flex items-center gap-4">
        <NumberBadge id={feature.id} />
        <div>
          <p className="text-xs font-bold tracking-[3px] text-purple-light">{feature.id}</p>
          <h3 className="mt-1 text-xl font-bold text-white">{feature.title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-white/72">{feature.description}</p>
      {feature.details ? (
        <div className="mt-4 grid gap-2 text-sm text-white/72">
          {feature.details.map((detail) => (
            <p key={detail.label}>
              <span className="font-semibold text-white">{detail.label}：</span>
              {detail.value}
            </p>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function CoreAdvantagesTitle() {
  return (
    <div className="mx-auto h-[130px] max-w-[1280px] bg-black md:h-[107px]">
      <div className="relative size-full">
        <h2 className="absolute left-6 top-7 w-[calc(100%-48px)] text-[32px] font-medium leading-tight tracking-[-0.4px] text-white md:left-[2.969%] md:top-[23px] md:w-[92.5%] md:text-[clamp(34px,3.75vw,48px)] md:leading-[1] md:tracking-[-0.9px]">
          <span className="whitespace-nowrap">核心優勢</span>
          <span className="hidden md:inline"> </span>
          <br className="md:hidden" />
          <span className="whitespace-nowrap bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_41.346%)] bg-clip-text font-bold text-transparent">
            / Core Advantages
          </span>
        </h2>
      </div>
    </div>
  );
}

function NumberBadge({ id, className = "size-[54px]" }: { id: string; className?: string }) {
  return (
    <div
      className={`flex min-h-[44px] min-w-[44px] items-center justify-center bg-[linear-gradient(135deg,#7b66ff_0%,#492e8d_58%,#211339_100%)] text-[clamp(18px,2.03125vw,26px)] font-bold leading-none text-white shadow-[0_0_18px_rgba(123,102,255,0.52)] ${className}`}
      style={{
        clipPath:
          "polygon(28% 0, 72% 0, 100% 28%, 100% 72%, 72% 100%, 28% 100%, 0 72%, 0 28%)",
      }}
    >
      {id}
    </div>
  );
}

function figmaLayerStyle(
  left: number,
  top: number,
  width: number,
  height?: number,
  baseWidth = 1280,
  baseHeight = 851,
): CSSProperties {
  return {
    left: `${(left / baseWidth) * 100}%`,
    top: `${(top / baseHeight) * 100}%`,
    width: `${(width / baseWidth) * 100}%`,
    ...(height === undefined ? {} : { height: `${(height / baseHeight) * 100}%` }),
  };
}

function figmaPointStyle(
  x: number,
  y: number,
  baseWidth = 1280,
  baseHeight = 852,
): CSSProperties {
  return {
    left: `${(x / baseWidth) * 100}%`,
    top: `${(y / baseHeight) * 100}%`,
  };
}

function WorkflowSection() {
  return (
    <section id="workflow-demo" className="bg-black">
      <SectionBandTitle title="極簡高效的工作流程" />
      <div className="mx-auto max-w-[1280px] px-6 pb-14 md:px-0 md:pb-0">
        <div className="relative overflow-hidden rounded-lg border border-purple-light/15 bg-[#030407] md:rounded-none md:border-0">
          <div className="relative aspect-[1280/852] min-h-[620px] md:min-h-0">
            <Image
              src={`${AIR_VISION_PRO_ROOT}/workflow-visual.png`}
              alt="AIR Vision Pro 工作流程視覺"
              fill
              sizes="1280px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.15)_55%,rgba(0,0,0,0.42)_100%)]" />
            <div className="absolute inset-x-[4%] top-[11%] grid gap-4 md:grid-cols-4">
              {airVisionProWorkflow.map((step) => (
                <WorkflowOverlay key={step.id} step={step} />
              ))}
            </div>
            {workflowJudgementLabels.map((item) => (
              <WorkflowJudgementLabel key={item.tone} item={item} />
            ))}
            {workflowTimingLabels.map((item) => (
              <p
                key={`${item.label}-${item.x}`}
                className={`absolute hidden -translate-x-1/2 -translate-y-1/2 font-bold leading-none md:block ${
                  item.size === "total"
                    ? "text-3xl text-[#7b66ff] md:text-5xl"
                    : "text-2xl text-purple-light md:text-4xl"
                }`}
                style={figmaPointStyle(item.x, item.y)}
              >
                {item.label}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="px-6 pb-14 md:hidden">
        <div className="mx-auto grid max-w-[520px] gap-4">
          {airVisionProWorkflow.map((step) => (
            <WorkflowMobileCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowOverlay({ step }: { step: WorkflowStep }) {
  return (
    <article className="h-[154px] overflow-hidden rounded-lg border border-purple-light/25 bg-black/42 p-4 text-white backdrop-blur-[2px]">
      <p className="inline-flex h-8 min-w-12 items-center justify-center rounded-lg border border-purple-light/45 bg-purple-primary/35 text-sm font-bold text-white">
        {step.id}
      </p>
      <h3 className="mt-4 text-lg font-semibold leading-7">{step.title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/76">{step.description}</p>
    </article>
  );
}

function WorkflowJudgementLabel({
  item,
}: {
  item: (typeof workflowJudgementLabels)[number];
}) {
  return (
    <div
      className={`absolute hidden w-[190px] text-sm font-semibold leading-5 md:block ${
        item.tone === "ok" ? "text-[#67f26f]" : "text-[#ff6961]"
      }`}
      style={figmaPointStyle(item.x, item.y)}
    >
      <p>{item.title}</p>
      <p className="mt-1 text-white/88">{item.description}</p>
    </div>
  );
}

function WorkflowMobileCard({ step }: { step: WorkflowStep }) {
  return (
    <article className="rounded-lg border border-purple-light/30 bg-[#080911] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold tracking-[3px] text-purple-light">{step.id}</p>
        <span className="rounded-full bg-purple-primary/18 px-3 py-1 text-xs font-semibold text-purple-light">
          {step.meta}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-white">{step.title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/70">{step.description}</p>
    </article>
  );
}

function SpecsSection() {
  return (
    <section className="bg-black">
      <SectionBandTitle title="技術規格參數" />
      <div className="mx-auto max-w-[1280px] px-6 pb-16 md:px-0 md:pb-0">
        <div className="relative overflow-hidden rounded-lg border border-purple-light/15 bg-[#05050a] md:rounded-none md:border-0">
          <div className="absolute inset-0 hidden md:block">
            <Image
              src={`${AIR_VISION_PRO_ROOT}/specs-visual.png`}
              alt=""
              fill
              sizes="1280px"
              className="object-cover"
            />
          </div>
          <div className="relative grid min-h-[720px] gap-10 px-6 py-10 md:grid-cols-[0.82fr_1fr] md:px-10 md:py-16">
            <div className="flex flex-col justify-end gap-6">
              <div className="grid max-w-[420px] gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {airVisionProCapabilities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-lg border border-purple-light/30 bg-black/42 p-4 backdrop-blur-sm"
                    >
                      <Icon className="text-purple-light" size={22} strokeWidth={1.6} />
                      <p className="mt-3 text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-white/68">{item.detail}</p>
                    </div>
                  );
                })}
              </div>
              <div className="max-w-[386px] rounded-lg border border-purple-light/35 bg-black/50 p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">智慧軟體生態</p>
                <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs text-white/80">
                  {["CAD圖導入", "資料庫管理", "結果追溯", "報表輸出"].map((item) => (
                    <span key={item} className="rounded border border-purple-light/20 bg-purple-primary/10 px-2 py-2">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="self-center">
              <p className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                AIR Vision Pro Station
              </p>
              <p className="mt-2 bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
                3D線掃平整度檢測系統
              </p>
              <div className="mt-8 overflow-hidden rounded-lg border border-purple-light/28 bg-black/50 backdrop-blur-sm">
                <table className="w-full border-collapse text-left">
                  <tbody>
                    {airVisionProSpecs.map((row) => (
                      <tr key={row.label} className="border-b border-purple-light/12 last:border-0">
                        <th className="w-[34%] bg-purple-primary/10 px-4 py-3 text-sm font-semibold text-[#cac4d3]">
                          {row.label}
                        </th>
                        <td className="px-4 py-3 text-sm leading-6 text-white/78">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <WorkstationUseCasesSection
      title="AIR Vision Pro Station應用案例"
      cases={airVisionProCases}
      className="pb-0 md:pb-0"
    />
  );
}

function SectionBandTitle({ title }: { title: string }) {
  return (
    <div className="mx-auto flex h-[107px] max-w-[1280px] items-center justify-center bg-black px-6">
      <h2 className="text-center text-3xl font-semibold leading-tight text-white md:text-[42px] md:leading-[72px]">
        {title}
      </h2>
    </div>
  );
}

function ProductCTA({ subtitle }: { subtitle: string }) {
  return (
    <SeriesCTA
      data={{
        title: "開啟工業具身智能 新紀元",
        subtitle,
        primaryCta: { label: "獲取報價/諮詢", href: "/about/contact" },
        secondaryCta: { label: "預約線下演示", href: "/about/contact" },
        backgroundDefault: "/images/series/shared/cta-overlay-border-blur.png",
      }}
    />
  );
}
