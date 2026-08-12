type Section = { heading: string; body: string };

export function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <>
      <header className="bg-ink pt-32 pb-14 text-bone md:pt-40 md:pb-20">
        <div className="shell">
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2rem,8vw,4rem)] leading-[0.92]">{title}</h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/65">{intro}</p>
        </div>
      </header>

      <section className="bg-background py-14 md:py-24">
        <div className="shell max-w-2xl space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
