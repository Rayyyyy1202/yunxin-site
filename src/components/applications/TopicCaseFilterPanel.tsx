"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import CaseCard from "@/components/applications/CaseCard";
import CasePagination from "@/components/applications/CasePagination";
import SiteImg from "@/components/ui/SiteImg";
import type {
  AppCaseDetail,
  AppTopic,
  ApplicationIndustry,
  ApplicationTopicSlug,
} from "@/data/applications";
import { cn } from "@/lib/utils";

interface TopicCaseFilterPanelProps {
  topicSlug: ApplicationTopicSlug;
  cases: AppCaseDetail[];
  filters: readonly ApplicationIndustry[];
  caseListVariant?: AppTopic["caseListVariant"];
}

export default function TopicCaseFilterPanel({
  topicSlug,
  cases,
  filters,
  caseListVariant = "default",
}: TopicCaseFilterPanelProps) {
  const [selectedFilters, setSelectedFilters] = useState<ApplicationIndustry[]>(
    [],
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredCases = useMemo(() => {
    if (selectedFilters.length === 0) return cases;

    return cases.filter(
      (item) =>
        item.industries.length > 0 &&
        item.industries.some((industry) => selectedFilters.includes(industry)),
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
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-6 md:px-10 xl:grid-cols-[84px_minmax(0,1280px)] xl:gap-6">
      <DesktopFloatingFilter
        filters={filters}
        selectedFilters={selectedFilters}
        onToggleFilter={toggleFilter}
        onReset={resetFilters}
      />

      <div className="min-w-0">
        <div className="xl:hidden mb-8">
          <MobileTopicFilter
            filters={filters}
            selectedFilters={selectedFilters}
            open={mobileOpen}
            onToggleOpen={() => setMobileOpen((open) => !open)}
            onToggleFilter={toggleFilter}
            onReset={resetFilters}
          />
        </div>

        {filteredCases.length > 0 ? (
          <div className="flex flex-col gap-8 md:gap-10">
            {filteredCases.map((item) =>
              caseListVariant === "frame-244-workstation" ? (
                <Frame244WorkstationCard key={item.slug} data={item} />
              ) : (
                <CaseCard key={item.slug} topicSlug={topicSlug} data={item} />
              ),
            )}
          </div>
        ) : (
          <EmptyFilterState onReset={resetFilters} />
        )}

        <CasePagination activeTopicSlug={topicSlug} />
      </div>
    </div>
  );
}

function Frame244WorkstationCard({ data }: { data: AppCaseDetail }) {
  return (
    <article className="relative min-h-[316px] overflow-hidden rounded-[15px] border border-purple-primary/90 bg-[#0a0b1a] shadow-[inset_0_0_34px_rgba(73,46,141,0.16)]">
      <div className="grid grid-cols-1 gap-6 p-5 md:p-8 lg:grid-cols-[459px_minmax(0,1fr)] lg:items-center lg:gap-10 lg:p-10">
        <figure className="relative aspect-[459/236] overflow-hidden rounded-[15px] border border-purple-primary/90 bg-bg-primary/45">
          <SiteImg
            src={data.cardImage}
            alt={data.title}
            className="h-full w-full object-cover"
          />
        </figure>

        <div className="flex flex-col items-start justify-center">
          <h3 className="text-2xl font-black leading-tight tracking-[1.4px] text-text-primary md:text-[32px] md:leading-[1.5]">
            {data.title}
          </h3>
          <p className="mt-4 max-w-[640px] text-sm font-medium leading-relaxed tracking-[1.2px] text-text-primary/80 md:text-lg md:leading-[1.5]">
            {data.cardDescription}
          </p>

          <span
            aria-disabled
            className="mt-5 inline-flex h-[49px] w-[127px] cursor-not-allowed items-center justify-center rounded-[8px] bg-purple-primary/25 text-sm font-medium tracking-[1.6px] text-text-primary"
          >
            查看詳情
          </span>
        </div>
      </div>
    </article>
  );
}

interface FilterControlsProps {
  filters: readonly ApplicationIndustry[];
  selectedFilters: ApplicationIndustry[];
  onToggleFilter: (filter: ApplicationIndustry) => void;
  onReset: () => void;
}

function DesktopFloatingFilter({
  filters,
  selectedFilters,
  onToggleFilter,
  onReset,
}: FilterControlsProps) {
  return (
    <aside className="relative hidden xl:block">
      <div className="group/filter sticky top-28 z-30 h-[220px] w-[72px]">
        <button
          type="button"
          className="flex h-[220px] w-[72px] flex-col items-center justify-center gap-4 rounded-md bg-[#8d8d8d]/90 text-purple-light shadow-[0_14px_30px_rgba(0,0,0,0.32)] backdrop-blur-md transition-opacity duration-200 group-hover/filter:opacity-0 group-focus-within/filter:opacity-0"
          aria-label="展開系統篩選"
        >
          <SlidersHorizontal size={22} strokeWidth={2.1} />
          <span className="[writing-mode:vertical-rl] text-[22px] font-semibold tracking-[0.22em]">
            系統篩選
          </span>
        </button>

        <div className="pointer-events-none absolute left-0 top-0 w-[336px] border border-purple-light/75 bg-[#8d8d8d]/90 px-8 py-8 text-text-primary opacity-0 shadow-[0_14px_30px_rgba(0,0,0,0.32)] backdrop-blur-md transition-opacity duration-200 group-hover/filter:pointer-events-auto group-hover/filter:opacity-100 group-focus-within/filter:pointer-events-auto group-focus-within/filter:opacity-100">
          <FilterTitle />
          <FilterChecklist
            filters={filters}
            selectedFilters={selectedFilters}
            onToggleFilter={onToggleFilter}
          />
          <ResetButton onReset={onReset} />
        </div>
      </div>
    </aside>
  );
}

interface MobileTopicFilterProps extends FilterControlsProps {
  open: boolean;
  onToggleOpen: () => void;
}

function MobileTopicFilter({
  filters,
  selectedFilters,
  open,
  onToggleOpen,
  onToggleFilter,
  onReset,
}: MobileTopicFilterProps) {
  return (
    <div className="border border-purple-light/50 bg-[#8d8d8d]/75 shadow-[0_12px_28px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <button
        type="button"
        onClick={onToggleOpen}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-purple-light"
      >
        <span className="inline-flex items-center gap-3 text-base font-semibold tracking-[0.16em]">
          <SlidersHorizontal size={18} />
          系統篩選
        </span>
        <span className="text-xs text-text-primary/70">
          {selectedFilters.length > 0
            ? `已選 ${selectedFilters.length}`
            : "全部案例"}
        </span>
      </button>

      {open && (
        <div className="border-t border-purple-light/30 px-5 pb-5 pt-4">
          <FilterTitle compact />
          <FilterChecklist
            filters={filters}
            selectedFilters={selectedFilters}
            onToggleFilter={onToggleFilter}
            compact
          />
          <ResetButton onReset={onReset} compact />
        </div>
      )}
    </div>
  );
}

function FilterTitle({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("text-purple-light", compact ? "mb-4" : "mb-8")}>
      <div className="flex items-center gap-3">
        <SlidersHorizontal size={compact ? 18 : 21} strokeWidth={2.1} />
        <p
          className={cn(
            "font-semibold tracking-[0.18em]",
            compact ? "text-base" : "text-2xl",
          )}
        >
          主 系統篩選
        </p>
      </div>
      <p className="mt-4 border-l-2 border-purple-light pl-4 text-sm font-semibold tracking-[0.18em] text-text-primary">
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
}: Pick<FilterControlsProps, "filters" | "selectedFilters" | "onToggleFilter"> & {
  compact?: boolean;
}) {
  return (
    <div className={cn(compact ? "grid grid-cols-2 gap-3" : "space-y-4")}>
      {filters.map((filter) => {
        const checked = selectedFilters.includes(filter);

        return (
          <label
            key={filter}
            className={cn(
              "flex cursor-pointer items-center gap-4 text-text-primary/75 transition-colors hover:text-text-primary",
              compact ? "text-sm" : "text-base",
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
                compact ? "h-5 w-5" : "h-5 w-5",
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
        compact ? "mt-5 px-4 py-3 text-sm" : "mt-8 px-5 py-3 text-sm",
      )}
    >
      重置篩選
    </button>
  );
}

function EmptyFilterState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border border-purple-primary/50 bg-bg-card/70 px-6 py-14 text-center shadow-[inset_0_0_40px_rgba(73,46,141,0.28)]">
      <p className="text-lg font-semibold text-text-primary">
        暫無符合目前篩選條件的案例
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        可以重置篩選，查看當前應用方向的全部案例。
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center justify-center rounded-[3px] bg-purple-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-primary/80"
      >
        重置篩選
      </button>
    </div>
  );
}
