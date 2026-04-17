'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Palette, Monitor, Shirt, Maximize } from 'lucide-react'

const services = [
  {
    icon: '📦',
    num: '01',
    title: 'Packaging',
    description: 'Custom boxes, bags, tissue paper, and branded packaging that makes unboxing unforgettable.',
    href: '/services/packaging',
    bg: 'bg-lp-green/10',
  },
  {
    icon: '🎨',
    num: '02',
    title: 'Graphic Design',
    description: 'Brand identity, marketing collateral, and print-ready artwork from our in-house design team.',
    href: '/services/graphic-design',
    bg: 'bg-lp-yellow/40',
  },
  {
    icon: '🪧',
    num: '03',
    title: 'Signage & Displays',
    description: 'Banners, foam boards, window graphics, and trade show displays that command attention.',
    href: '/services/signage',
    bg: 'bg-lp-blue/50',
  },
  {
    icon: '👕',
    num: '04',
    title: 'Screen Printing',
    description: 'Premium apparel printing for brands, events, and merch drops. No minimum on select styles.',
    href: '/services/screen-printing',
    bg: 'bg-lp-purple/20',
  },
  {
    icon: '🖼️',
    num: '05',
    title: 'Large Format',
    description: 'Murals, vehicle wraps, backdrops, and anything that needs to go big. We go big.',
    href: '/services/large-format',
    bg: 'bg-gray-100',
  },
]

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">What We Do</p>
            <h2 className="text-h2 font-semibold text-gray-900 mb-4">Design + print in one place.</h2>
            <p className="text-body-lg text-gray-600">
              We handle the full production chain — from concept to finished product.
              No middlemen, no file confusion, no chasing vendors.
            </p>
          </div>
          <Link
            href="/services"
            className="text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors flex-shrink-0"
          >
            View all services →
          </Link>
        </motion.div>

        {/* Service list */}
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {services.map((service, i) => (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={service.href}
                className="group flex items-center gap-5 sm:gap-8 py-6 sm:py-7 hover:pl-3 transition-all duration-300"
              >
                {/* Number */}
                <span className="font-mono text-xs tracking-widest text-gray-300 flex-shrink-0 w-6 hidden sm:block">
                  {service.num}
                </span>

                {/* Icon bubble */}
                <div className={`w-12 h-12 rounded-full ${service.bg} flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* Name */}
                <h3 className="text-h3 font-semibold text-gray-900 group-hover:text-lp-green transition-colors duration-200 flex-1 min-w-0">
                  {service.title}
                </h3>

                {/* Description — hidden on mobile */}
                <p className="hidden lg:block text-small text-gray-500 leading-relaxed max-w-sm flex-shrink-0">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0 group-hover:bg-lp-green group-hover:border-lp-green group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
