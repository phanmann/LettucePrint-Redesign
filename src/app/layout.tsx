import type { Metadata } from 'next'
import Script from 'next/script'
import { sharpGrotesk } from '@/lib/fonts'
import './globals.css'

const BASE_URL = 'https://lettuceprint.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Lettuce Print — Brooklyn\'s Creative Print Studio',
    template: '%s | Lettuce Print',
  },
  description: 'Premium print, design, and fulfillment studio in Brooklyn, NY. Custom stickers, packaging, signage, apparel, and more. Fast turnaround, real design expertise.',
  keywords: [
    'print shop brooklyn',
    'custom stickers nyc',
    'custom packaging brooklyn',
    'screen printing nyc',
    'roll labels',
    'spot uv stickers',
    'graphic design brooklyn',
    'lettuce print',
    'brooklyn print studio',
  ],
  openGraph: {
    title: 'Lettuce Print — Brooklyn\'s Creative Print Studio',
    description: 'Premium print, design, and fulfillment studio in Brooklyn, NY. Fast turnaround, real design expertise.',
    url: BASE_URL,
    siteName: 'Lettuce Print',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lettuce Print — Brooklyn\'s Creative Print Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lettuce Print — Brooklyn\'s Creative Print Studio',
    description: 'Premium print, design, and fulfillment studio in Brooklyn, NY.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#business`,
  name: 'Lettuce Print',
  description: 'Premium print, design, and fulfillment studio in Brooklyn, NY. Custom stickers, packaging, signage, screen printing, and more.',
  url: BASE_URL,
  telephone: '+13476030557',
  email: 'steve@lettuceprint.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '361 Stagg St',
    addressLocality: 'Brooklyn',
    addressRegion: 'NY',
    postalCode: '11206',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.7058,
    longitude: -73.9371,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  image: `${BASE_URL}/og-image.png`,
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Credit Card, ACH',
  areaServed: {
    '@type': 'City',
    name: 'New York City',
  },
  sameAs: [
    'https://www.instagram.com/lettuceprint',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Print Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Stickers & Labels' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Spot UV Stickers' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roll Labels' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Packaging' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Screen Printing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Signage & Displays' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Large Format Printing' } },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={sharpGrotesk.variable}>
      <head>
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}

        {/* Local Business JSON-LD */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
