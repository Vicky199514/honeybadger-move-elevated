import { ActionLink } from "@/components/ActionLink";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { productPhotos } from "@/data/products";

export function GalleryStrip() {
  return (
    <section className="bg-background py-16 md:py-28" aria-labelledby="gallery-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The details"
            title="Every side of it."
            copy="Five colours on the rail, a clean rear panel and a zip pocket that actually holds your phone."
          />
          <ActionLink to="/track-pants" variant="outlineInk">
            Shop the range
          </ActionLink>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <figure className="aspect-[4/5] overflow-hidden bg-secondary md:aspect-[4/4.6]">
              <img
                src={productPhotos.wardrobe}
                alt="Olive, navy, black and sky blue Honey Badger track pants hanging side by side"
                width={1024}
                height={1280}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </figure>
          </Reveal>

          <div className="grid gap-4 md:col-span-5">
            <Reveal delay={80}>
              <figure className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={productPhotos.rearPanel}
                  alt="Rear view of the black track pant showing the clean rear panel with no rear pockets"
                  width={1280}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </figure>
            </Reveal>
            <Reveal delay={160}>
              <figure className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={productPhotos.specGuide}
                  alt="Specification guide showing the zipped right pocket and open left pocket"
                  width={1280}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </figure>
            </Reveal>
          </div>

          <Reveal delay={80} className="md:col-span-12">
            <figure className="aspect-[16/10] overflow-hidden bg-secondary md:aspect-[21/7]">
              <img
                src={productPhotos.foldedStack}
                alt="Folded stack of 4-way ultra-stretch lycra track pants beside a pair showing the secure zip pocket"
                width={1440}
                height={900}
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
