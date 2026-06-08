"use client";

import { motion } from "framer-motion";
import SiteImg from "@/components/ui/SiteImg";
import type { TechSpecsTable as TechSpecsTableType } from "@/data/series";

interface TechSpecsTableProps {
  data?: TechSpecsTableType;
}

export default function TechSpecsTable({ data }: TechSpecsTableProps) {
  if (!data) return null;

  const hasModelThumbs = data.models.some((model) => Boolean(model.thumb));
  const isSingleTextModelTable = data.models.length === 1 && !hasModelThumbs;
  const tableWidthClass = isSingleTextModelTable
    ? "min-w-[640px] md:min-w-0"
    : "min-w-[900px] md:min-w-[1080px]";
  const headingSpacingClass = data.productImage ? "mb-0" : "mb-12 md:mb-16";

  return (
    <section className="relative bg-bg-secondary py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className={`${headingSpacingClass} flex items-end gap-4 flex-wrap`}
        >
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold">
            技術參數
          </h2>
          <span className="text-purple-light text-xs md:text-sm uppercase tracking-[3px] font-semibold pb-1">
            / Technical Specifications
          </span>
        </motion.div>

        {data.productImage ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative h-[132px] md:h-[167px]"
          >
            <SiteImg
              src={data.productImage.src}
              alt={data.productImage.alt}
              className="series-tech-spec-thumb absolute left-1/2 top-6 h-[110px] w-[110px] max-w-none -translate-x-1/2 object-contain md:left-[62%] md:top-[55px] md:h-[150px] md:w-[150px]"
              loading="lazy"
            />
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-xl border border-border-subtle bg-bg-primary/40 backdrop-blur-sm"
        >
          <table className={`w-full text-sm ${tableWidthClass}`}>
            <thead>
              <tr className="border-b border-border-subtle">
                <th
                  scope="col"
                  className="sticky left-0 z-20 w-[180px] bg-bg-primary px-5 py-4 text-left text-xs font-semibold uppercase tracking-[2px] text-text-secondary md:w-[220px]"
                >
                  {data.headerLabel ?? (hasModelThumbs ? "型號" : "參數")}
                </th>
                {data.models.map((m) => (
                  <th
                    key={m.id}
                    scope="col"
                    className={`min-w-[144px] px-4 text-center align-bottom text-xs font-bold uppercase tracking-[2px] text-purple-light md:min-w-[170px] md:px-5 md:text-sm ${
                      isSingleTextModelTable ? "py-6 md:py-6" : "py-5 md:py-6"
                    }`}
                  >
                    <div
                      className={
                        hasModelThumbs
                          ? "flex min-h-[120px] flex-col items-center justify-end gap-3 md:min-h-[150px]"
                          : ""
                      }
                    >
                      {m.thumb ? (
                        <SiteImg
                          src={m.thumb}
                          alt={`${m.label} 產品圖`}
                          className="series-tech-spec-thumb h-[84px] w-[112px] max-w-none object-contain md:h-[120px] md:w-[150px]"
                          loading="lazy"
                        />
                      ) : hasModelThumbs ? (
                        <span className="block h-[84px] w-[112px] md:h-[120px] md:w-[150px]" />
                      ) : null}
                      <span className="whitespace-nowrap">{m.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, i) => (
                <tr
                  key={`${row.label}-${i}`}
                  className="border-b border-border-subtle/60 last:border-0 hover:bg-purple-primary/5 transition-colors"
                >
                  <th
                    scope="row"
                    className={`sticky left-0 z-10 bg-bg-secondary px-5 text-left font-medium text-text-primary ${
                      isSingleTextModelTable ? "py-6" : "py-3.5"
                    }`}
                  >
                    {row.label}
                  </th>
                  {row.values.map((v, j) => (
                    <td
                      key={j}
                      className={`px-5 text-text-secondary whitespace-nowrap ${
                        isSingleTextModelTable ? "py-6 text-center" : "py-3.5"
                      }`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
