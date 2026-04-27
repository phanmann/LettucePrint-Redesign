'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface DisclosureProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function Disclosure({ title, children, defaultOpen = false, className = '' }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left group"
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && <div className="mt-4">{children}</div>}
    </div>
  )
}
