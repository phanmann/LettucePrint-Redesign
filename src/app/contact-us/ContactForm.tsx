'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function ContactForm() {
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

  if (status === 'sent') {
    return (
      <div className="bg-lp-green/10 border border-lp-green/20 rounded-card p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-lp-green/20 flex items-center justify-center mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00A175" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h2 className="text-h3 font-semibold text-gray-900 mb-2">Message received!</h2>
        <p className="text-small text-gray-600">We&apos;ll be in touch within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Name *</label>
          <input
            type="text" name="name" required value={form.name} onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-3 border border-gray-200 rounded-input text-small text-gray-900 placeholder-gray-400 focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Email *</label>
          <input
            type="email" name="email" required value={form.email} onChange={handleChange}
            placeholder="you@company.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-input text-small text-gray-900 placeholder-gray-400 focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20 transition-all"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Phone</label>
        <input
          type="tel" name="phone" value={form.phone} onChange={handleChange}
          placeholder="(555) 000-0000"
          className="w-full px-4 py-3 border border-gray-200 rounded-input text-small text-gray-900 placeholder-gray-400 focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20 transition-all"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Message *</label>
        <textarea
          name="message" required rows={6} value={form.message} onChange={handleChange}
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
  )
}
