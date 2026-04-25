'use client'

import { motion } from 'framer-motion'

const items = [
  { type: 'logo', name: 'KITH',       logo: '/images/brands/kith.svg' },
  { type: 'logo', name: 'Hard Rock',  logo: '/images/brands/hard-rock.svg' },
  { type: 'logo', name: 'Seagate',    logo: '/images/brands/seagate.svg' },
  { type: 'text', name: 'NYC Restaurants' },
  { type: 'text', name: 'Cannabis Dispensaries' },
  { type: 'text', name: 'Event Organizers' },
  { type: 'text', name: 'Local Brands' },
]

const doubled = [...items, ...items]

export default function TrustBar() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
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
              {item.type === 'logo' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-7 w-auto object-contain opacity-30 hover:opacity-60 transition-opacity grayscale"
                  style={{ maxWidth: '120px' }}
                />
              ) : (
                <span className="text-sm font-semibold text-gray-300 uppercase tracking-widest hover:text-lp-green transition-colors cursor-default">
                  {item.name}
                </span>
              )}
              <span className="text-lp-green/30 text-xl">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
