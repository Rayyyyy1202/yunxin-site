import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import type { ImageManifest } from "@/lib/images";
import { MANIFEST_PATH } from "@/lib/images";

const UPLOAD_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), "public/uploads");
const MANIFEST_FILE = path.join(/* turbopackIgnore: true */ process.cwd(), MANIFEST_PATH);

/**
 * Vercel's serverless filesystem is read-only. We refuse writes in that
 * environment with a clear message instead of letting fs calls crash.
 * Migrate to Vercel Blob / R2 / S3 later to re-enable runtime uploads.
 */
const READ_ONLY_FS = process.env.VERCEL === "1";

function readOnlyResponse(): NextResponse {
  return NextResponse.json(
    {
      error:
        "生产环境 (Vercel) 文件系统只读，图片上传暂未启用。请在本地运行后提交代码，或迁移到 Vercel Blob / 对象存储。",
    },
    { status: 503 },
  );
}

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
]);

const MAX_SIZE = 20 * 1024 * 1024; // 20 MB

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

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (READ_ONLY_FS) return readOnlyResponse();
  try {
    const formData = await request.formData();
    const slotId = formData.get("slotId");
    const file = formData.get("file");

    if (typeof slotId !== "string" || !slotId) {
      return NextResponse.json(
        { error: "Missing slotId" },
        { status: 400 },
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing file" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `不支持的文件类型: ${file.type}` },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "文件大小不能超过 20 MB" },
        { status: 400 },
      );
    }

    // Sanitize slot ID for use as filename
    const safeId = slotId.replace(/[^a-zA-Z0-9_-]/g, "_");
    const ext = file.name.split(".").pop() ?? "jpg";
    const safeExt = ext.replace(/[^a-zA-Z0-9]/g, "");
    const filename = `${safeId}.${safeExt}`;

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filepath = path.join(UPLOAD_DIR, filename);
    await writeFile(filepath, buffer);

    // Update manifest
    const manifest = await readManifest();
    const publicUrl = `/uploads/${filename}?t=${Date.now()}`;
    manifest[slotId] = publicUrl;
    await writeManifest(manifest);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** DELETE: remove an uploaded image and revert to default. */
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  if (READ_ONLY_FS) return readOnlyResponse();
  try {
    const { slotId } = (await request.json()) as { slotId: string };
    if (!slotId) {
      return NextResponse.json(
        { error: "Missing slotId" },
        { status: 400 },
      );
    }

    const manifest = await readManifest();
    delete manifest[slotId];
    await writeManifest(manifest);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
