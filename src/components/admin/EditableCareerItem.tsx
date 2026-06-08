"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, RotateCcw, Save } from "lucide-react";
import { adminAuthHeader } from "@/lib/admin-auth";
import type {
  CareerManifest,
  CareerDetailSectionOverride,
  CareerOverride,
} from "@/lib/managed-content";
import type { CareerDetail, CareerItem } from "@/lib/types";
import ManagedImageInput from "@/components/admin/ManagedImageInput";

interface EditableCareerItemProps {
  career: CareerItem;
  detail: CareerDetail;
  hasOverride: boolean;
  allowSlugEdit?: boolean;
  isCustom?: boolean;
  onSaved: (
    slug: string,
    manifest: CareerManifest,
    override?: CareerOverride,
  ) => void;
  onDeleted: (slug: string, manifest?: CareerManifest) => void;
}

function arrayToLines(value?: string[]): string {
  return (value ?? []).join("\n");
}

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function sectionsToText(
  sections?: CareerDetailSectionOverride[],
): string {
  return (sections ?? [])
    .map((section) => `${section.title}\n${section.content}`)
    .join("\n\n---\n\n");
}

function textToSections(value: string): CareerDetailSectionOverride[] {
  return value
    .split(/\n\s*---\s*\n/g)
    .map((block) => {
      const [title = "", ...content] = block.trim().split("\n");
      return {
        title: title.trim(),
        content: content.join("\n").trim(),
      };
    })
    .filter((section) => section.title && section.content);
}

export default function EditableCareerItem({
  career,
  detail,
  hasOverride,
  allowSlugEdit = false,
  isCustom = false,
  onSaved,
  onDeleted,
}: EditableCareerItemProps) {
  const [draft, setDraft] = useState({
    slug: detail.slug,
    title: detail.title,
    location: detail.location,
    type: detail.type,
    summary: detail.summary,
    department: detail.department,
    workMode: detail.workMode,
    experience: detail.experience,
    image: career.image,
    heroImage: detail.heroImage,
    qrImage: detail.qrImage ?? "",
    applyHref: detail.applyHref,
    consultHref: detail.consultHref ?? "",
    tags: arrayToLines(career.tags),
    responsibilities: arrayToLines(detail.responsibilities),
    requirements: arrayToLines(detail.requirements),
    bonuses: arrayToLines(detail.bonuses),
    process: arrayToLines(detail.process),
    detailSections: sectionsToText(detail.detailSections),
  });
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setDraft({
      slug: detail.slug,
      title: detail.title,
      location: detail.location,
      type: detail.type,
      summary: detail.summary,
      department: detail.department,
      workMode: detail.workMode,
      experience: detail.experience,
      image: career.image,
      heroImage: detail.heroImage,
      qrImage: detail.qrImage ?? "",
      applyHref: detail.applyHref,
      consultHref: detail.consultHref ?? "",
      tags: arrayToLines(career.tags),
      responsibilities: arrayToLines(detail.responsibilities),
      requirements: arrayToLines(detail.requirements),
      bonuses: arrayToLines(detail.bonuses),
      process: arrayToLines(detail.process),
      detailSections: sectionsToText(detail.detailSections),
    });
  }, [career, detail]);

  const currentSnapshot = useMemo(
    () => ({
      slug: detail.slug,
      title: detail.title,
      location: detail.location,
      type: detail.type,
      summary: detail.summary,
      department: detail.department,
      workMode: detail.workMode,
      experience: detail.experience,
      image: career.image,
      heroImage: detail.heroImage,
      qrImage: detail.qrImage ?? "",
      applyHref: detail.applyHref,
      consultHref: detail.consultHref ?? "",
      tags: arrayToLines(career.tags),
      responsibilities: arrayToLines(detail.responsibilities),
      requirements: arrayToLines(detail.requirements),
      bonuses: arrayToLines(detail.bonuses),
      process: arrayToLines(detail.process),
      detailSections: sectionsToText(detail.detailSections),
    }),
    [career, detail],
  );

  const changed = JSON.stringify(draft) !== JSON.stringify(currentSnapshot);

  const updateDraft = (key: keyof typeof draft, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...adminAuthHeader(),
        },
        body: JSON.stringify({
          slug: draft.slug,
          title: draft.title,
          location: draft.location,
          type: draft.type,
          summary: draft.summary,
          department: draft.department,
          workMode: draft.workMode,
          experience: draft.experience,
          image: draft.image,
          heroImage: draft.heroImage,
          qrImage: draft.qrImage,
          applyHref: draft.applyHref,
          consultHref: draft.consultHref,
          tags: linesToArray(draft.tags),
          responsibilities: linesToArray(draft.responsibilities),
          requirements: linesToArray(draft.requirements),
          bonuses: linesToArray(draft.bonuses),
          process: linesToArray(draft.process),
          detailSections: textToSections(draft.detailSections),
        }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        slug?: string;
        manifest?: CareerManifest;
        override?: CareerOverride;
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
          ? "确定删除这个自定义岗位？"
          : "确定隐藏这个默认岗位？"
        : "确定恢复这个岗位为默认内容？";
    if (!confirm(label)) return;
    const response = await fetch("/api/admin/careers", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...adminAuthHeader(),
      },
      body: JSON.stringify({ slug: detail.slug, mode }),
    });
    const data = (await response.json()) as {
      success?: boolean;
      manifest?: CareerManifest;
      error?: string;
    };
    if (data.success) {
      onDeleted(detail.slug, data.manifest);
    } else {
      alert(data.error ?? "恢复默认失败");
    }
  };

  return (
    <article className="rounded-xl border border-border-color bg-bg-card p-4 transition-colors hover:border-purple-light/50">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text-primary">
            {detail.title}
          </h3>
          <p className="mt-1 break-all font-mono text-[11px] text-text-secondary">
            {detail.slug}
          </p>
        </div>
        {hasOverride && (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
            已替换
          </span>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {allowSlugEdit && (
          <label className="space-y-1 text-xs text-text-secondary md:col-span-3">
            Slug（URL 标识，只允许英文、数字和连字符）
            <input
              value={draft.slug}
              onChange={(event) => updateDraft("slug", event.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 font-mono text-sm text-text-primary outline-none focus:border-purple-light"
            />
          </label>
        )}
        {(["title", "location", "type"] as const).map((key) => (
          <label key={key} className="space-y-1 text-xs text-text-secondary">
            {key === "title" ? "岗位标题" : key === "location" ? "地点" : "类型"}
            <input
              value={draft[key]}
              onChange={(event) => updateDraft(key, event.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
            />
          </label>
        ))}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {(["department", "workMode", "experience"] as const).map((key) => (
          <label key={key} className="space-y-1 text-xs text-text-secondary">
            {key === "department"
              ? "部门"
              : key === "workMode"
                ? "工作模式"
                : "经验要求"}
            <input
              value={draft[key]}
              onChange={(event) => updateDraft(key, event.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-purple-light"
            />
          </label>
        ))}
      </div>

      <label className="mt-3 block space-y-1 text-xs text-text-secondary">
        摘要
        <textarea
          value={draft.summary}
          rows={3}
          onChange={(event) => updateDraft("summary", event.target.value)}
          className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm leading-6 text-text-primary outline-none focus:border-purple-light"
        />
      </label>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {(["image", "heroImage", "qrImage"] as const).map((key) => (
          <ManagedImageInput
            key={key}
            label={
              key === "image"
                ? "岗位列表图"
                : key === "heroImage"
                  ? "详情首屏图"
                  : "二维码图片"
            }
            slotId={`career-${draft.slug || detail.slug}-${key}`}
            value={draft[key]}
            onChange={(value) => updateDraft(key, value)}
          />
        ))}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {(["applyHref", "consultHref"] as const).map((key) => (
          <label key={key} className="space-y-1 text-xs text-text-secondary">
            {key === "applyHref" ? "申请链接" : "咨询链接"}
            <input
              value={draft[key]}
              onChange={(event) => updateDraft(key, event.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 font-mono text-xs text-text-primary outline-none focus:border-purple-light"
            />
          </label>
        ))}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {([
          ["tags", "标签，每行一个"],
          ["responsibilities", "职责，每行一个"],
          ["requirements", "要求，每行一个"],
          ["bonuses", "加分项，每行一个"],
          ["process", "流程，每行一个"],
        ] as const).map(([key, label]) => (
          <label key={key} className="space-y-1 text-xs text-text-secondary">
            {label}
            <textarea
              value={draft[key]}
              rows={4}
              onChange={(event) => updateDraft(key, event.target.value)}
              className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm leading-6 text-text-primary outline-none focus:border-purple-light"
            />
          </label>
        ))}
      </div>

      <label className="mt-3 block space-y-1 text-xs text-text-secondary">
        详情段落，段落之间用单独一行 --- 分隔；每段第一行为标题
        <textarea
          value={draft.detailSections}
          rows={8}
          onChange={(event) => updateDraft("detailSections", event.target.value)}
          className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm leading-6 text-text-primary outline-none focus:border-purple-light"
        />
      </label>

      <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
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
    </article>
  );
}
