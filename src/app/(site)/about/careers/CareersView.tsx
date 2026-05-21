import Link from "next/link";
import { ArrowRight, BrainCircuit, Handshake, Sparkles } from "lucide-react";
import CareerCard from "@/components/about/CareerCard";
import { careers } from "@/data/careers";

const principles = [
  {
    title: "把前沿技術做成真實產品",
    description:
      "我們關注 3D 視覺、具身智能與機器人操作在產線中的可用性，讓研發成果進入客戶現場。",
    icon: BrainCircuit,
  },
  {
    title: "與高密度團隊一起成長",
    description:
      "你會直接與算法、硬件、軟件、產品和交付團隊協作，快速理解複雜系統的完整鏈路。",
    icon: Sparkles,
  },
  {
    title: "面向全球智能製造場景",
    description:
      "從新能源、汽車到 3C 與物流，團隊正在把 AIeveR 的視覺智能能力推向更多行業。",
    icon: Handshake,
  },
];

export default function CareersView() {
  const featured = careers.find((career) => career.featured);

  return (
    <div className="overflow-hidden bg-bg-primary">
      <section className="relative isolate min-h-[560px] overflow-hidden border-b border-border-subtle pt-28 md:pt-36">
        <div
          aria-hidden
          className="absolute inset-0 -z-30 bg-[radial-gradient(ellipse_80%_60%_at_72%_16%,rgba(123,102,255,0.26),transparent_60%),linear-gradient(135deg,#050509_0%,#11101d_48%,#050509_100%)]"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-16 -z-20 h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-purple-light/20 bg-purple-primary/10 blur-3xl"
        />
        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 pb-20 md:px-10 lg:grid-cols-[0.95fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[5px] text-purple-light">
              Join AIeveR
            </p>
            <h1 className="mt-6 max-w-[720px] text-4xl font-bold leading-tight text-text-primary md:text-6xl">
              加入我們，讓具身智能走進真實產線
            </h1>
            <p className="mt-7 max-w-[640px] text-base leading-8 text-text-secondary md:text-lg">
              與 AIeveR Robotics 一起，把多維視覺、機器人操作與工業 AI
              產品化，服務新能源、汽車、3C、物流等高價值製造場景。
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#open-positions"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-purple-primary px-7 py-3.5 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-purple-primary/85"
              >
                查看職位
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about/contact"
                className="inline-flex items-center justify-center rounded-sm border border-border-color px-7 py-3.5 text-sm font-semibold tracking-wider text-text-primary transition-colors hover:border-purple-light hover:text-purple-light"
              >
                聯繫我們
              </Link>
            </div>
          </div>

          {featured && (
            <Link
              href={featured.href ?? "/about/careers"}
              className="group block overflow-hidden rounded-xl border border-purple-light/30 bg-[#0b0d18]/82 p-6 shadow-[0_0_40px_rgba(73,46,141,0.22)] backdrop-blur-sm transition-colors hover:border-purple-light/60"
            >
              <p className="text-xs font-bold uppercase tracking-[4px] text-purple-light">
                Featured Role
              </p>
              <h2 className="mt-5 text-3xl font-bold text-white">
                {featured.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/68">
                {featured.summary}
              </p>
              <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-white/62">
                  {featured.location} · {featured.type}
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-purple-light">
                  了解職位
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="bg-[#07080e] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="mb-12 max-w-[760px]">
            <p className="text-xs font-bold uppercase tracking-[4px] text-purple-light">
              Why AIeveR
            </p>
            <h2 className="mt-4 text-3xl font-bold text-text-primary md:text-5xl">
              在高速迭代中做難而有用的事
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-xl border border-border-subtle bg-bg-secondary/60 p-6"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-purple-light/30 bg-purple-primary/15 text-purple-light">
                    <Icon size={24} strokeWidth={1.7} />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="open-positions"
        className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24"
      >
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-purple-light">
              Open Positions
            </p>
            <h2 className="mt-4 text-3xl font-bold text-text-primary md:text-5xl">
              招聘職位
            </h2>
          </div>
          <p className="max-w-[520px] text-sm leading-7 text-text-secondary">
            真實招聘鏈接仍等待資料方提供；已確認的市場產品經理職位先接入站內詳情頁。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {careers.map((career, index) => (
            <CareerCard key={career.id} career={career} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
