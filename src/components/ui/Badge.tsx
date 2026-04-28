import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-primary/10 border border-purple-glow",
        className,
      )}
    >
      <span className="w-2 h-2 rounded-full bg-purple-primary" />
      <span className="text-purple-light text-[10px] font-bold uppercase tracking-[3px]">
        {children}
      </span>
    </div>
  );
}
