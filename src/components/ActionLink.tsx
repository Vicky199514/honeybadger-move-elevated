import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-sm font-display font-bold tracking-[0.16em] uppercase transition-colors duration-200";

const variants = {
  solidBone: "bg-bone text-ink hover:bg-white",
  solidInk: "bg-ink text-bone hover:bg-charcoal",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  outlineBone: "border border-hairline-ink text-bone hover:bg-bone hover:text-ink",
  outlineInk: "border border-ink/25 text-ink hover:bg-ink hover:text-bone",
} as const;

const sizes = {
  md: "min-h-11 px-5 text-xs",
  lg: "min-h-13 px-7 text-sm",
} as const;

type Props = {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export function ActionLink({ to, params, children, variant = "solidInk", size = "md", className }: Props) {
  return (
    <Link
      to={to}
      params={params as never}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  );
}
