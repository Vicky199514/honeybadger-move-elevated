import { Check, LockKeyhole, MoveDiagonal, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { productPhotos } from "@/data/products";
import { Reveal } from "@/components/Reveal";

export function VideoSection() {
  return (
    <section className="bg-ink py-16 text-bone md:py-28" aria-labelledby="video-title">
      <div className="shell">
        <div className="max-w-xl">
          <p className="eyebrow text-accent">Product in motion</p>
          <h2 id="video-title" className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Built to move<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 leading-relaxed text-bone/65">
            Every detail is there for the way you move through a real day.
          </p>
        </div>

        <Reveal className="mt-10 grid gap-px bg-hairline sm:grid-cols-[1.1fr_0.9fr]">
          <figure className="relative aspect-[4/5] overflow-hidden bg-charcoal sm:aspect-auto sm:min-h-[28rem]">
            <img
              src={productPhotos.foldedStack}
              alt="Folded stack of Honey Badger track pants beside a pair showing the secure zipped pocket"
              width={1440}
              height={1808}
              loading="lazy"
              decoding="async"
              className="size-full object-cover object-[60%_30%]"
            />
          </figure>
          <div className="bg-bone p-7 text-ink sm:p-10">
            <p className="eyebrow text-muted-foreground">The construction</p>
            <h3 className="mt-4 text-2xl sm:text-3xl">The details do the work.</h3>
            <ul className="mt-8 space-y-5" role="list">
              {[
                [MoveDiagonal, "4-way stretch", "Flexible lycra moves with you."],
                [Wind, "Breathable knit", "Light, quick-drying comfort."],
                [LockKeyhole, "Secure right pocket", "Zip away your phone or keys."],
                [Check, "Clean rear panel", "No rear pockets. No extra bulk."],
              ].map(([Icon, title, copy]) => {
                const FeatureIcon = Icon as LucideIcon;
                return (
                <li key={title as string} className="flex gap-3">
                  <FeatureIcon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <p className="font-display text-xs font-bold tracking-[0.12em] uppercase">{title as string}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{copy as string}</p>
                  </div>
                </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
