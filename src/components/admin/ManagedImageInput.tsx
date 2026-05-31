"use client";

import { useRef, useState } from "react";
import { Check, ImageIcon, Loader2, Upload } from "lucide-react";
import { adminAuthHeader } from "@/lib/admin-auth";

interface ManagedImageInputProps {
  label: string;
  slotId: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ManagedImageInput({
  label,
  slotId,
  value,
  onChange,
}: ManagedImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [justUploaded, setJustUploaded] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("slotId", slotId);
      form.append("file", file);
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: adminAuthHeader(),
        body: form,
      });
      const data = (await response.json()) as {
        success?: boolean;
        url?: string;
        error?: string;
      };
      if (!data.success || !data.url) {
        alert(data.error ?? "上传失败");
        return;
      }
      onChange(data.url);
      setJustUploaded(true);
      window.setTimeout(() => setJustUploaded(false), 1600);
    } catch {
      alert("网络错误，请重试");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <label className="space-y-1 text-xs text-text-secondary">
      {label}
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 font-mono text-xs text-text-primary outline-none focus:border-purple-light"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-bg-primary px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : justUploaded ? (
            <Check size={14} />
          ) : value ? (
            <ImageIcon size={14} />
          ) : (
            <Upload size={14} />
          )}
          上传
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
}
