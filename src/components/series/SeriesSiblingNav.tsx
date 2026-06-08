import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SeriesData } from "@/data/series";

interface SeriesSiblingNavProps {
  prev: SeriesData | null;
  next: SeriesData | null;
}

export default function SeriesSiblingNav({ prev, next }: SeriesSiblingNavProps) {
  if (!prev && !next) return null;

  return (
    <section className="relative bg-bg-primary border-y border-border-subtle overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "linear-gradient(90deg, rgba(73,46,141,0.12), transparent 32%, transparent 68%, rgba(123,102,255,0.12))",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {prev ? (
            <SeriesLink direction="prev" series={prev} />
          ) : (
            <div className="hidden md:block" aria-hidden />
          )}
          {next ? (
            <SeriesLink direction="next" series={next} />
          ) : (
            <div className="hidden md:block" aria-hidden />
          )}
        </div>
      </div>
    </section>
  );
}

function SeriesLink({
  direction,
  series,
}: {
  direction: "prev" | "next";
  series: SeriesData;
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/products/depthsight/${series.slug}`}
      className={`group relative min-h-[132px] overflow-hidden border border-border-subtle bg-bg-secondary/70 px-5 py-5 md:px-7 md:py-6 transition-colors hover:border-purple-light/70 ${
        isNext ? "md:text-right" : ""
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(123,102,255,0.16) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex h-full items-center justify-between gap-5">
        {!isNext && (
          <span className="flex size-11 shrink-0 items-center justify-center border border-border-color text-text-primary transition-colors group-hover:border-purple-light group-hover:text-purple-light">
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
          </span>
        )}

        <span className={isNext ? "ml-auto" : ""}>
          <span className="block text-[10px] uppercase tracking-[3px] text-purple-light font-semibold mb-3">
            {isNext ? "下一個系列" : "上一個系列"}
          </span>
          <span className="block text-text-primary text-xl md:text-2xl font-semibold leading-snug">
            {series.hero.title}
          </span>
          <span className="mt-2 block text-text-secondary text-xs md:text-sm">
            DepthSight 高性能 3D 視覺感測器產品線
          </span>
        </span>

        {isNext && (
          <span className="flex size-11 shrink-0 items-center justify-center border border-border-color text-text-primary transition-colors group-hover:border-purple-light group-hover:text-purple-light">
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        )}
      </div>
    </Link>
  );
}
