'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Package, Shirt, PanelTop, Tag, Expand, MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'

const heroCards = [
  { label: 'Packaging',      bg: '#00A175', icon: Package },
  { label: 'Screen Printing',bg: '#7E6AAE', icon: Shirt },
  { label: 'Signage',        bg: '#FFCA66', icon: PanelTop },
  { label: 'Stickers',       bg: '#acf2f9', icon: Tag },
  { label: 'Large Format',   bg: '#0a0a0a', icon: Expand },
]

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '10+',  label: 'Years in Brooklyn' },
  { value: '3–5',  label: 'Day Turnaround' },
]

export default function Hero() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const ringPos = useRef({ x: 0, y: 0 })
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
      }
    }
    window.addEventListener('mousemove', onMove)

    let raf: number
    const loop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Custom cursor — desktop only */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-lp-green rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-lp-green rounded-full pointer-events-none z-[9998] opacity-40 hidden lg:block"
        style={{ willChange: 'transform' }}
      />

      <section className="pt-[72px] bg-white overflow-hidden">

        {/* Top row: headline left, photo right */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 pt-10 lg:pt-14 pb-8 items-center">

            {/* Left — Headline + desc */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-5">
                Brooklyn&apos;s Creative Print Studio
              </p>
              <h1 className="text-h1 font-semibold text-gray-900 leading-[1.0] mb-6">
                Print that makes your brand impossible to ignore.
              </h1>
              <p className="text-body-lg text-gray-500 max-w-md mb-8 leading-relaxed">
                Custom stickers, packaging, signage, and apparel — designed and printed in Brooklyn.
                Fast turnaround. Real expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/get-quote">
                  <Button size="lg">Get a Quote</Button>
                </Link>
                <Link href="/shop">
                  <Button variant="secondary" size="lg">Shop Products</Button>
                </Link>
              </div>
            </motion.div>

            {/* Right — Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="relative rounded-card overflow-hidden h-[280px] lg:h-[340px] bg-lp-green/10"
            >
              <Image
                src="/images/logos/LP_Logos_Heart-Green.png"
                alt="Lettuce Print Studio"
                fill
                className="object-contain p-12 opacity-20"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lp-green font-semibold text-sm uppercase tracking-widest mb-2">Est. Brooklyn, NY</p>
                  <p className="text-gray-400 text-xs">361 Stagg Street</p>
                </div>
              </div>
              {/* Location badge */}
              <div className="absolute bottom-4 left-4 bg-lp-yellow text-gray-900 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full flex items-center gap-1.5">
                <MapPin size={11} strokeWidth={2.5} />
                361 Stagg St, Brooklyn
              </div>
            </motion.div>
          </div>
        </div>

        {/* Image cards strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-3">
            {heroCards.map((card) => (
              <div
                key={card.label}
                className="lg:flex-1 rounded-card flex items-end justify-start p-4 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                style={{ backgroundColor: card.bg, height: '140px' }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-20 select-none">
                  <card.icon size={52} strokeWidth={1.25} />
                </div>
                <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.12em] bg-white/90 text-gray-900 px-3 py-1.5 rounded-full whitespace-nowrap">
                  {card.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom bar: CTAs + stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="border-t border-gray-100 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-8 sm:gap-12">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-semibold text-lp-green leading-none">{s.value}</p>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 mt-1 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:block text-gray-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
