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
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-5 sm:px-8">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
        <Link href="/portfolio" className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-xl transition hover:bg-white hover:text-black">
          LP Works
        </Link>
        <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/62">
          <Link href="/" className="hidden rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl transition hover:bg-white hover:text-black sm:block">Main Site</Link>
          <Link href="/shop" className="hidden rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl transition hover:bg-white hover:text-black sm:block">Shop</Link>
          <Link href="/get-quote" className="rounded-full border border-[#f2ff70]/45 bg-[#f2ff70] px-4 py-2 text-black backdrop-blur-xl transition hover:border-white hover:bg-white">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/10 to-transparent opacity-90" />
            <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
              <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 backdrop-blur-md">{project.category}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-black">
                <ArrowUpRight size={15} />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <p className="mb-1 text-xs uppercase tracking-[0.16em] text-[#f2ff70]/80">{project.client}</p>
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

      <section className="relative mx-auto flex max-w-[1600px] flex-col px-4 pb-10 pt-28 sm:px-8 sm:pt-32 lg:min-h-screen lg:pb-6">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <div className="text-[11px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/40">
            <p>Brooklyn / print / archive</p>
            <p className="mt-1 text-white/25">Portfolio index 001</p>
          </div>

          <div className="text-center">
            <p className="mx-auto mb-4 w-fit rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f2ff70]">
              Selected physical work
            </p>
            <h1 className="text-[clamp(3.9rem,12vw,12.5rem)] font-semibold uppercase leading-[0.76] tracking-[-0.105em] text-white">
              Print<br />in motion
            </h1>
          </div>

          <p className="max-w-sm text-balance text-right text-lg leading-[1.25] tracking-[-0.035em] text-white/55 max-lg:text-left sm:text-2xl">
            A darker, image-led portfolio built around continuous project motion. Click any frame to open the project page.
          </p>
        </div>

        <ProjectMarquee />

        <div className="mt-8 grid items-end gap-8 pb-2 lg:mt-auto lg:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            {['Packaging', 'Retail', 'Events', 'Labels', 'Signage', 'Brand Systems'].map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5">{tag}</span>
            ))}
          </div>
          <Link href="/get-quote" className="justify-self-start rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#f2ff70] lg:justify-self-end">
            Turn this into a quote
          </Link>
        </div>

        <div className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -z-0 hidden w-[140vw] -translate-x-1/2 text-center text-[clamp(7rem,22vw,23rem)] font-semibold uppercase leading-none tracking-[-0.12em] text-white/[0.035] sm:block">
          Portfolio
        </div>
      </section>
    </main>
  )
}
