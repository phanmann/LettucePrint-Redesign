import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import ShopAllSection from '@/components/sections/ShopAllSection'
import ServicesOverview from '@/components/sections/ServicesOverview'
import PortfolioStrip from '@/components/sections/PortfolioStrip'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ShopAllSection />
        <PortfolioStrip />
        <ServicesOverview />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
