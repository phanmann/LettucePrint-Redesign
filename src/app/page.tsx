import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import TrustBar from '@/components/sections/TrustBar'
import ServicesOverview from '@/components/sections/ServicesOverview'
import PortfolioTeaser from '@/components/sections/PortfolioTeaser'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'

const capabilitiesMarquee = [
  'Custom Stickers', 'Packaging', 'Large Format', 'Screen Printing',
  'Graphic Design', 'Roll Labels', 'Signage', 'Spot UV', 'Apparel', 'Trade Show',
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee
          items={capabilitiesMarquee}
          speed="fast"
          bgClassName="bg-lp-black"
          textClassName="text-white"
        />
        <TrustBar />
        <ServicesOverview />
        <PortfolioTeaser />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
