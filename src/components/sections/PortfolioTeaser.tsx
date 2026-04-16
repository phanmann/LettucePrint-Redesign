'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const projects = [
  { id: '1', title: 'Cannabis Brand Packaging', client: 'Dispensary Client', service: 'Packaging', color: '#00A175' },
  { id: '2', title: 'Event Signage Suite', client: 'NYC Event Co.', service: 'Signage', color: '#006145' },
  { id: '3', title: 'Merch Drop Collection', client: 'Streetwear Brand', service: 'Screen Printing', color: '#7E6AAE' },
  { id: '4', title: 'Restaurant Brand Identity', client: 'Brooklyn Restaurant', service: 'Graphic Design', color: '#acf2f9' },
]

export default function PortfolioTeaser() {
  return (
    <section className="py-24 bg-lp-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Our Work</p>
            <h2 className="text-h2 font-semibold text-gray-900">The proof is in the print.</h2>
          </div>
          <Link href="/projects" className="hidden sm:inline-flex items-center gap-2 text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors">
            View all projects <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <Link href={`/projects/${project.id}`} className="group block">
                <div className="relative rounded-card overflow-hidden aspect-[4/3] mb-4" style={{ backgroundColor: project.color }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-xs uppercase tracking-widest">{project.service}</span>
                  </div>
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
          ))}
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
