import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Camera,
  Cpu,
  Crosshair,
  LayoutGrid,
  Package,
  Plug,
  ShieldCheck,
  SlidersHorizontal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import SeriesCTA from "@/components/series/SeriesCTA";

const IMAGE_ROOT = "/images/products/air-calibrator-engine";

const coreHighlights = [
  {
    title: "引導式自動化",
    description:
      "告別手動設計位姿、抄錄數據的繁瑣，自動完成路徑規劃與數據讀取。",
    metric: "純手眼校準最快 3 分鐘搞定",
    icon: SlidersHorizontal,
  },
  {
    title: "獨家 DH 參數校正",
    description:
      "傳統手眼標定軟件不具備此功能，通過校正機器人本體 DH 參數，將系統操作精度提升 3-4 倍。",
    metric: "將系統操作精度提升 3-4 倍",
    icon: Wrench,
  },
];

const verificationItems = [
  {
    title: "靶點驗證",
    description: "通過實際點位觸碰，驗證標定精度。",
    icon: Crosshair,
  },
  {
    title: "棋盤格位置變換驗證",
    description: "改變棋盤格姿態或位置，重新測量，檢驗標定結果的穩定性和重複性。",
    icon: LayoutGrid,
  },
];

const comparisonRows = [
  {
    label: "設備成本",
    traditional: "幾十萬~上百萬元",
    calibrator: "只需相機 + 棋盤格，成本極低",
  },
  {
    label: "便攜性",
    traditional: "設備笨重，難以搬運",
    calibrator: "輕便小巧，可隨身攜帶",
  },
  {
    label: "現場使用",
    traditional: "無法方便地帶到客戶現場，通常需機器人返廠校正",
    calibrator: "直接在現場完成標定，無需返廠",
  },
  {
    label: "操作複雜度",
    traditional: "需要專業培訓，操作繁瑣",
    calibrator: "引導式自動化，3~15 分鐘搞定",
  },
];

const modeCards = [
  {
    number: "01",
    title: "引導式自動化手眼校準",
    description:
      "系統全程引導，智能規劃路徑並讀取數據，適合追求效率與易用性的場合。",
    tags: ["全程引導", "智能規劃", "自動采集", "高效便捷"],
    icon: Bot,
  },
  {
    number: "02",
    title: "系統整體校正（含DH校正）",
    description:
      "在手眼標定基礎上修正 DH 參數，提升 3-4 倍精度，全引導式操作。",
    tags: ["手眼標定", "DH校正", "精度驗證", "完成校正"],
    icon: Cpu,
  },
  {
    number: "03",
    title: "手動標定",
    description:
      "系統不干預規劃，完全由用戶自由設定拍照位姿，滿足特殊位姿要求或傳統操作習慣。",
    tags: ["自由設定", "靈活拍照", "特殊需求", "習慣兼容"],
    icon: Camera,
  },
];

const processSteps = [
  {
    number: "01",
    title: "安裝固定",
    description: "相機安裝，標定板固定，連接網線與電源。",
  },
  {
    number: "02",
    title: "一鍵啟動",
    description: "軟體自動定位棋盤格，自動規劃拍攝點並採集數據。",
  },
  {
    number: "03",
    title: "完成輸出",
    description: "自動計算手眼矩陣，自動修正 DH 參數，生成精度分析報告。",
  },
];

const ecosystemItems = [
  { title: "雲芯 DS-A 系列相機", icon: Camera },
  { title: "高精度 Charuco 標定板", icon: Crosshair },
  { title: "PLC / 工控機 / 機器人", icon: Plug },
  { title: "本地報告與精度追溯", icon: ShieldCheck },
];

const applicationScenes = [
  {
    title: "末端相機測量",
    description: "在機器人末端完成測量與導引，消除機器人本體誤差。",
  },
  {
    title: "多機器人協作",
    description: "統一多機器人運動學基準，降低跨設備協同誤差。",
  },
  {
    title: "現場快速部署與維護",
    description: "用便攜標定流程支撐產線改造、換型和維護後復位。",
  },
  {
    title: "高精度產線校驗",
    description: "面向裝配、抓取、測量和掃描任務輸出可驗證精度。",
  },
];

const useCases = [
  {
    title: "新能源汽車，鋰電池蓋板測量",
    description: "面向通用的具身感知操作智能",
    image: `${IMAGE_ROOT}/use-case-cover-1.png`,
    href: "/applications/precision-3d-detection/li-battery-cover-measurement",
  },
  {
    title: "新能源汽車，電池盒下箱體檢測",
    description: "面向通用的具身感知操作智能",
    image: `${IMAGE_ROOT}/use-case-cover-2.png`,
  },
  {
    title: "新能源汽車，顯示屏背板測量",
    description: "面向通用的具身感知操作智能",
    image: `${IMAGE_ROOT}/use-case-cover-3.png`,
  },
  {
    title: "打磨機器人視覺引導及軌跡規劃",
    description: "面向工業的具身操作智能",
    image: "/applications/flexible-robot-vision/case-polishing.png",
    href: "/applications/flexible-robot-vision/polishing-trajectory",
  },
  {
    title: "新能源車電池盒智能塗膠引導",
    description: "讓機器“看懂”並“做到”",
    image: "/applications/flexible-robot-vision/case-gluing.png",
  },
];

export default function AirCalibratorEnginePage() {
  return (
    <div className="overflow-x-hidden bg-[#020207]">
      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#050509] pt-20 md:min-h-[610px] md:pt-24">
        <Image
          src={`${IMAGE_ROOT}/hero-bg.png`}
          alt="AIR Calibrator 手眼校準系統"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-30 object-cover object-[64%_center] md:object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.86)_35%,rgba(0,0,0,0.44)_58%,rgba(0,0,0,0.12)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_78%_70%_at_20%_95%,rgba(80,55,180,0.3),transparent_64%)]"
        />

        <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-[650px]">
            <p className="bg-[linear-gradient(90deg,#492e8d_0%,#7b66ff_100%)] bg-clip-text text-[28px] font-bold leading-tight tracking-[2.4px] text-transparent md:text-4xl">
              新一代智能手眼校準系統
            </p>
            <h1 className="mt-5 text-[44px] font-bold leading-none text-[#7b66ff] sm:text-[56px] md:mt-7 md:text-[82px]">
              AIR Calibrator
            </h1>
            <p className="mt-6 max-w-[560px] text-xl font-semibold leading-snug text-white md:text-2xl">
              不止於校準，更賦予機械人「絕對精度」
            </p>
            <p className="mt-5 max-w-[590px] text-sm leading-8 text-white/82 md:text-base">
              <span className="bg-[linear-gradient(90deg,#cbbdff_0%,#7b66ff_100%)] bg-clip-text font-semibold text-transparent">
                全球首款
              </span>{" "}
              整合引導式自動化手眼校準與機械人本體{" "}
              <span className="bg-[linear-gradient(90deg,#d8d0ff_0%,#7b66ff_100%)] bg-clip-text font-semibold text-transparent">
                DH 校正
              </span>{" "}
              的校準軟件，從源頭提升系統精度。只需{" "}
              <span className="text-white">一台相機</span> +{" "}
              <span className="text-white">一塊校準板</span>
              ，讓校準變得簡單、精準、高效。
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/about/contact"
                className="inline-flex min-w-[172px] items-center justify-center rounded-lg bg-purple-primary/80 px-8 py-4 text-sm font-semibold tracking-[1.2px] text-white transition-colors hover:bg-purple-primary"
              >
                立即咨詢
              </Link>
              <Link
                href="#air-calibrator-core-features"
                className="inline-flex min-w-[172px] items-center justify-center rounded-lg border border-white/24 bg-black/30 px-8 py-4 text-sm font-semibold tracking-[1.2px] text-white/90 transition-colors hover:border-purple-light hover:text-white"
              >
                功能演示
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main
        id="air-calibrator-core-features"
        className="scroll-mt-20 bg-[#020207]"
      >
        <section className="relative overflow-hidden border-y border-white/5 bg-[#020207] py-16 md:py-24">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_42%_at_50%_0%,rgba(123,102,255,0.13),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
            <SectionHeading
              eyebrow="Core Competitiveness"
              title="核心優勢"
              description="AIR Calibrator 將手眼標定、DH 參數校正與精度驗證收斂成可引導、可量化、可落地的現場流程。"
            />

            <div className="hidden md:block">
              <DesignSliceImage
                src={`${IMAGE_ROOT}/section-core-top.png`}
                alt="引導式自動化與 DH 參數校正功能展示"
                ratio="1847 / 852"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:hidden">
              {coreHighlights.map((item) => (
                <IconCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  footer={item.metric}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#020207] py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10">
            <div className="hidden md:block">
              <DesignSliceImage
                src={`${IMAGE_ROOT}/precision-verification.png`}
                alt="內置精度驗證功能展示"
                ratio="1840 / 855"
              />
            </div>

            <div className="md:hidden">
              <SectionHeading
                eyebrow="Precision Validation"
                title="內置精度驗證功能"
                description="標定完成後，系統支持用實際點位與棋盤格位置變換來量化確認最終精度。"
              />
              <div className="grid grid-cols-1 gap-5">
                {verificationItems.map((item) => (
                  <IconCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-purple-light/30 bg-purple-primary/12 p-5 text-base font-semibold leading-8 text-white">
                確保你不僅完成標定，更能量化確認最終精度。
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#03040a] py-16 md:py-24">
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(123,102,255,0.08)_0%,transparent_34%,rgba(73,46,141,0.1)_100%)]"
          />
          <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
            <SectionHeading
              eyebrow="Solution Comparison"
              title="方案對比"
              description="打破傳統壁壘，讓絕對精度校正變得人人可用。"
              align="center"
            />

            <div className="overflow-hidden rounded-lg border border-purple-light/30 bg-[#070812] shadow-[0_0_40px_rgba(73,46,141,0.18)]">
              <div className="hidden grid-cols-[0.8fr_1.35fr_1.35fr] border-b border-purple-light/25 bg-white/[0.04] text-center text-lg font-semibold text-white md:grid">
                <div className="border-r border-purple-light/20 px-5 py-5">
                  對比維度
                </div>
                <div className="border-r border-purple-light/20 px-5 py-5">
                  傳統激光追蹤儀方案
                </div>
                <div className="bg-purple-primary/35 px-5 py-5">
                  AIR Calibrator 方案
                </div>
              </div>
              {comparisonRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 border-b border-purple-light/18 last:border-b-0 md:grid-cols-[0.8fr_1.35fr_1.35fr]"
                >
                  <div className="border-purple-light/20 px-5 py-5 text-base font-semibold text-white md:border-r md:text-lg">
                    {row.label}
                  </div>
                  <div className="border-purple-light/20 px-5 pb-5 text-sm leading-7 text-white/72 md:border-r md:py-5 md:text-base">
                    <span className="mb-2 block text-xs font-semibold tracking-[2px] text-white/38 md:hidden">
                      傳統方案
                    </span>
                    {row.traditional}
                  </div>
                  <div className="bg-purple-primary/10 px-5 pb-5 text-base font-semibold leading-8 text-purple-light md:py-5 md:text-lg">
                    <span className="mb-2 block text-xs font-semibold tracking-[2px] text-purple-light/70 md:hidden">
                      AIR Calibrator
                    </span>
                    {row.calibrator}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[#020207] py-16 md:py-24">
          <Image
            src={`${IMAGE_ROOT}/bento-grid-e.png`}
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover object-center opacity-18"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,2,7,0.88)_0%,rgba(2,2,7,0.76)_46%,rgba(2,2,7,0.94)_100%)]"
          />
          <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <SectionHeading
                eyebrow="Flexible Calibration Modes"
                title="三種模式自由切換"
                description="靈活適配任何標定場景，兼顧高精度、智能化、易操作與多場景覆蓋。"
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["高精度", "智能化", "易操作", "多場景"].map((label) => (
                  <div
                    key={label}
                    className="rounded-lg border border-purple-light/25 bg-black/35 px-4 py-3 text-center text-sm font-semibold text-white/82"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {modeCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="relative overflow-hidden rounded-lg border border-purple-light/40 bg-[#05080d]/88 p-6 shadow-[0_0_30px_rgba(73,46,141,0.18)]"
                  >
                    <div className="flex items-center gap-4 border-b border-purple-light/18 pb-5">
                      <span className="text-4xl font-semibold text-purple-light">
                        {card.number}
                      </span>
                      <h3 className="min-w-0 text-xl font-semibold leading-snug text-white">
                        {card.title}
                      </h3>
                    </div>
                    <div className="mt-7 flex h-16 w-16 items-center justify-center rounded-lg border border-purple-light/35 bg-purple-primary/18 text-purple-light">
                      <Icon size={30} strokeWidth={1.6} />
                    </div>
                    <p className="mt-7 min-h-[84px] text-sm leading-7 text-white/75">
                      {card.description}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-purple-light/25 bg-purple-primary/12 px-3 py-1.5 text-xs font-semibold text-purple-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#03040a] py-16 md:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Hardware & Workflow"
                title="極簡硬件與全自動流程"
                description="只需兩件硬件，三步全自動完成。"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {ecosystemItems.map((item) => (
                  <MiniFeature
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                  />
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-purple-light/25 bg-[#060812]">
              <Image
                src={`${IMAGE_ROOT}/store-product.png`}
                alt="AIR Calibrator 商品軟件界面"
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="w-full bg-white object-contain"
              />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-[1280px] px-6 md:px-10">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {processSteps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-lg border border-purple-light/25 bg-black/35 p-6"
                >
                  <p className="text-3xl font-semibold text-purple-light">
                    {step.number}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#020207] py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10">
            <SectionHeading
              eyebrow="Ecosystem & Applications"
              title="典型應用場景"
              description="從末端相機測量、多機器人協作到現場快速部署，讓校準結果服務於真實產線。"
              align="center"
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {applicationScenes.map((scene, index) => (
                <article
                  key={scene.title}
                  className="rounded-lg border border-purple-light/24 bg-[#070812] p-6"
                >
                  <p className="text-sm font-semibold text-purple-light">
                    SCENE {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {scene.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/68">
                    {scene.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#05060d] py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
              <SectionHeading
                eyebrow="Use Cases"
                title="應用案例"
                description="從核心硬體到智能軟體，覆蓋具身感知與工業操作全場景。"
              />
              <p className="text-sm leading-7 text-white/58 lg:pb-2">
                可跳轉案例直接進入已實現詳情頁；尚未提供獨立詳情設計的案例保留為敬請期待狀態。
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
              {useCases.map((item) => (
                <UseCaseCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <div id="air-calibrator-cta" className="scroll-mt-24">
        <SeriesCTA
          data={{
            title: "讓校準精度進入實際產線",
            subtitle:
              "聯繫 AIeveR 團隊，確認 AIR Calibrator 的相機配置、機器人校正流程與現場導入路徑。",
            primaryCta: { label: "獲取報價 / 諮詢", href: "/about/contact" },
            secondaryCta: {
              label: "預約線上演示",
              href: "/about/contact",
            },
            backgroundDefault:
              "/images/series/shared/cta-overlay-border-blur.png",
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
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-9 max-w-[780px] ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-[4px] text-purple-light">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-white/68">{description}</p>
    </div>
  );
}

function DesignSliceImage({
  src,
  alt,
  ratio,
}: {
  src: string;
  alt: string;
  ratio: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-purple-light/20 bg-[#05060d]"
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="object-cover"
      />
    </div>
  );
}

function IconCard({
  icon: Icon,
  title,
  description,
  footer,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  footer?: string;
}) {
  return (
    <article className="rounded-lg border border-purple-light/25 bg-[#070812] p-6">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-purple-light/35 bg-purple-primary/18 text-purple-light">
        <Icon size={24} strokeWidth={1.8} />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/70">{description}</p>
      {footer ? (
        <p className="mt-5 border-t border-purple-light/16 pt-4 text-sm font-semibold text-purple-light">
          {footer}
        </p>
      ) : null}
    </article>
  );
}

function MiniFeature({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-purple-light/20 bg-black/30 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-purple-light/30 bg-purple-primary/16 text-purple-light">
        <Icon size={20} strokeWidth={1.7} />
      </div>
      <p className="min-w-0 text-sm font-semibold leading-6 text-white/82">
        {title}
      </p>
    </div>
  );
}

function UseCaseCard({
  item,
}: {
  item: {
    title: string;
    description: string;
    image: string;
    href?: string;
  };
}) {
  const card = (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-purple-light/22 bg-[#080a12]">
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(5,6,13,0.78)_100%)]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-7 text-white">
          {item.title}
        </h3>
        <p className="mt-3 text-xs leading-6 text-white/58">
          {item.description}
        </p>
        <div className="mt-auto pt-5">
          {item.href ? (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-purple-light">
              了解更多 <ArrowRight size={14} strokeWidth={2} />
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/42">
              <Package size={14} strokeWidth={1.8} />
              敬請期待
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (!item.href) return card;

  return (
    <Link href={item.href} className="block h-full">
      {card}
    </Link>
  );
}
