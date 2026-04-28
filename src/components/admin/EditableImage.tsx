"use client";

import { useRef, useState } from "react";
import { Upload, Trash2, Check, Loader2, ImageIcon } from "lucide-react";
import { adminAuthHeader } from "@/lib/admin-auth";

interface EditableImageProps {
  slotId: string;
  label: string;
  /** Current resolved src (uploaded or default). */
  currentSrc: string;
  /** The original default path (for "has upload" detection). */
  defaultSrc: string;
  aspect: string;
  onUploaded: (slotId: string, url: string) => void;
  onDeleted: (slotId: string) => void;
}

export default function EditableImage({
  slotId,
  label,
  currentSrc,
  defaultSrc,
  aspect,
  onUploaded,
  onDeleted,
}: EditableImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [justUploaded, setJustUploaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasUpload = currentSrc !== defaultSrc;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append("slotId", slotId);
      form.append("file", file);

      const res = await fetch("/api/admin", {
        method: "POST",
        headers: adminAuthHeader(),
        body: form,
      });

      const data = (await res.json()) as { success?: boolean; url?: string; error?: string };
      if (data.success && data.url) {
        onUploaded(slotId, data.url);
        setImgError(false);
        setJustUploaded(true);
        setTimeout(() => setJustUploaded(false), 2000);
      } else {
        alert(data.error ?? "上传失败");
      }
    } catch {
      alert("网络错误，请重试");
    } finally {
      setUploading(false);
      // Reset input so re-uploading the same file triggers onChange
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!confirm("确定恢复为默认图片？")) return;

    try {
      const res = await fetch("/api/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...adminAuthHeader() },
        body: JSON.stringify({ slotId }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (data.success) {
        onDeleted(slotId);
        setImgError(false);
      }
    } catch {
      alert("操作失败");
    }
  };

  return (
    <div className="group relative flex flex-col rounded-xl border border-border-color bg-bg-card overflow-hidden transition-colors hover:border-purple-light/50">
      {/* Image preview */}
      <div className="relative bg-bg-primary overflow-hidden" style={{ aspectRatio: aspect }}>
        {!imgError && currentSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentSrc}
            alt={label}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-secondary">
            <ImageIcon size={32} strokeWidth={1.5} />
            <span className="text-xs">暂无图片</span>
          </div>
        )}

        {/* Hover overlay with upload button */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-purple-primary text-white text-sm font-medium hover:bg-purple-primary/80 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : justUploaded ? (
              <Check size={16} />
            ) : (
              <Upload size={16} />
            )}
            {uploading ? "上传中…" : justUploaded ? "已上传" : "上传图片"}
          </button>

          {hasUpload && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600/80 text-white text-sm font-medium hover:bg-red-600 transition-colors"
            >
              <Trash2 size={16} />
              恢复默认
            </button>
          )}
        </div>
      </div>

      {/* Label bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-text-primary text-sm font-medium truncate">{label}</p>
          <p className="text-text-secondary text-[11px] font-mono mt-0.5">{slotId}</p>
        </div>
        {hasUpload && (
          <span className="shrink-0 ml-3 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-medium uppercase tracking-wider">
            已替换
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
