"use client";

import { useState } from "react";
import PageBanner from "@/components/layout/PageBanner";
import CareerCard from "@/components/about/CareerCard";
import Pagination from "@/components/ui/Pagination";
import { careers } from "@/data/careers";

const PAGE_SIZE = 6;

export default function CareersView() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(careers.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visible = careers.slice(start, start + PAGE_SIZE);

  return (
    <>
      <PageBanner
        title="加入我们"
        subtitle="与 AIeveR 共同开启机器人智能化新时代"
      />

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="text-center mb-12">
          <span className="text-purple-light text-xs uppercase tracking-[4px] font-bold">
            Open Positions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-4">
            招聘职位
          </h2>
          <p className="text-text-secondary mt-3 max-w-lg mx-auto">
            我们正在寻找充满激情、追求卓越的你
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((career, index) => (
            <CareerCard
              key={career.id}
              career={career}
              index={index}
            />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>
    </>
  );
}
