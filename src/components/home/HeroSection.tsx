"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSiteImage } from "@/components/SiteImageProvider";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  const heroSrc = useSiteImage("/images/home/group-243/industrial-robot-arm-b.png");

  return (
    <section className="relative isolate min-h-[clamp(640px,72vh,780px)] overflow-hidden bg-bg-primary">
      <Image
        src={heroSrc}
        alt="AIeveR Robotics 工業機械臂與 3D 視覺場景"
        fill
        priority
        sizes="100vw"
        className="home-hero-image object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #0d0e10 0%, rgba(13,14,16,0.92) 24%, rgba(13,14,16,0.56) 56%, rgba(13,14,16,0.2) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(141,119,207,0.13) 1px, transparent 1px), linear-gradient(180deg, rgba(141,119,207,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[clamp(640px,72vh,780px)] w-full max-w-[1440px] items-center px-6 py-24 md:px-10">
        <div className="max-w-[900px]">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 border border-purple-primary/40 bg-purple-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[3px] text-purple-light"
          >
            <span className="size-2 rounded-full bg-purple-primary" />
            Embodied Intelligence v2.0
          </motion.span>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="mt-8 text-[clamp(3rem,4.4vw,5.25rem)] font-semibold leading-[1.05] text-text-primary"
          >
            <span className="block lg:whitespace-nowrap">AIeveR Robotics Limited</span>
            <span className="mt-3 block whitespace-nowrap text-purple-light">雲芯機器人</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-8 max-w-[620px] text-base leading-8 text-text-secondary md:text-lg"
          >
            雲芯機器人有限公司（AIeveR Robotics Limited）成立於香港，是InnoHK香港物流機械人中心的孵化企業，由世界頂尖機器人專家、香港工程院院士劉雲輝教授領銜。公司業務覆蓋具身感知、具身操作、具身移動三大核心板塊，致力於為機器人提供通用具身操作智能技術及產品。
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.65, delay: 0.36 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#perception"
              className="inline-flex min-w-[150px] items-center justify-center bg-purple-primary px-8 py-4 text-sm font-semibold tracking-[2px] text-white transition-colors hover:bg-purple-primary/80"
            >
              開始探索
            </a>
            <Link
              href="/about/contact"
              className="inline-flex min-w-[150px] items-center justify-center border border-border-color bg-bg-primary/45 px-8 py-4 text-sm font-semibold tracking-[2px] text-text-primary backdrop-blur transition-colors hover:border-purple-light hover:text-purple-light"
            >
              聯絡我們
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-10 hidden h-48 items-center gap-4 text-text-secondary md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span
          className="text-[10px] uppercase tracking-[4px]"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll to explore
        </span>
        <span className="h-24 w-px bg-border-color" />
        <ChevronDown size={18} className="animate-bounce text-purple-light" />
      </motion.div>
    </section>
  );
}
