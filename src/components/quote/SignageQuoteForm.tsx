'use client'

import { useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { signageSections, validateSignageDetails } from '@/lib/signage-quote'

const inputClass = 'w-full rounded-input border border-gray-300 bg-white px-4 py-3 text-small text-gray-900 focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20'

export default function SignageQuoteForm() {
  const [submitting, setSubmitting] = useState(false)
  const pending = useRef(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending.current) return
    const data = new FormData(event.currentTarget)
    const value = (key: string) => String(data.get(key) ?? '').trim()
    const projectDetails = Object.fromEntries(signageSections.flatMap(section => section.fields).map(field => [field.key, value(field.key)]))
    const validationError = validateSignageDetails(projectDetails)
    if (validationError) { setError(validationError); return }
    pending.current = true
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'signage-booth',
          service: 'Signage & Displays',
          projectDetails,
          timeline: `Ready by ${projectDetails.readyByDate}; event ${projectDetails.eventDate}`,
          contact: { name: value('name'), email: value('email'), company: value('company'), phone: value('phone') },
        }),
      })
      if (!response.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Your request could not be confirmed. Your details are still here — please try again, or email info@lettuceprint.com.')
    } finally {
      pending.current = false
      setSubmitting(false)
    }
  }

  if (submitted) return (
    <div role="status" className="rounded-card border border-lp-green/30 bg-lp-green/5 p-8">
      <h2 className="text-h2 font-semibold mb-4">Your signage request is in.</h2>
      <p className="text-body text-gray-600 mb-6">We’ll review your event date, booth specs, and venue requirements, then follow up to put the print, hardware, and timeline together.</p>
      <Link href="/services/signage" className="font-semibold text-lp-green underline">Back to signs & banners</Link>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-10" aria-label="Signage and booth quote" aria-busy={submitting}>
      <p className="text-small text-gray-600">Fields marked * are required. Unsure about the specs? Tell us what you know and we’ll help with the rest.</p>
      {signageSections.map(section => (
        <fieldset key={section.title} disabled={submitting} className="space-y-5">
          <legend className="text-h3 font-semibold text-gray-900 mb-5">{section.title}</legend>
          {section.fields.map(field => (
            <div key={field.key}>
              <label htmlFor={field.key} className="block text-small font-semibold text-gray-700 mb-2">{field.label}{field.required ? ' *' : ''}</label>
              {field.type === 'textarea' ? (
                <textarea id={field.key} name={field.key} required={field.required} maxLength={4000} rows={3} placeholder={field.placeholder} className={inputClass} />
              ) : field.type === 'select' ? (
                <select id={field.key} name={field.key} required={field.required} defaultValue="" className={inputClass}>
                  <option value="" disabled>Select an option</option>
                  {field.options?.map(option => <option key={option}>{option}</option>)}
                </select>
              ) : (
                <input id={field.key} name={field.key} type={field.type ?? 'text'} required={field.required} maxLength={4000} placeholder={field.placeholder} className={inputClass} />
              )}
            </div>
          ))}
        </fieldset>
      ))}
      <fieldset disabled={submitting} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <legend className="text-h3 font-semibold text-gray-900 mb-5">Your contact details</legend>
        {[
          { key: 'name', label: 'Name *', type: 'text', required: true, autoComplete: 'name' },
          { key: 'company', label: 'Company (optional)', type: 'text', autoComplete: 'organization' },
          { key: 'email', label: 'Email *', type: 'email', required: true, autoComplete: 'email' },
          { key: 'phone', label: 'Phone (optional)', type: 'tel', autoComplete: 'tel' },
        ].map(field => <div key={field.key}>
          <label htmlFor={field.key} className="block text-small font-semibold text-gray-700 mb-2">{field.label}</label>
          <input id={field.key} name={field.key} type={field.type} required={field.required} autoComplete={field.autoComplete} maxLength={300} className={inputClass} />
        </div>)}
      </fieldset>
      {error && <p role="alert" className="rounded-input border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}
      <p className="text-small text-gray-500">This is a quote request, not an order. We’ll confirm scope, pricing, and timing with you before production.</p>
      <Button type="submit" size="lg" disabled={submitting}>{submitting ? 'Sending request…' : 'Request a signage quote'}</Button>
    </form>
  )
}
