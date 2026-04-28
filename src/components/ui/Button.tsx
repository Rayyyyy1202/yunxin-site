import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const variants = {
  primary:
    "bg-purple-primary text-white hover:bg-purple-primary/80 transition-colors",
  secondary:
    "border border-border-color text-text-primary hover:border-purple-light hover:text-purple-light transition-colors",
  ghost:
    "text-text-secondary hover:text-text-primary transition-colors",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm uppercase tracking-wider",
  lg: "px-10 py-4 text-base uppercase tracking-wider",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
