import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  Clock3,
  Cpu,
  Crosshair,
  Gauge,
  LayoutGrid,
  PackageCheck,
  Play,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import SeriesCTA from "@/components/series/SeriesCTA";

const IMAGE_ROOT = "/images/products/air-picking-station";

const heroStats = [
  "狀態：運行中",
  "高性價比",
  "處理效率",
  "輕量化部署",
];

const coreAdvantages: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "強大效能",
    description:
      "經過多版本迭代，整合豐富功能，能在最短時間內實現最優路徑規劃，顯著提高抓取節拍及清框率。",
    icon: Zap,
  },
  {
    title: "極致易用",
    description:
      "採用圖形化、參數化介面，完全無需編程，短時間內即可輕鬆部署全新任務。",
    icon: Sparkles,
  },
  {
    title: "靈活適配",
    description:
      "採用模組化設置，完美適配多種複雜的實際生產場景，極大方便用戶的調試與實際使用。",
    icon: LayoutGrid,
  },
  {
    title: "全能特性",
    description:
      "支援自動標定、多抓取點設置、點雲逆向建模和料框偏移處理，讓方案狀態可提前驗證。",
    icon: Gauge,
  },
];

const featureCards = [
  "支援一鍵完成自動標定及七軸聯動",
  "支援產品干擾區域設置與多抓取點設置，全面提升抓取效率",
  "具備點雲逆向建模能力，無需依賴 CAD 模型",
  "支援料框偏移處理，並提供全景模擬功能，讓您隨時知曉運行狀態並提前驗證方案",
];

const deploymentSteps = [
  {
    step: "STEP 01",
    title: "快速啟動",
    description: "安裝軟件約用時 1 分鐘，打開軟件並選擇工作站與檔案夾約用時 1 分鐘。",
    time: "約 2 分鐘",
  },
  {
    step: "STEP 02",
    title: "設備配置",
    description: "設置工作站及設置夾爪，各只需約 3 分鐘。",
    time: "約 3 分鐘",
  },
  {
    step: "STEP 03",
    title: "精準標定",
    description:
      "標定相機和機械臂位姿，Eye-on-hand 模式約 10 分鐘，Eye-to-hand 模式僅需 5 分鐘。",
    time: "約 5-10 分鐘",
  },
  {
    step: "STEP 04",
    title: "參數設定",
    description: "設置範本匹配參數及抓取點，約用時 10 分鐘。",
    time: "約 10 分鐘",
  },
  {
    step: "STEP 05",
    title: "測試運行",
    description: "工作站測試約用時 3 分鐘，即可開始工作。",
    time: "約 3 分鐘",
  },
];

const technologyItems: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "三維成像",
    description: "採用高頻條紋編碼結構光三維成像技術，捕捉精準細節。",
    icon: ScanLine,
  },
  {
    title: "精準識別",
    description: "內建基於 PPF 和 ICP 匹配演算法的 3D 識別技術。",
    icon: Crosshair,
  },
  {
    title: "智慧規劃",
    description: "具備奇異點自動規避及多抓取點的機器人軌跡自動規劃技術。",
    icon: Cpu,
  },
  {
    title: "安全防護",
    description: "運用基於空間三角形快速相交檢測演算法的全場景碰撞檢測技術，確保運行安全。",
    icon: ShieldCheck,
  },
];

const scenarioGroups = [
  {
    number: "01",
    title: "適用工藝場景",
    description: "廣泛應用於工件下料、工件上料、衝壓件裝箱以及跟隨抓取等環節。",
    items: ["工件下料", "工件上料", "衝壓件裝箱", "跟隨抓取"],
  },
  {
    number: "02",
    title: "支援工件類型",
    description: "完美處理金屬連接件、棒料、鋁鑄件、環形工件及薄片狀金屬件等。",
    items: ["金屬連接件", "棒料", "鋁鑄件", "環形工件", "薄片狀金屬件"],
  },
  {
    number: "03",
    title: "相容料箱規格",
    description:
      "支援小型、中型、大型無序料箱，以及托盤和工件結構化擺放的料箱。",
    items: [
      "小型無序料箱 300x400mm",
      "中型無序料箱 600x800mm",
      "大型無序料箱 800x1200mm",
      "托盤 1200x800*450mm",
    ],
  },
];

const applicationCases = ["鏈軌節無序抓取及上料", "汽車鈑金上料", "汽車零部件抓取"];

export default function AirPickingStationPage() {
  return (
    <div className="overflow-x-hidden bg-[#010104]">
      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-black pt-20 md:min-h-[610px] md:pt-24">
        <Image
          src={`${IMAGE_ROOT}/hero-bg.png`}
          alt="AIR Picking 無序抓取工作站"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-30 object-cover object-[62%_center] md:object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.92)_35%,rgba(0,0,0,0.45)_62%,rgba(0,0,0,0.18)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(ellipse_75%_65%_at_38%_100%,rgba(123,102,255,0.28),transparent_70%)]"
        />

        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 py-16 md:px-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.58fr)] lg:items-end">
          <div className="max-w-[660px]">
            <p className="bg-[linear-gradient(90deg,#492e8d_0%,#7b66ff_100%)] bg-clip-text text-[26px] font-bold leading-tight tracking-[1.4px] text-transparent md:text-4xl">
              多維視覺引導機器人抓取引擎
            </p>
            <h1 className="mt-5 text-[56px] font-bold leading-none text-[#7b66ff] md:text-[82px]">
              AIR Picking
            </h1>
            <p className="mt-7 max-w-[620px] text-xl font-semibold leading-9 text-white md:text-2xl">
              AIeveR 3D相機 + 機械臂 + AIR Picking 無序抓取軟件
              <br />
              無序抓取工作站解決方案
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/about/contact"
                className="inline-flex min-w-[148px] items-center justify-center rounded-lg bg-purple-primary/90 px-8 py-4 text-sm font-semibold tracking-[1.2px] text-white transition-colors hover:bg-purple-primary"
              >
                立即咨詢
              </Link>
              <Link
                href="#air-picking-core"
                className="inline-flex min-w-[148px] items-center justify-center gap-2 border border-white/20 bg-black/30 px-8 py-4 text-sm font-semibold tracking-[1.2px] text-white/90 transition-colors hover:border-purple-light hover:text-white"
              >
                <Play size={16} fill="currentColor" strokeWidth={0} />
                功能演示
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-purple-light/20 bg-black/35 p-4 shadow-[0_0_32px_rgba(123,102,255,0.2)] backdrop-blur-sm sm:grid-cols-2 lg:mb-10">
            {heroStats.map((stat) => (
              <div
                key={stat}
                className="rounded-lg border border-white/10 bg-[#0d0e16]/70 px-4 py-3 text-sm font-semibold text-white/82"
              >
                {stat}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="air-picking-core"
        className="scroll-mt-24 border-y border-[#47484a]/20 bg-black py-16 md:py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <DesktopSectionImage
            src={`${IMAGE_ROOT}/group144-advantages.png`}
            alt="AIR Picking 核心優勢與全能特性"
            width={1280}
            height={1497}
          />

          <div className="md:hidden">
            <MobileSectionHeading title="核心優勢" />
            <div className="mt-8 grid gap-4">
              {coreAdvantages.map((item) => (
                <MobileInfoCard key={item.title} item={item} />
              ))}
            </div>

            <MobileSectionHeading title="全能特性" className="mt-12" />
            <div className="mt-6 grid gap-4">
              {featureCards.map((feature, index) => (
                <article
                  key={feature}
                  className="rounded-xl border border-[#7b66ff]/30 bg-[#080911] p-5"
                >
                  <p className="text-sm font-semibold text-purple-light">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-sm font-semibold leading-7 text-white/82">
                    {feature}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#47484a]/20 bg-black py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <DesktopSectionImage
            src={`${IMAGE_ROOT}/group151-deployment.png`}
            alt="AIR Picking 極速部署體驗"
            width={1280}
            height={905}
          />

          <div className="md:hidden">
            <MobileSectionHeading title="極速部署體驗" />
            <div className="mt-8 grid gap-4">
              {deploymentSteps.map((step) => (
                <article
                  key={step.step}
                  className="rounded-2xl border border-[#7b66ff]/35 bg-[linear-gradient(145deg,rgba(9,10,18,0.96),rgba(0,0,0,0.88))] p-5"
                >
                  <p className="inline-flex rounded-md bg-purple-primary px-3 py-1 text-xs font-black italic text-white">
                    {step.step}
                  </p>
                  <h3 className="mt-5 text-2xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    {step.description}
                  </p>
                  <p className="mt-6 inline-flex items-center gap-2 rounded-lg bg-purple-primary/20 px-4 py-2 text-base font-bold text-purple-light">
                    <Clock3 size={18} />
                    {step.time}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 rounded-full border border-purple-light/35 bg-purple-primary/12 px-5 py-4 text-center text-lg font-bold text-white">
              整體流程測試僅需不到{" "}
              <span className="text-purple-light">25 分鐘</span>！
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#47484a]/20 bg-black py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <DesktopSectionImage
            src={`${IMAGE_ROOT}/group161-technology.png`}
            alt="AIR Picking 硬核技術底座"
            width={1280}
            height={760}
          />

          <div className="md:hidden">
            <MobileSectionHeading title="硬核技術底座" />
            <div className="mt-8 grid gap-4">
              {technologyItems.map((item) => (
                <MobileInfoCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#47484a]/20 bg-black py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <DesktopSectionImage
            src={`${IMAGE_ROOT}/group159-scenarios.png`}
            alt="AIR Picking 廣泛的適用場景"
            width={1280}
            height={825}
          />

          <div className="md:hidden">
            <MobileSectionHeading title="廣泛的適用場景" />
            <div className="mt-8 grid gap-4">
              {scenarioGroups.map((group) => (
                <article
                  key={group.number}
                  className="rounded-2xl border border-[#7b66ff]/35 bg-[#070812] p-5"
                >
                  <p className="inline-flex rounded-md bg-purple-primary px-3 py-1 text-xl font-black text-white">
                    {group.number}
                  </p>
                  <h3 className="mt-5 text-2xl font-bold text-white">
                    {group.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    {group.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-purple-light/25 bg-purple-primary/12 px-3 py-1.5 text-xs font-semibold text-white/78"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#47484a]/20 bg-black py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <DesktopSectionImage
            src={`${IMAGE_ROOT}/group138-cases.png`}
            alt="AIR Picking Station 應用案例"
            width={1280}
            height={598}
          />

          <div className="md:hidden">
            <MobileSectionHeading title="AIR Picking Station 應用案例" />
            <div className="mt-8 grid gap-4">
              {applicationCases.map((title) => (
                <article
                  key={title}
                  className="rounded-2xl border border-[#7b66ff]/35 bg-[#070812] p-5"
                >
                  <div className="flex aspect-[16/9] items-center justify-center rounded-xl border border-purple-light/25 bg-black/60 text-purple-light/70">
                    <Boxes size={36} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold leading-8 text-white">
                    {title}
                  </h3>
                  <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/45">
                    <PackageCheck size={16} />
                    案例素材待補
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

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
  );
}

function DesktopSectionImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(min-width: 1280px) 1200px, 100vw"
      className="hidden h-auto w-full md:block"
    />
  );
}

function MobileSectionHeading({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-bold uppercase tracking-[4px] text-purple-light">
        AIR Picking
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-white">
        {title}
      </h2>
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
    <article className="rounded-2xl border border-[#7b66ff]/35 bg-[linear-gradient(145deg,rgba(8,9,17,0.96),rgba(0,0,0,0.88))] p-5">
      <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-[#7b66ff]/55 bg-purple-primary/18 text-purple-light">
        <Icon size={26} strokeWidth={1.7} />
      </div>
      <h3 className="mt-5 bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text text-2xl font-black text-transparent">
        {item.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-white/76">
        {item.description}
      </p>
    </article>
  );
}
