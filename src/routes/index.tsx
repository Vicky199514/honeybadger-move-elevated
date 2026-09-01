import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FeaturedProduct } from "@/components/sections/FeaturedProduct";
import { GalleryStrip } from "@/components/sections/GalleryStrip";
import { Colourways } from "@/components/sections/Colourways";
import { Categories } from "@/components/sections/Categories";
import { PricingOptions } from "@/components/sections/PricingOptions";
import { TrustStrip } from "@/components/TrustStrip";

import { BrandSection } from "@/components/sections/BrandSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { SizeGuide } from "@/components/sections/SizeGuide";
import { Faq } from "@/components/sections/Faq";
import { ShopBar } from "@/components/ShopBar";
import { formatPrice, heroProduct, packs } from "@/data/products";
import { faqs } from "@/data/faq";

const title = "Honey Badger Outfits — Men's Wear | Ultra-Stretch Track Pants";
const description =
  "Honey Badger Outfits is a men's wear label. First up: 4-way ultra-stretch lycra track pants from ₹350, with 3 pc and 5 pc combos. Shop online with prepaid or COD.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://honeybadger-move-elevated.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://honeybadger-move-elevated.lovable.app/" }],
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
      <TrustStrip />
      <FeatureGrid />
      <Categories />
      <FeaturedProduct />
      <PricingOptions />
      <Colourways />
      <GalleryStrip />
      <VideoSection />
      <BrandSection />
      <SizeGuide compact />
      <Faq />
      <ShopBar price={formatPrice(packs[0]!.price)} meta={heroProduct.name} />


    </>
  );
}
