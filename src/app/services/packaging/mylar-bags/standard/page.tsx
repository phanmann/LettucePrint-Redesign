import ProductOrderPage from '@/components/shop/ProductOrderPage'
import {
  MYLAR_CR, MYLAR_GLOSS, MYLAR_MATTE, MYLAR_REGULAR, MYLAR_SOFT_TOUCH, MYLAR_SIZE,
  mylarPriceCents,
} from '@/lib/mylar-pricing'

const quantities = [1000, 3000, 5000]
const pricingRules = [
  { Seal: 'regular', Finish: 'gloss', material: MYLAR_REGULAR, finish: MYLAR_GLOSS },
  { Seal: 'cr', Finish: 'gloss', material: MYLAR_CR, finish: MYLAR_GLOSS },
  { Seal: 'regular', Finish: 'matte', material: MYLAR_REGULAR, finish: MYLAR_MATTE },
  { Seal: 'cr', Finish: 'matte', material: MYLAR_CR, finish: MYLAR_MATTE },
  { Seal: 'regular', Finish: 'soft-touch', material: MYLAR_REGULAR, finish: MYLAR_SOFT_TOUCH },
  { Seal: 'cr', Finish: 'soft-touch', material: MYLAR_CR, finish: MYLAR_SOFT_TOUCH },
].map(({ Seal, Finish, material, finish }) => ({
  selections: { Seal, Finish },
  pricingTable: quantities.map(qty => ({
    qty,
    standardPrice: mylarPriceCents({ size: MYLAR_SIZE, qty, material, finish, rush: 'standard' }) / 100,
  })),
}))

export default function Page() {
  return (
    <ProductOrderPage
      images={[{ src: 'https://drive.usercontent.google.com/download?id=1tnUvh9Y9jYsoOKPUbS9g0-NWdt_CR0KV&export=view', alt: 'Custom mylar bags' }]}
      name="Standard Mylar Bag"
      tagline="Custom-printed 4 × 5 in. eighth-size bags. Select your quantity, zipper, and finish."
      parentHref="/services/packaging/mylar-bags"
      breadcrumb={[
        { label: 'Mylar Bags', href: '/services/packaging/mylar-bags' },
        { label: 'Standard Mylar Bag', href: '' },
      ]}
      badges={['4 × 5 in. eighth size']}
      color="#E8F5F1"
      optionGroups={[
        { label: 'Size', options: [{ id: MYLAR_SIZE, label: MYLAR_SIZE, description: 'The only size with online pricing. Other sizes: request a quote.' }] },
        { label: 'Seal', options: [
          { id: 'regular', label: MYLAR_REGULAR, description: 'Resealable standard zipper. Included.' },
          { id: 'cr', label: MYLAR_CR, description: '+$75 per order; select if required for your product.', badge: '+$75' },
        ] },
        { label: 'Finish', options: [
          { id: 'gloss', label: MYLAR_GLOSS, description: 'Standard glossy finish. Included.' },
          { id: 'matte', label: MYLAR_MATTE, description: 'Standard matte finish. Included.' },
          { id: 'soft-touch', label: MYLAR_SOFT_TOUCH, description: '+$50 per order.', badge: '+$50' },
        ] },
      ]}
      pricingRules={pricingRules}
      pricingNote="Prices are per full order, not per bag. Shipping is calculated at checkout. Production timing is confirmed after proof approval."
      quoteOnlyAddOns={[
        { name: 'Metallic', description: 'Custom visible metallic effect; pricing by quote.' },
        { name: 'Holographic', description: 'Custom holographic effect; pricing by quote.' },
      ]}
      specs={[
        { label: 'Size', value: MYLAR_SIZE },
        { label: 'Material', value: 'Multi-layer barrier pouch' },
        { label: 'Print', value: 'Full-color custom print' },
        { label: 'Seal options', value: 'Standard zipper; child-resistant zipper +$75/order' },
        { label: 'Minimum order', value: '1,000 units' },
        { label: 'Production', value: 'Timing confirmed after proof approval' },
      ]}
      artworkRequirements={[
        { label: 'Preferred formats', value: 'AI, PDF, EPS' },
        { label: 'Accepted formats', value: 'PSD, PNG, JPG (300 DPI min)' },
        { label: 'Color mode', value: 'CMYK preferred' },
        { label: 'Bleed', value: '0.125 in. on all sides' },
        { label: 'Safe zone', value: '0.125 in. from all edges' },
      ]}
      included={[
        'Digital proof before production',
        'Full-color custom printing',
        'Quality check before ship',
        'Bulk quantity discounts',
      ]}
      customNote="Need another size, Metallic, Holographic, or a specialty construction? Tell us what you need and we’ll quote it."
      relatedProducts={[
        { href: '/services/packaging/mylar-bags/die-cut', name: 'Die-Cut Mylar Bag', description: 'Custom shaped mylar for unique shelf presence.', dark: true },
        { href: '/services/packaging/boxes', name: 'Boxes and Packaging', description: 'Custom printed boxes.' },
      ]}
    />
  )
}
