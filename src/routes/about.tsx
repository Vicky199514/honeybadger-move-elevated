import { createFileRoute } from "@tanstack/react-router";
import { productPhotos } from "@/data/products";
import { BrandSection } from "@/components/sections/BrandSection";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const title = "About Honey Badger Outfits — Men's Everyday Sportswear";
const description =
  "Honey Badger Outfits is a men's clothing brand focused on comfortable, functional and modern everyday wear.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <header className="bg-ink pt-32 pb-14 text-bone md:pt-40 md:pb-20">
        <div className="shell">
          <p className="eyebrow text-accent">The brand</p>
          <h1 className="mt-4 max-w-2xl text-[clamp(2.25rem,8vw,4.5rem)] leading-[0.92]">
            Honey Badger Outfits
          </h1>
        </div>
      </header>

      <section className="bg-background py-14 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <img
              src={productPhotos.wardrobe}
              alt="Honey Badger 4-way ultra-stretch track pants in olive, navy, black and sky blue on a wardrobe rail"
              width={1024}
              height={1280}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={80} className="space-y-6">
            <h2 className="text-3xl sm:text-4xl">What we make</h2>
            <p className="leading-relaxed text-muted-foreground">
              Honey Badger Outfits is a men's clothing brand focused on comfortable, functional and
              modern everyday wear. Our first product is a 4-way stretch lycra track pant designed
              for movement — light on the body, clean in shape and easy to wear every day.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              We keep the range small on purpose. Every piece has to earn its place on fabric, fit
              and finish before we release it.
            </p>
            <p className="text-sm text-muted-foreground">
              PLACEHOLDER — add your founding story, location and manufacturing details when you're
              ready to share them.
            </p>
            <WhatsAppButton size="lg">Talk to us on WhatsApp</WhatsAppButton>
          </Reveal>
        </div>
      </section>

      <BrandSection />
    </>
  );
}
