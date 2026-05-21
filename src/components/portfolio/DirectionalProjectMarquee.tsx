'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { PortfolioProject } from '@/lib/portfolioProjects'

type Direction = 'normal' | 'reverse'

type DirectionalProjectMarqueeProps = {
  projects: PortfolioProject[]
}

export function DirectionalProjectMarquee({ projects }: DirectionalProjectMarqueeProps) {
  const [direction, setDirection] = useState<Direction>('normal')
  const marqueeProjects = [...projects, ...projects]

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      setDirection(event.clientX > window.innerWidth / 2 ? 'reverse' : 'normal')
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <section className="relative -mx-4 mt-10 overflow-hidden py-6 sm:-mx-8 sm:mt-14 lg:mt-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#080808] to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#080808] to-transparent sm:w-40" />
      <div
        className="flex w-max gap-4 animate-portfolio-strip sm:gap-6"
        style={{ animationDirection: direction }}
      >
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
              <p className="mb-1 text-xs uppercase tracking-[0.16em] text-[#f2ff70]/80">{project.client}</p>
              <h2 className="max-w-[12rem] text-2xl font-semibold leading-[0.9] tracking-[-0.07em] text-white sm:max-w-[15rem] sm:text-4xl">{project.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
