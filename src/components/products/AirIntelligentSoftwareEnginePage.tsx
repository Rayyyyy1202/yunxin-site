import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Eye,
  Gauge,
  Move3D,
  RefreshCw,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import SeriesCTA from "@/components/series/SeriesCTA";

const IMAGE_ROOT = "/images/products/air-intelligent-software-engine";

const painCards: Array<{
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
}> = [
  {
    number: "01",
    title: "感知局限",
    description:
      "傳統 2D 視覺缺乏深度資訊，受光照影響大，難以估量深度。",
    icon: Eye,
    image: `${IMAGE_ROOT}/pain-icon-depth.png`,
  },
  {
    number: "02",
    title: "視野與空間受限",
    description:
      "單一視角無法覆蓋大型或複雜曲面工件，如風力葉片、汽車輪罩與船舶鑄件。",
    icon: Move3D,
    image: `${IMAGE_ROOT}/pain-icon-vision.png`,
  },
  {
    number: "03",
    title: "一致性與精度差",
    description:
      "來料與加工誤差大，且機械人絕對定位精度遠低於重複定位精度。",
    icon: Gauge,
    image: `${IMAGE_ROOT}/pain-icon-precision.png`,
  },
  {
    number: "04",
    title: "彈性不足",
    description: "產線換型頻繁時，重新部署週期長、成本高。",
    icon: RefreshCw,
    image: `${IMAGE_ROOT}/pain-icon-flexibility.png`,
  },
];

const systemSteps: Array<{ label: string; image: string }> = [
  { label: "方案生成", image: `${IMAGE_ROOT}/system-step-solution.png` },
  { label: "3D成像", image: `${IMAGE_ROOT}/system-step-imaging.png` },
  { label: "數據處理分析", image: `${IMAGE_ROOT}/system-step-analysis.png` },
  { label: "軌跡規劃", image: `${IMAGE_ROOT}/system-step-planning.png` },
  { label: "執行結果", image: `${IMAGE_ROOT}/system-step-result.png` },
];

const platformCards = [
  {
    title: "3D視覺演算法平台",
    description: "包含 3D 點雲與 2D 圖像處理，支援 0 程式碼拖放式除錯。",
    image: `${IMAGE_ROOT}/system-platform-3d.png`,
    icon: `${IMAGE_ROOT}/system-platform-3d-icon.png`,
  },
  {
    title: "AI 工具集平台",
    description: "內置 AI 訓練與推理平台。",
    image: `${IMAGE_ROOT}/system-platform-ai.png`,
    icon: `${IMAGE_ROOT}/system-platform-ai-icon.png`,
  },
];

const robotFeatureCards = [
  {
    title: "無需 marker 與額外追蹤器",
    image: `${IMAGE_ROOT}/robot-feature-marker.png`,
  },
  {
    title: "局部測量精度達 0.03mm",
    image: `${IMAGE_ROOT}/robot-feature-local.png`,
  },
  {
    title: "目標空間定位精度高達 ±0.2mm",
    image: `${IMAGE_ROOT}/robot-feature-position.png`,
  },
  {
    title: "支援超大場景全局 3D 成像",
    image: `${IMAGE_ROOT}/robot-feature-global.png`,
  },
];

const softwareCards = [
  {
    title: "AIR Vision",
    subtitle: "全維度視覺分析引擎",
    description: "通用視覺算法平台，從測量檢測到機器人引導，一平台全搞定。",
    value: "破解各類複雜工業視覺難題。",
    href: "/products/air-vision-engine",
    image: `${IMAGE_ROOT}/software-air-vision.png`,
  },
  {
    title: "AIR Planner",
    subtitle: "機器人軌跡規劃軟件",
    description:
      "為工業機器人應用設計的離線編程與仿真軟件，提供從環境導入、軌跡生成到示教器代碼的一站式解決方式。",
    value:
      "基于 CAD 模型自動規劃視點，將人工示教耗時從 2 小時縮短至 3 分鐘。",
    href: "/products/air-planner-engine",
    image: `${IMAGE_ROOT}/software-air-planner.png`,
  },
  {
    title: "AIR Calibrator",
    subtitle: "自動化手眼標定與 DH 校正",
    description: "自動化引導式手眼標定，同時校正機器人 DH 參數。",
    value: "降低使用門檻，提升機器人絕對精度與操作精度。",
    href: "/products/air-calibrator-engine",
    image: `${IMAGE_ROOT}/software-air-calibrator.png`,
  },
];

export default function AirIntelligentSoftwareEnginePage() {
  return (
    <div className="overflow-x-hidden bg-black text-white">
      <HeroSection />
      <PainPointSection />
      <SystemSection />
      <RobotScanSection />
      <SoftwareBrainSection />
      <SeriesCTA
        data={{
          title: "開啟工業具身智能 新紀元",
          subtitle:
            "我們的專家團隊已準備好為您量身定制工業智能解決方案。",
          primaryCta: { label: "獲取報價/諮詢", href: "/about/contact" },
          secondaryCta: { label: "預約線下演示", href: "/about/contact" },
          backgroundDefault:
            "/images/series/shared/cta-overlay-border-blur.png",
        }}
      />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-black pt-20 md:pt-24">
      <Image
        src={`${IMAGE_ROOT}/hero-bg.png`}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.94)_34%,rgba(0,0,0,0.48)_65%,rgba(0,0,0,0.1)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_74%_40%,rgba(123,102,255,0.22),transparent_64%)]"
      />

      <div className="mx-auto flex min-h-[640px] max-w-[1280px] items-center px-6 py-16 md:px-10">
        <div className="max-w-[670px]">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-[52px] md:leading-[1.12]">
            面向高階複雜場景的
            <br />
            3D 視覺與機械人感知方案
          </h1>
          <p className="mt-6 max-w-[640px] text-sm leading-7 text-white/78 md:text-base">
            3D視覺算法平台、機器人掃描與執行系統、機器人軌跡規劃軟件，從系統硬件、成像到演算法源頭，全面優化系統精度，全端技術自主可控。
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/about/contact"
              className="inline-flex min-w-[132px] items-center justify-center rounded-sm bg-purple-primary px-7 py-3 text-sm font-semibold tracking-[1px] transition-colors hover:bg-purple-primary/85"
            >
              立即咨詢
            </Link>
            <Link
              href="#air-system"
              className="inline-flex min-w-[132px] items-center justify-center rounded-sm border border-white/20 bg-black/35 px-7 py-3 text-sm font-semibold tracking-[1px] text-white/88 transition-colors hover:border-purple-light hover:text-white"
            >
              功能演示
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PainPointSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#020405] py-16 md:py-20">
      <Image
        src={`${IMAGE_ROOT}/section-texture.png`}
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center opacity-20"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,4,5,0.75),#020405_42%,#020405_100%)]"
      />

      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          eyebrow="行業痛點分析"
          title="突破傳統2D視覺與機器人執行的極限"
          subtitle="AIR 智能軟體引擎 × 3D 視覺方案，重塑工業場景的感知與執行邊界"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {painCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="relative overflow-hidden rounded-xl border border-[#534384] bg-[rgba(18,16,34,0.82)] p-5 shadow-[0_0_28px_rgba(123,102,255,0.16)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-full border border-[#7b66ff]/70 bg-[#492e8d]/40 text-purple-light">
                    <Icon size={22} />
                  </span>
                  <h3 className="text-xl font-bold">
                    <span className="mr-2 text-purple-light">
                      {card.number}
                    </span>
                    {card.title}
                  </h3>
                </div>
                <p className="mt-5 min-h-[84px] text-sm leading-7 text-white/75">
                  {card.description}
                </p>
                {card.image && (
                  <div className="relative mt-5 h-32 overflow-hidden rounded-md border border-white/10">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 260px, 90vw"
                      className="object-cover object-center opacity-80 mix-blend-lighten"
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-5 rounded-xl border border-[#7b66ff] bg-[#0b0c12]/88 px-6 py-5 shadow-[0_0_16px_rgba(123,102,255,0.28)] md:px-10">
          <span className="rounded-full border border-[#7b66ff] px-4 py-2 text-lg font-bold text-purple-light">
            AIR
          </span>
          <strong className="text-xl text-purple-light">
            AIR 智能軟體引擎 × 3D 視覺方案
          </strong>
          {["深度感知突破", "大視野覆蓋", "高精度一致性", "快速部署與彈性擴展"].map(
            (item) => (
              <span key={item} className="inline-flex items-center gap-2 text-sm text-white/88">
                <CheckCircle2 size={16} className="text-purple-light" />
                {item}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function SystemSection() {
  return (
    <section
      id="air-system"
      className="scroll-mt-24 border-y border-white/10 bg-[#020307] py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionHeading title="自研軟硬件一體化，打通感知、規劃與執行" />

        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {systemSteps.map((step, index) => (
            <div key={step.label} className="relative">
              <div className="rounded-xl border border-[#7a69ac] bg-gradient-to-b from-[#070715] to-[#231e40] p-4 text-center shadow-[0_0_12px_rgba(123,102,255,0.35)]">
                <div className="relative mx-auto size-20">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover mix-blend-lighten"
                  />
                </div>
                <p className="mt-3 text-base font-semibold">{step.label}</p>
              </div>
              {index < systemSteps.length - 1 && (
                <ArrowRight
                  aria-hidden
                  className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-purple-light md:block"
                  size={22}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-[#7b66ff]/50 bg-[#0b0c12] p-5 shadow-[0_0_14px_rgba(123,102,255,0.25)]">
          <div className="flex flex-wrap items-center gap-6">
            <strong className="text-xl text-purple-light">系統組成</strong>
            <span className="text-sm text-white/75">
              AIR 智能軟體引擎 X 3D視覺方案
            </span>
            {["深度感知突破", "大視野覆蓋", "高精度一致性", "快速部署與柔性擴展"].map(
              (item) => (
                <span key={item} className="inline-flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-purple-light" />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {platformCards.map((card) => (
            <article
              key={card.title}
              className="grid overflow-hidden rounded-xl border border-[#272938] bg-[#070810] md:grid-cols-[0.45fr_0.55fr]"
            >
              <div className="p-6">
                <div className="relative mb-4 size-14 overflow-hidden rounded-lg">
                  <Image
                    src={card.icon}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover mix-blend-lighten"
                  />
                </div>
                <h3 className="text-xl font-bold text-purple-light">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  {card.description}
                </p>
              </div>
              <div className="relative min-h-[190px]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RobotScanSection() {
  return (
    <section className="bg-[#050509] py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionHeading title="RobotScan 智能成像機器人" />

        <div className="mt-8 rounded-full border border-[#7b66ff]/60 px-5 py-3 text-center text-sm text-white/85">
          高精度 3D 相機 + 低成本機械臂 + 掃描拼接軟件 = RobotScan 測量工作站
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.58fr_0.42fr]">
          <div className="grid gap-5 md:grid-cols-2">
            <StationCard
              title="單臂/雙臂工作站"
              subtitle="適用於中小尺寸測量"
              image={`${IMAGE_ROOT}/robot-workstation-fixed.png`}
            />
            <StationCard
              title="移動工作站"
              subtitle="打破空間限制，兼具空間自由度與任務靈活性"
              image={`${IMAGE_ROOT}/robot-workstation-mobile.png`}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {robotFeatureCards.map((item) => (
              <article
                key={item.title}
                className="grid min-h-[138px] grid-cols-[96px_1fr] items-center gap-4 rounded-xl border border-[#272938] bg-[#090a12] p-3"
              >
                <div className="relative size-24 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover mix-blend-lighten"
                  />
                </div>
                <p className="text-sm font-semibold leading-6 text-white/86">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-[#7b66ff]/60 px-5 py-3 text-center text-sm text-white/85">
          覆蓋Φ300-700mm（汽車零部件）、Φ500-1200mm（電池盒）至＜5000mm（汽車車架）
        </div>
      </div>
    </section>
  );
}

function SoftwareBrainSection() {
  return (
    <section className="bg-black py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionHeading title="賦能工業視覺的軟件大腦" />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {softwareCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex min-h-[620px] flex-col overflow-hidden rounded-xl border border-[#7b66ff]/35 bg-[#070810] transition-transform hover:-translate-y-1 hover:border-purple-light"
            >
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold">{card.title}</h3>
                <p className="mt-3 text-sm font-semibold text-white/78">
                  {card.subtitle}
                </p>
              </div>
              <div className="relative mx-6 h-44 overflow-hidden rounded-md border border-white/10">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 330px, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 border-t border-white/12 p-6">
                <p className="text-sm leading-7 text-white/76">
                  {card.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-purple-light">
                  <BrainCircuit size={18} />
                  核心價值
                </div>
                <p className="mt-4 text-sm leading-7 text-white/76">
                  {card.value}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-purple-light">
                  查看詳情
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      {eyebrow && (
        <p className="mb-4 inline-flex items-center gap-3 text-sm font-bold tracking-[3px] text-purple-light">
          <Sparkles size={18} />
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold leading-tight md:text-[42px]">
        <span className="text-[#7b66ff]">丨</span>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-[720px] text-base leading-8 text-white/72">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function StationCard({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <article className="rounded-xl border border-[#272938] bg-[#090a12] p-5">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 min-h-12 text-sm leading-6 text-white/70">
        {subtitle}
      </p>
      <div className="relative mt-5 h-44 overflow-hidden rounded-lg border border-white/10">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 768px) 300px, 90vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}
