import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  /** Editorial grid: some cards are deliberately taller. */
  tall?: boolean;
  priority?: boolean;
};

export function ProductCard({ product, tall = false, priority = false }: Props) {
  const cover = product.images[0]!;
  const hover = product.images[1] ?? cover;

  return (
    <Link
      to="/track-pants/$slug"
      params={{ slug: product.slug }}
      className="group block focus-visible:outline-offset-4"
    >
      <div
        className={cn(
          "relative overflow-hidden bg-secondary",
          tall ? "aspect-[3/4.4]" : "aspect-[3/3.7]",
        )}
      >
        <img
          src={cover.src}
          alt={cover.alt}
          width={1024}
          height={1280}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-0"
        />
        <img
          src={hover.src}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1280}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full scale-[1.03] object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
        />
        {!product.available ? (
          <span className="absolute top-4 left-4 bg-ink px-3 py-1.5 font-display text-[10px] font-bold tracking-[0.2em] text-bone uppercase">
            Sold out
          </span>
        ) : null}
      </div>

      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <h3 className="text-base leading-tight sm:text-lg">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.subtitle}</p>
        </div>
        <div className="flex items-center gap-1.5 whitespace-nowrap font-display text-sm font-bold">
          {formatPrice(product.price)}
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
