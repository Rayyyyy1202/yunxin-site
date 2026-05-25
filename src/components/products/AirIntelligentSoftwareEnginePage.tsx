import Image from "next/image";
import Link from "next/link";
import SeriesCTA from "@/components/series/SeriesCTA";

const IMAGE_ROOT = "/images/products/air-intelligent-software-engine";
const AIR_VISION_STORE_IMAGE = "/images/products/air-vision-engine/store-product.png";
const AIR_PLANNER_STORE_IMAGE = "/images/products/air-planner-engine/store-product.png";
const AIR_CALIBRATOR_STORE_IMAGE =
  "/images/products/air-calibrator-engine/store-product.png";

const painCards = [
  {
    title: "感知局限",
    description:
      "傳統 2D 視覺缺乏深度資訊，受光照影響大（如過暗、過亮、遮擋），難以估量深度。",
    image: `${IMAGE_ROOT}/pain-section-wave.png`,
    icon: `${IMAGE_ROOT}/pain-card-depth-icon.png`,
    crop: { width: "401%", height: "425%", left: "-14%", top: "-250%" },
  },
  {
    title: "視野與空間受限",
    description:
      "單一視角無法覆蓋大型或複雜曲面工件（如 20 米鐵軌、100 米風力葉片、汽車輪罩、船舶鑄件）。",
    image: `${IMAGE_ROOT}/pain-section-wave.png`,
    icon: `${IMAGE_ROOT}/pain-card-vision-icon.png`,
    crop: {
      width: "486.05%",
      height: "525.7%",
      left: "-150.29%",
      top: "-301.68%",
    },
  },
  {
    title: "一致性與精度差",
    description:
      "來料與加工誤差大，且機械人絕對定位精度遠低於重複定位精度，制約了高精度任務執行。",
    image: `${IMAGE_ROOT}/pain-section-wave.png`,
    icon: `${IMAGE_ROOT}/pain-card-precision-icon.png`,
    crop: {
      width: "470.99%",
      height: "465.84%",
      left: "-248.45%",
      top: "-257.92%",
    },
  },
  {
    title: "柔性不足",
    description: "產線換型頻繁時，重新部署週期長、成本高。",
    image: `${IMAGE_ROOT}/pain-section-wave.png`,
    icon: `${IMAGE_ROOT}/pain-card-flexibility-icon.png`,
    crop: {
      width: "465.74%",
      height: "429.68%",
      left: "-349.86%",
      top: "-228.31%",
    },
  },
] as const;

const capabilityStrip = [
  { label: "深度感知突破", icon: `${IMAGE_ROOT}/check-depth.svg` },
  { label: "大視野覆蓋", icon: `${IMAGE_ROOT}/check-vision.svg` },
  { label: "高精度一致性", icon: `${IMAGE_ROOT}/check-precision.svg` },
  { label: "快速部署與柔性擴展", icon: `${IMAGE_ROOT}/check-flexibility.svg` },
] as const;

const systemSteps = [
  { label: "方案生成", image: `${IMAGE_ROOT}/system-step-solution.png` },
  { label: "3D成像", image: `${IMAGE_ROOT}/system-step-imaging.png` },
  { label: "數據處理分析", image: `${IMAGE_ROOT}/system-step-analysis.png` },
  { label: "軌跡規劃", image: `${IMAGE_ROOT}/system-step-planning.png` },
  { label: "執行結果", image: `${IMAGE_ROOT}/system-step-result.png` },
] as const;

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
] as const;

const robotFeatureCards = [
  {
    title: "無需 marker 與額外追蹤器",
    image: `${IMAGE_ROOT}/robot-scan-marker-20260524.png`,
  },
  {
    title: "目標空間定位精度高達 ±0.2mm",
    image: `${IMAGE_ROOT}/robot-scan-position-20260524.png`,
  },
  {
    title: "局部測量精度達 0.03mm",
    image: `${IMAGE_ROOT}/robot-scan-local-20260524.png`,
  },
  {
    title: "支援超大場景全局 3D 成像",
    image: `${IMAGE_ROOT}/robot-scan-global-20260524.png`,
  },
] as const;

const softwareCards = [
  {
    title: "AIR Vision",
    subtitle: "全維度視覺分析引擎",
    description:
      "AIRVision Master、AIRVision-DL 與底層算子 SDK 覆蓋流程搭建、深度學習標註訓練與二次開發。",
    value: "支持 2D/3D 視覺、點雲處理、PLC 與機器人控制器通信。",
    href: "/products/air-vision-engine",
    image: AIR_VISION_STORE_IMAGE,
  },
  {
    title: "AIR Planner",
    subtitle: "機器人軌跡規劃軟件",
    description:
      "專為工業機器人應用設計的離線編程與仿真軟件，支持 STEP/STL 導入、TCP 標定、軌跡生成與示教器代碼輸出。",
    value:
      "覆蓋弓字形/Z 字形面打磨、邊緣打磨、自定義選點、碰撞檢測與 WAIT I/O 控制代碼。",
    href: "/products/air-planner-engine",
    image: AIR_PLANNER_STORE_IMAGE,
  },
  {
    title: "AIR Calibrator",
    subtitle: "自動化手眼標定與DH校正",
    description:
      "以一台相機與 Charuco 標定板完成 Eye-to-Hand、Hand-to-Eye、DH 參數校正與精度驗證。",
    value: "手眼標定最快 3 分鐘，全套校準流程約 15 分鐘完成。",
    href: "/products/air-calibrator-engine",
    image: AIR_CALIBRATOR_STORE_IMAGE,
  },
] as const;

const useCases = [
  {
    title: "新能源汽車，鋰電池蓋板測量",
    image: `${IMAGE_ROOT}/use-case-battery-cover.png`,
  },
  {
    title: "新能源汽車，電池盒下箱體檢測",
    image: `${IMAGE_ROOT}/use-case-battery-box.png`,
  },
  {
    title: "新能源汽車，顯示屏背板測量",
    image: `${IMAGE_ROOT}/use-case-display-backplate.png`,
  },
] as const;

export default function AirIntelligentSoftwareEnginePage() {
  return (
    <div className="overflow-x-hidden bg-black text-white">
      <HeroSection />
      <PainPointSection />
      <SystemSection />
      <RobotScanSection />
      <SoftwareBrainSection />
      <UseCasesSection />
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
    <section className="bg-black pt-16 md:pt-20">
      <div className="relative isolate min-h-[720px] overflow-hidden lg:min-h-[720px]">
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
          className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#050507_0%,rgba(5,5,8,0.92)_24%,rgba(5,5,8,0.5)_52%,rgba(5,5,8,0.08)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(123,102,255,0.34),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0)_64%,#020405_100%)]"
        />

        <div className="mx-auto flex min-h-[720px] max-w-[1280px] items-center px-6 py-16 md:px-10 lg:py-10">
          <div className="max-w-[604px]">
            <h1 className="max-w-[342px] text-[30px] font-bold leading-tight tracking-tight text-white md:max-w-[604px] md:text-[40px] md:leading-[1.28]">
              面向高階複雜場景的
              <br />
              3D 視覺與機械人
              <span className="md:hidden">
                <br />
              </span>
              感知方案
            </h1>
            <p className="mt-6 max-w-[604px] text-sm font-semibold leading-[2] text-white/78 md:text-[15px]">
              <span className="inline-block whitespace-nowrap bg-gradient-to-r from-[#7b66ff] to-[#ad92ff] bg-clip-text text-transparent">
                3D視覺算法平台 × 機器人掃描與執行系統 × 機器人軌跡規劃軟件
              </span>
              <br />
              從系統硬件、成像到演算法源頭，
              <br className="md:hidden" />
              全面優化系統精度，
              <br className="md:hidden" />
              全端技術自主可控。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about/contact"
                className="inline-flex h-12 min-w-[100px] items-center justify-center rounded-[4px] bg-[#4f3199] px-7 text-sm font-semibold tracking-[1px] transition-colors hover:bg-[#5c3ab0]"
              >
                立即咨詢
              </Link>
              <Link
                href="#air-system"
                className="inline-flex h-12 min-w-[132px] items-center justify-center rounded-[4px] border border-white/18 bg-black/20 px-7 text-sm font-semibold tracking-[1px] text-white/88 transition-colors hover:border-purple-light hover:text-white"
              >
                功能演示
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PainPointSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#020405] pb-10 pt-10 md:pt-12">
      <Image
        src={`${IMAGE_ROOT}/pain-top-wave.png`}
        alt=""
        width={738}
        height={295}
        className="pointer-events-none absolute right-0 top-0 -z-10 hidden opacity-80 mix-blend-screen md:block"
      />
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          title="突破傳統2D視覺與機器人執行的極限"
          subtitle="AIR 智能軟體引擎 X 3D 視覺方案，重塑工業場景的感知與執行邊界"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {painCards.map((card) => (
            <article
              key={card.title}
              className="relative flex min-h-[373px] flex-col overflow-hidden rounded-xl border-[3px] border-[#534384] bg-[rgba(18,16,34,0.85)] p-[15px] shadow-[0_0_28px_rgba(123,102,255,0.16)]"
            >
              <div className="flex min-h-[74px] items-center gap-3">
                <div className="relative size-[50px] shrink-0 mix-blend-lighten">
                  <Image
                    src={card.icon}
                    alt=""
                    fill
                    sizes="50px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[22px] font-medium leading-9 text-white md:text-2xl">
                  {card.title}
                </h3>
              </div>
              <p className="mt-4 min-h-[84px] text-sm font-medium leading-[21px] text-white/80">
                {card.description}
              </p>
              <div className="relative mt-auto h-[145px] overflow-hidden rounded-[5px] border border-white/8 mix-blend-lighten">
                <CroppedImage src={card.image} crop={card.crop} />
              </div>
            </article>
          ))}
        </div>

        <CapabilityStrip />
      </div>
    </section>
  );
}

function CapabilityStrip() {
  return (
    <div className="relative mt-8 overflow-x-auto rounded-xl border-2 border-[#6244a2] bg-[#0b0c12] px-4 py-4 shadow-[0_0_2px_#7b66ff,0_0_10px_#7b66ff] md:px-[9px] md:py-[9px]">
      <div className="flex flex-col gap-5 md:min-w-[1156px] md:flex-row md:items-center md:gap-0">
        <div className="flex items-center gap-4 md:w-[461px] md:shrink-0 md:gap-0">
          <div className="relative h-[54px] w-[115px] shrink-0 overflow-hidden rounded-l-[10px]">
            <CroppedImage
              src={`${IMAGE_ROOT}/pain-section-wave.png`}
              crop={{
                width: "876.88%",
                height: "1052.34%",
                left: "-30.22%",
                top: "-846.15%",
              }}
            />
          </div>
          <strong className="text-lg font-semibold leading-[30px] text-[#8553ec] md:w-[303px] md:shrink-0 md:whitespace-nowrap md:text-[20px]">
            AIR 智能軟體引擎 X 3D視覺方案
          </strong>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:flex md:shrink-0 md:items-center md:gap-[29px]">
          {capabilityStrip.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 whitespace-nowrap text-base font-medium leading-[30px] text-white drop-shadow-[0_0_8px_#7b66ff] md:gap-0"
            >
              <Image
                src={item.icon}
                alt=""
                width={42}
                height={42}
                className="md:mr-0"
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemSection() {
  return (
    <section
      id="air-system"
      className="scroll-mt-24 border-y border-white/10 bg-[#020405] py-10 md:py-12"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionHeading title="自研軟硬件一體化，打通感知、規劃與執行" />

        <div className="mx-auto mt-10 grid max-w-[1097px] gap-4 sm:grid-cols-2 lg:grid-cols-[157px_157px_227px_157px_157px] lg:justify-between">
          {systemSteps.map((step) => (
            <div
              key={step.label}
              className="flex h-[127px] flex-col items-center justify-center rounded-xl border border-[#7a69ac] bg-gradient-to-b from-[#070715] to-[#231e40] text-center shadow-[0_0_2px_rgba(123,102,255,0.25),0_0_10px_#7b66ff]"
            >
              <div className="relative size-[88px] mix-blend-lighten">
                <Image
                  src={step.image}
                  alt=""
                  fill
                  sizes="88px"
                  className="object-cover"
                />
              </div>
              <p className="-mt-1 text-lg font-medium leading-[30px] text-white md:text-xl">
                {step.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-9 overflow-x-auto pb-2">
          <div className="flex min-w-[1160px] items-center lg:min-w-0">
            <div className="flex w-[173px] shrink-0 items-center gap-[18px]">
              <strong className="shrink-0 text-2xl font-semibold leading-9 text-white">
                系統組成
              </strong>
              <div className="h-px flex-1 bg-[#30334a]" />
            </div>
            <div className="relative h-[75px] w-[987px] shrink-0">
              <Image
                src={`${IMAGE_ROOT}/system-composition-strip.png`}
                alt="系統組成：機械人、3D 相機、執行機構、移動平台"
                fill
                sizes="987px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-2 lg:grid-cols-2">
          {platformCards.map((card) => (
            <article
              key={card.title}
              className="relative min-h-[194px] overflow-hidden rounded-[9px] border border-[#272938] bg-[#070810] px-6 py-7"
            >
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 596px, 100vw"
                className="object-cover object-right opacity-90"
              />
              <div className="relative z-10 max-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="relative size-[67px] shrink-0 mix-blend-lighten">
                    <Image
                      src={card.icon}
                      alt=""
                      fill
                      sizes="67px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold leading-[30px] text-[#8553ec]">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-5 text-sm font-medium leading-[21px] text-white/80">
                  {card.description}
                </p>
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
    <section className="bg-[#020405] py-10 md:py-12">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionHeading title="RobotScan 智能成像機器人" />

        <div className="mx-auto mt-8 flex min-h-[52px] max-w-[1060px] items-center justify-center rounded-[35px] border-2 border-[#534384] bg-black px-5 text-center text-base font-bold leading-[30px] text-white md:text-xl">
          <span>
            高精度 3D 相機 <span className="text-[#7b66ff]">+</span>{" "}
            低成本機械臂 <span className="text-[#7b66ff]">+</span>{" "}
            掃描拼接軟件 ={" "}
            <span className="bg-gradient-to-r from-[#7b66ff] to-[#4a3d99] bg-clip-text text-2xl text-transparent">
              RobotScan
            </span>{" "}
            測量工作站
          </span>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.56fr_0.44fr]">
          <div className="grid gap-7 md:grid-cols-2">
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

          <div className="grid gap-6 sm:grid-cols-2">
            {robotFeatureCards.map((item) => (
              <article
                key={item.title}
                className="grid min-h-[141px] grid-cols-[101px_1fr] items-center gap-4 rounded-[10px] border border-[#272938] bg-[#070810] p-0 pr-4"
              >
                <div className="relative size-[101px] overflow-hidden mix-blend-lighten">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="101px"
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-semibold leading-6 text-white/86">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex min-h-[52px] items-center justify-center rounded-[7px] border-2 border-[#534384] bg-black px-5 text-center text-base font-bold leading-[30px] text-white md:text-xl">
          覆蓋Φ300-700mm（汽車零部件）、Φ500-1200mm（電池盒）至＜5000mm（汽車車架）
        </div>
      </div>
    </section>
  );
}

function SoftwareBrainSection() {
  return (
    <section className="bg-black py-10 md:py-12">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionHeading title="賦能工業視覺的軟件大腦" />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {softwareCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex min-h-[637px] flex-col overflow-hidden rounded-xl border-[3px] border-[#534384] bg-[#020405] transition-transform hover:-translate-y-1 hover:border-[#7b66ff]"
            >
              <div className="px-6 pt-6 text-center">
                <h3 className="text-[26px] font-medium leading-[30px] text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-xl font-medium leading-[30px] text-white/80">
                  {card.subtitle}
                </p>
              </div>
              <div className="relative mx-7 mt-5 h-[178px] overflow-hidden rounded-xl border-2 border-[#534384]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 331px, 90vw"
                  className="bg-black object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-7 py-4">
                <p className="min-h-[90px] text-xl font-medium leading-[30px] text-white/80">
                  {card.description}
                </p>
              </div>
              <div className="mt-auto border-t border-[#534384] px-6 py-6">
                <div className="flex items-center gap-2 text-xl font-bold leading-[21px] text-[#7b66ff]">
                  <Image
                    src={`${IMAGE_ROOT}/software-value-icon.svg`}
                    alt=""
                    width={22}
                    height={22}
                  />
                  核心價值
                </div>
                <p className="mt-4 text-xl font-medium leading-[30px] text-white/80">
                  {card.value}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className="border-b border-white/10 bg-[#0d0e10] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-3xl font-medium uppercase leading-[40px] tracking-[-0.9px] text-[#fdfbfe] md:text-4xl">
          應用案例{" "}
          <span className="bg-gradient-to-r from-[#7b66ff] to-[#492e8d] bg-clip-text font-bold text-transparent">
            / USE CASES
          </span>
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="relative h-[368px] overflow-hidden bg-[#121316]"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
              <h3 className="absolute bottom-8 left-1/2 w-[320px] -translate-x-1/2 text-center text-xl font-bold leading-9 text-[#fdfbfe]">
                {item.title}
              </h3>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          {[
            { label: "上一個案例", icon: `${IMAGE_ROOT}/use-case-arrow-left.svg` },
            { label: "下一個案例", icon: `${IMAGE_ROOT}/use-case-arrow-right.svg` },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              className="flex size-12 items-center justify-center border border-[#47484a] transition-colors hover:border-[#7b66ff]"
            >
              <Image src={item.icon} alt="" width={8} height={12} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <h2 className="text-[30px] font-medium leading-tight text-white md:text-[42px] md:leading-[63px]">
        <span className="text-[#7b66ff]">丨</span>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-[720px] text-sm font-semibold leading-9 text-white/80 md:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function CroppedImage({
  src,
  crop,
}: {
  src: string;
  crop: { width: string; height: string; left: string; top: string };
}) {
  return (
    <Image
      src={src}
      alt=""
      width={1672}
      height={941}
      sizes="(min-width: 1280px) 258px, 90vw"
      className="absolute max-w-none"
      style={{
        width: crop.width,
        height: crop.height,
        left: crop.left,
        top: crop.top,
      }}
    />
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
    <article className="rounded-xl border-[3px] border-[#534384] bg-[#020405] p-2.5 md:min-h-[306px]">
      <div className="px-2.5 pt-2">
        <h3 className="text-[26px] font-medium leading-[30px] text-white">
          {title}
        </h3>
        <p className="mt-4 min-h-12 max-w-[190px] text-base font-medium leading-6 text-white/80">
          {subtitle}
        </p>
      </div>
      <div className="relative mt-5 h-[155px] overflow-hidden rounded-[4px]">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 768px) 297px, 90vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}
