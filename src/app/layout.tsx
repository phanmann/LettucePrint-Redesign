import type { Metadata } from 'next'
import { sharpGrotesk } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Lettuce Print — Brooklyn\'s Creative Print Studio',
    template: '%s | Lettuce Print',
  },
  description: 'Premium print, design, and fulfillment studio in Brooklyn, NY. Custom stickers, packaging, signage, apparel, and more. Fast turnaround, real design expertise.',
  keywords: ['print shop brooklyn', 'custom stickers', 'packaging design', 'screen printing nyc', 'lettuce print'],
  openGraph: {
    title: 'Lettuce Print — Brooklyn\'s Creative Print Studio',
    description: 'Premium print, design, and fulfillment studio in Brooklyn, NY.',
    url: 'https://lettuceprint.com',
    siteName: 'Lettuce Print',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lettuce Print — Brooklyn\'s Creative Print Studio',
    description: 'Premium print, design, and fulfillment studio in Brooklyn, NY.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={sharpGrotesk.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
