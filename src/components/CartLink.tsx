import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

/** Header cart entry point with a live item count. */
export function CartLink() {
  const { count } = useCart();

  return (
    <Link
      to="/cart"
      aria-label={count ? `Cart — ${count} item${count === 1 ? "" : "s"}` : "Cart — empty"}
      className="relative grid size-11 place-items-center rounded-sm border border-hairline-ink text-bone transition-colors hover:bg-bone hover:text-ink"
    >
      <ShoppingBag className="size-5" />
      {count ? (
        <span className="absolute -top-1.5 -right-1.5 grid min-w-5 place-items-center rounded-full bg-accent px-1 font-display text-[10px] font-extrabold text-accent-foreground">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
