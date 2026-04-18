'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
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

// Collage layout — repeating pattern of spans across 12-col grid
const SPANS = [
  { col: 'col-span-7', row: 'row-span-2' }, // wide tall
  { col: 'col-span-5', row: 'row-span-1' }, // medium
  { col: 'col-span-5', row: 'row-span-1' }, // medium
  { col: 'col-span-4', row: 'row-span-2' }, // narrow tall
  { col: 'col-span-4', row: 'row-span-1' }, // square
  { col: 'col-span-4', row: 'row-span-1' }, // square
  { col: 'col-span-5', row: 'row-span-2' }, // medium tall
  { col: 'col-span-7', row: 'row-span-1' }, // wide
]

const FALLBACK_PROJECTS: Project[] = [
  { _id: 'f1', title: 'Cannabis Brand Packaging',   client: 'Dispensary Client',   service: 'Packaging',          slug: { current: 'cannabis-brand-packaging' },   coverImage: null },
  { _id: 'f2', title: 'Event Signage Suite',         client: 'NYC Event Co.',       service: 'Signage & Displays', slug: { current: 'event-signage-suite' },         coverImage: null },
  { _id: 'f3', title: 'Merch Drop Collection',       client: 'Streetwear Brand',    service: 'Screen Printing',    slug: { current: 'merch-drop-collection' },       coverImage: null },
  { _id: 'f4', title: 'Restaurant Brand Identity',   client: 'Brooklyn Restaurant', service: 'Graphic Design',     slug: { current: 'restaurant-brand-identity' },   coverImage: null },
  { _id: 'f5', title: 'Custom Die-Cut Stickers',     client: 'E-Commerce Brand',    service: 'Stickers & Labels',  slug: { current: 'custom-die-cut-stickers' },     coverImage: null },
  { _id: 'f6', title: 'Trade Show Backdrop',         client: 'Tech Startup',        service: 'Large Format',       slug: { current: 'trade-show-backdrop' },          coverImage: null },
  { _id: 'f7', title: 'Roll Label Collection',       client: 'Beverage Company',    service: 'Stickers & Labels',  slug: { current: 'roll-label-collection' },       coverImage: null },
  { _id: 'f8', title: 'Apparel Brand Launch',        client: 'Streetwear Brand',    service: 'Screen Printing',    slug: { current: 'apparel-brand-launch' },        coverImage: null },
]

interface PortfolioGridProps {
  projects?: Project[]
}

// ─── Magnetic Tile ───────────────────────────────────────────────────────────
interface MagneticTileProps {
  project: Project
  span: { col: string; row: string }
  index: number
  onHover: (project: Project | null) => void
  onClick: (project: Project) => void
}

function MagneticTile({ project, span, index, onHover, onClick }: MagneticTileProps) {
  const ref = useRef<HTMLDivElement>(null)
  const bgColor = FALLBACK_COLORS[project.service] ?? '#00A175'
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(900).height(700).url()
    : null

  // Magnetic transform values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const imgX = useMotionValue(0)
  const imgY = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 22, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  const springImgX = useSpring(imgX, { stiffness: 120, damping: 20, mass: 0.4 })
  const springImgY = useSpring(imgY, { stiffness: 120, damping: 20, mass: 0.4 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / rect.width
    const dy = (e.clientY - cy) / rect.height
    // Magnetic: ±10px tile shift
    x.set(dx * 10)
    y.set(dy * 10)
    // Parallax: image moves opposite direction, ±14px
    imgX.set(-dx * 14)
    imgY.set(-dy * 14)
  }, [x, y, imgX, imgY])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    imgX.set(0)
    imgY.set(0)
    onHover(null)
  }, [x, y, imgX, imgY, onHover])

  return (
    <motion.div
      ref={ref}
      className={`${span.col} ${span.row} relative rounded-card overflow-hidden cursor-none`}
      style={{ backgroundColor: bgColor, x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
    >
      {imageUrl ? (
        <motion.div className="absolute inset-0" style={{ x: springImgX, y: springImgY, scale: 1.08 }}>
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span className="text-white/20 text-xs uppercase tracking-widest text-center">{project.service}</span>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-lp-black/0 hover:bg-lp-black/50 transition-all duration-300 flex items-end p-4 group">
        <div className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60 mb-0.5">{project.service}</p>
          <p className="text-sm font-semibold text-white leading-snug">{project.title}</p>
          <p className="text-xs text-white/60 mt-0.5">{project.client}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Cursor Follower ─────────────────────────────────────────────────────────
interface CursorFollowerProps {
  hoveredProject: Project | null
  mouseX: number
  mouseY: number
  isOverGrid: boolean
}

function CursorFollower({ hoveredProject, mouseX, mouseY, isOverGrid }: CursorFollowerProps) {
  const springConfig = { stiffness: 280, damping: 28, mass: 0.6 }
  const cx = useSpring(mouseX, springConfig)
  const cy = useSpring(mouseY, springConfig)

  const bgColor = hoveredProject ? (FALLBACK_COLORS[hoveredProject.service] ?? '#00A175') : '#00A175'
  const imageUrl = hoveredProject?.coverImage
    ? urlFor(hoveredProject.coverImage).width(400).height(280).url()
    : null

  return (
    <motion.div
      className="fixed pointer-events-none z-40"
      style={{
        x: cx,
        y: cy,
        translateX: '-50%',
        translateY: '-110%',
      }}
      animate={{ opacity: isOverGrid && hoveredProject ? 1 : 0, scale: isOverGrid && hoveredProject ? 1 : 0.85 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div
        className="w-[200px] h-[136px] rounded-xl overflow-hidden shadow-2xl border border-white/10"
        style={{ backgroundColor: bgColor }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={hoveredProject?.title ?? ''}
            fill
            className="object-cover"
            style={{ position: 'absolute' }}
          />
        ) : (
          <div className="w-full h-full flex items-end p-3">
            <p className="text-white/40 text-[10px] uppercase tracking-widest">{hoveredProject?.service}</p>
          </div>
        )}
        {/* Label strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
          <p className="text-white text-[11px] font-semibold leading-tight truncate">{hoveredProject?.title}</p>
          <p className="text-white/60 text-[10px] truncate">{hoveredProject?.client}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const items = (!projects || projects.length === 0) ? FALLBACK_PROJECTS : projects
  const [focused, setFocused] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isOverGrid, setIsOverGrid] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const handleGridMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <>
      {/* Custom cursor — rendered at document level via fixed positioning */}
      <CursorFollower
        hoveredProject={hoveredProject}
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        isOverGrid={isOverGrid}
      />

      <section className="py-12 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Collage grid */}
          <div
            ref={gridRef}
            className={`grid grid-cols-12 auto-rows-[180px] gap-3 ${isOverGrid ? 'cursor-none' : ''}`}
            onMouseMove={handleGridMouseMove}
            onMouseEnter={() => setIsOverGrid(true)}
            onMouseLeave={() => {
              setIsOverGrid(false)
              setHoveredProject(null)
            }}
          >
            {items.map((project, i) => (
              <MagneticTile
                key={project._id}
                project={project}
                span={SPANS[i % SPANS.length]}
                index={i}
                onHover={setHoveredProject}
                onClick={setFocused}
              />
            ))}
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
                {/* Image area */}
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

                  {/* Close button */}
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
    </>
  )
}
