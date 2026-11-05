// Renders structured data for search engines and AI shopping agents.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export const SITE_URL = 'https://lettuceprint.com'

export function productJsonLd({ name, description, path, lowPrice }: { name: string; description: string; path: string; lowPrice?: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: SITE_URL + path,
    brand: { '@type': 'Brand', name: 'Lettuce Print' },
    ...(lowPrice ? { offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: lowPrice.toFixed(2), availability: 'https://schema.org/InStock', url: SITE_URL + path } } : {}),
  }
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE_URL + it.path })),
  }
}
