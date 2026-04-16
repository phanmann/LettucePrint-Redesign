'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'

// ─── Types ─────────────────────────────────────────────────────────────────

type ServiceType =
  | 'Stickers & Labels'
  | 'Packaging'
  | 'Signage & Displays'
  | 'Screen Printing'
  | 'Large Format'
  | 'Other'

interface FormState {
  service: ServiceType | ''
  projectDetails: Record<string, string>
  timeline: string
  contact: {
    name: string
    company: string
    email: string
    phone: string
  }
}

// ─── Constants ──────────────────────────────────────────────────────────────

const SERVICES: { id: ServiceType; icon: string; desc: string }[] = [
  { id: 'Stickers & Labels', icon: '🏷️', desc: 'Die-cut stickers, roll labels, spot UV' },
  { id: 'Packaging',         icon: '📦', desc: 'Custom boxes, bags, tissue, inserts' },
  { id: 'Signage & Displays',icon: '🪧', desc: 'Banners, foam boards, window graphics' },
  { id: 'Screen Printing',   icon: '👕', desc: 'Apparel, merch drops, event tees' },
  { id: 'Large Format',      icon: '🖼️', desc: 'Murals, wraps, backdrops, trade show' },
  { id: 'Other',             icon: '✨', desc: 'Something else — tell us about it' },
]

const TIMELINE_OPTIONS = [
  { value: 'asap',      label: 'ASAP',         desc: 'Rush — I need it yesterday' },
  { value: '1-2weeks',  label: '1–2 weeks',    desc: 'Pretty soon' },
  { value: '2-4weeks',  label: '2–4 weeks',    desc: 'Standard timeline' },
  { value: '1-2months', label: '1–2 months',   desc: 'Planning ahead' },
  { value: 'flexible',  label: 'Flexible',     desc: 'No hard deadline' },
]

// ─── Project detail fields by service ──────────────────────────────────────

function getProjectFields(service: ServiceType): {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
  required?: boolean
}[] {
  switch (service) {
    case 'Stickers & Labels':
      return [
        { key: 'size',     label: 'Size',     type: 'text',   placeholder: 'e.g. 3" × 3"', required: true },
        { key: 'quantity', label: 'Quantity', type: 'text',   placeholder: 'e.g. 500', required: true },
        { key: 'material', label: 'Material', type: 'select', options: ['Standard Vinyl', 'Holographic', 'Spot UV', 'BOPP Roll Labels', 'Not sure'], required: true },
        { key: 'details',  label: 'Anything else we should know', type: 'textarea', placeholder: 'Shape, finish, special requirements…' },
      ]
    case 'Packaging':
      return [
        { key: 'productType', label: 'Product type',  type: 'text',     placeholder: 'e.g. candle box, mylar bag, mailer', required: true },
        { key: 'dimensions',  label: 'Dimensions',    type: 'text',     placeholder: 'e.g. 4" × 4" × 4"' },
        { key: 'quantity',    label: 'Quantity',      type: 'text',     placeholder: 'e.g. 500', required: true },
        { key: 'details',     label: 'Anything else', type: 'textarea', placeholder: 'Material preferences, inserts, finishing…' },
      ]
    case 'Signage & Displays':
      return [
        { key: 'signageType', label: 'Type of signage', type: 'select',   options: ['Banner', 'Foam board', 'Retractable display', 'Window graphic', 'Step & repeat', 'Other'], required: true },
        { key: 'size',        label: 'Size',            type: 'text',     placeholder: 'e.g. 4ft × 8ft', required: true },
        { key: 'quantity',    label: 'Quantity',        type: 'text',     placeholder: 'e.g. 2', required: true },
        { key: 'details',     label: 'Anything else',   type: 'textarea', placeholder: 'Indoor/outdoor, mounting, double-sided…' },
      ]
    case 'Screen Printing':
      return [
        { key: 'garmentType',       label: 'Garment type',          type: 'select',   options: ['T-shirt', 'Hoodie', 'Long sleeve', 'Tote bag', 'Hat', 'Other'], required: true },
        { key: 'quantity',          label: 'Quantity',              type: 'text',     placeholder: 'e.g. 48', required: true },
        { key: 'colors',            label: 'Number of ink colors',  type: 'select',   options: ['1', '2', '3', '4', '5+'], required: true },
        { key: 'printLocations',    label: 'Print locations',       type: 'select',   options: ['1 (front or back)', '2 (front + back)', '3+', 'Not sure'], required: true },
        { key: 'details',           label: 'Anything else',         type: 'textarea', placeholder: 'Garment brand preference, sizes breakdown, special inks…' },
      ]
    case 'Large Format':
      return [
        { key: 'type',     label: 'Project type', type: 'select',   options: ['Wall mural', 'Vehicle wrap', 'Backdrop/step & repeat', 'Trade show display', 'Floor graphic', 'Other'], required: true },
        { key: 'size',     label: 'Size',         type: 'text',     placeholder: 'e.g. 10ft × 12ft', required: true },
        { key: 'quantity', label: 'Quantity',     type: 'text',     placeholder: 'e.g. 1' },
        { key: 'details',  label: 'Anything else', type: 'textarea', placeholder: 'Location, substrate, installation needs…' },
      ]
    case 'Other':
      return [
        { key: 'details', label: 'Tell us about your project', type: 'textarea', placeholder: 'Describe what you need — the more detail, the better.', required: true },
      ]
    default:
      return []
  }
}

// ─── Step indicator ─────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  const steps = ['Service', 'Details', 'Timeline', 'Your Info']
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < current ? 'bg-lp-green text-white' :
                i === current ? 'bg-lp-green text-white ring-4 ring-lp-green/20' :
                'bg-gray-100 text-gray-400'
              }`}>
                {i < current ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className={`text-[10px] mt-1.5 font-semibold hidden sm:block ${
                i <= current ? 'text-lp-green' : 'text-gray-400'
              }`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-2 transition-all duration-500 ${i < current ? 'bg-lp-green' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main form ──────────────────────────────────────────────────────────────

export default function QuoteForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<FormState>({
    service: '',
    projectDetails: {},
    timeline: '',
    contact: { name: '', company: '', email: '', phone: '' },
  })

  const goNext = () => { setDirection(1); setStep(s => s + 1) }
  const goBack = () => { setDirection(-1); setStep(s => s - 1) }

  const setDetail = (key: string, value: string) =>
    setForm(f => ({ ...f, projectDetails: { ...f.projectDetails, [key]: value } }))

  const setContact = (key: string, value: string) =>
    setForm(f => ({ ...f, contact: { ...f.contact, [key]: value } }))

  // Validation
  const canProceed = () => {
    if (step === 0) return !!form.service
    if (step === 1) {
      if (!form.service) return false
      const fields = getProjectFields(form.service)
      return fields.filter(f => f.required).every(f => !!form.projectDetails[f.key]?.trim())
    }
    if (step === 2) return !!form.timeline
    if (step === 3) return !!(form.contact.name.trim() && form.contact.email.trim())
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: form.service,
          projectDetails: form.projectDetails,
          timeline: form.timeline,
          contact: form.contact,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us at hello@lettuceprint.com')
    } finally {
      setSubmitting(false)
    }
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 bg-lp-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-lp-green" />
        </div>
        <h2 className="text-h2 font-semibold text-gray-900 mb-4">We got it!</h2>
        <p className="text-body-lg text-gray-600 max-w-md mx-auto mb-8">
          Your quote request is in our system. Someone from the team will follow up within 1 business day.
        </p>
        <p className="text-small text-gray-400">
          Questions in the meantime? Email us at{' '}
          <a href="mailto:hello@lettuceprint.com" className="text-lp-green font-semibold">
            hello@lettuceprint.com
          </a>
        </p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator current={step} total={4} />

      <div className="relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >

            {/* Step 0 — Service */}
            {step === 0 && (
              <div>
                <h2 className="text-h2 font-semibold text-gray-900 mb-2">What do you need?</h2>
                <p className="text-body text-gray-500 mb-8">Pick the category that best fits your project.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setForm(f => ({ ...f, service: s.id, projectDetails: {} }))
                      }}
                      className={`flex items-start gap-4 p-5 rounded-card border-2 text-left transition-all duration-150 ${
                        form.service === s.id
                          ? 'border-lp-green bg-lp-green/5'
                          : 'border-gray-200 bg-white hover:border-lp-green/50'
                      }`}
                    >
                      <span className="text-2xl flex-shrink-0">{s.icon}</span>
                      <div>
                        <p className={`text-small font-semibold mb-0.5 ${form.service === s.id ? 'text-lp-green' : 'text-gray-900'}`}>
                          {s.id}
                        </p>
                        <p className="text-xs text-gray-500">{s.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1 — Project Details */}
            {step === 1 && form.service && (
              <div>
                <h2 className="text-h2 font-semibold text-gray-900 mb-2">Tell us about the project</h2>
                <p className="text-body text-gray-500 mb-8">
                  The more detail you give us, the more accurate your quote will be.
                </p>
                <div className="space-y-5">
                  {getProjectFields(form.service).map(field => (
                    <div key={field.key}>
                      <label className="block text-small font-semibold text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-lp-green ml-1">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          rows={4}
                          value={form.projectDetails[field.key] ?? ''}
                          onChange={e => setDetail(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 rounded-input border border-gray-200 text-small focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/10 resize-none bg-white"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          value={form.projectDetails[field.key] ?? ''}
                          onChange={e => setDetail(field.key, e.target.value)}
                          className="w-full px-4 py-3 rounded-input border border-gray-200 text-small focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/10 bg-white"
                        >
                          <option value="">Select…</option>
                          {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={form.projectDetails[field.key] ?? ''}
                          onChange={e => setDetail(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 rounded-input border border-gray-200 text-small focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/10 bg-white"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 — Timeline */}
            {step === 2 && (
              <div>
                <h2 className="text-h2 font-semibold text-gray-900 mb-2">What&apos;s your timeline?</h2>
                <p className="text-body text-gray-500 mb-8">When do you need this done?</p>
                <div className="space-y-3">
                  {TIMELINE_OPTIONS.map(t => (
                    <button
                      key={t.value}
                      onClick={() => setForm(f => ({ ...f, timeline: t.value }))}
                      className={`w-full flex items-center justify-between p-5 rounded-card border-2 text-left transition-all duration-150 ${
                        form.timeline === t.value
                          ? 'border-lp-green bg-lp-green/5'
                          : 'border-gray-200 bg-white hover:border-lp-green/50'
                      }`}
                    >
                      <div>
                        <p className={`text-small font-semibold ${form.timeline === t.value ? 'text-lp-green' : 'text-gray-900'}`}>
                          {t.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                      </div>
                      {form.timeline === t.value && (
                        <CheckCircle size={18} className="text-lp-green flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 — Contact Info */}
            {step === 3 && (
              <div>
                <h2 className="text-h2 font-semibold text-gray-900 mb-2">Last step — who are you?</h2>
                <p className="text-body text-gray-500 mb-8">We&apos;ll reach out with your quote within 1 business day.</p>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-small font-semibold text-gray-700 mb-2">
                        Name <span className="text-lp-green">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.contact.name}
                        onChange={e => setContact('name', e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-input border border-gray-200 text-small focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/10 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-small font-semibold text-gray-700 mb-2">
                        Company <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={form.contact.company}
                        onChange={e => setContact('company', e.target.value)}
                        placeholder="Your company or brand"
                        className="w-full px-4 py-3 rounded-input border border-gray-200 text-small focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/10 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-small font-semibold text-gray-700 mb-2">
                      Email <span className="text-lp-green">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.contact.email}
                      onChange={e => setContact('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 text-small focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/10 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-small font-semibold text-gray-700 mb-2">
                      Phone <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={form.contact.phone}
                      onChange={e => setContact('phone', e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 text-small focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/10 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-input text-small text-red-600">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className={`flex mt-10 gap-4 ${step === 0 ? 'justify-end' : 'justify-between'}`}>
        {step > 0 && (
          <Button variant="secondary" size="lg" onClick={goBack}>
            <ArrowLeft size={16} /> Back
          </Button>
        )}
        {step < 3 ? (
          <Button size="lg" onClick={goNext} disabled={!canProceed()}>
            Continue <ArrowRight size={16} />
          </Button>
        ) : (
          <Button size="lg" onClick={handleSubmit} disabled={!canProceed() || submitting}>
            {submitting
              ? <><Loader2 size={16} className="animate-spin" /> Submitting…</>
              : <>Submit Request <ArrowRight size={16} /></>
            }
          </Button>
        )}
      </div>
    </div>
  )
}
