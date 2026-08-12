import { Check } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { formatPrice, heroProduct } from "@/data/products";

export function FeaturedProduct() {
  const product = heroProduct;
  const [front, back, detail] = product.images;

  return (
    <section className="bg-bone py-16 md:py-28" aria-labelledby="featured-title">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="grid grid-cols-2 gap-3">
          <div className="col-span-2 aspect-[4/3] overflow-hidden bg-secondary">
            <img
              src={front!.src}
              alt={front!.alt}
              width={1024}
              height={1280}
              loading="lazy"
              decoding="async"
              className="size-full object-cover object-center"
            />
          </div>
          <div className="aspect-square overflow-hidden bg-secondary">
            <img
              src={back!.src}
              alt={back!.alt}
              width={1024}
              height={1280}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden bg-secondary">
            <img
              src={detail!.src}
              alt={detail!.alt}
              width={1280}
              height={960}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="eyebrow text-muted-foreground">The hero product</p>
          <h2 id="featured-title" className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            The HB 4-Way Stretch Track Pant
          </h2>
          <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <p className="mt-7 font-display text-2xl font-extrabold">
            {formatPrice(product.price)}
            <span className="ml-2 align-middle font-body text-xs font-normal tracking-wide text-muted-foreground uppercase">
              Price placeholder
            </span>
          </p>

          <dl className="mt-7 grid gap-5 border-y border-hairline py-6 sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-muted-foreground">Sizes</dt>
              <dd className="mt-2 font-display font-bold">{product.sizes.join(" · ")}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Colours</dt>
              <dd className="mt-2 flex items-center gap-3">
                {product.colours.map((colour) => (
                  <span key={colour.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="size-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: colour.hex }}
                      aria-hidden="true"
                    />
                    {colour.name}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ActionLink
              to="/track-pants/$slug"
              params={{ slug: product.slug }}
              variant="solidInk"
              size="lg"
            >
              View Product
            </ActionLink>
            <WhatsAppButton
              order={{ product: product.name, colour: product.colours[0]!.name, size: "M", quantity: 1 }}
              size="lg"
            >
              Order on WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
