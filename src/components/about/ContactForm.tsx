"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "姓名至少 2 个字符"),
  email: z.string().email("请输入有效的邮箱"),
  phone: z.string().min(6, "请输入有效的电话号码").optional().or(z.literal("")),
  company: z.string().optional(),
  subject: z.string().min(2, "请输入主题"),
  message: z.string().min(10, "消息内容至少 10 个字符"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "提交失败，请稍后重试。");
      }
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "提交失败，请稍后重试。";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-purple-primary transition-colors";
  const labelClass =
    "block text-text-secondary text-xs uppercase tracking-wider mb-2";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <div className="bg-bg-secondary border border-border-subtle rounded-xl p-8 md:p-10 h-full">
      <h3 className="text-2xl font-bold text-text-primary mb-2">提交资料</h3>
      <p className="text-text-secondary text-sm mb-8">
        留下您的信息，我们将尽快与您联系
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>姓名 *</label>
            <input
              {...register("name")}
              className={cn(inputClass, errors.name && "border-red-400")}
              placeholder="您的姓名"
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>
          <div>
            <label className={labelClass}>邮箱 *</label>
            <input
              type="email"
              {...register("email")}
              className={cn(inputClass, errors.email && "border-red-400")}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>电话</label>
            <input
              {...register("phone")}
              className={cn(inputClass, errors.phone && "border-red-400")}
              placeholder="+86"
            />
            {errors.phone && (
              <p className={errorClass}>{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>公司</label>
            <input
              {...register("company")}
              className={inputClass}
              placeholder="公司名称"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>主题 *</label>
          <input
            {...register("subject")}
            className={cn(inputClass, errors.subject && "border-red-400")}
            placeholder="咨询主题"
          />
          {errors.subject && (
            <p className={errorClass}>{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>消息内容 *</label>
          <textarea
            {...register("message")}
            rows={5}
            className={cn(
              inputClass,
              "resize-none",
              errors.message && "border-red-400",
            )}
            placeholder="请详细描述您的需求..."
          />
          {errors.message && (
            <p className={errorClass}>{errors.message.message}</p>
          )}
        </div>

        {submitError && (
          <p className="text-red-400 text-sm" role="alert">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || submitted}
          className="w-full bg-purple-primary text-white py-3.5 uppercase tracking-wider text-sm font-medium hover:bg-purple-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg"
        >
          {submitted ? (
            <>
              <CheckCircle2 size={16} />
              提交成功
            </>
          ) : (
            <>
              <Send size={16} />
              {submitting ? "提交中..." : "提交"}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
