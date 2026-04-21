import ServiceStub from '../_stub'

export const metadata = {
  title: 'Marketing Materials | Lettuce Print',
  description: 'Custom flyers, brochures, postcards, business cards, and print collateral — designed and printed in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/services/marketing-materials' },
}

export default function MarketingMaterialsPage() {
  return (
    <ServiceStub
      title="Marketing Materials"
      tagline="Print that sells. Collateral your customers actually keep."
      description="From launch day flyers to trade show packets, we handle everything from design through fulfillment. Fast turnaround, sharp print, Brooklyn-based."
      examples={[
        'Flyers & Handouts',
        'Brochures & Booklets',
        'Postcards & Mailers',
        'Business Cards',
        'Table Tents & Inserts',
        'Sell Sheets',
        'Event Programs',
        'Rack Cards',
      ]}
    />
  )
}
