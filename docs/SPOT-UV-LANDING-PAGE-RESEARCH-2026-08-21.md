# Spot UV Paid-Ad Landing Pages — Conversion Research & Build Brief

**Prepared for:** Lettuce Print  
**Date:** August 21, 2026  
**Campaigns:** Custom Spot UV Stickers and Spot UV Miron Jar Labels

## Executive Summary

Lettuce Print should build two focused, mobile-first B2B landing pages rather than modifying a general shop page or combining both offers. Each page should preserve the exact promise of its corresponding ad, make the Spot UV effect visually obvious, qualify the buyer quickly, resolve production uncertainty, and lead into a product-specific quote form.

Recommended routes:

- `/lp/spot-uv-stickers`
- `/lp/spot-uv-miron-jar-labels`

The pages can reuse the current website's design system, quote API, artwork-upload infrastructure, product gallery components, and response-confirmation flow. However, the current generic quote journey should be bypassed because paid visitors have already selected the product.

## Research Basis

### Message match and usefulness

Google evaluates landing-page experience partly on how relevant and useful the page is to the person who clicked the ad. This supports maintaining one landing page per product and matching the ad headline, visual, offer, and CTA on the destination page.

Source: [Google Ads — About Quality Score for Search campaigns](https://support.google.com/google-ads/answer/6167118)

### Mobile-first conversion design

Unbounce's latest public Conversion Benchmark Report analyzes more than 57 million conversions, 464 million visitors, and 41,000 landing pages. Its findings emphasize that mobile traffic can greatly exceed desktop traffic while mobile conversion rates remain lower, making a deliberately mobile-first experience essential.

Source: [Unbounce Conversion Benchmark Report](https://unbounce.com/conversion-benchmark-report/)

### Performance requirements

Google's current Core Web Vitals thresholds are:

- Largest Contentful Paint (LCP): 2.5 seconds or less
- Interaction to Next Paint (INP): 200 milliseconds or less
- Cumulative Layout Shift (CLS): 0.1 or less

Source: [Google web.dev — Web Vitals](https://web.dev/articles/vitals)

### Relevant competitive pattern

Premium sticker sellers commonly combine a concise product explanation, strong product photography, product configuration, material/specification guidance, sample options, and reassurance about quality. Jukebox's Spot Gloss page is a useful category reference, although Lettuce Print's pages should be more focused on B2B lead generation and real applied work.

Source: [Jukebox — Spot Gloss Stickers](https://www.jukeboxprint.com/custom-stickers/spot-gloss)

## Shared Conversion Strategy

Paid visitors need to understand five things quickly:

1. What Spot UV looks like
2. Why it improves their brand or packaging
3. Whether Lettuce Print can handle their quantity and application
4. What information is needed to price the job
5. Why Lettuce Print is a credible production partner

The finish must be demonstrated, not merely described. The best hero asset is a short, lightweight looping video or a controlled image sequence showing directional light moving across glossy Spot UV areas against a matte surface. Static front-facing photography alone will not consistently communicate the effect on a phone.

## Recommended Shared Page Structure

1. Minimal campaign header with Lettuce Print logo and one primary CTA
2. Message-matched headline and supporting promise
3. Real Spot UV product demonstration
4. Primary `Get My Quote` CTA
5. Qualification strip: minimum order, turnaround, proofing, and custom artwork
6. Gallery of real Lettuce Print work
7. Simple explanation of how Spot UV works
8. Product-specific benefits and use cases
9. Three-step quote-to-production process
10. Specifications and artwork guidance
11. Genuine customer or company proof
12. FAQ addressing purchasing objections
13. Embedded product-specific quote form
14. Final CTA

Avoid the full ecommerce navigation above the fold. A small logo, one contact option, and one conversion action are sufficient.

## Page 1 — Custom Spot UV Stickers

### Recommended positioning

**Headline:** Custom Spot UV Stickers That Make Your Brand Stand Out

**Supporting copy:** Gloss highlights over a premium matte finish—custom-cut for brands, packaging, launches, and promotional campaigns.

**Primary CTA:** Get My Quote

### Primary proof asset

Use real macro video of a finished sticker tilting under controlled light. Add a simple annotation identifying the matte base and selective Spot UV layer.

### Benefits to emphasize

- Custom die-cut shapes
- Selective gloss placement
- Fine-detail printing
- Premium tactile and visual contrast
- Digital proof before production
- B2B quantities
- Brooklyn pickup
- Artwork-preparation assistance
- Durable or waterproof construction only if production confirms the claim
- Sample or physical-proof availability only if currently offered

### Buyer objections to answer

- What is the minimum order?
- Can I place Spot UV over fine lines or small text?
- Do I need a separate artwork layer?
- Can Lettuce Print prepare the Spot UV layer for me?
- What file formats are accepted?
- How long does proofing and production take?
- Can I split a quantity across multiple designs?
- Are these suitable for packaging, outdoor exposure, or frequent handling?

## Page 2 — Spot UV Miron Jar Labels

### Recommended positioning

**Headline:** Premium Spot UV Labels Made for Miron Jars

**Supporting copy:** Turn matte black glass into premium shelf presence with custom labels engineered around your artwork, jar, and production run.

**Primary CTA:** Get My Jar Label Quote

### Primary proof asset

Lead with completed black Miron jars rather than loose labels. Use a short three-angle sequence: normal viewing angle, side angle, then directional light revealing the gloss layer. Cannabis-specific client copy should be blurred where permission has not been secured, while preserving the visible Spot UV and label design.

### Benefits to emphasize

- Designed around Miron jar proportions
- Premium contrast against matte black glass
- Selective logo, strain name, illustration, or pattern highlights
- Fine-detail printing
- Multiple SKU or strain support, if offered
- Dieline and artwork assistance
- Digital proof before production
- B2B production quantities

### Buyer objections to answer

- Which Miron jar shapes and sizes are supported?
- Are labels supplied on rolls, sheets, or individually?
- What facestock and adhesive are used?
- Are the labels resistant to oil, moisture, refrigeration, and frequent handling?
- Can Lettuce Print provide the dieline or measure a supplied jar?
- Can one order include multiple strains or SKUs?
- What is the minimum quantity per design or SKU?
- Does the customer supply and approve compliance copy?
- Are label winding direction and machine-application requirements supported?
- What is the turnaround after proof approval?

## Quote Form Recommendation

Do not make campaign visitors repeat the generic service-selection step. The form should be preconfigured to the advertised product.

Recommended fields:

- Name
- Company
- Work email
- Phone, optional
- Quantity
- Sticker size or Miron jar model/dimensions
- Number of designs/SKUs
- Desired deadline
- Artwork upload, optional
- Project notes

Use progressive disclosure. Ask for essential qualification information first and reveal detailed production fields only when relevant. Keep the promise `Detailed quote within 1 business day` adjacent to the form CTA.

## Measurement Plan

Track at minimum:

- Landing-page view
- Primary CTA click
- Form start
- Form completion
- Artwork upload
- Phone click
- Email click
- Qualified lead
- Quote issued
- Won order and attributed revenue, where available

Preserve UTM parameters through submission. Establish a campaign and creative naming convention before launch so results can be compared by product, placement, format, headline, and asset.

## Accessibility and Performance Requirements

- Meet WCAG 2.2 AA color-contrast and keyboard-navigation requirements
- Respect reduced-motion preferences for Spot UV demonstration media
- Provide descriptive alternative text and a static fallback for video
- Avoid autoplay audio
- Use responsive image formats and correctly sized assets
- Reserve dimensions for images and video to prevent layout shift
- Lazy-load media below the fold
- Keep third-party scripts to the minimum required for attribution
- Validate Core Web Vitals on mobile before campaign launch

## Current Lettuce Print Infrastructure

The repository already contains useful building blocks:

- Spot UV product and pricing components
- Quote submission API and email confirmations
- UploadThing artwork-upload flow
- Product image gallery
- Existing `/lp/roll-labels` campaign-page pattern
- Privacy and terms coverage for quotes and uploaded artwork

The new pages should reuse those systems while introducing campaign-specific layouts, copy, questions, events, and attribution.

## Pre-Build Decisions and Contradictions

These items must be resolved before the content and form logic are treated as production-ready:

1. **Minimum quantity:** The existing Spot UV product page states a 50-sticker minimum. The paid-ad brief asks whether the minimum should be 500 pieces.
2. **Spot layer setup:** The product page says the Spot UV layer should be `white (100% K)`. The checkout page says it should be `yellow (100% Y)`.
3. **Miron specifications:** Supported jar sizes, facestock, adhesive, roll/sheet format, winding direction, environmental resistance, MOQ, SKU splitting, and turnaround are not currently defined.
4. **Approved assets:** Real-project images, videos, client names, logos, and testimonials need usage approval.
5. **Tracking:** No Meta Pixel or Conversions API implementation was located in the repository scan. Confirm whether tracking is injected externally before adding a duplicate implementation.
6. **Lead operations:** Confirm the owner, notification route, qualification process, and follow-up SLA for both campaign types.

## Recommended Build Gate

Development should begin after Lettuce Print confirms:

- The actual MOQ for each product
- The correct Spot UV artwork-layer specification
- Miron label production specifications
- Approved visual assets and customer proof
- The lead owner and conversion-tracking setup

After those answers are recorded, the implementation phase can produce both pages, product-specific forms, campaign analytics, responsive QA, accessibility QA, and a protected Vercel preview without altering the live site.
