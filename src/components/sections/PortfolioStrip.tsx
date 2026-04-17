import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { allPortfolioQuery } from '@/sanity/queries'

interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  client: string
  service: string
  coverImage?: { asset: { _ref: string } }
}

const CARD_COLORS = [
  '#FFCA66', // yellow
  '#acf2f9', // blue
  '#00A175', // green
  '#7E6AAE', // purple
  '#f5a8c8', // pink
  '#006145', // dark green
  '#0a0a0a', // black
]

const FALLBACK_PROJECTS = [
  { _id: 'f1', title: 'Cannabis Brand Packaging',    client: 'Dispensary Client',   service: 'Packaging',          slug: { current: 'cannabis-brand-packaging' },    coverImage: null },
  { _id: 'f2', title: 'Event Signage Suite',          client: 'NYC Event Co.',        service: 'Signage & Displays',  slug: { current: 'event-signage-suite' },          coverImage: null },
  { _id: 'f3', title: 'Merch Drop Collection',        client: 'Streetwear Brand',     service: 'Screen Printing',     slug: { current: 'merch-drop-collection' },        coverImage: null },
  { _id: 'f4', title: 'Restaurant Brand Identity',    client: 'Brooklyn Restaurant',  service: 'Graphic Design',      slug: { current: 'restaurant-brand-identity' },    coverImage: null },
  { _id: 'f5', title: 'Custom Die-Cut Stickers',      client: 'E-Commerce Brand',     service: 'Stickers & Labels',   slug: { current: 'custom-die-cut-stickers' },      coverImage: null },
  { _id: 'f6', title: 'Trade Show Backdrop',          client: 'Tech Startup',         service: 'Large Format',        slug: { current: 'trade-show-backdrop' },           coverImage: null },
  { _id: 'f7', title: 'Roll Label Collection',        client: 'Beverage Company',     service: 'Stickers & Labels',   slug: { current: 'roll-label-collection' },        coverImage: null },
]

export default async function PortfolioStrip() {
  let projects: SanityProject[] = []
  try {
    projects = await client.fetch(allPortfolioQuery)
  } catch {
    // use fallback
  }

  const items = (!projects || projects.length === 0) ? FALLBACK_PROJECTS : projects
  // Duplicate for infinite loop
  const doubled = [...items, ...items]

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Our Work</p>
            <h2 className="text-h2 font-semibold text-gray-900">The proof is in the print.</h2>
          </div>
          <Link href="/projects" className="hidden sm:inline-flex items-center gap-2 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors">
            View all projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Auto-scrolling strip */}
      <div className="relative">
        <div className="flex gap-4 animate-portfolio-strip hover:[animation-play-state:paused] w-max px-4">
          {doubled.map((project, i) => {
            const imageUrl = project.coverImage ? urlFor(project.coverImage).width(560).height(400).url() : null
            const bgColor = CARD_COLORS[i % CARD_COLORS.length]
            const isLight = ['#FFCA66', '#acf2f9', '#f5a8c8'].includes(bgColor)

            return (
              <Link
                key={`${project._id}-${i}`}
                href={`/projects/${project.slug.current}`}
                className="group flex-shrink-0 w-[260px] sm:w-[300px] rounded-card overflow-hidden flex flex-col justify-end p-5 h-[200px] relative transition-transform duration-300 hover:-translate-y-1.5"
                style={{ backgroundColor: bgColor }}
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="relative z-10">
                  <p className={`text-[10px] font-semibold uppercase tracking-widest mb-1 ${imageUrl ? 'text-white/70' : isLight ? 'text-black/50' : 'text-white/50'}`}>
                    {project.service}
                  </p>
                  <p className={`font-semibold text-sm leading-snug ${imageUrl ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>
                    {project.title}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="sm:hidden text-center mt-8">
        <Link href="/projects" className="inline-flex items-center gap-2 text-small font-semibold text-lp-green">
          View all projects <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
