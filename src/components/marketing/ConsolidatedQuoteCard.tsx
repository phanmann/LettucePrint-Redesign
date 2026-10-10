'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Choice = { value: string; label: string }
type Field = { label: string; choices: Choice[] }
type Variant = { label: string; fields: Field[]; note?: string }

export default function ConsolidatedQuoteCard({
  product, description, image, variants, commonFields = [], variantLabel = 'Binding',
}: {
  product: string
  description: string
  image: string
  variants: Variant[]
  commonFields?: Field[]
  variantLabel?: string
}) {
  const router = useRouter()
  const [variantIndex, setVariantIndex] = useState(0)
  const [values, setValues] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState('')
  const variant = variants[variantIndex]
  const fields = [...variant.fields, ...commonFields]
  const selected = (field: Field) => values[field.label] && field.choices.some(choice => choice.value === values[field.label])
    ? values[field.label]
    : field.choices[0].value

  function requestQuote() {
    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) return
    const details = [
      product,
      `${variantLabel}: ${variant.label}`,
      ...fields.map(field => `${field.label}: ${field.choices.find(choice => choice.value === selected(field))?.label}`),
      `Quantity: ${quantity}`,
    ].join('\n')
    router.push(`/get-quote?marketingDetails=${encodeURIComponent(details)}`)
  }

  return (
    <article className="overflow-hidden rounded-card border border-gray-200 bg-white shadow-card lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-56 w-full object-cover lg:h-full" />
      </div>
      <div className="p-6 sm:p-8">
        <h2 className="text-h2 font-semibold text-gray-900">{product}</h2>
        <p className="mt-3 text-small text-gray-600">{description}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {variants.length > 1 && <label className="text-sm font-semibold text-gray-900">
            {variantLabel}
            <select value={variantIndex} onChange={event => { setVariantIndex(Number(event.target.value)); setValues({}) }} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-normal">
              {variants.map((item, index) => <option key={item.label} value={index}>{item.label}</option>)}
            </select>
          </label>}
          {fields.map(field => (
            <label key={`${variant.label}-${field.label}`} className="text-sm font-semibold text-gray-900">
              {field.label}
              <select value={selected(field)} onChange={event => setValues(current => ({ ...current, [field.label]: event.target.value }))} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-normal">
                {field.choices.map(choice => <option key={choice.value} value={choice.value}>{choice.label}</option>)}
              </select>
            </label>
          ))}
          <label className="text-sm font-semibold text-gray-900">
            Quantity
            <input type="number" min="1" required value={quantity} onChange={event => setQuantity(event.target.value)} placeholder="How many?" className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-normal" />
          </label>
        </div>
        {variant.note && <p className="mt-4 text-xs text-gray-600">{variant.note}</p>}
        <button type="button" onClick={requestQuote} disabled={!Number.isInteger(Number(quantity)) || Number(quantity) < 1} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-lp-green px-6 text-sm font-bold text-white hover:bg-lp-green-dark disabled:cursor-not-allowed disabled:opacity-50">
          Request a quote with these options
        </button>
        <p className="mt-2 text-xs text-gray-500">We&apos;ll confirm pricing and production timing before you order.</p>
      </div>
    </article>
  )
}
