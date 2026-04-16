import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import QuoteForm from '@/components/quote/QuoteForm'

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: 'Request a custom print quote from Lettuce Print. Packaging, stickers, signage, screen printing, large format — we do it all. Response within 1 business day.',
}

export default function GetQuotePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">

        {/* Header */}
        <div className="bg-lp-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Get a Quote</p>
            <h1 className="text-h1 font-semibold text-white mb-4">
              Tell us what you need.
            </h1>
            <p className="text-body-lg text-white/70 max-w-xl">
              Fill out the form below and we&apos;ll get back to you within 1 business day with a detailed quote.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Left — Form */}
            <div className="lg:col-span-2">
              <QuoteForm />
            </div>

            {/* Right — Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-card border border-gray-100 p-6">
                <h3 className="text-h4 font-semibold text-gray-900 mb-4">What happens next?</h3>
                <ol className="space-y-4">
                  {[
                    { step: '01', text: 'We review your request and any details you provided.' },
                    { step: '02', text: 'We prepare a detailed quote with pricing and timeline.' },
                    { step: '03', text: 'You receive our quote within 1 business day.' },
                    { step: '04', text: 'Approve and we get started — or ask questions first.' },
                  ].map(item => (
                    <li key={item.step} className="flex gap-4">
                      <span className="text-xs font-bold text-lp-green bg-lp-green/10 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <p className="text-small text-gray-600">{item.text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-lp-green rounded-card p-6">
                <h3 className="text-h4 font-semibold text-white mb-2">Need it faster?</h3>
                <p className="text-small text-white/80 mb-4">
                  Call or text us directly for urgent orders.
                </p>
                <a
                  href="tel:+17182550000"
                  className="inline-block text-small font-semibold text-white underline underline-offset-2"
                >
                  (718) 255-0000
                </a>
              </div>

              <div className="rounded-card border border-gray-200 p-6">
                <h3 className="text-h4 font-semibold text-gray-900 mb-2">Standard products?</h3>
                <p className="text-small text-gray-600 mb-4">
                  Skip the form — order stickers and labels directly with live pricing.
                </p>
                <a
                  href="/shop"
                  className="inline-flex items-center gap-1.5 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors"
                >
                  Go to shop →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
