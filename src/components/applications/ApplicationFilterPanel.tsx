"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import CaseCard from "@/components/applications/CaseCard";
import type {
  AppCaseDetail,
  ApplicationIndustry,
  ApplicationTopicSlug,
} from "@/data/applications";
import { cn } from "@/lib/utils";

export interface ApplicationOverviewCase {
  topicSlug: ApplicationTopicSlug;
  topicTitle: string;
  case: AppCaseDetail;
}

interface ApplicationFilterPanelProps {
  cases: ApplicationOverviewCase[];
  filters: readonly ApplicationIndustry[];
}

export default function ApplicationFilterPanel({
  cases,
  filters,
}: ApplicationFilterPanelProps) {
  const [panelOpen, setPanelOpen] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<ApplicationIndustry[]>(
    [],
  );

  const filteredCases = useMemo(() => {
    if (selectedFilters.length === 0) return cases;
    return cases.filter((item) =>
      item.case.industries.some((industry) =>
        selectedFilters.includes(industry),
      ),
    );
  }, [cases, selectedFilters]);

  const toggleFilter = (filter: ApplicationIndustry) => {
    setSelectedFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  };

  const resetFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <section className="relative bg-bg-secondary py-12 md:py-20">
      <DesktopSystemFilter
        filters={filters}
        selectedFilters={selectedFilters}
        panelOpen={panelOpen}
        onTogglePanel={() => setPanelOpen((open) => !open)}
        onToggleFilter={toggleFilter}
        onReset={resetFilters}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="lg:hidden mb-8">
          <MobileSystemFilter
            filters={filters}
            selectedFilters={selectedFilters}
            onToggleFilter={toggleFilter}
            onReset={resetFilters}
          />
        </div>

        <div className="mb-8 md:mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[3px] text-purple-light">
              ALL CASES
            </p>
            <h2 className="mt-3 text-2xl md:text-4xl font-black text-text-primary">
              行業應用案例總覽
            </h2>
          </div>
          <p className="text-sm text-text-secondary">
            {selectedFilters.length > 0
              ? `已篩選 ${filteredCases.length} / ${cases.length} 個案例`
              : `共 ${cases.length} 個案例`}
          </p>
        </div>

        {filteredCases.length > 0 ? (
          <div className="flex flex-col gap-8 md:gap-10">
            {filteredCases.map((item) => (
              <div
                key={`${item.topicSlug}-${item.case.slug}`}
                className="flex flex-col gap-3"
              >
                <p className="text-xs font-semibold uppercase tracking-[2px] text-text-secondary">
                  {item.topicTitle}
                </p>
                <CaseCard topicSlug={item.topicSlug} data={item.case} />
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-purple-primary/50 bg-bg-card/70 px-6 py-14 text-center shadow-[inset_0_0_40px_rgba(73,46,141,0.28)]">
            <p className="text-lg font-semibold text-text-primary">
              暫無符合此篩選條件的案例
            </p>
            <p className="mt-3 text-sm text-text-secondary">
              可重置篩選查看全部已登記案例。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

interface SystemFilterProps {
  filters: readonly ApplicationIndustry[];
  selectedFilters: ApplicationIndustry[];
  onToggleFilter: (filter: ApplicationIndustry) => void;
  onReset: () => void;
}

interface DesktopSystemFilterProps extends SystemFilterProps {
  panelOpen: boolean;
  onTogglePanel: () => void;
}

function DesktopSystemFilter({
  filters,
  selectedFilters,
  panelOpen,
  onTogglePanel,
  onToggleFilter,
  onReset,
}: DesktopSystemFilterProps) {
  return (
    <div className="hidden lg:block">
      {panelOpen ? (
        <aside className="fixed right-8 top-32 z-40 w-[420px] border border-purple-light/80 bg-[#8d8d8d]/88 px-12 py-12 text-text-primary shadow-[0_16px_36px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <button
            type="button"
            onClick={onTogglePanel}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center border border-purple-primary/55 text-purple-primary transition-colors hover:bg-purple-primary hover:text-white"
            aria-label="收起系統篩選"
          >
            <X size={17} />
          </button>

          <FilterTitle />
          <FilterChecklist
            filters={filters}
            selectedFilters={selectedFilters}
            onToggleFilter={onToggleFilter}
          />
          <ResetButton onReset={onReset} />
        </aside>
      ) : (
        <button
          type="button"
          onClick={onTogglePanel}
          className="fixed right-8 top-56 z-40 flex w-[116px] flex-col items-center gap-3 rounded-md bg-[#8d8d8d]/88 px-5 py-8 text-purple-light shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:text-text-primary"
          aria-label="展開系統篩選"
        >
          <SlidersHorizontal size={28} />
          <span className="[writing-mode:vertical-rl] text-3xl font-semibold tracking-[0.25em]">
            系統篩選
          </span>
        </button>
      )}
    </div>
  );
}

function MobileSystemFilter({
  filters,
  selectedFilters,
  onToggleFilter,
  onReset,
}: SystemFilterProps) {
  return (
    <div className="border border-purple-light/50 bg-[#8d8d8d]/70 px-5 py-6 shadow-[0_12px_28px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <FilterTitle compact />
      <FilterChecklist
        filters={filters}
        selectedFilters={selectedFilters}
        onToggleFilter={onToggleFilter}
        compact
      />
      <ResetButton onReset={onReset} compact />
    </div>
  );
}

function FilterTitle({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("text-purple-light", compact ? "mb-5" : "mb-8")}>
      <div className="flex items-center gap-3">
        <SlidersHorizontal size={compact ? 18 : 25} />
        <p
          className={cn(
            "font-semibold tracking-[0.18em]",
            compact ? "text-lg" : "text-3xl",
          )}
        >
          主 系統篩選
        </p>
      </div>
      <p className="mt-5 border-l-2 border-purple-light pl-4 text-sm font-semibold tracking-[0.18em] text-text-primary">
        行業應用
      </p>
    </div>
  );
}

function FilterChecklist({
  filters,
  selectedFilters,
  onToggleFilter,
  compact = false,
}: Pick<SystemFilterProps, "filters" | "selectedFilters" | "onToggleFilter"> & {
  compact?: boolean;
}) {
  return (
    <div className={cn(compact ? "grid grid-cols-2 gap-3" : "space-y-5")}>
      {filters.map((filter) => {
        const checked = selectedFilters.includes(filter);
        return (
          <label
            key={filter}
            className={cn(
              "flex cursor-pointer items-center gap-4 text-text-primary/75 transition-colors hover:text-text-primary",
              compact ? "text-sm" : "text-lg",
            )}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggleFilter(filter)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className={cn(
                "grid place-items-center border border-purple-primary text-white transition-colors",
                compact ? "h-5 w-5" : "h-6 w-6",
                checked ? "bg-purple-primary" : "bg-transparent",
              )}
            >
              {checked && (
                <span className="block h-2.5 w-4 rotate-[-45deg] border-b-4 border-l-4 border-white" />
              )}
            </span>
            <span>{filter}</span>
          </label>
        );
      })}
    </div>
  );
}

function ResetButton({
  onReset,
  compact = false,
}: {
  onReset: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onReset}
      className={cn(
        "w-full border border-purple-primary text-purple-light transition-colors hover:bg-purple-primary hover:text-white",
        compact ? "mt-5 px-4 py-3 text-sm" : "mt-12 px-5 py-4 text-base",
      )}
    >
      重置篩選
    </button>
  );
}
