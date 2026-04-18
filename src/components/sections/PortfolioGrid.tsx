'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
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
  'Graphic Design':     '#3b7da8',
  'Signage & Displays': '#b8860b',
  'Large Format':       '#1a1a2e',
}

const ALL_SERVICES = ['All', 'Stickers & Labels', 'Packaging', 'Screen Printing', 'Graphic Design', 'Signage & Displays', 'Large Format']

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

// ─── Single Project Card ─────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project
  index: number
  onClick: (p: Project) => void
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const bgColor = FALLBACK_COLORS[project.service] ?? '#00A175'
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(900).height(700).url()
    : null

  // Tilt on hover
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 28 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 28 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={ref}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{
        backgroundColor: bgColor,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
        aspectRatio: index % 3 === 0 ? '16/10' : '4/3',
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.025, zIndex: 10 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
    >
      {/* Image */}
      {imageUrl ? (
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={imageUrl} alt={project.title} fill className="object-cover" />
        </motion.div>
      ) : (
        /* Placeholder gradient for fallback */
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${bgColor}dd 0%, ${bgColor}88 50%, ${bgColor}44 100%)`,
          }}
        />
      )}

      {/* Vignette — always present, deepens on hover */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0) 70%)',
        }}
        animate={{ opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.35 }}
      />

      {/* Top-right arrow — appears on hover */}
      <motion.div
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowUpRight size={16} className="text-white" />
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <motion.p
          className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-1"
          animate={{ opacity: hovered ? 1 : 0.6, y: hovered ? 0 : 4 }}
          transition={{ duration: 0.3 }}
        >
          {project.service}
        </motion.p>
        <motion.h3
          className="text-base font-semibold text-white leading-snug"
          animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="text-xs text-white/50 mt-0.5"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {project.client}
        </motion.p>
      </div>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────
interface PortfolioGridProps {
  projects?: Project[]
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const items = (!projects || projects.length === 0) ? FALLBACK_PROJECTS : projects
  const [focused, setFocused] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')

  // Derive available filters from actual project services
  const services = ['All', ...Array.from(new Set(items.map(p => p.service)))]

  const filtered = activeFilter === 'All'
    ? items
    : items.filter(p => p.service === activeFilter)

  return (
    <section className="py-12 pb-24 bg-[#0f0f0f] relative overflow-hidden">

      {/* Film grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          mixBlendMode: 'overlay',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {services.map(svc => (
            <button
              key={svc}
              onClick={() => setActiveFilter(svc)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 border ${
                activeFilter === svc
                  ? 'bg-lp-green border-lp-green text-white'
                  : 'bg-transparent border-white/15 text-white/40 hover:border-white/40 hover:text-white/70'
              }`}
            >
              {svc}
              {svc !== 'All' && (
                <span className={`ml-1.5 ${activeFilter === svc ? 'text-white/60' : 'text-white/25'}`}>
                  {items.filter(p => p.service === svc).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Masonry-ish 2-col grid */}
        <motion.div
          className="columns-1 sm:columns-2 gap-4 space-y-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="break-inside-avoid mb-4"
              >
                <ProjectCard
                  project={project}
                  index={i}
                  onClick={setFocused}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-white/20">
            <p className="text-body-lg">No projects in this category yet.</p>
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
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

            <motion.div
              className="relative z-10 w-full max-w-3xl bg-[#161616] rounded-2xl overflow-hidden border border-white/10"
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              onClick={e => e.stopPropagation()}
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
                    <span className="text-white/15 text-sm uppercase tracking-widest">{focused.service}</span>
                  </div>
                )}
                <button
                  onClick={() => setFocused(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors border border-white/10"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Info row */}
              <div className="p-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lp-green mb-1">{focused.service}</p>
                  <h3 className="text-lg font-semibold text-white mb-1">{focused.title}</h3>
                  <p className="text-sm text-white/40">{focused.client}</p>
                </div>
                <Link
                  href={`/projects/${focused.slug.current}`}
                  className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 bg-lp-green text-white text-sm font-semibold rounded-full hover:bg-lp-green-dark transition-colors"
                >
                  View Project <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
