import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

const title = "Shipping & Returns — Honey Badger Outfits";
const description = "Shipping timelines, charges and the returns process for Honey Badger orders.";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/shipping-returns" },
    ],
    links: [{ rel: "canonical", href: "/shipping-returns" }],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Orders"
      title="Shipping & Returns"
      intro="PLACEHOLDER — confirm your shipping and returns policy before going live."
      sections={[
        { heading: "Shipping", body: "PLACEHOLDER — delivery timelines, courier partners and shipping charges." },
        { heading: "Returns", body: "PLACEHOLDER — return window, condition requirements and who pays return shipping." },
        { heading: "Exchanges", body: "PLACEHOLDER — size exchange process." },
      ]}
    />
  ),
});
