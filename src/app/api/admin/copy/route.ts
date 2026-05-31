import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { allCopySlots, copySlotById } from "@/data/site-copy";
import {
  readManagedContentState,
  writeManagedContentState,
} from "@/lib/managed-store";

const ADMIN_HEADER = "x-admin-secret";
const VALID_SLOT_IDS = new Set(allCopySlots.map((slot) => slot.id));

const saveBodySchema = z.object({
  slotId: z.string().min(1),
  value: z.string(),
});

const deleteBodySchema = z.object({
  slotId: z.string().min(1),
});

function unauthorizedResponse(): NextResponse {
  return NextResponse.json({ error: "未授权" }, { status: 401 });
}

function authorize(request: NextRequest): boolean {
  const expected = process.env.ADMIN_SECRET;
  if (!expected) return false;
  const provided = request.headers.get(ADMIN_HEADER);
  return Boolean(provided) && provided === expected;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
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

    const state = await readManagedContentState();
    if (!value || value === slot.defaultValue) {
      delete state.copy[slotId];
    } else {
      state.copy[slotId] = value;
    }
    await writeManagedContentState(state);

    return NextResponse.json({
      success: true,
      value: state.copy[slotId] ?? slot.defaultValue,
      overridden: Object.prototype.hasOwnProperty.call(state.copy, slotId),
    });
  } catch (err) {
    console.error("[admin/copy/POST]", err);
    const message = err instanceof Error ? err.message : "保存失败，请稍后重试。";
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
    if (!VALID_SLOT_IDS.has(slotId)) {
      return NextResponse.json({ error: "Unknown slotId" }, { status: 400 });
    }

    const state = await readManagedContentState();
    if (Object.prototype.hasOwnProperty.call(state.copy, slotId)) {
      delete state.copy[slotId];
      await writeManagedContentState(state);
    }

    const slot = copySlotById.get(slotId);
    return NextResponse.json({
      success: true,
      value: slot?.defaultValue ?? "",
    });
  } catch (err) {
    console.error("[admin/copy/DELETE]", err);
    const message =
      err instanceof Error ? err.message : "恢复默认失败，请稍后重试。";
    const status = message.includes("BLOB_READ_WRITE_TOKEN") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
