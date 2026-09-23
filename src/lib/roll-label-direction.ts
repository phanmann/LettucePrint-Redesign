export type LabelApplicationMethod = 'hand' | 'machine'
export type UnwindEdge = 'top' | 'bottom' | 'left' | 'right'
export type UnwindFace = 'out' | 'in'

export interface RollLabelDirection {
  applicationMethod: LabelApplicationMethod
  unwindEdge?: UnwindEdge
  unwindFace?: UnwindFace
}

export const UNWIND_EDGES: UnwindEdge[] = ['top', 'bottom', 'left', 'right']
export const UNWIND_FACES: UnwindFace[] = ['out', 'in']

export function isValidRollLabelDirection(value: unknown): value is RollLabelDirection {
  if (!value || typeof value !== 'object') return false

  const direction = value as Partial<RollLabelDirection>
  if (direction.applicationMethod === 'hand') {
    return direction.unwindEdge === undefined && direction.unwindFace === undefined
  }

  return direction.applicationMethod === 'machine'
    && UNWIND_EDGES.includes(direction.unwindEdge as UnwindEdge)
    && UNWIND_FACES.includes(direction.unwindFace as UnwindFace)
}

export function formatRollLabelDirection(direction: RollLabelDirection): string {
  if (direction.applicationMethod === 'hand') {
    return 'Hand applied — no direction preference'
  }

  const edge = direction.unwindEdge
    ? `${direction.unwindEdge.charAt(0).toUpperCase()}${direction.unwindEdge.slice(1)} edge first`
    : 'Direction required'
  const face = direction.unwindFace === 'in' ? 'face inside' : 'face outside'
  return `Machine applied — ${edge}, ${face}`
}

export function encodeRollLabelDirection(direction: RollLabelDirection): string {
  if (!isValidRollLabelDirection(direction)) {
    throw new Error('Invalid roll label direction')
  }
  return direction.applicationMethod === 'hand'
    ? 'hand'
    : `machine:${direction.unwindEdge}:${direction.unwindFace}`
}

export function decodeRollLabelDirection(value: string): RollLabelDirection | null {
  if (value === 'hand') return { applicationMethod: 'hand' }

  const [applicationMethod, unwindEdge, unwindFace, extra] = value.split(':')
  const direction = { applicationMethod, unwindEdge, unwindFace }
  if (extra !== undefined || !isValidRollLabelDirection(direction)) return null
  return direction
}
