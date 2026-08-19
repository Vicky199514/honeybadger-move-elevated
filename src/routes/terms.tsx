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
      intro="PLACEHOLDER — this page needs your final terms of sale."
      sections={[
        { heading: "Orders", body: "PLACEHOLDER — how an order is confirmed and paid for." },
        { heading: "Pricing", body: "PLACEHOLDER — pricing, taxes and any shipping charges." },
        { heading: "Liability", body: "PLACEHOLDER — add your liability terms." },
      ]}
    />
  ),
});
