"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  ImageIcon,
} from "lucide-react";
import { allCopySlots, siteCopySections } from "@/data/site-copy";
import { siteImageSections, allImageSlots } from "@/data/site-images";
import { COPY_MANIFEST_URL, resolveCopyValue } from "@/lib/copy";
import type { CopyManifest } from "@/lib/copy";
import { resolveImageSrc, MANIFEST_URL } from "@/lib/images";
import type { ImageManifest } from "@/lib/images";
import EditableCopy from "@/components/admin/EditableCopy";
import EditableImage from "@/components/admin/EditableImage";

export default function AdminPage() {
  const [manifest, setManifest] = useState<ImageManifest>({});
  const [copyManifest, setCopyManifest] = useState<CopyManifest>({});
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingCopy, setLoadingCopy] = useState(true);

  useEffect(() => {
    fetch(MANIFEST_URL, { cache: "no-cache" })
      .then((r) => (r.ok ? (r.json() as Promise<ImageManifest>) : {}))
      .then((data) => {
        setManifest(data);
      })
      .catch(() => undefined)
      .finally(() => setLoadingImages(false));

    fetch(COPY_MANIFEST_URL, { cache: "no-cache" })
      .then((r) => (r.ok ? (r.json() as Promise<CopyManifest>) : {}))
      .then((data) => {
        setCopyManifest(data);
      })
      .catch(() => undefined)
      .finally(() => setLoadingCopy(false));
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

  const handleCopySaved = useCallback((slotId: string, value: string) => {
    const slot = allCopySlots.find((item) => item.id === slotId);
    setCopyManifest((prev) => {
      const next = { ...prev };
      if (!slot || value === slot.defaultValue) {
        delete next[slotId];
      } else {
        next[slotId] = value;
      }
      return next;
    });
  }, []);

  const handleCopyDeleted = useCallback((slotId: string) => {
    setCopyManifest((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  }, []);

  const uploadedCount = Object.keys(manifest).length;
  const totalCount = allImageSlots.length;
  const copyOverrideCount = Object.keys(copyManifest).length;
  const copyTotalCount = allCopySlots.length;
  const loading = loadingImages || loadingCopy;

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm mb-4"
          >
            <ArrowLeft size={16} />
            返回官网
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            素材与文案管理
          </h1>
          <p className="text-text-secondary mt-2 text-sm">
            管理网站图片素材和首页文案。图片悬停上传替换，文案编辑后保存；点击&ldquo;恢复默认&rdquo;还原源码默认值。
          </p>
        </div>

        {/* Stats */}
        {!loading && (
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm">
              <ImageIcon size={16} className="text-text-secondary" />
              <span className="text-text-secondary">共 {totalCount} 张</span>
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
            <div className="flex items-center gap-2 text-sm">
              <FileText size={16} className="text-text-secondary" />
              <span className="text-text-secondary">共 {copyTotalCount} 条文案</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span className="text-emerald-400">
                {copyOverrideCount} 条已替换
              </span>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-text-secondary">
          加载中…
        </div>
      ) : (
        <div className="space-y-16">
          <section>
            <div className="mb-8 flex items-center gap-3">
              <ImageIcon size={20} className="text-purple-light" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">图片管理</h2>
                <p className="text-sm text-text-secondary">
                  用于替换官网已有图片槽位，不改变路由、布局或动效。
                </p>
              </div>
            </div>

            <div className="space-y-12">
          {siteImageSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-text-primary mb-1">
                {section.title}
              </h2>
              <div className="h-px bg-border-color mb-6" />

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
          </section>

          <section>
            <div className="mb-8 flex items-center gap-3">
              <FileText size={20} className="text-purple-light" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">首页文案管理</h2>
                <p className="text-sm text-text-secondary">
                  仅替换首页可见文字，不开放链接、布局、动画或按钮目标。
                </p>
              </div>
            </div>

            <div className="space-y-12">
              {siteCopySections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-lg font-bold text-text-primary mb-1">
                    {section.title}
                  </h2>
                  <div className="h-px bg-border-color mb-6" />

                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {section.slots.map((slot) => (
                      <EditableCopy
                        key={slot.id}
                        slotId={slot.id}
                        label={slot.label}
                        value={resolveCopyValue(slot.id, copyManifest)}
                        defaultValue={slot.defaultValue}
                        inputType={slot.inputType}
                        maxLength={slot.maxLength}
                        onSaved={handleCopySaved}
                        onDeleted={handleCopyDeleted}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 mb-8 pt-8 border-t border-border-color text-center text-text-secondary text-xs">
        AIeveR Robotics 素材管理系统 · 仅限内部使用
      </div>
    </div>
  );
}
