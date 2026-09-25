import assert from 'node:assert/strict'
import {
  type MylarBagsQuotePayload,
  validatePackagingQuote,
} from '../src/lib/custom-packaging-quote'
import {
  buildPackagingInternalEmail,
  formatMylarBagSize,
  sendPackagingInternalEmail,
} from '../src/lib/packaging-quote-email'

async function main() {
const payload: MylarBagsQuotePayload = {
  quoteType: 'mylar-bags',
  service: 'Mylar Bags',
  source: '/services/packaging/mylar-bags',
  contact: { name: 'Alex Rivera', email: 'alex@example.com', phone: '(917) 555-0198' },
  projectDetails: {
    bagSizes: [
      { width: 4, length: 6.5, gusset: 2, unit: 'in' },
      { width: 8, length: 10, unit: 'in' },
    ],
    printFinish: 'Soft-Touch',
    spotFinish: 'Spot Gold Foil',
    enclosures: ['Standard Zipper', 'Child-Resistant Zipper', 'Tear Notch'],
    artworkPrintReady: 'Yes',
    bestContact: ['Email', 'Text'],
  },
}

const valid = validatePackagingQuote(payload, 'mylar-bags')
assert.equal(valid.success, true)
if (!valid.success) throw new Error('Expected a valid Mylar payload')
assert.deepEqual(valid.data, payload)
assert.equal(Object.hasOwn(valid.data.projectDetails.bagSizes[1], 'gusset'), false)

const legacy = structuredClone(payload) as MylarBagsQuotePayload
legacy.projectDetails.bagSizes = [{ width: 4, length: 6, unit: 'in' }]
assert.equal(validatePackagingQuote(legacy, 'mylar-bags').success, true, 'legacy payloads may omit gusset')

const legacyZipper = structuredClone(payload) as unknown as Record<string, unknown>
const legacyZipperDetails = legacyZipper.projectDetails as { enclosures: unknown[] }
legacyZipperDetails.enclosures = ['Common Zipper', 'Tear Notch']
const normalizedLegacyZipper = validatePackagingQuote(legacyZipper, 'mylar-bags')
assert.equal(normalizedLegacyZipper.success, true, 'legacy Common Zipper payloads remain valid for Mylar')
if (!normalizedLegacyZipper.success) throw new Error('Expected legacy zipper normalization')
assert.deepEqual(normalizedLegacyZipper.data.projectDetails.enclosures, ['Standard Zipper', 'Tear Notch'])
const legacyZipperEmail = buildPackagingInternalEmail(normalizedLegacyZipper.data)
assert.ok(legacyZipperEmail.html.includes('Standard Zipper, Tear Notch'))
assert.equal(legacyZipperEmail.html.includes('Common Zipper'), false)

for (const invalidEnclosure of ['Unsupported Zipper', '', 4, null]) {
  const candidate = structuredClone(payload) as unknown as Record<string, unknown>
  const details = candidate.projectDetails as { enclosures: unknown[] }
  details.enclosures = [invalidEnclosure]
  const result = validatePackagingQuote(candidate, 'mylar-bags')
  assert.equal(result.success, false, `enclosure ${String(invalidEnclosure)} must be rejected`)
  if (!result.success) assert.equal(result.errors.enclosures, 'Choose only supported enclosure types.')
}

for (const gusset of [0, -1, Number.NaN, Number.POSITIVE_INFINITY, '', '2', null, {}, []]) {
  const candidate = structuredClone(payload) as unknown as Record<string, unknown>
  const details = candidate.projectDetails as { bagSizes: Array<Record<string, unknown>> }
  details.bagSizes[0].gusset = gusset
  const result = validatePackagingQuote(candidate, 'mylar-bags')
  assert.equal(result.success, false, `gusset ${String(gusset)} must be rejected`)
  if (!result.success) assert.equal(result.errors.bagSizes, 'Enter a positive gusset or leave it blank.')
}

for (const invalidSize of [
  { width: 0, length: 6, gusset: 2, unit: 'in' },
  { width: 4, length: -1, gusset: 2, unit: 'in' },
  { width: 4, length: 6, gusset: 2, unit: 'cm' },
]) {
  const candidate = structuredClone(payload) as unknown as Record<string, unknown>
  const details = candidate.projectDetails as { bagSizes: Array<Record<string, unknown>> }
  details.bagSizes = [invalidSize]
  assert.equal(validatePackagingQuote(candidate, 'mylar-bags').success, false)
}

assert.equal(formatMylarBagSize(payload.projectDetails.bagSizes[0]), '4 × 6.5 × 2 in')
assert.equal(formatMylarBagSize(payload.projectDetails.bagSizes[1]), '8 × 10 in')
const internalEmail = buildPackagingInternalEmail(payload)
assert.equal(internalEmail.to, 'info@lettuceprint.com')
assert.equal(internalEmail.subject, 'New Quote Request — Mylar Bags · Alex Rivera')
assert.ok(internalEmail.html.includes('4 × 6.5 × 2 in, 8 × 10 in'))
assert.ok(internalEmail.html.includes('Standard Zipper, Child-Resistant Zipper, Tear Notch'))
assert.equal(internalEmail.html.includes('Common Zipper'), false)

let interceptedEmail: typeof internalEmail | undefined
const mockResult = await sendPackagingInternalEmail(async email => {
  interceptedEmail = email
  return { id: 'mock-resend-id', error: null }
}, payload)
assert.deepEqual(interceptedEmail, internalEmail)
assert.deepEqual(mockResult, { id: 'mock-resend-id', error: null })

console.log('Mylar gusset, Standard Zipper normalization, legacy contract, formatter, and Resend mock: PASS')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
