"use client";

import { motion } from "framer-motion";
import type { TechSpecsTable as TechSpecsTableType } from "@/data/series";

interface TechSpecsTableProps {
  data?: TechSpecsTableType;
}

export default function TechSpecsTable({ data }: TechSpecsTableProps) {
  if (!data) return null;

  return (
    <section className="relative bg-bg-secondary py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 flex items-end gap-4 flex-wrap"
        >
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold">
            技術參數
          </h2>
          <span className="text-purple-light text-xs md:text-sm uppercase tracking-[3px] font-semibold pb-1">
            / Technical Specifications
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-xl border border-border-subtle bg-bg-primary/40 backdrop-blur-sm"
        >
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-bg-primary text-left text-text-secondary text-xs uppercase tracking-[2px] font-semibold px-5 py-4 w-[220px] md:w-[260px]"
                >
                  參數
                </th>
                {data.models.map((m) => (
                  <th
                    key={m.id}
                    scope="col"
                    className="text-purple-light text-xs md:text-sm uppercase tracking-[2px] font-bold px-5 py-4 whitespace-nowrap"
                  >
                    {m.label}
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
                    className="sticky left-0 z-10 bg-bg-secondary text-left text-text-primary font-medium px-5 py-3.5"
                  >
                    {row.label}
                  </th>
                  {row.values.map((v, j) => (
                    <td
                      key={j}
                      className="px-5 py-3.5 text-text-secondary whitespace-nowrap"
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
