"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSiteImage } from "@/components/SiteImageProvider";
import { ChevronDown } from "lucide-react";
import Badge from "@/components/ui/Badge";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  const heroSrc = useSiteImage("/images/hero/robot-arm-bg.jpg");

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src={heroSrc}
          alt="AIeveR Robotics 機械臂"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,14,16,0.6) 0%, rgba(13,14,16,0.35) 40%, rgba(13,14,16,0.7) 100%)",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(73,46,141,0.1) 1px, transparent 1px), linear-gradient(180deg, rgba(73,46,141,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content — centered */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-10 text-center">
        <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.6 }}>
          <Badge>Embodied Intelligence v2.0</Badge>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col items-center"
          {...fadeUp}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Image
            src="/images/logo-mark.png"
            alt="AIeveR Robotics 標誌"
            width={120}
            height={120}
            priority
            className="h-20 w-auto md:h-24 mb-5 drop-shadow-[0_0_24px_rgba(141,119,207,0.45)]"
          />
          <h1 className="text-text-primary text-lg md:text-xl font-semibold tracking-wider">
            AIeveR Robotics Limited
          </h1>
          <p className="text-text-secondary text-sm md:text-base tracking-[6px] mt-1">
            雲 芯 機 器 人
          </p>
        </motion.div>

        <motion.p
          className="text-text-primary text-base md:text-lg lg:text-xl mt-8 max-w-[780px] mx-auto leading-relaxed"
          {...fadeUp}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          雲芯機器人有限公司（AIeveR Robotics Limited）成立於香港，是InnoHK香港物流機械人中心的孵化企業，由世界頂尖機器人專家、香港工程院院士劉雲輝教授領銜。公司業務覆蓋三大核心板塊：具身感知（3D視覺+AI）、具身操作（輪式雙臂協作機器人）、具身移動（四足機器人），致力於為機器人提供通用具身操作智能技術及產品，構建全棧自研的具身智能生態。
        </motion.p>

        <motion.div
          className="mt-10"
          {...fadeUp}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a
            href="#perception"
            className="inline-flex items-center justify-center bg-purple-primary text-white px-10 py-4 text-sm font-medium uppercase tracking-wider hover:bg-purple-primary/80 transition-colors"
          >
            開始探索
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-text-secondary text-[10px] uppercase tracking-[3px]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-text-secondary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
