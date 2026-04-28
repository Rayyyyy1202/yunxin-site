import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(200).optional(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
});

const TO_ADDRESS = "zcchen@aiever-robotics.com";
const FROM_ADDRESS =
  process.env.CONTACT_FROM_ADDRESS || "AIeveR Site <onboarding@resend.dev>";

const ipBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = ipBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    ipBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "提交过于频繁，请稍后再试。" },
      { status: 429 },
    );
  }

  let parsed;
  try {
    const body = await request.json();
    parsed = contactSchema.safeParse(body);
  } catch {
    return NextResponse.json({ error: "无效的请求体。" }, { status: 400 });
  }

  if (!parsed.success) {
    return NextResponse.json(
      { error: "表单字段校验失败。" },
      { status: 400 },
    );
  }

  const { name, email, phone, company, subject, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY missing — submission lost", {
      from: email,
      subject,
    });
    return NextResponse.json(
      { error: "邮件服务暂未配置，请直接发送至 zcchen@aiever-robotics.com。" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const html = `
    <h2>${escapeHtml(subject)}</h2>
    <p><strong>姓名：</strong>${escapeHtml(name)}</p>
    <p><strong>邮箱：</strong>${escapeHtml(email)}</p>
    ${phone ? `<p><strong>电话：</strong>${escapeHtml(phone)}</p>` : ""}
    ${company ? `<p><strong>公司：</strong>${escapeHtml(company)}</p>` : ""}
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    <hr />
    <p style="color:#888;font-size:12px">来源 IP: ${escapeHtml(ip)}</p>
  `;

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: [TO_ADDRESS],
    replyTo: email,
    subject: `[官网咨询] ${subject}`,
    html,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return NextResponse.json(
      { error: "提交失败，请稍后重试或直接联系 zcchen@aiever-robotics.com。" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
