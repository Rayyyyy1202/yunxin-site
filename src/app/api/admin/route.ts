import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { allImageSlots } from "@/data/site-images";
import {
  deleteManagedAsset,
  readManagedContentState,
  uploadManagedAsset,
  writeManagedContentState,
} from "@/lib/managed-store";

const ADMIN_HEADER = "x-admin-secret";
const VALID_SLOT_IDS = new Set(allImageSlots.map((s) => s.id));
const STRUCTURED_SLOT_PREFIXES = [
  "news-cover-",
  "career-",
  "series-",
  "product-page-",
] as const;

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

const MAX_SIZE = 20 * 1024 * 1024;

function unauthorizedResponse(): NextResponse {
  return NextResponse.json({ error: "未授权" }, { status: 401 });
}

function authorize(request: NextRequest): boolean {
  const expected = process.env.ADMIN_SECRET;
  if (!expected) return false;
  const provided = request.headers.get(ADMIN_HEADER);
  return Boolean(provided) && provided === expected;
}

function isAllowedSlotId(slotId: string): boolean {
  if (VALID_SLOT_IDS.has(slotId)) return true;
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,159}$/.test(slotId)) return false;
  return STRUCTURED_SLOT_PREFIXES.some((prefix) => slotId.startsWith(prefix));
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

const deleteBodySchema = z.object({
  slotId: z.string().min(1),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!authorize(request)) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const slotId = formData.get("slotId");
    const file = formData.get("file");

    if (typeof slotId !== "string" || !slotId) {
      return NextResponse.json({ error: "Missing slotId" }, { status: 400 });
    }

    if (!isAllowedSlotId(slotId)) {
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

    const publicUrl = await uploadManagedAsset({
      slotId,
      buffer,
      extension: MIME_TO_EXT[detectedMime],
      mimeType: detectedMime,
    });
    const state = await readManagedContentState();
    state.images[slotId] = publicUrl;
    await writeManagedContentState(state);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error("[admin/POST]", err);
    const message = err instanceof Error ? err.message : "上传失败，请稍后重试。";
    const status = message.includes("BLOB_READ_WRITE_TOKEN") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  if (!authorize(request)) return unauthorizedResponse();

  try {
    const raw = (await request.json()) as unknown;
    const parsed = deleteBodySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    const { slotId } = parsed.data;

    if (!isAllowedSlotId(slotId)) {
      return NextResponse.json({ error: "Unknown slotId" }, { status: 400 });
    }

    const state = await readManagedContentState();
    if (Object.prototype.hasOwnProperty.call(state.images, slotId)) {
      const previous = state.images[slotId];
      delete state.images[slotId];
      await writeManagedContentState(state);
      await deleteManagedAsset(previous);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/DELETE]", err);
    const message = err instanceof Error ? err.message : "删除失败，请稍后重试。";
    const status = message.includes("BLOB_READ_WRITE_TOKEN") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
