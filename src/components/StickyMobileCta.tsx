import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import type { WhatsAppOrder } from "@/lib/whatsapp";

type Props = {
  order?: WhatsAppOrder | undefined;
  price?: string | undefined;
  meta?: string | undefined;
};

/** Appears once the hero has scrolled away. Mobile only, safe-area aware. */
export function StickyMobileCta({ order, price, meta }: Props) {
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
        {price ? (
          <div className="min-w-0">
            <p className="font-display text-base font-extrabold text-bone">{price}</p>
            {meta ? <p className="truncate text-[11px] text-bone/55">{meta}</p> : null}
          </div>
        ) : null}
        <WhatsAppButton order={order} size="lg" className="flex-1">
          Order Now
        </WhatsAppButton>
      </div>
    </div>
  );
}
