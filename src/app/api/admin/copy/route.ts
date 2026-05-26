import { NextRequest, NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { allCopySlots, copySlotById } from "@/data/site-copy";
import type { CopyManifest } from "@/lib/copy";
import { COPY_MANIFEST_PATH } from "@/lib/copy";

const MANIFEST_FILE = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  COPY_MANIFEST_PATH,
);
const MANIFEST_DIR = path.dirname(MANIFEST_FILE);

const READ_ONLY_FS = process.env.VERCEL === "1";
const ADMIN_HEADER = "x-admin-secret";
const VALID_SLOT_IDS = new Set(allCopySlots.map((slot) => slot.id));

const saveBodySchema = z.object({
  slotId: z.string().min(1),
  value: z.string(),
});

const deleteBodySchema = z.object({
  slotId: z.string().min(1),
});

function readOnlyResponse(): NextResponse {
  return NextResponse.json(
    {
      error:
        "生产环境 (Vercel) 文件系统只读，文案更新暂未启用。请在本地运行后提交代码，或迁移到 Vercel Blob / 对象存储。",
    },
    { status: 503 },
  );
}

function unauthorizedResponse(): NextResponse {
  return NextResponse.json({ error: "未授权" }, { status: 401 });
}

function authorize(request: NextRequest): boolean {
  const expected = process.env.ADMIN_SECRET;
  if (!expected) return false;
  const provided = request.headers.get(ADMIN_HEADER);
  return Boolean(provided) && provided === expected;
}

async function readManifest(): Promise<CopyManifest> {
  try {
    const raw = await readFile(MANIFEST_FILE, "utf-8");
    return JSON.parse(raw) as CopyManifest;
  } catch {
    return {};
  }
}

async function writeManifest(manifest: CopyManifest): Promise<void> {
  await mkdir(MANIFEST_DIR, { recursive: true });
  await writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, 2), "utf-8");
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (READ_ONLY_FS) return readOnlyResponse();
  if (!authorize(request)) return unauthorizedResponse();

  try {
    const raw = (await request.json()) as unknown;
    const parsed = saveBodySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const { slotId } = parsed.data;
    const slot = copySlotById.get(slotId);

    if (!VALID_SLOT_IDS.has(slotId) || !slot) {
      return NextResponse.json({ error: "Unknown slotId" }, { status: 400 });
    }

    const value = parsed.data.value.trim();
    const maxLength = slot.maxLength ?? 2000;
    if (value.length > maxLength) {
      return NextResponse.json(
        { error: `文案不能超过 ${maxLength} 个字符` },
        { status: 400 },
      );
    }

    const manifest = await readManifest();
    if (!value || value === slot.defaultValue) {
      delete manifest[slotId];
    } else {
      manifest[slotId] = value;
    }
    await writeManifest(manifest);

    return NextResponse.json({
      success: true,
      value: manifest[slotId] ?? slot.defaultValue,
      overridden: Object.prototype.hasOwnProperty.call(manifest, slotId),
    });
  } catch (err) {
    console.error("[admin/copy/POST]", err);
    return NextResponse.json(
      { error: "保存失败，请稍后重试。" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  if (READ_ONLY_FS) return readOnlyResponse();
  if (!authorize(request)) return unauthorizedResponse();

  try {
    const raw = (await request.json()) as unknown;
    const parsed = deleteBodySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const { slotId } = parsed.data;
    if (!VALID_SLOT_IDS.has(slotId)) {
      return NextResponse.json({ error: "Unknown slotId" }, { status: 400 });
    }

    const manifest = await readManifest();
    if (Object.prototype.hasOwnProperty.call(manifest, slotId)) {
      delete manifest[slotId];
      await writeManifest(manifest);
    }

    const slot = copySlotById.get(slotId);
    return NextResponse.json({
      success: true,
      value: slot?.defaultValue ?? "",
    });
  } catch (err) {
    console.error("[admin/copy/DELETE]", err);
    return NextResponse.json(
      { error: "恢复默认失败，请稍后重试。" },
      { status: 500 },
    );
  }
}
