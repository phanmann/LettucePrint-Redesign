'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
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

// Repeating aspect ratio pattern — creates the collage variety
// cycles across however many projects exist
const ASPECT_RATIOS = [
  'aspect-[4/5]',   // tall portrait
  'aspect-[4/3]',   // landscape
  'aspect-[1/1]',   // square
  'aspect-[3/4]',   // portrait
  'aspect-[16/9]',  // wide
  'aspect-[4/3]',   // landscape
  'aspect-[1/1]',   // square
  'aspect-[4/5]',   // tall portrait
  'aspect-[3/2]',   // wide landscape
  'aspect-[2/3]',   // narrow portrait
]

const FALLBACK_PROJECTS: Project[] = [
  { _id: 'f1', title: 'Cannabis Brand Packaging',   client: 'Dispensary Client',   service: 'Packaging',          slug: { current: 'cannabis-brand-packaging' },   coverImage: null },
  { _id: 'f2', title: 'Event Signage Suite',         client: 'NYC Event Co.',       service: 'Signage & Displays', slug: { current: 'event-signage-suite' },         coverImage: null },
  { _id: 'f3', title: 'Merch Drop Collection',       client: 'Streetwear Brand',    service: 'Screen Printing',    slug: { current: 'merch-drop-collection' },       coverImage: null },
  { _id: 'f4', title: 'Restaurant Brand Identity',   client: 'Brooklyn Restaurant', service: 'Graphic Design',     slug: { current: 'restaurant-brand-identity' },   coverImage: null },
  { _id: 'f5', title: 'Custom Die-Cut Stickers',     client: 'E-Commerce Brand',    service: 'Stickers & Labels',  slug: { current: 'custom-die-cut-stickers' },     coverImage: null },
  { _id: 'f6', title: 'Trade Show Backdrop',         client: 'Tech Startup',        service: 'Large Format',       slug: { current: 'trade-show-backdrop' },         coverImage: null },
  { _id: 'f7', title: 'Roll Label Collection',       client: 'Beverage Company',    service: 'Stickers & Labels',  slug: { current: 'roll-label-collection' },       coverImage: null },
  { _id: 'f8', title: 'Apparel Brand Launch',        client: 'Streetwear Brand',    service: 'Screen Printing',    slug: { current: 'apparel-brand-launch' },        coverImage: null },
]

interface PortfolioGridProps {
  projects?: Project[]
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const items = (!projects || projects.length === 0) ? FALLBACK_PROJECTS : projects
  const [focused, setFocused] = useState<Project | null>(null)

  return (
    <section className="py-12 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/*
          CSS columns masonry — items flow top-to-bottom per column,
          no fixed row heights, gaps are physically impossible.
          break-inside-avoid keeps each card whole.
        */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
          {items.map((project, i) => {
            const bgColor = FALLBACK_COLORS[project.service] ?? '#00A175'
            const aspectClass = ASPECT_RATIOS[i % ASPECT_RATIOS.length]
            const imageUrl = project.coverImage
              ? urlFor(project.coverImage).width(800).height(900).url()
              : null

            return (
              <motion.div
                key={project._id}
                className="break-inside-avoid mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className={`relative ${aspectClass} rounded-card overflow-hidden cursor-pointer group`}
                  style={{ backgroundColor: bgColor }}
                  onClick={() => setFocused(project)}
                >
                  {/* Image */}
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <span className="text-white/20 text-xs uppercase tracking-widest text-center leading-loose">
                        {project.service}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay — fades in, lifts label text */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/52 transition-colors duration-350 ease-out" />

                  {/* Label — sits below viewport, slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55 mb-0.5">
                      {project.service}
                    </p>
                    <p className="text-sm font-semibold text-white leading-snug">
                      {project.title}
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">
                      {project.client}
                    </p>
                  </div>

                  {/* Subtle ring on hover */}
                  <div className="absolute inset-0 rounded-card ring-0 group-hover:ring-2 ring-white/20 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {items.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-body-lg">No projects yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {focused && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFocused(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Card */}
            <motion.div
              className="relative z-10 w-full max-w-3xl bg-white rounded-[20px] overflow-hidden shadow-modal"
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 16:9 image */}
              <div
                className="relative w-full aspect-[16/9]"
                style={{ backgroundColor: FALLBACK_COLORS[focused.service] ?? '#00A175' }}
              >
                {focused.coverImage ? (
                  <Image
                    src={urlFor(focused.coverImage).width(1200).height(675).url()}
                    alt={focused.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/20 text-sm uppercase tracking-widest">{focused.service}</span>
                  </div>
                )}

                <button
                  onClick={() => setFocused(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Info */}
              <div className="p-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-lp-green mb-1">{focused.service}</p>
                  <h3 className="text-h4 font-semibold text-gray-900 mb-1">{focused.title}</h3>
                  <p className="text-small text-gray-500">{focused.client}</p>
                </div>
                <Link
                  href={`/projects/${focused.slug.current}`}
                  className="flex-shrink-0 px-5 py-2.5 bg-lp-green text-white text-sm font-semibold rounded-full hover:bg-lp-green-dark transition-colors"
                >
                  View Project →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
