import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Code2,
  Cuboid,
  GitBranch,
  MousePointer2,
  Route,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import SeriesCTA from "@/components/series/SeriesCTA";

const IMAGE_ROOT = "/images/products/air-planner-engine";

const workflowSteps: { label: string; icon: LucideIcon }[] = [
  { label: "環境匯入", icon: Box },
  { label: "軌跡生成", icon: Route },
  { label: "代碼輸出", icon: Code2 },
];

const advantageCards = [
  {
    title: "成本優勢顯著",
    description:
      "相比市面上同類離線編程軟件，AIR Planner 定價更具優勢，專為預算有限但追求高效編程的中小企業量身打造。",
  },
  {
    title: "加速項目落地",
    description:
      "完美融入機械臂與視覺應用體系，與視覺系統無縫配合，有效減少外部採購與集成調試時間。",
  },
  {
    title: "大幅降低技術門檻",
    description:
      "從軌跡生成到代碼輸出的流程極其直觀清晰，讓一線人員也能快速上手，顯著減少對高級編程工程師的依賴。",
  },
];

const coreModules: {
  index: string;
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
}[] = [
  {
    index: "01",
    title: "快速建模與精準對齊",
    description:
      "支援快速匯入 STEP 和 STL 格式的工件、工具及機械臂模型，完成軌跡規劃前的基礎建模。",
    bullets: [
      "支援手動三點選點或參數輸入進行靈活 TCP 標定",
      "實時顯示工具坐標系，簡化校準流程",
      "內置多點標定法，對齊機械臂與工件坐標系",
    ],
    icon: Cuboid,
  },
  {
    index: "02",
    title: "多樣化軌跡生成與精細編輯",
    description:
      "內置弓字形 / Z 字形面打磨軌跡、邊緣打磨軌跡，並支援自定義選點軌跡。",
    bullets: ["進出刀點位編輯", "軌跡整體或單點偏移 / 旋轉", "可編輯的軌跡 ROI 區域"],
    icon: GitBranch,
  },
  {
    index: "03",
    title: "可靠的模擬與碰撞檢測",
    description: "提供軌跡模擬運行功能，在正式投產前提前規避風險。",
    bullets: [
      "系統會自動檢測是否存在碰撞風險",
      "檢查機械臂是否會發生較大翻轉",
      "判斷指定位置是否可達",
    ],
    icon: ShieldCheck,
  },
  {
    index: "04",
    title: "一鍵生成示教器代碼",
    description:
      "自動生成點位存儲代碼、點位運動代碼、偏移量代碼以及 WAIT I/O 控制代碼，直接用於示教器運行。",
    bullets: ["點位存儲代碼", "點位運動代碼", "偏移量與 WAIT I/O 控制代碼"],
    icon: Code2,
  },
  {
    index: "05",
    title: "軟體授權",
    description: "以更友好的部署與授權方式，支援集成商和中小企業快速開始離線編程項目。",
    bullets: ["降低前期投入", "支援內部項目開發", "適配機械臂應用交付"],
    icon: MousePointer2,
  },
];

const applicationScenes = [
  "專攻打磨、拋光、去毛刺等高頻機械臂應用領域",
  "滿足自動化產線中需要快速生成複雜軌跡的迫切需求",
  "是機械臂集成商進行內部項目開發與模擬驗證的得力工具",
];

export default function AirPlannerEnginePage() {
  return (
    <div className="overflow-x-hidden bg-black">
      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-black pt-20 md:min-h-[660px] md:pt-24">
        <Image
          src={`${IMAGE_ROOT}/hero-bg.png`}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-30 object-cover object-[58%_center] opacity-95 md:object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.93)_29%,rgba(0,0,0,0.54)_57%,rgba(0,0,0,0.2)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_58%_at_72%_78%,rgba(123,102,255,0.22),transparent_68%)]"
        />

        <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-[640px]">
            <p className="bg-[linear-gradient(90deg,#492e8d_0%,#7b66ff_100%)] bg-clip-text text-2xl font-bold leading-tight tracking-[1.4px] text-transparent md:text-4xl">
              智能機械臂離線編程與軌跡規劃軟件
            </p>
            <h1 className="mt-6 text-[52px] font-bold leading-none text-[#7b66ff] md:text-[86px]">
              AIR Planner
            </h1>
            <p className="mt-6 text-xl font-semibold leading-snug text-white md:text-2xl">
              讓機械臂編程更簡單、更省錢
            </p>
            <p className="mt-5 max-w-[610px] text-sm leading-7 text-white/82 md:text-base">
              這是一款專為
              <span className="mx-1 bg-[linear-gradient(90deg,#7b66ff_0%,#492e8d_100%)] bg-clip-text font-semibold text-transparent">
                工業機械臂應用設計的離線編程與模擬軟件
              </span>
              。我們支援 ABB、KUKA 等主流機械臂型號，為您提供從環境匯入、軌跡生成到代碼輸出的
              <span className="mx-1 text-purple-light">一站式</span>
              解決方案。
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-center gap-4">
                    <div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-[#7b66ff]/70 bg-black/45 text-[#7b66ff] shadow-[0_0_18px_rgba(123,102,255,0.28)]">
                        <Icon size={25} strokeWidth={1.8} />
                      </div>
                      <p className="mt-3 text-center text-xs font-semibold text-white/82 md:text-sm">
                        {step.label}
                      </p>
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <ArrowRight
                        aria-hidden
                        size={20}
                        className="mb-8 hidden text-[#7b66ff]/80 sm:block"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/about/contact"
                className="inline-flex min-w-[148px] items-center justify-center rounded-lg bg-purple-primary/90 px-8 py-4 text-sm font-semibold tracking-[1.2px] text-white transition-colors hover:bg-purple-primary"
              >
                立即咨詢
              </Link>
              <Link
                href="#air-planner-core"
                className="inline-flex min-w-[148px] items-center justify-center border border-white/20 bg-black/30 px-8 py-4 text-sm font-semibold tracking-[1.2px] text-white/90 transition-colors hover:border-purple-light hover:text-white"
              >
                功能演示
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#47484a]/20 bg-black py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <Image
            src={`${IMAGE_ROOT}/advantages-cards.png`}
            alt="AIR Planner 核心優勢：成本優勢顯著、加速項目落地、大幅降低技術門檻"
            width={1280}
            height={567}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="hidden h-auto w-full md:block"
          />
          <div className="grid gap-5 md:hidden">
            {advantageCards.map((card, index) => (
              <article
                key={card.title}
                className="rounded-2xl border border-[#7b66ff]/35 bg-[#080911] p-6 shadow-[0_0_24px_rgba(123,102,255,0.18)]"
              >
                <p className="text-sm font-semibold text-purple-light">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 text-2xl font-bold text-white">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="air-planner-core"
        className="relative isolate scroll-mt-24 overflow-hidden bg-black py-20 md:py-24"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_68%_36%_at_50%_8%,rgba(73,46,141,0.24),transparent_68%)]"
        />
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="mx-auto mb-12 max-w-[620px] text-center md:mb-16">
            <p className="text-xs font-bold uppercase tracking-[4px] text-purple-light">
              Core Features
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
              核心功能模組
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {coreModules.slice(0, 4).map((module) => (
              <CoreModuleCard key={module.index} module={module} />
            ))}
          </div>
          <div className="mx-auto mt-5 max-w-[760px]">
            <CoreModuleCard module={coreModules[4]} compact />
          </div>
        </div>
      </section>

      <section
        id="air-planner-applications"
        className="scroll-mt-24 border-y border-[#47484a]/20 bg-black py-16 md:py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <Image
            src={`${IMAGE_ROOT}/application-scenes.png`}
            alt="AIR Planner 典型應用場景"
            width={1280}
            height={598}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="hidden h-auto w-full md:block"
          />
          <div className="md:hidden">
            <p className="text-xs font-bold uppercase tracking-[4px] text-purple-light">
              Use Cases
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              典型應用場景
            </h2>
            <div className="mt-8 grid gap-4">
              {applicationScenes.map((scene, index) => (
                <article
                  key={scene}
                  className="rounded-xl border border-[#7b66ff]/30 bg-[#080911] p-5"
                >
                  <p className="text-sm font-semibold text-purple-light">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-base font-semibold leading-7 text-white">
                    {scene}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SeriesCTA
        data={{
          title: "讓機械臂規劃進入高效交付",
          subtitle:
            "聯繫 AIeveR 團隊，確認 AIR Planner 的機械臂型號適配、軌跡生成流程與現場導入路徑。",
          primaryCta: { label: "獲取報價 / 諮詢", href: "/about/contact" },
          secondaryCta: { label: "預約功能演示", href: "/about/contact" },
          backgroundDefault: "/images/series/shared/cta-overlay-border-blur.png",
        }}
      />
    </div>
  );
}

function CoreModuleCard({
  module,
  compact = false,
}: {
  module: (typeof coreModules)[number];
  compact?: boolean;
}) {
  const Icon = module.icon;

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border border-[#7b66ff]/35 bg-[linear-gradient(145deg,rgba(8,9,17,0.96),rgba(0,0,0,0.88))] p-6 shadow-[0_0_28px_rgba(123,102,255,0.18)] md:p-8 ${
        compact ? "lg:min-h-[300px]" : "lg:min-h-[380px]"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_42%_at_75%_0%,rgba(123,102,255,0.17),transparent_70%)]"
      />
      <div className="relative flex items-start gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-[#7b66ff]/60 bg-purple-primary/20 text-purple-light">
          <Icon size={30} strokeWidth={1.6} />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-3xl font-bold leading-none text-white">
            {module.index}
          </p>
          <h3 className="mt-3 bg-[linear-gradient(90deg,#fff_0%,#7b66ff_100%)] bg-clip-text text-2xl font-black leading-tight text-transparent md:text-3xl">
            {module.title}
          </h3>
        </div>
      </div>
      <p className="relative mt-6 text-sm leading-7 text-white/78 md:text-base md:leading-8">
        {module.description}
      </p>
      <div className="relative mt-7 grid gap-3">
        {module.bullets.map((bullet) => (
          <div key={bullet} className="flex gap-3 text-sm leading-6 text-white/82">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-light" />
            <span>{bullet}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
