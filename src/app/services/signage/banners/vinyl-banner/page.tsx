import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return <ProductOrderPage
    bannerKind="vinyl"
    name="Vinyl Banner"
    tagline="Durable 13 oz matte vinyl for indoor/outdoor use. Custom sizes, hemmed edges, and grommets every 24 in included."
    parentHref="/services/signage/banners"
    breadcrumb={[{ label: 'Banners', href: '/services/signage/banners' }, { label: 'Vinyl Banner', href: '' }]}
    color="#E8F5F1"
    optionGroups={[]}
    specs={[
      { label: 'Material', value: '13 oz matte vinyl (indoor/outdoor)' },
      { label: 'Size', value: 'Custom, 12 in to 126 in wide' },
      { label: 'Turnaround', value: 'Ships 3 business days after proof approval + UPS transit' },
      { label: 'Included', value: 'Hemmed edges + grommets every 24 in' },

    ]}
    artworkRequirements={[
      { label: 'Preferred formats', value: 'AI, PDF, EPS' },
      { label: 'Accepted formats', value: 'PSD, PNG, JPG (300 DPI min)' },
      { label: 'Color mode', value: 'CMYK preferred' },
      { label: 'Bleed', value: '0.125 in. on all sides' },
      { label: 'Safe zone', value: '1 in from all edges (hems/grommets)' },
    ]}
    included={['Digital proof before production', 'Full-color CMYK printing', 'Hemmed edges + grommets every 24 in', 'Quality check before ship']}
    relatedProducts={[
      { href: '/services/signage/banners', name: 'All Banners', description: 'Explore the banner lineup.' },
    ]}
  />
}
