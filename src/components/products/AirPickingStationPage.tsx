import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Play } from "lucide-react";
import SeriesCTA from "@/components/series/SeriesCTA";
import WorkstationUseCasesSection from "@/components/products/WorkstationUseCasesSection";

const IMAGE_ROOT = "/images/products/air-picking-station";

type AdvantageItem = {
  title: string;
  description?: string;
  image: string;
  top: number;
};

type FeatureCard = {
  title: string;
  image: string;
  left: number;
  width: number;
};

type DeploymentStep = {
  step: string;
  title: string;
  description: ReactNode;
  timeValue: string;
  left: number;
  titleLeft: number;
  descriptionLeft: number;
  timeLeft: number;
};

type TechnologyItem = {
  title: string;
  description: string;
  image: string;
  left: number;
  descriptionHeight: number;
};

type ScenarioBlock = {
  number: string;
  title: string;
  description: ReactNode;
  top: number;
};

type ScenarioLabel = {
  text: ReactNode;
  left: number;
  top: number;
  width: number;
  height: number;
};

const coreAdvantages: AdvantageItem[] = [
  {
    title: "強大效能",
    description:
      "經過多版本迭代，整合豐富功能，能在最短時間內實現最優路徑規劃 。顯著提高抓取節拍及清框率 。",
    image: `${IMAGE_ROOT}/core-advantage-performance-icon.png`,
    top: 161,
  },
  {
    title: "極致易用",
    description: "採用圖形化、參數化介面，完全無需編程 。短時間內即可輕鬆部署全新任務 。",
    image: `${IMAGE_ROOT}/core-advantage-usability-icon.png`,
    top: 384,
  },
  {
    title: "靈活適配",
    description:
      "採用模組化設置，完美適配多種複雜的實際生產場景，極大方便用戶的調試與實際使用 。",
    image: `${IMAGE_ROOT}/core-advantage-adaptability-icon.png`,
    top: 607,
  },
  {
    title: "全能特性",
    image: `${IMAGE_ROOT}/core-advantage-feature-icon.png`,
    top: 830,
  },
];

const featureCards: FeatureCard[] = [
  {
    title: "支援一鍵完成自動標定及七軸聯動",
    image: `${IMAGE_ROOT}/core-feature-auto-calibration.png`,
    left: 40,
    width: 203,
  },
  {
    title: "支援產品干擾區域設置與多抓取點設置，全面提升抓取效率",
    image: `${IMAGE_ROOT}/core-feature-interference-points.png`,
    left: 350,
    width: 203,
  },
  {
    title: "具備點雲逆向建模能力，無需依賴 CAD 模型",
    image: `${IMAGE_ROOT}/core-feature-point-cloud-modeling.png`,
    left: 660,
    width: 221,
  },
  {
    title: "支援料框偏移處理，並提供全景模擬功能，讓您隨時知曉運行狀態並提前驗證方案",
    image: `${IMAGE_ROOT}/core-feature-bin-offset-simulation.png`,
    left: 970,
    width: 229,
  },
];

const deploymentSteps: DeploymentStep[] = [
  {
    step: "STEP 01",
    title: "快速啟動",
    description: (
      <>
        安裝軟件約用時 1 分鐘
        <br />
        打開軟件並選擇工作站
        <br />
        與檔案夾約用時 1 分鐘
      </>
    ),
    timeValue: "2",
    left: 36,
    titleLeft: 47,
    descriptionLeft: 47,
    timeLeft: 102,
  },
  {
    step: "STEP 02",
    title: "設備配置",
    description: "設置工作站及設置夾爪，各只需約 3 分鐘",
    timeValue: "3",
    left: 273,
    titleLeft: 282,
    descriptionLeft: 282,
    timeLeft: 341,
  },
  {
    step: "STEP 03",
    title: "精準標定",
    description: "標定相機和機械臂位姿，Eye-on-hand 模式約 10 分鐘，Eye-to-hand 模式僅需 5 分鐘",
    timeValue: "5-10",
    left: 521,
    titleLeft: 536,
    descriptionLeft: 536,
    timeLeft: 589,
  },
  {
    step: "STEP 04",
    title: "參數設定",
    description: "設置範本匹配參數及抓取點，約用時 10 分鐘",
    timeValue: "10",
    left: 770,
    titleLeft: 790,
    descriptionLeft: 790,
    timeLeft: 839,
  },
  {
    step: "STEP 05",
    title: "測試運行",
    description: "工作站測試約用時 3 分鐘，即可開始工作",
    timeValue: "3",
    left: 1024,
    titleLeft: 1044,
    descriptionLeft: 1044,
    timeLeft: 1092,
  },
];

const technologyItems: TechnologyItem[] = [
  {
    title: "三維成像",
    description: "採用高頻條紋編碼結構光三維成像技術，捕捉精準細節 。",
    image: `${IMAGE_ROOT}/technology-imaging-icon.png`,
    left: 68,
    descriptionHeight: 64,
  },
  {
    title: "精準識別",
    description: "內建基於 PPF 和 ICP 匹配演算法的 3D 識別技術 。",
    image: `${IMAGE_ROOT}/technology-recognition-icon.png`,
    left: 369,
    descriptionHeight: 64,
  },
  {
    title: "智慧規劃",
    description: "具備奇異點自動規避及多抓取點的機器人軌跡自動規劃技術 。",
    image: `${IMAGE_ROOT}/technology-planning-icon.png`,
    left: 671,
    descriptionHeight: 64,
  },
  {
    title: "安全防護",
    description: "運用基於空間三角形快速相交檢測演算法的全場景碰撞檢測技術，確保運行安全 。",
    image: `${IMAGE_ROOT}/technology-safety-icon.png`,
    left: 973,
    descriptionHeight: 96,
  },
];

const scenarioBlocks: ScenarioBlock[] = [
  {
    number: "01",
    title: "適用工藝場景",
    description: (
      <>
        廣泛應用於工件下料、工件上料、衝壓件
        <br />
        裝箱以及跟隨抓取等環節 。
      </>
    ),
    top: 260,
  },
  {
    number: "02",
    title: "支援工件類型",
    description: (
      <>
        完美處理金屬連接件、棒料、鋁鑄件、環
        <br />
        形工件及薄片狀金屬件等 。
      </>
    ),
    top: 430,
  },
  {
    number: "03",
    title: "相容料箱規格",
    description: (
      <>
        小型無序料箱 (300x400mm) 。
        <br />
        中型無序料箱 (600x800mm) 。
        <br />
        大型無序料箱 (800x1200mm) 。
        <br />
        支援托盤 (1200x800*450mm)
        <br />
        及工件結構化擺放的料箱 。
      </>
    ),
    top: 596,
  },
];

const scenarioLabels: ScenarioLabel[] = [
  { text: "工件下料", left: 429, top: 382, width: 199, height: 28 },
  { text: "工件上料", left: 623, top: 382, width: 203, height: 28 },
  { text: "衝壓件裝箱", left: 825, top: 382, width: 203, height: 28 },
  { text: "跟隨抓取", left: 1021, top: 382, width: 228, height: 28 },
  { text: "金屬連接件", left: 467, top: 542, width: 80, height: 22 },
  { text: "棒料", left: 652, top: 542, width: 32, height: 22 },
  { text: "鋁鑄件", left: 801, top: 542, width: 48, height: 22 },
  { text: "環形工件", left: 958, top: 542, width: 64, height: 22 },
  { text: "薄片狀金屬件", left: 1101, top: 542, width: 96, height: 22 },
  {
    text: (
      <>
        小型無序料箱
        <br /> (300x400mm)
      </>
    ),
    left: 413,
    top: 738,
    width: 129,
    height: 48,
  },
  {
    text: (
      <>
        中型無序料箱
        <br /> (600x800mm)
      </>
    ),
    left: 603,
    top: 738,
    width: 129,
    height: 48,
  },
  {
    text: (
      <>
        大型無序料箱
        <br /> (800x1200mm)
      </>
    ),
    left: 802,
    top: 738,
    width: 136,
    height: 48,
  },
  {
    text: (
      <>
        支援托盤 (1200x800*450mm)
        <br />
        及工件結構化擺放的料箱
      </>
    ),
    left: 990,
    top: 738,
    width: 243,
    height: 48,
  },
];

const applicationCases = [
  "鏈軌節無序抓取及上料",
  "汽車鈑金上料",
  "汽車零部件抓取",
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
          title: "開啟工業具身智能新篇章",
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
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.86)_33%,rgba(0,0,0,0.16)_72%,rgba(0,0,0,0.04)_100%)]" />
          <div
            className="absolute z-10 flex flex-col items-start"
            style={figmaLayerStyle(40, 109, 604, 360, 1280, 530)}
          >
            <p className="whitespace-nowrap bg-[linear-gradient(90deg,#492e8d_0%,#7b66ff_100%)] bg-clip-text text-[30px] font-bold leading-none text-transparent lg:text-[36px]">
              多維視覺引導機器人抓取引擎
            </p>
            <h1 className="mt-7 text-[64px] font-bold leading-none text-[#7b66ff] lg:text-[82px]">
              AIR Picking
            </h1>
            <p className="mt-8 max-w-[606px] text-[22px] font-semibold leading-[36px] text-white lg:text-[24px]">
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
        </div>
      </div>

      <div className="relative min-h-[640px] overflow-hidden md:hidden">
        <Image
          src={`${IMAGE_ROOT}/hero-machine.png`}
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized
          className="object-cover object-[66%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.72)_60%,rgba(0,0,0,0.2)_100%)]" />
        <div className="relative z-10 flex min-h-[640px] flex-col px-6 pb-16 pt-20">
          <p className="bg-[linear-gradient(90deg,#492e8d_0%,#7b66ff_100%)] bg-clip-text text-3xl font-bold leading-tight text-transparent">
            多維視覺引導機器人抓取引擎
          </p>
          <h1 className="mt-5 text-[54px] font-bold leading-none text-[#7b66ff]">
            AIR Picking
          </h1>
          <p className="mt-7 text-xl font-semibold leading-8 text-white">
            AIeveR 3D相機 + 機械臂 + AIR Picking 無序抓取軟件
            <br />
            無序抓取工作站解決方案
          </p>
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
        <OrnamentTitle title="核心優勢" baseHeight={1497} height={161} />
        <FigmaLayerImage
          src={`${IMAGE_ROOT}/core-advantages-bg.png`}
          left={0}
          top={161}
          width={1280}
          height={854}
          baseHeight={1497}
          sizes="1280px"
          className="object-fill"
        />
        {coreAdvantages.map((item) => (
          <div key={item.title}>
            <div
              className="absolute overflow-hidden"
              style={figmaLayerStyle(40, item.top, 153, 153, 1280, 1497)}
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
              style={figmaLayerStyle(219, item.top, 340, item.description ? 153 : 64, 1280, 1497)}
            >
              <GradientHeading>{item.title}</GradientHeading>
              {item.description ? (
                <p className="mt-3 text-xl font-semibold leading-[30px] text-[#fdfbfe]">
                  {item.description}
                </p>
              ) : null}
            </div>
          </div>
        ))}
        {featureCards.map((feature) => (
          <FeatureDesktopCard key={feature.title} feature={feature} />
        ))}
      </DesktopCanvas>

      <MobileSection title="核心優勢">
        <div className="relative mb-8 aspect-[1536/1024] overflow-hidden rounded-lg border border-purple-light/25">
          <Image
            src={`${IMAGE_ROOT}/core-advantages-bg.png`}
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="grid gap-4">
          {coreAdvantages.map((item) => (
            <MobileInfoCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
        <div className="mt-8 grid gap-4">
          {featureCards.map((feature) => (
            <MobileFeatureCard key={feature.title} feature={feature} />
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
        <OrnamentTitle title="極速部署體驗" baseHeight={905} height={107} />
        <FigmaLayerImage
          src={`${IMAGE_ROOT}/deployment-visual-bg.png`}
          left={0}
          top={107}
          width={1280}
          height={798}
          baseHeight={905}
          sizes="1280px"
          className="object-fill"
        />
        {deploymentSteps.map((step) => (
          <DeploymentDesktopText key={step.step} step={step} />
        ))}
        <p
          className="absolute whitespace-nowrap text-center text-[38px] font-semibold leading-[48px] text-[#fdfbfe]"
          style={figmaLayerStyle(356, 767, 620, 48, 1280, 905)}
        >
          整體流程測試僅需不到{" "}
          <span className="bg-[linear-gradient(90deg,#bf81ff_0%,#7b66ff_100%)] bg-clip-text text-[48px] text-transparent">
            25 分鐘
          </span>
          ！
        </p>
      </DesktopCanvas>

      <MobileSection title="極速部署體驗">
        <div className="relative mb-8 aspect-[1536/1024] overflow-hidden rounded-lg border border-purple-light/25">
          <Image
            src={`${IMAGE_ROOT}/deployment-visual-bg.png`}
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="grid gap-4">
          {deploymentSteps.map((step) => (
            <DeploymentMobileStep key={step.step} step={step} />
          ))}
        </div>
        <p className="mt-6 whitespace-nowrap rounded-full border border-purple-light/35 bg-purple-primary/12 px-3 py-4 text-center text-[16px] font-bold text-white min-[380px]:text-[17px] sm:text-[20px]">
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
        <OrnamentTitle title="硬核技術底座" baseHeight={760} height={107} />
        <FigmaLayerImage
          src={`${IMAGE_ROOT}/technology-bg.png`}
          left={0}
          top={107}
          width={1280}
          height={653}
          baseHeight={760}
          sizes="1280px"
          className="object-fill"
        />
        {technologyItems.map((item) => (
          <TechnologyDesktopCard key={item.title} item={item} />
        ))}
      </DesktopCanvas>

      <MobileSection title="硬核技術底座">
        <div className="relative mb-8 aspect-[1536/1024] overflow-hidden rounded-lg border border-purple-light/25">
          <Image
            src={`${IMAGE_ROOT}/technology-bg.png`}
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="grid gap-4">
          {technologyItems.map((item) => (
            <MobileInfoCard key={item.title} title={item.title} description={item.description} />
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
        <OrnamentTitle title="廣泛的適用場景" baseHeight={825} height={107} textSize="text-[42px]" />
        <FigmaLayerImage
          src={`${IMAGE_ROOT}/scenarios-bg.png`}
          left={0}
          top={107}
          width={1280}
          height={718}
          baseHeight={825}
          sizes="1280px"
          className="object-fill"
        />
        {scenarioBlocks.map((block) => (
          <ScenarioTextBlock key={block.number} block={block} />
        ))}
        {scenarioLabels.map((label) => (
          <ScenarioDesktopLabel key={`${label.left}-${label.top}`} {...label} />
        ))}
      </DesktopCanvas>

      <MobileSection title="廣泛的適用場景">
        <div className="relative mb-8 aspect-[1536/1024] overflow-hidden rounded-lg border border-purple-light/25">
          <Image
            src={`${IMAGE_ROOT}/scenarios-bg.png`}
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="grid gap-4">
          {scenarioBlocks.map((block) => (
            <ScenarioMobileCard key={block.number} block={block} />
          ))}
        </div>
      </MobileSection>
    </section>
  );
}

function CasesSection() {
  return (
    <WorkstationUseCasesSection
      title="AIR Picking Station應用案例"
      cases={applicationCases}
      imageSrc={`${IMAGE_ROOT}/group138-cases.png`}
      imageAlt="AIR Picking Station應用案例"
    />
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

function OrnamentTitle({
  title,
  baseHeight,
  height,
  textSize = "text-[48px]",
}: {
  title: string;
  baseHeight: number;
  height: number;
  textSize?: string;
}) {
  return (
    <div
      className="absolute flex items-center justify-center overflow-hidden bg-black"
      style={figmaLayerStyle(0, 0, 1280, height, 1280, baseHeight)}
    >
      <div className="absolute left-[4%] top-[36%] h-[24px] w-[29%] border-t-2 border-purple-light/55 opacity-70 before:absolute before:right-0 before:top-[-7px] before:h-[12px] before:w-[64px] before:border-t-2 before:border-purple-light/65 before:content-['']" />
      <div className="absolute right-[4%] top-[36%] h-[24px] w-[29%] border-t-2 border-purple-light/55 opacity-70 before:absolute before:left-0 before:top-[-7px] before:h-[12px] before:w-[64px] before:border-t-2 before:border-purple-light/65 before:content-['']" />
      <h2 className={`${textSize} relative z-10 text-center font-semibold leading-[1.5] text-[#fdfbfe]`}>
        {title}
      </h2>
      <span className="absolute bottom-[26%] h-[3px] w-[54px] bg-purple-light" />
    </div>
  );
}

function GradientHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text text-4xl font-black leading-[63px] text-transparent">
      {children}
    </h3>
  );
}

function FeatureDesktopCard({ feature }: { feature: FeatureCard }) {
  return (
    <article
      className="absolute border-2 border-[rgba(123,102,255,0.4)] bg-black"
      style={figmaLayerStyle(feature.left, 1015, 270, 418, 1280, 1497)}
    >
      <div className="absolute left-[10px] top-[7px] h-[250px] w-[250px] overflow-hidden">
        <Image
          src={feature.image}
          alt=""
          fill
          sizes="250px"
          unoptimized
          className="object-contain"
        />
      </div>
      <p
        className="absolute top-[270px] text-center text-xl font-medium leading-[30px] text-white"
        style={{ left: `${((270 - feature.width) / 2 / 270) * 100}%`, width: `${(feature.width / 270) * 100}%` }}
      >
        {feature.title}
      </p>
    </article>
  );
}

function DeploymentDesktopText({ step }: { step: DeploymentStep }) {
  return (
    <>
      <p
        className="absolute whitespace-nowrap text-base font-black leading-6 text-white"
        style={figmaLayerStyle(step.left, 128, 72, 24, 1280, 905)}
      >
        {step.step}
      </p>
      <h3
        className="absolute whitespace-nowrap text-[28px] font-semibold leading-[30px] text-[#fdfbfe]"
        style={figmaLayerStyle(step.titleLeft, 189, 132, 30, 1280, 905)}
      >
        {step.title}
      </h3>
      <p
        className="absolute w-[180px] text-base font-normal leading-6 text-[#fdfbfe]"
        style={figmaLayerStyle(step.descriptionLeft, 249, 180, 102, 1280, 905)}
      >
        {step.description}
      </p>
      <p
        className="absolute flex h-[41px] w-[144px] items-center justify-center whitespace-nowrap text-center font-bold leading-none text-[#fdfbfe]"
        style={figmaLayerStyle(step.timeLeft, 635, 144, 41, 1280, 905)}
      >
        <span className="text-xl">約</span>
        <span className="mx-2 bg-[linear-gradient(180deg,#bf81ff_0%,#7b66ff_100%)] bg-clip-text text-[32px] text-transparent">
          {step.timeValue}
        </span>
        <span className="text-xl">分鐘</span>
      </p>
    </>
  );
}

function TechnologyDesktopCard({ item }: { item: TechnologyItem }) {
  return (
    <article className="absolute" style={figmaLayerStyle(item.left, 456, 240, 180, 1280, 760)}>
      <div className="absolute left-0 top-0 h-16 w-16 overflow-hidden rounded-full">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="64px"
          unoptimized
          className="object-cover"
        />
      </div>
      <h3 className="absolute left-[76px] top-[17px] whitespace-nowrap text-[28px] font-semibold leading-[30px] text-[#fdfbfe]">
        {item.title}
      </h3>
      <div className="absolute left-[76px] top-[62px] h-px w-36 bg-purple-light/55" />
      <p
        className="absolute left-0 top-[81px] w-[240px] text-center text-base font-normal leading-8 text-[#fdfbfe]"
        style={{ height: item.descriptionHeight }}
      >
        {item.description}
      </p>
    </article>
  );
}

function ScenarioTextBlock({ block }: { block: ScenarioBlock }) {
  return (
    <div className="absolute" style={figmaLayerStyle(40, block.top, 390, 180, 1280, 825)}>
      <p className="absolute left-0 top-0 w-16 text-center text-[28px] font-black leading-[46px] text-white">
        {block.number}
      </p>
      <h3 className="absolute left-[75px] top-[8px] whitespace-nowrap text-[24px] font-semibold leading-[30px] text-[#fdfbfe]">
        {block.title}
      </h3>
      <p className="absolute left-[75px] top-[48px] w-[315px] text-[14px] font-normal leading-[24px] text-[#fdfbfe]">
        {block.description}
      </p>
    </div>
  );
}

function ScenarioDesktopLabel({
  text,
  left,
  top,
  width,
  height,
}: ScenarioLabel) {
  return (
    <p
      className="absolute flex items-center justify-center text-center text-[14px] font-black leading-5 text-[#f5f5f5]"
      style={figmaLayerStyle(left, top, width, height, 1280, 825)}
    >
      {text}
    </p>
  );
}

function MobileSection({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <div className="px-5 py-14 md:hidden">
      <div className="mx-auto max-w-[560px]">
        {kicker ? <p className="text-xs font-bold uppercase text-purple-light">{kicker}</p> : null}
        <h2 className={kicker ? "mt-4 text-3xl font-bold leading-tight text-white" : "text-3xl font-bold leading-tight text-white"}>
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

function MobileInfoCard({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <article className="rounded-lg border border-[#7b66ff]/35 bg-[linear-gradient(145deg,rgba(8,9,17,0.96),rgba(0,0,0,0.9))] p-5">
      <h3 className="bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text text-2xl font-black text-transparent">
        {title}
      </h3>
      {description ? <p className="mt-4 text-sm leading-7 text-white/76">{description}</p> : null}
    </article>
  );
}

function MobileFeatureCard({ feature }: { feature: FeatureCard }) {
  return (
    <article className="rounded-lg border border-[#7b66ff]/30 bg-[#080911] p-5">
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-black">
        <Image
          src={feature.image}
          alt=""
          fill
          sizes="90vw"
          unoptimized
          className="object-contain"
        />
      </div>
      <p className="mt-5 text-base font-semibold leading-7 text-white/84">{feature.title}</p>
    </article>
  );
}

function DeploymentMobileStep({ step }: { step: DeploymentStep }) {
  return (
    <article className="rounded-lg border border-[#7b66ff]/35 bg-[linear-gradient(145deg,rgba(9,10,18,0.96),rgba(0,0,0,0.9))] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="rounded bg-purple-primary px-3 py-1 text-xs font-black text-white">
          {step.step}
        </p>
        <p className="inline-flex items-center rounded-full bg-purple-primary/18 px-3 py-1 text-xs font-bold text-purple-light">
          約 {step.timeValue} 分鐘
        </p>
      </div>
      <h3 className="mt-5 text-2xl font-bold text-white">{step.title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/72">{step.description}</p>
    </article>
  );
}

function ScenarioMobileCard({ block }: { block: ScenarioBlock }) {
  return (
    <article className="rounded-lg border border-[#7b66ff]/35 bg-[#070812] p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-14 items-center justify-center bg-purple-primary text-xl font-black text-white">
          {block.number}
        </div>
        <h3 className="text-2xl font-bold text-white">{block.title}</h3>
      </div>
      <p className="mt-4 text-sm leading-7 text-white/72">{block.description}</p>
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
