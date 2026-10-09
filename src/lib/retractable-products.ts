import type { OptionGroup, PricingRule, ProductOrderPageProps } from '@/components/shop/ProductOrderPage'

// Customer prices only. Rush = next-day production, +40% of the standard price.
type PackagePrices = { kit: number; graphic: number; hardware: number }

const rush = (price: number) => Math.round(price * 140) / 100

const packageGroup = (kitDescription: string): OptionGroup => ({
  label: 'Package',
  options: [
    { id: 'kit', label: 'Full kit (stand + print + carry bag)', description: kitDescription },
    { id: 'graphic', label: 'Print only (replacement graphic)', description: 'No stand.' },
    { id: 'hardware', label: 'Hardware only (stand + carry bag, no print)', description: '' },
  ],
})

const packageRules = (prices: PackagePrices): PricingRule[] =>
  (['kit', 'graphic', 'hardware'] as const).map(id => ({
    selections: { Package: id },
    pricingTable: [{ qty: 1, standardPrice: prices[id], rushPrice: rush(prices[id]) }],
  }))

const graphicSpec = { label: 'Graphic', value: '420 gsm curl-free matte print with grey blockout back (stand pole stays hidden)' }
const turnaroundSpec = { label: 'Turnaround', value: 'Production 3 business days after proof approval + shipping transit. Rush: next-day production +40%.' }
const artworkRequirements = [
  { label: 'Preferred formats', value: 'AI, PDF, EPS' },
  { label: 'Accepted formats', value: 'PSD, PNG, JPG (300 DPI min)' },
  { label: 'Bleed', value: '0.125 in. on all sides' },
]
const included = [
  'Digital proof before production',
  'Full-color print',
  'Stand and carry bag when selected',
  'Quality check before shipping',
]
const pricingNote = 'Prices are per unit. Ships via UPS to your address; shipping is added at checkout.'

function product(p: {
  slug: string
  name: string
  tagline: string
  prices: PackagePrices
  kitDescription: string
  specs: { label: string; value: string }[]
  images: ProductOrderPageProps['images']
  color: string
  related: ProductOrderPageProps['relatedProducts']
}): ProductOrderPageProps {
  return {
    name: p.name,
    tagline: p.tagline,
    parentHref: '/services/signage/banners',
    breadcrumb: [
      { label: 'Banners', href: '/services/signage/banners' },
      { label: p.name, href: '' },
    ],
    badges: ['Fast Turnaround'],
    color: p.color,
    galleryBackground: 'white',
    images: p.images,
    showQuantity: true,
    optionGroups: [packageGroup(p.kitDescription)],
    pricingTable: [{ qty: 1, standardPrice: p.prices.kit, rushPrice: rush(p.prices.kit) }],
    pricingRules: packageRules(p.prices),
    pricingNote,
    specs: [...p.specs, graphicSpec, turnaroundSpec],
    artworkRequirements,
    included,
    relatedProducts: p.related,
  }
}

const xStandImage = { src: '/images/products/banners/x-stand-placeholder.svg', alt: 'X-stand banner illustration (product photo coming soon)', fit: 'contain' as const }

export const retractableProducts = {
  'retractable-standard': product({
    slug: 'retractable-standard',
    name: 'Standard Retractable Banner',
    tagline: 'Lightweight aluminum pull-up banner, 33" × 80". Sets up in under a minute.',
    prices: { kit: 149, graphic: 89, hardware: 59 },
    kitDescription: 'Aluminum roll-up base, print installed, carry bag.',
    specs: [
      { label: 'Size', value: '33 × 80 in.' },
      { label: 'Hardware', value: 'Anodized aluminum roll-up base with carry bag' },
    ],
    images: [
      { src: 'https://drive.usercontent.google.com/download?id=1lkdgvN3wjRMfftKmeu5X47ZwHyor7dzB&export=view', alt: 'Standard retractable banner display' },
      { src: 'https://drive.usercontent.google.com/download?id=1p_mlXivZBXkObui0RQPrmVH8uhVf9WNl&export=view', alt: 'Retractable banner setup' },
    ],
    color: '#E8F5F1',
    related: [
      { href: '/services/signage/banners/retractable-luxury-33', name: 'Luxury Base Retractable', description: 'Premium teardrop base for upscale displays.' },
      { href: '/services/signage/banners', name: 'All Banners', description: 'Vinyl, double-sided, X-stands and more.', dark: true },
    ],
  }),
  'retractable-luxury-33': product({
    slug: 'retractable-luxury-33',
    name: 'Luxury Base Retractable',
    tagline: 'Premium teardrop base for a stable, upscale presentation. 33" × 80". Perfect for lobbies and showrooms.',
    prices: { kit: 239, graphic: 89, hardware: 129 },
    kitDescription: 'Luxury teardrop base, print installed, carry bag.',
    specs: [
      { label: 'Size', value: '33 × 80 in.' },
      { label: 'Hardware', value: 'Luxury teardrop aluminum base with carry bag' },
    ],
    images: [
      { src: '/images/products/banners/retractable-luxury-33/luxury-base-retractable.webp', alt: 'Luxury base retractable banner display', fit: 'contain' },
      { src: 'https://drive.usercontent.google.com/download?id=1p_mlXivZBXkObui0RQPrmVH8uhVf9WNl&export=view', alt: 'Retractable banner setup', fit: 'contain' },
    ],
    color: '#E8F0F5',
    related: [
      { href: '/services/signage/banners/retractable-standard', name: 'Standard Retractable Banner', description: 'Lightweight aluminum pull-up banner.' },
      { href: '/services/signage/backdrops', name: 'Backdrops', description: 'Step and repeat, EuroFit and pop-up displays.', dark: true },
    ],
  }),
  'x-stand-24x63': product({
    slug: 'x-stand-24x63',
    name: 'X-Stand Banner 24" × 63"',
    tagline: 'Budget-friendly X-frame banner stand for counters, entrances and events.',
    prices: { kit: 79, graphic: 45, hardware: 35 },
    kitDescription: 'Fiberglass X-frame, print, carry bag.',
    specs: [
      { label: 'Size', value: '24 × 63 in.' },
      { label: 'Hardware', value: 'Lightweight fiberglass X-frame with carry bag' },
    ],
    images: [xStandImage],
    color: '#F5F0E8',
    related: [
      { href: '/services/signage/banners/x-stand-32x71', name: 'X-Stand Banner 32" × 71"', description: 'Larger X-stand for more presence.' },
      { href: '/services/signage/banners/retractable-standard', name: 'Standard Retractable Banner', description: 'Pull-up banner, 33" × 80".', dark: true },
    ],
  }),
  'x-stand-32x71': product({
    slug: 'x-stand-32x71',
    name: 'X-Stand Banner 32" × 71"',
    tagline: 'Larger X-frame banner stand for trade shows, retail floors and events.',
    prices: { kit: 119, graphic: 59, hardware: 59 },
    kitDescription: 'Fiberglass X-frame, print, carry bag.',
    specs: [
      { label: 'Size', value: '32 × 71 in.' },
      { label: 'Hardware', value: 'Lightweight fiberglass X-frame with carry bag' },
    ],
    images: [xStandImage],
    color: '#F5F0E8',
    related: [
      { href: '/services/signage/banners/x-stand-24x63', name: 'X-Stand Banner 24" × 63"', description: 'Compact budget X-stand.' },
      { href: '/services/signage/banners/retractable-standard', name: 'Standard Retractable Banner', description: 'Pull-up banner, 33" × 80".', dark: true },
    ],
  }),
} satisfies Record<string, ProductOrderPageProps>
