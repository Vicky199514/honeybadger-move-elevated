import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { COD_FEE, formatPrice, paymentMethods } from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const title = "Your cart — Honey Badger Outfits";
const description =
  "Review your Honey Badger track pant selection, adjust quantities, choose prepaid or cash on delivery and place your order.";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, total, payment, setPayment, setQuantity, remove, ready } = useCart();

  return (
    <div className="bg-background pt-28 pb-20 md:pt-36">
      <div className="shell">
        <p className="eyebrow text-muted-foreground">Checkout</p>
        <h1 className="mt-4 text-[clamp(2rem,7vw,3.5rem)] leading-[0.95]">
          Your cart<span className="text-accent">.</span>
        </h1>

        {!ready ? null : items.length === 0 ? (
          <div className="mt-10 border border-border p-8 text-center">
            <ShoppingBag className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/track-pants"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-sm bg-ink px-7 font-display text-sm font-bold tracking-[0.16em] text-bone uppercase"
            >
              Shop track pants
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
            <ul className="border-t border-border" role="list">
              {items.map((item) => (
                <li key={item.key} className="flex flex-wrap gap-4 border-b border-border py-6">
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-bold tracking-wide uppercase">
                      {item.productName}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.packLabel} · Size {item.size} · {item.colours.join(", ")}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="inline-flex items-center rounded-sm border border-border">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.packLabel}`}
                          className="grid size-10 place-items-center hover:bg-secondary"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="min-w-10 text-center font-display text-sm font-extrabold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.packLabel}`}
                          className="grid size-10 place-items-center hover:bg-secondary"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.key)}
                        className="inline-flex items-center gap-1.5 text-xs tracking-wide text-muted-foreground uppercase hover:text-foreground"
                      >
                        <Trash2 className="size-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-display text-base font-extrabold">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <aside className="border border-border p-6">
              <h2 className="eyebrow text-muted-foreground">Order summary</h2>

              <div className="mt-4 grid gap-2.5">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPayment(method.id)}
                    aria-pressed={payment === method.id}
                    className={cn(
                      "rounded-sm border p-3 text-left transition-colors",
                      payment === method.id
                        ? "border-ink bg-ink text-bone"
                        : "border-border hover:border-ink",
                    )}
                  >
                    <span className="block font-display text-sm font-bold tracking-wide uppercase">
                      {method.label}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-xs",
                        payment === method.id ? "text-bone/65" : "text-muted-foreground",
                      )}
                    >
                      {method.note}
                    </span>
                  </button>
                ))}
              </div>

              <dl className="mt-6 grid gap-2 border-t border-border pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                {payment === "cod" ? (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Cash on delivery charge</dt>
                    <dd>{formatPrice(COD_FEE)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-4 border-t border-border pt-3 font-display text-base font-extrabold">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>

              <WhatsAppButton
                size="lg"
                className="mt-6 w-full"
                order={{
                  product: items.map((item) => `${item.productName} — ${item.packLabel} × ${item.quantity} (Size ${item.size}, ${item.colours.join("/")})`).join("; "),
                  quantity: items.reduce((sum, item) => sum + item.quantity, 0),
                  payment: paymentMethods.find((method) => method.id === payment)!.label,
                  total: formatPrice(total),
                }}
              >
                Place order
              </WhatsAppButton>
              <p className="mt-3 text-xs text-muted-foreground">
                We confirm your order and delivery details before dispatch.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
