"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, RotateCcw, Save } from "lucide-react";
import { adminAuthHeader } from "@/lib/admin-auth";
import type {
  SeriesIconKey,
  SeriesData,
  TechSpecsTable,
} from "@/data/series";
import type { SeriesManifest } from "@/lib/managed-content";
import ManagedImageInput from "@/components/admin/ManagedImageInput";

interface EditableSeriesItemProps {
  series: SeriesData;
  hasOverride: boolean;
  onSaved: (slug: string, manifest: SeriesManifest) => void;
  onDeleted: (slug: string, manifest?: SeriesManifest) => void;
}

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function modelsToText(data?: TechSpecsTable): string {
  return (data?.models ?? [])
    .map((model) => [model.id, model.label, model.thumb ?? ""].join(" | "))
    .join("\n");
}

function textToModels(value: string): TechSpecsTable["models"] {
  return linesToArray(value).map((line) => {
    const [id = "", label = "", thumb = ""] = line.split("|").map((v) => v.trim());
    return { id, label: label || id, thumb: thumb || undefined };
  });
}

function rowsToText(data?: TechSpecsTable): string {
  return (data?.rows ?? [])
    .map((row) => [row.label, ...row.values].join(" | "))
    .join("\n");
}

function textToRows(value: string): TechSpecsTable["rows"] {
  return linesToArray(value).map((line) => {
    const [label = "", ...values] = line.split("|").map((v) => v.trim());
    return { label, values };
  });
}

function advantagesToText(series: SeriesData): string {
  return (series.coreAdvantages ?? [])
    .map((item) =>
      [
        item.title,
        `icon=${item.icon}`,
        `image=${item.iconImage ?? ""}`,
        item.description,
      ].join("\n"),
    )
    .join("\n\n---\n\n");
}

function textToAdvantages(value: string): SeriesData["coreAdvantages"] {
  return value
    .split(/\n\s*---\s*\n/g)
    .map((block) => {
      const [title = "", ...rest] = block.trim().split("\n");
      const iconLine = rest.find((line) => line.startsWith("icon="));
      const imageLine = rest.find((line) => line.startsWith("image="));
      const description = rest
        .filter((line) => !line.startsWith("icon=") && !line.startsWith("image="))
        .join("\n")
        .trim();
      return {
        icon: ((iconLine?.replace(/^icon=/, "").trim() || "Activity") as SeriesIconKey),
        iconImage: imageLine?.replace(/^image=/, "").trim() || undefined,
        title: title.trim(),
        description,
      };
    })
    .filter((item) => item.title && item.description);
}

export default function EditableSeriesItem({
  series,
  hasOverride,
  onSaved,
  onDeleted,
}: EditableSeriesItemProps) {
  const [draft, setDraft] = useState({
    metaTitle: series.metaTitle,
    metaDescription: series.metaDescription,
    topLabel: series.hero.topLabel,
    title: series.hero.title,
    description: series.hero.description,
    productImageDefault: series.hero.productImageDefault,
    backgroundDefault: series.hero.backgroundDefault ?? "",
    sideCards: series.hero.sideCards.join("\n"),
    coreAdvantages: advantagesToText(series),
    techHeaderLabel: series.techSpecs?.headerLabel ?? "",
    techProductImageSrc: series.techSpecs?.productImage?.src ?? "",
    techProductImageAlt: series.techSpecs?.productImage?.alt ?? "",
    techModels: modelsToText(series.techSpecs),
    techRows: rowsToText(series.techSpecs),
  });
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setDraft({
      metaTitle: series.metaTitle,
      metaDescription: series.metaDescription,
      topLabel: series.hero.topLabel,
      title: series.hero.title,
      description: series.hero.description,
      productImageDefault: series.hero.productImageDefault,
      backgroundDefault: series.hero.backgroundDefault ?? "",
      sideCards: series.hero.sideCards.join("\n"),
      coreAdvantages: advantagesToText(series),
      techHeaderLabel: series.techSpecs?.headerLabel ?? "",
      techProductImageSrc: series.techSpecs?.productImage?.src ?? "",
      techProductImageAlt: series.techSpecs?.productImage?.alt ?? "",
      techModels: modelsToText(series.techSpecs),
      techRows: rowsToText(series.techSpecs),
    });
  }, [series]);

  const currentSnapshot = useMemo(
    () => ({
      metaTitle: series.metaTitle,
      metaDescription: series.metaDescription,
      topLabel: series.hero.topLabel,
      title: series.hero.title,
      description: series.hero.description,
      productImageDefault: series.hero.productImageDefault,
      backgroundDefault: series.hero.backgroundDefault ?? "",
      sideCards: series.hero.sideCards.join("\n"),
      coreAdvantages: advantagesToText(series),
      techHeaderLabel: series.techSpecs?.headerLabel ?? "",
      techProductImageSrc: series.techSpecs?.productImage?.src ?? "",
      techProductImageAlt: series.techSpecs?.productImage?.alt ?? "",
      techModels: modelsToText(series.techSpecs),
      techRows: rowsToText(series.techSpecs),
    }),
    [series],
  );
  const changed = JSON.stringify(draft) !== JSON.stringify(currentSnapshot);

  const updateDraft = (key: keyof typeof draft, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const techModels = textToModels(draft.techModels);
      const response = await fetch("/api/admin/series", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...adminAuthHeader(),
        },
        body: JSON.stringify({
          slug: series.slug,
          override: {
            metaTitle: draft.metaTitle,
            metaDescription: draft.metaDescription,
            hero: {
              ...series.hero,
              topLabel: draft.topLabel,
              title: draft.title,
              description: draft.description,
              productImageDefault: draft.productImageDefault,
              backgroundDefault: draft.backgroundDefault,
              sideCards: linesToArray(draft.sideCards),
            },
            coreAdvantages: textToAdvantages(draft.coreAdvantages),
            techSpecs: series.techSpecs
              ? {
                  headerLabel: draft.techHeaderLabel || undefined,
                  productImage: draft.techProductImageSrc
                    ? {
                        src: draft.techProductImageSrc,
                        alt:
                          draft.techProductImageAlt ||
                          `${series.hero.title} 技术参数产品图`,
                      }
                    : undefined,
                  models: techModels,
                  rows: textToRows(draft.techRows),
                }
              : undefined,
          },
        }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        slug?: string;
        manifest?: SeriesManifest;
        error?: string;
      };
      if (data.success) {
        onSaved(data.slug ?? series.slug, data.manifest ?? {});
        setJustSaved(true);
        window.setTimeout(() => setJustSaved(false), 1600);
      } else {
        alert(data.error ?? "保存失败");
      }
    } catch {
      alert("网络错误，请重试");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("确定恢复这个产品系列为默认内容？")) return;
    const response = await fetch("/api/admin/series", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...adminAuthHeader(),
      },
      body: JSON.stringify({ slug: series.slug }),
    });
    const data = (await response.json()) as {
      success?: boolean;
      manifest?: SeriesManifest;
      error?: string;
    };
    if (data.success) {
      onDeleted(series.slug, data.manifest);
    } else {
      alert(data.error ?? "恢复默认失败");
    }
  };

  return (
    <article className="rounded-xl border border-border-color bg-bg-card p-4 transition-colors hover:border-purple-light/50">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">
            DepthSight {series.hero.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-text-secondary">
            {series.slug}
          </p>
        </div>
        {hasOverride && (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
            已替换
          </span>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1 text-xs text-text-secondary">
          Meta 标题
          <input
            value={draft.metaTitle}
            onChange={(event) => updateDraft("metaTitle", event.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
          />
        </label>
        <label className="space-y-1 text-xs text-text-secondary">
          Hero 标题
          <input
            value={draft.title}
            onChange={(event) => updateDraft("title", event.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
          />
        </label>
      </div>

      <label className="mt-3 block space-y-1 text-xs text-text-secondary">
        Hero 说明
        <textarea
          value={draft.description}
          rows={3}
          onChange={(event) => updateDraft("description", event.target.value)}
          className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm leading-6 text-text-primary outline-none focus:border-purple-light"
        />
      </label>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <ManagedImageInput
          label="Hero 产品图"
          slotId={`series-${series.slug}-hero-product`}
          value={draft.productImageDefault}
          onChange={(value) => updateDraft("productImageDefault", value)}
        />
        <ManagedImageInput
          label="Hero 背景图"
          slotId={`series-${series.slug}-hero-bg`}
          value={draft.backgroundDefault}
          onChange={(value) => updateDraft("backgroundDefault", value)}
        />
      </div>

      <label className="mt-3 block space-y-1 text-xs text-text-secondary">
        核心优势，每块用单独一行 --- 分隔；格式：标题、icon=、image=、描述
        <textarea
          value={draft.coreAdvantages}
          rows={8}
          onChange={(event) => updateDraft("coreAdvantages", event.target.value)}
          className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm leading-6 text-text-primary outline-none focus:border-purple-light"
        />
      </label>

      {series.techSpecs && (
        <>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <ManagedImageInput
              label="技术参数区产品图"
              slotId={`series-${series.slug}-tech-product`}
              value={draft.techProductImageSrc}
              onChange={(value) => updateDraft("techProductImageSrc", value)}
            />
            <label className="space-y-1 text-xs text-text-secondary">
              技术参数产品图 alt
              <input
                value={draft.techProductImageAlt}
                onChange={(event) =>
                  updateDraft("techProductImageAlt", event.target.value)
                }
                className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
              />
            </label>
          </div>
          <label className="mt-3 block space-y-1 text-xs text-text-secondary">
            型号，每行：id | 名称 | 图片
            <textarea
              value={draft.techModels}
              rows={5}
              onChange={(event) => updateDraft("techModels", event.target.value)}
              className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 font-mono text-xs leading-5 text-text-primary outline-none focus:border-purple-light"
            />
          </label>
          <label className="mt-3 block space-y-1 text-xs text-text-secondary">
            技术参数，每行：参数名 | 值1 | 值2 | ...
            <textarea
              value={draft.techRows}
              rows={8}
              onChange={(event) => updateDraft("techRows", event.target.value)}
              className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 font-mono text-xs leading-5 text-text-primary outline-none focus:border-purple-light"
            />
          </label>
        </>
      )}

      <div className="mt-4 flex justify-end gap-2">
        {hasOverride && (
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 rounded-lg bg-bg-primary px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            <RotateCcw size={14} />
            恢复默认
          </button>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={!changed || saving}
          className="inline-flex items-center gap-1.5 rounded-lg bg-purple-primary px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-purple-primary/80 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {saving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : justSaved ? (
            <Check size={14} />
          ) : (
            <Save size={14} />
          )}
          {saving ? "保存中" : justSaved ? "已保存" : "保存"}
        </button>
      </div>
    </article>
  );
}
