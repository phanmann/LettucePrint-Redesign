import type { StickerMaterial } from '@/lib/pricing'

// Sticker and roll-label type pages (Steve, 2026-11-05). Each type is its own
// indexable URL with unique title, description, H1 and FAQs; pricing reuses
// the existing calculators and may be adjusted per type later.

export type PlaceholderShape = 'die-cut' | 'kiss-cut' | 'circle' | 'square' | 'rectangle' | 'oval'

export interface Faq { q: string; a: string }

export interface StickerType {
  slug: string
  name: string
  /** Cart/checkout product name; must be listed in STICKER_PRODUCT_MATERIALS. */
  productName: string
  materials: StickerMaterial[]
  shape: PlaceholderShape
  /** Visual treatment for the placeholder image. */
  tone?: 'solid' | 'clear' | 'holographic'
  cut: string
  summary: string
  intro: string
  metaTitle: string
  metaDescription: string
  faqs: Faq[]
}

const commonFaqs: Faq[] = [
  { q: 'How long does production take?', a: 'Standard production is 3–5 business days after you approve your digital proof, plus shipping.' },
  { q: 'Do I get a proof before printing?', a: 'Yes. Every order includes a free digital proof. Nothing prints until you approve it.' },
  { q: 'What is the minimum order?', a: 'Orders start at 50 stickers. Pricing updates live as you change size and quantity.' },
  { q: 'What file types can I upload?', a: 'AI, PDF, SVG and EPS work best. PSD, PNG, JPG and TIFF at 300 DPI or higher are also accepted.' },
]

export const STICKER_TYPES: StickerType[] = [
  {
    slug: 'die-cut', name: 'Die Cut Stickers', productName: 'Custom Die-Cut Stickers', materials: ['standard'], shape: 'die-cut',
    cut: 'Cut through the vinyl and backing to the exact outline of your design',
    summary: 'Cut to the exact shape of your artwork.',
    intro: 'Premium vinyl stickers cut precisely to the outline of your logo, character or illustration. Waterproof, durable and printed in Brooklyn.',
    metaTitle: 'Custom Die Cut Stickers | Printed in Brooklyn',
    metaDescription: 'Custom die cut stickers cut to the exact shape of your design. Waterproof vinyl, matte, gloss or laminate finish. Live pricing from 50 stickers.',
    faqs: [
      { q: 'What is a die cut sticker?', a: 'A die cut sticker is cut through both the vinyl and the backing paper along the outline of your design, so each sticker is its own custom shape.' },
      { q: 'What is the difference between die cut and kiss cut?', a: 'Die cut stickers are cut all the way through to your shape. Kiss cut stickers are cut through the vinyl only, leaving a larger backing around the design that is easier to peel and hand out.' },
      ...commonFaqs,
    ],
  },
  {
    slug: 'kiss-cut', name: 'Kiss Cut Stickers', productName: 'Kiss Cut Stickers', materials: ['standard'], shape: 'kiss-cut',
    cut: 'Vinyl cut to your shape on a larger square or rectangle backing',
    summary: 'Easy-peel stickers on a larger backing.',
    intro: 'Your design is cut through the vinyl only, leaving an easy-peel border of backing paper. Great for handouts, packaging inserts and merch drops.',
    metaTitle: 'Custom Kiss Cut Stickers | Easy-Peel Vinyl Stickers',
    metaDescription: 'Custom kiss cut stickers on an easy-peel backing. Waterproof vinyl with matte, gloss or laminate finish. Live pricing from 50 stickers.',
    faqs: [
      { q: 'What is a kiss cut sticker?', a: 'A kiss cut sticker is cut through the vinyl layer only. The backing stays a simple square or rectangle, which makes the sticker easy to peel and leaves room for branding.' },
      { q: 'When should I choose kiss cut over die cut?', a: 'Choose kiss cut for intricate designs, handouts and packaging inserts where an easy-peel border helps. Choose die cut when you want the sticker itself to be the shape.' },
      ...commonFaqs,
    ],
  },
  {
    slug: 'circle', name: 'Circle Stickers', productName: 'Circle Stickers', materials: ['standard'], shape: 'circle',
    cut: 'Round cut',
    summary: 'Classic round stickers for logos and seals.',
    intro: 'Round stickers are the go-to for logos, packaging seals and product labels. Choose any diameter and quantity with live pricing.',
    metaTitle: 'Custom Circle Stickers | Round Logo Stickers',
    metaDescription: 'Custom circle stickers for logos, packaging seals and labels. Waterproof vinyl, any diameter, matte, gloss or laminate. Live pricing from 50 stickers.',
    faqs: [
      { q: 'What sizes are circle stickers available in?', a: 'Enter any diameter from 0.5 in. up. Use the same number for width and length to get a perfect circle.' },
      { q: 'Can circle stickers be used to seal packaging?', a: 'Yes. Our permanent adhesive vinyl works well as a box, bag or envelope seal.' },
      ...commonFaqs,
    ],
  },
  {
    slug: 'square', name: 'Square Stickers', productName: 'Square Stickers', materials: ['standard'], shape: 'square',
    cut: 'Square cut with slightly rounded corners',
    summary: 'Clean square stickers for logos and labels.',
    intro: 'Square stickers give your artwork a clean, even frame — ideal for logos, social handles and product labels.',
    metaTitle: 'Custom Square Stickers | Printed in Brooklyn',
    metaDescription: 'Custom square stickers in any size. Waterproof vinyl with matte, gloss or laminate finish for logos and labels. Live pricing from 50 stickers.',
    faqs: [
      { q: 'Do square stickers have rounded corners?', a: 'Yes, corners are slightly rounded so they hold up better and resist peeling.' },
      ...commonFaqs,
    ],
  },
  {
    slug: 'rectangle', name: 'Rectangle Stickers', productName: 'Rectangle Stickers', materials: ['standard'], shape: 'rectangle',
    cut: 'Rectangle cut with slightly rounded corners',
    summary: 'Great for bumper stickers and product labels.',
    intro: 'Rectangle stickers fit wordmarks, bumper stickers, product labels and anything wider than it is tall.',
    metaTitle: 'Custom Rectangle Stickers | Bumper & Label Stickers',
    metaDescription: 'Custom rectangle stickers for bumper stickers, wordmarks and product labels. Waterproof vinyl, any size. Live pricing from 50 stickers.',
    faqs: [
      { q: 'Can I make bumper stickers?', a: 'Yes. Enter your width and length — a common bumper size is 3 × 10 in. — and the price updates instantly.' },
      ...commonFaqs,
    ],
  },
  {
    slug: 'oval', name: 'Oval Stickers', productName: 'Oval Stickers', materials: ['standard'], shape: 'oval',
    cut: 'Oval cut',
    summary: 'Elegant oval stickers for labels and branding.',
    intro: 'Oval stickers give logos and product labels a classic, premium look — popular for jars, bottles and candles.',
    metaTitle: 'Custom Oval Stickers | Oval Labels & Logo Stickers',
    metaDescription: 'Custom oval stickers for jars, bottles, candles and branding. Waterproof vinyl, any size, matte, gloss or laminate. Live pricing from 50 stickers.',
    faqs: [
      { q: 'What are oval stickers best for?', a: 'Oval stickers are popular for product labels on jars, bottles and candles, and for classic badge-style logos.' },
      ...commonFaqs,
    ],
  },
  {
    slug: 'clear', name: 'Clear Stickers', productName: 'Clear Stickers', materials: ['clear'], shape: 'die-cut', tone: 'clear',
    cut: 'Die cut to your shape on transparent vinyl',
    summary: 'Transparent vinyl so your surface shows through.',
    intro: 'Clear stickers print your design on transparent vinyl so glass, packaging and product surfaces show through around it.',
    metaTitle: 'Custom Clear Stickers | Transparent Vinyl Stickers',
    metaDescription: 'Custom clear stickers on transparent vinyl for windows, glass, bottles and packaging. Die cut to any shape. Live pricing from 50 stickers.',
    faqs: [
      { q: 'Are clear stickers fully transparent?', a: 'The vinyl is transparent, so areas without ink show the surface underneath. Light colors appear more see-through on clear vinyl.' },
      { q: 'Can clear stickers go on windows?', a: 'Yes. They are a popular choice for storefront glass, bottles and jars.' },
      ...commonFaqs,
    ],
  },
  {
    slug: 'holographic', name: 'Holographic Stickers', productName: 'Holographic Stickers', materials: ['holographic'], shape: 'die-cut', tone: 'holographic',
    cut: 'Die cut to your shape on holographic vinyl',
    summary: 'Rainbow iridescent vinyl that shifts in the light.',
    intro: 'Holographic stickers print on premium iridescent vinyl that shifts color as it catches the light — made to stand out.',
    metaTitle: 'Custom Holographic Stickers | Iridescent Vinyl',
    metaDescription: 'Custom holographic stickers on premium iridescent vinyl that shifts color in the light. Die cut to any shape. Live pricing from 50 stickers.',
    faqs: [
      { q: 'What do holographic stickers look like?', a: 'They have a rainbow, mirror-like finish that changes color as the viewing angle changes. Your artwork prints on top of the holographic vinyl.' },
      ...commonFaqs,
    ],
  },
]

/** Card on the stickers core page that links to an existing page instead of a type route. */
export const SPOT_UV_CARD = {
  href: '/shop/spot-uv', name: 'Spot UV Stickers', summary: 'Raised gloss-on-matte effect you can feel.', shape: 'square' as PlaceholderShape,
}

/** Server-side allow list: product name → materials it may be ordered in. */
export const STICKER_PRODUCT_MATERIALS: Record<string, StickerMaterial[]> = {
  // Legacy cart items created before the type pages existed.
  'Custom Die-Cut Stickers': ['standard', 'holographic'],
  ...Object.fromEntries(STICKER_TYPES.filter(t => t.productName !== 'Custom Die-Cut Stickers').map(t => [t.productName, t.materials])),
}

export interface RollLabelShape {
  slug: string
  name: string
  productName: string
  shape: PlaceholderShape
  summary: string
  intro: string
  metaTitle: string
  metaDescription: string
  faqs: Faq[]
}

const rollFaqs: Faq[] = [
  { q: 'What is the minimum order for roll labels?', a: 'Roll labels start at 250 labels. Pricing updates live by size and quantity, and larger runs get a lower price per label.' },
  { q: 'Can I choose the unwind direction?', a: 'Yes. Tell us whether you apply labels by hand or with a machine, and choose the unwind edge so labels come off the roll the right way.' },
  { q: 'Do I get a proof before printing?', a: 'Yes. Every order includes a free digital proof before production.' },
  { q: 'What materials are available?', a: 'Standard matte paper or premium BOPP, with a matte, gloss or heavy laminate. Labels are kiss-cut on a roll with a 3 in. core.' },
]

export const ROLL_LABEL_SHAPES: RollLabelShape[] = [
  {
    slug: 'rectangle', name: 'Rectangle Labels', productName: 'Rectangle Roll Labels', shape: 'rectangle',
    summary: 'The standard for product and packaging labels.',
    intro: 'Rectangle roll labels are the workhorse for product, bottle and packaging labels — easy to apply by hand or machine.',
    metaTitle: 'Custom Rectangle Roll Labels | Product Labels on a Roll',
    metaDescription: 'Custom rectangle roll labels for products, bottles and packaging. Paper or BOPP with matte or gloss laminate. Live pricing by size and quantity.',
    faqs: rollFaqs,
  },
  {
    slug: 'circle', name: 'Circle Labels', productName: 'Circle Roll Labels', shape: 'circle',
    summary: 'Round labels for lids, seals and jars.',
    intro: 'Circle roll labels are ideal for lids, jar tops, seals and round logo labels.',
    metaTitle: 'Custom Circle Roll Labels | Round Labels on a Roll',
    metaDescription: 'Custom circle roll labels for lids, jars and seals. Durable Paper or BOPP with matte or gloss laminate. Live pricing by size and quantity.',
    faqs: rollFaqs,
  },
  {
    slug: 'square', name: 'Square Labels', productName: 'Square Roll Labels', shape: 'square',
    summary: 'Clean square labels for boxes and bags.',
    intro: 'Square roll labels give boxes, bags and containers a clean, balanced label.',
    metaTitle: 'Custom Square Roll Labels | Labels on a Roll',
    metaDescription: 'Custom square roll labels for boxes, bags and containers. Paper or BOPP with matte or gloss laminate. Live pricing by size and quantity.',
    faqs: rollFaqs,
  },
  {
    slug: 'oval', name: 'Oval Labels', productName: 'Oval Roll Labels', shape: 'oval',
    summary: 'Premium oval labels for bottles and candles.',
    intro: 'Oval roll labels bring a premium look to bottles, candles and specialty food packaging.',
    metaTitle: 'Custom Oval Roll Labels | Bottle & Candle Labels',
    metaDescription: 'Custom oval roll labels for bottles, candles and food packaging. Paper or BOPP with matte or gloss laminate. Live pricing by size and quantity.',
    faqs: rollFaqs,
  },
]

export const ROLL_LABEL_PRODUCT_NAMES = ['Custom Roll Labels', 'Roll Labels', ...ROLL_LABEL_SHAPES.map(s => s.productName)]
