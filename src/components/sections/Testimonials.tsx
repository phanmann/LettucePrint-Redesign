'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface Testimonial {
  _id: string
  name: string
  company?: string
  quote: string
  initials: string
  bg: string
  textColor: string
  avatarBg: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    _id: 't1',
    name: 'Mike Ghattas',
    company: 'Local Business Owner',
    quote: 'Lettuce Print delivered exactly what we needed — fast, professional, and the quality was outstanding. Our stickers and packaging look incredible.',
    initials: 'MG',
    bg: '#FFCA66',
    textColor: '#0a0a0a',
    avatarBg: 'rgba(0,0,0,0.12)',
  },
  {
    _id: 't2',
    name: 'Sarah Sathre',
    company: 'Brand Manager',
    quote: "The design team at Lettuce Print took our rough concept and turned it into something we're genuinely proud of. The turnaround was faster than we expected.",
    initials: 'SS',
    bg: '#006145',
    textColor: '#ffffff',
    avatarBg: 'rgba(255,255,255,0.15)',
  },
  {
    _id: 't3',
    name: 'Shameeza Singh',
    company: 'Event Organizer',
    quote: 'We needed everything last minute — banners, programs, signage. Lettuce Print made it happen without a single hiccup. Absolute lifesavers.',
    initials: 'SS',
    bg: '#acf2f9',
    textColor: '#0a0a0a',
    avatarBg: 'rgba(0,0,0,0.10)',
  },
  {
    _id: 't4',
    name: 'James Ortiz',
    company: 'Cannabis Brand Founder',
    quote: "Nobody in Brooklyn does packaging like these guys. Every detail is dialed in. Our dispensary clients always ask who made the packaging — it's always Lettuce Print.",
    initials: 'JO',
    bg: '#7E6AAE',
    textColor: '#ffffff',
    avatarBg: 'rgba(255,255,255,0.15)',
  },
  {
    _id: 't5',
    name: 'Priya Menon',
    company: 'Restaurant Owner',
    quote: "Ordered menus, signage, and stickers all in one shot. Everything came out perfect. Their team actually knows what they're doing — rare in this city.",
    initials: 'PM',
    bg: '#f5a8c8',
    textColor: '#0a0a0a',
    avatarBg: 'rgba(0,0,0,0.10)',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Client Love</p>
          <h2 className="text-h2 font-semibold text-gray-900">Don&apos;t take our word for it.</h2>
        </motion.div>
      </div>

      {/* Horizontal scroll row */}
      <div className="flex gap-5 overflow-x-auto px-4 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] pb-4 scrollbar-none snap-x snap-mandatory">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            whileHover={{ y: -6, rotate: -1 }}
            className="flex-shrink-0 w-[300px] sm:w-[320px] rounded-card p-8 flex flex-col gap-6 snap-start cursor-default"
            style={{ backgroundColor: t.bg, color: t.textColor }}
          >
            <p className="text-[15px] leading-[1.7] font-medium flex-1">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: t.avatarBg, color: t.textColor }}
              >
                {t.initials}
              </div>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                {t.company && <p className="text-xs opacity-60 mt-0.5">{t.company}</p>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
