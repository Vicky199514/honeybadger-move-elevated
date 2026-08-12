import { Link } from "@tanstack/react-router";
import { Check, Minus, Plus, Ruler, Truck } from "lucide-react";
import { useState } from "react";
import { formatPrice, type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StickyMobileCta } from "@/components/StickyMobileCta";

export function ProductDetails({ product }: { product: Product }) {
  const [colour, setColour] = useState(product.colours[0]!.name);
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]!);
  const [quantity, setQuantity] = useState(1);

  const order = { product: product.name, colour, size, quantity };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl leading-[0.95] sm:text-4xl">{product.name}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{product.subtitle}</p>
        <p className="mt-5 font-display text-2xl font-extrabold">
          {formatPrice(product.price)}
          <span className="ml-2 align-middle font-body text-xs font-normal tracking-wide text-muted-foreground uppercase">
            Price placeholder
          </span>
        </p>
        <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground">{product.description}</p>
      </div>

      <fieldset>
        <legend className="eyebrow text-muted-foreground">
          Colour — <span className="text-foreground">{colour}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {product.colours.map((option) => (
            <button
              key={option.name}
              type="button"
              onClick={() => setColour(option.name)}
              aria-pressed={colour === option.name}
              className={cn(
                "flex min-h-11 items-center gap-2.5 rounded-sm border px-3.5 text-xs font-medium tracking-wide uppercase transition-colors",
                colour === option.name
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

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-sm border border-border">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="grid size-11 place-items-center text-muted-foreground hover:text-foreground"
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <span
            className="min-w-10 text-center font-display text-sm font-bold"
            aria-live="polite"
            aria-label={`Quantity ${quantity}`}
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="grid size-11 place-items-center text-muted-foreground hover:text-foreground"
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <WhatsAppButton order={order} size="lg" className="min-w-0 flex-1">
          Order on WhatsApp
        </WhatsAppButton>
      </div>

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
        price={formatPrice(product.price)}
        meta={`${colour} · Size ${size}`}
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
