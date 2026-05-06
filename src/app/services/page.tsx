import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Boxes, Megaphone, Package, Shirt, Sparkles } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Print Services',
  description: 'Explore Lettuce Print services: marketing materials, stickers, packaging, signage, apparel, and custom promo items from our Brooklyn studio.',
  alternates: { canonical: 'https://lettuceprint.com/services' },
}

const services = [
  {
    title: 'Marketing Materials',
    href: '/services/marketing-materials',
    icon: Megaphone,
    description: 'Business cards, postcards, flyers, posters, brochures, and booklets with sharp color and clean finishing.',
    items: ['Business cards', 'Flyers & postcards', 'Posters', 'Brochures & booklets'],
  },
  {
    title: 'Stickers & Labels',
    href: '/shop/stickers',
    icon: Sparkles,
    description: 'Order die-cut stickers, premium spot UV stickers, and roll labels with transparent online pricing.',
    items: ['Die-cut stickers', 'Spot UV stickers', 'Roll labels', 'Custom shapes'],
  },
  {
    title: 'Boxes & Packaging',
    href: '/services/packaging',
    icon: Package,
    description: 'Custom boxes, mylar bags, sleeves, retail cartons, and specialty packaging for product launches.',
    items: ['Mailer boxes', 'Folding cartons', 'Mylar bags', 'Custom structures'],
  },
  {
    title: 'Signs & Banners',
    href: '/services/signage',
    icon: Boxes,
    description: 'Banners, backdrops, step-and-repeats, and event displays built for retail, pop-ups, and trade shows.',
    items: ['Vinyl banners', 'Retractable banners', 'Backdrops', 'SEG displays'],
  },
  {
    title: 'Apparel & Promo',
    href: '/services/apparel',
    icon: Shirt,
    description: 'Screen printing, embroidery, DTG, and promo sourcing for merch, staff uniforms, and giveaways.',
    items: ['Screen printing', 'Embroidery', 'DTG', 'Custom promo items'],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-white border-b border-gray-100 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Services</p>
            <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-end">
              <div>
                <h1 className="text-display font-semibold text-gray-900 mb-5 max-w-3xl">Design-aware print, built in Brooklyn.</h1>
                <p className="text-body-lg text-gray-500 max-w-2xl">From fast reorders to fully custom packaging, Lettuce Print pairs production know-how with real design taste — so the final piece feels intentional, not generic.</p>
              </div>
              <div className="bg-lp-blue/45 border border-lp-blue rounded-card p-6">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="text-lp-green mt-1" size={22} />
                  <div>
                    <h2 className="text-h4 font-semibold text-gray-900 mb-2">Not sure what you need?</h2>
                    <p className="text-small text-gray-600 mb-5">Send the goal, timeline, and rough quantity. We’ll route you to the right material, finish, and production path.</p>
                    <Link href="/get-quote"><Button size="md">Get a Quote <ArrowRight size={14} /></Button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link key={service.href} href={service.href} className="group bg-white border border-gray-100 rounded-card p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200">
                  <div className="w-12 h-12 rounded-full bg-lp-green/10 text-lp-green flex items-center justify-center mb-5 group-hover:bg-lp-green group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-h3 font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-small text-gray-600 mb-5">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-gray-600"><span className="h-1.5 w-1.5 rounded-full bg-lp-green" />{item}</li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lp-green">Explore <ArrowRight size={13} /></span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="py-16 bg-lp-green text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold mb-4">Have a weird print problem?</h2>
            <p className="text-body-lg text-white/80 mb-8">That’s usually where we’re most useful. Send the specs you have — napkin sketch, dieline, moodboard, or just the idea.</p>
            <Link href="/get-quote"><Button variant="ghost" size="lg">Start the Quote</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
