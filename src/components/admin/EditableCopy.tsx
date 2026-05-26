"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, RotateCcw, Save } from "lucide-react";
import { adminAuthHeader } from "@/lib/admin-auth";

interface EditableCopyProps {
  slotId: string;
  label: string;
  value: string;
  defaultValue: string;
  inputType?: "text" | "textarea";
  maxLength?: number;
  onSaved: (slotId: string, value: string) => void;
  onDeleted: (slotId: string) => void;
}

export default function EditableCopy({
  slotId,
  label,
  value,
  defaultValue,
  inputType = "text",
  maxLength,
  onSaved,
  onDeleted,
}: EditableCopyProps) {
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const hasOverride = value !== defaultValue;
  const changed = draft !== value;

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...adminAuthHeader(),
        },
        body: JSON.stringify({ slotId, value: draft }),
      });
      const data = (await res.json()) as {
        success?: boolean;
        value?: string;
        error?: string;
      };
      if (data.success && typeof data.value === "string") {
        onSaved(slotId, data.value);
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

  const handleDelete = async () => {
    if (!confirm("确定恢复为默认文案？")) return;

    try {
      const res = await fetch("/api/admin/copy", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...adminAuthHeader(),
        },
        body: JSON.stringify({ slotId }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (data.success) {
        onDeleted(slotId);
      } else {
        alert(data.error ?? "恢复默认失败");
      }
    } catch {
      alert("操作失败");
    }
  };

  return (
    <div className="rounded-xl border border-border-color bg-bg-card p-4 transition-colors hover:border-purple-light/50">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="mt-0.5 break-all font-mono text-[11px] text-text-secondary">
            {slotId}
          </p>
        </div>
        {hasOverride && (
          <span className="shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
            已替换
          </span>
        )}
      </div>

      {inputType === "textarea" ? (
        <textarea
          value={draft}
          maxLength={maxLength}
          onChange={(event) => setDraft(event.target.value)}
          rows={5}
          className="w-full resize-y rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm leading-6 text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-purple-light"
        />
      ) : (
        <input
          value={draft}
          maxLength={maxLength}
          onChange={(event) => setDraft(event.target.value)}
          className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-purple-light"
        />
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[11px] text-text-secondary">
          {maxLength ? `${draft.length} / ${maxLength}` : `${draft.length} 字`}
        </span>
        <div className="flex gap-2">
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
      </div>
    </div>
  );
}
