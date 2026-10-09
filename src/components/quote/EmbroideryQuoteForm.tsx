'use client'

import { useRef, useState } from 'react'
import Button from '@/components/ui/Button'
import { GARMENT_SOURCES, GARMENT_TYPES, MAX_EMBROIDERY_LOCATIONS, validateEmbroideryQuote, type EmbroideryQuotePayload } from '@/lib/embroidery-quote'

const inputClass = 'w-full rounded-input border border-gray-300 bg-white px-4 py-3 text-small text-gray-900 focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20'
type Location = EmbroideryQuotePayload['locations'][number]

export default function EmbroideryQuoteForm() {
  const [step, setStep] = useState(0)
  const [garmentType, setGarmentType] = useState('')
  const [quantity, setQuantity] = useState('')
  const [garmentSource, setGarmentSource] = useState('')
  const [locations, setLocations] = useState<Location[]>([{ placement: '', approximateSize: '' }])
  const [artwork, setArtwork] = useState<Record<number, File | undefined>>({})
  const [notes, setNotes] = useState('')
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '' })
  const [inHandsDate, setInHandsDate] = useState('')
  const [shippingZip, setShippingZip] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const pending = useRef(false)

  function resizeLocations(count: number) {
    setLocations(current => Array.from({ length: count }, (_, index) => current[index] ?? { placement: '', approximateSize: '' }))
    setArtwork(current => Object.fromEntries(Object.entries(current).filter(([number]) => Number(number) <= count)))
  }
  function updateLocation(index: number, key: keyof Location, value: string) {
    setLocations(current => current.map((location, i) => i === index ? { ...location, [key]: value } : location))
  }
  const canContinue = step === 0
    ? Boolean(garmentType && /^[1-9]\d{0,5}$/.test(quantity) && garmentSource)
    : locations.every(location => location.placement.trim() && location.approximateSize.trim())

  async function submit() {
    if (pending.current) return
    const chosen = Object.entries(artwork).filter((entry): entry is [string, File] => Boolean(entry[1])).sort(([a], [b]) => Number(a) - Number(b))
    const payload = {
      formType: 'embroidery', service: 'Embroidery', source: '/services/apparel/embroidery',
      garmentType, quantity, garmentSource, locations, notes, inHandsDate, shippingZip, contact,
      artworkLocations: chosen.map(([number]) => Number(number)),
    }
    const validation = validateEmbroideryQuote(payload)
    if (!validation.success) { setError(validation.error); return }
    if (chosen.length > MAX_EMBROIDERY_LOCATIONS || chosen.some(([, file]) => !file.size || file.size > 10 * 1024 * 1024)
      || chosen.reduce((total, [, file]) => total + file.size, 0) > 20 * 1024 * 1024) {
      setError('Artwork must be no more than 10 MB per file and 20 MB combined.')
      return
    }
    pending.current = true
    setSubmitting(true)
    setError('')
    try {
      const body = new FormData()
      body.append('payload', JSON.stringify(validation.data))
      chosen.forEach(([, file]) => body.append('files', file, file.name))
      const response = await fetch('/api/quote', { method: 'POST', body })
      if (!response.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Your request could not be confirmed. Your details are still here — please try again or email info@lettuceprint.com.')
    } finally {
      pending.current = false
      setSubmitting(false)
    }
  }

  if (submitted) return <div role="status" className="rounded-card border border-lp-green/30 bg-lp-green/5 p-8">
    <h3 className="text-h3 font-semibold text-gray-900 mb-3">Your embroidery request is in.</h3>
    <p className="text-body text-gray-600">We’ll review your locations and artwork, then follow up with pricing and timing. This was a quote request, not an order.</p>
  </div>

  return <div aria-label="Embroidery quote form" aria-busy={submitting} className="space-y-8">
    <p className="text-small text-gray-600">Step {step + 1} of 3 · Required fields are marked *. No instant pricing or payment.</p>
    {step === 0 && <section aria-label="Garments" className="space-y-5">
      <h3 className="text-h3 font-semibold">1. Garments</h3>
      <div><label htmlFor="emb-garment" className="block text-small font-semibold mb-2">Garment type *</label>
        <select id="emb-garment" className={inputClass} value={garmentType} onChange={event => setGarmentType(event.target.value)}><option value="">Select…</option>{GARMENT_TYPES.map(type => <option key={type}>{type}</option>)}</select></div>
      <div><label htmlFor="emb-quantity" className="block text-small font-semibold mb-2">Quantity *</label><input id="emb-quantity" className={inputClass} type="number" min="1" max="999999" value={quantity} onChange={event => setQuantity(event.target.value)} /></div>
      <div><label htmlFor="emb-source" className="block text-small font-semibold mb-2">Who supplies the garments? *</label><select id="emb-source" className={inputClass} value={garmentSource} onChange={event => setGarmentSource(event.target.value)}><option value="">Select…</option>{GARMENT_SOURCES.map(source => <option key={source}>{source}</option>)}</select></div>
    </section>}
    {step === 1 && <section aria-label="Embroidery locations" className="space-y-6">
      <h3 className="text-h3 font-semibold">2. Embroidery locations</h3>
      <div><label htmlFor="emb-count" className="block text-small font-semibold mb-2">Number of locations *</label><select id="emb-count" className={inputClass} value={locations.length} onChange={event => resizeLocations(Number(event.target.value))}>{Array.from({ length: MAX_EMBROIDERY_LOCATIONS }, (_, i) => <option key={i + 1}>{i + 1}</option>)}</select></div>
      {locations.map((location, index) => <fieldset key={index} className="rounded-card border border-gray-200 bg-gray-50 p-4 sm:p-5 space-y-4">
        <legend className="px-1 text-small font-semibold">Location {index + 1}</legend>
        <div><label htmlFor={`emb-placement-${index}`} className="block text-small font-semibold mb-2">Placement *</label><input id={`emb-placement-${index}`} className={inputClass} value={location.placement} onChange={event => updateLocation(index, 'placement', event.target.value)} maxLength={100} list="emb-placement-options" placeholder="e.g. Left chest" /><button type="button" className="mt-2 text-xs font-semibold text-lp-green underline" onClick={() => updateLocation(index, 'placement', 'Not sure — help me choose')}>Not sure — help me choose</button></div>
        <div><label htmlFor={`emb-size-${index}`} className="block text-small font-semibold mb-2">Approximate design size *</label><input id={`emb-size-${index}`} className={inputClass} value={location.approximateSize} onChange={event => updateLocation(index, 'approximateSize', event.target.value)} maxLength={100} list="emb-size-options" placeholder="e.g. 3 × 2 in" /><button type="button" className="mt-2 text-xs font-semibold text-lp-green underline" onClick={() => updateLocation(index, 'approximateSize', 'Not sure — help me size it')}>Not sure — help me size it</button></div>
        <div><label htmlFor={`emb-file-${index}`} className="block text-small font-semibold mb-2">Logo / artwork (optional)</label><input id={`emb-file-${index}`} className="block w-full text-small" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" onChange={event => setArtwork(current => ({ ...current, [index + 1]: event.target.files?.[0] }))} /><p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG, or WebP; 10 MB per file, 20 MB total.</p></div>
      </fieldset>)}
      <datalist id="emb-placement-options"><option value="Left chest" /><option value="Full back" /><option value="Hat front" /><option value="Not sure — help me choose" /></datalist>
      <datalist id="emb-size-options"><option value="Not sure — help me size it" /></datalist>
      <div><label htmlFor="emb-notes" className="block text-small font-semibold mb-2">Additional notes (optional)</label><textarea id="emb-notes" className={inputClass} rows={3} maxLength={4000} value={notes} onChange={event => setNotes(event.target.value)} placeholder="Thread preferences, garment details, or anything we should know" /></div>
    </section>}
    {step === 2 && <section aria-label="Contact and review" className="space-y-5">
      <h3 className="text-h3 font-semibold">3. Contact and review</h3>
      <div className="grid sm:grid-cols-2 gap-5">{([
        ['name', 'Name *', 'text', 'name'], ['company', 'Company (optional)', 'text', 'organization'],
        ['email', 'Email *', 'email', 'email'], ['phone', 'Phone *', 'tel', 'tel'],
      ] as const).map(([key, label, type, autoComplete]) => <div key={key}><label htmlFor={`emb-${key}`} className="block text-small font-semibold mb-2">{label}</label><input id={`emb-${key}`} className={inputClass} type={type} autoComplete={autoComplete} maxLength={300} value={contact[key]} onChange={event => setContact(current => ({ ...current, [key]: event.target.value }))} /></div>)}</div>
      <div className="grid sm:grid-cols-2 gap-5"><div><label htmlFor="emb-date" className="block text-small font-semibold mb-2">In-Hands Date *</label><input id="emb-date" className={inputClass} type="date" value={inHandsDate} onChange={event => setInHandsDate(event.target.value)} /></div><div><label htmlFor="emb-zip" className="block text-small font-semibold mb-2">Shipping ZIP code *</label><input id="emb-zip" className={inputClass} inputMode="numeric" autoComplete="postal-code" maxLength={10} value={shippingZip} onChange={event => setShippingZip(event.target.value)} placeholder="11206" /></div></div>
      <div className="rounded-card border border-gray-200 bg-gray-50 p-5 text-small text-gray-700 space-y-2"><h4 className="font-semibold text-gray-900">Review your request</h4><p>{quantity} {garmentType.toLowerCase()} garment(s) · {garmentSource}</p>{locations.map((location, index) => <p key={index}>Location {index + 1}: {location.placement} · {location.approximateSize}{artwork[index + 1] ? ` · Artwork: ${artwork[index + 1]?.name}` : ''}</p>)}<p>In-hands: {inHandsDate || 'Not set'} · Shipping ZIP: {shippingZip || 'Not set'}</p></div>
      <p className="text-small text-gray-500">We’ll confirm scope, price, and production timing before any order.</p>
    </section>}
    {error && <p role="alert" className="rounded-input border border-red-200 bg-red-50 p-4 text-small text-red-700">{error}</p>}
    <div className="flex justify-between gap-4">{step > 0 ? <Button variant="secondary" size="lg" disabled={submitting} onClick={() => { setError(''); setStep(step - 1) }}>Back</Button> : <span />}{step < 2 ? <Button size="lg" disabled={!canContinue} onClick={() => { setError(''); setStep(step + 1) }}>Continue</Button> : <Button size="lg" disabled={submitting} onClick={submit}>{submitting ? 'Sending request…' : 'Request embroidery quote'}</Button>}</div>
  </div>
}
