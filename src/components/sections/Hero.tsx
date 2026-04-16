'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Button from '@/components/ui/Button'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-lp-green flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated radial gradient overlay */}
      <div className="absolute inset-0 bg-lp-gradient-radial animate-hero-pulse pointer-events-none" />

      {/* LP Heart pattern texture */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url('/images/logos/LP_Logos_Heart-White.svg')`,
          backgroundSize: '80px 80px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Parallax content */}
      <motion.div
        style={{ y }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto"
      >
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <Image
            src="/images/logos/LP_Logos_Heart-White.svg"
            alt="Lettuce Print mark"
            width={64}
            height={64}
            priority
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-6"
        >
          Brooklyn&apos;s Creative Print Studio
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-hero font-semibold text-white mb-8 max-w-4xl"
        >
          Print that makes your brand impossible to ignore.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className="text-body-lg text-white/85 max-w-xl mb-12"
        >
          Custom stickers, packaging, signage, and apparel — designed and printed in Brooklyn.
          Fast turnaround. Real expertise. Two ways to work with us.
        </motion.p>

        {/* Dual CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link href="/get-quote">
            <Button variant="ghost" size="lg">Get a Quote</Button>
          </Link>
          <Link href="/shop">
            <Button variant="ghost" size="lg">Shop Products</Button>
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-white/30 relative overflow-hidden">
            <motion.div
              className="w-full h-1/2 bg-white/80 absolute top-0"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
