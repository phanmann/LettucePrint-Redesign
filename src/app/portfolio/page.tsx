import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { portfolioProjects } from '@/lib/portfolioProjects'

export const metadata: Metadata = {
  title: 'Portfolio — Lettuce Print Works',
  description: 'A dark, image-first portfolio archive of print, packaging, signage, brand systems, and activations produced by Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/portfolio' },
}

const marqueeProjects = [...portfolioProjects, ...portfolioProjects]

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
          <Link href="/shop" className="hidden rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl transition hover:bg-white hover:text-black sm:block">Shop</Link>
          <Link href="/get-quote" className="whitespace-nowrap rounded-full border border-lp-green bg-lp-green px-3 py-2.5 text-white backdrop-blur-xl transition hover:border-lp-green-dark hover:bg-lp-green-dark sm:px-4 sm:py-2">
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  )
}

function ProjectMarquee() {
  return (
    <section className="relative -mx-4 mt-10 overflow-hidden py-6 sm:-mx-8 sm:mt-14 lg:mt-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#080808] to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#080808] to-transparent sm:w-40" />
      <div className="flex w-max gap-4 animate-portfolio-strip hover:[animation-play-state:paused] sm:gap-6">
        {marqueeProjects.map((project, index) => (
          <Link
            key={`${project.slug}-${index}`}
            href={`/portfolio/${project.slug}`}
            className="group relative h-[300px] w-[220px] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 sm:h-[440px] sm:w-[320px] sm:rounded-[32px] lg:h-[520px] lg:w-[380px]"
          >
            <Image
              src={project.image}
              alt={`${project.client} — ${project.title}`}
              fill
              className="object-cover transition duration-700 group-hover:scale-105 group-hover:saturate-110"
              sizes="(max-width: 640px) 250px, (max-width: 1024px) 320px, 380px"
              priority={index < 3}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-90 group-focus-visible:opacity-90" />
            <div className="absolute left-4 right-4 top-4 flex translate-y-2 items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 backdrop-blur-md">{project.category}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-black">
                <ArrowUpRight size={15} />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-6">
              <h2 className="max-w-[12rem] text-2xl font-semibold leading-[0.9] tracking-[-0.07em] text-white sm:max-w-[15rem] sm:text-4xl">{project.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
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

        <ProjectMarquee />
      </section>
    </main>
  )
}
