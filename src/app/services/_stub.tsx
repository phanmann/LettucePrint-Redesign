// Shared stub layout for service pages — delete once real pages are built
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABanner from '@/components/sections/CTABanner'
import Link from 'next/link'
import Button from '@/components/ui/Button'

interface StubProps {
  title: string
  tagline: string
  description: string
  examples: string[]
}

export default function ServiceStub({ title, tagline, description, examples }: StubProps) {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-[calc(72px+4rem)] pb-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Services</p>
            <h1 className="text-display font-semibold text-gray-900 mb-6">{title}</h1>
            <p className="text-body-lg text-gray-500 mb-10 max-w-2xl">{tagline}</p>
            <p className="text-body text-gray-700 mb-12 max-w-2xl leading-relaxed">{description}</p>

            {/* Example list */}
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">What we make</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {examples.map(ex => (
                  <li key={ex} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-lp-green flex-shrink-0" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/get-quote">
                <Button size="lg">Get a Quote</Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="secondary">See Our Work</Button>
              </Link>
            </div>
          </div>
        </section>
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
