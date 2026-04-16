import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { featuredPortfolioQuery } from '@/sanity/queries'

interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  client: string
  service: string
  coverImage?: { asset: { _ref: string } }
  tags?: string[]
}

const FALLBACK_COLORS: Record<string, string> = {
  'Stickers & Labels': '#00A175',
  'Packaging':         '#006145',
  'Screen Printing':   '#7E6AAE',
  'Graphic Design':    '#acf2f9',
  'Signage & Displays':'#FFCA66',
  'Large Format':      '#0a0a0a',
}

const FALLBACK_PROJECTS = [
  { _id: 'f1', title: 'Cannabis Brand Packaging', client: 'Dispensary Client', service: 'Packaging', slug: { current: 'cannabis-brand-packaging' }, coverImage: null },
  { _id: 'f2', title: 'Event Signage Suite',      client: 'NYC Event Co.',     service: 'Signage & Displays', slug: { current: 'event-signage-suite' }, coverImage: null },
  { _id: 'f3', title: 'Merch Drop Collection',    client: 'Streetwear Brand',  service: 'Screen Printing', slug: { current: 'merch-drop-collection' }, coverImage: null },
  { _id: 'f4', title: 'Restaurant Brand Identity',client: 'Brooklyn Restaurant',service: 'Graphic Design', slug: { current: 'restaurant-brand-identity' }, coverImage: null },
]

export default async function PortfolioTeaser() {
  let projects: SanityProject[] = []
  try {
    projects = await client.fetch(featuredPortfolioQuery)
  } catch {
    // CMS not yet populated
  }

  const items = (!projects || projects.length === 0) ? FALLBACK_PROJECTS : projects

  return (
    <section className="py-24 bg-lp-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Our Work</p>
            <h2 className="text-h2 font-semibold text-gray-900">The proof is in the print.</h2>
          </div>
          <Link href="/projects" className="hidden sm:inline-flex items-center gap-2 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors">
            View all projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {items.map((project) => {
            const imageUrl = project.coverImage ? urlFor(project.coverImage).width(600).height(450).url() : null
            const bgColor = FALLBACK_COLORS[project.service] ?? '#00A175'

            return (
              <Link key={project._id} href={`/projects/${project.slug.current}`} className="group block">
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
            )
          })}
        </div>

        <div className="sm:hidden text-center">
          <Link href="/projects" className="inline-flex items-center gap-2 text-small font-semibold text-lp-green">
            View all projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
