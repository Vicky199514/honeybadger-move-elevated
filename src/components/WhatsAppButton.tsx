import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, type WhatsAppOrder } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  order?: WhatsAppOrder | undefined;
  className?: string | undefined;
  children?: React.ReactNode;
  variant?: "accent" | "outline" | "outlineInk" | undefined;
  size?: "md" | "lg" | undefined;
  label?: string | undefined;
};

const variants = {
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  outline: "border border-hairline-ink text-bone hover:bg-bone hover:text-ink",
  outlineInk: "border border-ink text-ink hover:bg-ink hover:text-bone",
} as const;

const sizes = {
  md: "min-h-11 px-5 text-xs",
  lg: "min-h-13 px-7 text-sm",
} as const;

export function WhatsAppButton({
  order,
  className,
  children = "Order on WhatsApp",
  variant = "accent",
  size = "md",
  label,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(order)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ?? (typeof children === "string" ? children : "Order on WhatsApp")}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-sm font-display font-bold tracking-[0.16em] uppercase transition-colors duration-200",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      <WhatsAppGlyph />
      {children}
    </a>
  );
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("size-4 shrink-0", className)}
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.15c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.96-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.17 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.19 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}
