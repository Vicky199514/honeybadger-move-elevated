import heroImage from "@/assets/hero-track-pant.jpg";
import { ActionLink } from "@/components/ActionLink";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { heroProduct, formatPrice } from "@/data/products";

export function Hero() {
  return (
    <section className="relative isolate bg-ink text-bone" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Model wearing the HB 4-way stretch track pant mid-stride"
          width={1440}
          height={1808}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="size-full object-cover object-[62%_center] opacity-90 md:object-[70%_center]"
        />
        <div
          className="absolute inset-0 bg-ink/72 md:bg-ink/45 md:[background:linear-gradient(90deg,rgba(10,10,10,0.94)_0%,rgba(10,10,10,0.72)_46%,rgba(10,10,10,0.1)_82%)]"
          aria-hidden="true"
        />
      </div>

      <div className="shell flex min-h-[92svh] flex-col justify-end pt-32 pb-14 md:min-h-[94svh] md:justify-center md:pt-28 md:pb-24">
        <div className="max-w-xl">
          <p className="eyebrow animate-in fade-in slide-in-from-bottom-2 text-accent duration-700">
            Honey Badger Outfits · Men's Sportswear
          </p>
          <h1
            id="hero-title"
            className="animate-in fade-in slide-in-from-bottom-4 mt-5 text-[clamp(2.75rem,13vw,6.5rem)] leading-[0.86] duration-700"
          >
            Move
            <br />
            Different<span className="text-accent">.</span>
          </h1>
          <p className="animate-in fade-in mt-6 max-w-md text-base leading-relaxed text-bone/75 duration-1000 sm:text-lg">
            Premium stretch track pants built for movement, comfort and everyday wear.
          </p>

          <div className="animate-in fade-in mt-9 flex flex-col gap-3 duration-1000 sm:flex-row">
            <ActionLink to="/track-pants" variant="solidBone" size="lg">
              Shop Track Pants
            </ActionLink>
            <WhatsAppButton variant="outline" size="lg">
              Order on WhatsApp
            </WhatsAppButton>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-hairline-ink pt-6 text-xs">
            <div>
              <dt className="text-bone/50 uppercase tracking-[0.18em]">Fabric</dt>
              <dd className="mt-1 font-display font-bold tracking-wide text-bone">4-Way Stretch Lycra</dd>
            </div>
            <div>
              <dt className="text-bone/50 uppercase tracking-[0.18em]">Sizes</dt>
              <dd className="mt-1 font-display font-bold tracking-wide text-bone">
                {heroProduct.sizes.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="text-bone/50 uppercase tracking-[0.18em]">From</dt>
              <dd className="mt-1 font-display font-bold tracking-wide text-bone">
                {formatPrice(heroProduct.price)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
