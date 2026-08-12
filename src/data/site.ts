/**
 * Central brand + contact configuration.
 * Replace the PLACEHOLDER values with your real details.
 */

/** WhatsApp number in international format, digits only (country code first). */
export const WHATSAPP_NUMBER = "919999999999"; // PLACEHOLDER — replace with your number

export const site = {
  name: "Honey Badger Outfits",
  shortName: "Honey Badger",
  tagline: "Premium stretch track pants built for movement.",
  /** PLACEHOLDER — replace with your live domain once published. */
  url: "",
  email: "hello@honeybadgeroutfits.com", // PLACEHOLDER
  instagram: "https://instagram.com/", // PLACEHOLDER — add your handle
  instagramHandle: "@honeybadgeroutfits", // PLACEHOLDER
  currency: "INR",
  currencySymbol: "₹",
} as const;

export const nav = [
  { label: "Home", to: "/" },
  { label: "Track Pants", to: "/track-pants" },
  { label: "About", to: "/about" },
  { label: "Size Guide", to: "/size-guide" },
  { label: "Contact", to: "/contact" },
] as const;

export const footerLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Shipping & Returns", to: "/shipping-returns" },
] as const;
