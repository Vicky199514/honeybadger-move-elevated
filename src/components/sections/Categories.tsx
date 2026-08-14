import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { formatPrice, packs, productPhotos } from "@/data/products";

const categories = [
  {
    label: "Track Pants",
    copy: `4-way ultra-stretch lycra, five colours, sizes M–XXL. From ${formatPrice(packs[0]!.price)}.`,
    to: "/track-pants",
    image: productPhotos.wardrobe,
    alt: "Honey Badger track pants in olive, navy, black and sky blue on a wardrobe rail",
    available: true,
  },
  { label: "T-Shirts", copy: "In development.", available: false },
  { label: "Shorts", copy: "In development.", available: false },
  { label: "Joggers", copy: "In development.", available: false },
];

/** Positions the brand as menswear, with track pants as the first release. */
export function Categories() {
  const [live, ...upcoming] = categories;

  return (
    <section className="bg-background py-16 md:py-24" aria-labelledby="categories-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Menswear"
          title="The range."
          copy="Honey Badger Outfits is a men's clothing label. Track pants are the first product in the line — more categories follow."
          className="[&>h2]:text-3xl"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <Link to={live!.to!} className="group block focus-visible:outline-offset-4">
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={live!.image}
                  alt={live!.alt!}
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-[70%_center] transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-start justify-between gap-4 pt-4">
                <div>
                  <h3 className="text-xl">{live!.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{live!.copy}</p>
                </div>
                <span className="flex items-center gap-1.5 whitespace-nowrap font-display text-xs font-bold tracking-[0.16em] uppercase">
                  Shop
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          <ul className="grid gap-px bg-hairline" role="list">
            {upcoming.map((category, index) => (
              <Reveal
                key={category.label}
                delay={index * 60}
                className="flex items-center justify-between gap-4 bg-bone px-5 py-6"
              >
                <div>
                  <h3 className="font-display text-base font-bold tracking-[0.12em] uppercase">
                    {category.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{category.copy}</p>
                </div>
                <span className="shrink-0 border border-ink/20 px-3 py-1.5 font-display text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                  Coming soon
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
