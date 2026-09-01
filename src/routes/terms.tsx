import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

const title = "Terms — Honey Badger Outfits";
const description = "Terms covering orders placed with Honey Badger Outfits.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://honeybadger-move-elevated.lovable.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://honeybadger-move-elevated.lovable.app/terms" }],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Legal"
      title="Terms"
      intro="These terms explain the basics of browsing, ordering and communicating with Honey Badger Outfits."
      sections={[
        { heading: "Orders", body: "Adding an item to your cart creates an order request, not a final confirmation. We review the delivery details and confirm availability, payment method and dispatch information with you before fulfilment." },
        { heading: "Pricing", body: "Displayed prices are in Indian rupees. The selected pack price is shown in your cart and checkout summary. Cash on delivery adds the ₹30 handling charge shown before you submit the order request." },
        { heading: "Product information", body: "We aim to keep product descriptions, colour references and size information accurate. Colours can appear differently across screens; use the product images and size guide together when choosing." },
      ]}
    />
  ),
});
