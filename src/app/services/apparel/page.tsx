import ServiceStub from '../_stub'

export const metadata = {
  title: 'Apparel & Promo | Lettuce Print',
  description: 'Custom screen printed apparel, embroidery, and branded promo products for merch drops, events, and teams.',
  alternates: { canonical: 'https://lettuceprint.com/services/apparel' },
}

export default function ApparelPage() {
  return (
    <ServiceStub
      title="Apparel & Promo"
      tagline="Merch that moves. Gear your people actually wear."
      description="Screen printing, embroidery, and custom promo goods for brands, events, teams, and drops. We work with streetwear labels, restaurants, nonprofits, and everyone in between."
      examples={[
        'Screen Printed T-Shirts',
        'Hoodies & Crewnecks',
        'Embroidered Hats & Caps',
        'Tote Bags',
        'Stickers & Patches',
        'Branded Promo Items',
        'Uniforms & Team Gear',
        'Merch Drop Fulfillment',
      ]}
    />
  )
}
