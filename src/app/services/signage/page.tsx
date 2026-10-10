import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Signs, Banners & Event Displays',
  description: 'Vinyl banners, retractable banners, mesh banners, backdrops, step-and-repeats, and SEG displays from Lettuce Print.',
  alternates: { canonical: 'https://lettuceprint.com/services/signage' },
}

const products = [
  { title: 'Canopy Tents', image: '/images/products/tents/20x10.svg', alt: 'Original placeholder illustration of a custom canopy tent', href: '/services/signage/tents/10x10', note: '10×10 and 20×10 full printed canopy tents with frames, from $789. Shipping and tax excluded. Original placeholder art.' },
  { title: 'Banners', image: '/images/products/banners/vinyl-banner.jpg', alt: 'Lettuce Print vinyl banner secured with grommets on an exterior wall', href: '/services/signage/banners', note: 'Vinyl, mesh, fabric, retractable, luxury retractable, tabletop, and oversized banners.' },
  { title: 'Backdrops', image: '/images/products/backdrops/step-repeat.jpg', alt: 'Green Lettuce Print step-and-repeat backdrop on a freestanding event display', href: '/services/signage/backdrops', note: 'Pop-up, eurofit, SEG, and step-and-repeat backdrops for events and retail spaces.' },
]

export default function SignagePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-white border-b border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Signs & Banners</p>
            <h1 className="text-display font-semibold text-gray-900 mb-5 max-w-3xl">Big-format pieces without big-agency friction.</h1>
            <p className="text-body-lg text-gray-500 max-w-2xl">Outdoor promos, trade show booths, retail backdrops, step-and-repeats, and pop-up event graphics — produced clean and spec-ready.</p>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-5">
            {products.map((product) => (
              <Link key={product.href} href={product.href} className="group bg-white border border-gray-100 rounded-card p-7 min-w-0 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 mb-6">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1280px) 344px, (min-width: 768px) calc((100vw - 240px) / 3), (min-width: 640px) calc(100vw - 106px), calc(100vw - 90px)"
                    className="object-cover"
                  />
                </div>
                <h2 className="text-h3 font-semibold text-gray-900 mb-3">{product.title}</h2>
                <p className="text-small text-gray-600 mb-6">{product.note}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lp-green">View options <ArrowRight size={13} /></span>
              </Link>
            ))}
          </div>
        </section>
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Need help with your booth design?</h2>
            <p className="text-body text-gray-500 mb-8">Send us the event date, booth specs, and venue requirements. We’ll quote the print, hardware, and timeline together.</p>
            <Link href="/services/signage/quote"><Button size="lg">Request a Signage Quote</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
