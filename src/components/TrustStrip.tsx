import { Check, CreditCard, Palette, Ruler } from "lucide-react";

const trustItems = [
  { icon: Palette, label: "5 colourways", detail: "Choose your everyday shade" },
  { icon: Ruler, label: "Sizes M–XXL", detail: "Use the size guide before ordering" },
  { icon: CreditCard, label: "COD available", detail: "₹30 handling charge applies" },
  { icon: Check, label: "Order support", detail: "Our team confirms details directly" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-bone" aria-label="Shopping information">
      <div className="shell grid sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="flex items-start gap-3 border-b border-border px-0 py-5 last:border-0 sm:px-5 sm:even:border-r lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-0 lg:last:pr-0">
            <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" strokeWidth={1.75} />
            <div>
              <p className="font-display text-xs font-bold tracking-[0.12em] uppercase">{label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}