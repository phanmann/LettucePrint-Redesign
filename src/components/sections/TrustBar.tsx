'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const brands = [
  { name: 'KITH',       logo: '/images/brands/kith.svg' },
  { name: 'Hard Rock',  logo: '/images/brands/hard-rock.svg' },
  { name: 'Seagate',    logo: '/images/brands/seagate.svg' },
]

// Text-only fallback brands for variety
const textBrands = ['NYC Restaurants', 'Cannabis Dispensaries', 'Event Organizers', 'Local Brands']

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
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="inline-flex items-center justify-center px-10"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity grayscale"
              />
            </span>
          ))}
          {[...textBrands, ...textBrands].map((brand, i) => (
            <span
              key={`text-${i}`}
              className="inline-flex items-center gap-8 px-8 text-h4 font-semibold text-gray-300 hover:text-lp-green transition-colors cursor-default"
            >
              {brand}
              <span className="text-lp-green/30 text-2xl">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
