import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FeaturedProduct } from "@/components/sections/FeaturedProduct";
import { GalleryStrip } from "@/components/sections/GalleryStrip";
import { BrandSection } from "@/components/sections/BrandSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { SizeGuide } from "@/components/sections/SizeGuide";
import { Faq } from "@/components/sections/Faq";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { formatPrice, heroProduct } from "@/data/products";
import { faqs } from "@/data/faq";

const title = "Honey Badger Outfits — Premium 4-Way Stretch Track Pants for Men";
const description =
  "Premium men's 4-way stretch lycra track pants built for movement, comfort and everyday wear. Order directly on WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <FeaturedProduct />
      <Colourways />
      <GalleryStrip />
      <VideoSection />
      <BrandSection />
      <SizeGuide compact />
      <Faq />
      <StickyMobileCta
        order={{ product: heroProduct.name, colour: heroProduct.colours[0]!.name, size: "L", quantity: 1 }}
        price={formatPrice(heroProduct.price)}
        meta="4-Way Ultra-Stretch Lycra Track Pant"
      />

    </>
  );
}
