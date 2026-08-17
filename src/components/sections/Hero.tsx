import { ActionLink } from "@/components/ActionLink";
import { heroProduct, formatPrice, packs, productPhotos } from "@/data/products";

export function Hero() {
  return (
    <section className="relative isolate bg-ink text-bone" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10">
        <img
          src={productPhotos.wardrobe}
          alt="Honey Badger 4-way ultra-stretch track pants in olive, navy, black and sky blue hanging in a wardrobe"
          width={1440}
          height={1808}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="size-full object-cover object-[68%_center] opacity-90 md:object-[75%_center]"
        />
        <div
          className="absolute inset-0 bg-ink/78 md:bg-ink/45 md:[background:linear-gradient(90deg,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.76)_46%,rgba(10,10,10,0.12)_82%)]"
          aria-hidden="true"
        />
      </div>

      <div className="shell flex min-h-[92svh] flex-col justify-end pt-32 pb-14 md:min-h-[94svh] md:justify-center md:pt-28 md:pb-24">
        <div className="max-w-xl">
          <p className="eyebrow animate-in fade-in slide-in-from-bottom-2 text-accent duration-700">
            Honey Badger Outfits · Men's Wear
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
            A men's wear label built for movement. First release: 4-way ultra-stretch lycra track
            pants — high elasticity, breathable, quick-dry, secure zipped side pocket. From ₹350,
            with 3 pc and 5 pc combos.
          </p>

          <div className="animate-in fade-in mt-9 flex flex-col gap-3 duration-1000 sm:flex-row">
            <ActionLink to="/track-pants" variant="solidBone" size="lg">
              Shop Track Pants
            </ActionLink>
            <ActionLink to="/size-guide" variant="outline" size="lg">
              Size Guide
            </ActionLink>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-hairline-ink pt-6 text-xs">
            <div>
              <dt className="text-bone/50 uppercase tracking-[0.18em]">Fabric</dt>
              <dd className="mt-1 font-display font-bold tracking-wide text-bone">
                4-Way Ultra-Stretch Lycra
              </dd>
            </div>
            <div>
              <dt className="text-bone/50 uppercase tracking-[0.18em]">Sizes</dt>
              <dd className="mt-1 font-display font-bold tracking-wide text-bone">
                {heroProduct.sizes.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="text-bone/50 uppercase tracking-[0.18em]">Colours</dt>
              <dd className="mt-1 font-display font-bold tracking-wide text-bone">
                {heroProduct.colours.length} essentials
              </dd>
            </div>
            <div>
              <dt className="text-bone/50 uppercase tracking-[0.18em]">From</dt>
              <dd className="mt-1 font-display font-bold tracking-wide text-bone">
                {formatPrice(packs[0]!.price)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
