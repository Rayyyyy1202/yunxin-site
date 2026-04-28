"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import SiteImg from "@/components/ui/SiteImg";

interface Stage {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const stages: Stage[] = [
  {
    id: "perceive",
    index: "01",
    title: "感知",
    subtitle: "Perceive",
    description:
      "通过 3D 视觉与多模态传感器，从物理世界中构建结构化的环境表示。",
    image: "/images/home/cognition-1.jpg",
  },
  {
    id: "understand",
    index: "02",
    title: "理解",
    subtitle: "Understand",
    description:
      "通过大模型与领域知识，将原始感知升华为对任务与环境的语义理解。",
    image: "/images/home/cognition-2.jpg",
  },
  {
    id: "decide",
    index: "03",
    title: "决策",
    subtitle: "Decide",
    description:
      "融合目标、约束与风险，生成可执行的策略并在闭环反馈中持续优化。",
    image: "/images/home/cognition-3.jpg",
  },
  {
    id: "act",
    index: "04",
    title: "行动",
    subtitle: "Act",
    description:
      "以力控、运动规划与安全层协同，将策略精准转化为对物理世界的影响。",
    image: "/images/home/cognition-4.jpg",
  },
];

export default function CognitionProcess() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [activeId, setActiveId] = useState<string>(stages[0].id);

  const active = stages.find((s) => s.id === activeId) ?? stages[0];

  return (
    <section
      ref={ref}
      id="cognition"
      className="relative bg-bg-primary py-20 md:py-28"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: heading + stage selector */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-purple-light text-xs uppercase tracking-[4px] font-bold"
            >
              Cognition Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 leading-tight"
            >
              见证机器人的
              <br />
              <span className="text-purple-light">认知进化过程</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-text-secondary mt-5 leading-relaxed"
            >
              从原始信号到可执行的行动策略 —— AIeveR 将具身智能拆解为四个闭环阶段，逐级打通机器人对物理世界的认知与改造能力。
            </motion.p>

            {/* Stage list */}
            <div className="mt-10 space-y-2">
              {stages.map((stage, index) => {
                const isActive = stage.id === activeId;
                return (
                  <motion.button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveId(stage.id)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.25 + index * 0.06,
                    }}
                    className={cn(
                      "group w-full flex items-center gap-4 py-4 px-4 md:px-5 -mx-4 md:-mx-5 rounded-xl text-left transition-colors",
                      isActive
                        ? "bg-bg-secondary border border-purple-primary/30"
                        : "border border-transparent hover:bg-bg-secondary/60",
                    )}
                    aria-pressed={isActive}
                  >
                    <span
                      className={cn(
                        "font-mono text-sm tracking-widest transition-colors",
                        isActive
                          ? "text-purple-light"
                          : "text-text-secondary/60 group-hover:text-text-secondary",
                      )}
                    >
                      {stage.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block font-bold text-lg md:text-xl transition-colors",
                          isActive
                            ? "text-text-primary"
                            : "text-text-secondary group-hover:text-text-primary",
                        )}
                      >
                        {stage.title}
                      </span>
                      <span className="block text-[11px] uppercase tracking-[3px] text-text-secondary/70 mt-0.5">
                        {stage.subtitle}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "h-px transition-all",
                        isActive
                          ? "w-10 bg-purple-light"
                          : "w-4 bg-text-secondary/30",
                      )}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: active stage imagery + description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[4/3] md:aspect-[16/11] bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                <SiteImg
                  src={active.image}
                  alt={active.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(73,46,141,0.25) 0%, rgba(13,14,16,0.55) 100%)",
                  }}
                />

                {/* Stage index overlay */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3">
                  <span className="text-purple-light font-mono text-base tracking-widest">
                    {active.index}
                  </span>
                  <span className="h-px w-12 bg-purple-light/40" />
                  <span className="text-text-primary text-xs uppercase tracking-[3px]">
                    {active.subtitle}
                  </span>
                </div>

                {/* Description overlay */}
                <div className="absolute left-6 right-6 bottom-6 md:left-8 md:right-8 md:bottom-8">
                  <h3 className="text-text-primary text-3xl md:text-4xl font-bold mb-2">
                    {active.title}
                  </h3>
                  <p className="text-text-primary/80 text-sm md:text-base max-w-md leading-relaxed">
                    {active.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
