'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface ProductCardProps {
  id: string
  name: string
  subtitle: string
  description: string
  features: string[]
  turnaround: string
  color: string
  categoryLabel: string
  /** Optional pill-style option tags shown below the description */
  options?: { label: string; values: string[] }[]
}

export default function ProductCard({
  name,
  subtitle,
  description,
  features,
  turnaround,
  color,
  categoryLabel,
  options,
}: ProductCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex flex-col">
      {/* ── Swatch — detached rounded card ── */}
      <div
        className="w-full h-44 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: color }}
      >
        <div className="text-center px-6">
          <p className="text-sm font-semibold text-gray-500 mb-1">{name}</p>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>

      {/* ── Content — open, no outer border ── */}
      <div className="flex flex-col flex-1 bg-white rounded-2xl p-5">
        <h3 className="text-base font-bold text-gray-900 mb-0.5">{name}</h3>
        <p className="text-xs text-gray-400 mb-3">{subtitle}</p>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>

        {/* Option tags — only shown on consolidated cards */}
        {options && options.length > 0 && (
          <div className="space-y-2 mb-4">
            {options.map(group => (
              <div key={group.label} className="flex items-start gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-400 w-14 flex-shrink-0 pt-0.5">
                  {group.label}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.values.map(v => (
                    <span
                      key={v}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expandable details */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-lp-green transition-colors mb-4"
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
          {expanded ? 'Hide details' : 'See details'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <ul className="space-y-1.5 mb-4">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-lp-green flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mb-4">Turnaround: {turnaround}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA pinned to bottom */}
        <div className="mt-auto pt-2">
          <Link
            href={`/get-quote?product=${encodeURIComponent(name)}&category=${encodeURIComponent(categoryLabel)}`}
          >
            <Button size="sm" className="w-full">
              Get a Quote <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
