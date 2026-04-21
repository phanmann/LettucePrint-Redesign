import ServiceStub from '../_stub'

export const metadata = {
  title: 'Signs & Banners | Lettuce Print',
  description: 'Custom signs, banners, backdrops, pop-up displays, and large format print for events, retail, and trade shows.',
  alternates: { canonical: 'https://lettuceprint.com/services/signage' },
}

export default function SignagePage() {
  return (
    <ServiceStub
      title="Signs & Banners"
      tagline="Go big. Show up. Stand out."
      description="From step-and-repeat backdrops to wayfinding signage to pop-up booths — we print and build displays that make your brand impossible to miss."
      examples={[
        'Step & Repeat Backdrops',
        'Retractable Roll-Up Banners',
        'Foam Board & Gatorboard Signs',
        'Vinyl Banners',
        'Window Graphics & Decals',
        'Outdoor Signage',
        'Trade Show Displays',
        'Feather Flags',
      ]}
    />
  )
}
