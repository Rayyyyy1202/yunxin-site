"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { siteImageSections, allImageSlots } from "@/data/site-images";
import { resolveImageSrc, MANIFEST_URL } from "@/lib/images";
import type { ImageManifest } from "@/lib/images";
import EditableImage from "@/components/admin/EditableImage";

export default function AdminPage() {
  const [manifest, setManifest] = useState<ImageManifest>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${MANIFEST_URL}?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data: ImageManifest) => {
        setManifest(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleUploaded = useCallback((slotId: string, url: string) => {
    setManifest((prev) => ({ ...prev, [slotId]: url }));
  }, []);

  const handleDeleted = useCallback((slotId: string) => {
    setManifest((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  }, []);

  const uploadedCount = Object.keys(manifest).length;
  const totalCount = allImageSlots.length;

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#ababad] hover:text-[#fdfbfe] transition-colors text-sm mb-4"
          >
            <ArrowLeft size={16} />
            返回官网
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            素材管理
          </h1>
          <p className="text-[#ababad] mt-2 text-sm">
            管理网站所有图片素材。悬停图片卡片上传替换，点击"恢复默认"还原。
          </p>
        </div>

        {/* Stats */}
        {!loading && (
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-sm">
              <ImageIcon size={16} className="text-[#ababad]" />
              <span className="text-[#ababad]">共 {totalCount} 张</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span className="text-emerald-400">{uploadedCount} 已替换</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle size={16} className="text-amber-400" />
              <span className="text-amber-400">
                {totalCount - uploadedCount} 待上传
              </span>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-[#ababad]">
          加载中…
        </div>
      ) : (
        <div className="space-y-12">
          {siteImageSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-[#fdfbfe] mb-1">
                {section.title}
              </h2>
              <div className="h-px bg-[#47484a] mb-6" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {section.slots.map((slot) => (
                  <EditableImage
                    key={slot.id}
                    slotId={slot.id}
                    label={slot.label}
                    currentSrc={resolveImageSrc(slot.id, manifest)}
                    defaultSrc={slot.defaultSrc}
                    aspect={slot.aspect}
                    onUploaded={handleUploaded}
                    onDeleted={handleDeleted}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 mb-8 pt-8 border-t border-[#47484a] text-center text-[#ababad] text-xs">
        AIeveR Robotics 素材管理系统 · 仅限内部使用
      </div>
    </div>
  );
}
