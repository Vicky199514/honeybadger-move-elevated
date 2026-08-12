# Honey Badger Outfits — Premium Sportswear Ecommerce

Frontend-only build (React + TanStack Start + Tailwind v4 + Lucide + Motion). No backend, no cart checkout — every order path ends in WhatsApp.

## 1. Sitemap

```text
/                 Home (hero, benefits, featured product, gallery, brand, video, size guide teaser, FAQ)
/track-pants      Product listing (editorial gallery grid)
/track-pants/$id  Product detail (gallery, colour/size select, WhatsApp order)
/about            Brand story (concise, no invented history)
/size-guide       Full size chart + how to measure
/contact          WhatsApp, Instagram, email placeholders
/privacy /terms /shipping-returns   Placeholder policy pages
/sitemap.xml  +  robots.txt
```

## 2. Design direction

Editorial sportswear, not marketplace. Near-black canvas for hero and campaign bands, off-white for reading sections. Full-bleed product imagery, oversized condensed uppercase headlines with tight tracking, thin hairline rules, sharp corners (radius near 0 on cards, small on buttons). Generous whitespace, asymmetric gallery rhythm (one tall hero card, two mid, one wide detail band). No gradients, no glass, no glow.

## 3. Colour palette (semantic tokens in src/styles.css, oklch)

- Ink black `#0B0B0B` — primary surface, headlines
- Charcoal `#1A1A1A` — cards, elevated bands
- Neutral grey `#8A8A8A` — supporting text, rules
- Off-white `#F4F2ED` — light sections, inverted text
- Accent: Badger Amber `#E4A11B` — one accent only, used for CTAs, active states, key underlines

Dark/light both defined; site reads as a dark-led brand with light editorial sections.

## 4. Typography

- Headings: Archivo (condensed-leaning, weights 700/800), uppercase, tight tracking
- Body/UI: Inter-alternative — Hind or Barlow at 400/500 for readable body and compact spec text
- Loaded with a `<link>` in `__root.tsx`, registered as `--font-display` / `--font-body` tokens. Two families, three weights max.

## 5. Component architecture

```text
src/components/       Header, MobileNav, Footer, Button, WhatsAppButton, StickyMobileCta,
                      ProductCard, ProductGallery, ProductDetails, Accordion, SectionHeading, Reveal
src/components/sections/  Hero, FeatureGrid, FeaturedProduct, GalleryStrip, BrandSection,
                          VideoSection, SizeGuide, Faq
src/data/             products.ts, faq.ts, sizes.ts, site.ts (nav, socials, copy)
src/lib/              whatsapp.ts (WHATSAPP_NUMBER + buildWhatsAppUrl), utils.ts
src/routes/           index.tsx, track-pants.index.tsx, track-pants.$id.tsx, about.tsx,
                      size-guide.tsx, contact.tsx, privacy.tsx, terms.tsx, shipping-returns.tsx,
                      sitemap[.]xml.ts
public/images/products/…   placeholder webp paths
```

Product shape: `id, name, slug, description, price, images{front,back,detail,fabric}, colours, sizes, features, fabric, fit, care, available`. Adding a product = one object.

## 6. Conversion strategy

- Product + headline + primary CTA above the fold on 360px
- Two CTAs max in hero: SHOP TRACK PANTS / ORDER ON WHATSAPP
- Sticky mobile bottom bar (price + ORDER ON WHATSAPP) appears after hero scrolls past, dismissable-free but unobtrusive, safe-area padded
- Detail page: colour and size chips pre-selected to defaults so one tap orders
- WhatsApp message pre-fills product, colour, size, quantity from selection state

## 6b. Razorpay checkout (added)

Razorpay is not a built-in Lovable integration, so it needs a small backend and your own Razorpay keys. Plan:

- Enable Lovable Cloud (database + secrets) so orders persist and the Razorpay key secret never ships to the browser.
- Secrets: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` (added via the secrets flow, never in code).
- `orders` table: id, product_id, name, colour, size, quantity, amount, currency, customer name/phone/email, address, razorpay_order_id, razorpay_payment_id, status, created_at. RLS: no anon read; writes only through server code.
- Server function `createRazorpayOrder` — validates the cart payload with Zod, prices server-side from `products.ts` (never trusts client amount), calls Razorpay Orders API, inserts a `pending` order row, returns `razorpay_order_id` + public key id.
- Checkout UI: `/checkout` collects name, phone, email, shipping address, then opens Razorpay Checkout (script loaded lazily only on that page).
- Verification: `/api/public/razorpay-webhook` verifies the HMAC signature with the webhook secret, then marks the order `paid` or `failed`. Client handler result alone is never trusted.
- `/order/success` and failure states read the order status.
- WhatsApp ordering stays as the secondary path — product pages get both `BUY NOW` (Razorpay) and `ORDER ON WHATSAPP`.
- Test mode first with Razorpay test keys; switch to live keys when you're ready.


## 7. Quality passes

Responsive check at 360 / 390 / 430 / tablet / desktop via headless browser screenshots; no horizontal overflow, 44px tap targets. Per-route `head()` metadata (title, description, og, twitter), Product + FAQPage JSON-LD, semantic landmarks, single H1 per page, alt text, visible focus rings, `prefers-reduced-motion` honoured on all Motion usage. Lazy-loaded imagery below the fold, eager hero.

## 8. Placeholders I'll use — send these when ready

- WhatsApp number (I'll use `WHATSAPP_NUMBER = "91XXXXXXXXXX"` until then)
- Razorpay test key id + key secret (from your Razorpay dashboard) when you want checkout live
- Price (placeholder `₹1,499`), colours (Black / Charcoal / Navy), sizes (S–XXL)
- Real size-chart values, product photos, product video, Instagram handle, policy text
- Shipping charges / free-shipping threshold, and whether you need COD

Product imagery: I'll generate on-brand studio placeholder images so the site looks finished, saved at the documented paths for easy swap.
