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
  const supportingProjects = portfolioProjects.filter((item) => item.slug !== project.slug)
  const secondaryImage = supportingProjects[(index + 1) % supportingProjects.length]?.image ?? nextProject.image
  const tertiaryImage = supportingProjects[(index + 3) % supportingProjects.length]?.image ?? project.image

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white selection:bg-lp-green selection:text-white lg:grid lg:grid-cols-[40vw_1fr] xl:grid-cols-[38vw_1fr]">
      {/* Sticky project dossier — modeled after the reference's left information column */}
      <aside className="bg-[#050505] text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-y-auto">
        <div className="flex items-start justify-between gap-6 p-5 sm:p-8 lg:p-10">
          <Link href="/portfolio" aria-label="Back to portfolio index" className="block transition-opacity hover:opacity-60">
            <Image
              src="/images/logos/lp-wordmark-white.svg"
              alt="Lettuce Print"
              width={1366}
              height={768}
              className="h-16 w-auto sm:h-20"
              priority
            />
          </Link>
          <nav className="flex flex-col items-end gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
            <Link href="/portfolio" className="inline-flex items-center gap-1 transition hover:text-white">
              <ArrowLeft size={12} /> Index
            </Link>
            <Link href="/get-quote" className="transition hover:text-lp-green">Start a Project</Link>
          </nav>
        </div>

        <div className="flex-1 px-5 pb-8 sm:px-8 lg:flex lg:flex-col lg:px-10 lg:pb-10">
          <div className="pt-6 lg:pt-8 xl:pt-10">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-lp-green">
              {project.category} / {project.year}
            </p>
            <h1 className="max-w-[12ch] text-[clamp(3.1rem,5.9vw,6.9rem)] font-normal uppercase leading-[0.86] tracking-[-0.075em] text-white">
              {project.title}
            </h1>
          </div>

          <div className="mt-8 divide-y divide-white/15 border-y border-white/15 text-sm sm:mt-9">
            <div className="grid grid-cols-[92px_1fr] gap-5 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">Services</p>
              <ul className="space-y-1.5 leading-snug text-white/78">
                {project.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-[92px_1fr] gap-5 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">Output</p>
              <p className="leading-snug text-white/78">Brand system, print production, physical campaign assets</p>
            </div>
          </div>

          <p className="mt-7 max-w-xl text-[15px] leading-[1.42] tracking-[-0.015em] text-white/62 sm:text-base lg:text-[15px] xl:text-base">
            {project.summary} Lettuce Print translates brand direction into tactile systems that work across launch moments, packaging, signage, and customer-facing print.
          </p>

          <div className="mt-8 flex items-end justify-between gap-6 text-[11px] uppercase tracking-[0.16em] text-white/35 lg:mt-auto lg:pt-8">
            <p className="max-w-[16rem] leading-relaxed">Contact for collaborations, projects & partnerships.</p>
            <Link href={`/portfolio/${nextProject.slug}`} className="inline-flex items-center gap-1 font-semibold text-white/55 transition hover:text-white">
              Next <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Scrolling visual case study column */}
      <section className="min-w-0 bg-[#0b0b0b]">
        <div className="relative min-h-screen overflow-hidden bg-[#171717]">
          <Image
            src={project.image}
            alt={`${project.client} — ${project.title}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 63vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <div className="absolute right-5 top-5 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 sm:right-8 sm:top-8">
            <p>Lettuce Print</p>
            <p className="text-white/45">Design & Production</p>
          </div>
        </div>

        <div className="bg-[#26302d] px-5 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">{project.client}</p>
            <div className="grid gap-10 lg:grid-cols-[0.95fr_0.8fr] lg:items-end">
              <div>
                <h2 className="max-w-3xl text-[clamp(3rem,7vw,7.5rem)] font-normal uppercase leading-[0.84] tracking-[-0.08em] text-white">
                  {project.category.replace(' / ', ' & ')}
                </h2>
                <Link href="/get-quote" className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:bg-white hover:text-black">
                  Start a related project <ArrowUpRight size={13} />
                </Link>
              </div>
              <blockquote className="text-xl leading-[1.2] tracking-[-0.035em] text-white/76 sm:text-3xl">
                “Physical brand systems should feel cohesive before a customer reads a single word.”
                <footer className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">— Lettuce Print</footer>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="space-y-5 bg-[#111] p-5 sm:space-y-8 sm:p-8 lg:p-10">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#1b1b1b]">
            <Image src={secondaryImage} alt={`${project.title} supporting visual`} fill className="object-cover opacity-90" sizes="(max-width: 1024px) 100vw, 63vw" />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute left-6 top-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Production Detail</div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#1b1b1b]">
              <Image src={tertiaryImage} alt={`${project.title} secondary visual`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 31vw" />
            </div>
            <div className="flex aspect-[4/5] flex-col justify-between bg-[#eee9df] p-6 text-black sm:p-8">
              <div>
                <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/35">Project Notes</p>
                <p className="text-3xl font-normal leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                  Built for brands that need the physical touchpoint to match the visual identity.
                </p>
              </div>
              <div className="mt-8 grid gap-3 border-t border-black/15 pt-5 text-sm text-black/65">
                <p><span className="text-black">Client:</span> {project.client}</p>
                <p><span className="text-black">Category:</span> {project.category}</p>
                <p><span className="text-black">Year:</span> {project.year}</p>
              </div>
            </div>
          </div>
        </div>

        <Link href={`/portfolio/${nextProject.slug}`} className="group block bg-[#eee9df] px-5 py-6 text-black transition hover:bg-white sm:px-10 sm:py-8">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">Next project</p>
          <div className="flex items-center justify-between gap-6">
            <h2 className="max-w-none truncate text-[clamp(1.75rem,4vw,4.75rem)] font-normal uppercase leading-[0.9] tracking-[-0.065em]">
              {nextProject.title}
            </h2>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-black text-white transition group-hover:bg-lp-green sm:h-11 sm:w-11"><ArrowUpRight size={16} /></span>
          </div>
        </Link>
      </section>
    </main>
  )
}
