'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function CTABanner() {
  return (
    <section className="py-24 bg-lp-green relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url('/images/logos/LP_Logos_Heart-White.svg')`,
          backgroundSize: '60px 60px',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="absolute inset-0 bg-lp-gradient-radial pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-6">
            Ready to get started?
          </p>
          <h2 className="text-display font-semibold text-white mb-6">
            Let&apos;s make something great.
          </h2>
          <p className="text-body-lg text-white/80 max-w-xl mx-auto mb-10">
            Whether you need a quick quote on custom stickers or a full brand production rollout —
            we&apos;re ready when you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote">
              <Button variant="ghost" size="lg">Get a Quote</Button>
            </Link>
            <Link href="/shop">
              <Button variant="ghost" size="lg">Shop Products</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
