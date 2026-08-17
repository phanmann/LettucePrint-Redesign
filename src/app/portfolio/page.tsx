import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { portfolioProjects } from '@/lib/portfolioProjects'
import { PortfolioSlideshow } from '@/components/sections/PortfolioSlideshow'

export const metadata: Metadata = {
  title: 'Portfolio — Lettuce Print Works',
  description: 'A dark, image-first portfolio archive of print, packaging, signage, brand systems, and activations produced by Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/portfolio' },
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-b from-black/80 to-transparent px-4 py-3 sm:px-8 sm:py-5">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
        <Link href="/portfolio" aria-label="Lettuce Print portfolio home" className="relative block h-10 w-28 shrink-0 overflow-hidden transition-opacity hover:opacity-75 sm:h-[52px] sm:w-[145px]">
          <Image
            src="/images/logos/lp-wordmark-white.svg"
            alt="Lettuce Print"
            width={1366}
            height={768}
            className="absolute -left-[29px] -top-[28px] h-auto w-[170px] max-w-none sm:-left-[37px] sm:-top-[35px] sm:w-[220px]"
            priority
          />
        </Link>
        <nav className="flex shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/62 sm:text-[11px] sm:tracking-[0.16em]">
          <a href="mailto:info@lettuceprint?cc=sean@lettuceprint" className="whitespace-nowrap rounded-full border border-lp-green bg-lp-green px-3 py-2.5 text-white backdrop-blur-xl transition hover:border-lp-green-dark hover:bg-lp-green-dark sm:px-4 sm:py-2">
            Let Us Work
          </a>
        </nav>
      </div>
    </header>
  )
}

export default function PortfolioMicrositePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-[#f5f0e8] selection:bg-[#f2ff70] selection:text-black">
      <Header />

      <section className="relative mx-auto flex max-w-[1600px] flex-col px-4 pb-10 pt-24 sm:px-8 sm:pt-32 lg:min-h-screen lg:pb-6">
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

        <PortfolioSlideshow projects={portfolioProjects} />
      </section>
    </main>
  )
}
