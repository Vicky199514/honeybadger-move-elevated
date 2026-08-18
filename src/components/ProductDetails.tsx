import { Link, useNavigate } from "@tanstack/react-router";
import { Check, Minus, Plus, Ruler, ShoppingBag, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  COD_FEE,
  formatPrice,
  packSaving,
  packs,
  paymentMethods,
  type PaymentMethod,
  type Product,
} from "@/data/products";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { StickyMobileCta } from "@/components/StickyMobileCta";

export function ProductDetails({
  product,
  onColourChange,
}: {
  product: Product;
  /** Reports the primary selected colour so the gallery can show that photo. */
  onColourChange?: (colour: string) => void;
}) {
  const navigate = useNavigate();
  const cart = useCart();
  const [packId, setPackId] = useState(packs[0]!.id);
  const [colours, setColours] = useState<string[]>([product.colours[0]!.name]);
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]!);
  const [payment, setPayment] = useState<PaymentMethod>("prepaid");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (colours[0]) onColourChange?.(colours[0]);
  }, [colours[0], onColourChange]);

  const pack = packs.find((option) => option.id === packId) ?? packs[0]!;
  const multi = pack.quantity > 1;
  const lineTotal = pack.price * quantity;
  const total = lineTotal + (payment === "cod" ? COD_FEE : 0);
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

  const addToCart = () => {
    if (!colours.length) {
      toast.error("Pick a colour first.");
      return false;
    }
    cart.setPayment(payment);
    cart.add({
      productSlug: product.slug,
      productName: product.name,
      packId: pack.id,
      packLabel: pack.label,
      colours,
      size,
      unitPrice: pack.price,
      piecesPerPack: pack.quantity,
      quantity,
    });
    return true;
  };

  const onAddToCart = () => {
    if (addToCart()) toast.success(`${pack.label} · Size ${size} added to cart`);
  };

  const onBuyNow = () => {
    if (addToCart()) void navigate({ to: "/checkout" });
  };

  const optionsPanel = (
    <div className="space-y-5">
      <PackPicker packId={packId} onSelect={selectPack} compact />
      <ColourPicker product={product} colours={colours} multi={multi} onToggle={toggleColour} />
      <SizePicker product={product} size={size} onSelect={setSize} />
      <QuantityPicker quantity={quantity} onChange={setQuantity} />
      <PaymentPicker payment={payment} onSelect={setPayment} compact />
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl leading-[0.95] sm:text-4xl">{product.name}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{product.subtitle}</p>
        <p className="mt-5 font-display text-2xl font-extrabold">
          {formatPrice(total)}
          <span className="ml-2 align-middle font-body text-xs font-normal tracking-wide text-muted-foreground uppercase">
            {pack.label}
            {quantity > 1 ? ` × ${quantity}` : ""}
            {payment === "cod" ? ` · incl. ${formatPrice(COD_FEE)} COD` : ""}
          </span>
        </p>
        <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground">{product.description}</p>
      </div>

      <fieldset>
        <legend className="eyebrow text-muted-foreground">Choose your option</legend>
        <div className="mt-3">
          <PackPicker packId={packId} onSelect={selectPack} />
        </div>
      </fieldset>

      <fieldset>
        <ColourPicker product={product} colours={colours} multi={multi} onToggle={toggleColour} />
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
        <QuantityPicker quantity={quantity} onChange={setQuantity} />
      </fieldset>

      <fieldset>
        <legend className="eyebrow text-muted-foreground">Payment</legend>
        <div className="mt-3">
          <PaymentPicker payment={payment} onSelect={setPayment} />
        </div>
      </fieldset>

      <dl className="grid gap-2 border-y border-border py-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">
            {pack.label} ({pack.quantity} × track pant){quantity > 1 ? ` × ${quantity}` : ""}
          </dt>
          <dd>{formatPrice(lineTotal)}</dd>
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

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onAddToCart}
          className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-sm border border-ink px-7 font-display text-sm font-bold tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-bone"
        >
          <ShoppingBag className="size-4" /> Add to cart
        </button>
        <button
          type="button"
          onClick={onBuyNow}
          className="inline-flex min-h-13 items-center justify-center rounded-sm bg-accent px-7 font-display text-sm font-bold tracking-[0.16em] text-accent-foreground uppercase transition-colors hover:bg-accent/90"
        >
          Buy now
        </button>
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
        price={formatPrice(total)}
        meta={`${pack.label}${quantity > 1 ? ` × ${quantity}` : ""} · Size ${size} · ${paymentLabel}`}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      >
        {optionsPanel}
      </StickyMobileCta>
    </div>
  );
}

function PackPicker({
  packId,
  onSelect,
  compact,
}: {
  packId: string;
  onSelect: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={cn("grid gap-2.5", compact ? "grid-cols-3" : "sm:grid-cols-3")}>
      {packs.map((option) => {
        const saving = packSaving(option);
        const selected = packId === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            aria-pressed={selected}
            className={cn(
              "rounded-sm border text-left transition-colors",
              compact ? "p-3" : "p-4",
              selected ? "border-ink bg-ink text-bone" : "border-border hover:border-ink",
            )}
          >
            <span className="block font-display text-xs font-bold tracking-wide uppercase sm:text-sm">
              {option.label}
            </span>
            <span className={cn("mt-1.5 block font-display font-extrabold", compact ? "text-base" : "text-lg")}>
              {formatPrice(option.price)}
            </span>
            <span
              className={cn(
                "mt-1 block text-[11px] sm:text-xs",
                selected ? "text-bone/65" : "text-muted-foreground",
              )}
            >
              {saving > 0 ? `Save ${formatPrice(saving)}` : option.note}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ColourPicker({
  product,
  colours,
  multi,
  onToggle,
}: {
  product: Product;
  colours: string[];
  multi: boolean;
  onToggle: (name: string) => void;
}) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">
        {multi ? `Colours — pick ${colours.length}/` : "Colour — "}
        <span className="text-foreground">{colours.join(", ") || "select"}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {product.colours.map((option) => (
          <button
            key={option.name}
            type="button"
            onClick={() => onToggle(option.name)}
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
    </div>
  );
}

function SizePicker({
  product,
  size,
  onSelect,
}: {
  product: Product;
  size: string;
  onSelect: (size: string) => void;
}) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">
        Size — <span className="text-foreground">{size}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {product.sizes.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
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
    </div>
  );
}

function QuantityPicker({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">Quantity</p>
      <div className="mt-3 inline-flex items-center rounded-sm border border-border">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, quantity - 1))}
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
          className="grid size-11 place-items-center transition-colors hover:bg-secondary disabled:opacity-40"
        >
          <Minus className="size-4" />
        </button>
        <span aria-live="polite" className="min-w-11 text-center font-display text-base font-extrabold">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(99, quantity + 1))}
          aria-label="Increase quantity"
          className="grid size-11 place-items-center transition-colors hover:bg-secondary"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}

function PaymentPicker({
  payment,
  onSelect,
  compact,
}: {
  payment: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  compact?: boolean;
}) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {paymentMethods.map((method) => (
        <button
          key={method.id}
          type="button"
          onClick={() => onSelect(method.id)}
          aria-pressed={payment === method.id}
          className={cn(
            "rounded-sm border text-left transition-colors",
            compact ? "p-3" : "p-4",
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
