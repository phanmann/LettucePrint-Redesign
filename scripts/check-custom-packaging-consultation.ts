import assert from 'node:assert/strict'
import {
  validateCustomPackagingConsultation,
  type CustomPackagingConsultationPayload,
} from '../src/lib/custom-packaging-consultation'
import {
  buildCustomPackagingInternalEmail,
  sanitizeAttachmentFilename,
  sendCustomPackagingInternalEmail,
  validateConsultationFiles,
} from '../src/lib/custom-packaging-consultation-server'

async function main() {
const payload: CustomPackagingConsultationPayload = {
  quoteType: 'custom-packaging',
  service: 'Packaging',
  source: '/services/packaging/custom-packaging',
  contact: {
    name: 'Alex Rivera',
    company: 'North Star Goods',
    email: 'alex@example.com',
    phone: '(917) 555-0198',
  },
  projectDetails: {
    packagingContents: 'Glass candle vessels',
    packagingTypes: ['Box', 'Insert / Tray'],
    estimatedQuantity: '1,500 units',
    approximateSize: '4 x 4 x 5 in',
    artworkDielineStatus: 'Not sure',
    targetTimeline: 'Launch in eight weeks',
    projectDescription: 'A premium retail carton with a protective insert.',
  },
}

const valid = validateCustomPackagingConsultation(payload)
assert.equal(valid.success, true)
if (!valid.success) throw new Error('Expected valid consultation payload')
assert.deepEqual(valid.data, payload)

for (const requiredPath of ['name', 'email', 'packagingTypes', 'estimatedQuantity', 'artworkDielineStatus', 'projectDescription'] as const) {
  const candidate = structuredClone(payload) as CustomPackagingConsultationPayload
  if (requiredPath === 'name' || requiredPath === 'email') candidate.contact[requiredPath] = ''
  else if (requiredPath === 'packagingTypes') candidate.projectDetails.packagingTypes = []
  else candidate.projectDetails[requiredPath] = '' as never
  const result = validateCustomPackagingConsultation(candidate)
  assert.equal(result.success, false, `${requiredPath} must be required`)
  if (!result.success) assert.ok(result.errors[requiredPath])
}

const invalidEmail = structuredClone(payload)
invalidEmail.contact.email = 'not-an-email'
assert.deepEqual(validateCustomPackagingConsultation(invalidEmail), {
  success: false,
  errors: { email: 'Enter a valid email address.' },
})

const invalidPhone = structuredClone(payload)
invalidPhone.contact.phone = 'call me maybe'
assert.deepEqual(validateCustomPackagingConsultation(invalidPhone), {
  success: false,
  errors: { phone: 'Enter a valid phone number.' },
})

const oldCustomFields = structuredClone(payload) as unknown as Record<string, unknown>
oldCustomFields.projectDetails = {
  ...(oldCustomFields.projectDetails as Record<string, unknown>),
  bagSizes: [{ width: 4, length: 6, unit: 'in' }],
  printFinish: 'Matte',
  spotFinish: 'None',
  enclosures: [],
  artworkPrintReady: 'Yes',
  bestContact: ['Email'],
}
const rejectedOldFields = validateCustomPackagingConsultation(oldCustomFields)
assert.equal(rejectedOldFields.success, false)
if (!rejectedOldFields.success) assert.ok(rejectedOldFields.errors.request)

const pdfBytes = new TextEncoder().encode('%PDF-1.7\nreference content')
const validFile = new File([pdfBytes], '../../launch\r\nbrief.pdf', { type: 'application/pdf' })
const uploads = await validateConsultationFiles([validFile])
assert.equal(uploads.success, true)
if (!uploads.success) throw new Error('Expected valid upload')
assert.equal(uploads.files[0].filename, 'launch--brief.pdf')
assert.deepEqual(uploads.files[0].content, Buffer.from(pdfBytes))

const wrongMagic = await validateConsultationFiles([
  new File(['not a pdf'], 'fake.pdf', { type: 'application/pdf' }),
])
assert.equal(wrongMagic.success, false)
if (!wrongMagic.success) assert.match(wrongMagic.error, /do not match/)

const unsupported = await validateConsultationFiles([
  new File(['hello'], 'notes.txt', { type: 'text/plain' }),
])
assert.deepEqual(unsupported, { success: false, error: 'Files must be PDF, JPG, PNG, or WebP.' })

const tooMany = await validateConsultationFiles([
  validFile,
  new File([pdfBytes], 'two.pdf', { type: 'application/pdf' }),
  new File([pdfBytes], 'three.pdf', { type: 'application/pdf' }),
  new File([pdfBytes], 'four.pdf', { type: 'application/pdf' }),
])
assert.deepEqual(tooMany, { success: false, error: 'Upload up to 3 files.' })

const tooLarge = await validateConsultationFiles([
  new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'large.png', { type: 'image/png' }),
])
assert.equal(tooLarge.success, false)
if (!tooLarge.success) assert.match(tooLarge.error, /no more than 10 MB/)

const makeEightMegabytePdf = (name: string) => {
  const bytes = new Uint8Array(8 * 1024 * 1024)
  bytes.set(new TextEncoder().encode('%PDF-'))
  return new File([bytes], name, { type: 'application/pdf' })
}
const tooLargeCombined = await validateConsultationFiles([
  makeEightMegabytePdf('one.pdf'),
  makeEightMegabytePdf('two.pdf'),
  makeEightMegabytePdf('three.pdf'),
])
assert.equal(tooLargeCombined.success, false)
if (!tooLargeCombined.success) assert.match(tooLargeCombined.error, /Combined uploads must be no more than 20 MB/)

const internalEmail = buildCustomPackagingInternalEmail(payload, uploads.files)
assert.equal(internalEmail.to, 'info@lettuceprint.com')
assert.equal(internalEmail.subject, 'New Packaging Consultation — North Star Goods · Alex Rivera')
for (const expected of [
  'Glass candle vessels',
  'Box, Insert / Tray',
  '1,500 units',
  '4 x 4 x 5 in',
  'Not sure',
  'Launch in eight weeks',
  'A premium retail carton with a protective insert.',
  'launch--brief.pdf (application/pdf, 26 bytes)',
]) {
  assert.ok(internalEmail.html.includes(expected), `Internal email must include ${expected}`)
}
assert.equal(internalEmail.attachments.length, 1)
assert.equal(internalEmail.attachments[0].filename, 'launch--brief.pdf')
assert.deepEqual(internalEmail.attachments[0].content, Buffer.from(pdfBytes))
assert.equal(sanitizeAttachmentFilename('../../secret/customer@example.com.png', 0), 'customer_example.com.png')

let interceptedEmail: typeof internalEmail | undefined
await sendCustomPackagingInternalEmail(async email => {
  interceptedEmail = email
  return { error: null }
}, payload, uploads.files)
assert.deepEqual(interceptedEmail, internalEmail)
await assert.rejects(
  sendCustomPackagingInternalEmail(async () => ({ error: { message: 'transport unavailable' } }), payload, uploads.files),
  /Internal consultation email failed: transport unavailable/,
)

console.log('Custom Packaging consultation contract, uploads, and Resend formatting: PASS')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
