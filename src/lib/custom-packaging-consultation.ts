export const CUSTOM_PACKAGING_TYPES = [
  'Box',
  'Pouch / Bag',
  'Mailer',
  'Sleeve',
  'Insert / Tray',
  'Retail Display',
  'Not Sure',
] as const

export const ARTWORK_DIELINE_OPTIONS = ['Yes', 'No', 'Not sure'] as const

export type CustomPackagingType = (typeof CUSTOM_PACKAGING_TYPES)[number]
export type ArtworkDielineStatus = (typeof ARTWORK_DIELINE_OPTIONS)[number]

export interface CustomPackagingConsultationPayload {
  quoteType: 'custom-packaging'
  service: 'Packaging'
  source: '/services/packaging/custom-packaging'
  contact: {
    name: string
    company: string
    email: string
    phone: string
  }
  projectDetails: {
    packagingContents: string
    packagingTypes: CustomPackagingType[]
    estimatedQuantity: string
    approximateSize: string
    artworkDielineStatus: ArtworkDielineStatus
    targetTimeline: string
    projectDescription: string
  }
}

export type CustomPackagingConsultationErrors = Partial<Record<
  | 'request'
  | 'name'
  | 'company'
  | 'email'
  | 'phone'
  | 'packagingContents'
  | 'packagingTypes'
  | 'estimatedQuantity'
  | 'approximateSize'
  | 'artworkDielineStatus'
  | 'targetTimeline'
  | 'projectDescription'
  | 'files',
  string
>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_TOP_LEVEL_KEYS = new Set(['quoteType', 'service', 'source', 'contact', 'projectDetails'])
const ALLOWED_CONTACT_KEYS = new Set(['name', 'company', 'email', 'phone'])
const ALLOWED_DETAIL_KEYS = new Set([
  'packagingContents',
  'packagingTypes',
  'estimatedQuantity',
  'approximateSize',
  'artworkDielineStatus',
  'targetTimeline',
  'projectDescription',
])

function asRecord(input: unknown): Record<string, unknown> {
  return input && typeof input === 'object' && !Array.isArray(input)
    ? input as Record<string, unknown>
    : {}
}

function cleanString(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function hasUnexpectedKeys(value: Record<string, unknown>, allowed: Set<string>): boolean {
  return Object.keys(value).some(key => !allowed.has(key))
}

function includesValue<T extends string>(values: readonly T[], value: unknown): value is T {
  return typeof value === 'string' && values.includes(value as T)
}

export function isValidConsultationPhone(value: string): boolean {
  if (!value) return true
  if (!/^[+\d\s().-]+$/.test(value)) return false
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

export function validateCustomPackagingConsultation(
  input: unknown,
): { success: true; data: CustomPackagingConsultationPayload } | { success: false; errors: CustomPackagingConsultationErrors } {
  const value = asRecord(input)
  const contact = asRecord(value.contact)
  const details = asRecord(value.projectDetails)
  const errors: CustomPackagingConsultationErrors = {}

  if (
    value.quoteType !== 'custom-packaging'
    || value.service !== 'Packaging'
    || value.source !== '/services/packaging/custom-packaging'
    || hasUnexpectedKeys(value, ALLOWED_TOP_LEVEL_KEYS)
    || hasUnexpectedKeys(contact, ALLOWED_CONTACT_KEYS)
    || hasUnexpectedKeys(details, ALLOWED_DETAIL_KEYS)
  ) {
    errors.request = 'This custom packaging request is not in the expected format.'
  }

  const name = cleanString(contact.name, 120)
  const company = cleanString(contact.company, 160)
  const email = cleanString(contact.email, 254)
  const phone = cleanString(contact.phone, 40)
  const packagingContents = cleanString(details.packagingContents, 500)
  const estimatedQuantity = cleanString(details.estimatedQuantity, 120)
  const approximateSize = cleanString(details.approximateSize, 200)
  const targetTimeline = cleanString(details.targetTimeline, 200)
  const projectDescription = cleanString(details.projectDescription, 3000)
  const packagingTypes = Array.isArray(details.packagingTypes) ? details.packagingTypes : []
  const artworkDielineStatus = details.artworkDielineStatus

  if (!name) errors.name = 'Enter your name.'
  if (!email) errors.email = 'Enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.'
  if (!isValidConsultationPhone(phone)) errors.phone = 'Enter a valid phone number.'
  if (packagingTypes.length === 0) errors.packagingTypes = 'Choose at least one packaging type.'
  else if (packagingTypes.some(item => !includesValue(CUSTOM_PACKAGING_TYPES, item))) {
    errors.packagingTypes = 'Choose only supported packaging types.'
  }
  if (!estimatedQuantity) errors.estimatedQuantity = 'Enter an estimated quantity.'
  if (!includesValue(ARTWORK_DIELINE_OPTIONS, artworkDielineStatus)) {
    errors.artworkDielineStatus = 'Choose an artwork or dieline status.'
  }
  if (!projectDescription) errors.projectDescription = 'Describe your project.'

  if (Object.keys(errors).length > 0) return { success: false, errors }

  return {
    success: true,
    data: {
      quoteType: 'custom-packaging',
      service: 'Packaging',
      source: '/services/packaging/custom-packaging',
      contact: { name, company, email, phone },
      projectDetails: {
        packagingContents,
        packagingTypes: packagingTypes as CustomPackagingType[],
        estimatedQuantity,
        approximateSize,
        artworkDielineStatus: artworkDielineStatus as ArtworkDielineStatus,
        targetTimeline,
        projectDescription,
      },
    },
  }
}
