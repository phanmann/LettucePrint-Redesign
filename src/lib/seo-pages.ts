import type { Metadata } from 'next'

// Per-page titles, descriptions and canonical URLs (SEO pass, 2026-11-05).
// Size variants that share one order form canonicalize to their primary page.
const PAGES: Record<string, { title: string; description: string; canonical?: string }> = {
  "/services/marketing-materials/booklets/saddle-stitch-55x85": { title: "Saddle-Stitch Booklet Printing", description: "Custom saddle-stitched booklets in 5.5×8.5, 8.5×11 or square sizes. Choose cover, interior paper and page count for catalogs, programs and menus." },
  "/services/marketing-materials/booklets/saddle-stitch-85x11": { title: "Saddle-Stitch Booklet Printing — 8.5 × 11", description: "Letter-size saddle-stitched booklets for catalogs, lookbooks and event programs. Choose cover, paper and page count.", canonical: "/services/marketing-materials/booklets/saddle-stitch-55x85" },
  "/services/marketing-materials/booklets/saddle-stitch-square": { title: "Square Saddle-Stitch Booklets", description: "Square saddle-stitched booklets for photo-heavy catalogs and lookbooks. Choose cover, interior paper and page count.", canonical: "/services/marketing-materials/booklets/saddle-stitch-55x85" },
  "/services/marketing-materials/booklets/perfect-bound-85x11": { title: "Perfect Bound Book Printing", description: "Custom perfect-bound books and catalogs with a flat glued spine, in 6×9 or 8.5×11. Choose cover, interior paper and page count." },
  "/services/marketing-materials/booklets/perfect-bound-6x9": { title: "Perfect Bound Books — 6 × 9", description: "Compact 6×9 perfect-bound books for directories, guides and editorial publications. Choose cover, paper and page count.", canonical: "/services/marketing-materials/booklets/perfect-bound-85x11" },
  "/services/marketing-materials/booklets/soft-touch-cover": { title: "Soft Touch Cover Booklets", description: "Booklets with a premium soft-touch laminated cover for brand books, portfolios and annual reports. Printed in Brooklyn." },
  "/services/marketing-materials/brochures/bi-fold-letter": { title: "Bi-Fold Brochure Printing", description: "Custom bi-fold brochures in 8.5×11, 11×17 or 12×18, on standard or premium stock. Scored and folded, with online pricing from $49." },
  "/services/marketing-materials/brochures/tri-fold-letter": { title: "Tri-Fold Brochure Printing", description: "Custom tri-fold brochures in letter, legal, 11×17 or 12×18 flat sizes. Scored and folded, full color, with online pricing from $49." },
  "/services/marketing-materials/brochures/tri-fold": { title: "Tri-Fold Brochures", description: "Custom tri-fold brochures, scored and folded, full color, with online pricing.", canonical: "/services/marketing-materials/brochures/tri-fold-letter" },
  "/services/marketing-materials/brochures/tri-fold-legal": { title: "Legal Tri-Fold Brochures — 8.5 × 14", description: "Legal-size tri-fold brochures with wider panels for copy-heavy content. Scored and folded, full-color printing.", canonical: "/services/marketing-materials/brochures/tri-fold-letter" },
  "/services/marketing-materials/brochures/soft-touch": { title: "Soft Touch Brochure Printing", description: "Brochures with a soft-touch laminated cover and premium interior — made for sales meetings, events and pitch decks." },
  "/services/marketing-materials/brochures/uncoated": { title: "Uncoated Brochure Printing", description: "Brochures on natural uncoated paper with rich ink absorption, for an editorial or artisan brand feel. Printed in Brooklyn." },
  "/services/marketing-materials/business-cards": { title: "Business Card Printing", description: "Standard and premium business cards printed in Brooklyn — matte, gloss, soft-touch, spot UV and foil options with fast turnaround." },
  "/services/marketing-materials/business-cards/standard": { title: "Standard Business Cards", description: "Classic 3.5 × 2 in. full-color business cards in matte or gloss, with live online pricing. Printed in Brooklyn." },
  "/services/marketing-materials/business-cards/premium": { title: "Premium Business Cards", description: "Premium business cards with soft-touch laminate, raised spot UV and specialty finishes that make a lasting first impression." },
  "/services/marketing-materials/postcards": { title: "Postcard Printing", description: "Full-color postcards for direct mail, events and brand campaigns. 4×6, 5×7 and 6×9 with online pricing from $49." },
  "/services/marketing-materials/postcards/standard": { title: "Postcards — 4×6, 5×7 & 6×9", description: "Full-color postcards in 4×6, 5×7 or 6×9 on Standard 100 lb. gloss or Premium 16 pt stock. Online pricing from $49 for 100." },
  "/services/marketing-materials/posters/small": { title: "Custom Poster Printing", description: "Full-color posters in 11×17, 18×24 and 24×36 for retail displays, events and storefronts. Choose your size and paper." },
  "/services/marketing-materials/posters/medium": { title: "Custom Posters — 18 × 24", description: "18×24 full-color posters for retail displays, events and storefronts.", canonical: "/services/marketing-materials/posters/small" },
  "/services/marketing-materials/posters/large": { title: "Custom Posters — 24 × 36", description: "24×36 full-color posters for storefronts, events and trade shows.", canonical: "/services/marketing-materials/posters/small" },
  "/services/marketing-materials/posters/art-print": { title: "Art Print Posters", description: "Museum-quality fine art prints on premium paper for artists, photographers and brands. Custom sizes, printed in Brooklyn." },
  "/services/marketing-materials/posters/soft-touch": { title: "Soft Touch Posters", description: "Posters with a velvety soft-touch laminate over full-color printing — a tactile luxury finish for limited editions and retail." },
  "/services/marketing-materials/flyers/full-page": { title: "Flyer Printing", description: "Custom flyers in 8.5×11, 11×17 or 12×18 on standard or premium stock, with online pricing from $49 for 100. Printed in Brooklyn." },
  "/services/marketing-materials/flyers/half-page": { title: "Half Page Flyers — 5.5 × 8.5", description: "Half-page 5.5×8.5 flyers for handouts, menus and inserts.", canonical: "/services/marketing-materials/flyers/full-page" },
  "/services/packaging/boxes/box-sleeve": { title: "Custom Box Sleeves", description: "Printed sleeves that wrap an existing box — a cost-effective way to add branded packaging. Request a custom quote." },
  "/services/packaging/boxes/folding-carton": { title: "Custom Folding Cartons", description: "Custom printed folding cartons for retail, cosmetics, food, supplements and consumer goods. Request a custom quote." },
  "/services/packaging/boxes/lid-base-box": { title: "Lid and Base Rigid Boxes", description: "Premium two-piece rigid boxes for luxury gifting, retail and unboxing experiences. Custom printed, request a quote." },
  "/services/packaging/boxes/magnetic-closure-box": { title: "Magnetic Closure Boxes", description: "High-end magnetic closure rigid boxes for luxury packaging and gifting. Custom printed in your brand colors." },
  "/services/packaging/boxes/mailer-box": { title: "Custom Mailer Boxes", description: "Custom printed mailer boxes for e-commerce, subscription boxes and brand gifting. Request a custom quote." },
  "/services/packaging/boxes/rsc-box": { title: "Custom Printed Shipping Boxes", description: "Regular slotted cartons with full-color exteriors — cost-effective custom shipping boxes for high-volume e-commerce." },
  "/services/packaging/custom-packaging": { title: "Custom Packaging Design & Printing", description: "Custom packaging built from scratch — unique structures, premium finishes and low minimums. Tell us what you are building." },
  "/services/packaging/mylar-bags": { title: "Custom Mylar Bags", description: "Custom printed Mylar bags for cannabis, food, supplements and specialty retail. Standard and die-cut shapes, child-resistant options." },
  "/services/packaging/mylar-bags/standard": { title: "Custom Printed Mylar Bags — 4 × 5", description: "Custom printed 4×5 in. eighth-size Mylar bags with online pricing. Choose quantity, zipper and finish." },
  "/services/packaging/mylar-bags/die-cut": { title: "Die-Cut Mylar Bags", description: "Custom die-cut shaped Mylar bags with a unique silhouette that stands out on the shelf. Request a custom quote." },
  "/services/signage/backdrops": { title: "Event Backdrops & Step and Repeat", description: "Step and repeat banners, Eurofit fabric walls, pop-up displays and SEG stands for events, trade shows and retail. Printed in Brooklyn." },
  "/services/signage/backdrops/eurofit-10x8": { title: "EuroFit Fabric Backdrop — 10 × 8 ft", description: "10×8 ft EuroFit dye-sublimated fabric backdrop with frame. Double-sided printing at no extra cost." },
  "/services/signage/backdrops/eurofit-8x8": { title: "EuroFit Fabric Backdrop — 8 × 8 ft", description: "8×8 ft EuroFit dye-sublimated fabric backdrop with frame. Double-sided printing at no extra cost." },
  "/services/signage/backdrops/popup-10x8": { title: "Pop-Up Display — 10 × 8 ft", description: "10×8 ft pop-up fabric display with straight or wrap styling. Dye-sublimated graphics for trade shows and events." },
  "/services/signage/backdrops/popup-20x8": { title: "Pop-Up Display — 20 × 8 ft", description: "20×8 ft pop-up fabric display wall for large booths. Straight or wrap styling, dye-sublimated graphics." },
  "/services/signage/backdrops/popup-8x8": { title: "Pop-Up Display — 8 × 8 ft", description: "8×8 ft pop-up fabric display with straight or wrap styling. Dye-sublimated graphics for events and retail." },
  "/services/signage/backdrops/seg-10x8": { title: "SEG Fabric Display — 10 × 8 ft", description: "10×8 ft SEG (silicone edge graphic) fabric display in an aluminum frame — seamless, tool-free graphic swaps." },
  "/services/signage/backdrops/seg-20x8": { title: "SEG Fabric Display — 20 × 8 ft", description: "20×8 ft SEG fabric wall for keynote stages and island booths. Silicone edge graphic in a multi-section frame." },
  "/services/signage/backdrops/seg-8x10": { title: "SEG Fabric Display — 8 × 10 ft", description: "Tall 8×10 ft SEG fabric display for stage backdrops and high-ceiling venues. Silicone edge graphic, aluminum frame." },
  "/services/signage/backdrops/step-repeat-10x8": { title: "Step and Repeat Banner — 10 × 8 ft", description: "10×8 ft premium step and repeat backdrop with an adjustable telescopic stand. Proof checked by our team." },
  "/services/signage/backdrops/step-repeat-8x8": { title: "Step and Repeat Banner — 8 × 8 ft", description: "8×8 ft premium step and repeat backdrop with an adjustable telescopic stand. Proof checked by our team." },
  "/services/signage/banners": { title: "Custom Banners & Retractable Banner Stands", description: "Retractable banner stands, X-stands, vinyl, mesh and fabric banners for events, retail and outdoor use. Printed in Brooklyn." },
  "/services/signage/banners/fabric-banner": { title: "Custom Fabric Banners", description: "Soft, wrinkle-resistant dye-sublimated fabric banners — lightweight and elegant for indoor events and retail." },
  "/services/signage/banners/mesh-banner": { title: "Custom Mesh Banners", description: "Wind-permeable perforated mesh banners for outdoor fences and large installations. Custom sizes, printed in Brooklyn." },
  "/services/signage/banners/retractable-luxury-33": { title: "Luxury Retractable Banner Stand — 33 × 80", description: "Premium teardrop-base 33×80 in. retractable banner for lobbies, trade shows and upscale events." },
  "/services/signage/banners/retractable-standard": { title: "Retractable Banner Stand — 33 × 80", description: "Lightweight aluminum 33×80 in. pull-up banner that sets up in under a minute. Full-color print, carry case included." },
  "/services/signage/banners/vinyl-banner": { title: "Custom Vinyl Banners", description: "Durable 13 oz matte vinyl banners for indoor and outdoor use. Custom sizes, hemmed edges and grommets included." },
  "/services/signage/banners/x-stand-24x63": { title: "X-Stand Banner — 24 × 63", description: "Budget-friendly 24×63 in. X-frame banner stand for counters, entrances and events." },
  "/services/signage/banners/x-stand-32x71": { title: "X-Stand Banner — 32 × 71", description: "32×71 in. X-frame banner stand for trade shows, retail floors and events." },
  "/search": { title: "Search Products", description: "Search Lettuce Print products: stickers, labels, packaging, signage, marketing materials and apparel." },
}

export function pageMetadata(path: string): Metadata {
  const p = PAGES[path]
  if (!p) throw new Error(`No SEO metadata for ${path}`)
  const url = 'https://lettuceprint.com' + (p.canonical ?? path)
  // Absolute title: a string title in a parent layout would otherwise drop the site-wide " | Lettuce Print" suffix.
  const title = `${p.title} | Lettuce Print`
  return { title: { absolute: title }, description: p.description, alternates: { canonical: url }, openGraph: { title, description: p.description, url } }
}
