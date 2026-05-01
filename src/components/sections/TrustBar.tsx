'use client'

import { motion } from 'framer-motion'

const items = [
  { name: 'KITH',                 logo: '/images/brands/kith.svg' },
  { name: 'Hard Rock Hotel',      logo: '/images/brands/hard-rock.svg' },
  { name: 'REBNY',                logo: '/images/brands/rebny.svg' },
  { name: 'Seagate',              logo: '/images/brands/seagate.svg' },
  { name: 'Kiva',                 logo: '/images/brands/kiva.svg' },
  { name: 'The Mechanic Farm',    logo: '/images/brands/mechanic-farm.svg' },
  { name: 'Orange County Cannabis Co.', logo: '/images/brands/orange-county.svg' },
  { name: 'Terp Bros',            logo: '/images/brands/terp-bros.svg' },
]

const doubled = [...items, ...items]

export default function TrustBar() {
  return (
    <section className="py-12 bg-lp-green">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">
          Trusted by brands that take their image seriously
        </p>
      </motion.div>

      <div className="overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee items-center">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center justify-center gap-8 px-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.logo}
                alt={item.name}
                className="h-7 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                style={{ maxWidth: '120px' }}
              />
              <span className="text-white/30 text-xl">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
