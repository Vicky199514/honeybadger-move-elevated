import { measureSteps, sizeChart } from "@/data/sizes";
import { SectionHeading } from "@/components/SectionHeading";

export function SizeGuide({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-bone py-16 md:py-24" aria-labelledby="size-guide-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Fit & measurements"
          title="Size guide"
          copy="Waist measurements in inches, unstretched. The elasticated drawstring waistband and 4-way stretch cover a range around each size."
          className="[&>h2]:text-3xl"
        />

        {/* Table on wider screens */}
        <div className="mt-10 hidden overflow-hidden border border-hairline sm:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Track pant size chart</caption>
            <thead>
              <tr className="bg-ink text-bone">
                {["Size", "Waist", "Recommended fit"].map((heading) => (
                  <th key={heading} scope="col" className="eyebrow px-5 py-4 font-bold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr key={row.size} className="border-t border-hairline bg-background">
                  <th scope="row" className="px-5 py-4 font-display text-base font-extrabold">
                    {row.size}
                  </th>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{row.waist}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{row.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stacked cards on mobile so nothing overflows */}
        <ul className="mt-8 grid gap-3 sm:hidden">
          {sizeChart.map((row) => (
            <li key={row.size} className="border border-hairline bg-background p-4">
              <p className="font-display text-lg font-extrabold">{row.size}</p>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Waist</dt>
                <dd className="text-right">{row.waist}</dd>
                <dt className="text-muted-foreground">Fit</dt>
                <dd className="text-right">{row.fit}</dd>
              </dl>
            </li>
          ))}
        </ul>

        {!compact ? (
          <div className="mt-12 grid gap-8 border-t border-hairline pt-10 sm:grid-cols-3">
            {measureSteps.map((step) => (
              <div key={step.title}>
                <h3 className="text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
