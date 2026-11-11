import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import QuoteForm from '@/components/quote/QuoteForm'
import FaqSection from '@/components/seo/FaqSection'
import JsonLd, { productJsonLd } from '@/components/seo/JsonLd'

type ApparelService = {
  slug: string
  title: string
  eyebrow: string
  description: string
  bestFor: string[]
  details: string[]
}

const services: ApparelService[] = [
  {
    slug: 'screenprint',
    title: 'Screen Printing',
    eyebrow: 'Apparel & Promo',
    description: 'Durable, high-impact prints for tees, hoodies, totes, uniforms, and brand merch. Best for bulk runs and solid-color artwork.',
    bestFor: ['Brand drops', 'Event merch', 'Staff uniforms', 'Bulk giveaways'],
    details: ['Pantone color matching available', 'Works on cotton and blended garments', 'Bulk pricing improves with quantity', 'Placement guidance for chest, back, sleeve, and nape prints'],
  },
  {
    slug: 'embroidery',
    title: 'Embroidery',
    eyebrow: 'Apparel & Promo',
    description: 'Clean stitched branding for hats, polos, jackets, bags, and uniforms. Premium feel with long-term durability.',
    bestFor: ['Hats', 'Polos', 'Outerwear', 'Uniform programs'],
    details: ['Digitizing support available', 'Thread color matching', 'Flat and structured garment options', 'Great for logos and simple marks'],
  },
  {
    slug: 'dtg',
    title: 'DTG Printing',
    eyebrow: 'Apparel & Promo',
    description: 'Full-color direct-to-garment printing for detailed art, small batches, and quick-turn merch without screen setup.',
    bestFor: ['Small runs', 'Full-color artwork', 'Samples', 'Photo-style graphics'],
    details: ['Low minimums', 'Best on cotton garments', 'Soft hand feel', 'Fast option for detailed prints'],
  },
  {
    slug: 'dtf',
    title: 'DTF Printing',
    eyebrow: 'Apparel & Promo',
    description: 'Full-color Direct-To-Film printing for detailed artwork on tees, hoodies, and apparel. Printed transfers are heat-applied to your garments for bold, versatile branding.',
    bestFor: ['Full-color logos', 'Detailed artwork', 'Brand merch', 'Team apparel'],
    details: ['Artwork is printed onto transfer film, then heat-applied to the garment', 'Suitable for many cotton, polyester, and blended garments; compatibility confirmed with your quote', 'Share your garment colors, sizes, and print placements', 'Pricing and production timing confirmed after artwork and garment review'],
  },
  {
    slug: 'custom-items',
    title: 'Custom Promo Items',
    eyebrow: 'Apparel & Promo',
    description: 'Sourced and branded promo pieces for events, retail kits, employee onboarding, and launch campaigns.',
    bestFor: ['Tote bags', 'Drinkware', 'Giveaway kits', 'Retail add-ons'],
    details: ['Product sourcing support', 'Multiple decoration methods', 'Kitting and fulfillment available by quote', 'Good for brand activations and pop-ups'],
  },
]

const SERVICE_FAQS: Record<string, { q: string; a: string }[]> = {
  screenprint: [
    { q: 'When is screen printing the best choice?', a: 'Screen printing is best for larger runs and artwork with a limited number of solid colors. Per-piece pricing improves as quantity goes up.' },
    { q: 'Can you match Pantone colors?', a: 'Yes. Pantone color matching is available for screen printed orders.' },
    { q: 'What garments can you print?', a: 'Tees, hoodies, totes, uniforms and most cotton or blended garments. Send your garment list and we will confirm.' },
    { q: 'How do I get a quote?', a: 'Use the quote form on this page with your garments, quantity, print locations, artwork and deadline. You can attach artwork up to 4 MB total.' },
  ],
  embroidery: [
    { q: 'What items can be embroidered?', a: 'Hats, polos, jackets, bags and uniforms, including flat and structured garments.' },
    { q: 'Do you digitize my logo?', a: 'Yes. Digitizing support is available so your logo stitches cleanly.' },
    { q: 'Can you match thread colors?', a: 'Yes. Thread colors are matched to your brand as closely as possible.' },
    { q: 'How do I get a quote?', a: 'Send garment type, quantity, embroidery locations, thread colors and your deadline through the form on this page.' },
  ],
  dtg: [
    { q: 'What is DTG printing?', a: 'Direct-to-garment (DTG) printing prints full-color artwork straight onto the garment with no screens, which makes it ideal for detailed art and small batches.' },
    { q: 'When should I choose DTG over screen printing?', a: 'Choose DTG for small runs, samples and full-color or photo-style artwork. Screen printing is usually more cost-effective for large runs with a few solid colors.' },
    { q: 'What garments work best for DTG?', a: 'DTG works best on cotton garments and produces a soft hand feel.' },
    { q: 'How do I get a quote?', a: 'Tell us about your garments, print placements, artwork and in-hands date using the form on this page.' },
  ],
  dtf: [
    { q: 'What is DTF printing?', a: 'Direct-To-Film (DTF) printing creates your artwork on transfer film, which is then heat-applied to apparel. It supports full-color designs and fine detail.' },
    { q: 'How is DTF different from DTG?', a: 'DTG prints ink directly onto the garment. DTF prints onto film first, then transfers the design with heat. We can recommend a method based on your artwork, garment, and desired finish.' },
    { q: 'Which garments can be printed with DTF?', a: 'DTF can work with many cotton, polyester, and blended garments. Send the garment brand, fabric, and color so we can confirm compatibility before production.' },
    { q: 'How do I get a DTF quote?', a: 'Use the form on this page to share garment type, quantity, print placements, artwork, and timeline. We will review the details and quote the finished apparel.' },
  ],
  'custom-items': [
    { q: 'What promo items can you source?', a: 'Tote bags, drinkware, giveaway kits, retail add-ons and more. We source products and recommend the right decoration method.' },
    { q: 'Do you offer kitting and fulfillment?', a: 'Yes, kitting and fulfillment are available by quote.' },
    { q: 'How do I get a quote?', a: 'Tell us what you need, quantities and your event or launch date, and we will put together options.' },
  ],
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  if (!service) return {}

  return {
    title: service.title,
    description: `${service.title} from Lettuce Print in Brooklyn. ${service.description}`,
    alternates: { canonical: `https://lettuceprint.com/services/apparel/${service.slug}` },
  }
}

export default async function ApparelServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  if (!service) notFound()

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-white border-b border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">{service.eyebrow}</p>
            <h1 className="text-display font-semibold text-gray-900 mb-5 max-w-3xl mx-auto">{service.title}</h1>
            <p className="text-body-lg text-gray-500 max-w-2xl mx-auto">{service.description}</p>
          </div>
        </section>

        <section id="request-quote" aria-label={service.slug === 'embroidery' ? 'Request an embroidery quote' : `Request a ${service.title.toLowerCase()} quote`} className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-h2 font-semibold text-gray-900 mb-4">Ready to price it?</h2>
              <p className="text-body text-gray-500">{service.slug === 'embroidery' ? 'Send garment type, quantity, embroidery locations, thread colors, and deadline. We’ll prepare a quote.' : (service.slug === 'dtg' || service.slug === 'dtf') ? 'Tell us about your garments, print placements, artwork, and in-hands date. We’ll review the details and prepare a quote.' : 'Send garment type, quantity, print locations, artwork, and deadline. We’ll recommend the cleanest production route.'}</p>
            </div>
            {service.slug === 'screenprint' ? (
              <QuoteForm initialValues={{ service: 'Screen Printing', projectDetails: {} }} lockService allowArtwork />
            ) : service.slug === 'embroidery' ? (
              <QuoteForm initialValues={{ service: 'Embroidery', projectDetails: {} }} lockService allowArtwork />
            ) : service.slug === 'dtg' ? (
              <QuoteForm initialValues={{ service: 'DTG Printing', projectDetails: {} }} lockService allowArtwork />
            ) : service.slug === 'dtf' ? (
              <QuoteForm initialValues={{ service: 'DTF Printing', projectDetails: {} }} lockService allowArtwork />
            ) : (
              <div className="text-center"><Link href="/get-quote"><Button size="lg">Request a Quote</Button></Link></div>
            )}
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-card p-7 shadow-card">
              <h2 className="text-h3 font-semibold text-gray-900 mb-5">Best for</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {service.bestFor.map((item) => <li key={item} className="rounded-card bg-lp-green/5 border border-lp-green/15 px-4 py-3 text-small text-gray-700">{item}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-gray-100 rounded-card p-7 shadow-card">
              <h2 className="text-h3 font-semibold text-gray-900 mb-5">Production notes</h2>
              <ul className="space-y-3">
                {service.details.map((item) => <li key={item} className="flex items-start gap-3 text-small text-gray-600"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-lp-green flex-shrink-0" />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"><FaqSection faqs={SERVICE_FAQS[service.slug] ?? []} /></div>
        </section>
        <JsonLd data={productJsonLd({ name: service.title, description: service.description, path: `/services/apparel/${service.slug}` })} />
      </main>
      <Footer />
    </>
  )
}
