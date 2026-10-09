import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SignageQuoteForm from '@/components/quote/SignageQuoteForm'

export const metadata: Metadata = {
  title: 'Signage & Booth Design Quote',
  description: 'Tell us your event date, booth specs, and venue requirements. Get a coordinated quote for print, hardware, and timing.',
  alternates: { canonical: 'https://lettuceprint.com/services/signage/quote' },
}

export default function SignageQuotePage() {
  return <>
    <Navbar />
    <main className="pt-[72px]">
      <header className="bg-lp-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services/signage" className="text-small text-white/80 underline">Signs & banners</Link>
          <h1 className="text-h1 font-semibold text-white mt-6 mb-4">Let’s plan your booth.</h1>
          <p className="text-body-lg text-white/70">Send us the event date, booth specs, and venue requirements. We’ll quote the print, hardware, and timeline together.</p>
        </div>
      </header>
      <section aria-label="Request a signage quote" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SignageQuoteForm />
      </section>
    </main>
    <Footer />
  </>
}
