# Custom Roll Labels paid landing page — first pass

Date: 2026-09-23
Branch: `openclaw/roll-labels-first-pass`
Base: `eb90985`

## Scope and source audit

The campaign strategy and baseline visual research remain canonical in `/Users/phanman/.openclaw/workspace/projects/roll-label-paid-landing/strategy-2026-09-23.md`, with the baseline screenshot at `/Users/phanman/.openclaw/workspace/projects/roll-label-paid-landing/before-1440.png`. This document records implementation and checkout architecture only and does not duplicate that strategy record.

The existing `/lp/roll-labels` page was treated as campaign copy, not as substantiation. The following claims were removed because no supporting source was present in the canonical repository: 10M+ labels, 4.9 rating, named Sarah/Marcus testimonials, 40% savings, four-day delivery, free shipping over $150, and fixed turnaround guarantees.

The first pass reuses only repository-owned roll-label product imagery from `public/images/products/roll-labels/`. The product configuration is grounded in the canonical pricing implementation and UI: 0.5–12 inch dimensions, quantities beginning at 250, standard matte paper or BOPP, matte or gloss laminate, digital proof, and the existing 3-inch core specification. Lead time is described as an order-specific confirmation after specifications and proof approval.

## Page architecture

1. Compact campaign navigation with an outlined green pricing CTA.
2. Hero with concrete size/material/quantity copy, supported product imagery, and two routes:
   - `Get Instant Pricing` anchors to the shared configurator.
   - `Help me choose` opens `/get-quote` with roll-label/source query context.
3. The shared `RollLabelCalculator` remains the purchasing surface. A narrowly scoped prop gives only this landing-page instance an outlined green add-to-cart CTA; `/shop/roll-labels` retains its existing default styling.
4. Material comparison focuses on use conditions instead of unsupported performance claims.
5. Four-step Configure → artwork → proof → production flow reflects the actual cart/artwork/proof workflow. Artwork is uploaded in the cart before payment; the cart disables payment and shows a warning while any item lacks an artwork URL.
6. Concise FAQs cover material, artwork, proofing, lead-time confirmation, machine direction, and custom help.
7. A mobile-only sticky pricing CTA avoids covering content by pairing with bottom page padding.

## Checkout safety architecture

Roll-label cart totals are no longer authoritative. For products named `Custom Roll Labels` or `Roll Labels`, the checkout route:

- strictly parses dimensions from the cart size;
- accepts only `standard` or `bopp` material;
- accepts only `matte` or `gloss` finish;
- accepts only standard production speed;
- validates dimensions from 0.5 to 12 inches;
- validates integer quantities from 250 through a 100,000 safety cap;
- recalculates the Stripe line-item amount with `calculateRollLabelPrice`;
- independently preserves the canonical hand/machine unwind-direction validation and metadata.

The browser-supplied `totalCents` remains part of the generic cart shape for other products, but is ignored for recognized roll-label products. Focused deterministic pricing/configuration tests were added alongside the existing direction tests.

## Contextual quote help

The `Help me choose` route now consumes only the recognized `service=stickers-labels&product=roll-labels` pair. The server page maps that pair to explicit safe initial props for `QuoteForm`: `Stickers & Labels`, a fixed `Not sure` material choice, and a fixed non-PII note requesting help with roll-label size, material, finish, and application direction. Query values are not copied into form fields. Ordinary `/get-quote` visits and unrecognized query combinations remain blank and unselected. Playwright verifies both the contextual prefill and the unchanged generic path.

## Privacy and analytics

No analytics vendor, tracking script, hidden form, or new PII collection was added. The implementation uses the existing cart and quote architectures.

## Launch status

Implementation, CRO review corrections, focused regressions, production build, and local Playwright QA are complete in the isolated worktree. Production deployment was authorized on 2026-09-23 and is pending the release steps recorded below.
