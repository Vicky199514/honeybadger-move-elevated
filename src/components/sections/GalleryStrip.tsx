import lifestyle from "@/assets/lifestyle-charcoal.jpg";
import hero from "@/assets/hero-track-pant.jpg";
import fabric from "@/assets/track-pant-fabric.jpg";
import detail from "@/assets/track-pant-detail.jpg";
import { ActionLink } from "@/components/ActionLink";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function GalleryStrip() {
  return (
    <section className="bg-background py-16 md:py-28" aria-labelledby="gallery-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The campaign"
            title="Worn, not styled."
            copy="Shot the way the pant is actually used — moving, sitting, travelling."
          />
          <ActionLink to="/track-pants" variant="outlineInk">
            Shop the range
          </ActionLink>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <figure className="aspect-[4/5] overflow-hidden bg-secondary md:aspect-[4/4.6]">
              <img
                src={lifestyle}
                alt="Man in charcoal HB track pants seated on concrete steps"
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
                  src={fabric}
                  alt="Four-way stretch lycra fabric pulled to show elasticity"
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
                  src={detail}
                  alt="Detail of the ribbed ankle cuff and stitching"
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
                src={hero}
                alt="Full-width campaign image of the HB track pant in motion"
                width={1440}
                height={1808}
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-[center_32%] transition-transform duration-700 hover:scale-[1.02]"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
