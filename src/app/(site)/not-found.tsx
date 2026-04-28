import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-10 py-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(73,46,141,0.25) 0%, rgba(13,14,16,0) 60%)",
        }}
      />

      <div className="relative text-center max-w-xl">
        <div className="text-purple-light text-xs uppercase tracking-[4px] font-bold mb-4">
          Error 404
        </div>

        <h1
          className="text-[96px] md:text-[144px] font-bold leading-none bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #8d77cf 0%, #492e8d 50%, #47484a 100%)",
          }}
        >
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-4 mb-4">
          页面未找到
        </h2>

        <p className="text-text-secondary leading-relaxed mb-10">
          你访问的页面不存在或已被移除。也许它已经进化成了一个更智能的版本。
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-primary text-white text-sm rounded-lg hover:bg-purple-light/90 transition-colors"
          >
            <Home size={16} />
            返回首页
          </Link>
          <Link
            href="/about/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border-color text-text-primary text-sm rounded-lg hover:border-purple-light hover:text-purple-light transition-colors"
          >
            <ArrowLeft size={16} />
            联系我们
          </Link>
        </div>
      </div>
    </section>
  );
}
