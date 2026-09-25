'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, Minus, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import {
  ARTWORK_OPTIONS,
  BEST_CONTACT_OPTIONS,
  ENCLOSURES,
  PRINT_FINISHES,
  SPOT_FINISHES,
  type ArtworkPrintReady,
  type BestContact,
  type CustomPackagingFieldErrors,
  type Enclosure,
  type PrintFinish,
  type SpotFinish,
  validateCustomPackagingQuote,
} from '@/lib/custom-packaging-quote'

interface EditableBagSize {
  id: number
  width: string
  length: string
}

const inputClass = 'w-full rounded-input border border-gray-300 bg-white px-3 py-3 text-small text-gray-900 outline-none transition focus:border-lp-green focus:ring-2 focus:ring-lp-green/15 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-100'
const checkboxClass = 'h-4 w-4 rounded border-gray-300 text-lp-green accent-lp-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-green focus-visible:ring-offset-2'

export default function CustomPackagingHeroForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [bagSizes, setBagSizes] = useState<EditableBagSize[]>([{ id: 1, width: '', length: '' }])
  const [nextSizeId, setNextSizeId] = useState(2)
  const [printFinish, setPrintFinish] = useState<PrintFinish | ''>('')
  const [spotFinish, setSpotFinish] = useState<SpotFinish | ''>('')
  const [enclosures, setEnclosures] = useState<Enclosure[]>([])
  const [artworkPrintReady, setArtworkPrintReady] = useState<ArtworkPrintReady | ''>('')
  const [bestContact, setBestContact] = useState<BestContact[]>([])
  const [errors, setErrors] = useState<CustomPackagingFieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleValue = <T extends string>(items: T[], item: T, setter: (value: T[]) => void) => {
    setter(items.includes(item) ? items.filter(value => value !== item) : [...items, item])
  }

  const addBagSize = () => {
    setBagSizes(items => [...items, { id: nextSizeId, width: '', length: '' }])
    setNextSizeId(value => value + 1)
  }

  const removeBagSize = (id: number) => {
    setBagSizes(items => items.filter(item => item.id !== id))
  }

  const updateBagSize = (id: number, field: 'width' | 'length', value: string) => {
    setBagSizes(items => items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerError('')

    const candidate = {
      quoteType: 'custom-packaging',
      service: 'Packaging',
      source: '/services/packaging/custom-packaging',
      contact: { name, email, phone },
      projectDetails: {
        bagSizes: bagSizes.map(size => ({
          width: Number(size.width),
          length: Number(size.length),
          unit: 'in',
        })),
        printFinish,
        spotFinish,
        enclosures,
        artworkPrintReady,
        bestContact,
      },
    }
    const result = validateCustomPackagingQuote(candidate)
    if (!result.success) {
      setErrors(result.errors)
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"] input')?.focus()
      })
      return
    }

    setErrors({})
    setSubmitting(true)
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      if (!response.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setServerError('Something went wrong. Please try again or email us at hello@lettuceprint.com.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-lp-green/30 bg-white p-6 shadow-card sm:p-8" role="status" aria-live="polite">
        <CheckCircle className="mb-4 text-lp-green" size={40} aria-hidden="true" />
        <h2 className="text-h3 font-semibold text-gray-900">We got your packaging request.</h2>
        <p className="mt-3 text-body text-gray-600">Our team will review the specs and follow up within 1 business day.</p>
      </div>
    )
  }

  return (
    <form className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-card sm:p-7" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="custom-name" className="mb-2 block text-small font-semibold text-gray-800">Name <span aria-hidden="true" className="text-lp-green">*</span></label>
          <input id="custom-name" name="name" autoComplete="name" value={name} onChange={event => setName(event.target.value)} className={inputClass} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'custom-name-error' : undefined} />
          {errors.name && <p id="custom-name-error" className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="custom-email" className="mb-2 block text-small font-semibold text-gray-800">Email</label>
          <input id="custom-email" name="email" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} className={inputClass} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'custom-email-error' : undefined} />
          {errors.email && <p id="custom-email-error" className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="custom-phone" className="mb-2 block text-small font-semibold text-gray-800">Phone Number</label>
          <input id="custom-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={event => setPhone(event.target.value)} className={inputClass} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'custom-phone-error' : undefined} />
          {errors.phone && <p id="custom-phone-error" className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <fieldset className="mt-7" aria-describedby={errors.bagSizes ? 'bag-sizes-error' : undefined}>
        <legend className="text-small font-semibold text-gray-800">Bag Size (inches) <span aria-hidden="true" className="text-lp-green">*</span></legend>
        <div className="mt-3 space-y-3">
          {bagSizes.map((size, index) => (
            <div key={size.id} className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] items-end gap-2" data-testid="bag-size-row">
              <div>
                <label htmlFor={`bag-width-${size.id}`} className="mb-1 block text-xs text-gray-600">Width</label>
                <div className="relative">
                  <input id={`bag-width-${size.id}`} name={`bagSizes[${index}].width`} type="number" min="0" step="any" inputMode="decimal" value={size.width} onChange={event => updateBagSize(size.id, 'width', event.target.value)} className={`${inputClass} pr-9`} aria-invalid={Boolean(errors.bagSizes)} />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-gray-500">in</span>
                </div>
              </div>
              <span className="pb-3 text-gray-400" aria-hidden="true">×</span>
              <div>
                <label htmlFor={`bag-length-${size.id}`} className="mb-1 block text-xs text-gray-600">Length</label>
                <div className="relative">
                  <input id={`bag-length-${size.id}`} name={`bagSizes[${index}].length`} type="number" min="0" step="any" inputMode="decimal" value={size.length} onChange={event => updateBagSize(size.id, 'length', event.target.value)} className={`${inputClass} pr-9`} aria-invalid={Boolean(errors.bagSizes)} />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-gray-500">in</span>
                </div>
              </div>
              <button type="button" onClick={() => removeBagSize(size.id)} disabled={bagSizes.length === 1} className="mb-1 flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-green disabled:cursor-not-allowed disabled:opacity-30" aria-label={`Remove bag size ${index + 1}`}>
                <Minus size={17} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
        {errors.bagSizes && <p id="bag-sizes-error" className="mt-1.5 text-xs text-red-600">{errors.bagSizes}</p>}
        <button type="button" onClick={addBagSize} className="mt-3 inline-flex items-center gap-1.5 text-small font-semibold text-lp-green hover:text-lp-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-green focus-visible:ring-offset-2">
          <Plus size={16} aria-hidden="true" /> Add another size
        </button>
      </fieldset>

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="print-finish" className="mb-2 block text-small font-semibold text-gray-800">Print Finish <span aria-hidden="true" className="text-lp-green">*</span></label>
          <select id="print-finish" name="printFinish" value={printFinish} onChange={event => setPrintFinish(event.target.value as PrintFinish | '')} className={inputClass} aria-invalid={Boolean(errors.printFinish)} aria-describedby={errors.printFinish ? 'print-finish-error' : undefined}>
            <option value="" disabled>Select print finish</option>
            {PRINT_FINISHES.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
          {errors.printFinish && <p id="print-finish-error" className="mt-1.5 text-xs text-red-600">{errors.printFinish}</p>}
        </div>
        <div>
          <label htmlFor="spot-finish" className="mb-2 block text-small font-semibold text-gray-800">Spot Finish <span aria-hidden="true" className="text-lp-green">*</span></label>
          <select id="spot-finish" name="spotFinish" value={spotFinish} onChange={event => setSpotFinish(event.target.value as SpotFinish | '')} className={inputClass} aria-invalid={Boolean(errors.spotFinish)} aria-describedby={errors.spotFinish ? 'spot-finish-error' : undefined}>
            <option value="" disabled>Select spot finish</option>
            {SPOT_FINISHES.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
          {errors.spotFinish && <p id="spot-finish-error" className="mt-1.5 text-xs text-red-600">{errors.spotFinish}</p>}
        </div>
      </div>

      <fieldset className="mt-7">
        <legend className="text-small font-semibold text-gray-800">Enclosure <span className="font-normal text-gray-500">(select all that apply)</span></legend>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ENCLOSURES.map(option => (
            <label key={option} className="flex min-h-10 cursor-pointer items-center gap-3 rounded-input border border-gray-200 bg-white px-3 py-2 text-small text-gray-700">
              <input type="checkbox" name="enclosures" value={option} checked={enclosures.includes(option)} onChange={() => toggleValue(enclosures, option, setEnclosures)} className={checkboxClass} />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-7" aria-describedby={errors.artworkPrintReady ? 'artwork-error' : undefined} data-invalid={errors.artworkPrintReady ? 'true' : undefined}>
        <legend className="text-small font-semibold text-gray-800">Is your artwork print ready? <span aria-hidden="true" className="text-lp-green">*</span></legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {ARTWORK_OPTIONS.map(option => (
            <label key={option} className="flex min-w-24 cursor-pointer items-center gap-3 rounded-input border border-gray-200 bg-white px-4 py-2.5 text-small text-gray-700">
              <input type="radio" name="artworkPrintReady" value={option} checked={artworkPrintReady === option} onChange={() => setArtworkPrintReady(option)} className={checkboxClass} />
              {option}
            </label>
          ))}
        </div>
        {errors.artworkPrintReady && <p id="artwork-error" className="mt-1.5 text-xs text-red-600">{errors.artworkPrintReady}</p>}
      </fieldset>

      <fieldset className="mt-7" aria-describedby={errors.bestContact ? 'best-contact-error' : undefined}>
        <legend className="text-small font-semibold text-gray-800">Best form of contact <span aria-hidden="true" className="text-lp-green">*</span> <span className="font-normal text-gray-500">(select all that apply)</span></legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {BEST_CONTACT_OPTIONS.map(option => (
            <label key={option} className="flex min-w-28 cursor-pointer items-center gap-3 rounded-input border border-gray-200 bg-white px-4 py-2.5 text-small text-gray-700">
              <input type="checkbox" name="bestContact" value={option} checked={bestContact.includes(option)} onChange={() => toggleValue(bestContact, option, setBestContact)} className={checkboxClass} aria-invalid={Boolean(errors.bestContact)} />
              {option}
            </label>
          ))}
        </div>
        {errors.bestContact && <p id="best-contact-error" className="mt-1.5 text-xs text-red-600">{errors.bestContact}</p>}
      </fieldset>

      {serverError && <div className="mt-5 rounded-input border border-red-200 bg-red-50 p-4 text-small text-red-700" role="alert">{serverError}</div>}

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={submitting}>
        {submitting ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending quote…</> : 'Get a Quote'}
      </Button>
    </form>
  )
}
