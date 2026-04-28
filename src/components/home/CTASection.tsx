"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";
import { useSiteImage } from "@/components/SiteImageProvider";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const bg = useSiteImage("/images/home/cta-bg.jpg");

  return (
    <section ref={ref} className="relative isolate bg-bg-primary py-28 md:py-36 overflow-hidden">
      {/* Background image with isolation to prevent bleed-through */}
      <Image
        src={bg}
        alt=""
        fill
        className="object-cover object-center opacity-60"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-transparent to-bg-primary/60" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary leading-tight">
            多維視覺驅動具身智能無限可能
          </h2>
          <p className="text-text-secondary text-base md:text-lg mt-6 max-w-xl mx-auto">
            探索全棧自研3D視覺感測器與AI引擎，看AIeveR Robotics如何賦能汽車、新能源、3C等行業
          </p>
          <div className="flex items-center justify-center gap-4 mt-10">
            <Button href="/about/contact" size="lg">
              聯繫我們
            </Button>
            <Button href="/support/docs" variant="secondary" size="lg">
              技術文檔
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
