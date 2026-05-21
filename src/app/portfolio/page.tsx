import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { portfolioProjects } from '@/lib/portfolioProjects'
import { DirectionalProjectMarquee } from '@/components/portfolio/DirectionalProjectMarquee'

export const metadata: Metadata = {
  title: 'Portfolio — Lettuce Print Works',
  description: 'A dark, image-first portfolio archive of print, packaging, signage, brand systems, and activations produced by Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/portfolio' },
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-5 sm:px-8">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
        <Link href="/portfolio" aria-label="Lettuce Print portfolio home" className="block transition-opacity hover:opacity-75">
          <Image
            src="/images/logos/lp-wordmark-white.svg"
            alt="Lettuce Print"
            width={1366}
            height={768}
            className="h-[67px] w-auto sm:h-[78px]"
            priority
          />
        </Link>
        <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/62">
          <Link href="/shop" className="hidden rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl transition hover:bg-white hover:text-black sm:block">Shop</Link>
          <Link href="/get-quote" className="rounded-full border border-lp-green bg-lp-green px-4 py-2 text-white backdrop-blur-xl transition hover:border-lp-green-dark hover:bg-lp-green-dark">
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default function PortfolioMicrositePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-[#f5f0e8] selection:bg-[#f2ff70] selection:text-black">
      <Header />

      <section className="relative mx-auto flex max-w-[1600px] flex-col px-4 pb-10 pt-28 sm:px-8 sm:pt-32 lg:min-h-screen lg:pb-6">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-white">
            <span className="block text-[clamp(4.5rem,12vw,12rem)] font-normal normal-case leading-[0.74] tracking-[0.01em] [font-family:'Snell_Roundhand','Brush_Script_MT','Segoe_Script',cursive]">
              Let Us
            </span>
            <span className="block font-sans text-[clamp(4.2rem,12vw,12.5rem)] font-semibold leading-[0.76] tracking-[-0.025em]">
              Design
            </span>
          </h1>
          <p className="mx-auto mt-12 max-w-2xl text-balance text-center text-lg leading-[1.25] tracking-[-0.035em] text-white/55 sm:mt-16 sm:text-2xl">
            A multi-disciplinary design studio crafting cohesive brand identities with a specialized expertise in print.
          </p>
        </div>

        <DirectionalProjectMarquee projects={portfolioProjects} />


        <div className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -z-0 hidden w-[140vw] -translate-x-1/2 text-center text-[clamp(7rem,22vw,23rem)] font-normal uppercase leading-none tracking-[-0.12em] text-white/[0.035] sm:block">
          Portfolio
        </div>
      </section>
    </main>
  )
}
