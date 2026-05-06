import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

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
    slug: 'custom-items',
    title: 'Custom Promo Items',
    eyebrow: 'Apparel & Promo',
    description: 'Sourced and branded promo pieces for events, retail kits, employee onboarding, and launch campaigns.',
    bestFor: ['Tote bags', 'Drinkware', 'Giveaway kits', 'Retail add-ons'],
    details: ['Product sourcing support', 'Multiple decoration methods', 'Kitting and fulfillment available by quote', 'Good for brand activations and pop-ups'],
  },
]

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">{service.eyebrow}</p>
            <h1 className="text-display font-semibold text-gray-900 mb-5 max-w-3xl">{service.title}</h1>
            <p className="text-body-lg text-gray-500 max-w-2xl">{service.description}</p>
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
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Ready to price it?</h2>
            <p className="text-body text-gray-500 mb-8">Send garment type, quantity, print locations, artwork, and deadline. We’ll recommend the cleanest production route.</p>
            <Link href="/get-quote"><Button size="lg">Request a Quote</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
