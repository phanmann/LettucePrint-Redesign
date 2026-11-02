'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Palette, PanelTop, Shirt, Expand, type LucideIcon } from 'lucide-react'

const services: {
  icon: LucideIcon
  iconColor: string
  num: string
  title: string
  description: string
  bg: string
}[] = [
  {
    icon: Package,
    iconColor: 'text-lp-green',
    num: '01',
    title: 'Packaging',
    description: 'Custom boxes, bags, tissue paper, and branded packaging that makes unboxing unforgettable.',
    bg: 'bg-lp-green/10',
  },
  {
    icon: Palette,
    iconColor: 'text-amber-600',
    num: '02',
    title: 'Graphic Design',
    description: 'Brand identity, marketing collateral, and print-ready artwork from our in-house design team.',
    bg: 'bg-lp-yellow/40',
  },
  {
    icon: PanelTop,
    iconColor: 'text-sky-600',
    num: '03',
    title: 'Signage & Displays',
    description: 'Banners, foam boards, window graphics, and trade show displays that command attention.',
    bg: 'bg-lp-blue/50',
  },
  {
    icon: Shirt,
    iconColor: 'text-lp-purple',
    num: '04',
    title: 'Screen Printing',
    description: 'Premium apparel printing for brands, events, and merch drops. No minimum on select styles.',
    bg: 'bg-lp-purple/20',
  },
  {
    icon: Expand,
    iconColor: 'text-gray-600',
    num: '05',
    title: 'Large Format',
    description: 'Murals, vehicle wraps, backdrops, and anything that needs to go big. We go big.',
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
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="flex items-center gap-5 sm:gap-8 py-6 sm:py-7">
                {/* Number */}
                <span className="font-mono text-xs tracking-widest text-gray-300 flex-shrink-0 w-6 hidden sm:block">
                  {service.num}
                </span>

                {/* Icon bubble */}
                <div className={`w-12 h-12 rounded-full ${service.bg} flex items-center justify-center flex-shrink-0`}>
                  <service.icon size={20} strokeWidth={1.75} className={service.iconColor} />
                </div>

                {/* Name */}
                <h3 className="text-h3 font-semibold text-gray-900 flex-1 min-w-0">
                  {service.title}
                </h3>

                {/* Description — hidden on mobile */}
                <p className="hidden lg:block text-small text-gray-500 leading-relaxed max-w-sm flex-shrink-0">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
