"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";

export default function ProductShowcase() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="products"
      className="relative bg-bg-primary py-20 md:py-28"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Section heading */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-purple-light text-xs uppercase tracking-[4px] font-bold">
              Full-Stack Independent R&D · Multi-Dimensional Intelligent Visual Product Suite
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 leading-tight">
              全棧自研 · 多維智能視覺產品集群
            </h2>
          </div>
          <p className="text-text-secondary text-xs max-w-md md:text-right">
            從核心硬體到智能軟體，覆蓋具身感知與工業操作全場景。
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
            >
              <Link
                href={product.href}
                className="group relative flex flex-col h-full bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden hover:border-purple-primary/40 transition-colors"
              >
                {/* Image area */}
                <div className="relative aspect-[16/10] bg-bg-card overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {/* Purple tint overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(73,46,141,0.35) 0%, rgba(13,14,16,0.55) 100%)",
                    }}
                  />

                  {/* Number badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-3">
                    <span className="text-purple-light font-mono text-sm tracking-widest">
                      {product.number}
                    </span>
                    <span className="h-px w-10 bg-purple-light/40" />
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-bg-primary/60 border border-border-subtle text-text-primary flex items-center justify-center group-hover:bg-purple-primary group-hover:border-purple-primary group-hover:rotate-45 transition-all backdrop-blur-sm">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 md:p-7">
                  <h3 className="text-text-primary font-bold text-xl md:text-2xl leading-snug mb-1 group-hover:text-purple-light transition-colors">
                    {product.title}
                  </h3>
                  <span className="text-text-secondary text-sm mb-4">
                    {product.subtitle}
                  </span>
                  <p className="text-text-secondary/70 text-sm leading-relaxed flex-1">
                    {product.description}
                  </p>
                  <span className="text-purple-light text-sm mt-4 inline-flex items-center gap-1">
                    了解更多 <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
