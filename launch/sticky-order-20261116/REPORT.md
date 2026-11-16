# Sticky product order modules — Sean request, 2026-11-16

## Source and runtime

- Isolated sandbox worktree: `/workspace/projects/lettuceprint/.worktrees/sticky-order-20261116`.
- Branch: `fix/sticky-order-20261116`.
- Public HTTPS fetch verified current main `8ace1f0ce1bd9512b48d0fa2bfaf1e12a6aa6ab5`. The configured SSH transport is absent in this sandbox; HTTPS fetch succeeded without credentials.
- Existing unrelated shared-checkout work was not touched. Linux-native dependencies reused from the sibling department-product-faqs worktree (same locked project dependencies); no dependency changes.
- Design reference: https://docs.google.com/document/d/1tPq8eEdDzvZzjBIgXAjmMwNHHl_7O9ZptFN9kouzVUY/edit and repository mirror `docs/DESIGN-RESOURCES.md` (read from shared project).
- Browser QA follows the `playwright-cli` skill's sandbox isolation instructions, using installed `/usr/bin/chromium` through Playwright. No host browser/account access.

## Diagnosis and fix

1. Standard postcards and ProductOrderPage placed sticky positioning on a calculator inside a same-height wrapper. That wrapper was the grid item and constrained sticky travel to zero. The grid item now owns sticky positioning and scrolling. Related recommendations now stay in the information column (one or two cards per row on desktop), extending the sticky containing block through the entire FAQ and product-browsing content. Without this second correction the module still began moving above the navbar at the final FAQs.
2. TypeProductPage, business cards and spot UV combined sticky/overflow on the wrapper AND calculator. Removed nested calculator scrollports. The complete outer panel, including price/artwork/CTA, has one viewport-bounded scrollport.
3. Desktop panels use 88px top (72px fixed navbar + 16px gap), `100dvh - 104px` max-height with vh fallback, `align-self:start`, and normal scroll chaining. Minmax grid tracks prevent intrinsic-width overflow at the lg boundary.
4. Tents now span the gallery and FAQ grid rows, with one unchanged FAQ/schema instance. The module cannot escape its product grid or cover the footer.
5. Packaging quote pages previously stuck the intro, not the form; apparel forms and the standalone roll-label landing page did not span their product content. Desktop-only layout rules put existing forms in a sticky right column alongside the full information/FAQ content. Mobile DOM order and fields remain intact. Landing overflow is `clip`, not `hidden`, so it does not create a vertical sticky ancestor.
6. Mobile uses a compact `Order options` or explicit `Request quote` button pointing to the existing module. It focuses a named region and scrolls below the navbar immediately (no forced animation). It disappears when the form or footer is visible, sits below nav/cart/dialog stacking, and respects safe-area insets. There is no duplicate purchase/submission action.

## Coverage

`inventory.json` records all 68 concrete product/standalone routes and 25 intentional exclusions.

- Shared ProductOrderPage: marketing sheets/flyers/brochures/posters/booklets, banners, backdrops, box products, standard/die-cut mylar.
- TypeProductPage: all 8 sticker types and 4 roll-label shapes.
- Standalone: standard/premium business cards, standard postcards, spot UV, both tent sizes, roll-label paid landing page.
- Quote-based: custom packaging, mylar overview quote form, screen printing, embroidery, DTG and DTF.
- Premium postcards: no such route in current main; previously removed. Premium stock options in standard postcards remain untouched.
- Excluded: category/link-only overview pages (no inline order module), redirects, cart/checkouts, dedicated signage intake and get-quote utility pages. These are not product-browsing modules; existing checkout behavior was not changed.

## Verification commands

- `npm run build`
- `npx --no-install tsc --noEmit`
- Scoped ESLint on all modified TSX files: no errors; the two pre-existing unused QUANTITY_TIERS warnings in standard/premium business-card calculators remain.
- `node scripts/check-sticky-order.cjs`: 21 representative routes × desktop 1440×900 / 1024×600 / mobile 390×844 / 320×640. Checks top/middle/near-container-end/bottom, one scroll owner, viewport bounds, complete-module visibility beside expanded FAQs, footer containment, keyboard reachability of last enabled control (required apparel details are filled synthetically to enable Continue; nothing is submitted), mobile shortcut safe bounds/focus/navigation/hiding, and horizontal overflow.
- `node scripts/check-sticky-order-interactions.cjs`: preserved dropdown state, clear-sticker finish removal, visual roll-label machine/edge buttons, FAQ Enter/Space, and wheel chaining into the page at panel bottom.
- `npm run test:sticker-pricing`, `npm run test:roll-label-direction`, `npm run test:roll-label-pricing`.
- `FAQ_QA_URL=http://localhost:3116 node scripts/check-department-product-faqs.cjs`: existing full department FAQ/schema regression.
- `git diff --check`.

Local production server used port 3116. Early development-server runs exposed dev-origin hydration blocking for 127.0.0.1 and an expired server process; final runs use localhost and a production build. Early duplicate tent FAQ markup was removed before final source verification. These intermediate failures are not counted as passes.

No real form submission, artwork upload, cart order, checkout/payment, outbound message or Sanity mutation was performed. Read-only local rendering may fetch existing public gallery data. Parent owns broker preview/smoke and exact production approval; no release/deployment is authorized by this report.

## Final results

- Production build: PASS (132 static pages); explicit TypeScript: PASS.
- Geometry/mobile matrix: **84/84 PASS**, including the expanded-FAQ pinning assertion.
- State, keyboard, roll-label visual choices, clear-finish removal and scroll chaining: **12/12 PASS**.
- Department FAQ regression: **51 product routes + 34 desktop/mobile interactions PASS**; one matching FAQ schema per product.
- Sticker pricing, roll-label pricing and application/unwind direction regressions: PASS.
- Scoped lint: PASS with two existing business-card unused-import warnings; final containment-template lint: no warnings/errors.
- Visual review: postcards at expanded FAQs now show the complete panel's top beneath the navbar, including at the short desktop size. Compact mobile action, apparel quote sidebar, packaging, tents and standalone landing screenshots are included.
- Screenshots: `postcards-desktop.jpg`, `postcards-short.jpg`, `postcards-mobile.jpg`, `roll-mobile.jpg`, `packaging-desktop.jpg`, `apparel-short.jpg`, `tent-desktop.jpg`, `landing-desktop.jpg`.
- Reproduction: `scripts/check-sticky-order.cjs`, `scripts/check-sticky-order-interactions.cjs`, `scripts/inventory-sticky-order.cjs`, `scripts/capture-sticky-order.cjs`.
- Browser coverage is installed sandbox Chromium; native iOS Safari/hardware safe-area behavior was not independently exercised. The CSS uses safe-area env insets and dvh with vh fallback.

All final evidence is from the last production build, after the containing-block extension and single tent FAQ correction. No production deployment or remote branch push was performed.
