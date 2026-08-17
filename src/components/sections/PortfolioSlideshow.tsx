'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { PortfolioProject } from '@/lib/portfolioProjects'

const CARDS_PER_SLIDE = 3
const HOLD_DURATION = 3000
const SLIDE_DURATION = 900

export function PortfolioSlideshow({ projects }: { projects: PortfolioProject[] }) {
  const slides = useMemo(() => {
    const groups: PortfolioProject[][] = []
    for (let index = 0; index < projects.length; index += CARDS_PER_SLIDE) {
      groups.push(projects.slice(index, index + CARDS_PER_SLIDE))
    }
    return groups
  }, [projects])

  const [activeSlide, setActiveSlide] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    if (slides.length < 2) return

    const timer = window.setInterval(() => {
      setAnimate(true)
      setActiveSlide((current) => current + 1)
    }, HOLD_DURATION + SLIDE_DURATION)

    return () => window.clearInterval(timer)
  }, [slides.length])

  if (slides.length === 0) return null

  const visibleSlides = slides.length > 1 ? [...slides, slides[0]] : slides

  return (
    <section className="relative -mx-4 mt-10 overflow-hidden py-6 sm:-mx-8 sm:mt-14 lg:mt-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#080808] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#080808] to-transparent sm:w-16" />
      <div
        className="flex"
        style={{
          transform: `translateX(-${activeSlide * 100}%)`,
          transition: animate ? `transform ${SLIDE_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)` : 'none',
        }}
        onTransitionEnd={() => {
          if (activeSlide !== slides.length) return
          setAnimate(false)
          setActiveSlide(0)
          window.requestAnimationFrame(() => window.requestAnimationFrame(() => setAnimate(true)))
        }}
      >
        {visibleSlides.map((slide, slideIndex) => {
          const isClone = slideIndex === slides.length
          return (
            <div key={slideIndex} className="grid min-w-full grid-cols-3 gap-2 px-4 sm:gap-6 sm:px-8" aria-hidden={isClone || undefined}>
              {slide.map((project, cardIndex) => (
                <Link
                  key={`${slideIndex}-${project.slug}`}
                  href={`/portfolio/${project.slug}`}
                  tabIndex={isClone ? -1 : undefined}
                  className="group relative aspect-[3/4] min-w-0 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 sm:rounded-[28px] lg:aspect-[4/5] lg:rounded-[32px]"
                >
                  <Image
                    src={project.image}
                    alt={`${project.client} — ${project.title}`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105 group-hover:saturate-110"
                    sizes="(max-width: 640px) 33vw, (max-width: 1600px) 31vw, 500px"
                    priority={slideIndex === 0 && cardIndex < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-90 group-focus-visible:opacity-90" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-6">
                    <span className="mb-2 hidden rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65 backdrop-blur-md sm:inline-block">
                      {project.category}
                    </span>
                    <h2 className="text-sm font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">{project.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}
