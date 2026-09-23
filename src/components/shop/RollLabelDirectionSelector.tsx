'use client'

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Hand, Settings2 } from 'lucide-react'
import {
  UNWIND_EDGES,
  type RollLabelDirection,
  type UnwindEdge,
  type UnwindFace,
} from '@/lib/roll-label-direction'

interface Props {
  value: RollLabelDirection
  onChange: (direction: RollLabelDirection) => void
}

const EDGE_OPTIONS: Record<UnwindEdge, { label: string; icon: typeof ArrowUp }> = {
  top: { label: 'Top first', icon: ArrowUp },
  bottom: { label: 'Bottom first', icon: ArrowDown },
  left: { label: 'Left first', icon: ArrowLeft },
  right: { label: 'Right first', icon: ArrowRight },
}

export default function RollLabelDirectionSelector({ value, onChange }: Props) {
  const machineApplied = value.applicationMethod === 'machine'

  const setFace = (unwindFace: UnwindFace) => {
    onChange({
      applicationMethod: 'machine',
      unwindEdge: value.unwindEdge,
      unwindFace,
    })
  }

  return (
    <fieldset>
      <legend className="block text-sm font-bold text-gray-900 mb-1">How will you apply the labels?</legend>
      <p className="text-xs text-gray-500 mb-3">
        This determines how your artwork is positioned on the finished roll.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          aria-pressed={!machineApplied}
          onClick={() => onChange({ applicationMethod: 'hand' })}
          className={`rounded-xl border p-4 text-left transition-all duration-150 ${
            !machineApplied
              ? 'border-lp-green bg-lp-green/5 ring-1 ring-lp-green'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <Hand size={19} className={!machineApplied ? 'text-lp-green' : 'text-gray-400'} />
          <span className="block text-sm font-semibold text-gray-900 mt-2">By hand</span>
          <span className="block text-xs text-gray-500 mt-1">No direction preference. We&apos;ll optimize it.</span>
        </button>

        <button
          type="button"
          aria-pressed={machineApplied}
          onClick={() => onChange({
            applicationMethod: 'machine',
            unwindFace: value.unwindFace ?? 'out',
            unwindEdge: value.unwindEdge,
          })}
          className={`rounded-xl border p-4 text-left transition-all duration-150 ${
            machineApplied
              ? 'border-lp-green bg-lp-green/5 ring-1 ring-lp-green'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <Settings2 size={19} className={machineApplied ? 'text-lp-green' : 'text-gray-400'} />
          <span className="block text-sm font-semibold text-gray-900 mt-2">With a machine</span>
          <span className="block text-xs text-gray-500 mt-1">Choose the leading edge and printed face.</span>
        </button>
      </div>

      {machineApplied && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-semibold text-gray-900 mb-2">Which edge should come off the roll first?</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {UNWIND_EDGES.map((edge) => {
              const { label, icon: Icon } = EDGE_OPTIONS[edge]
              const active = value.unwindEdge === edge
              return (
                <button
                  key={edge}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange({
                    applicationMethod: 'machine',
                    unwindEdge: edge,
                    unwindFace: value.unwindFace ?? 'out',
                  })}
                  className={`flex min-h-20 flex-col items-center justify-center rounded-lg border px-2 py-3 text-center transition-all ${
                    active
                      ? 'border-lp-green bg-white text-lp-green ring-1 ring-lp-green'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-lp-green/50'
                  }`}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span className="text-xs font-semibold mt-1.5">{label}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-900 mb-2">Where should the printed face sit?</p>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Printed face position">
              {([
                ['out', 'Face outside', 'Most common'],
                ['in', 'Face inside', 'For applicators that require it'],
              ] as const).map(([face, label, description]) => {
                const active = value.unwindFace === face
                return (
                  <button
                    key={face}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFace(face)}
                    className={`rounded-lg border px-3 py-2.5 text-left transition-all ${
                      active
                        ? 'border-lp-green bg-white ring-1 ring-lp-green'
                        : 'border-gray-200 bg-white hover:border-lp-green/50'
                    }`}
                  >
                    <span className={`block text-xs font-semibold ${active ? 'text-lp-green' : 'text-gray-800'}`}>{label}</span>
                    <span className="block text-[11px] text-gray-400 mt-0.5">{description}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {!value.unwindEdge && (
            <p className="text-xs text-amber-600 mt-3">Select the edge required by your applicator.</p>
          )}
          <p className="text-[11px] text-gray-400 mt-3">
            Not sure? Check your applicator manual or contact us before ordering.
          </p>
        </div>
      )}
    </fieldset>
  )
}
