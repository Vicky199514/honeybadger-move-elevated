import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

const title = "Privacy Policy — Honey Badger Outfits";
const description = "How Honey Badger Outfits handles the information you share when you enquire or order.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="PLACEHOLDER — this page needs your final privacy policy text."
      sections={[
        {
          heading: "Information we collect",
          body: "PLACEHOLDER — describe what you collect when a customer messages you on WhatsApp or email (name, phone number, delivery address).",
        },
        {
          heading: "How we use it",
          body: "PLACEHOLDER — describe how order information is used and how long it is kept.",
        },
        {
          heading: "Contact",
          body: "PLACEHOLDER — add the email address customers should use for privacy requests.",
        },
      ]}
    />
  ),
});
