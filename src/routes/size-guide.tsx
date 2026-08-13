import { createFileRoute } from "@tanstack/react-router";
import { SizeGuide } from "@/components/sections/SizeGuide";
import { ActionLink } from "@/components/ActionLink";

const title = "Track Pant Size Guide — Honey Badger Outfits";
const description =
  "Waist and length measurements for Honey Badger men's track pants, from M to XXL, plus how to measure and choose your size.";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/size-guide" },
    ],
    links: [{ rel: "canonical", href: "/size-guide" }],
  }),
  component: SizeGuidePage,
});

function SizeGuidePage() {
  return (
    <>
      <header className="bg-ink pt-32 pb-14 text-bone md:pt-40 md:pb-20">
        <div className="shell">
          <p className="eyebrow text-accent">Fit</p>
          <h1 className="mt-4 text-[clamp(2.25rem,9vw,4.5rem)] leading-[0.92]">Size Guide</h1>
          <p className="mt-5 max-w-md leading-relaxed text-bone/65">
            Measure once, order with confidence. M 30", L 32", XL 34", XXL 36–38" waist.
          </p>
          <ActionLink to="/track-pants" variant="outlineBone" className="mt-8">
            Shop Track Pants
          </ActionLink>
        </div>
      </header>
      <SizeGuide />
    </>
  );
}
