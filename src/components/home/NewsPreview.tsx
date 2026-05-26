"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useSiteCopy } from "@/components/SiteImageProvider";
import { news } from "@/data/news";

export default function NewsPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const items = news.slice(0, 3);
  const title = useSiteCopy("home-news-title", "新聞動態");

  return (
    <div ref={ref} id="news" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.h2
          className="mb-12 text-center text-3xl font-semibold text-text-primary md:mb-16 md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="overflow-x-auto pb-2 md:overflow-visible"
        >
          <div className="grid min-w-[900px] grid-cols-3 border-l border-border-color md:min-w-0">
            {items.map((item, index) => (
              <Link
                key={item.slug}
                href={`/about/news/${item.slug}`}
                className="group relative min-h-[228px] border-r border-border-color px-10 py-10 transition-colors hover:bg-bg-secondary/40"
              >
                <span
                  className={`absolute -left-[5px] top-1/2 size-2.5 -translate-y-1/2 rounded-full ${
                    index === 0 ? "bg-purple-primary" : "bg-border-color"
                  }`}
                />
                <time
                  dateTime={item.date}
                  className="font-mono text-sm font-bold tracking-[2.8px] text-purple-light"
                >
                  {item.date.replace(/-/g, ".")}
                </time>
                <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-7 text-text-primary transition-colors group-hover:text-purple-light">
                  {item.title}
                </h3>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-text-secondary">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
