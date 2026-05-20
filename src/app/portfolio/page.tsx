import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Portfolio — Lettuce Print Works',
  description: 'A visual archive of print, packaging, signage, brand systems, and activations produced by Lettuce Print in Brooklyn.',
  alternates: { canonical: 'https://lettuceprint.com/portfolio' },
}

const featured = [
  {
    title: 'Retail print systems',
    client: 'Bergdorf Goodman',
    type: 'Installation / Retail',
    image: '/images/portfolio/bergdorf-print-install.jpg',
    span: 'lg:col-span-7',
    ratio: 'aspect-[4/3]',
  },
  {
    title: 'Launch collateral',
    client: 'Vitasoy',
    type: 'Activation / Photo',
    image: '/images/portfolio/vitasoy-activation.jpg',
    span: 'lg:col-span-5',
    ratio: 'aspect-[3/4]',
  },
  {
    title: 'Cannabis label production',
    client: 'Claudine Farms',
    type: 'Packaging / Labels',
    image: '/images/portfolio/claudine-farms-labels.jpeg',
    span: 'lg:col-span-4',
    ratio: 'aspect-[3/4]',
  },
  {
    title: 'Backlit display graphics',
    client: 'Seagate',
    type: 'Large Format',
    image: '/images/portfolio/lightbox-display.png',
    span: 'lg:col-span-8',
    ratio: 'aspect-[16/10]',
  },
]

const archive = [
  { title: 'Business card system', type: 'Print', image: '/images/portfolio/business-card-system.png' },
  { title: 'Sticker + label kit', type: 'Stickers', image: '/images/portfolio/sticker-labels.png' },
  { title: 'Mylar packaging mockup', type: 'Packaging', image: '/images/portfolio/mylar-packaging.png' },
  { title: 'Poster suite', type: 'Marketing', image: '/images/portfolio/poster-suite.png' },
  { title: 'Farmers brand system', type: 'Identity', image: '/images/portfolio/farmers-brand-system.jpg' },
]

const disciplines = ['Packaging', 'Signage', 'Retail', 'Cannabis', 'Events', 'Stickers', 'Brand Systems', 'Apparel']

function WorkCard({ item }: { item: (typeof featured)[number] }) {
  return (
    <article className={`${item.span} group`}> 
      <div className={`relative ${item.ratio} overflow-hidden rounded-[2rem] bg-[#1c1c1c]`}> 
        <Image
          src={item.image}
          alt={`${item.client} ${item.title}`}
          fill
          className="object-cover saturate-[0.9] transition duration-700 group-hover:scale-[1.035] group-hover:saturate-100"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-85" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f2ff70]/80">{item.type}</p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="max-w-lg text-2xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{item.title}</h2>
              <p className="mt-1 text-sm text-white/60">{item.client}</p>
            </div>
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition group-hover:bg-white group-hover:text-black sm:flex">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function PortfolioMicrositePage() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#f4f0e8] selection:bg-[#f2ff70] selection:text-black">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080808]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-8">
          <Link href="/portfolio" className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
            LP Works
          </Link>
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 sm:gap-5">
            <Link href="/" className="hidden transition hover:text-white sm:inline">Main Site</Link>
            <Link href="/shop" className="hidden transition hover:text-white sm:inline">Shop</Link>
            <Link href="/get-quote" className="rounded-full border border-[#f2ff70]/40 px-4 py-2 text-[#f2ff70] transition hover:bg-[#f2ff70] hover:text-black">
              Start a Project
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-4 pb-12 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#f2ff70]">Brooklyn print archive</p>
            <h1 className="max-w-5xl text-[clamp(4.6rem,13vw,14rem)] font-semibold uppercase leading-[0.78] tracking-[-0.095em] text-white">
              Work<br />that hits.
            </h1>
          </div>
          <div className="max-w-xl lg:pb-4">
            <p className="text-xl leading-[1.35] tracking-[-0.035em] text-white/72 sm:text-3xl">
              A separate, image-first portfolio for the projects where print becomes brand presence — packaging, launches, retail moments, and physical campaigns.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {disciplines.map((item) => (
                <span key={item} className="rounded-full border border-white/15 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/55">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#f2ff70] py-3 text-black">
        <div className="flex overflow-hidden whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em]">
          <div className="animate-portfolio-strip">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mx-5">Print / Packaging / Signage / Launch Systems / Brooklyn Production /</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 px-4 py-5 sm:px-8 lg:grid-cols-12">
        {featured.map((item) => <WorkCard key={item.title} item={item} />)}
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-8 sm:py-24">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/35">Selected archive</p>
            <h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Production range.</h2>
          </div>
          <Link href="/projects" className="hidden text-sm font-semibold uppercase tracking-[0.16em] text-[#f2ff70] hover:text-white sm:inline-flex">
            View old grid ↗
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {archive.map((item) => (
            <article key={item.title} className="group rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-white/5">
                <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 50vw, 20vw" />
              </div>
              <div className="px-2 pb-3 pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f2ff70]/70">{item.type}</p>
                <h3 className="mt-1 text-lg font-semibold tracking-[-0.035em] text-white">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 pb-20 sm:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-black sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-black/45">Connected to Lettuce Print</p>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">Like what you see? Move from reference to quote.</h2>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link href="/get-quote" className="rounded-full bg-black px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#00A175]">
              Request a Quote
            </Link>
            <Link href="/" className="rounded-full border border-black/15 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:border-black">
              Back to Main Site
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
