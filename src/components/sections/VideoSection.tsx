import { Play } from "lucide-react";
import { useState } from "react";
import { productPhotos } from "@/data/products";
import { Reveal } from "@/components/Reveal";

/**
 * Drop your product video at public/video/built-to-move.mp4 and it plays here.
 * Until then the poster image is shown as the static fallback.
 */
const VIDEO_SRC = "/video/built-to-move.mp4"; // PLACEHOLDER — add your video file

export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-ink py-16 text-bone md:py-28" aria-labelledby="video-title">
      <div className="shell">
        <div className="max-w-xl">
          <p className="eyebrow text-accent">Product in motion</p>
          <h2 id="video-title" className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Built to move<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 leading-relaxed text-bone/65">
            Show the stretch, fit and movement of the product.
          </p>
        </div>

        <Reveal className="mt-10">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal sm:aspect-video">
            {playing ? (
              <video
                className="size-full object-cover"
                src={VIDEO_SRC}
                poster={productPhotos.foldedStack}
                controls
                autoPlay
                playsInline
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <img
                  src={productPhotos.foldedStack}
                  alt="HB track pant in motion — video preview"
                  width={1440}
                  height={1808}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-[60%_30%] opacity-80"
                />
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 grid place-items-center bg-ink/25 transition-colors hover:bg-ink/10"
                  aria-label="Play product video"
                >
                  <span className="grid size-18 place-items-center rounded-full bg-accent text-ink transition-transform duration-300 hover:scale-105">
                    <Play className="size-6 translate-x-0.5" fill="currentColor" />
                  </span>
                </button>
                <p className="absolute bottom-4 left-4 rounded-sm bg-ink/70 px-3 py-1.5 text-[11px] tracking-wide text-bone/70 uppercase">
                  Video placeholder — add your clip
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
