import { Link } from "@tanstack/react-router";
import { Check, Ruler, Truck } from "lucide-react";
import { useState } from "react";
import {
  COD_FEE,
  formatPrice,
  orderTotal,
  packSaving,
  packs,
  paymentMethods,
  type PaymentMethod,
  type Product,
} from "@/data/products";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StickyMobileCta } from "@/components/StickyMobileCta";

export function ProductDetails({ product }: { product: Product }) {
  const [packId, setPackId] = useState(packs[0]!.id);
  const [colours, setColours] = useState<string[]>([product.colours[0]!.name]);
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]!);
  const [payment, setPayment] = useState<PaymentMethod>("prepaid");

  const pack = packs.find((option) => option.id === packId) ?? packs[0]!;
  const multi = pack.quantity > 1;
  const total = orderTotal(pack, payment);
  const paymentLabel = paymentMethods.find((method) => method.id === payment)!.label;

  const toggleColour = (name: string) => {
    if (!multi) {
      setColours([name]);
      return;
    }
    setColours((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : current.length >= pack.quantity
          ? [...current.slice(1), name]
          : [...current, name],
    );
  };

  const selectPack = (id: string) => {
    setPackId(id);
    const next = packs.find((option) => option.id === id)!;
    setColours((current) => (next.quantity === 1 ? current.slice(0, 1) : current.slice(0, next.quantity)));
  };

  const order = {
    product: product.name,
    pack: pack.label,
    colour: colours.join(", "),
    size,
    quantity: pack.quantity,
    payment: payment === "cod" ? `Cash on delivery (+${formatPrice(COD_FEE)})` : paymentLabel,
    total: formatPrice(total),
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl leading-[0.95] sm:text-4xl">{product.name}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{product.subtitle}</p>
        <p className="mt-5 font-display text-2xl font-extrabold">
          {formatPrice(total)}
          <span className="ml-2 align-middle font-body text-xs font-normal tracking-wide text-muted-foreground uppercase">
            {pack.label}
            {payment === "cod" ? ` · incl. ${formatPrice(COD_FEE)} COD` : ""}
          </span>
        </p>
        <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground">{product.description}</p>
      </div>

      <fieldset>
        <legend className="eyebrow text-muted-foreground">Choose your option</legend>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
          {packs.map((option) => {
            const saving = packSaving(option);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => selectPack(option.id)}
                aria-pressed={packId === option.id}
                className={cn(
                  "rounded-sm border p-4 text-left transition-colors",
                  packId === option.id ? "border-ink bg-ink text-bone" : "border-border hover:border-ink",
                )}
              >
                <span className="block font-display text-sm font-bold tracking-wide uppercase">
                  {option.label}
                </span>
                <span className="mt-2 block font-display text-lg font-extrabold">
                  {formatPrice(option.price)}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-xs",
                    packId === option.id ? "text-bone/65" : "text-muted-foreground",
                  )}
                >
                  {saving > 0 ? `Save ${formatPrice(saving)} · ${option.note}` : option.note}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow text-muted-foreground">
          {multi ? `Colours — pick ${pack.quantity} · ` : "Colour — "}
          <span className="text-foreground">{colours.join(", ") || "select"}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {product.colours.map((option) => (
            <button
              key={option.name}
              type="button"
              onClick={() => toggleColour(option.name)}
              aria-pressed={colours.includes(option.name)}
              className={cn(
                "flex min-h-11 items-center gap-2.5 rounded-sm border px-3.5 text-xs font-medium tracking-wide uppercase transition-colors",
                colours.includes(option.name)
                  ? "border-ink bg-ink text-bone"
                  : "border-border hover:border-ink",
              )}
            >
              <span
                className="size-4 rounded-full border border-black/20"
                style={{ backgroundColor: option.hex }}
                aria-hidden="true"
              />
              {option.name}
            </button>
          ))}
        </div>
        {multi ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Repeat colours or swap any of them — just tell us in the WhatsApp message.
          </p>
        ) : null}
      </fieldset>

      <fieldset>
        <div className="flex items-baseline justify-between gap-4">
          <legend className="eyebrow text-muted-foreground">
            Size — <span className="text-foreground">{size}</span>
          </legend>
          <Link
            to="/size-guide"
            className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase underline decoration-1 underline-offset-4 hover:text-foreground"
          >
            <Ruler className="size-3.5" /> Size guide
          </Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              aria-pressed={size === option}
              className={cn(
                "min-h-11 min-w-13 rounded-sm border px-3 font-display text-sm font-bold transition-colors",
                size === option ? "border-ink bg-ink text-bone" : "border-border hover:border-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow text-muted-foreground">Payment</legend>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPayment(method.id)}
              aria-pressed={payment === method.id}
              className={cn(
                "rounded-sm border p-4 text-left transition-colors",
                payment === method.id ? "border-ink bg-ink text-bone" : "border-border hover:border-ink",
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
      </fieldset>

      <dl className="grid gap-2 border-y border-border py-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">
            {pack.label} ({pack.quantity} × track pant)
          </dt>
          <dd>{formatPrice(pack.price)}</dd>
        </div>
        {payment === "cod" ? (
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Cash on delivery charge</dt>
            <dd>{formatPrice(COD_FEE)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4 font-display text-base font-extrabold">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      <WhatsAppButton order={order} size="lg" className="w-full">
        Order on WhatsApp
      </WhatsAppButton>

      <p className="flex items-start gap-2.5 border-t border-border pt-6 text-sm text-muted-foreground">
        <Truck className="mt-0.5 size-4 shrink-0" />
        {product.delivery}
      </p>

      <div className="space-y-8 border-t border-border pt-8">
        <Spec title="Features">
          <ul className="space-y-2.5">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </Spec>
        <Spec title="Fabric">
          <p className="text-sm leading-relaxed text-muted-foreground">{product.fabric}</p>
        </Spec>
        <Spec title="Fit">
          <p className="text-sm leading-relaxed text-muted-foreground">{product.fit}</p>
        </Spec>
        <Spec title="Care">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {product.care.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Spec>
      </div>

      <StickyMobileCta
        order={order}
        price={formatPrice(total)}
        meta={`${pack.label} · Size ${size} · ${paymentLabel}`}
      />
    </div>
  );
}

function Spec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="eyebrow mb-3 text-foreground">{title}</h2>
      {children}
    </section>
  );
}
