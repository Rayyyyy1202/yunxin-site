"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { SeriesCTA as SeriesCTAType } from "@/data/series";

interface SeriesCTAProps {
  data?: SeriesCTAType;
}

export default function SeriesCTA({ data }: SeriesCTAProps) {
  if (!data) return null;

  return (
    <section className="relative isolate flex min-h-[450px] items-center overflow-hidden bg-[#0D0E10] py-20 md:py-0">
      {data.backgroundDefault && (
        <Image
          src={data.backgroundDefault}
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover pointer-events-none opacity-70"
          priority={false}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-[#0D0E10]/45 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(13,14,16,0.72)_0%,rgba(13,14,16,0.34)_48%,rgba(13,14,16,0.58)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-cyan-400/45 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-cyan-400/30 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none backdrop-blur-[1px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(73,46,141,0.26) 0%, transparent 72%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-[920px] mx-auto px-6 md:px-10 text-center"
      >
        <h2 className="text-text-primary text-3xl md:text-5xl font-bold leading-tight tracking-tight">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="mt-5 text-text-secondary text-base md:text-lg leading-relaxed max-w-[680px] mx-auto">
            {data.subtitle}
          </p>
        )}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={data.primaryCta.href}
            className="inline-flex items-center justify-center bg-purple-primary text-white px-7 py-3.5 text-sm font-medium tracking-wider uppercase rounded-sm hover:bg-purple-primary/85 transition-colors"
          >
            {data.primaryCta.label}
          </Link>
          {data.secondaryCta && (
            <Link
              href={data.secondaryCta.href}
              className="inline-flex items-center justify-center border border-border-color text-text-primary px-7 py-3.5 text-sm font-medium tracking-wider uppercase rounded-sm hover:border-purple-light hover:text-purple-light transition-colors"
            >
              {data.secondaryCta.label}
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
