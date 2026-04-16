'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Mike Ghattas',
    company: 'Local Business Owner',
    text: 'Lettuce Print delivered exactly what we needed — fast, professional, and the quality was outstanding. Our stickers and packaging look incredible.',
    image: '/images/reviews/review-mike-ghattas.png',
  },
  {
    name: 'Sarah Sathre',
    company: 'Brand Manager',
    text: "The design team at Lettuce Print took our rough concept and turned it into something we're genuinely proud of. The turnaround was faster than we expected.",
    image: '/images/reviews/review-sarah-sathre.png',
  },
  {
    name: 'Shameeza Singh',
    company: 'Event Organizer',
    text: 'We needed everything last minute — banners, programs, signage. Lettuce Print made it happen without a single hiccup. Absolute lifesavers.',
    image: '/images/reviews/review-shameeza-singh.png',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Client Love</p>
          <h2 className="text-h2 font-semibold text-gray-900">Don&apos;t take our word for it.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-card shadow-card border border-gray-100 p-8 relative"
            >
              <span className="absolute top-6 left-6 text-6xl font-semibold text-lp-green/20 leading-none select-none">&ldquo;</span>
              <div className="border-t-[3px] border-lp-green pt-6 mt-2">
                <p className="text-body text-gray-700 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-lp-green/10 flex-shrink-0">
                    <Image src={t.image} alt={t.name} width={40} height={40} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-small font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
