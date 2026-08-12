import blackFront from "@/assets/track-pant-black-front.jpg";
import blackBack from "@/assets/track-pant-black-back.jpg";
import detail from "@/assets/track-pant-detail.jpg";
import fabricShot from "@/assets/track-pant-fabric.jpg";
import navyFront from "@/assets/track-pant-navy-front.jpg";
import lifestyleCharcoal from "@/assets/lifestyle-charcoal.jpg";

export type ProductImage = {
  src: string;
  alt: string;
  /** Editorial gallery hint: tall cards get more vertical presence. */
  ratio?: "portrait" | "landscape";
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  /** Price in the smallest sensible unit of the display currency (whole rupees). */
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  colours: { name: string; hex: string }[];
  sizes: string[];
  features: string[];
  fabric: string;
  fit: string;
  care: string[];
  delivery: string;
  available: boolean;
};

/**
 * Product catalogue. Add another track pant by appending one object —
 * every page, card and WhatsApp message reads from here.
 * Replace image imports in src/assets with your own photography.
 */
export const products: Product[] = [
  {
    id: "hb-4way-track-pant",
    slug: "hb-4-way-stretch-track-pant",
    name: "The HB 4-Way Stretch Track Pant",
    subtitle: "Premium lycra blend · tapered fit",
    description:
      "A track pant built around one idea: nothing should restrict how you move. Four-way stretch lycra, a lightweight handfeel and a clean tapered line that works from the gym to the street.",
    price: 1499, // PLACEHOLDER price
    images: [
      { src: blackFront, alt: "HB 4-Way Stretch Track Pant in black, front view", ratio: "portrait" },
      { src: blackBack, alt: "HB 4-Way Stretch Track Pant in black, back view", ratio: "portrait" },
      { src: detail, alt: "Close-up of the ribbed ankle cuff and flatlock stitching", ratio: "landscape" },
      { src: fabricShot, alt: "Four-way stretch lycra fabric stretched to show elasticity", ratio: "landscape" },
      { src: lifestyleCharcoal, alt: "Model wearing the track pant in charcoal, seated on concrete steps", ratio: "portrait" },
    ],
    colours: [
      { name: "Black", hex: "#111111" },
      { name: "Charcoal", hex: "#3A3A3C" },
      { name: "Navy", hex: "#1C2436" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "4-way stretch lycra blend",
      "Lightweight, breathable knit",
      "Elasticated waistband with drawcord",
      "Two side pockets",
      "Ribbed ankle cuffs",
      "Flatlock stitching at stress seams",
    ],
    fabric: "4-way stretch lycra blend. PLACEHOLDER — exact composition and GSM to be confirmed.",
    fit: "Tapered regular fit. Sits at the natural waist with a clean line through the leg. If you are between sizes, size up for a relaxed fit.",
    care: [
      "Machine wash cold with like colours",
      "Do not bleach",
      "Tumble dry low or line dry",
      "Warm iron if needed — avoid direct heat on prints",
    ],
    delivery: "PLACEHOLDER — delivery timelines and shipping charges to be confirmed.",
    available: true,
  },
  {
    id: "hb-navy-track-pant",
    slug: "hb-4-way-stretch-track-pant-navy",
    name: "The HB Track Pant — Navy",
    subtitle: "Premium lycra blend · tapered fit",
    description:
      "The same 4-way stretch construction in a deep navy that sits quietly with everything. Built for everyday wear.",
    price: 1499, // PLACEHOLDER price
    images: [
      { src: navyFront, alt: "HB Track Pant in deep navy, front view", ratio: "portrait" },
      { src: detail, alt: "Close-up of the ribbed ankle cuff and flatlock stitching", ratio: "landscape" },
      { src: fabricShot, alt: "Four-way stretch lycra fabric stretched to show elasticity", ratio: "landscape" },
    ],
    colours: [{ name: "Navy", hex: "#1C2436" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "4-way stretch lycra blend",
      "Lightweight, breathable knit",
      "Elasticated waistband with drawcord",
      "Two side pockets",
      "Ribbed ankle cuffs",
    ],
    fabric: "4-way stretch lycra blend. PLACEHOLDER — exact composition and GSM to be confirmed.",
    fit: "Tapered regular fit. Sits at the natural waist with a clean line through the leg.",
    care: [
      "Machine wash cold with like colours",
      "Do not bleach",
      "Tumble dry low or line dry",
    ],
    delivery: "PLACEHOLDER — delivery timelines and shipping charges to be confirmed.",
    available: true,
  },
];

export const heroProduct = products[0]!;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}
