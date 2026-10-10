'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductPreviewImage from '@/components/shop/ProductPreviewImage'

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
  /** Optional override link for the CTA button. Defaults to /get-quote */
  href?: string
  /** Optional product image — replaces the color swatch */
  image?: string
  /** Target-specific image fit. Defaults to the existing cover treatment. */
  imageFit?: 'cover' | 'contain'
  /** Optional image previews for one option group, keyed by the visible option label. */
  optionImagePreviews?: { groupLabel: string; images: Record<string, string> }
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
  href,
  image,
  imageFit = 'cover',
  optionImagePreviews,
}: ProductCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [hoveredPreview, setHoveredPreview] = useState<string | null>(null)
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null)
  const activePreview = hoveredPreview ?? selectedPreview
  const previewSrc = activePreview ? optionImagePreviews?.images[activePreview] : undefined

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* ── Image or swatch ── */}
      {image ? (
        <div className="relative w-full h-44 flex-shrink-0 overflow-hidden bg-white">
          {previewSrc ? (
            <Image src={previewSrc} alt={`${activePreview} binding preview placeholder`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          ) : (
            <ProductPreviewImage
              productPath={href ?? ''}
              fallbackSrc={image}
              alt={name}
              fallbackFit={imageFit}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>
      ) : (
        <div
          className="w-full h-44 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: color }}
        >
          <div className="text-center px-6">
            <p className="text-sm font-semibold text-gray-500 mb-1">{name}</p>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">
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
                  {group.values.map(v => optionImagePreviews?.groupLabel === group.label && optionImagePreviews.images[v] ? (
                    <button
                      key={v}
                      type="button"
                      aria-label={`Preview ${v} binding image`}
                      aria-pressed={selectedPreview === v}
                      onMouseEnter={() => setHoveredPreview(v)}
                      onMouseLeave={() => setHoveredPreview(null)}
                      onFocus={() => setHoveredPreview(v)}
                      onBlur={() => setHoveredPreview(null)}
                      onClick={() => setSelectedPreview(current => current === v ? null : v)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lp-green ${activePreview === v ? 'bg-lp-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {v}
                    </button>
                  ) : (
                    <span key={v} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{v}</span>
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
            href={href ?? `/get-quote?product=${encodeURIComponent(name)}&category=${encodeURIComponent(categoryLabel)}`}
          >
            <Button variant="secondary" size="sm" className="w-full bg-white">
              Order Now <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
