import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { ImageManifest } from "@/lib/images";
import { MANIFEST_PATH } from "@/lib/images";
import { allImageSlots } from "@/data/site-images";

const UPLOAD_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), "public/uploads");
const MANIFEST_FILE = path.join(/* turbopackIgnore: true */ process.cwd(), MANIFEST_PATH);

const READ_ONLY_FS = process.env.VERCEL === "1";
const ADMIN_HEADER = "x-admin-secret";
const VALID_SLOT_IDS = new Set(allImageSlots.map((s) => s.id));

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

const MAX_SIZE = 20 * 1024 * 1024;

function readOnlyResponse(): NextResponse {
  return NextResponse.json(
    {
      error:
        "生产环境 (Vercel) 文件系统只读，图片上传暂未启用。请在本地运行后提交代码，或迁移到 Vercel Blob / 对象存储。",
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

function detectMimeFromMagic(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38
  ) {
    return "image/gif";
  }
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  if (
    bytes[4] === 0x66 &&
    bytes[5] === 0x74 &&
    bytes[6] === 0x79 &&
    bytes[7] === 0x70
  ) {
    const brand = String.fromCharCode(
      bytes[8],
      bytes[9],
      bytes[10],
      bytes[11],
    );
    if (brand === "avif" || brand === "avis") return "image/avif";
  }
  return null;
}

async function readManifest(): Promise<ImageManifest> {
  try {
    const raw = await readFile(MANIFEST_FILE, "utf-8");
    return JSON.parse(raw) as ImageManifest;
  } catch {
    return {};
  }
}

async function writeManifest(manifest: ImageManifest): Promise<void> {
  await writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, 2), "utf-8");
}

const deleteBodySchema = z.object({
  slotId: z.string().min(1),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (READ_ONLY_FS) return readOnlyResponse();
  if (!authorize(request)) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const slotId = formData.get("slotId");
    const file = formData.get("file");

    if (typeof slotId !== "string" || !slotId) {
      return NextResponse.json({ error: "Missing slotId" }, { status: 400 });
    }

    if (!VALID_SLOT_IDS.has(slotId)) {
      return NextResponse.json({ error: "Unknown slotId" }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "文件大小不能超过 20 MB" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const detectedMime = detectMimeFromMagic(
      new Uint8Array(buffer.buffer, buffer.byteOffset, Math.min(buffer.length, 16)),
    );

    if (!detectedMime || !MIME_TO_EXT[detectedMime]) {
      return NextResponse.json(
        { error: "不支持的文件类型 (仅允许 JPG/PNG/WEBP/AVIF/GIF)" },
        { status: 400 },
      );
    }

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const safeId = slotId.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `${safeId}.${MIME_TO_EXT[detectedMime]}`;
    const filepath = path.join(UPLOAD_DIR, filename);
    await writeFile(filepath, buffer);

    const manifest = await readManifest();
    const publicUrl = `/uploads/${filename}?t=${Date.now()}`;
    manifest[slotId] = publicUrl;
    await writeManifest(manifest);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error("[admin/POST]", err);
    return NextResponse.json(
      { error: "上传失败，请稍后重试。" },
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/DELETE]", err);
    return NextResponse.json(
      { error: "删除失败，请稍后重试。" },
      { status: 500 },
    );
  }
}
