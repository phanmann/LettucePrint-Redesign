import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import CustomPackagingHeroForm from '@/components/quote/CustomPackagingHeroForm'

const CAPABILITIES = [
  { label: 'Custom Structures', desc: 'Unique box shapes, unusual openings, multi-piece sets — we build from your dieline or create one from scratch.' },
  { label: 'Special Finishes', desc: 'Soft-touch laminate, spot UV, foil stamping, emboss/deboss, aqueous coating — finishing that makes product feel premium.' },
  { label: 'Low Minimums', desc: 'We work with indie brands. You don\'t need to order 10,000 units to get great custom packaging.' },
  { label: 'Full-Color Print', desc: 'CMYK + Pantone matching. Inside and out. Bright, accurate, consistent.' },
  { label: 'Sustainable Options', desc: 'FSC-certified stock, recycled board, soy-based inks — sustainable packaging without sacrificing quality.' },
  { label: 'Fulfillment Ready', desc: 'We can kit, assemble, and ship orders from our Brooklyn studio. One less thing for you to manage.' },
]

export default function CustomPackagingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-white pb-20 pt-[calc(72px+4rem)]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16 lg:px-8">
            <div className="lg:sticky lg:top-28">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-lp-green">Boxes & Packaging</p>
              <h1 className="text-display max-w-2xl font-semibold text-gray-900">Custom packaging, built around your brand.</h1>
              <p className="text-body-lg mt-6 max-w-2xl text-gray-500">
                Got something that doesn&apos;t fit a template? Good. We do custom from scratch — unique structures, premium finishes, low minimums. Tell us what you&apos;re building and we&apos;ll figure it out together.
              </p>
            </div>
            <CustomPackagingHeroForm />
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-semibold text-gray-900 mb-10">What we bring to the table</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAPABILITIES.map(cap => (
                <div key={cap.label} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="w-2 h-2 rounded-full bg-lp-green mb-4" />
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{cap.label}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Ready to build something?</h2>
            <p className="text-body text-gray-500 mb-8">Share your product dimensions, quantity, and any finish ideas — we&apos;ll come back with options and pricing.</p>
            <Link href="/get-quote?category=Custom+Packaging">
              <Button size="lg">Start a Project</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
