'use client'

import { motion } from 'framer-motion'

// Target ~44px tall for each logo, derived from viewBox aspect ratios.
// Wide/flat logos get a max-width cap so they don't stretch too large.
const items = [
  { name: 'KITH',                       logo: '/images/brands/kith.svg',          height: 26 }, // 134×44 — naturally wide, keep modest
  { name: 'Hard Rock Hotel',            logo: '/images/brands/hard-rock.svg',     height: 44 }, // 154×93
  { name: 'REBNY',                      logo: '/images/brands/rebny.svg',         height: 34 }, // 208×63 — very wide, height 34 → ~112px wide
  { name: 'Seagate',                    logo: '/images/brands/seagate.svg',       height: 44 }, // 129×106
  { name: 'Kiva',                       logo: '/images/brands/kiva.svg',          height: 26 }, // 179×43 — naturally wide, keep modest
  { name: 'The Mechanic Farm',          logo: '/images/brands/mechanic-farm.svg', height: 44 }, // 139×93
  { name: 'Orange County Cannabis Co.', logo: '/images/brands/orange-county.svg', height: 44 }, // 165×92
  { name: 'Terp Bros',                  logo: '/images/brands/terp-bros.svg',     height: 44 }, // 109×96
  { name: 'Golden Krust',               logo: '/images/brands/golden-krust.svg',  height: 44 }, // 208×101
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
                className="w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                style={{ height: `${item.height}px` }}
              />
              <span className="text-white/30 text-xl">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
