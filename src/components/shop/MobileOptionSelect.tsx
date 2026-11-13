'use client'

import { useId } from 'react'

interface Option<T extends string | number> {
  value: T
  label: string
  description?: string
  badge?: string
}

/** Compact mobile alternative to option cards; shares the caller's state. */
export default function MobileOptionSelect<T extends string | number>({
  label, value, options, onChange, placeholder = 'Select an option', invalid = false, describedBy,
}: {
  label: string
  value: T | ''
  options: readonly Option<T>[]
  onChange: (value: T) => void
  placeholder?: string
  invalid?: boolean
  describedBy?: string
}) {
  const id = useId()
  const selected = options.find(option => option.value === value)
  const badgeText = (option: Option<T>) => option.badge && !option.label.toLowerCase().includes(option.badge.toLowerCase()) ? option.badge : ''
  const optionLabel = (option: Option<T>) => [option.label, badgeText(option)].filter(Boolean).join(' — ')
  const helpText = selected ? [badgeText(selected), selected.description].filter(Boolean).join(' · ') : ''
  const descriptionIds = [helpText ? `${id}-help` : '', describedBy].filter(Boolean).join(' ') || undefined

  return (
    <div className="min-w-0 md:hidden" data-mobile-option>
      {options.length === 1 ? (
        <p className="text-sm font-medium text-gray-900">{optionLabel(options[0])}</p>
      ) : (
        <select
          id={id}
          aria-label={label}
          aria-invalid={invalid || undefined}
          aria-describedby={descriptionIds}
          value={value}
          onChange={event => {
            const option = options.find(option => String(option.value) === event.target.value)
            if (option) onChange(option.value)
          }}
          className="block min-h-11 w-full min-w-0 max-w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-lp-green focus:outline-none focus:ring-2 focus:ring-lp-green/30"
        >
          {value === '' && <option value="" disabled>{placeholder}</option>}
          {options.map(option => <option key={option.value} value={option.value}>{optionLabel(option)}</option>)}
        </select>
      )}
      {helpText && <p id={`${id}-help`} className="mt-2 text-xs leading-relaxed text-gray-500">{helpText}</p>}
    </div>
  )
}
