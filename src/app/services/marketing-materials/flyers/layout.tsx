import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flyers & Posters',
  description: 'Full-color flyers and standard posters in sizes from 5.5 × 8.5 inches through 24 × 36 inches, printed in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/services/marketing-materials/flyers' },
}

export default function FlyersAndPostersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
