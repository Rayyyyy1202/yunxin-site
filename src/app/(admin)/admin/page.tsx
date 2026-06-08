"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Boxes,
  Building2,
  CheckCircle2,
  FileText,
  Home,
  ImageIcon,
  Newspaper,
  Plus,
  UserRound,
} from "lucide-react";
import { careerDetails, careers } from "@/data/careers";
import { news } from "@/data/news";
import { productPages } from "@/data/productPages";
import { seriesList } from "@/data/series";
import { allCopySlots, siteCopySections } from "@/data/site-copy";
import { siteImageSections, allImageSlots } from "@/data/site-images";
import { COPY_MANIFEST_URL, resolveCopyValue } from "@/lib/copy";
import type { CopyManifest } from "@/lib/copy";
import { resolveImageSrc, MANIFEST_URL } from "@/lib/images";
import type { ImageManifest } from "@/lib/images";
import {
  applyCareerDetailManifest,
  applyCareerItemManifest,
  applyNewsManifest,
  applyProductPageManifest,
  applySeriesManifest,
  CAREERS_MANIFEST_URL,
  NEWS_MANIFEST_URL,
  PRODUCT_PAGES_MANIFEST_URL,
  SERIES_MANIFEST_URL,
  normalizeCareerManifest,
  normalizeNewsManifest,
  normalizeProductPageManifest,
  type CareerManifest,
  type NewsManifest,
  type ProductPageManifest,
  type SeriesManifest,
} from "@/lib/managed-content";
import type { CareerDetail, CareerItem, NewsItem } from "@/lib/types";
import EditableCopy from "@/components/admin/EditableCopy";
import EditableCareerItem from "@/components/admin/EditableCareerItem";
import EditableImage from "@/components/admin/EditableImage";
import EditableNewsItem from "@/components/admin/EditableNewsItem";
import EditableProductPageItem from "@/components/admin/EditableProductPageItem";
import EditableSeriesItem from "@/components/admin/EditableSeriesItem";

export default function AdminPage() {
  const [manifest, setManifest] = useState<ImageManifest>({});
  const [copyManifest, setCopyManifest] = useState<CopyManifest>({});
  const [newsManifest, setNewsManifest] = useState<NewsManifest>({});
  const [careerManifest, setCareerManifest] = useState<CareerManifest>({});
  const [seriesManifest, setSeriesManifest] = useState<SeriesManifest>({});
  const [productPageManifest, setProductPageManifest] =
    useState<ProductPageManifest>({});
  const [newNewsDrafts, setNewNewsDrafts] = useState<NewsItem[]>([]);
  const [newCareerDrafts, setNewCareerDrafts] = useState<
    { career: CareerItem; detail: CareerDetail }[]
  >([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingCopy, setLoadingCopy] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingCareers, setLoadingCareers] = useState(true);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [loadingProductPages, setLoadingProductPages] = useState(true);

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

    fetch(NEWS_MANIFEST_URL, { cache: "no-cache" })
      .then((r) => (r.ok ? (r.json() as Promise<NewsManifest>) : {}))
      .then((data) => {
        setNewsManifest(data);
      })
      .catch(() => undefined)
      .finally(() => setLoadingNews(false));

    fetch(CAREERS_MANIFEST_URL, { cache: "no-cache" })
      .then((r) => (r.ok ? (r.json() as Promise<CareerManifest>) : {}))
      .then((data) => {
        setCareerManifest(data);
      })
      .catch(() => undefined)
      .finally(() => setLoadingCareers(false));

    fetch(SERIES_MANIFEST_URL, { cache: "no-cache" })
      .then((r) => (r.ok ? (r.json() as Promise<SeriesManifest>) : {}))
      .then((data) => {
        setSeriesManifest(data);
      })
      .catch(() => undefined)
      .finally(() => setLoadingSeries(false));

    fetch(PRODUCT_PAGES_MANIFEST_URL, { cache: "no-cache" })
      .then((r) => (r.ok ? (r.json() as Promise<ProductPageManifest>) : {}))
      .then((data) => {
        setProductPageManifest(data);
      })
      .catch(() => undefined)
      .finally(() => setLoadingProductPages(false));
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

  const handleNewsSaved = useCallback(
    (slug: string, manifest: NewsManifest) => {
      setNewsManifest(manifest);
      setNewNewsDrafts((prev) => prev.filter((item) => item.slug !== slug));
    },
    [],
  );

  const handleNewsDeleted = useCallback(
    (slug: string, manifest?: NewsManifest) => {
      if (manifest) setNewsManifest(manifest);
      setNewNewsDrafts((prev) => prev.filter((item) => item.slug !== slug));
    },
    [],
  );

  const handleCareerSaved = useCallback(
    (slug: string, manifest: CareerManifest) => {
      setCareerManifest(manifest);
      setNewCareerDrafts((prev) =>
        prev.filter((item) => item.detail.slug !== slug),
      );
    },
    [],
  );

  const handleCareerDeleted = useCallback(
    (slug: string, manifest?: CareerManifest) => {
      if (manifest) setCareerManifest(manifest);
      setNewCareerDrafts((prev) =>
        prev.filter((item) => item.detail.slug !== slug),
      );
    },
    [],
  );

  const handleSeriesSaved = useCallback(
    (_slug: string, manifest: SeriesManifest) => {
      setSeriesManifest(manifest);
    },
    [],
  );

  const handleSeriesDeleted = useCallback(
    (_slug: string, manifest?: SeriesManifest) => {
      if (manifest) setSeriesManifest(manifest);
    },
    [],
  );

  const handleProductPageSaved = useCallback(
    (_slug: string, manifest: ProductPageManifest) => {
      setProductPageManifest(manifest);
    },
    [],
  );

  const handleProductPageDeleted = useCallback(
    (_slug: string, manifest?: ProductPageManifest) => {
      if (manifest) setProductPageManifest(manifest);
    },
    [],
  );

  const uploadedCount = Object.keys(manifest).length;
  const totalCount = allImageSlots.length;
  const copyOverrideCount = Object.keys(copyManifest).length;
  const copyTotalCount = allCopySlots.length;
  const normalizedNewsManifest = normalizeNewsManifest(newsManifest);
  const normalizedCareerManifest = normalizeCareerManifest(careerManifest);
  const newsOverrideCount =
    Object.keys(normalizedNewsManifest.overrides).length +
    Object.keys(normalizedNewsManifest.customItems).length;
  const careerOverrideCount =
    Object.keys(normalizedCareerManifest.overrides).length +
    Object.keys(normalizedCareerManifest.customItems).length;
  const seriesOverrideCount = Object.keys(seriesManifest.overrides ?? {}).length;
  const normalizedProductPageManifest =
    normalizeProductPageManifest(productPageManifest);
  const productPageOverrideCount = Object.keys(
    normalizedProductPageManifest.overrides,
  ).length;
  const managedNews = applyNewsManifest(news, {
    ...normalizedNewsManifest,
    hiddenSlugs: [],
  });
  const managedCareers = applyCareerItemManifest(careers, {
    ...normalizedCareerManifest,
    hiddenSlugs: [],
  });
  const managedCareerDetails = applyCareerDetailManifest(
    careerDetails,
    {
      ...normalizedCareerManifest,
      hiddenSlugs: [],
    },
  );
  const managedSeries = applySeriesManifest(seriesList, seriesManifest);
  const managedProductPages = applyProductPageManifest(
    productPages,
    productPageManifest,
  );
  const managedCareerBySlug = new Map(
    managedCareerDetails.map((career) => [career.slug, career]),
  );
  const loading =
    loadingImages ||
    loadingCopy ||
    loadingNews ||
    loadingCareers ||
    loadingSeries ||
    loadingProductPages;
  const homeCopySections = siteCopySections.filter((section) =>
    section.title.startsWith("首页"),
  );
  const companyCopySections = siteCopySections.filter((section) =>
    section.title.startsWith("关于我们"),
  );
  const companyImageSections = siteImageSections.filter((section) =>
    section.title.startsWith("关于我们"),
  );

  const addNewsDraft = () => {
    const date = new Date().toISOString().slice(0, 10);
    const slug = `custom-news-${Date.now()}`;
    setNewNewsDrafts((prev) => [
      {
        slug,
        title: "新增新闻",
        summary: "",
        date,
        category: "公司动态",
        coverImage: "/images/about/news-hero.png",
        galleryImages: [],
        content: "",
      },
      ...prev,
    ]);
  };

  const addCareerDraft = () => {
    const slug = `custom-career-${Date.now()}`;
    const career: CareerItem = {
      id: slug,
      title: "新增岗位",
      location: "待定",
      type: "全职",
      href: `/about/careers/${slug}`,
      image: "/images/about/careers/careers-hero-bg.png",
      summary: "",
      tags: [],
    };
    const detail: CareerDetail = {
      slug,
      title: career.title,
      department: "待定",
      location: career.location,
      type: career.type,
      workMode: "现场办公",
      experience: "经验不限",
      summary: "",
      heroImage: "/images/about/careers/careers-hero-bg.png",
      metrics: [],
      responsibilities: [],
      requirements: [],
      bonuses: [],
      process: [],
      applyHref: "/about/contact",
      detailSections: [],
    };
    setNewCareerDrafts((prev) => [{ career, detail }, ...prev]);
  };

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
            <div className="flex items-center gap-2 text-sm">
              <Newspaper size={16} className="text-text-secondary" />
              <span className="text-text-secondary">
                新闻 {newsOverrideCount} 条已改
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <UserRound size={16} className="text-text-secondary" />
              <span className="text-text-secondary">
                岗位 {careerOverrideCount} 条已改
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Boxes size={16} className="text-text-secondary" />
              <span className="text-text-secondary">
                产品系列 {seriesOverrideCount} 个已改
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Boxes size={16} className="text-text-secondary" />
              <span className="text-text-secondary">
                产品页 {productPageOverrideCount} 个已改
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
          <nav className="sticky top-0 z-30 -mx-2 flex gap-2 overflow-x-auto border-b border-border-subtle bg-bg-primary/95 px-2 py-3 backdrop-blur">
            {[
              ["#admin-home", Home, "首页"],
              ["#admin-news", Newspaper, "新闻"],
              ["#admin-careers", UserRound, "岗位"],
              ["#admin-company", Building2, "公司介绍"],
              ["#admin-series", Boxes, "产品系列"],
              ["#admin-products", Boxes, "主要产品页"],
              ["#admin-images", ImageIcon, "图片库"],
              ["#admin-copy", FileText, "文字库"],
            ].map(([href, Icon, label]) => {
              const NavIcon = Icon as typeof Home;
              return (
                <a
                  key={href as string}
                  href={href as string}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border-subtle bg-bg-card px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-purple-light/50 hover:text-text-primary"
                >
                  <NavIcon size={14} />
                  {label as string}
                </a>
              );
            })}
          </nav>

          <section id="admin-home">
            <div className="mb-8 flex items-center gap-3">
              <Home size={20} className="text-purple-light" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  首页素材管理
                </h2>
                <p className="text-sm text-text-secondary">
                  首页核心标题、按钮、产品卡、应用、资源、CTA 和合作伙伴图片。
                </p>
              </div>
            </div>

            <div className="space-y-12">
              {homeCopySections.map((section) => (
                <section key={section.title}>
                  <h3 className="mb-1 text-lg font-bold text-text-primary">
                    {section.title}
                  </h3>
                  <div className="mb-6 h-px bg-border-color" />
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

          <section id="admin-news">
            <div className="mb-8 flex items-center gap-3">
              <Newspaper size={20} className="text-purple-light" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  首页新闻管理
                </h2>
                <p className="text-sm text-text-secondary">
                  修改新闻标题、摘要、正文和封面路径；首页自动取前 3 条新闻。
                </p>
              </div>
              <button
                type="button"
                onClick={addNewsDraft}
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-purple-primary px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-purple-primary/80"
              >
                <Plus size={14} />
                新增新闻
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {newNewsDrafts.map((item) => (
                <EditableNewsItem
                  key={item.slug}
                  item={item}
                  hasOverride
                  allowSlugEdit
                  isCustom
                  onSaved={handleNewsSaved}
                  onDeleted={handleNewsDeleted}
                />
              ))}
              {managedNews.map((item) => (
                <EditableNewsItem
                  key={item.slug}
                  item={item}
                  hasOverride={Object.prototype.hasOwnProperty.call(
                    normalizedNewsManifest.overrides,
                    item.slug,
                  ) || Object.prototype.hasOwnProperty.call(
                    normalizedNewsManifest.customItems,
                    item.slug,
                  )}
                  isCustom={Object.prototype.hasOwnProperty.call(
                    normalizedNewsManifest.customItems,
                    item.slug,
                  )}
                  onSaved={handleNewsSaved}
                  onDeleted={handleNewsDeleted}
                />
              ))}
            </div>
          </section>

          <section id="admin-careers">
            <div className="mb-8 flex items-center gap-3">
              <UserRound size={20} className="text-purple-light" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  岗位管理
                </h2>
                <p className="text-sm text-text-secondary">
                  修改岗位列表和岗位详情页文案，支持图片路径、申请链接和详情段落。
                </p>
              </div>
              <button
                type="button"
                onClick={addCareerDraft}
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-purple-primary px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-purple-primary/80"
              >
                <Plus size={14} />
                新增岗位
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {newCareerDrafts.map(({ career, detail }) => (
                <EditableCareerItem
                  key={career.id}
                  career={career}
                  detail={detail}
                  hasOverride
                  allowSlugEdit
                  isCustom
                  onSaved={handleCareerSaved}
                  onDeleted={handleCareerDeleted}
                />
              ))}
              {managedCareers.map((career) => {
                const detail = managedCareerBySlug.get(career.id);
                if (!detail) return null;
                return (
                  <EditableCareerItem
                    key={career.id}
                    career={career}
                    detail={detail}
                    hasOverride={Object.prototype.hasOwnProperty.call(
                      normalizedCareerManifest.overrides,
                      career.id,
                    ) || Object.prototype.hasOwnProperty.call(
                      normalizedCareerManifest.customItems,
                      career.id,
                    )}
                    isCustom={Object.prototype.hasOwnProperty.call(
                      normalizedCareerManifest.customItems,
                      career.id,
                    )}
                    onSaved={handleCareerSaved}
                    onDeleted={handleCareerDeleted}
                  />
                );
              })}
            </div>
          </section>

          <section id="admin-company">
            <div className="mb-8 flex items-center gap-3">
              <Building2 size={20} className="text-purple-light" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  公司介绍管理
                </h2>
                <p className="text-sm text-text-secondary">
                  管理公司介绍、使命愿景、专利荣誉文案以及关于我们相关图片。
                </p>
              </div>
            </div>

            <div className="space-y-12">
              {companyCopySections.map((section) => (
                <section key={section.title}>
                  <h3 className="mb-1 text-lg font-bold text-text-primary">
                    {section.title}
                  </h3>
                  <div className="mb-6 h-px bg-border-color" />
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

              {companyImageSections.map((section) => (
                <section key={section.title}>
                  <h3 className="mb-1 text-lg font-bold text-text-primary">
                    {section.title}
                  </h3>
                  <div className="mb-6 h-px bg-border-color" />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

          <section id="admin-series">
            <div className="mb-8 flex items-center gap-3">
              <Boxes size={20} className="text-purple-light" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  产品系列管理
                </h2>
                <p className="text-sm text-text-secondary">
                  编辑 DepthSight 系列 Hero、核心优势和技术参数；不开放新增型号。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {managedSeries.map((series) => (
                <EditableSeriesItem
                  key={series.slug}
                  series={series}
                  hasOverride={Object.prototype.hasOwnProperty.call(
                    seriesManifest.overrides ?? {},
                    series.slug,
                  )}
                  onSaved={handleSeriesSaved}
                  onDeleted={handleSeriesDeleted}
                />
              ))}
            </div>
          </section>

          <section id="admin-products">
            <div className="mb-8 flex items-center gap-3">
              <Boxes size={20} className="text-purple-light" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  主要产品页管理
                </h2>
                <p className="text-sm text-text-secondary">
                  编辑产品页的 Hero、标签、功能、流程、规格和应用文案；不开放新增产品页。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {managedProductPages.map((page) => (
                <EditableProductPageItem
                  key={page.slug}
                  page={page}
                  hasOverride={Object.prototype.hasOwnProperty.call(
                    normalizedProductPageManifest.overrides,
                    page.slug,
                  )}
                  onSaved={handleProductPageSaved}
                  onDeleted={handleProductPageDeleted}
                />
              ))}
            </div>
          </section>

          <section id="admin-images">
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

          <section id="admin-copy">
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
