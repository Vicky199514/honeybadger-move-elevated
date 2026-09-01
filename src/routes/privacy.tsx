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
      { property: "og:url", content: "https://honeybadger-move-elevated.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://honeybadger-move-elevated.lovable.app/privacy" }],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This notice explains the information we use to respond to enquiries and process orders placed through Honey Badger Outfits."
      sections={[
        {
          heading: "Information we collect",
          body: "When you enquire or place an order, you may share your name, mobile number, email address, delivery address, PIN code, order preferences and any message you send to our team.",
        },
        {
          heading: "How we use it",
          body: "We use this information to answer questions, confirm product and delivery details, arrange fulfilment, provide order support and handle exchanges or other service requests. We keep it only for as long as it is needed for these purposes and any applicable record-keeping requirements.",
        },
        {
          heading: "Contact",
          body: "For a privacy question or request about information you have shared, contact hello@honeybadgeroutfits.com and include enough detail for us to identify your enquiry.",
        },
      ]}
    />
  ),
});
