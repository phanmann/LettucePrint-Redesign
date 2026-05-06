import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for quotes, orders, artwork, proofs, production, and website use at Lettuce Print.',
  alternates: { canonical: 'https://lettuceprint.com/terms' },
}

const sections = [
  ['Quotes and pricing', 'Quotes are based on the specifications provided at the time of request. Final pricing may change if quantities, sizes, materials, finishes, deadlines, artwork condition, shipping needs, or project scope changes.'],
  ['Orders and payment', 'Orders may require full or partial payment before production begins. Online checkout pricing is based on selected options and may not cover special requests outside the listed product configuration.'],
  ['Artwork responsibility', 'Customers are responsible for submitting accurate, print-ready artwork or requesting design support. You confirm that you have the rights, licenses, or permissions needed for any artwork, logos, fonts, images, trademarks, or other materials submitted.'],
  ['Proofs and approvals', 'When a proof is provided, production will not begin until approval is received. Please review spelling, layout, sizing, colors, quantities, and all details carefully. Once approved, changes may require a new quote, additional cost, or revised timeline.'],
  ['Color and production tolerance', 'Printed colors can vary from screens, digital previews, prior runs, and proofs. Standard production tolerances may apply for trimming, placement, registration, material behavior, and finishing.'],
  ['Turnaround times', 'Turnaround estimates begin after payment, final artwork, and proof approval when applicable. Rush timelines must be confirmed by Lettuce Print and may be affected by material availability, shipping, artwork issues, or scope changes.'],
  ['Cancellations and refunds', 'Because custom print work is produced to order, cancellations or refunds may be limited once artwork review, ordering, proofing, production, or fulfillment has started. Defective or incorrect orders should be reported promptly so we can review and make it right where appropriate.'],
  ['Prohibited content', 'We may refuse work that is illegal, infringing, unsafe, hateful, deceptive, or otherwise inappropriate for production.'],
  ['Limitation of liability', 'To the fullest extent permitted by law, Lettuce Print is not liable for indirect, incidental, consequential, or lost-profit damages related to website use, delays, order issues, or printed materials.'],
  ['Contact', 'Questions about these terms can be sent to steve@lettuceprint.com or mailed to Lettuce Print, 361 Stagg St, Brooklyn, NY 11206.'],
]

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] bg-white">
        <section className="border-b border-gray-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Legal</p>
            <h1 className="text-display font-semibold text-gray-900 mb-4">Terms of Service</h1>
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
