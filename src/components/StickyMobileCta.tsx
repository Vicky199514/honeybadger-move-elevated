import { useEffect, useState } from "react";
import { ChevronUp, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  price?: string | undefined;
  meta?: string | undefined;
  onAddToCart?: (() => void) | undefined;
  onBuyNow?: (() => void) | undefined;
  /** Option pickers shown when the bar is tapped. */
  children?: React.ReactNode;
};

/** Tap the bar to open the option sheet (pack, colours, size, quantity, payment). */
export function StickyMobileCta({ price, meta, onAddToCart, onBuyNow, children }: Props) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <div
        role="dialog"
        aria-label="Choose your options"
        aria-modal={open}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 z-50 max-h-[78svh] overflow-y-auto rounded-t-lg border-t border-border bg-background lg:hidden"
        style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }}
      >
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-border bg-background px-5 py-4">
          <p className="eyebrow text-muted-foreground">Choose your options</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close options"
            className="grid size-9 place-items-center rounded-sm border border-border"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 border-t border-hairline-ink bg-ink/95 backdrop-blur-md transition-transform duration-300 lg:hidden",
          visible || open ? "translate-y-0" : "translate-y-full",
        )}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        aria-hidden={!visible && !open}
      >
        <div className="shell flex items-center gap-3 pt-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex min-w-0 flex-1 items-center gap-2 text-left"
          >
            <span className="min-w-0">
              <span className="block font-display text-base font-extrabold text-bone">{price}</span>
              {meta ? <span className="block truncate text-[11px] text-bone/55">{meta}</span> : null}
            </span>
            <ChevronUp
              className={cn(
                "size-4 shrink-0 text-bone/60 transition-transform",
                open ? "rotate-180" : "",
              )}
            />
          </button>
          <button
            type="button"
            onClick={onAddToCart}
            aria-label="Add to cart"
            className="grid size-13 shrink-0 place-items-center rounded-sm border border-hairline-ink text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            <ShoppingBag className="size-5" />
          </button>
          <button
            type="button"
            onClick={onBuyNow}
            className="min-h-13 shrink-0 rounded-sm bg-accent px-5 font-display text-sm font-bold tracking-[0.14em] text-accent-foreground uppercase"
          >
            Buy now
          </button>
        </div>
      </div>
    </>
  );
}
