import {
  decodeRollLabelDirection,
  encodeRollLabelDirection,
  formatRollLabelDirection,
  isValidRollLabelDirection,
} from '../src/lib/roll-label-direction.ts'

const validDirections = [
  { applicationMethod: 'hand' },
  ...['top', 'bottom', 'left', 'right'].flatMap(unwindEdge =>
    ['out', 'in'].map(unwindFace => ({ applicationMethod: 'machine', unwindEdge, unwindFace }))
  ),
]

let failures = 0

for (const direction of validDirections) {
  const encoded = encodeRollLabelDirection(direction)
  const decoded = decodeRollLabelDirection(encoded)
  if (!decoded || JSON.stringify(decoded) !== JSON.stringify(direction)) {
    failures += 1
    console.error(`FAIL round trip: ${encoded}`)
  } else {
    console.log(`PASS round trip: ${encoded}`)
  }
}

for (const invalid of [
  null,
  {},
  { applicationMethod: 'machine' },
  { applicationMethod: 'machine', unwindEdge: 'top' },
  { applicationMethod: 'machine', unwindEdge: 'diagonal', unwindFace: 'out' },
  { applicationMethod: 'hand', unwindEdge: 'top' },
]) {
  if (isValidRollLabelDirection(invalid)) {
    failures += 1
    console.error(`FAIL invalid direction accepted: ${JSON.stringify(invalid)}`)
  } else {
    console.log(`PASS invalid direction rejected: ${JSON.stringify(invalid)}`)
  }
}

if (formatRollLabelDirection({ applicationMethod: 'hand' }) !== 'Hand applied — no direction preference') {
  failures += 1
  console.error('FAIL hand-applied display label')
} else {
  console.log('PASS hand-applied display label')
}

if (failures > 0) process.exit(1)
