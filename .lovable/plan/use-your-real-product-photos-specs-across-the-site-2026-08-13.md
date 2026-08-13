# Use your real product photos + specs across the site

Replace AI placeholder imagery with your uploaded photography, and correct all product facts to match the spec sheets you sent.

## What I read from your images

- Logo: blue/orange running figure — becomes the site logo (header, footer, favicon).
- Colours (5): Black, Navy Blue, Olive Green, Charcoal Grey, Sky Blue. (One sheet also shows Medium Grey — see question below.)
- Sizes: M, L, XL, XXL only (no S). Waist: M 30", L 32", XL 34", XXL 36–38".
- Fabric: 4-way ultra-stretch lycra — high elasticity, breathable, quick-dry.
- Construction: secure zipped pocket (right), convenient open pocket (left), no rear pockets, clean rear-panel / clean-seam construction, elasticated waistband with adjustable drawstring, ribbed ankle cuffs.

## Which uploads get used where

- Wardrobe shot (4 pants hanging) — hero / campaign band. Reimagined crop for a tall mobile hero and a wide desktop crop.
- Folded stack lifestyle banner — gallery strip / featured product band.
- Rear-panel detail shot — product detail gallery (no-rear-pockets story).
- Colourway spec sheet — used as the source for a native, styled colour swatch section (not embedded as an image, so it stays crisp and responsive).
- Size chart sheet — used as data for the existing size table; the image itself is optional on /size-guide.

Uploads are hosted as CDN assets rather than committed binaries.

## Changes

1. Assets: upload the photos, wire imports, retire the generated placeholder images that are no longer used.
2. Logo: running-figure mark in header/footer with wordmark, plus favicon.
3. `products.ts`: 5 colourways with correct hex swatches, sizes M–XXL, rewritten features/fabric/fit/care from the spec sheets, real photo sets. Product presentation shifts to one track pant with 5 colourways instead of two separate products (the navy duplicate goes away) — colour selection drives the gallery.
4. `sizes.ts`: exact waist values, S removed, measure copy updated for the drawstring waistband.
5. Homepage sections: hero imagery/copy, benefits grid switched to High Elasticity / Breathable / Quick-Dry / Zipped Pocket, new colourway section, size-guide teaser numbers, FAQ answers corrected.
6. `/track-pants`, product detail, `/about`, `/size-guide`: copy and imagery aligned to the real product; WhatsApp message still pre-fills colour, size, quantity.
7. Accent colour: keep amber, or shift the accent to the logo's orange/blue so the site matches the brand mark — see question.
8. Responsive check at 360/390/desktop, alt text, per-route metadata kept intact.

## Notes

- Price stays the ₹1,499 placeholder until you give the real one.
- Razorpay checkout is still not built; this pass is content and imagery only.

## Questions

- Include Medium Grey as a 6th colour, or the 5 essential colours only?
- Keep the amber accent, or switch the accent to the logo's blue/orange?
