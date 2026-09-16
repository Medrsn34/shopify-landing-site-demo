# Vaia — Shopify Product Landing Page (Portfolio Demo)

A single-product, conversion-focused landing page built to demonstrate the
exact pattern most Shopify CRO/landing-page job posts ask for: custom Liquid
(no page-builder app), a native quantity/bundle selector, a sticky mobile
add-to-cart bar, a feature comparison table, and a UGC-style social proof
grid.

**"Vaia" is a fictional brand.** Nothing here is a real product, real
customer review, or real client work — it's a self-directed build to show
the code, not a live case study. Say so plainly if you link this from a
proposal.

## What's in here

```
preview/index.html         Standalone page — open directly in a browser,
                            no Shopify store needed. Good for a quick look
                            or a screenshot.

shopify/sections/
  product-landing.liquid   A real Shopify theme section: pulls product
                            title/price/image/variants from Shopify's
                            objects, renders an actual `{% form 'product' %}`
                            add-to-cart, and exposes merchant-editable
                            settings + repeatable comparison-row blocks
                            through {% schema %}.

shopify/assets/
  product-landing.css      Shared styling for the section.
  product-landing.js       Variant switching, the sticky bar's scroll
                            behavior, and an AJAX add-to-cart call against
                            Shopify's /cart/add.js endpoint (falls back to
                            a normal form submit if the fetch fails).
```

## How to use the Shopify version in a real store

1. Copy `shopify/sections/product-landing.liquid` into your theme's
   `sections/` folder.
2. Copy `shopify/assets/product-landing.css` and `product-landing.js` into
   `assets/`.
3. In the theme editor, add the "Product landing (CRO demo)" section to a
   page template, pick a product, and add comparison-row blocks.

The section degrades gracefully: no product selected → a prompt instead of
a broken buy box; single-variant product → the bundle selector just doesn't
render; no comparison blocks → that section is skipped entirely.

## Design notes

- Palette: deep botanical green (`#3B5A45`) / ink (`#16211C`) / cream
  (`#F6F1E7`) / muted gold accent (`#C9A227`) — chosen to avoid the generic
  "warm cream + terracotta" AI-default look.
- Type: Fraunces (display/serif) for headlines, Work Sans for body and UI.
- FAQ uses native `<details>/<summary>` so it works with zero JavaScript.

## Status

Built as a from-scratch practice project — not yet used in a live client
store. Update this README once it's actually shipped somewhere real.
