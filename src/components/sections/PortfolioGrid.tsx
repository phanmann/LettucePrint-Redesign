'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/image'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  client: string
  service: string
  coverImage?: { asset: { _ref: string } } | null
  tags?: string[]
}

const FALLBACK_COLORS: Record<string, string> = {
  'Stickers & Labels':  '#00A175',
  'Packaging':          '#006145',
  'Screen Printing':    '#7E6AAE',
  'Graphic Design':     '#acf2f9',
  'Signage & Displays': '#FFCA66',
  'Large Format':       '#0a0a0a',
}

const FALLBACK_PROJECTS: Project[] = [
  { _id: 'f1', title: 'Cannabis Brand Packaging',   client: 'Dispensary Client',  service: 'Packaging',          slug: { current: 'cannabis-brand-packaging' },    coverImage: null },
  { _id: 'f2', title: 'Event Signage Suite',         client: 'NYC Event Co.',      service: 'Signage & Displays',  slug: { current: 'event-signage-suite' },          coverImage: null },
  { _id: 'f3', title: 'Merch Drop Collection',       client: 'Streetwear Brand',   service: 'Screen Printing',     slug: { current: 'merch-drop-collection' },        coverImage: null },
  { _id: 'f4', title: 'Restaurant Brand Identity',   client: 'Brooklyn Restaurant',service: 'Graphic Design',      slug: { current: 'restaurant-brand-identity' },    coverImage: null },
  { _id: 'f5', title: 'Custom Die-Cut Stickers',     client: 'E-Commerce Brand',   service: 'Stickers & Labels',   slug: { current: 'custom-die-cut-stickers' },      coverImage: null },
  { _id: 'f6', title: 'Trade Show Backdrop',         client: 'Tech Startup',       service: 'Large Format',        slug: { current: 'trade-show-backdrop' },           coverImage: null },
  { _id: 'f7', title: 'Roll Label Collection',       client: 'Beverage Company',   service: 'Stickers & Labels',   slug: { current: 'roll-label-collection' },        coverImage: null },
  { _id: 'f8', title: 'Apparel Brand Launch',        client: 'Streetwear Brand',   service: 'Screen Printing',     slug: { current: 'apparel-brand-launch' },         coverImage: null },
]

const FILTERS = ['All', 'Stickers & Labels', 'Packaging', 'Screen Printing', 'Signage & Displays', 'Large Format', 'Graphic Design']

interface PortfolioGridProps {
  projects?: Project[]
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [active, setActive] = useState('All')
  const items = (!projects || projects.length === 0) ? FALLBACK_PROJECTS : projects

  const filtered = active === 'All' ? items : items.filter(p => p.service === active)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                active === f
                  ? 'bg-lp-green text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            const bgColor = FALLBACK_COLORS[project.service] ?? '#00A175'
            const imageUrl = project.coverImage ? urlFor(project.coverImage).width(600).height(450).url() : null
            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/projects/${project.slug.current}`} className="group block">
                  <div
                    className="relative rounded-card overflow-hidden aspect-[4/3] mb-4"
                    style={{ backgroundColor: bgColor }}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/30 text-xs uppercase tracking-widest">{project.service}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-lp-black/0 group-hover:bg-lp-black/40 transition-all duration-300 flex items-end p-5">
                      <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">{project.service}</p>
                        <p className="text-small font-semibold text-white">{project.title}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-0.5">{project.client}</p>
                  <p className="text-small font-semibold text-gray-900 group-hover:text-lp-green transition-colors">{project.title}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-body-lg">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
