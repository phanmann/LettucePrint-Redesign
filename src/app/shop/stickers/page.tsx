import type { Metadata } from 'next'
import CoreCategoryPage from '@/components/shop/CoreCategoryPage'
import { SPOT_UV_CARD, STICKER_TYPES } from '@/lib/sticker-catalog'

export const metadata: Metadata = {
  title: 'Custom Stickers | Die Cut, Holographic, Clear & More',
  description: 'Shop custom stickers printed in Brooklyn: die cut, kiss cut, circle, square, rectangle, oval, clear, holographic and spot UV. Live pricing from 50 stickers.',
  alternates: { canonical: 'https://lettuceprint.com/shop/stickers' },
}

export default function StickersPage() {
  return <CoreCategoryPage
    eyebrow="Stickers"
    title="Custom stickers in every shape and finish."
    intro="Pick a sticker type to see live pricing. Waterproof vinyl, free digital proof, printed and cut in Brooklyn."
    path="/shop/stickers"
    cards={[
      ...STICKER_TYPES.map(t => ({ href: `/shop/stickers/${t.slug}`, name: t.name, summary: t.summary, shape: t.shape, tone: t.tone })),
      SPOT_UV_CARD,
    ]}
    faqs={[
      { q: 'Which sticker type should I choose?', a: 'Die cut follows the outline of your design. Kiss cut keeps an easy-peel border. Circle, square, rectangle and oval are classic shapes for logos and labels. Clear and holographic change the vinyl itself, and spot UV adds a raised gloss effect.' },
      { q: 'Are your stickers waterproof?', a: 'Yes. Our vinyl stickers are waterproof, UV resistant and scratch resistant. Add a protective laminate for extra durability.' },
      { q: 'How fast can I get stickers?', a: 'Standard production is 3–5 business days after proof approval, plus shipping. Call us for rush options.' },
      { q: 'Do you print roll labels too?', a: 'Yes. For high-volume product labels, see our roll labels in rectangle, circle, square and oval shapes.' },
    ]}
    crossLink={{ href: '/shop/roll-labels', label: 'Shop roll labels', text: 'Labeling products at volume?' }}
  />
}
