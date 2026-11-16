# Three-department product FAQ implementation

## Source and scope

- Assigned canonical checkout: `/workspace/projects/lettuceprint`; isolated worktree: `.worktrees/department-product-faqs`; branch: `feat/department-product-faqs`.
- Fresh public read-only fetch of GitHub main on 2026-11-16 returned `d3c73ffcbe0ea156f241f54eed27678597f6edcb` (matches supplied last deployed source).
- Runtime: Docker (`/.dockerenv`, PID 1 docker-init), Linux arm64, Node 24.22.1. No host browser, credentials, production deployment, CMS writes, uploads or real submissions.
- Read project release handoff and Design & Web Resource Library mirror. Canonical design source: https://docs.google.com/document/d/1tPq8eEdDzvZzjBIgXAjmMwNHHl_7O9ZptFN9kouzVUY/edit . Existing die-cut product page is the visual authority; no new design dependencies.

## Coverage inventory

`inventory.json` enumerates every page file, expands the dynamic tent route to its two supported sizes, identifies wrapper families, and includes the seven additional configured aliases. `browser-results.json` records all rendered answers and coverage results.

| Department | Product routes | Notes |
|---|---:|---|
| Marketing materials | 23 | Includes tri-fold re-export alias and product-specific bi-fold quote page |
| Signage | 19 | 10 backdrops, 7 banners, both dynamic tent sizes |
| Packaging | 9 | 6 boxes, 2 mylar products, custom-packaging consultation |
| **Total** | **51** | **Five questions each; one visible section and matching FAQPage schema per route** |

Exclusions: 10 category pages; 2 utility pages (`marketing-materials/checkout`, `signage/quote`); 4 banner redirect-only page files; 7 next.config.ts aliases. Alias destinations that are products are covered. Category redirects for posters, booklets, boxes, removed premium postcards and double-sided banners are not additional products. The `/brochures/tri-fold` re-export renders a product and is included, not excluded as a redirect. Unsupported dynamic tent sizes still use the existing notFound guard.

The custom-packaging consultation and bi-fold quote page are included because they describe and configure a particular product offering. The general signage quote intake is excluded. The mylar collection has a quote form but remains a category linking standard and die-cut products; those two detail pages receive FAQs.

## Implementation and sourcing

- Reuse the existing `FaqSection` unchanged: native details/summary keyboard and pointer behavior, same classes, heading and FAQPage JSON-LD as `/shop/stickers/die-cut`.
- `ProductOrderPage` adds one section after artwork/specifications (and existing specialty-finishes information), before custom help and related products. All marketing shared wrappers and signage/packaging product-data wrappers inherit it.
- Standalone business-card and postcard pages insert the same section immediately after artwork requirements. Bi-fold's layout receives an optional FAQ prop after the configuration content and before custom help. Tents add FAQs after their configuration content and before related products. Custom packaging adds them after capabilities and before the final CTA; these templates have no separate specifications/artwork panel.
- Family-authored content lives in `src/lib/department-product-faqs.ts`. Shared answers use the actual product's specifications, artwork requirements and option labels; they follow variant changes in the flyer/trifold wrappers rather than using stale size-specific claims.
- Sources: product page declarations, `FlyersOrderPage`, `TriFoldOrderPage`, `PrintSheetOrderPage`, `PostersOrderPage`, `BookletsOrderPage`, `retractable-products.ts`, `backdrop-products.ts`, `tent-pricing.ts`, business-card/postcard calculators, and custom-packaging consultation fields.
- Topics include fold planning, binding/page-count review, stock/finish choices, complete display kit vs replacement graphic/hardware, tent accessory restrictions, shaped packaging/dielines, and online-price vs quote flows.
- No new delivery promises, minimum quantities, certifications, food suitability or compliance assurances. Existing unsupported marketing superlatives are not repeated. Rounded business-card corners are not claimed as a calculator option; custom treatments are directed to a quote. Existing conflicting mesh/fabric hardware copy is not expanded into a guarantee.
- No changes to pricing, cart, configuration controls, upload behavior, images, mobile visual-label controls or clear-sticker finish behavior. The existing shared FAQ renderer/schema is not modified.

## QA

- Install: locked `npm ci --no-audit --no-fund` inside the isolated worktree. The original shared node_modules had host-native lightningcss, so it was not usable for Linux builds; the shared dependencies were left unchanged.
- Scoped ESLint: all nine changed application files pass.
- TypeScript: `npm exec tsc -- --noEmit --incremental false` passes.
- Production build: `npm run build` passes (132 prerendered pages; Next workspace-root warning only).
- Browser command: `node scripts/check-department-product-faqs.cjs`, local production server at `http://127.0.0.1:3116`, preinstalled sandbox Chromium. Script denies non-GET/HEAD requests.
- Browser verification status and screenshots: see `browser-results.json` and accompanying PNGs. Checks include exhaustive HTTP/render coverage, 4–6 complete questions, a single FAQ schema matching the exact rendered text, placement, keyboard Enter/Space, pointer expansion, unique heading ID, browser runtime errors and horizontal overflow at 390px and 1440px.
- Limitations: this is functional local production-build QA, not a broker preview smoke. Live payment, uploads, email delivery and actual order fulfillment are intentionally not exercised.

## Release handoff

No `lp_release_*` tools are exposed in this child session. Parent owns broker preparation/preview/QA and the exact-release co-owner approval flow. Committed source objects are in the canonical repository's object store; the parent need not cherry-pick unrelated shared-checkout changes. No production release has been attempted.

### Completed browser and regression results

PASS: all 51 product routes return HTTP 200 and render exactly five complete FAQs with one matching FAQPage schema. PASS: all 34 representative desktop/mobile runs (17 routes × 390/1440px) pass keyboard, pointer, heading uniqueness and no-horizontal-overflow checks; no browser runtime errors. Thirty-four accordion screenshots are saved beside this report. Native focus outline remains visible, as in the unchanged reference component.

PASS: `test:sticker-pricing`, `test:roll-label-direction`, `test:roll-label-pricing`, `test:tent-pricing`, `test:tent-checkout` (mocked Stripe only, zero network requests). Rechecked remote main before commit: unchanged at the base SHA above.
