"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, RotateCcw, Save } from "lucide-react";
import { adminAuthHeader } from "@/lib/admin-auth";
import type { NewsManifest, NewsOverride } from "@/lib/managed-content";
import type { NewsItem } from "@/lib/types";
import ManagedImageInput from "@/components/admin/ManagedImageInput";

interface EditableNewsItemProps {
  item: NewsItem;
  hasOverride: boolean;
  allowSlugEdit?: boolean;
  isCustom?: boolean;
  onSaved: (
    slug: string,
    manifest: NewsManifest,
    override?: NewsOverride | NewsItem,
  ) => void;
  onDeleted: (slug: string, manifest?: NewsManifest) => void;
}

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function EditableNewsItem({
  item,
  hasOverride,
  allowSlugEdit = false,
  isCustom = false,
  onSaved,
  onDeleted,
}: EditableNewsItemProps) {
  const [draft, setDraft] = useState({
    slug: item.slug,
    title: item.title,
    date: item.date,
    category: item.category,
    summary: item.summary,
    coverImage: item.coverImage,
    galleryImages: (item.galleryImages ?? []).join("\n"),
    content: item.content,
  });
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setDraft({
      slug: item.slug,
      title: item.title,
      date: item.date,
      category: item.category,
      summary: item.summary,
      coverImage: item.coverImage,
      galleryImages: (item.galleryImages ?? []).join("\n"),
      content: item.content,
    });
  }, [item]);

  const changed = useMemo(
    () =>
      draft.title !== item.title ||
      draft.slug !== item.slug ||
      draft.date !== item.date ||
      draft.category !== item.category ||
      draft.summary !== item.summary ||
      draft.coverImage !== item.coverImage ||
      draft.galleryImages !== (item.galleryImages ?? []).join("\n") ||
      draft.content !== item.content,
    [draft, item],
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...adminAuthHeader(),
        },
        body: JSON.stringify({
          ...draft,
          galleryImages: linesToArray(draft.galleryImages),
        }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        slug?: string;
        manifest?: NewsManifest;
        override?: NewsOverride;
        error?: string;
      };
      if (data.success) {
        onSaved(data.slug ?? draft.slug, data.manifest ?? {}, data.override);
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 1600);
      } else {
        alert(data.error ?? "保存失败");
      }
    } catch {
      alert("网络错误，请重试");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (mode: "restore" | "hide") => {
    const label =
      mode === "hide"
        ? isCustom
          ? "确定删除这条自定义新闻？"
          : "确定隐藏这条默认新闻？"
        : "确定恢复这条新闻为默认内容？";
    if (!confirm(label)) return;
    const response = await fetch("/api/admin/news", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...adminAuthHeader(),
      },
      body: JSON.stringify({ slug: item.slug, mode }),
    });
    const data = (await response.json()) as {
      success?: boolean;
      manifest?: NewsManifest;
      error?: string;
    };
    if (data.success) {
      onDeleted(item.slug, data.manifest);
    } else {
      alert(data.error ?? "恢复默认失败");
    }
  };

  return (
    <article className="rounded-xl border border-border-color bg-bg-card p-4 transition-colors hover:border-purple-light/50">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text-primary">
            {item.title}
          </h3>
          <p className="mt-1 break-all font-mono text-[11px] text-text-secondary">
            {item.slug}
          </p>
        </div>
        {hasOverride && (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
            已替换
          </span>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {allowSlugEdit && (
          <label className="space-y-1 text-xs text-text-secondary md:col-span-2">
            Slug（URL 标识，只允许英文、数字和连字符）
            <input
              value={draft.slug}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, slug: event.target.value }))
              }
              className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 font-mono text-sm text-text-primary outline-none focus:border-purple-light"
            />
          </label>
        )}
        <label className="space-y-1 text-xs text-text-secondary">
          标题
          <input
            value={draft.title}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, title: event.target.value }))
            }
            className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
          />
        </label>
        <label className="space-y-1 text-xs text-text-secondary">
          日期
          <input
            value={draft.date}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, date: event.target.value }))
            }
            className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
          />
        </label>
        <label className="space-y-1 text-xs text-text-secondary">
          分类
          <input
            value={draft.category}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, category: event.target.value }))
            }
            className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
          />
        </label>
        <ManagedImageInput
          label="封面图片"
          slotId={`news-cover-${draft.slug || item.slug}`}
          value={draft.coverImage}
          onChange={(value) =>
            setDraft((prev) => ({ ...prev, coverImage: value }))
          }
        />
      </div>

      <label className="mt-3 block space-y-1 text-xs text-text-secondary">
        摘要
        <textarea
          value={draft.summary}
          rows={3}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, summary: event.target.value }))
          }
          className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm leading-6 text-text-primary outline-none focus:border-purple-light"
        />
      </label>

      <label className="mt-3 block space-y-1 text-xs text-text-secondary">
        图集图片路径，每行一个
        <textarea
          value={draft.galleryImages}
          rows={3}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, galleryImages: event.target.value }))
          }
          className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 font-mono text-xs leading-5 text-text-primary outline-none focus:border-purple-light"
        />
      </label>

      <label className="mt-3 block space-y-1 text-xs text-text-secondary">
        正文
        <textarea
          value={draft.content}
          rows={8}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, content: event.target.value }))
          }
          className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm leading-6 text-text-primary outline-none focus:border-purple-light"
        />
      </label>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[11px] text-text-secondary">
          首页取前 3 条新闻展示
        </span>
        <div className="flex gap-2">
          {hasOverride && !isCustom && (
            <button
              type="button"
              onClick={() => handleDelete("restore")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-bg-primary px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              <RotateCcw size={14} />
              恢复默认
            </button>
          )}
          <button
            type="button"
            onClick={() => handleDelete("hide")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600/15 px-3 py-2 text-xs font-medium text-red-300 transition-colors hover:bg-red-600/25 hover:text-red-200"
          >
            {isCustom ? "删除" : "隐藏"}
          </button>
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
      </div>
    </article>
  );
}
