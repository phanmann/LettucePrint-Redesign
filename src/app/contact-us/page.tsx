import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MapPin, Clock, Mail, Phone } from 'lucide-react'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Lettuce Print — Brooklyn\'s creative print studio. Located at 361 Stagg St, Brooklyn. Call (347) 603-0557 or send us a message.',
  alternates: { canonical: 'https://lettuceprint.com/contact-us' },
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-[calc(72px+4rem)] pb-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lp-green mb-4">Get In Touch</p>
            <h1 className="text-display font-semibold text-gray-900 mb-4 max-w-xl">
              Let&apos;s talk about your project.
            </h1>
            <p className="text-body-lg text-gray-600 max-w-lg">
              Have a question, need a custom quote, or just want to say hi? Fill out the form and
              we&apos;ll get back to you within one business day.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Form */}
              <div>
                <ContactForm />
              </div>

              {/* Info */}
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-card p-8 space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-lp-green/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-lp-green" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Studio</p>
                      <p className="text-small font-semibold text-gray-900">361 Stagg Street</p>
                      <p className="text-small text-gray-600">Brooklyn, NY</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-lp-green/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-lp-green" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Hours</p>
                      <p className="text-small font-semibold text-gray-900">Monday – Friday</p>
                      <p className="text-small text-gray-600">9:00 AM – 5:00 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-lp-green/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-lp-green" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email</p>
                      <a href="mailto:hello@lettuceprint.com" className="text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors">
                        hello@lettuceprint.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-lp-green/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-lp-green" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Phone</p>
                      <a href="tel:+13476030557" className="text-small font-semibold text-lp-green hover:text-lp-green-dark transition-colors">
                        (347) 603-0557
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-lp-green/5 border border-lp-green/20 rounded-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-lp-green mb-2">Need a quote fast?</p>
                  <p className="text-small text-gray-600 mb-4">
                    Use our quote form for pricing on stickers, labels, and custom print jobs. We&apos;ll follow up same day.
                  </p>
                  <a href="/get-quote" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lp-green hover:text-lp-green-dark transition-colors">
                    Go to quote form →
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
