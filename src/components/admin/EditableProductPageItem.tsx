"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, RotateCcw, Save } from "lucide-react";
import type {
  ProductFeature,
  ProductPageData,
  ProductSpec,
} from "@/data/productPages";
import { adminAuthHeader } from "@/lib/admin-auth";
import type { ProductPageManifest } from "@/lib/managed-content";
import ManagedImageInput from "@/components/admin/ManagedImageInput";

interface EditableProductPageItemProps {
  page: ProductPageData;
  hasOverride: boolean;
  onSaved: (slug: string, manifest: ProductPageManifest) => void;
  onDeleted: (slug: string, manifest?: ProductPageManifest) => void;
}

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function featuresToText(items: ProductFeature[]): string {
  return items
    .map((item) => `${item.title}\n${item.description}`)
    .join("\n\n---\n\n");
}

function textToFeatures(value: string): ProductFeature[] {
  return value
    .split(/\n\s*---\s*\n/g)
    .map((block) => {
      const [title = "", ...description] = block.trim().split("\n");
      return {
        title: title.trim(),
        description: description.join("\n").trim(),
      };
    })
    .filter((item) => item.title && item.description);
}

function specsToText(items: ProductSpec[]): string {
  return items.map((item) => `${item.label} | ${item.value}`).join("\n");
}

function textToSpecs(value: string): ProductSpec[] {
  return linesToArray(value)
    .map((line) => {
      const [label = "", ...valueParts] = line.split("|").map((part) => part.trim());
      return { label, value: valueParts.join(" | ") };
    })
    .filter((item) => item.label && item.value);
}

export default function EditableProductPageItem({
  page,
  hasOverride,
  onSaved,
  onDeleted,
}: EditableProductPageItemProps) {
  const [draft, setDraft] = useState({
    title: page.title,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    eyebrow: page.eyebrow,
    subtitle: page.subtitle,
    description: page.description,
    heroImage: page.heroImage,
    heroImageAlt: page.heroImageAlt,
    tags: page.tags.join("\n"),
    features: featuresToText(page.features),
    workflow: featuresToText(page.workflow),
    specs: specsToText(page.specs),
    applications: featuresToText(page.applications),
  });
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setDraft({
      title: page.title,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      eyebrow: page.eyebrow,
      subtitle: page.subtitle,
      description: page.description,
      heroImage: page.heroImage,
      heroImageAlt: page.heroImageAlt,
      tags: page.tags.join("\n"),
      features: featuresToText(page.features),
      workflow: featuresToText(page.workflow),
      specs: specsToText(page.specs),
      applications: featuresToText(page.applications),
    });
  }, [page]);

  const currentSnapshot = useMemo(
    () => ({
      title: page.title,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      eyebrow: page.eyebrow,
      subtitle: page.subtitle,
      description: page.description,
      heroImage: page.heroImage,
      heroImageAlt: page.heroImageAlt,
      tags: page.tags.join("\n"),
      features: featuresToText(page.features),
      workflow: featuresToText(page.workflow),
      specs: specsToText(page.specs),
      applications: featuresToText(page.applications),
    }),
    [page],
  );
  const changed = JSON.stringify(draft) !== JSON.stringify(currentSnapshot);

  const updateDraft = (key: keyof typeof draft, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/product-pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...adminAuthHeader(),
        },
        body: JSON.stringify({
          slug: page.slug,
          override: {
            title: draft.title,
            metaTitle: draft.metaTitle,
            metaDescription: draft.metaDescription,
            eyebrow: draft.eyebrow,
            subtitle: draft.subtitle,
            description: draft.description,
            heroImage: draft.heroImage,
            heroImageAlt: draft.heroImageAlt,
            tags: linesToArray(draft.tags),
            features: textToFeatures(draft.features),
            workflow: textToFeatures(draft.workflow),
            specs: textToSpecs(draft.specs),
            applications: textToFeatures(draft.applications),
          },
        }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        slug?: string;
        manifest?: ProductPageManifest;
        error?: string;
      };
      if (data.success) {
        onSaved(data.slug ?? page.slug, data.manifest ?? {});
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
    if (!confirm("确定恢复这个产品页为默认内容？")) return;
    const response = await fetch("/api/admin/product-pages", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...adminAuthHeader(),
      },
      body: JSON.stringify({ slug: page.slug }),
    });
    const data = (await response.json()) as {
      success?: boolean;
      manifest?: ProductPageManifest;
      error?: string;
    };
    if (data.success) {
      onDeleted(page.slug, data.manifest);
    } else {
      alert(data.error ?? "恢复默认失败");
    }
  };

  return (
    <article className="rounded-xl border border-border-color bg-bg-card p-4 transition-colors hover:border-purple-light/50">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text-primary">
            {page.title}
          </h3>
          <p className="mt-1 break-all font-mono text-[11px] text-text-secondary">
            {page.slug}
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
          页面标题
          <input
            value={draft.title}
            onChange={(event) => updateDraft("title", event.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
          />
        </label>
        <label className="space-y-1 text-xs text-text-secondary">
          Meta 标题
          <input
            value={draft.metaTitle}
            onChange={(event) => updateDraft("metaTitle", event.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
          />
        </label>
      </div>

      <label className="mt-3 block space-y-1 text-xs text-text-secondary">
        Meta 描述
        <textarea
          value={draft.metaDescription}
          rows={2}
          onChange={(event) => updateDraft("metaDescription", event.target.value)}
          className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm leading-6 text-text-primary outline-none focus:border-purple-light"
        />
      </label>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <label className="space-y-1 text-xs text-text-secondary">
          Hero 小标题
          <input
            value={draft.eyebrow}
            onChange={(event) => updateDraft("eyebrow", event.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
          />
        </label>
        <label className="space-y-1 text-xs text-text-secondary">
          Hero 副标题
          <input
            value={draft.subtitle}
            onChange={(event) => updateDraft("subtitle", event.target.value)}
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
          label="Hero 图片"
          slotId={`product-page-${page.slug}-hero`}
          value={draft.heroImage}
          onChange={(value) => updateDraft("heroImage", value)}
        />
        <label className="space-y-1 text-xs text-text-secondary">
          Hero 图片 alt
          <input
            value={draft.heroImageAlt}
            onChange={(event) => updateDraft("heroImageAlt", event.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
          />
        </label>
      </div>

      <label className="mt-3 block space-y-1 text-xs text-text-secondary">
        标签，每行一个
        <textarea
          value={draft.tags}
          rows={3}
          onChange={(event) => updateDraft("tags", event.target.value)}
          className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm leading-6 text-text-primary outline-none focus:border-purple-light"
        />
      </label>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {(
          [
            ["features", "功能/核心能力，每块用单独一行 --- 分隔；每块第一行为标题"],
            ["workflow", "流程步骤，每块用单独一行 --- 分隔；每块第一行为标题"],
            ["applications", "应用场景，每块用单独一行 --- 分隔；每块第一行为标题"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="space-y-1 text-xs text-text-secondary">
            {label}
            <textarea
              value={draft[key]}
              rows={8}
              onChange={(event) => updateDraft(key, event.target.value)}
              className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm leading-6 text-text-primary outline-none focus:border-purple-light"
            />
          </label>
        ))}
        <label className="space-y-1 text-xs text-text-secondary">
          规格参数，每行：参数名 | 参数值
          <textarea
            value={draft.specs}
            rows={8}
            onChange={(event) => updateDraft("specs", event.target.value)}
            className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 font-mono text-xs leading-5 text-text-primary outline-none focus:border-purple-light"
          />
        </label>
      </div>

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
