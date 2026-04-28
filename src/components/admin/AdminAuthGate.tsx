"use client";

import { useEffect, useState } from "react";
import { LockKeyhole, LogOut } from "lucide-react";
import {
  clearAdminSecret,
  getAdminSecret,
  setAdminSecret,
} from "@/lib/admin-auth";

interface AdminAuthGateProps {
  children: React.ReactNode;
}

export default function AdminAuthGate({ children }: AdminAuthGateProps) {
  const [hydrated, setHydrated] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // One-shot hydration: read the secret from localStorage after the client
    // mounts so we avoid SSR/CSR mismatch. Not a cascading render — only fires once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthed(Boolean(getAdminSecret()));
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen text-text-secondary">
        加载中…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const trimmed = input.trim();
            if (!trimmed) {
              setError("请输入管理员密钥。");
              return;
            }
            setAdminSecret(trimmed);
            setAuthed(true);
            setError(null);
          }}
          className="w-full max-w-sm bg-bg-secondary border border-border-subtle rounded-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <LockKeyhole size={20} className="text-purple-light" />
            <h1 className="text-text-primary text-lg font-semibold">
              素材管理 · 登录
            </h1>
          </div>
          <label className="block text-text-secondary text-xs uppercase tracking-wider mb-2">
            管理员密钥
          </label>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className="w-full bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
            placeholder="ADMIN_SECRET"
          />
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full mt-5 bg-purple-primary text-white py-3 rounded-lg uppercase tracking-wider text-sm font-medium hover:bg-purple-primary/80 transition-colors"
          >
            进入
          </button>
          <p className="text-text-secondary text-[11px] mt-4 leading-relaxed">
            密钥须与服务端 <code className="text-purple-light">ADMIN_SECRET</code> 一致。
            密钥存储于本机 localStorage，不会发送到第三方。
          </p>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end px-6 md:px-10 pt-4">
        <button
          type="button"
          onClick={() => {
            clearAdminSecret();
            setAuthed(false);
            setInput("");
          }}
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors text-xs"
        >
          <LogOut size={14} />
          退出登录
        </button>
      </div>
      {children}
    </>
  );
}
