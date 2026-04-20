import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABanner from '@/components/sections/CTABanner'
import { MapPin, Clock, Printer, Users, Award, Zap } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'About Us',
  description: 'Brooklyn-based print and design studio. We handle design, print, and fulfillment under one roof — no middlemen, no headaches.',
  alternates: { canonical: 'https://lettuceprint.com/about-us' },
}

const stats = [
  { value: '10+', label: 'Years in business' },
  { value: '5,000+', label: 'Orders fulfilled' },
  { value: '500+', label: 'Brands served' },
  { value: '1', label: 'Roof. Everything under it.' },
]

const values = [
  {
    icon: Printer,
    title: 'Print-first thinking',
    description: 'We live and breathe production. Every design decision we make is informed by how it will actually print — no surprises at the press.',
  },
  {
    icon: Users,
    title: 'Real people, real service',
    description: "You're not submitting a ticket into a void. You're talking to a team that knows your project, your brand, and your deadline.",
  },
  {
    icon: Award,
    title: 'Quality without compromise',
    description: 'We use premium substrates, inks, and finishing options because your brand deserves to look as good in person as it does on screen.',
  },
  {
    icon: Zap,
    title: 'Speed when it counts',
    description: "Rush orders, last-minute changes, tight deadlines — we've built our workflow to handle pressure without breaking.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-[calc(72px+4rem)] pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">About Us</p>
                <h1 className="text-display font-semibold text-gray-900 mb-6 leading-tight">
                  Made in Brooklyn.<br />Built for brands.
                </h1>
                <p className="text-body-lg text-gray-600 mb-6">
                  Lettuce Print is a full-service print and design studio based in Bushwick, Brooklyn.
                  We handle everything under one roof — strategy, design, production, and fulfillment —
                  so your brand comes to life without the chaos of juggling multiple vendors.
                </p>
                <p className="text-body-lg text-gray-600 mb-8">
                  We work with restaurants, retailers, cannabis brands, events, and anyone who takes
                  their brand seriously. If it prints, we probably do it.
                </p>
                <Link href="/get-quote">
                  <Button size="lg">Get a Quote</Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-card p-8">
                    <p className="text-4xl font-semibold text-lp-green mb-2">{stat.value}</p>
                    <p className="text-small text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-lp-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-6">Our Story</p>
              <h2 className="text-h2 font-semibold mb-8">
                We started because the industry was broken.
              </h2>
              <div className="space-y-5 text-gray-400 text-body-lg">
                <p>
                  Too many print shops treat clients like order numbers. You upload your file,
                  hope for the best, and get a box in the mail that looks nothing like what you designed.
                  We built Lettuce Print to fix that.
                </p>
                <p>
                  From day one, we&apos;ve operated as a design-forward production house. That means
                  our designers talk to our press operators. Our account managers actually know what
                  a bleed is. And if something&apos;s going to be a problem, we catch it before it hits
                  paper — not after.
                </p>
                <p>
                  Based at 361 Stagg Street in Brooklyn, we&apos;ve grown from a small operation into
                  a full-service studio serving hundreds of brands across New York and beyond.
                  The ethos hasn&apos;t changed: show up, do great work, treat people right.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">How We Work</p>
              <h2 className="text-h2 font-semibold text-gray-900">What sets us apart.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {values.map((v) => {
                const Icon = v.icon
                return (
                  <div key={v.title} className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-lp-green/10 flex items-center justify-center">
                      <Icon size={22} className="text-lp-green" />
                    </div>
                    <div>
                      <h3 className="text-h4 font-semibold text-gray-900 mb-2">{v.title}</h3>
                      <p className="text-small text-gray-600 leading-relaxed">{v.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-10 items-start">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-lp-green/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-lp-green" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Location</p>
                  <p className="text-small font-semibold text-gray-900">361 Stagg Street</p>
                  <p className="text-small text-gray-600">Brooklyn, NY</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-lp-green/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-lp-green" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Hours</p>
                  <p className="text-small font-semibold text-gray-900">Monday – Friday</p>
                  <p className="text-small text-gray-600">9:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
