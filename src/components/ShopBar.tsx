import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Mobile-only sticky bar that sends visitors to the shoppable collection. */
export function ShopBar({ price, meta }: { price: string; meta: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-hairline-ink bg-ink/95 backdrop-blur-md transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <div className="shell flex items-center gap-3 pt-3">
        <div className="min-w-0">
          <p className="font-display text-base font-extrabold text-bone">
            From {price}
          </p>
          <p className="truncate text-[11px] text-bone/55">{meta}</p>
        </div>
        <Link
          to="/track-pants"
          className="ml-auto inline-flex min-h-13 shrink-0 items-center justify-center rounded-sm bg-accent px-6 font-display text-sm font-bold tracking-[0.14em] text-accent-foreground uppercase"
        >
          Shop now
        </Link>
      </div>
    </div>
  );
}
