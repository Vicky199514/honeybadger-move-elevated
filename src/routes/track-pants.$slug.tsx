import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { getColourway, getProductBySlug, packs, products } from "@/data/products";

export const Route = createFileRoute("/track-pants/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — Honey Badger Outfits" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Honey Badger Outfits`;
    const description = product.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/track-pants/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/track-pants/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            brand: { "@type": "Brand", name: "Honey Badger Outfits" },
            material: "4-way ultra-stretch lycra",
            offers: packs.map((pack) => ({
              "@type": "Offer",
              name: pack.label,
              priceCurrency: "INR",
              price: String(pack.price),
              eligibleQuantity: { "@type": "QuantitativeValue", value: pack.quantity },
              availability: product.available
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            })),
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [colour, setColour] = useState(product.colours[0]!.name);
  const onColourChange = useCallback((name: string) => setColour(name), []);
  const selected = getColourway(colour);
  const others = products.filter((item) => item.id !== product.id);

  return (
    <>
      <div className="bg-background pt-28 md:pt-36">
        <nav aria-label="Breadcrumb" className="shell pb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/track-pants" className="hover:text-foreground">
                Track Pants
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        <div className="shell grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16 lg:pb-24">
          <ProductGallery
            images={product.images}
            colourImage={
              selected
                ? {
                    src: selected.image,
                    alt: `${product.name} in ${selected.name}`,
                    ratio: "portrait",
                  }
                : undefined
            }
          />
          <ProductDetails product={product} onColourChange={onColourChange} />
        </div>
      </div>

      {others.length ? (
        <section className="border-t border-border bg-bone py-14 md:py-20" aria-labelledby="more-title">
          <div className="shell">
            <h2 id="more-title" className="text-2xl sm:text-3xl">
              More from Honey Badger
            </h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
