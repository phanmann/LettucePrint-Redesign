import ServiceStub from '../_stub'

export const metadata = {
  title: 'Boxes & Packaging | Lettuce Print',
  description: 'Custom printed boxes, mailers, bags, and packaging for brands, ecommerce, and retail — made in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/services/packaging' },
}

export default function PackagingPage() {
  return (
    <ServiceStub
      title="Boxes & Packaging"
      tagline="Your product deserves packaging as good as what's inside."
      description="Custom structural and printed packaging for retail, ecommerce, gifting, and cannabis brands. We handle dielines, print, and finishing — you handle the product."
      examples={[
        'Custom Folding Cartons',
        'Mailer Boxes',
        'Rigid Boxes',
        'Bags & Pouches',
        'Sleeves & Wraps',
        'Cannabis Compliance Packaging',
        'Unboxing Inserts',
        'Hang Tags',
      ]}
    />
  )
}
