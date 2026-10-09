import ProductOrderPage from '@/components/shop/ProductOrderPage'

export default function Page() {
  return <ProductOrderPage
    bannerKind="double-sided"
    name="Double-Sided Banner"
    tagline="18 oz blockout vinyl, matte both sides. No show-through. Indoor/outdoor, ideal for pole and hanging banners."
    parentHref="/services/signage/banners"
    breadcrumb={[{ label: 'Banners', href: '/services/signage/banners' }, { label: 'Double-Sided Banner', href: '' }]}
    color="#E8F5F1"
    optionGroups={[]}
    images={[{ src: '/images/products/banners/double-sided-placeholder.svg', alt: 'Double-sided banner — placeholder illustration, not a product photograph' }]}
    specs={[
      { label: 'Material', value: '18 oz blockout vinyl, matte both sides. No show-through. Indoor/outdoor.' },
      { label: 'Size', value: 'Custom, 12 in to 126 in wide' },
      { label: 'Turnaround', value: 'Ships 3 business days after proof approval + UPS transit' },
      { label: 'Included', value: 'Hemmed edges + grommets every 24 in' },
      { label: 'Product image', value: 'Placeholder illustration — final product imagery pending' },
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
      { href: '/services/signage/banners/vinyl-banner', name: 'Vinyl Banner', description: 'Single-sided matte vinyl for everyday displays.' },
      { href: '/services/signage/banners', name: 'All Banners', description: 'Explore the banner lineup.' },
    ]}
  />
}
