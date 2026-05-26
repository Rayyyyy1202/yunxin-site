import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  Boxes,
  Box,
  CheckCircle2,
  Clock3,
  Cpu,
  Crosshair,
  Gauge,
  Layers3,
  LayoutGrid,
  Play,
  Route,
  ScanLine,
  Settings2,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import SeriesCTA from "@/components/series/SeriesCTA";

const IMAGE_ROOT = "/images/products/air-picking-station";

type CoreAdvantage = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
};

type FeatureCard = {
  id: string;
  title: string;
  icon: LucideIcon;
  image: string;
};

type DeploymentStep = {
  step: string;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
};

type ScenarioGroup = {
  number: string;
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
};

type TechnologyItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
};

const heroStats = [
  { label: "高性價比", value: "方案級整合" },
  { label: "處理效率", value: "節拍提升" },
  { label: "輕量化部署", value: "快速上線" },
];

const coreAdvantages: CoreAdvantage[] = [
  {
    id: "01",
    title: "強大效能",
    description:
      "經過多版本迭代，整合豐富功能，能在最短時間內實現最優路徑規劃。顯著提高抓取節拍及清框率。",
    icon: Zap,
    image: `${IMAGE_ROOT}/core-advantage-performance-icon.png`,
  },
  {
    id: "02",
    title: "極致易用",
    description:
      "採用圖形化、參數化介面，完全無需編程。短時間內即可輕鬆部署全新任務。",
    icon: Sparkles,
    image: `${IMAGE_ROOT}/core-advantage-usability-icon.png`,
  },
  {
    id: "03",
    title: "靈活適配",
    description:
      "採用模組化設置，完美適配多種複雜的實際生產場景，極大方便用戶的調試與實際使用。",
    icon: LayoutGrid,
    image: `${IMAGE_ROOT}/core-advantage-adaptability-icon.png`,
  },
];

const featureCards: FeatureCard[] = [
  {
    id: "01",
    title: "支援一鍵完成自動標定及七軸聯動",
    icon: CheckCircle2,
    image: `${IMAGE_ROOT}/core-feature-auto-calibration.png`,
  },
  {
    id: "02",
    title: "支援產品干擾區域設置與多抓取點設置，全面提升抓取效率",
    icon: Crosshair,
    image: `${IMAGE_ROOT}/core-feature-interference-points.png`,
  },
  {
    id: "03",
    title: "具備點雲逆向建模能力，無需依賴 CAD 模型",
    icon: Layers3,
    image: `${IMAGE_ROOT}/core-feature-point-cloud-modeling.png`,
  },
  {
    id: "04",
    title: "支援料框偏移處理，並提供全景模擬功能，讓您隨時知曉運行狀態並提前驗證方案",
    icon: Gauge,
    image: `${IMAGE_ROOT}/core-feature-bin-offset-simulation.png`,
  },
];

const deploymentSteps: DeploymentStep[] = [
  {
    step: "STEP 01",
    title: "快速啟動",
    description:
      "安裝軟件約用時 1 分鐘，打開軟件並選擇工作站與檔案夾約用時 1 分鐘。",
    time: "約 2 分鐘",
    icon: Zap,
  },
  {
    step: "STEP 02",
    title: "設備配置",
    description: "設置工作站及設置夾爪，各只需約 3 分鐘。",
    time: "約 3 分鐘",
    icon: Settings2,
  },
  {
    step: "STEP 03",
    title: "精準標定",
    description:
      "標定相機和機械臂位姿，Eye-on-hand 模式約 10 分鐘，Eye-to-hand 模式僅需 5 分鐘。",
    time: "約 5-10 分鐘",
    icon: Crosshair,
  },
  {
    step: "STEP 04",
    title: "參數設定",
    description: "設置範本匹配參數及抓取點，約用時 10 分鐘。",
    time: "約 10 分鐘",
    icon: Gauge,
  },
  {
    step: "STEP 05",
    title: "測試運行",
    description: "工作站測試約用時 3 分鐘，即可開始工作。",
    time: "約 3 分鐘",
    icon: Play,
  },
];

const technologyItems: TechnologyItem[] = [
  {
    title: "三維成像",
    description: "採用高頻條紋編碼結構光三維成像技術，捕捉精準細節。",
    icon: ScanLine,
    image: `${IMAGE_ROOT}/technology-imaging-icon.png`,
  },
  {
    title: "精準識別",
    description: "內建基於 PPF 和 ICP 匹配演算法的 3D 識別技術。",
    icon: Crosshair,
    image: `${IMAGE_ROOT}/technology-recognition-icon.png`,
  },
  {
    title: "智慧規劃",
    description: "具備奇異點自動規避及多抓取點的機器人軌跡自動規劃技術。",
    icon: Cpu,
    image: `${IMAGE_ROOT}/technology-planning-icon.png`,
  },
  {
    title: "安全防護",
    description: "運用基於空間三角形快速相交檢測演算法的全場景碰撞檢測技術，確保運行安全。",
    icon: ShieldCheck,
    image: `${IMAGE_ROOT}/technology-safety-icon.png`,
  },
];

const scenarioGroups: ScenarioGroup[] = [
  {
    number: "01",
    title: "適用工藝場景",
    description: "廣泛應用於工件下料、工件上料、衝壓件裝箱以及跟隨抓取等環節。",
    items: ["工件下料", "工件上料", "衝壓件裝箱", "跟隨抓取"],
    icon: Route,
  },
  {
    number: "02",
    title: "支援工件類型",
    description: "完美處理金屬連接件、棒料、鋁鑄件、環形工件及薄片狀金屬件等。",
    items: ["金屬連接件", "棒料", "鋁鑄件", "環形工件", "薄片狀金屬件"],
    icon: Box,
  },
  {
    number: "03",
    title: "相容料箱規格",
    description: "小型、中型、大型無序料箱，並支援托盤及工件結構化擺放的料箱。",
    items: [
      "小型無序料箱 300x400mm",
      "中型無序料箱 600x800mm",
      "大型無序料箱 800x1200mm",
      "托盤 1200x800*450mm",
    ],
    icon: Boxes,
  },
];

const applicationCases = [
  "鏈軌節無序抓取及上料",
  "汽車鈑金上料",
  "汽車零部件抓取",
];

const scenarioDesktopLabels = [
  { text: "工件下料", left: 429, top: 299, width: 199, height: 32 },
  { text: "工件上料", left: 623, top: 299, width: 203, height: 32 },
  { text: "衝壓件裝箱", left: 825, top: 299, width: 203, height: 32 },
  { text: "跟隨抓取", left: 1021, top: 299, width: 228, height: 32 },
  { text: "金屬連接件", left: 467, top: 481, width: 80, height: 24 },
  { text: "棒料", left: 652, top: 481, width: 32, height: 24 },
  { text: "鋁鑄件", left: 801, top: 481, width: 48, height: 24 },
  { text: "環形工件", left: 958, top: 481, width: 64, height: 24 },
  { text: "薄片狀金屬件", left: 1101, top: 481, width: 96, height: 24 },
  { text: "小型無序料箱\n(300x400mm)", left: 413, top: 738, width: 129, height: 48 },
  { text: "中型無序料箱\n(600x800mm)", left: 603, top: 738, width: 129, height: 48 },
  { text: "大型無序料箱\n(800x1200mm)", left: 802, top: 738, width: 136, height: 48 },
  {
    text: "支援托盤 (1200x800*450mm)\n及工件結構化擺放的料箱",
    left: 990,
    top: 738,
    width: 243,
    height: 48,
  },
];

export default function AirPickingStationPage() {
  return (
    <div className="overflow-x-hidden bg-[#010104] pt-16 md:pt-20">
      <HeroSection />
      <CoreAdvantagesSection />
      <DeploymentSection />
      <TechnologySection />
      <ScenariosSection />
      <CasesSection />
      <SeriesCTA
        data={{
          title: "開啟工業具身智能新節點",
          subtitle:
            "我們的專家團隊已準備好為您量身定制工業智能解決方案。聯繫我們，獲取全方位的技術諮詢與場景建議。",
          primaryCta: { label: "獲取報價/諮詢", href: "/about/contact" },
          secondaryCta: { label: "預約線下演示", href: "/about/contact" },
          backgroundDefault: "/images/series/shared/cta-overlay-border-blur.png",
        }}
      />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative bg-black">
      <div className="mx-auto hidden max-w-[1280px] overflow-hidden md:block">
        <div className="relative aspect-[1280/530]">
          <Image
            src={`${IMAGE_ROOT}/hero-machine.png`}
            alt=""
            fill
            priority
            sizes="1280px"
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.88)_36%,rgba(0,0,0,0.2)_72%,rgba(0,0,0,0.04)_100%)]" />
          <div
            className="absolute z-10 flex flex-col items-start"
            style={figmaLayerStyle(40, 109, 604, 360, 1280, 530)}
          >
            <p className="whitespace-nowrap bg-[linear-gradient(90deg,#492e8d_0%,#7b66ff_100%)] bg-clip-text text-[clamp(28px,2.8125vw,36px)] font-bold leading-none text-transparent">
              多維視覺引導機器人抓取引擎
            </p>
            <h1 className="mt-7 text-[clamp(58px,6.40625vw,82px)] font-bold leading-none text-[#7b66ff]">
              AIR Picking
            </h1>
            <p className="mt-8 max-w-[606px] text-[clamp(19px,1.875vw,24px)] font-semibold leading-[1.5] text-white">
              AIeveR 3D相機 + 機械臂 + AIR Picking 無序抓取軟件
              <br />
              無序抓取工作站解決方案
            </p>
            <div className="mt-10 flex gap-[30px]">
              <Link
                href="/about/contact"
                className="inline-flex h-[58px] w-[150px] items-center justify-center rounded-lg bg-[rgba(73,46,141,0.82)] text-base font-medium text-white transition-colors hover:bg-purple-primary"
              >
                立即咨詢
              </Link>
              <Link
                href="#air-picking-core"
                className="inline-flex h-[58px] w-[150px] items-center justify-center gap-2 border border-[rgba(71,72,74,0.8)] bg-black/35 text-base font-medium text-white transition-colors hover:border-purple-light hover:text-purple-light"
              >
                <Play size={16} fill="currentColor" strokeWidth={0} />
                功能演示
              </Link>
            </div>
          </div>
          <div
            className="absolute z-10 grid gap-3"
            style={figmaLayerStyle(710, 140, 390, 150, 1280, 530)}
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border border-purple-light/35 bg-black/42 px-5 py-3 text-white backdrop-blur-sm"
              >
                <span className="text-xl font-bold">{stat.label}</span>
                <span className="text-sm text-purple-light">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative min-h-[680px] overflow-hidden md:hidden">
        <Image
          src={`${IMAGE_ROOT}/hero-machine.png`}
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized
          className="object-cover object-[66%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.7)_58%,rgba(0,0,0,0.18)_100%)]" />
        <div className="relative z-10 flex min-h-[680px] flex-col px-6 pb-16 pt-20">
          <p className="bg-[linear-gradient(90deg,#492e8d_0%,#7b66ff_100%)] bg-clip-text text-3xl font-bold leading-tight text-transparent">
            多維視覺引導機器人抓取引擎
          </p>
          <h1 className="mt-5 text-[56px] font-bold leading-none text-[#7b66ff]">
            AIR Picking
          </h1>
          <p className="mt-7 text-xl font-semibold leading-8 text-white">
            AIeveR 3D相機 + 機械臂 + AIR Picking 無序抓取軟件
            <br />
            無序抓取工作站解決方案
          </p>
          <div className="mt-8 grid gap-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between rounded-lg border border-purple-light/35 bg-black/45 px-4 py-3 text-white backdrop-blur-sm"
              >
                <span className="font-bold">{stat.label}</span>
                <span className="text-sm text-purple-light">{stat.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-5">
            <Link
              href="/about/contact"
              className="inline-flex h-[54px] min-w-[148px] items-center justify-center rounded-lg bg-purple-primary/90 px-7 text-sm font-semibold text-white"
            >
              立即咨詢
            </Link>
            <Link
              href="#air-picking-core"
              className="inline-flex h-[54px] min-w-[148px] items-center justify-center gap-2 border border-white/25 bg-black/35 px-7 text-sm font-semibold text-white"
            >
              <Play size={16} fill="currentColor" strokeWidth={0} />
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
    <section id="air-picking-core" className="scroll-mt-24 bg-[#010104]">
      <DesktopCanvas height={1497}>
        <SectionTitle
          title="核心優勢"
          suffix="/ Core Advantages"
          baseHeight={1497}
          top={0}
          height={161}
        />
        <FigmaLayerImage
          src={`${IMAGE_ROOT}/core-advantages-bg.png`}
          left={0}
          top={161}
          width={1280}
          height={854}
          baseHeight={1497}
          sizes="1280px"
          className="object-cover object-center"
        />
        {coreAdvantages.map((item, index) => (
          <div key={item.id}>
            <div
              className="absolute overflow-hidden"
              style={figmaLayerStyle(40, 161 + index * 223, 153, 153, 1280, 1497)}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="153px"
                unoptimized
                className="object-contain"
              />
            </div>
            <div
              className="absolute"
              style={figmaLayerStyle(219, 161 + index * 223, 340, 153, 1280, 1497)}
            >
              <GradientHeading>{item.title}</GradientHeading>
              <p className="mt-3 text-xl font-semibold leading-[1.5] text-[#fdfbfe]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
        <div
          className="absolute overflow-hidden"
          style={figmaLayerStyle(40, 830, 153, 153, 1280, 1497)}
        >
          <Image
            src={`${IMAGE_ROOT}/core-advantage-feature-icon.png`}
            alt=""
            fill
            sizes="153px"
            unoptimized
            className="object-contain"
          />
        </div>
        <div
          className="absolute"
          style={figmaLayerStyle(219, 875, 180, 64, 1280, 1497)}
        >
          <GradientHeading>全能特性</GradientHeading>
        </div>
        {featureCards.map((feature, index) => (
          <FeatureDesktopCard key={feature.id} feature={feature} index={index} />
        ))}
      </DesktopCanvas>

      <MobileSection title="核心優勢" kicker="Core Advantages">
        <div className="grid gap-4">
          {coreAdvantages.map((item) => (
            <MobileInfoCard key={item.id} item={item} />
          ))}
        </div>
        <h3 className="mt-10 text-3xl font-black text-white">全能特性</h3>
        <div className="mt-6 grid gap-4">
          {featureCards.map((feature) => (
            <MobileFeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </MobileSection>
    </section>
  );
}

function DeploymentSection() {
  return (
    <section className="bg-black">
      <DesktopCanvas height={905}>
        <SectionTitle title="極速部署體驗" baseHeight={905} top={0} height={107} centered />
        <FigmaLayerImage
          src={`${IMAGE_ROOT}/deployment-bg.png`}
          left={0}
          top={107}
          width={1280}
          height={798}
          baseHeight={905}
          sizes="1280px"
          className="object-cover object-bottom opacity-65"
        />
        <div
          aria-hidden
          className="absolute bg-[radial-gradient(circle_at_50%_45%,rgba(123,102,255,0.2),transparent_42%)]"
          style={figmaLayerStyle(0, 107, 1280, 798, 1280, 905)}
        />
        <div className="absolute inset-x-[2.8%] top-[14.1%] grid grid-cols-5 gap-6">
          {deploymentSteps.map((step) => (
            <DeploymentDesktopStep key={step.step} step={step} />
          ))}
        </div>
        <div className="absolute inset-x-[6.5%] top-[69.9%] grid grid-cols-5 gap-5">
          {deploymentSteps.map((step) => (
            <div
              key={step.step}
              className="flex h-16 items-center justify-center rounded-full border border-purple-light/28 bg-black/55 text-2xl font-bold text-purple-light"
            >
              {step.time}
            </div>
          ))}
        </div>
        <p
          className="absolute text-center text-[clamp(28px,3.75vw,48px)] font-semibold leading-none text-white"
          style={figmaLayerStyle(330, 767, 620, 58, 1280, 905)}
        >
          整體流程測試僅需不到 <span className="text-purple-light">25 分鐘</span>！
        </p>
      </DesktopCanvas>

      <MobileSection title="極速部署體驗" kicker="Deployment">
        <div className="grid gap-4">
          {deploymentSteps.map((step) => (
            <DeploymentMobileStep key={step.step} step={step} />
          ))}
        </div>
        <p className="mt-6 rounded-full border border-purple-light/35 bg-purple-primary/12 px-5 py-4 text-center text-lg font-bold text-white">
          整體流程測試僅需不到 <span className="text-purple-light">25 分鐘</span>！
        </p>
      </MobileSection>
    </section>
  );
}

function TechnologySection() {
  return (
    <section className="bg-black">
      <DesktopCanvas height={760}>
        <SectionTitle title="硬核技術底座" baseHeight={760} top={0} height={107} centered />
        <FigmaLayerImage
          src={`${IMAGE_ROOT}/technology-bg.png`}
          left={0}
          top={107}
          width={1280}
          height={653}
          baseHeight={760}
          sizes="1280px"
          className="object-cover object-bottom opacity-90"
        />
        <div className="absolute inset-x-[5.3%] top-[60%] grid grid-cols-4 gap-[61px]">
          {technologyItems.map((item) => (
            <TechnologyDesktopCard key={item.title} item={item} />
          ))}
        </div>
      </DesktopCanvas>

      <MobileSection title="硬核技術底座" kicker="Technology">
        <div className="grid gap-4">
          {technologyItems.map((item) => (
            <MobileInfoCard key={item.title} item={item} />
          ))}
        </div>
      </MobileSection>
    </section>
  );
}

function ScenariosSection() {
  return (
    <section className="bg-black">
      <DesktopCanvas height={825}>
        <SectionTitle title="廣泛的適用場景" baseHeight={825} top={0} height={107} centered />
        <FigmaLayerImage
          src={`${IMAGE_ROOT}/scenarios-bg.png`}
          left={0}
          top={107}
          width={1280}
          height={718}
          baseHeight={825}
          sizes="1280px"
          className="object-cover object-bottom"
        />
        {scenarioGroups.map((group, index) => (
          <ScenarioTextBlock key={group.number} group={group} top={[160, 368, 564][index]} />
        ))}
        {scenarioDesktopLabels.map((label) => (
          <ScenarioDesktopLabel key={label.text} {...label} />
        ))}
      </DesktopCanvas>

      <MobileSection title="廣泛的適用場景" kicker="Scenarios">
        <div className="grid gap-4">
          {scenarioGroups.map((group) => (
            <ScenarioMobileCard key={group.number} group={group} />
          ))}
        </div>
      </MobileSection>
    </section>
  );
}

function CasesSection() {
  return (
    <section className="bg-black">
      <DesktopCanvas height={598}>
        <SectionTitle
          title="AIR Picking Station應用案例"
          baseHeight={598}
          top={0}
          height={107}
          centered
        />
        <div
          className="absolute bg-[#010104]"
          style={figmaLayerStyle(0, 107, 1280, 491, 1280, 598)}
        />
        <div className="absolute left-[3.125%] right-[3.125%] top-[22.575%] grid grid-cols-3 gap-[21px]">
          {applicationCases.map((title, index) => (
            <CaseDesktopCard key={title} title={title} index={index} />
          ))}
        </div>
      </DesktopCanvas>

      <MobileSection title="AIR Picking Station應用案例" kicker="Cases">
        <div className="grid gap-4">
          {applicationCases.map((title, index) => (
            <CaseMobileCard key={title} title={title} index={index} />
          ))}
        </div>
      </MobileSection>
    </section>
  );
}

function DesktopCanvas({
  height,
  children,
}: {
  height: number;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto hidden max-w-[1280px] md:block">
      <div className="relative overflow-hidden" style={{ aspectRatio: `1280 / ${height}` }}>
        {children}
      </div>
    </div>
  );
}

function FigmaLayerImage({
  src,
  left,
  top,
  width,
  height,
  baseHeight,
  sizes,
  className = "object-cover object-center",
}: {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  baseHeight: number;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className="absolute overflow-hidden"
      style={figmaLayerStyle(left, top, width, height, 1280, baseHeight)}
    >
      <Image src={src} alt="" fill sizes={sizes} unoptimized className={className} />
    </div>
  );
}

function SectionTitle({
  title,
  suffix,
  baseHeight,
  top,
  height,
  centered = false,
}: {
  title: string;
  suffix?: string;
  baseHeight: number;
  top: number;
  height: number;
  centered?: boolean;
}) {
  return (
    <div
      className="absolute flex items-center bg-black px-9"
      style={figmaLayerStyle(0, top, 1280, height, 1280, baseHeight)}
    >
      <h2
        className={
          centered
            ? "w-full text-center text-[clamp(34px,3.75vw,48px)] font-semibold leading-none text-white"
            : "text-[clamp(34px,3.75vw,48px)] font-medium leading-tight text-white"
        }
      >
        {title}
        {suffix ? (
          <span className="ml-3 bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_60%)] bg-clip-text font-bold text-transparent">
            {suffix}
          </span>
        ) : null}
      </h2>
    </div>
  );
}

function GradientHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text text-4xl font-black leading-[1.55] text-transparent">
      {children}
    </h3>
  );
}

function FeatureDesktopCard({
  feature,
  index,
}: {
  feature: FeatureCard;
  index: number;
}) {
  const left = 50 + index * 310;
  return (
    <article
      className="absolute border-2 border-[rgba(123,102,255,0.4)] bg-black"
      style={figmaLayerStyle(left, 1022, 270, 418, 1280, 1497)}
    >
      <div className="absolute left-[3.7%] top-[1.67%] h-[59.81%] w-[92.59%] overflow-hidden">
        <Image
          src={feature.image}
          alt=""
          fill
          sizes="250px"
          unoptimized
          className="object-contain"
        />
      </div>
      <p className="absolute inset-x-[8%] top-[65.07%] text-center text-xl font-medium leading-[1.5] text-white">
        {feature.title}
      </p>
    </article>
  );
}

function DeploymentDesktopStep({ step }: { step: DeploymentStep }) {
  const Icon = step.icon;
  return (
    <article className="min-h-[252px] border border-purple-light/18 bg-black/44 p-5 text-white backdrop-blur-sm">
      <p className="inline-flex rounded bg-purple-primary px-3 py-1 text-base font-black text-white">
        {step.step}
      </p>
      <div className="mt-7 flex items-center gap-3">
        <Icon className="text-purple-light" size={28} strokeWidth={1.45} />
        <h3 className="text-[28px] font-semibold leading-none">{step.title}</h3>
      </div>
      <p className="mt-6 text-base leading-[1.5] text-white/80">{step.description}</p>
    </article>
  );
}

function TechnologyDesktopCard({ item }: { item: TechnologyItem }) {
  return (
    <article className="text-white">
      <div className="relative h-16 w-16 overflow-hidden">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="64px"
          unoptimized
          className="object-contain"
        />
      </div>
      <h3 className="mt-5 text-[28px] font-semibold leading-none">{item.title}</h3>
      <p className="mt-7 text-base leading-[2] text-white/78">{item.description}</p>
    </article>
  );
}

function ScenarioTextBlock({ group, top }: { group: ScenarioGroup; top: number }) {
  return (
    <div className="absolute flex gap-8" style={figmaLayerStyle(52, top, 360, 170, 1280, 825)}>
      <div className="flex h-12 w-14 shrink-0 items-center justify-center bg-purple-primary text-3xl font-black text-white">
        {group.number}
      </div>
      <div>
        <h3 className="text-[28px] font-semibold leading-none text-white">{group.title}</h3>
        <p className="mt-5 max-w-[288px] text-base leading-[2] text-white/74">{group.description}</p>
      </div>
    </div>
  );
}

function ScenarioDesktopLabel({
  text,
  left,
  top,
  width,
  height,
}: {
  text: string;
  left: number;
  top: number;
  width: number;
  height: number;
}) {
  return (
    <p
      className="absolute flex items-center justify-center whitespace-pre-line text-center text-base font-black leading-[1.5] text-[#f5f5f5]"
      style={figmaLayerStyle(left, top, width, height, 1280, 825)}
    >
      {text}
    </p>
  );
}

function CaseDesktopCard({ title }: { title: string; index: number }) {
  return (
    <article className="text-center text-white">
      <div className="aspect-[386/257] rounded-[15px] border-2 border-[rgba(123,102,255,0.4)] bg-black" />
      <h3 className="mt-7 text-2xl font-bold leading-[1.5]">{title}</h3>
    </article>
  );
}

function MobileSection({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker: string;
  children: ReactNode;
}) {
  return (
    <div className="px-6 py-14 md:hidden">
      <div className="mx-auto max-w-[560px]">
        <p className="text-xs font-bold uppercase text-purple-light">{kicker}</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-white">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

function MobileInfoCard({
  item,
}: {
  item: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
}) {
  const Icon = item.icon;
  return (
    <article className="rounded-lg border border-[#7b66ff]/35 bg-[linear-gradient(145deg,rgba(8,9,17,0.96),rgba(0,0,0,0.9))] p-5">
      <div className="flex h-14 w-14 items-center justify-center border border-[#7b66ff]/55 bg-purple-primary/18 text-purple-light">
        <Icon size={28} strokeWidth={1.6} />
      </div>
      <h3 className="mt-5 bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text text-2xl font-black text-transparent">
        {item.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-white/76">{item.description}</p>
    </article>
  );
}

function MobileFeatureCard({ feature }: { feature: FeatureCard }) {
  const Icon = feature.icon;
  return (
    <article className="rounded-lg border border-[#7b66ff]/30 bg-[#080911] p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center bg-purple-primary/20 text-purple-light">
          <Icon size={24} strokeWidth={1.6} />
        </div>
        <p className="text-sm font-semibold text-purple-light">{feature.id}</p>
      </div>
      <p className="mt-5 text-base font-semibold leading-7 text-white/84">{feature.title}</p>
    </article>
  );
}

function DeploymentMobileStep({ step }: { step: DeploymentStep }) {
  const Icon = step.icon;
  return (
    <article className="rounded-lg border border-[#7b66ff]/35 bg-[linear-gradient(145deg,rgba(9,10,18,0.96),rgba(0,0,0,0.9))] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="rounded bg-purple-primary px-3 py-1 text-xs font-black text-white">
          {step.step}
        </p>
        <p className="inline-flex items-center gap-2 rounded-full bg-purple-primary/18 px-3 py-1 text-xs font-bold text-purple-light">
          <Clock3 size={14} />
          {step.time}
        </p>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <Icon className="text-purple-light" size={25} strokeWidth={1.5} />
        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
      </div>
      <p className="mt-4 text-sm leading-7 text-white/72">{step.description}</p>
    </article>
  );
}

function ScenarioMobileCard({ group }: { group: ScenarioGroup }) {
  const Icon = group.icon;
  return (
    <article className="rounded-lg border border-[#7b66ff]/35 bg-[#070812] p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-14 items-center justify-center bg-purple-primary text-xl font-black text-white">
          {group.number}
        </div>
        <Icon className="text-purple-light" size={28} strokeWidth={1.5} />
      </div>
      <h3 className="mt-5 text-2xl font-bold text-white">{group.title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/72">{group.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-purple-light/25 bg-purple-primary/12 px-3 py-1.5 text-xs font-semibold text-white/82"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function CaseMobileCard({ title }: { title: string; index: number }) {
  return (
    <article className="rounded-lg border border-[#7b66ff]/35 bg-[#070812] p-5">
      <div className="aspect-[16/9] rounded-lg border border-purple-light/30 bg-black/70" />
      <h3 className="mt-5 text-xl font-bold leading-8 text-white">{title}</h3>
    </article>
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
