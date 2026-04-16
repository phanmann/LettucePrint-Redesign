'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MapPin, Clock, Mail, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-32 pb-16 bg-white">
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
                {status === 'sent' ? (
                  <div className="bg-lp-green/10 border border-lp-green/20 rounded-card p-10 text-center">
                    <p className="text-2xl mb-3">✅</p>
                    <h2 className="text-h3 font-semibold text-gray-900 mb-2">Message received!</h2>
                    <p className="text-small text-gray-600">We&apos;ll be in touch within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-input text-small text-gray-900 placeholder-gray-400 focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-input text-small text-gray-900 placeholder-gray-400 focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-3 border border-gray-200 rounded-input text-small text-gray-900 placeholder-gray-400 focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-input text-small text-gray-900 placeholder-gray-400 focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20 transition-all resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-xs">Something went wrong. Please try again or email us directly.</p>
                    )}

                    <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </Button>
                  </form>
                )}
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
