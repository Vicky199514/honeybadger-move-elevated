import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { colourways } from "@/data/products";

export function Colourways() {
  return (
    <section className="bg-bone py-16 md:py-24" aria-labelledby="colourways-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Colourways"
          title="Five essentials."
          copy="One construction, five colours that go with everything already in your wardrobe."
          className="[&>h2]:text-3xl"
        />

        <ul className="mt-10 grid grid-cols-2 gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-5" role="list">
          {colourways.map((colour, index) => (
            <Reveal key={colour.name} delay={index * 60} className="bg-bone p-5">
              <span
                className="block aspect-[4/5] w-full border border-black/10"
                style={{ backgroundColor: colour.hex }}
                aria-hidden="true"
              />
              <p className="mt-4 font-display text-sm font-bold tracking-[0.12em] uppercase">
                {colour.name}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
