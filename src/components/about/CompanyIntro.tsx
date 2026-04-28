"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SiteImg from "@/components/ui/SiteImg";

interface CompanyIntroProps {
  title: string;
  subtitle?: string;
  body: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

export default function CompanyIntro({
  title,
  subtitle,
  body,
  image,
  imageAlt,
  reverse,
}: CompanyIntroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-10 md:gap-16 items-center`}
    >
      <motion.div
        className="w-full md:w-1/2 aspect-[4/3] relative overflow-hidden rounded-xl bg-bg-card border border-border-subtle"
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        {/* Placeholder gradient since actual images aren't provided */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(73,46,141,0.3) 0%, rgba(13,14,16,0.8) 50%, rgba(141,119,207,0.2) 100%)",
          }}
        />
        <SiteImg
          src={image}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-50"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 border border-purple-primary/20 rounded-xl pointer-events-none" />
      </motion.div>

      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {subtitle && (
          <span className="text-purple-light text-xs uppercase tracking-[4px] font-bold">
            {subtitle}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-6">
          {title}
        </h2>
        <div className="space-y-4">
          {body.map((p, i) => (
            <p key={i} className="text-text-secondary leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
