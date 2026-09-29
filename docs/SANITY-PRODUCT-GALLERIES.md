# Product Gallery Manager

Product-detail galleries can be managed without editing code through Lettuce Print's embedded Sanity Studio.

## Open Studio

1. Visit `https://lettuceprint.vercel.app/studio`.
2. Sign in with an account that belongs to the Lettuce Print Sanity project.
3. Open **Product Galleries**.

## Add or replace a gallery

1. Click **Create** and choose **Product Galleries**.
2. Enter the product name for the Studio list.
3. Copy the product page URL and paste only the path beginning with `/services/` or `/shop/` into **Product page path**.
4. Leave **Use this gallery on the website** enabled.
5. Choose a white or light-gray gallery background.
6. Upload images under **Gallery images**.
7. Add concise alternative text to every image.
8. Choose the image fit:
   - **Contain** shows the complete image and supports adjustable padding.
   - **Cover** fills the square and may crop the edges.
9. Drag images into the desired order. The first image is the default.
10. Click **Publish**. Only published entries affect the website.

## Replace one image

Open the product's gallery entry, open the image row, replace its image file, and publish.

## Product preview images

- Product cards that link directly to a product page automatically use the first published image in that product's Sanity gallery.
- Reordering the gallery and publishing makes the new first image the product-page default and the listing-card preview.
- Preview cards inherit the first image's cover/contain treatment, padding, alternative text, and white/muted background.
- Aggregate category cards without their own Product Gallery entry retain their built-in fallback image.

## Revert safely

- Turn off **Use this gallery on the website** and publish to restore the gallery built into the website.
- An unpublished draft never changes the public website.
- An entry with no valid published images falls back to the built-in gallery.

## Guardrails

- Maximum 12 images per product gallery.
- Product paths must begin with `/services/` or `/shop/`.
- Alternative text is required.
- Styling is limited to safe background, fit, and padding controls; arbitrary CSS is not exposed.
- If duplicate published entries use the same product path, the most recently updated entry wins.

## Baseline migration

The initial migration on September 28, 2026 created 51 enabled product-gallery documents with 109 ordered image rows. Sanity deduplicated the source set to 52 unique uploaded assets. The migration includes shared product-order pages plus the custom business-card, flyer, postcard, sticker, roll-label, and Spot UV galleries.

The reusable migration command is `npm run migrate:product-galleries`. It is a dry run by default. `--apply` requires protected Sanity write access, and existing product paths are skipped unless `--overwrite-existing` is supplied deliberately.

## Documentation evidence

- Installed versions: Sanity `5.21.0`, Next.js `16.2.4`, `next-sanity` `12.2.2`, `@sanity/client` `7.21.0`, and `@sanity/image-url` `2.1.1`.
- Embedded Studio API: the installed `next-sanity/studio` types export `NextStudio`, matching the existing `/studio` implementation. Official reference: <https://www.sanity.io/docs/studio/embedding-sanity-studio>.
- Gallery schema: Sanity image fields and reorderable arrays are supported by the installed `defineType`, `defineField`, and `defineArrayMember` APIs. Official references: <https://www.sanity.io/docs/studio/image-type> and <https://www.sanity.io/docs/studio/array-type>.
- Preview image API: installed Next.js `16.2.4` image types define `ImageProps` as intrinsic image attributes plus `fill`, so the reusable card image can preserve responsive `sizes` and safe `data-*` QA markers. Local evidence: `node_modules/next/dist/shared/lib/get-img-props.d.ts`.
- Verification: production Next build and TypeScript passed for all 115 routes; focused ESLint and `git diff --check` passed; browser tests proved both the built-in fallback and published CMS overrides with background, fit, and padding controls. Preview synchronization QA compared each direct product card's rendered Sanity asset with image #1 in its linked gallery across desktop and mobile.
