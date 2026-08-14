import { ActionLink } from "@/components/ActionLink";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { COD_FEE, formatPrice, heroProduct, packSaving, packs } from "@/data/products";

/** Buying options for the track pant: single piece and multi-piece combos. */
export function PricingOptions() {
  return (
    <section className="bg-background py-16 md:py-24" aria-labelledby="pricing-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Track pant options"
          title="One piece or a combo."
          copy="Buy a single pair or stock up with a combo — the more you take, the less each pair costs."
          className="[&>h2]:text-3xl"
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-3" role="list">
          {packs.map((pack, index) => {
            const saving = packSaving(pack);
            const each = Math.round(pack.price / pack.quantity);
            return (
              <Reveal
                key={pack.id}
                delay={index * 70}
                className="flex flex-col border border-hairline bg-bone p-6"
              >
                <p className="font-display text-sm font-bold tracking-[0.16em] uppercase">
                  {pack.label}
                </p>
                <p className="mt-4 font-display text-3xl font-extrabold">{formatPrice(pack.price)}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatPrice(each)} per pant
                  {saving > 0 ? ` · save ${formatPrice(saving)}` : ""}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{pack.note}</p>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col items-start gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Prepaid has no extra charge. Cash on delivery adds a {formatPrice(COD_FEE)} handling
            charge.
          </p>
          <ActionLink
            to="/track-pants/$slug"
            params={{ slug: heroProduct.slug }}
            variant="solidInk"
            size="lg"
          >
            Choose your option
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
