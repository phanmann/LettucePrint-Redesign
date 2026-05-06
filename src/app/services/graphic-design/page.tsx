import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Graphic Design & Prepress Support',
  description: 'Graphic design, layout, file setup, dielines, and prepress support from Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/services/graphic-design' },
}

const services = [
  'Print-ready file setup and cleanup',
  'Sticker, label, and packaging dielines',
  'Business card, flyer, poster, and booklet layout',
  'Brand asset prep for production',
  'Proofing support before print',
  'Material and finish recommendations',
]

export default function GraphicDesignPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-white border-b border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Graphic Design</p>
            <h1 className="text-display font-semibold text-gray-900 mb-5 max-w-3xl">Design support that understands production.</h1>
            <p className="text-body-lg text-gray-500 max-w-2xl">Need the file fixed, resized, laid out, or built from scratch? We bridge the gap between design intent and print reality so your project comes off press clean.</p>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-gray-100 rounded-card p-7 shadow-card">
              <h2 className="text-h3 font-semibold text-gray-900 mb-6">How we can help</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <li key={service} className="rounded-card bg-lp-green/5 border border-lp-green/15 px-4 py-3 text-small text-gray-700">{service}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Send what you have.</h2>
            <p className="text-body text-gray-500 mb-8">A rough logo, old PDF, screenshot, Canva file, or napkin sketch is enough to start the conversation.</p>
            <Link href="/get-quote"><Button size="lg">Get Design Help</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
