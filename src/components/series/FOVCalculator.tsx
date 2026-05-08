"use client";

import { motion } from "framer-motion";
import { ChevronDown, RotateCcw } from "lucide-react";
import type { FOVCalculatorConfig } from "@/data/series";

interface FOVCalculatorProps {
  config?: FOVCalculatorConfig;
}

export default function FOVCalculator({ config }: FOVCalculatorProps) {
  if (!config) return null;

  return (
    <section className="relative bg-bg-secondary py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(73,46,141,0.25) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 flex items-end gap-4 flex-wrap"
        >
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold">
            視野計算工具
          </h2>
          <span className="text-purple-light text-xs md:text-sm uppercase tracking-[3px] font-semibold pb-1">
            / FOV Calculator
          </span>
          <span className="ml-auto text-[10px] uppercase tracking-[2px] text-purple-light bg-purple-primary/15 border border-purple-primary/30 rounded-full px-3 py-1 font-semibold">
            BETA · 敬請期待
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5 md:gap-6 rounded-xl border border-border-subtle bg-bg-primary/40 backdrop-blur-sm p-6 md:p-8"
        >
          {/* Left — input panel */}
          <div className="flex flex-col gap-5">
            {config.parameters.map((p, i) => (
              <div key={`${p.label}-${i}`}>
                <label className="block text-text-secondary text-[10px] uppercase tracking-[2px] font-semibold mb-2">
                  {p.label} {p.unit && <span className="text-text-secondary/60">({p.unit})</span>}
                </label>
                {i === 0 ? (
                  <div className="relative">
                    <select
                      defaultValue={config.defaultModel}
                      disabled
                      className="w-full appearance-none bg-bg-secondary/70 border border-border-color rounded-md px-4 py-3 text-sm text-text-primary cursor-not-allowed opacity-80 pr-10"
                    >
                      {config.modelOptions.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder={p.placeholder ?? "—"}
                    disabled
                    className="w-full bg-bg-secondary/70 border border-border-color rounded-md px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 cursor-not-allowed opacity-80"
                  />
                )}
              </div>
            ))}

            <button
              type="button"
              disabled
              className="inline-flex items-center justify-center gap-2 mt-2 bg-purple-primary/40 text-white/70 px-5 py-3 rounded-md text-sm font-medium uppercase tracking-wider cursor-not-allowed"
            >
              <RotateCcw size={14} />
              重置參數
            </button>
          </div>

          {/* Right — preview canvas */}
          <div className="relative aspect-[16/10] rounded-lg border border-purple-primary/30 bg-bg-secondary/40 overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(141,119,207,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(141,119,207,0.18) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute inset-8 border-2 border-dashed border-purple-light/60 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-purple-light text-xs uppercase tracking-[3px] font-bold mb-2">
                  FOV Preview
                </p>
                <p className="text-text-secondary text-sm">
                  互動計算功能即將上線
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
