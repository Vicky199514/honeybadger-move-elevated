import { Feather, Move3d, MoveDiagonal, Sun } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    icon: MoveDiagonal,
    title: "4-Way Stretch",
    copy: "Moves naturally with you.",
  },
  {
    icon: Feather,
    title: "Lightweight",
    copy: "Comfort without unnecessary weight.",
  },
  {
    icon: Move3d,
    title: "Flexible Fit",
    copy: "Designed for movement.",
  },
  {
    icon: Sun,
    title: "Everyday Wear",
    copy: "Gym, travel or everyday use.",
  },
];

export function FeatureGrid() {
  return (
    <section className="border-b border-border bg-background py-16 md:py-24" aria-label="Product benefits">
      <div className="shell grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Reveal
            key={feature.title}
            delay={index * 70}
            className="bg-background px-6 py-8 md:px-8 md:py-10"
          >
            <feature.icon className="size-6 text-accent" aria-hidden="true" strokeWidth={1.5} />
            <h2 className="mt-6 text-lg">{feature.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
