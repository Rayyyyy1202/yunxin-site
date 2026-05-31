import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Crosshair,
  LayoutGrid,
  Package,
  SlidersHorizontal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import SeriesCTA from "@/components/series/SeriesCTA";
import {
  DEFAULT_LOCALE,
  type Locale,
  localizeData,
  localizeText,
} from "@/lib/i18n";

const IMAGE_ROOT = "/images/products/air-calibrator-engine";
const LAYER_ROOT = `${IMAGE_ROOT}/layers`;

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
    icon: `${LAYER_ROOT}/comparison-cost-icon.png`,
  },
  {
    label: "便攜性",
    traditional: "設備笨重，難以搬運",
    calibrator: "輕便小巧，可隨身攜帶",
    icon: `${LAYER_ROOT}/comparison-portability-icon.png`,
  },
  {
    label: "現場使用",
    traditional: "無法方便地帶到客戶現場，通常需機器人返廠校正",
    calibrator: "直接在現場完成標定，無需返廠",
    icon: `${LAYER_ROOT}/comparison-onsite-icon.png`,
  },
  {
    label: "操作複雜度",
    traditional: "需要專業培訓，操作繁瑣",
    calibrator: "引導式自動化，3~15 分鐘搞定",
    icon: `${LAYER_ROOT}/comparison-complexity-icon.png`,
  },
];

const comparisonDesktopRows = [
  { iconTop: "41.2%", textTop: "44.8%" },
  { iconTop: "53.2%", textTop: "56.8%" },
  { iconTop: "65.3%", textTop: "68.8%" },
  { iconTop: "77.6%", textTop: "80.9%" },
];

const modeFeatureLabels = ["高精度", "智能化", "易操作", "多場景"];

const modeCards = [
  {
    number: "01",
    title: "引導式自動化手眼校準",
    description:
      "系統全程引導，智能規劃路徑並讀取數據，適合追求效率與易用性的場合。",
    tags: ["全程引導", "智能規劃", "自動采集", "高效便捷"],
  },
  {
    number: "02",
    title: "系統整體校正（含DH校正）",
    description:
      "在手眼標定基礎上修正 DH 參數，提升 3-4 倍精度，全引導式操作。",
    tags: ["手眼標定", "DH校正", "精度驗證", "完成校正"],
  },
  {
    number: "03",
    title: "手動標定",
    description:
      "系統不干預規劃，完全由用戶自由設定拍照位姿，滿足特殊位姿要求或傳統操作習慣。",
    tags: ["自由設定", "靈活拍照", "滿足特殊需求", "傳統習慣兼容"],
  },
];

const modeDesktopCards = [
  { left: "2.9%" },
  { left: "34.2%" },
  { left: "65.5%" },
];

const processSteps = [
  {
    number: "01",
    title: "安裝固定",
    description: "相機安裝；標定板固定；連接網線/電源。",
  },
  {
    number: "02",
    title: "一鍵啟動",
    description: "軟體自動定位棋盤格，自動規劃拍攝點並採集數據。",
  },
  {
    number: "03",
    title: "完成輸出",
    description: "自動計算手眼矩陣；自動修正 DH 參數；生成精度分析報告。",
  },
];

const processDesktopCards = [
  { left: "3.1%" },
  { left: "34.6%" },
  { left: "66.1%" },
];

const ecosystemBrands = [
  { name: "ABB", caption: "ABB", tone: "text-[#ff3046]" },
  { name: "FANUC", caption: "發那科", tone: "text-[#ffd435]" },
  { name: "NACHI", caption: "那智", tone: "text-[#ff3046]" },
  { name: "AUBO", caption: "遨博", tone: "text-[#c69758]" },
  { name: "···", caption: "更多品牌持續適配中", tone: "text-purple-light" },
];

const applicationScenes = [
  {
    number: "01",
    title: "機器人引導、抓取、裝配",
    description: "通過高精度手眼標定，實現精準定位、抓取和裝配，提升自動化生產效率。",
  },
  {
    number: "02",
    title: "末端相機測量（消除機器人運動誤差）",
    description: "消除機器人運動標差，提高測量精度，滿足高精度檢測與質量控制需求。",
  },
  {
    number: "03",
    title: "多機器人協作（統一運動學基準）",
    description: "統一多機器人運動學基準，實現協同作業，提升複雜任務的執行效率。",
  },
  {
    number: "04",
    title: "現場快速部署與設備維護",
    description: "支持快速標定與部署，簡化現場調試流程，降低維護成本，提高設備利用率。",
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
];

type ComparisonRow = (typeof comparisonRows)[number];
type ModeCard = (typeof modeCards)[number];
type ProcessStep = (typeof processSteps)[number];
type EcosystemBrand = (typeof ecosystemBrands)[number];
type ApplicationScene = (typeof applicationScenes)[number];
type UseCase = (typeof useCases)[number];

export default function AirCalibratorEnginePage({
  locale = DEFAULT_LOCALE,
}: {
  locale?: Locale;
}) {
  const t = (value: string) => localizeText(value, locale);
  const localizedCoreHighlights = localizeData(coreHighlights, locale);
  const localizedVerificationItems = localizeData(verificationItems, locale);
  const localizedComparisonRows = localizeData(comparisonRows, locale);
  const localizedModeFeatureLabels = localizeData(modeFeatureLabels, locale);
  const localizedModeCards = localizeData(modeCards, locale);
  const localizedProcessSteps = localizeData(processSteps, locale);
  const localizedEcosystemBrands = localizeData(ecosystemBrands, locale);
  const localizedApplicationScenes = localizeData(applicationScenes, locale);
  const localizedUseCases = localizeData(useCases, locale);

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
              {t("新一代智能手眼校準系統")}
            </p>
            <h1 className="mt-5 text-[44px] font-bold leading-none text-[#7b66ff] sm:text-[56px] md:mt-7 md:text-[82px]">
              AIR Calibrator
            </h1>
            <p className="mt-6 max-w-[560px] text-xl font-semibold leading-snug text-white md:text-2xl">
              {t("不止於校準，更賦予機械人「絕對精度」")}
            </p>
            <p className="mt-5 max-w-[590px] text-sm leading-8 text-white/82 md:text-base">
              <span className="bg-[linear-gradient(90deg,#cbbdff_0%,#7b66ff_100%)] bg-clip-text font-semibold text-transparent">
                {t("全球首款")}
              </span>{" "}
              {t("整合引導式自動化手眼校準與機械人本體")}{" "}
              <span className="bg-[linear-gradient(90deg,#d8d0ff_0%,#7b66ff_100%)] bg-clip-text font-semibold text-transparent">
                DH 校正
              </span>{" "}
              {t("的校準軟件，從源頭提升系統精度。只需")}{" "}
              <span className="text-white">{t("一台相機")}</span> +{" "}
              <span className="text-white">{t("一塊校準板")}</span>
              {t("，讓校準變得簡單、精準、高效。")}
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/about/contact"
                className="inline-flex min-w-[172px] items-center justify-center rounded-lg bg-purple-primary/80 px-8 py-4 text-sm font-semibold tracking-[1.2px] text-white transition-colors hover:bg-purple-primary"
              >
                {t("立即咨詢")}
              </Link>
              <Link
                href="#air-calibrator-core-features"
                className="inline-flex min-w-[172px] items-center justify-center rounded-lg border border-white/24 bg-black/30 px-8 py-4 text-sm font-semibold tracking-[1.2px] text-white/90 transition-colors hover:border-purple-light hover:text-white"
              >
                {t("功能演示")}
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
              title={t("核心優勢")}
              description={t(
                "AIR Calibrator 將手眼標定、DH 參數校正與精度驗證收斂成可引導、可量化、可落地的現場流程。",
              )}
            />

            <div className="hidden md:block">
              <DesignSliceImage
                src={`${IMAGE_ROOT}/section-core-top.png`}
                alt="引導式自動化與 DH 參數校正功能展示"
                ratio="1847 / 852"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:hidden">
              {localizedCoreHighlights.map((item) => (
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
                title={t("內置精度驗證功能")}
                description={t(
                  "標定完成後，系統支持用實際點位與棋盤格位置變換來量化確認最終精度。",
                )}
              />
              <div className="grid grid-cols-1 gap-5">
                {localizedVerificationItems.map((item) => (
                  <IconCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-purple-light/30 bg-purple-primary/12 p-5 text-base font-semibold leading-8 text-white">
                {t("確保你不僅完成標定，更能量化確認最終精度。")}
              </div>
            </div>
          </div>
        </section>

        <ComparisonSection rows={localizedComparisonRows} t={t} />
        <ModeSection
          cards={localizedModeCards}
          featureLabels={localizedModeFeatureLabels}
          t={t}
        />
        <HardwareWorkflowSection
          processSteps={localizedProcessSteps}
          ecosystemBrands={localizedEcosystemBrands}
          applicationScenes={localizedApplicationScenes}
          t={t}
        />
        <UseCasesSection useCases={localizedUseCases} t={t} />
      </main>

      <div id="air-calibrator-cta" className="scroll-mt-24">
        <SeriesCTA
          data={{
            title: t("讓校準精度進入實際產線"),
            subtitle: t(
              "聯繫 AIeveR 團隊，確認 AIR Calibrator 的相機配置、機器人校正流程與現場導入路徑。",
            ),
            primaryCta: { label: t("獲取報價 / 諮詢"), href: "/about/contact" },
            secondaryCta: {
              label: t("預約線上演示"),
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

function ComparisonSection({
  rows,
  t,
}: {
  rows: ComparisonRow[];
  t: (value: string) => string;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-0">
      <div className="mx-auto max-w-[1536px] px-6 md:px-0">
        <div className="relative hidden aspect-[1536/1024] overflow-hidden bg-black md:block">
          <Image
            src={`${IMAGE_ROOT}/bento-grid-b.png`}
            alt=""
            fill
            sizes="(max-width: 1536px) 100vw, 1536px"
            className="object-cover"
          />

          <div className="absolute left-1/2 top-[12%] w-[88%] -translate-x-1/2 text-center">
            <h2 className="bg-[linear-gradient(90deg,#fdfbfe_0%,#fdfbfe_44%,#7b66ff_68%,#492e8d_100%)] bg-clip-text text-[clamp(34px,4.8vw,70px)] font-black leading-none tracking-[1px] text-transparent">
              {t("方案對比")}
            </h2>
            <p className="mt-[2.6%] text-[clamp(18px,2.1vw,32px)] font-semibold leading-tight tracking-[0.12em] text-white">
              {t("打破傳統壁壘，讓絕對精度校正人人可用")}
            </p>
          </div>

          <div className="absolute left-[15.2%] top-[35%] -translate-x-1/2 text-center text-[clamp(16px,1.7vw,27px)] font-bold tracking-[0.08em] text-white">
            {t("對比維度")}
          </div>
          <div className="absolute left-[42.6%] top-[35%] -translate-x-1/2 text-center text-[clamp(16px,1.7vw,27px)] font-bold tracking-[0.08em] text-white">
            {t("傳統激光追蹤儀方案")}
          </div>
          <div className="absolute left-[77.8%] top-[35%] -translate-x-1/2 text-center text-[clamp(17px,1.8vw,29px)] font-black tracking-[0.08em] text-white">
            {t("AIR Calibrator 方案")}
          </div>

          {rows.map((row, index) => {
            const placement = comparisonDesktopRows[index];

            return (
              <div key={row.label}>
                <div
                  className="absolute left-[6.9%] w-[5.4%]"
                  style={{
                    top: placement.iconTop,
                    aspectRatio: "82 / 76",
                  }}
                >
                  <Image
                    src={row.icon}
                    alt=""
                    fill
                    sizes="82px"
                    className="object-contain"
                  />
                </div>
                <p
                  className="absolute left-[13.2%] w-[15%] -translate-y-1/2 text-left text-[clamp(15px,1.65vw,26px)] font-bold leading-tight tracking-[0.08em] text-white"
                  style={{ top: placement.textTop }}
                >
                  {row.label}
                </p>
                <p
                  className="absolute left-[42.6%] w-[35%] -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(13px,1.32vw,22px)] font-semibold leading-snug tracking-[0.08em] text-white"
                  style={{ top: placement.textTop }}
                >
                  {row.traditional}
                </p>
                <p
                  className="absolute left-[77.8%] w-[32%] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,#c9b5ff_0%,#7b66ff_100%)] bg-clip-text text-center text-[clamp(14px,1.58vw,24px)] font-black leading-snug tracking-[0.08em] text-transparent"
                  style={{ top: placement.textTop }}
                >
                  {row.calibrator}
                </p>
              </div>
            );
          })}
        </div>

        <div className="md:hidden">
          <SectionHeading
            eyebrow="Solution Comparison"
            title={t("方案對比")}
            description={t("打破傳統壁壘，讓絕對精度校正變得人人可用。")}
            align="center"
          />

          <div className="space-y-4">
            {rows.map((row) => (
              <article
                key={row.label}
                className="rounded-lg border border-purple-light/25 bg-[#070812] p-5 shadow-[0_0_30px_rgba(73,46,141,0.16)]"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={row.icon}
                    alt=""
                    width={82}
                    height={80}
                    className="h-12 w-12 object-contain"
                  />
                  <h3 className="text-lg font-semibold text-white">
                    {row.label}
                  </h3>
                </div>
                <dl className="mt-5 space-y-4 text-sm leading-7">
                  <div>
                    <dt className="text-white/42">
                      {t("傳統激光追蹤儀方案")}
                    </dt>
                    <dd className="mt-1 text-white/78">{row.traditional}</dd>
                  </div>
                  <div>
                    <dt className="text-purple-light/68">
                      {t("AIR Calibrator 方案")}
                    </dt>
                    <dd className="mt-1 font-semibold text-purple-light">
                      {row.calibrator}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ModeSection({
  cards,
  featureLabels,
  t,
}: {
  cards: ModeCard[];
  featureLabels: string[];
  t: (value: string) => string;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-0">
      <div className="mx-auto max-w-[1536px] px-6 md:px-0">
        <div className="relative hidden aspect-[1536/1024] overflow-hidden bg-black md:block">
          <Image
            src={`${IMAGE_ROOT}/bento-grid-d.png`}
            alt=""
            fill
            sizes="(max-width: 1536px) 100vw, 1536px"
            className="object-cover"
          />

          <div className="absolute left-[5.2%] top-[14.6%] w-[39%]">
            <h2 className="text-[clamp(36px,4.6vw,68px)] font-black leading-[1.08] tracking-[0.04em] text-white">
              {t("三種模式")}
              <span className="bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text text-transparent">
                {t("自由切換")}
              </span>
              <br />
              {t("適配任何標定場景")}
            </h2>
            <p className="mt-[10%] text-[clamp(16px,1.55vw,24px)] font-medium tracking-[0.08em] text-white">
              {t("滿足多樣化需求，助力高精度智能製造")}
            </p>
          </div>

          <div className="absolute right-[4.2%] top-[13.5%] flex flex-col gap-[clamp(14px,2vw,34px)]">
            {featureLabels.map((label) => (
              <div
                key={label}
                className="flex items-center justify-end gap-3 text-[clamp(12px,1vw,16px)] text-white"
              >
                <span className="rounded bg-[#020207]/80 px-2 py-0.5">
                  {label}
                </span>
                <span className="h-[clamp(24px,2.4vw,36px)] w-[clamp(24px,2.4vw,36px)] rounded-full border border-purple-light/55 bg-purple-primary/10 shadow-[0_0_16px_rgba(123,102,255,0.45)]" />
              </div>
            ))}
          </div>

          {cards.map((card, index) => (
            <article
              key={card.title}
              className="absolute top-[48.2%] h-[47.8%] w-[30.2%]"
              style={{ left: modeDesktopCards[index].left }}
            >
              <div className="flex h-[15%] items-center gap-[4%] px-[5.3%]">
                <span className="text-[clamp(28px,3.2vw,46px)] font-semibold leading-none text-white">
                  {card.number}
                </span>
                <h3 className="min-w-0 text-[clamp(15px,1.55vw,24px)] font-semibold leading-tight tracking-[0.02em] text-white">
                  {card.title}
                </h3>
              </div>
              <p className="mx-auto mt-[3.5%] w-[78%] text-center text-[clamp(11px,1.12vw,17px)] leading-[1.65] tracking-[0.06em] text-white/88">
                {card.description}
              </p>
              <div className="absolute bottom-[4.2%] left-[5%] right-[5%] grid grid-cols-4 gap-2 text-center text-[clamp(9px,0.86vw,13px)] font-semibold tracking-[0.06em] text-white">
                {card.tags.map((tag) => (
                  <span key={tag} className="truncate">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="md:hidden">
          <SectionHeading
            eyebrow="Flexible Calibration Modes"
            title={t("三種模式自由切換")}
            description={t(
              "靈活適配任何標定場景，兼顧高精度、智能化、易操作與多場景覆蓋。",
            )}
          />
          <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-lg border border-purple-light/25 bg-black">
            <Image
              src={`${IMAGE_ROOT}/bento-grid-d.png`}
              alt="AIR Calibrator 三種標定模式"
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="mb-5 grid grid-cols-2 gap-3">
            {featureLabels.map((label) => (
              <div
                key={label}
                className="rounded-lg border border-purple-light/25 bg-black/35 px-4 py-3 text-center text-sm font-semibold text-white/82"
              >
                {label}
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {cards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-purple-light/28 bg-[#070812] p-5"
              >
                <div className="flex items-center gap-4 border-b border-purple-light/18 pb-4">
                  <span className="text-3xl font-semibold text-purple-light">
                    {card.number}
                  </span>
                  <h3 className="min-w-0 text-lg font-semibold leading-snug text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/70">
                  {card.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HardwareWorkflowSection({
  processSteps,
  ecosystemBrands,
  applicationScenes,
  t,
}: {
  processSteps: ProcessStep[];
  ecosystemBrands: EcosystemBrand[];
  applicationScenes: ApplicationScene[];
  t: (value: string) => string;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-0">
      <div className="mx-auto max-w-[1536px] px-6 md:px-0">
        <div className="hidden md:block">
          <div className="relative aspect-[1536/1024] overflow-hidden bg-black">
            <Image
              src={`${LAYER_ROOT}/hardware-hero-visual.png`}
              alt=""
              fill
              sizes="(max-width: 1536px) 100vw, 1536px"
              className="object-cover"
            />

            <div className="absolute left-[3.4%] top-[7.2%] w-[45%]">
              <h2 className="text-[clamp(28px,3.5vw,52px)] font-black leading-[1.35] tracking-[0.02em] text-white">
                {t("極簡硬件與全自動流程")}
                <br />
                {t("只需")}
                <span className="bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text text-transparent">
                  {t("兩件硬件")}
                </span>
                ，
                <span className="bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text text-transparent">
                  {t("三步全自動")}
                </span>
                {t("完成")}
              </h2>
            </div>

            <div className="absolute left-[5.9%] top-[30.8%]">
              <p className="bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text text-[clamp(24px,2.4vw,38px)] font-bold leading-none text-transparent">
                {t("所需硬件")}
              </p>
              <p className="mt-[6%] whitespace-nowrap text-[clamp(14px,1.35vw,21px)] font-bold tracking-[0.02em] text-white">
                {t("雲芯 DS-A 系列相機")}
                <span className="px-[1.3em] text-purple-light">+</span>
                {t("高精度 Charuco 標定板")}
              </p>
            </div>

            <p className="absolute left-[5.9%] top-[44.6%] bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text text-[clamp(24px,2.4vw,38px)] font-bold leading-none text-transparent">
              {t("標定流程")}
            </p>

            {processSteps.map((step, index) => (
              <article
                key={step.number}
                className="absolute top-[58.3%] h-[35.5%] w-[28.3%]"
                style={{ left: processDesktopCards[index].left }}
              >
                <div className="flex items-center gap-[3%] pl-[4.5%] pt-[2%]">
                  <span className="text-[clamp(24px,2.8vw,42px)] font-bold leading-none text-white">
                    {step.number}
                  </span>
                  <h3 className="text-[clamp(15px,1.55vw,24px)] font-bold leading-tight text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="ml-[4.5%] mt-[2%] w-[68%] text-[clamp(10px,0.94vw,15px)] leading-[1.65] text-white/88">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="relative aspect-[1536/1024] overflow-hidden bg-black">
            <Image
              src={`${LAYER_ROOT}/ecosystem-bg.png`}
              alt=""
              fill
              sizes="(max-width: 1536px) 100vw, 1536px"
              className="object-cover"
            />

            <div className="absolute left-[5.4%] top-[16.8%]">
              <h2 className="text-[clamp(32px,3.6vw,56px)] font-black leading-tight text-white">
                {t("生態兼容與應用場景")}
              </h2>
              <p className="mt-[4%] text-[clamp(13px,1.35vw,22px)] uppercase tracking-[0.08em] text-white/50">
                Ecosystem & Applications
              </p>
            </div>

            <p className="absolute left-[8.4%] top-[36.4%] text-[clamp(16px,1.55vw,24px)] font-bold text-white">
              {t("已支持的機器人品牌")}
            </p>
            <div className="absolute left-[6.4%] right-[6.4%] top-[45%] grid grid-cols-5 gap-[2.2%]">
              {ecosystemBrands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex h-[clamp(64px,7.8vw,120px)] flex-col items-center justify-center rounded-lg border border-purple-light/20 bg-black/10"
                >
                  <p
                    className={`text-[clamp(18px,2.3vw,34px)] font-black leading-none ${brand.tone}`}
                  >
                    {brand.name}
                  </p>
                  <p className="mt-[8%] text-[clamp(10px,0.9vw,15px)] text-white/82">
                    {brand.caption}
                  </p>
                </div>
              ))}
            </div>

            <p className="absolute left-[8.4%] top-[61.6%] text-[clamp(16px,1.55vw,24px)] font-bold text-white">
              {t("典型應用場景")}
            </p>
            <div className="absolute left-[5.2%] right-[5.2%] top-[72.4%] grid grid-cols-4 gap-[1.8%]">
              {applicationScenes.map((scene) => (
                <article key={scene.number} className="min-w-0">
                  <h3 className="flex items-center gap-2 text-[clamp(11px,1.08vw,17px)] font-bold leading-tight text-white">
                    <span className="rounded bg-purple-primary px-2 py-1 text-white">
                      {scene.number}
                    </span>
                    <span className="truncate">{scene.title}</span>
                  </h3>
                  <p className="mt-[60%] text-[clamp(10px,0.92vw,14px)] leading-[1.65] text-white/66">
                    {scene.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-12 md:hidden">
          <div>
            <SectionHeading
              eyebrow="Hardware & Workflow"
              title={t("極簡硬件與全自動流程")}
              description={t("只需兩件硬件，三步全自動完成。")}
            />
            <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-lg border border-purple-light/25 bg-black">
              <Image
                src={`${LAYER_ROOT}/hardware-hero-visual.png`}
                alt="AIR Calibrator 硬件與標定流程示意"
                fill
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="rounded-lg border border-purple-light/25 bg-[#070812] p-5">
              <p className="text-lg font-semibold text-purple-light">
                {t("所需硬件")}
              </p>
              <p className="mt-3 text-sm font-semibold leading-7 text-white">
                {t("雲芯 DS-A 系列相機 + 高精度 Charuco 標定板")}
              </p>
            </div>
            <div className="mt-4 space-y-4">
              {processSteps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-lg border border-purple-light/25 bg-[#070812] p-5"
                >
                  <p className="text-3xl font-semibold text-purple-light">
                    {step.number}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Ecosystem & Applications"
              title={t("生態兼容與應用場景")}
              description={t(
                "主流機器人品牌持續適配，覆蓋引導、測量、協作和現場維護。",
              )}
            />
            <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-lg border border-purple-light/25 bg-black">
              <Image
                src={`${LAYER_ROOT}/ecosystem-bg.png`}
                alt="AIR Calibrator 生態兼容與應用場景"
                fill
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ecosystemBrands.map((brand) => (
                <div
                  key={brand.name}
                  className="rounded-lg border border-purple-light/20 bg-[#070812] p-4 text-center"
                >
                  <p className={`text-xl font-black ${brand.tone}`}>
                    {brand.name}
                  </p>
                  <p className="mt-2 text-xs text-white/68">
                    {brand.caption}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-4">
              {applicationScenes.map((scene) => (
                <article
                  key={scene.number}
                  className="rounded-lg border border-purple-light/25 bg-[#070812] p-5"
                >
                  <p className="text-sm font-semibold text-purple-light">
                    SCENE {scene.number}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {scene.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    {scene.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection({
  useCases,
  t,
}: {
  useCases: UseCase[];
  t: (value: string) => string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0d0e10] py-16 md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_72%_38%_at_50%_0%,rgba(123,102,255,0.18),transparent_68%)]"
      />
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-light">
              USE CASES
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              {t("應用案例")}
            </h2>
          </div>
          <p className="max-w-[420px] text-sm leading-7 text-white/58">
            {t("聚焦三個主案例，保持與 Figma 應用案例區的三卡片結構一致。")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {useCases.map((item) => (
            <UseCaseCard key={item.title} item={item} t={t} />
          ))}
        </div>
      </div>
    </section>
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

function UseCaseCard({
  item,
  t,
}: {
  item: {
    title: string;
    description: string;
    image: string;
    href?: string;
  };
  t: (value: string) => string;
}) {
  const card = (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-purple-light/22 bg-[#080a12]">
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
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
              {t("了解更多")} <ArrowRight size={14} strokeWidth={2} />
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/42">
              <Package size={14} strokeWidth={1.8} />
              {t("敬請期待")}
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
