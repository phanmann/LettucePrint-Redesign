import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABanner from '@/components/sections/CTABanner'
import PortfolioGrid from '@/components/sections/PortfolioGrid'
import { client } from '@/sanity/client'
import { allPortfolioQuery } from '@/sanity/queries'

export const metadata = {
  title: 'Portfolio | Lettuce Print',
  description: 'Browse our work — packaging, signage, screen printing, stickers, and more for brands across NYC and beyond.',
}

export default async function PortfolioPage() {
  let projects = []
  try {
    projects = await client.fetch(allPortfolioQuery)
  } catch {
    // fallback to placeholder
  }
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-[calc(72px+4rem)] pb-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Our Work</p>
            <h1 className="text-display font-semibold text-gray-900 mb-6 max-w-2xl">
              The proof is in the print.
            </h1>
            <p className="text-body-lg text-gray-600 max-w-xl">
              From cannabis brands to restaurants to streetwear drops — here&apos;s what we&apos;ve been making.
            </p>
          </div>
        </section>

        <PortfolioGrid projects={projects} />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
