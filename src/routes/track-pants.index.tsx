import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Faq } from "@/components/sections/Faq";
import { products } from "@/data/products";

const title = "Men's 4-Way Ultra-Stretch Lycra Track Pants — Honey Badger Outfits";
const description =
  "Shop 4-way ultra-stretch lycra track pants for men in Black, Navy, Olive, Charcoal and Sky Blue. Sizes M to XXL, zipped side pocket.";

export const Route = createFileRoute("/track-pants/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/track-pants" },
    ],
    links: [{ rel: "canonical", href: "/track-pants" }],
  }),
  component: TrackPants,
});

function TrackPants() {
  return (
    <>
      <header className="bg-ink pt-32 pb-14 text-bone md:pt-40 md:pb-20">
        <div className="shell">
          <p className="eyebrow text-accent">Collection</p>
          <h1 className="mt-4 text-[clamp(2.25rem,9vw,5rem)] leading-[0.9]">
            Track Pants<span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-bone/65">
            One construction, five colours, built around 4-way ultra-stretch lycra. Choose your colour and order in a message.
          </p>
        </div>
      </header>

      <section className="bg-background py-12 md:py-20" aria-label="Products">
        <div className="shell grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:gap-x-8">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 80} className={index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <ProductCard product={product} tall={index === 0} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      <FeatureGrid />
      <Faq />
    </>
  );
}
