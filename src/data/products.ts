import wardrobeAsset from "@/assets/wardrobe-colours.jpg.asset.json";
import foldedStackAsset from "@/assets/folded-stack.png.asset.json";
import rearPanelAsset from "@/assets/rear-panel-detail.png.asset.json";
import specGuideAsset from "@/assets/spec-guide.png.asset.json";

export const productPhotos = {
  wardrobe: wardrobeAsset.url,
  foldedStack: foldedStackAsset.url,
  rearPanel: rearPanelAsset.url,
  specGuide: specGuideAsset.url,
};

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

/** The five essential colourways, as listed on the product spec sheet. */
export const colourways = [
  { name: "Black", hex: "#111111" },
  { name: "Navy Blue", hex: "#1B2A4A" },
  { name: "Olive Green", hex: "#4A5233" },
  { name: "Charcoal Grey", hex: "#3A3A3C" },
  { name: "Sky Blue", hex: "#8FB4D9" },
];

/**
 * Product catalogue. Add another track pant by appending one object —
 * every page, card and WhatsApp message reads from here.
 */
export const products: Product[] = [
  {
    id: "hb-4way-track-pant",
    slug: "hb-4-way-stretch-track-pant",
    name: "4-Way Ultra-Stretch Lycra Track Pant",
    subtitle: "Five colourways · zipped right pocket · clean rear panel",
    description:
      "Built around one idea: nothing should restrict how you move. Four-way ultra-stretch lycra with high elasticity, a breathable quick-dry handfeel, a secure zipped right pocket for your phone and a clean rear panel with no pockets for an uninterrupted line.",
    price: 1499, // PLACEHOLDER price
    images: [
      {
        src: wardrobeAsset.url,
        alt: "Honey Badger track pants in olive, navy, black and sky blue hanging in a wardrobe",
        ratio: "portrait",
      },
      {
        src: foldedStackAsset.url,
        alt: "Folded stack of 4-way ultra-stretch lycra track pants beside a pair showing the zipped side pocket",
        ratio: "landscape",
      },
      {
        src: rearPanelAsset.url,
        alt: "Rear view of the black track pant showing the clean rear panel with no rear pockets and clean-seam construction",
        ratio: "portrait",
      },
      {
        src: specGuideAsset.url,
        alt: "Specification guide showing the five colourways, zipped right pocket and open left pocket",
        ratio: "landscape",
      },
    ],
    colours: colourways,
    sizes: ["M", "L", "XL", "XXL"],
    features: [
      "4-way ultra-stretch lycra fabric",
      "High elasticity — stretches in every direction",
      "Breathable, quick-dry knit",
      "Secure zipped pocket on the right",
      "Convenient open pocket on the left",
      "No rear pockets — clean rear panel",
      "Clean-seam construction",
      "Durable elasticated waistband with adjustable drawstring",
      "Ribbed ankle cuffs",
    ],
    fabric:
      "4-way ultra-stretch lycra. High elasticity, breathable and quick-drying, with strong shape retention wash after wash.",
    fit: "Tapered regular fit. Sits at the natural waist on a durable elasticated waistband with an adjustable drawstring. If you are between sizes, size up for a relaxed fit.",
    care: [
      "Machine wash cold with like colours",
      "Do not bleach",
      "Tumble dry low or line dry",
      "Warm iron if needed — avoid direct heat on the logo",
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
