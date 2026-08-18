import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, Lock, RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import {
  COD_FEE,
  formatPrice,
  getColourway,
  paymentMethods,
} from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const title = "Checkout — Honey Badger Outfits";
const description =
  "Enter your delivery details, choose prepaid or cash on delivery and place your Honey Badger track pant order.";

export const Route = createFileRoute("/checkout")({
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
  component: CheckoutPage,
});

type Fields = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
};

const empty: Fields = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

function validate(fields: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (fields.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^[6-9]\d{9}$/.test(fields.phone.replace(/\s|-/g, "")))
    errors.phone = "Enter a valid 10-digit mobile number.";
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email))
    errors.email = "Enter a valid email or leave it blank.";
  if (fields.address.trim().length < 8) errors.address = "Enter your full street address.";
  if (!fields.city.trim()) errors.city = "Enter your city.";
  if (!fields.state.trim()) errors.state = "Enter your state.";
  if (!/^\d{6}$/.test(fields.pincode.trim())) errors.pincode = "Enter a 6-digit PIN code.";
  return errors;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, total, payment, setPayment, ready, clear } = useCart();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [placed, setPlaced] = useState(false);

  const pieces = useMemo(
    () => items.reduce((sum, item) => sum + item.piecesPerPack * item.quantity, 0),
    [items],
  );

  const set = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    const paymentLabel = paymentMethods.find((method) => method.id === payment)!.label;
    const url = buildWhatsAppUrl({
      product: items
        .map(
          (item) =>
            `${item.productName} — ${item.packLabel} × ${item.quantity} (Size ${item.size}, ${item.colours.join("/")})`,
        )
        .join("; "),
      quantity: pieces,
      payment: paymentLabel,
      total: formatPrice(total),
      details: [
        "Delivery details",
        `Name: ${fields.name}`,
        `Phone: ${fields.phone}`,
        ...(fields.email ? [`Email: ${fields.email}`] : []),
        `Address: ${fields.address}`,
        `City: ${fields.city} — ${fields.state} ${fields.pincode}`,
        ...(fields.notes ? [`Notes: ${fields.notes}`] : []),
      ],
    });

    window.open(url, "_blank", "noopener,noreferrer");
    clear();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="bg-background pt-32 pb-24 md:pt-40">
        <div className="shell max-w-xl text-center">
          <CheckCircle2 className="mx-auto size-10 text-accent" />
          <h1 className="mt-6 text-[clamp(1.75rem,6vw,2.75rem)] leading-[1]">
            Order placed<span className="text-accent">.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Thanks {fields.name.split(" ")[0]}. Your order summary has been sent to our team on
            WhatsApp — we confirm your address and dispatch timeline there before shipping.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/track-pants"
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-ink px-7 font-display text-sm font-bold tracking-[0.16em] text-bone uppercase"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background pt-28 pb-24 md:pt-36">
      <div className="shell">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase">
            <li>
              <Link to="/cart" className="hover:text-foreground">
                Cart
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">Checkout</li>
          </ol>
        </nav>

        <h1 className="mt-5 text-[clamp(2rem,7vw,3.5rem)] leading-[0.95]">
          Checkout<span className="text-accent">.</span>
        </h1>
        <p className="mt-3 max-w-prose text-sm text-muted-foreground">
          Delivery across India. Prepaid by UPI or bank transfer, or pay cash on delivery for
          {` ${formatPrice(COD_FEE)}`} extra.
        </p>

        {!ready ? null : items.length === 0 ? (
          <div className="mt-10 border border-border p-8 text-center">
            <ShoppingBag className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">
              Your cart is empty, so there is nothing to check out yet.
            </p>
            <button
              type="button"
              onClick={() => void navigate({ to: "/track-pants" })}
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-sm bg-ink px-7 font-display text-sm font-bold tracking-[0.16em] text-bone uppercase"
            >
              Shop track pants
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.85fr] lg:items-start lg:gap-14">
            <form onSubmit={onSubmit} noValidate className="space-y-10">
              <section aria-labelledby="contact-title">
                <Step number={1} id="contact-title" title="Contact" />
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    value={fields.name}
                    onChange={set("name")}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Field
                    label="Mobile number"
                    value={fields.phone}
                    onChange={set("phone")}
                    error={errors.phone}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    hint="We confirm your order on this number."
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Email (optional)"
                      value={fields.email}
                      onChange={set("email")}
                      error={errors.email}
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                </div>
              </section>

              <section aria-labelledby="delivery-title">
                <Step number={2} id="delivery-title" title="Delivery address" />
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field
                      label="Street address"
                      value={fields.address}
                      onChange={set("address")}
                      error={errors.address}
                      autoComplete="street-address"
                      textarea
                    />
                  </div>
                  <Field
                    label="City"
                    value={fields.city}
                    onChange={set("city")}
                    error={errors.city}
                    autoComplete="address-level2"
                  />
                  <Field
                    label="State"
                    value={fields.state}
                    onChange={set("state")}
                    error={errors.state}
                    autoComplete="address-level1"
                  />
                  <Field
                    label="PIN code"
                    value={fields.pincode}
                    onChange={set("pincode")}
                    error={errors.pincode}
                    inputMode="numeric"
                    autoComplete="postal-code"
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Delivery notes (optional)"
                      value={fields.notes}
                      onChange={set("notes")}
                      textarea
                    />
                  </div>
                </div>
              </section>

              <section aria-labelledby="payment-title">
                <Step number={3} id="payment-title" title="Payment method" />
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPayment(method.id)}
                      aria-pressed={payment === method.id}
                      className={cn(
                        "rounded-sm border p-4 text-left transition-colors",
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
                          "mt-1.5 block text-xs",
                          payment === method.id ? "text-bone/65" : "text-muted-foreground",
                        )}
                      >
                        {method.note}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <button
                type="submit"
                className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-sm bg-accent px-8 font-display text-sm font-bold tracking-[0.16em] text-accent-foreground uppercase transition-colors hover:bg-accent/90"
              >
                <Lock className="size-4" /> Place order · {formatPrice(total)}
              </button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                By placing the order you agree to our{" "}
                <Link to="/terms" className="underline underline-offset-4">
                  terms
                </Link>{" "}
                and{" "}
                <Link to="/shipping-returns" className="underline underline-offset-4">
                  shipping &amp; returns
                </Link>{" "}
                policy.
              </p>
            </form>

            <aside className="lg:sticky lg:top-28">
              <div className="border border-border">
                <h2 className="eyebrow border-b border-border p-5 text-muted-foreground">
                  Order summary
                </h2>

                <ul className="divide-y divide-border" role="list">
                  {items.map((item) => (
                    <li key={item.key} className="flex gap-4 p-5">
                      <div className="grid shrink-0 grid-cols-1 gap-1">
                        {item.colours.slice(0, 2).map((name) => {
                          const colour = getColourway(name);
                          return colour ? (
                            <img
                              key={name}
                              src={colour.image}
                              alt={`${item.productName} in ${name}`}
                              width={1024}
                              height={1280}
                              loading="lazy"
                              decoding="async"
                              className="size-16 bg-secondary object-cover"
                            />
                          ) : null;
                        })}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm font-bold tracking-wide uppercase">
                          {item.productName}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.packLabel} · Size {item.size} · × {item.quantity}
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1.5" role="list">
                          {item.colours.map((name) => {
                            const colour = getColourway(name);
                            return (
                              <li
                                key={name}
                                className="inline-flex items-center gap-1.5 border border-border px-2 py-1 text-[11px] tracking-wide uppercase"
                              >
                                <span
                                  className="size-2.5 rounded-full border border-black/20"
                                  style={{ backgroundColor: colour?.hex }}
                                  aria-hidden="true"
                                />
                                {name}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <p className="font-display text-sm font-extrabold">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                <dl className="grid gap-2 border-t border-border p-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Subtotal ({pieces} pcs)</dt>
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

                <ul className="grid gap-3 border-t border-border p-5 text-xs text-muted-foreground" role="list">
                  <li className="flex items-center gap-2.5">
                    <Truck className="size-4 shrink-0" /> Delivered across India
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="size-4 shrink-0" /> Order confirmed before dispatch
                  </li>
                  <li className="flex items-center gap-2.5">
                    <RotateCcw className="size-4 shrink-0" /> Easy size exchange
                  </li>
                </ul>
              </div>

              <Link
                to="/cart"
                className="mt-4 inline-block text-xs tracking-wide text-muted-foreground uppercase underline underline-offset-4 hover:text-foreground"
              >
                Edit cart
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function Step({ number, id, title }: { number: number; id: string; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-border pb-3">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink font-display text-xs font-extrabold text-bone">
        {number}
      </span>
      <h2 id={id} className="font-display text-base font-bold tracking-[0.1em] uppercase">
        {title}
      </h2>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  textarea,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string | undefined;
  hint?: string | undefined;
  type?: string | undefined;
  inputMode?: "numeric" | "text" | "tel" | undefined;
  autoComplete?: string | undefined;
  textarea?: boolean | undefined;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  const base = cn(
    "mt-2 w-full rounded-sm border bg-background px-3.5 py-3 text-sm outline-none transition-colors focus:border-ink",
    error ? "border-destructive" : "border-border",
  );

  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={3}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(base, "resize-y")}
          {...rest}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={base}
          {...rest}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
