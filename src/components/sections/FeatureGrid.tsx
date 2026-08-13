import { Lock, MoveDiagonal, Wind, Zap } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    icon: MoveDiagonal,
    title: "High Elasticity",
    copy: "4-way ultra-stretch lycra moves in every direction with you.",
  },
  {
    icon: Wind,
    title: "Breathable",
    copy: "Light, airy knit that stays comfortable all day.",
  },
  {
    icon: Zap,
    title: "Quick-Dry",
    copy: "Dries fast after training, travel or a wash.",
  },
  {
    icon: Lock,
    title: "Zipped Pocket",
    copy: "Secure zip pocket on the right, open pocket on the left.",
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
