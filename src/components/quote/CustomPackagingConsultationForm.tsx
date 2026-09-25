'use client'

import { useRef, useState } from 'react'
import { CheckCircle, Loader2, Upload } from 'lucide-react'
import Button from '@/components/ui/Button'
import {
  ARTWORK_DIELINE_OPTIONS,
  CUSTOM_PACKAGING_TYPES,
  type ArtworkDielineStatus,
  type CustomPackagingConsultationErrors,
  type CustomPackagingType,
  validateCustomPackagingConsultation,
} from '@/lib/custom-packaging-consultation'

const inputClass = 'w-full rounded-input border border-gray-300 bg-white px-3 py-3 text-small text-gray-900 outline-none transition focus:border-lp-green focus:ring-2 focus:ring-lp-green/15 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-100'
const choiceClass = 'h-4 w-4 border-gray-300 text-lp-green accent-lp-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-green focus-visible:ring-offset-2'
const ACCEPTED_FILES = '.pdf,.jpg,.jpeg,.png,.webp'

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} className="mt-1.5 text-xs text-red-600">{message}</p> : null
}

export default function CustomPackagingConsultationForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [packagingTypes, setPackagingTypes] = useState<CustomPackagingType[]>([])
  const [artworkDielineStatus, setArtworkDielineStatus] = useState<ArtworkDielineStatus | ''>('')
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<CustomPackagingConsultationErrors>({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const togglePackagingType = (option: CustomPackagingType) => {
    setPackagingTypes(items => items.includes(option) ? items.filter(item => item !== option) : [...items, option])
  }

  const focusFirstError = () => {
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"] input')?.focus()
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerError('')
    const formData = new FormData(event.currentTarget)
    const candidate = {
      quoteType: 'custom-packaging',
      service: 'Packaging',
      source: '/services/packaging/custom-packaging',
      contact: {
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
        phone: formData.get('phone'),
      },
      projectDetails: {
        packagingContents: formData.get('packagingContents'),
        packagingTypes,
        estimatedQuantity: formData.get('estimatedQuantity'),
        approximateSize: formData.get('approximateSize'),
        artworkDielineStatus,
        targetTimeline: formData.get('targetTimeline'),
        projectDescription: formData.get('projectDescription'),
      },
    }
    const result = validateCustomPackagingConsultation(candidate)
    const nextErrors: CustomPackagingConsultationErrors = result.success ? {} : result.errors
    if (files.length > 3) nextErrors.files = 'Upload up to 3 files.'
    else if (files.some(file => file.size > 10 * 1024 * 1024)) nextErrors.files = 'Each file must be no more than 10 MB.'
    else if (files.reduce((total, file) => total + file.size, 0) > 20 * 1024 * 1024) nextErrors.files = 'Combined uploads must be no more than 20 MB.'
    if (!result.success || nextErrors.files) {
      setErrors(nextErrors)
      focusFirstError()
      return
    }

    const requestData = new FormData()
    requestData.set('payload', JSON.stringify(result.data))
    files.forEach(file => requestData.append('files', file, file.name))
    setErrors({})
    setSubmitting(true)
    try {
      const response = await fetch('/api/quote', { method: 'POST', body: requestData })
      const body = await response.json().catch(() => ({}))
      if (!response.ok) {
        if (body?.fields && typeof body.fields === 'object') {
          setErrors(body.fields)
          focusFirstError()
        }
        throw new Error('Submission failed')
      }
      setSubmitted(true)
    } catch {
      setServerError('Something went wrong. Your request was not submitted. Please try again or email hello@lettuceprint.com.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-lp-green/30 bg-white p-6 shadow-card sm:p-8" role="status" aria-live="polite" tabIndex={-1} ref={element => element?.focus()}>
        <CheckCircle className="mb-4 text-lp-green" size={40} aria-hidden="true" />
        <h2 className="text-h3 font-semibold text-gray-900">We got your packaging consultation request.</h2>
        <p className="mt-3 text-body text-gray-600">Our team will review your project and follow up within 1 business day.</p>
      </div>
    )
  }

  return (
    <form ref={formRef} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-card sm:p-7" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="consultation-name" className="mb-2 block text-small font-semibold text-gray-800">Name <span aria-hidden="true" className="text-lp-green">*</span></label>
          <input id="consultation-name" name="name" autoComplete="name" className={inputClass} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'consultation-name-error' : undefined} />
          <FieldError id="consultation-name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="consultation-company" className="mb-2 block text-small font-semibold text-gray-800">Company</label>
          <input id="consultation-company" name="company" autoComplete="organization" className={inputClass} />
        </div>
        <div>
          <label htmlFor="consultation-email" className="mb-2 block text-small font-semibold text-gray-800">Email <span aria-hidden="true" className="text-lp-green">*</span></label>
          <input id="consultation-email" name="email" type="email" autoComplete="email" className={inputClass} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'consultation-email-error' : undefined} />
          <FieldError id="consultation-email-error" message={errors.email} />
        </div>
        <div>
          <label htmlFor="consultation-phone" className="mb-2 block text-small font-semibold text-gray-800">Phone</label>
          <input id="consultation-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'consultation-phone-error' : undefined} />
          <FieldError id="consultation-phone-error" message={errors.phone} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="packaging-contents" className="mb-2 block text-small font-semibold text-gray-800">What are you packaging?</label>
        <input id="packaging-contents" name="packagingContents" className={inputClass} placeholder="e.g. candles, skincare, apparel" />
      </div>

      <fieldset className="mt-7" aria-describedby={errors.packagingTypes ? 'packaging-types-error' : undefined} data-invalid={errors.packagingTypes ? 'true' : undefined}>
        <legend className="text-small font-semibold text-gray-800">Packaging type <span aria-hidden="true" className="text-lp-green">*</span> <span className="font-normal text-gray-500">(select all that apply)</span></legend>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CUSTOM_PACKAGING_TYPES.map((option, index) => (
            <label key={option} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-input border border-gray-200 bg-white px-3 py-2 text-small text-gray-700">
              <input type="checkbox" name="packagingTypes" value={option} checked={packagingTypes.includes(option)} onChange={() => togglePackagingType(option)} className={choiceClass} aria-invalid={index === 0 && Boolean(errors.packagingTypes)} />
              {option}
            </label>
          ))}
        </div>
        <FieldError id="packaging-types-error" message={errors.packagingTypes} />
      </fieldset>

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="estimated-quantity" className="mb-2 block text-small font-semibold text-gray-800">Estimated quantity <span aria-hidden="true" className="text-lp-green">*</span></label>
          <input id="estimated-quantity" name="estimatedQuantity" inputMode="numeric" className={inputClass} placeholder="e.g. 1,000 units" aria-invalid={Boolean(errors.estimatedQuantity)} aria-describedby={errors.estimatedQuantity ? 'estimated-quantity-error' : undefined} />
          <FieldError id="estimated-quantity-error" message={errors.estimatedQuantity} />
        </div>
        <div>
          <label htmlFor="approximate-size" className="mb-2 block text-small font-semibold text-gray-800">Approximate product or package size</label>
          <input id="approximate-size" name="approximateSize" className={inputClass} placeholder={'e.g. 4" × 6" × 2"'} />
        </div>
      </div>

      <fieldset className="mt-7" aria-describedby={errors.artworkDielineStatus ? 'artwork-dieline-error' : undefined} data-invalid={errors.artworkDielineStatus ? 'true' : undefined}>
        <legend className="text-small font-semibold text-gray-800">Do you have artwork or a dieline? <span aria-hidden="true" className="text-lp-green">*</span></legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {ARTWORK_DIELINE_OPTIONS.map(option => (
            <label key={option} className="flex min-w-28 cursor-pointer items-center gap-3 rounded-input border border-gray-200 bg-white px-4 py-2.5 text-small text-gray-700">
              <input type="radio" name="artworkDielineStatus" value={option} checked={artworkDielineStatus === option} onChange={() => setArtworkDielineStatus(option)} className={choiceClass} />
              {option}
            </label>
          ))}
        </div>
        <FieldError id="artwork-dieline-error" message={errors.artworkDielineStatus} />
      </fieldset>

      <div className="mt-5">
        <label htmlFor="target-timeline" className="mb-2 block text-small font-semibold text-gray-800">Target timeline</label>
        <input id="target-timeline" name="targetTimeline" className={inputClass} placeholder="e.g. Launching in 6–8 weeks" />
      </div>

      <div className="mt-5">
        <label htmlFor="reference-files" className="mb-2 block text-small font-semibold text-gray-800">Upload files / reference images</label>
        <label htmlFor="reference-files" className="flex cursor-pointer items-center gap-3 rounded-input border border-dashed border-gray-300 bg-white px-4 py-4 text-small text-gray-600 transition hover:border-lp-green focus-within:ring-2 focus-within:ring-lp-green">
          <Upload size={18} className="text-lp-green" aria-hidden="true" />
          <span>{files.length ? `${files.length} file${files.length === 1 ? '' : 's'} selected` : 'Choose up to 3 files'}</span>
          <input id="reference-files" name="referenceFiles" type="file" multiple accept={ACCEPTED_FILES} className="sr-only" onChange={event => setFiles(Array.from(event.target.files ?? []))} aria-invalid={Boolean(errors.files)} aria-describedby="reference-files-help reference-files-error" />
        </label>
        <p id="reference-files-help" className="mt-1.5 text-xs text-gray-500">PDF, JPG, PNG, or WebP. 10 MB each; 20 MB combined.</p>
        <FieldError id="reference-files-error" message={errors.files} />
      </div>

      <div className="mt-5">
        <label htmlFor="project-description" className="mb-2 block text-small font-semibold text-gray-800">Short project description <span aria-hidden="true" className="text-lp-green">*</span></label>
        <textarea id="project-description" name="projectDescription" rows={4} className={inputClass} placeholder="Tell us what you want to create, how it should feel, and any important requirements." aria-invalid={Boolean(errors.projectDescription)} aria-describedby={errors.projectDescription ? 'project-description-error' : undefined} />
        <FieldError id="project-description-error" message={errors.projectDescription} />
      </div>

      {serverError && <div className="mt-5 rounded-input border border-red-200 bg-red-50 p-4 text-small text-red-700" role="alert">{serverError}</div>}

      <Button type="submit" size="lg" className="mt-7 w-full" disabled={submitting}>
        {submitting ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending request…</> : 'Request a Packaging Consultation'}
      </Button>
    </form>
  )
}
