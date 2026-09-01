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
      { property: "og:url", content: "https://honeybadger-move-elevated.lovable.app/shipping-returns" },
    ],
    links: [{ rel: "canonical", href: "https://honeybadger-move-elevated.lovable.app/shipping-returns" }],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Orders"
      title="Shipping & Returns"
      intro="Delivery and post-purchase support are confirmed directly with you so we can verify the address, serviceability and selected size."
      sections={[
        { heading: "Shipping", body: "We confirm delivery timing, serviceability and any applicable shipping charge before dispatch. Please provide a complete address and 6-digit PIN code at checkout. Cash on delivery orders include the ₹30 handling charge shown in your total." },
        { heading: "Returns", body: "If there is a problem with your order, contact our team promptly with your order details and clear photos where useful. Any return or refund eligibility is reviewed based on the item condition and the circumstances of the request." },
        { heading: "Exchanges", body: "For a size exchange, contact us as soon as possible after delivery. Items should be unworn, unwashed and in their original condition; exchange availability is confirmed by our team before the next step." },
      ]}
    />
  ),
});
