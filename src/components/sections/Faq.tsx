import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/faq";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-background py-16 md:py-28" aria-labelledby="faq-title">
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Answers" title="Frequently asked" />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Still unsure about fit, fabric or ordering? Message us and we'll answer directly.
          </p>
          <WhatsAppButton className="mt-6" variant="outlineInk">
            Ask on WhatsApp
          </WhatsAppButton>
        </div>

        <ul className="border-t border-border">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.question} className="border-b border-border">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-base font-bold tracking-tight uppercase transition-colors hover:text-accent"
                  >
                    {item.question}
                    {isOpen ? (
                      <Minus className="size-4 shrink-0" />
                    ) : (
                      <Plus className="size-4 shrink-0" />
                    )}
                  </button>
                </h3>
                <div id={`faq-panel-${index}`} hidden={!isOpen}>
                  <p className="max-w-prose pb-6 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
