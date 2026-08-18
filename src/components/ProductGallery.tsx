import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/data/products";

export function ProductGallery({
  images,
  colourImage,
}: {
  images: ProductImage[];
  /** Photo of the currently selected colourway — shown first when present. */
  colourImage?: ProductImage | undefined;
}) {
  const gallery = useMemo(
    () => (colourImage ? [colourImage, ...images] : images),
    [colourImage, images],
  );
  const [active, setActive] = useState(0);

  // A new colour selection always shows that colour's photo.
  useEffect(() => {
    if (colourImage) setActive(0);
  }, [colourImage?.src]);

  const current = gallery[Math.min(active, gallery.length - 1)]!;

  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={1024}
          height={1280}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 size-full animate-in fade-in object-cover duration-500"
        />
      </div>

      <ul className="mt-3 grid grid-cols-5 gap-2 sm:gap-3" role="list">
        {gallery.map((image, index) => (
          <li key={image.src + index}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}: ${image.alt}`}
              aria-current={index === active}
              className={cn(
                "relative block aspect-square w-full overflow-hidden bg-secondary transition-opacity",
                index === active
                  ? "ring-2 ring-ink ring-offset-2 ring-offset-background"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              <img
                src={image.src}
                alt=""
                aria-hidden="true"
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
