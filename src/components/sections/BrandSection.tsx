import { ActionLink } from "@/components/ActionLink";
import { Reveal } from "@/components/Reveal";

export function BrandSection() {
  return (
    <section className="bg-charcoal py-16 text-bone md:py-28" aria-labelledby="brand-title">
      <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-accent">About Honey Badger</p>
          <h2 id="brand-title" className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Built for how
            <br />
            you actually move.
          </h2>
        </Reveal>
        <Reveal delay={90} className="space-y-6 text-bone/70">
          <p className="text-lg leading-relaxed text-bone/85">
            Honey Badger Outfits is a men's clothing brand focused on comfortable, functional and
            modern everyday wear.
          </p>
          <p className="leading-relaxed">
            We started with one product and one standard: a track pant that stretches in every
            direction, stays light on the body and looks clean enough to wear outside the gym. No
            excess branding, no unnecessary detail — just fabric, fit and finish that hold up to
            daily use.
          </p>
          <div className="pt-2">
            <ActionLink to="/about" variant="outlineBone">
              Read more
            </ActionLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
