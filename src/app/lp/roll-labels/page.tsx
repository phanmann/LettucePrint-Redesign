import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Star, Truck, Shield, Zap, ArrowRight } from 'lucide-react'
import RollLabelCalculator from '@/components/shop/RollLabelCalculator'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Custom Roll Labels — Instant Pricing & Free Shipping',
  description: 'High-volume custom roll labels printed in Brooklyn. Free shipping on orders over $150. Instant pricing calculator — see your price in seconds.',
  alternates: { canonical: 'https://lettuceprint.com/lp/roll-labels' },
}

const socialProof = [
  { stat: '10M+', label: 'Labels printed' },
  { stat: '3–5 Day', label: 'Turnaround' },
  { stat: '4.9★', label: 'Client rating' },
]

const trustBadges = [
  { icon: Truck, label: 'Free shipping over $150' },
  { icon: Shield, label: 'Proof before every order' },
  { icon: Zap, label: '3–5 day turnaround' },
]

const testimonials = [
  {
    quote: "We switched from Avery to Lettuce Print and cut our label costs by 40%. Quality is better too.",
    author: "Sarah K.",
    role: "Operations, Brooklyn Brew Co",
  },
  {
    quote: "The instant pricing saved me so much back-and-forth. Ordered 5,000 labels and had them in 4 days.",
    author: "Marcus T.",
    role: "Founder, GreenLeaf Botanicals",
  },
]

const useCases = [
  'Food & beverage packaging',
  'Cannabis compliance labels',
  'Health & beauty products',
  'Retail barcode & price tags',
  'Shipping & logistics',
  'Event & hospitality',
]

export default function RollLabelsLandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Sticky Nav (minimal) ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-gray-900">
            Lettuce<span className="text-lp-green">Print</span>
          </Link>
          <a
            href="#pricing"
            className="text-sm font-semibold text-lp-green hover:text-lp-green-dark transition-colors"
          >
            Get Pricing →
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Copy */}
          <div>
            <Badge variant="popular" className="mb-4">Free Shipping Over $150</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Custom Roll Labels{" "}
              <span className="text-lp-green">at Volume Prices</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Professional kiss-cut labels on a roll — built for brands that need
              consistency across thousands of units. Instant pricing, no quotes needed.
            </p>

            {/* Social Proof Bar */}
            <div className="flex items-center gap-6 mb-8">
              {socialProof.map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-bold text-gray-900">{item.stat}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Use Cases */}
            <div className="flex flex-wrap gap-2 mb-8">
              {useCases.map((use) => (
                <span
                  key={use}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full"
                >
                  <CheckCircle size={12} className="text-lp-green" />
                  {use}
                </span>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm text-gray-600">
                  <badge.icon size={16} className="text-lp-green" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Calculator */}
          <div id="pricing" className="lg:sticky lg:top-20">
            <RollLabelCalculator productName="Custom Roll Labels" />
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-gray-50 border-y border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="text-lp-yellow fill-lp-yellow" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{t.quote}"</p>
                <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specs / What's Included ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          What's Included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Kiss-cut to shape', desc: 'Any shape, any size up to 12.25" wide' },
            { title: 'Digital proof', desc: 'Review before we print a single label' },
            { title: '3" standard core', desc: 'Fits most label dispensers and applicators' },
            { title: 'Quality check', desc: 'Every roll inspected before shipment' },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-xl p-5">
              <CheckCircle size={18} className="text-lp-green mb-2" />
              <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Materials ── */}
      <section className="bg-gray-50 border-y border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Choose Your Material
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Standard Matte Paper</h3>
              <p className="text-sm text-gray-600 mb-4">
                Great for food, retail, and general product labeling. Cost-effective and reliable.
              </p>
              <p className="text-xs text-gray-500">Best for: Dry products, short-term use, budget-conscious orders</p>
            </div>
            <div className="bg-white rounded-xl border-2 border-lp-green p-6 relative">
              <span className="absolute -top-3 left-4 bg-lp-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
                Most Popular
              </span>
              <h3 className="font-bold text-gray-900 mb-2">Premium BOPP</h3>
              <p className="text-sm text-gray-600 mb-4">
                Water-resistant, durable, professional finish. Built for products that face moisture or handling.
              </p>
              <p className="text-xs text-gray-500">Best for: Beverages, cosmetics, cannabis, outdoor use</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to order?
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Get instant pricing above, or reach out for custom sizes, specialty adhesives, or bulk quotes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 bg-lp-green text-white font-semibold px-8 py-4 rounded-xl hover:bg-lp-green-dark transition-colors"
          >
            Get Instant Pricing <ArrowRight size={18} />
          </a>
          <Link
            href="/get-quote"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold px-8 py-4 rounded-xl border border-gray-300 hover:border-lp-green hover:text-lp-green transition-colors"
          >
            Request Custom Quote
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-6">
          Questions? Call or text{" "}
          <a href="tel:3476030557" className="text-lp-green font-semibold hover:underline">
            347.603.0557
          </a>
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Lettuce Print. Brooklyn, NY.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/shop/roll-labels" className="hover:text-lp-green transition-colors">
              Full Product Page →
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
