"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSiteCopy, useSiteImage } from "@/components/SiteImageProvider";
import { products, type ProductItem } from "@/data/products";
import { type Locale, toLocalizedPath } from "@/lib/i18n";

interface ProductShowcaseProps {
  locale: Locale;
}

export default function ProductShowcase({ locale }: ProductShowcaseProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const eyebrow = useSiteCopy(
    "home-products-eyebrow",
    "Full-Stack Independent R&D · Multi-Dimensional Intelligent Visual Product Suite",
  );
  const title = useSiteCopy(
    "home-products-title",
    "全棧自研 · 多維智能視覺產品集群",
  );
  const description = useSiteCopy(
    "home-products-description",
    "從核心硬體到智能軟體，覆蓋具身感知與工業操作全場景。",
  );

  return (
    <section ref={ref} id="products" className="relative bg-bg-primary py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="min-w-0">
            <span className="text-purple-light text-xs uppercase tracking-[4px] font-bold">
              {eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(2rem,3vw,3rem)] font-bold leading-[1.12] text-text-primary lg:whitespace-nowrap">
              {title}
            </h2>
          </div>
          <p className="text-text-secondary text-xs max-w-md md:text-right">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
            >
              <ProductCard product={product} locale={locale} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  locale,
}: {
  product: ProductItem;
  locale: Locale;
}) {
  const image = useSiteImage(product.image);
  const href = toLocalizedPath(locale, product.href) ?? product.href;
  const title = useSiteCopy(
    `home-products-card-${product.number}-title`,
    product.title,
  );
  const subtitle = useSiteCopy(
    `home-products-card-${product.number}-subtitle`,
    product.subtitle,
  );
  const description = useSiteCopy(
    `home-products-card-${product.number}-description`,
    product.description,
  );
  const learnMore = useSiteCopy("home-products-learn-more", "了解更多");

  return (
    <Link
      href={href}
      className="group relative flex min-h-[500px] flex-col overflow-hidden rounded-[32px] border border-border-subtle bg-[#111117] shadow-[0_32px_80px_rgba(0,0,0,0.3)] transition-colors hover:border-purple-primary/50 md:min-h-[575px]"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(141,119,207,0.25), transparent 44%), linear-gradient(180deg, rgba(73,46,141,0.1), rgba(13,14,16,0.9))",
        }}
      />
      <div className="relative flex h-[330px] items-center justify-center overflow-hidden px-8 pt-10 md:h-[350px]">
        <Image
          src={image}
          alt={title}
          width={520}
          height={420}
          sizes="(max-width: 768px) 90vw, 30vw"
          className="max-h-[280px] w-auto object-contain drop-shadow-[0_24px_42px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-end p-8">
        <div className="absolute right-8 top-8 flex size-10 items-center justify-center rounded-full border border-border-subtle bg-bg-primary/45 text-text-primary backdrop-blur transition-all group-hover:rotate-45 group-hover:border-purple-primary group-hover:bg-purple-primary">
          <ArrowUpRight size={16} />
        </div>
        <span className="mb-4 font-mono text-sm tracking-[4px] text-purple-light">
          {product.number}
        </span>
        <h3 className="text-2xl font-bold leading-tight text-text-primary transition-colors group-hover:text-purple-light">
          {title}
        </h3>
        <span className="mt-2 text-xl font-semibold text-text-primary">
          {subtitle}
        </span>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
        <span className="mt-8 inline-flex w-max items-center gap-2 border-b border-purple-primary pb-1 text-xs uppercase tracking-[1.2px] text-purple-light">
          {learnMore} <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
