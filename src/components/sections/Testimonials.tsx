import { motion } from 'framer-motion'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { featuredTestimonialsQuery } from '@/sanity/queries'

interface SanityTestimonial {
  _id: string
  name: string
  company?: string
  quote: string
  photo?: { asset: { _ref: string } }
  rating?: number
}

// Fallback hardcoded data while CMS is empty
const FALLBACK_TESTIMONIALS = [
  {
    _id: 'fallback-1',
    name: 'Mike Ghattas',
    company: 'Local Business Owner',
    quote: 'Lettuce Print delivered exactly what we needed — fast, professional, and the quality was outstanding. Our stickers and packaging look incredible.',
    photo: null,
    localImage: null,
    initials: 'MG',
    color: '#00A175',
  },
  {
    _id: 'fallback-2',
    name: 'Sarah Sathre',
    company: 'Brand Manager',
    quote: "The design team at Lettuce Print took our rough concept and turned it into something we're genuinely proud of. The turnaround was faster than we expected.",
    photo: null,
    localImage: null,
    initials: 'SS',
    color: '#7E6AAE',
  },
  {
    _id: 'fallback-3',
    name: 'Shameeza Singh',
    company: 'Event Organizer',
    quote: 'We needed everything last minute — banners, programs, signage. Lettuce Print made it happen without a single hiccup. Absolute lifesavers.',
    photo: null,
    localImage: null,
    initials: 'SS',
    color: '#006145',
  },
]

export default async function Testimonials() {
  let testimonials: SanityTestimonial[] = []
  try {
    testimonials = await client.fetch(featuredTestimonialsQuery)
  } catch {
    // CMS not yet populated — use fallback
  }

  const useFallback = !testimonials || testimonials.length === 0
  const items = useFallback ? FALLBACK_TESTIMONIALS : testimonials

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Client Love</p>
          <h2 className="text-h2 font-semibold text-gray-900">Don&apos;t take our word for it.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => {
            const isFallback = 'initials' in t
            const imageUrl = !isFallback && t.photo ? urlFor(t.photo).width(80).height(80).url() : null
            const initials = isFallback ? (t as typeof FALLBACK_TESTIMONIALS[0]).initials : t.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)
            const avatarColor = isFallback ? (t as typeof FALLBACK_TESTIMONIALS[0]).color : '#00A175'

            return (
              <div
                key={t._id}
                className="bg-white rounded-card shadow-card border border-gray-100 p-8 relative"
              >
                <span className="absolute top-6 left-6 text-6xl font-semibold text-lp-green/20 leading-none select-none">&ldquo;</span>
                <div className="border-t-[3px] border-lp-green pt-6 mt-2">
                  <p className="text-body text-gray-700 leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: avatarColor }}
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={t.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : initials}
                    </div>
                    <div>
                      <p className="text-small font-semibold text-gray-900">{t.name}</p>
                      {t.company && <p className="text-xs text-gray-500">{t.company}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
