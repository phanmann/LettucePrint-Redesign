'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface QtyRow {
  qty: number
  totalFmt: string
  save: number // 0 = no badge
}

interface Props {
  rows: QtyRow[]
  value: number
  showCustom: boolean
  customValue: string
  onSelect: (qty: number) => void
  onSelectCustom: () => void
  onCustomChange: (val: string) => void
  minCustom?: number
  stepCustom?: number
}

export default function QuantityDropdown({
  rows, value, showCustom, customValue,
  onSelect, onSelectCustom, onCustomChange,
  minCustom = 50, stepCustom = 50,
}: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = rows.find(r => r.qty === value)
  const displayLabel = showCustom
    ? `Custom — ${customValue || '…'}`
    : selected
      ? `${selected.qty.toLocaleString()} — ${selected.totalFmt}`
      : 'Select quantity'

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium bg-white transition-all duration-150 ${
          open ? 'border-lp-green ring-2 ring-lp-green/20' : 'border-gray-200 hover:border-gray-400'
        } text-gray-900`}
      >
        <span>{displayLabel}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
            className="absolute z-50 top-[calc(100%+6px)] left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
          >
            {rows.map((row, i) => {
              const isSelected = !showCustom && row.qty === value
              return (
                <button
                  key={row.qty}
                  type="button"
                  onClick={() => { onSelect(row.qty); setOpen(false) }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-100 ${
                    isSelected
                      ? 'bg-lp-green/8 text-gray-900'
                      : 'hover:bg-gray-50 text-gray-700'
                  } ${i > 0 ? 'border-t border-gray-100' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'border-lp-green bg-lp-green' : 'border-gray-300'
                    }`}>
                      {isSelected && <Check size={9} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : ''}`}>
                      {row.qty.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-900">{row.totalFmt}</span>
                    {row.save > 0 && (
                      <span className="text-[11px] font-bold text-lp-green bg-lp-green/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                        Save {row.save}%
                      </span>
                    )}
                  </div>
                </button>
              )
            })}

            {/* Custom qty option */}
            <button
              type="button"
              onClick={() => { onSelectCustom(); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left border-t border-gray-100 transition-colors duration-100 ${
                showCustom ? 'bg-lp-green/8' : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                showCustom ? 'border-lp-green bg-lp-green' : 'border-gray-300'
              }`}>
                {showCustom && <Check size={9} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm font-medium text-gray-700">Custom quantity…</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom qty input — shown below trigger when custom is selected */}
      <AnimatePresence>
        {showCustom && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <input
              type="number"
              min={minCustom}
              step={stepCustom}
              value={customValue}
              onChange={e => onCustomChange(e.target.value)}
              placeholder={`Enter quantity (min ${minCustom.toLocaleString()})`}
              className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-lp-green focus:ring-2 focus:ring-lp-green/20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
