import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { CareerDetail } from "@/lib/types";

interface CareerDetailPageProps {
  career: CareerDetail;
}

export default function CareerDetailPage({ career }: CareerDetailPageProps) {
  return (
    <div className="overflow-hidden bg-bg-primary">
      <section className="relative isolate min-h-[620px] overflow-hidden border-b border-border-subtle pt-28 md:pt-36">
        <Image
          src={career.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-30 object-cover object-center opacity-36"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,6,13,0.98)_0%,rgba(5,6,13,0.88)_48%,rgba(5,6,13,0.68)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_72%_58%_at_72%_20%,rgba(123,102,255,0.28),transparent_68%)]"
        />

        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 pb-20 md:px-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <Link
              href="/about/careers"
              className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-purple-light"
            >
              <ArrowLeft size={16} />
              返回加入我們
            </Link>
            <p className="text-xs font-bold uppercase tracking-[5px] text-purple-light">
              {career.department}
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-text-primary md:text-6xl">
              {career.title}
            </h1>
            <p className="mt-7 max-w-[720px] text-base leading-8 text-text-secondary md:text-lg">
              {career.summary}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <InfoPill icon={MapPin} label={career.location} />
              <InfoPill icon={BriefcaseBusiness} label={career.type} />
              <InfoPill icon={Clock3} label={career.workMode} />
            </div>
          </div>

          <aside className="rounded-xl border border-purple-light/30 bg-[#0b0d18]/84 p-6 shadow-[0_0_40px_rgba(73,46,141,0.2)] backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[4px] text-purple-light">
              Role Snapshot
            </p>
            <div className="mt-6 grid gap-4">
              {career.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <p className="text-[11px] uppercase tracking-[3px] text-white/42">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href={career.applyHref}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-purple-primary px-6 py-3.5 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-purple-primary/85"
            >
              立即申請
              <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.72fr)_minmax(360px,0.28fr)]">
        <div className="space-y-10">
          <DetailSection title="主要職責" items={career.responsibilities} />
          <DetailSection title="任職要求" items={career.requirements} />
          <DetailSection title="加分項" items={career.bonuses} />
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-border-subtle bg-bg-secondary/70 p-6">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-purple-light/30 bg-purple-primary/15 text-purple-light">
              <Sparkles size={24} strokeWidth={1.7} />
            </div>
            <h2 className="text-2xl font-bold text-text-primary">
              招聘流程
            </h2>
            <ol className="mt-6 space-y-4">
              {career.process.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple-light/30 text-xs font-semibold text-purple-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1 text-sm leading-6 text-text-secondary">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-7 text-sm leading-7 text-text-secondary">
              目前沒有單獨招聘系統鏈接，申請與溝通先統一進入聯繫頁。
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

function InfoPill({
  icon: Icon,
  label,
}: {
  icon: typeof MapPin;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-purple-light/24 bg-purple-primary/12 px-4 py-2 text-sm text-text-primary">
      <Icon size={15} />
      {label}
    </span>
  );
}

function DetailSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="rounded-xl border border-border-subtle bg-bg-secondary/55 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
        {title}
      </h2>
      <ul className="mt-7 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-4 text-sm leading-7 text-text-secondary md:text-base">
            <CheckCircle2
              size={18}
              className="mt-1 shrink-0 text-purple-light"
              strokeWidth={1.8}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
