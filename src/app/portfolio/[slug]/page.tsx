import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getPortfolioProject, portfolioProjects } from '@/lib/portfolioProjects'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getPortfolioProject(slug)
  if (!project) return {}

  return {
    title: `${project.title} — ${project.client} | Lettuce Print Portfolio`,
    description: project.summary,
    alternates: { canonical: `https://lettuceprint.com/portfolio/${project.slug}` },
  }
}

export default async function PortfolioProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getPortfolioProject(slug)
  if (!project) notFound()

  const index = portfolioProjects.findIndex((item) => item.slug === project.slug)
  const nextProject = portfolioProjects[(index + 1) % portfolioProjects.length]

  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f0e8] selection:bg-[#f2ff70] selection:text-black">
      <header className="fixed left-0 right-0 top-0 z-50 px-4 py-5 sm:px-8">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
          <Link href="/portfolio" className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl transition hover:bg-white hover:text-black">
            <span className="inline-flex items-center gap-2"><ArrowLeft size={13} /> Index</span>
          </Link>
          <Link href="/get-quote" className="rounded-full border border-[#f2ff70]/45 bg-[#f2ff70] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black backdrop-blur-xl transition hover:bg-white">
            Start a Project
          </Link>
        </div>
      </header>

      <section className="mx-auto grid min-h-screen max-w-[1600px] gap-8 px-4 pb-12 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="relative z-10 pb-4">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f2ff70]">{project.category} / {project.year}</p>
          <h1 className="max-w-3xl text-[clamp(4rem,10vw,10.5rem)] font-semibold uppercase leading-[0.78] tracking-[-0.1em] text-white">
            {project.title}
          </h1>
          <p className="mt-6 max-w-xl text-2xl leading-[1.2] tracking-[-0.04em] text-white/62 sm:text-3xl">
            {project.summary}
          </p>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 lg:aspect-[5/4]">
          <Image src={project.image} alt={`${project.client} — ${project.title}`} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 55vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Client</p>
              <p className="text-2xl font-semibold tracking-[-0.05em] text-white">{project.client}</p>
            </div>
            <span className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur-md">
              Case image
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-8">
        <div className="grid gap-3 border-y border-white/10 py-8 sm:grid-cols-3">
          {project.services.map((service) => (
            <div key={service} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">Service</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">{service}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pb-20 sm:px-8">
        <Link href={`/portfolio/${nextProject.slug}`} className="group flex min-h-[260px] items-end justify-between overflow-hidden rounded-[32px] border border-white/10 bg-white p-6 text-black sm:p-8">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45">Next project</p>
            <h2 className="max-w-3xl text-5xl font-semibold uppercase leading-[0.82] tracking-[-0.09em] sm:text-8xl">{nextProject.title}</h2>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-black text-white transition group-hover:bg-[#00A175]"><ArrowUpRight size={18} /></span>
        </Link>
      </section>
    </main>
  )
}
