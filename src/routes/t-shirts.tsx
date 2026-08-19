import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

const title = "Men's T-Shirts — Coming Soon | Honey Badger Outfits";
const description =
  "Honey Badger Outfits men's t-shirts are in development — breathable, everyday cuts built with the same movement-first approach as our track pants.";

export const Route = createFileRoute("/t-shirts")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://honeybadger-move-elevated.lovable.app/t-shirts" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://honeybadger-move-elevated.lovable.app/t-shirts" }],
  }),
  component: TShirts,
});

function TShirts() {
  return (
    <>
      <header className="bg-ink pt-32 pb-14 text-bone md:pt-40 md:pb-20">
        <div className="shell">
          <p className="eyebrow text-accent">Coming soon</p>
          <h1 className="mt-4 text-[clamp(2.25rem,9vw,5rem)] leading-[0.9]">
            T-Shirts<span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-bone/65">
            Breathable everyday tees are in development — same movement-first construction as our
            track pants. Shop track pants while we finish the fit.
          </p>
          <Link
            to="/track-pants"
            className="mt-8 inline-flex min-h-13 items-center justify-center rounded-sm bg-accent px-7 font-display text-sm font-bold tracking-[0.16em] text-accent-foreground uppercase"
          >
            Shop track pants
          </Link>
        </div>
      </header>
      <FeatureGrid />
    </>
  );
}
