'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Palette, Monitor, Shirt, Maximize, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Package,
    title: 'Packaging',
    description: 'Custom boxes, bags, tissue paper, and branded packaging that makes unboxing unforgettable.',
    href: '/services/packaging',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Brand identity, marketing collateral, and print-ready artwork from our in-house design team.',
    href: '/services/graphic-design',
  },
  {
    icon: Monitor,
    title: 'Signage & Displays',
    description: 'Banners, foam boards, window graphics, and trade show displays that command attention.',
    href: '/services/signage',
  },
  {
    icon: Shirt,
    title: 'Screen Printing',
    description: 'Premium apparel printing for brands, events, and merch drops. No minimum on select styles.',
    href: '/services/screen-printing',
  },
  {
    icon: Maximize,
    title: 'Large Format',
    description: 'Murals, vehicle wraps, backdrops, and anything that needs to go big. We go big.',
    href: '/services/large-format',
  },
]

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">What We Do</p>
          <h2 className="text-h2 font-semibold text-gray-900 mb-6">Design + print in one place.</h2>
          <p className="text-body-lg text-gray-600">
            We handle the full production chain — from concept to finished product.
            No middlemen, no file confusion, no chasing vendors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={service.href}
                  className="group block bg-white rounded-card shadow-card hover:shadow-card-hover border border-gray-100 hover:border-lp-green/30 p-8 transition-all duration-250 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-lp-green/10 flex items-center justify-center mb-6 group-hover:bg-lp-green transition-colors duration-200">
                    <Icon size={22} className="text-lp-green group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h3 className="text-h4 font-semibold text-gray-900 mb-3 group-hover:text-lp-green transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-small text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Learn more <ArrowRight size={13} />
                  </span>
                </Link>
              </motion.div>
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: services.length * 0.08 }}
          >
            <Link
              href="/services"
              className="group block bg-lp-green rounded-card p-8 transition-all duration-250 hover:bg-lp-green-dark h-full min-h-[220px] flex flex-col justify-between"
            >
              <p className="text-white/70 text-small">And more</p>
              <div>
                <h3 className="text-h3 font-semibold text-white mb-4">See all our services →</h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
                  View full capabilities <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
