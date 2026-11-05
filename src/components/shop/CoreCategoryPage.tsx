import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ShapePlaceholder from '@/components/shop/ShapePlaceholder'
import FaqSection from '@/components/seo/FaqSection'
import JsonLd, { SITE_URL, breadcrumbJsonLd } from '@/components/seo/JsonLd'
import type { Faq, PlaceholderShape } from '@/lib/sticker-catalog'

export interface CoreCard {
  href: string
  name: string
  summary: string
  shape: PlaceholderShape
  tone?: 'solid' | 'clear' | 'holographic'
}

// Core category page: H1 + intro, one card per type, FAQs, and ItemList schema.
export default function CoreCategoryPage({ eyebrow, title, intro, path, cards, roll = false, faqs, crossLink }: {
  eyebrow: string
  title: string
  intro: string
  path: string
  cards: CoreCard[]
  roll?: boolean
  faqs: Faq[]
  crossLink: { href: string; label: string; text: string }
}) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-white border-b border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">{eyebrow}</p>
            <h1 className="text-display font-semibold text-gray-900 mb-5 max-w-3xl">{title}</h1>
            <p className="text-body-lg text-gray-500 max-w-2xl">{intro}</p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="sr-only">Choose a type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {cards.map(card => (
                <Link key={card.href} href={card.href} className="group flex flex-col bg-white border border-gray-100 rounded-card overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all">
                  <ShapePlaceholder shape={card.shape} tone={card.tone} roll={roll} label={card.name} className="aspect-[4/3] p-6" />
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-h4 font-semibold text-gray-900 mb-2 group-hover:text-lp-green transition-colors">{card.name}</h3>
                    <p className="text-small text-gray-600 mb-5 flex-1">{card.summary}</p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lp-green">View options <ArrowRight size={13} /></span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-10 text-sm text-gray-600">{crossLink.text} <Link href={crossLink.href} className="font-semibold text-lp-green hover:underline">{crossLink.label} →</Link></p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"><FaqSection faqs={faqs} /></div>
        </section>

        <JsonLd data={{
          '@context': 'https://schema.org', '@type': 'ItemList', name: title,
          itemListElement: cards.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: SITE_URL + c.href })),
        }} />
        <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: eyebrow, path }])} />
      </main>
      <Footer />
    </>
  )
}
