import JsonLd, { faqJsonLd } from './JsonLd'

// Visible FAQ list with matching FAQPage structured data.
export default function FaqSection({ faqs, heading = 'Frequently asked questions' }: { faqs: { q: string; a: string }[]; heading?: string }) {
  return (
    <section className="mb-8" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-h3 font-semibold text-gray-900 mb-4">{heading}</h2>
      <div className="divide-y divide-gray-100 border border-gray-200 rounded-card">
        {faqs.map(f => (
          <details key={f.q} className="group px-5 py-4">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-semibold text-gray-900">
              <h3 className="text-sm font-semibold">{f.q}</h3>
              <span className="text-lp-green transition-transform group-open:rotate-45 text-lg leading-none">+</span>
            </summary>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd(faqs)} />
    </section>
  )
}
