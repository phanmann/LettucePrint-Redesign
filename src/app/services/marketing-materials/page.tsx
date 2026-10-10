import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import ProductCard, { type ProductCardProps } from '@/components/shop/ProductCard'

export const metadata: Metadata = {
  title: 'Marketing Materials Printing',
  description: 'Business cards, postcards, brochures, flyers, posters, and booklets printed by Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/services/marketing-materials' },
}

type CatalogItem = {
  id: string
  navLabel: string
  card: ProductCardProps
}

const essentials: CatalogItem[] = [
  {
    id: 'standard-business-cards', navLabel: 'Standard Cards',
    card: {
      id: 'bc-standard', name: 'Standard Business Cards', subtitle: '3.5" × 2"',
      description: 'Full-color printing on your choice of finish — matte, gloss, or uncoated. Clean, professional, and fast.',
      color: '#E8F5F1', image: 'https://drive.usercontent.google.com/download?id=1LYzqKl5GRanrRWxBdsn_tnLxmp2dau-D&export=view',
      options: [
        { label: 'Finishes', values: ['Matte', 'Gloss', 'Uncoated'] },
        { label: 'Stock', values: ['14 pt', '16 pt'] },
        { label: 'Sides', values: ['Single-sided', 'Double-sided'] },
      ],
      features: ['14–16 pt card stock', 'Full-color CMYK printing', 'Matte, gloss, or uncoated finish', 'Rounded corner option', 'Single or double-sided'],
      turnaround: '2–3 business days', categoryLabel: 'Standard Business Cards',
      href: '/services/marketing-materials/business-cards/standard',
    },
  },
  {
    id: 'premium-business-cards', navLabel: 'Premium Cards',
    card: {
      id: 'bc-premium', name: 'Premium Business Cards', subtitle: '3.5" × 2"',
      description: 'Stand-out finishes for brands that want to leave an impression. Soft-touch, spot UV, foil, and extra-thick options.',
      color: '#F0E8F5', image: 'https://drive.usercontent.google.com/download?id=1MHeRH5jLNMqM58gLeg9xmIsKEn791F7K&export=view',
      options: [
        { label: 'Finishes', values: ['Soft Touch', 'Spot UV', 'Foil Stamped', 'Extra Thick 32pt'] },
        { label: 'Stock', values: ['18 pt', '32 pt'] },
        { label: 'Extras', values: ['Edge painting', 'Colored core', 'Rounded corners'] },
      ],
      features: ['18–32 pt card stock', 'Soft-touch matte laminate', 'Raised spot UV overlay', 'Hot foil stamping', 'Colored core and edge painting available'],
      turnaround: '3–7 business days', categoryLabel: 'Premium Business Cards',
      href: '/services/marketing-materials/business-cards/premium',
    },
  },
  {
    id: 'standard-postcards', navLabel: 'Standard Postcards',
    card: {
      id: 'pc-standard', name: 'Standard Postcards', subtitle: '4×6 · 5×7 · 6×9 · 6×11',
      description: 'Full-color printing on 100 lb. gloss or matte stock. Available in all standard mailer sizes — USPS compliant, bulk pricing available.',
      color: '#E8F5F1', image: 'https://drive.usercontent.google.com/download?id=16GP_uv16UVWwZyO_WAvAZDfCMoMRsCoE&export=view',
      options: [
        { label: 'Sizes', values: ['4" × 6"', '5" × 7"', '6" × 9"', '6" × 11"'] },
        { label: 'Stock', values: ['100 lb. Gloss', '100 lb. Matte'] },
        { label: 'Sides', values: ['Single-sided', 'Double-sided'] },
      ],
      features: ['100 lb. gloss or matte stock', 'Full-color CMYK both sides', 'USPS postcard compliant', 'Bulk pricing available', 'Rounded corner option'],
      turnaround: '2–3 business days', categoryLabel: 'Standard Postcards',
      href: '/services/marketing-materials/postcards/standard',
    },
  },
  {
    id: 'premium-postcards', navLabel: 'Premium Postcards',
    card: {
      id: 'pc-premium', name: 'Premium Postcards', subtitle: 'Custom sizes available',
      description: 'Stand-out finishes for mailers that demand attention. Soft-touch laminate or raised spot UV on heavy 18 pt stock.',
      color: '#F0E8F5', image: 'https://drive.usercontent.google.com/download?id=1wnC7cM8WjOAV5H2gx3DK3u9gr5WLmx4A&export=view',
      options: [
        { label: 'Finishes', values: ['Soft Touch', 'Spot UV'] },
        { label: 'Stock', values: ['18 pt'] },
        { label: 'Sides', values: ['Single-sided', 'Double-sided'] },
      ],
      features: ['18 pt card stock', 'Soft-touch matte laminate', 'Raised spot UV overlay', 'Full-color CMYK printing', 'Custom sizes available'],
      turnaround: '3–5 business days', categoryLabel: 'Premium Postcards',
      href: '/services/marketing-materials/postcards/premium',
    },
  },
  {
    id: 'bi-fold-brochures', navLabel: 'Bi-Fold',
    card: {
      id: 'brochure-bi-fold', name: 'Bi-Fold Brochures', subtitle: 'Four panels · two flat/finished sizes',
      description: 'Four-panel brochures, scored and folded. Select a letter or tabloid flat size, then paper stock and finish.',
      color: '#E8F5F1', image: '/images/products/brochures/bi-fold-letter/card.webp',
      options: [
        { label: 'Sizes', values: ['8.5" × 11" flat / 5.5" × 8.5" finished', '11" × 17" flat / 8.5" × 11" finished'] },
        { label: 'Stock', values: ['100 lb. text', '100 lb. cover'] },
        { label: 'Finish', values: ['Gloss', 'Matte', 'Soft-touch lamination'] },
      ],
      features: ['Four-panel scored and folded format', 'Letter and tabloid flat sizes', 'Gloss or matte finish', 'Soft-touch lamination available'],
      turnaround: 'Confirmed with quote', categoryLabel: 'Bi-Fold Brochures',
      href: '/services/marketing-materials/brochures/bi-fold',
    },
  },
  {
    id: 'tri-fold-brochures', navLabel: 'Tri-Fold',
    card: {
      id: 'brochure-tri-fold', name: 'Tri-Fold Brochures', subtitle: 'Six panels · two flat/finished sizes',
      description: 'Six-panel brochures for menus, mailers, and handouts. Select a letter or legal flat size, then paper stock and finish.',
      color: '#E8F5F1', image: '/images/products/brochures/tri-fold-letter/card.webp',
      options: [
        { label: 'Sizes', values: ['8.5" × 11" flat / ~3.67" × 8.5" finished', '8.5" × 14" flat / ~4.67" × 8.5" finished'] },
        { label: 'Stock', values: ['100 lb. text', '100 lb. cover'] },
        { label: 'Finish', values: ['Gloss', 'Matte', 'Soft-touch lamination'] },
      ],
      features: ['Six-panel folded format', 'Letter and legal flat sizes', 'Gloss or matte finish', 'Soft-touch lamination available'],
      turnaround: 'Confirmed with quote', categoryLabel: 'Tri-Fold Brochures',
      href: '/services/marketing-materials/brochures/tri-fold',
    },
  },
]

const amplify: CatalogItem[] = [
  {
    id: 'flyers', navLabel: 'Flyers',
    card: {
      id: 'flyers', name: 'Flyers', subtitle: 'Half page · full page · tabloid',
      description: 'Full-color flyers for handouts, menus, launches, and promotions. Choose your size, paper, finish, and printed sides.',
      color: '#E8F5F1', image: '/images/products/flyers/flyer-full-page-card.jpg',
      options: [
        { label: 'Sizes', values: ['5.5" × 8.5"', '8.5" × 11"', '11" × 17"'] },
        { label: 'Stock', values: ['80 lb. text', '100 lb. cover'] },
        { label: 'Finish', values: ['Gloss', 'Matte'] },
        { label: 'Sides', values: ['Single-sided', 'Double-sided'] },
      ],
      features: ['Full-color printing', 'Three flyer sizes', 'Gloss or matte finish', 'Single or double-sided'],
      turnaround: 'Confirmed with quote', categoryLabel: 'Flyers',
      href: '/services/marketing-materials/flyers',
    },
  },
  {
    id: 'posters', navLabel: 'Posters',
    card: {
      id: 'posters', name: 'Posters', subtitle: '11" × 17" · 18" × 24" · 24" × 36"',
      description: 'Full-color posters for events, retail, and displays. Select your size, stock, finish, and printed sides.',
      color: '#E8F5F1', image: '/images/products/posters/poster-1.jpg',
      options: [
        { label: 'Sizes', values: ['11" × 17"', '18" × 24"', '24" × 36"'] },
        { label: 'Stock', values: ['100 lb. text', '100 lb. cover'] },
        { label: 'Finish', values: ['Gloss', 'Matte'] },
      ],
      features: ['Full-color printing', 'Three poster sizes', 'Gloss or matte finish', 'Single or double-sided'],
      turnaround: 'Confirmed with quote', categoryLabel: 'Posters',
      href: '/services/marketing-materials/posters',
    },
  },
  {
    id: 'booklets', navLabel: 'Booklets',
    card: {
      id: 'booklets', name: 'Booklets', subtitle: 'Three binding styles',
      description: 'Saddle-stitched, Wire-O, or soft-cover perfect-bound booklets. Choose the construction, size, paper, and page count.',
      color: '#E8F5F1', image: '/images/products/booklets/booklet-open.jpg',
      options: [
        { label: 'Binding', values: ['Saddle Stitch', 'Wire-O', 'Soft-Cover Perfect Bound'] },
        { label: 'Cover', values: ['Gloss', 'Matte', 'Soft-touch'] },
        { label: 'Paper', values: ['60 lb. uncoated', '70 lb. text'] },
      ],
      features: ['Three binding styles', 'Multiple sizes and page counts', 'Cover and interior paper options'],
      turnaround: 'Confirmed with quote', categoryLabel: 'Booklets',
      href: '/services/marketing-materials/booklets',
    },
  },
]

function CatalogSection({ id, title, description, items }: {
  id: string; title: string; description: string; items: CatalogItem[]
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 border-b border-gray-100 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-lp-green">Marketing Materials</p>
          <h2 id={`${id}-heading`} className="text-h2 font-semibold text-gray-900">{title}</h2>
          <p className="mt-2 max-w-2xl text-body text-gray-500">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map(item => (
            <div key={item.id} id={item.id} className="scroll-mt-24 [&>div]:h-full">
              <ProductCard {...item.card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function MarketingMaterialsPage() {
  const allItems = [...essentials, ...amplify]
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="border-b border-gray-100 bg-white pt-14 pb-8 sm:pt-16 sm:pb-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-lp-green">Marketing Materials</p>
            <h1 className="mb-5 max-w-3xl text-display font-semibold text-gray-900">Print pieces that make the handoff feel premium.</h1>
            <p className="max-w-2xl text-body-lg text-gray-500">Cards, mailers, flyers, posters, brochures, and booklets — built for launches, events, retail, sales teams, and client leave-behinds.</p>
            <nav aria-label="Jump to marketing products" className="mt-10 border-t border-gray-100 pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Explore products</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-9">
                {allItems.map(item => (
                  <a key={item.id} href={`#${item.id}`} className="flex min-h-11 items-center justify-center rounded-full border border-lp-green px-2 py-2 text-center text-xs font-semibold leading-tight text-lp-green transition-colors hover:bg-lp-green hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lp-green">
                    {item.navLabel}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </section>
        <div className="bg-gray-50">
          <CatalogSection id="essentials" title="Essentials" description="Everyday print pieces, elevated for every introduction and handoff." items={essentials} />
          <CatalogSection id="amplify" title="Amplify" description="Larger formats and bound pieces that help your message go further." items={amplify} />
        </div>
        <section className="border-t border-gray-100 bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-h2 font-semibold text-gray-900">Need a full campaign kit?</h2>
            <p className="mb-8 text-body text-gray-500">Bundle cards, flyers, postcards, and event pieces into one quote.</p>
            <Link href="/get-quote"><Button size="lg">Request a Quote</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
