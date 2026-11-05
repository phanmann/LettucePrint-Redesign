import type { Metadata } from 'next'
import CoreCategoryPage from '@/components/shop/CoreCategoryPage'
import { ROLL_LABEL_SHAPES } from '@/lib/sticker-catalog'

export const metadata: Metadata = {
  title: 'Custom Roll Labels | Rectangle, Circle, Square & Oval',
  description: 'Custom roll labels printed in Brooklyn in rectangle, circle, square and oval shapes. Paper or BOPP, matte or gloss laminate, live pricing from 250 labels.',
  alternates: { canonical: 'https://lettuceprint.com/shop/roll-labels' },
}

export default function RollLabelsPage() {
  return <CoreCategoryPage
    eyebrow="Roll Labels"
    title="Custom roll labels for products at volume."
    intro="Kiss-cut labels on a roll for hand or machine application. Pick a shape to see live pricing by size and quantity."
    path="/shop/roll-labels"
    roll
    cards={ROLL_LABEL_SHAPES.map(s => ({ href: `/shop/roll-labels/${s.slug}`, name: s.name, summary: s.summary, shape: s.shape }))}
    faqs={[
      { q: 'What are roll labels used for?', a: 'Product, bottle, jar and packaging labels for food and beverage, cannabis, health and beauty, retail and shipping.' },
      { q: 'What is the minimum order?', a: 'Roll labels start at 250 labels, with lower per-label pricing at higher quantities.' },
      { q: 'Can I apply them with a machine?', a: 'Yes. Choose machine application and the unwind direction when you order so labels feed correctly.' },
      { q: 'How fast is production?', a: 'Standard production is 3–5 business days after proof approval, plus shipping.' },
    ]}
    crossLink={{ href: '/shop/stickers', label: 'Shop stickers', text: 'Need individual stickers instead?' }}
  />
}
