import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy',
  description: 'Shipping, delivery, pickup, and rush production policy for Lettuce Print orders.',
  alternates: { canonical: 'https://lettuceprint.com/shipping-policy' },
}

const sections = [
  ['Brooklyn pickup', 'Local pickup may be available from Lettuce Print at 361 Stagg St, Brooklyn, NY 11206. We will confirm pickup timing once your order is complete and ready.'],
  ['Shipping options', 'Shipping options and rates depend on product type, size, weight, destination, and selected service. Online checkout may show available shipping options for eligible products. Custom quotes can include shipping estimates when requested.'],
  ['Turnaround vs. transit time', 'Production turnaround and shipping transit time are separate. A 3–5 business day production estimate means the order is expected to be ready to ship or pick up after production is complete, not necessarily delivered within that window.'],
  ['Rush orders', 'Rush production may be available depending on product, material, queue, artwork readiness, and delivery requirements. Rush fees and deadlines must be confirmed by Lettuce Print before production begins.'],
  ['Delivery issues', 'Once an order is handed to a carrier, delays, missed delivery attempts, address issues, and carrier exceptions may be outside our direct control. Contact us quickly if tracking shows a problem and we will help where we can.'],
  ['Address accuracy', 'Customers are responsible for providing accurate shipping information. Address corrections, reships, or returned packages may require additional cost.'],
  ['Damaged shipments', 'If a shipment arrives damaged, keep the packaging and contact us as soon as possible with photos of the box, label, damaged materials, and order details so we can review the issue.'],
  ['Questions', 'For time-sensitive delivery needs, call (347) 603-0557 or email steve@lettuceprint.com before placing your order.'],
]

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] bg-white">
        <section className="border-b border-gray-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Support</p>
            <h1 className="text-display font-semibold text-gray-900 mb-4">Shipping & Delivery</h1>
            <p className="text-small text-gray-500">Last updated May 6, 2026</p>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {sections.map(([title, copy]) => (
              <section key={title}>
                <h2 className="text-h4 font-semibold text-gray-900 mb-3">{title}</h2>
                <p className="text-body text-gray-600">{copy}</p>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
