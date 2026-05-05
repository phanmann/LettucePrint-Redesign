'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import HeroSlideshow from './HeroSlideshow'
import Button from '@/components/ui/Button'

const heroCards = [
  { label: 'Packaging',      bg: '#00A175', img: '/images/hero-cards/packaging.jpg' },
  { label: 'Screen Printing',bg: '#7E6AAE', img: '/images/hero-cards/screen-printing.jpg' },
  { label: 'Signage',        bg: '#FFCA66', img: '/images/hero-cards/signage.png' },
  { label: 'Stickers',       bg: '#acf2f9', img: '/images/hero-cards/stickers.png' },
  { label: 'Large Format',   bg: '#0a0a0a', img: '/images/hero-cards/large-format.png' },
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
              className="order-2 lg:order-1"
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
              <div className="flex flex-row gap-3">
                <Link href="/shop">
                  <Button variant="secondary" size="md">Shop Products</Button>
                </Link>
              </div>
            </motion.div>

            {/* Right — Hero slideshow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="order-1 lg:order-2"
            >
              <HeroSlideshow />
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
            {heroCards.map((card) => card.label === 'Large Format' ? (
              <div key={card.label} className="hidden lg:block lg:flex-1 rounded-card flex items-end justify-start p-4 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 group" style={{ backgroundColor: card.bg, height: '140px' }}>
                <Image src={card.img} alt={card.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="240px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute bottom-4 left-4 z-10 text-[10px] font-bold uppercase tracking-[0.12em] bg-white/90 text-gray-900 px-3 py-1.5 rounded-full whitespace-nowrap">{card.label}</span>
              </div>
            ) : (
              <div
                key={card.label}
                className="lg:flex-1 rounded-card flex items-end justify-start p-4 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 group"
                style={{ backgroundColor: card.bg, height: '140px' }}
              >
                {/* Photo */}
                <Image
                  src={card.img}
                  alt={card.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                />
                {/* Dark gradient scrim so label is readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.12em] bg-white/90 text-gray-900 px-3 py-1.5 rounded-full whitespace-nowrap">
                  {card.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>


      </section>
    </>
  )
}
