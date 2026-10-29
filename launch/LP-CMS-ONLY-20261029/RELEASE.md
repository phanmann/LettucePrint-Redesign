# Sitewide CMS-only product images — 2026-10-29

## Authority and source
Sean requested CMS/Sanity-only images for all products in #lp-website, message 1565399834251362325, then explicitly said “@Athena Vale go-live” during implementation. This supersedes the earlier no-deployment limitation for the image work. Operator still verifies source and approval before production release.
Base production: 4e6c224568b19fd16ded853eceb0a3acd2c55211. Parent narrow fix: ccd04e239a8ab0bcc7451cf13b6a81ef7d667e80. Candidate commit is the commit containing this report.

## Scope
Only published Sanity galleries supply product imagery: detail galleries, homepage hero slideshow/cards, shop/category cards, consolidated quote cards, tents, roll-label landing image and cart thumbnails. Removed local/Drive fallback data, obsolete image props and local option-image previews (option labels retained). ProductOrderPage always renders its CMS gallery even when no bundled image existed. One root server read preloads all enabled published galleries; client refreshes retain edit updates, failed refresh retains last CMS image, missing/disabled galleries use neutral placeholders. Product-path keys retain route reset behavior.
No CMS content writes. Logos, portfolio/editorial assets and customer-uploaded artwork remain unchanged. Public assets were not indiscriminately deleted because they may be shared; product code no longer references them.

## Verified
- npm ci restored architecture-specific local dependencies; package lock unchanged.
- Production build PASS including TypeScript and route generation.
- Focused lint on changed image logic/data PASS; diff check PASS.
- Wider changed-file lint has 4 pre-existing unescaped-entity errors and 2 pre-existing unused Button warnings in three business-card pages. Baseline evidence in lint-baseline.log. Earlier changed-files-lint.log also records one now-removed unused color warning.
- Source search found zero /images/products or drive.usercontent references in src .ts/.tsx.
- 64/64 initial server HTML checks PASS: all 51 published-gallery paths plus home/shop/category/consolidated/tent/landing routes. Every published-gallery route renders CMS images initially; no bundled/Drive product image rendered. See server-html.json and reproducible scripts/check-cms-only-images.cjs.
- Sandbox production browser: home 390px CMS product previews and no horizontal overflow; banners 390px shows five CMS and two empty cards; Vinyl card-to-detail navigation with gallery fetch blocked retains loaded Sanity image and no overflow. Stickers 1440px loaded CMS gallery with two thumbnails/no overflow. Tent 1440px missing-gallery placeholder/no local image/no overflow. Seeded local QA cart 1440px resolves sticker thumbnail from Sanity and no overflow; QA cart cleared.
- Browser error buffer contained one historical Oct 28 dependency error from a different old checkout; cleared. Do not count it as a current candidate error.
- No blanket all-page visual QA claim; existing automated Playwright suite was not rerun because prior environment lacked browser libraries. Host operator may run browser QA on preview.

## Visible content gaps / tradeoffs
51 enabled published galleries exist with images (cms-coverage.json). Strict path matching means category cards without their own galleries are placeholders: homepage 4, Shop All 13, signage 3, packaging 2, apparel 4, marketing-materials 5; banners have 2 X-Stand gaps. Tents and some consolidated marketing pages also have no gallery. These were explicitly disclosed in channel before handoff. Do not secretly reuse another product image or restore local fallbacks. Add galleries through Studio when content is available.
Root preload makes app pages dynamic and serializes the 51 galleries to the client context. Fresh CMS edits remain supported without rebuilding. CMS outage yields a neutral placeholder, never old bundled imagery.

## Release handoff
No sandbox push/deployment performed. Update existing draft PR #5 with exact candidate, independently review, then merge/deploy under Sean's go-live authorization. Confirm correct Vercel project/account and author identity guard. Verify production serves the new CMS-only behavior, including known-gallery initial images and a missing-gallery placeholder. Preserve all unrelated dirty files and caches. No credentials should be forwarded into this sandbox.
