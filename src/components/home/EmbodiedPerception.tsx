"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useSiteImage } from "@/components/SiteImageProvider";

export default function EmbodiedPerception() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const bg = useSiteImage("/images/home/group-243/industrial-robot-arm-a.png");

  return (
    <section
      ref={ref}
      id="perception"
      className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-bg-primary py-20 md:min-h-[640px]"
    >
      {/* Background image */}
      <Image
        src={bg}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right md:object-[78%_center]"
        priority
      />
      {/* Left-to-right gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(13,14,16,0.96) 0%, rgba(13,14,16,0.78) 44%, rgba(13,14,16,0.2) 100%)",
        }}
      />

      {/* Text content — left side */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <div className="max-w-[540px]">
          <motion.span
            className="text-purple-light text-[11px] uppercase tracking-[5px] font-medium"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            ◇ EMBODIED INTELLIGENCE V2.0
          </motion.span>

          <motion.h2
            className="mt-8 text-4xl font-semibold leading-tight text-text-primary md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            具身感知
            <span className="mt-2 block text-purple-light">
              機器&quot;慧眼&quot;，破解複雜視覺難題
            </span>
          </motion.h2>

          <motion.p
            className="mt-9 max-w-[493px] text-base leading-[1.9] text-text-secondary md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            具身感知事業部專注於&quot;3D視覺+AI&quot;融合的具身操作智能技術及產品研發，構建了從晶片、嵌入式模組到感知演算法、AI模型的全棧自研體系。以3D視覺感測器和智能軟體為核心，系統性攻克高反光、黑色吸光、透明物體等工業視覺痛點，讓機器在複雜工業及民生場景中&quot;看得清、判得準、做得到&quot;，為工業自動化、具身操作、具身移動提供精準的感知支撐。
          </motion.p>
        </div>
      </div>
    </section>
  );
}
