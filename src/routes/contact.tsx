import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import { WhatsAppButton, WhatsAppGlyph } from "@/components/WhatsAppButton";
import { site } from "@/data/site";

const title = "Contact Honey Badger Outfits — Order on WhatsApp";
const description =
  "Message Honey Badger Outfits on WhatsApp or Instagram for sizing help, order details and delivery questions.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://honeybadger-move-elevated.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://honeybadger-move-elevated.lovable.app/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <header className="bg-ink pt-32 pb-14 text-bone md:pt-40 md:pb-20">
        <div className="shell">
          <p className="eyebrow text-accent">Get in touch</p>
          <h1 className="mt-4 text-[clamp(2.25rem,9vw,4.5rem)] leading-[0.92]">Contact</h1>
          <p className="mt-5 max-w-md leading-relaxed text-bone/65">
            WhatsApp is the fastest way to reach us — sizing, colours, orders and delivery.
          </p>
        </div>
      </header>

      <section className="bg-background py-14 md:py-24">
        <div className="shell grid gap-4 sm:grid-cols-3">
          <div className="border border-border p-6">
            <WhatsAppGlyph className="size-5 text-accent" />
            <h2 className="mt-5 text-lg">WhatsApp</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Orders and quick questions. PLACEHOLDER — add your business number in site.ts.
            </p>
            <WhatsAppButton className="mt-5" />
          </div>

          <div className="border border-border p-6">
            <Instagram className="size-5 text-accent" strokeWidth={1.5} />
            <h2 className="mt-5 text-lg">Instagram</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              New drops and product videos. {site.instagramHandle} (PLACEHOLDER)
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center rounded-sm border border-ink/25 px-5 font-display text-xs font-bold tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-bone"
            >
              Follow
            </a>
          </div>

          <div className="border border-border p-6">
            <Mail className="size-5 text-accent" strokeWidth={1.5} />
            <h2 className="mt-5 text-lg">Email</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              For anything longer. {site.email} (PLACEHOLDER)
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex min-h-11 items-center rounded-sm border border-ink/25 px-5 font-display text-xs font-bold tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-bone"
            >
              Email us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
