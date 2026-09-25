export const PRINT_FINISHES = ['Matte', 'Gloss', 'Soft-Touch'] as const
export const SPOT_FINISHES = [
  'None',
  'Spot Gloss',
  'Spot Hologram',
  'Spot Gold Foil',
  'Embossed/Debossed',
  'Spot Prism',
  'Spot Mirror Metallic',
  'Spot Glitter',
] as const
export const ENCLOSURES = [
  'Common Zipper',
  'Child-Resistant Zipper',
  'Tear Notch',
  'Hang Hole',
] as const
export const BEST_CONTACT_OPTIONS = ['Email', 'Text', 'Call'] as const
export const ARTWORK_OPTIONS = ['Yes', 'No'] as const

export type PrintFinish = (typeof PRINT_FINISHES)[number]
export type SpotFinish = (typeof SPOT_FINISHES)[number]
export type Enclosure = (typeof ENCLOSURES)[number]
export type BestContact = (typeof BEST_CONTACT_OPTIONS)[number]
export type ArtworkPrintReady = (typeof ARTWORK_OPTIONS)[number]

export const PACKAGING_QUOTE_CONFIGS = {
  'custom-packaging': {
    quoteType: 'custom-packaging',
    service: 'Packaging',
    source: '/services/packaging/custom-packaging',
    successHeading: 'We got your packaging request.',
  },
  'mylar-bags': {
    quoteType: 'mylar-bags',
    service: 'Mylar Bags',
    source: '/services/packaging/mylar-bags',
    successHeading: 'We got your Mylar Bags request.',
  },
} as const

export type PackagingQuoteType = keyof typeof PACKAGING_QUOTE_CONFIGS

export interface BagSize {
  width: number
  length: number
  unit: 'in'
}

interface PackagingQuoteDetails {
  bagSizes: BagSize[]
  printFinish: PrintFinish
  spotFinish: SpotFinish
  enclosures: Enclosure[]
  artworkPrintReady: ArtworkPrintReady
  bestContact: BestContact[]
}

export interface PackagingQuotePayload<T extends PackagingQuoteType = PackagingQuoteType> {
  quoteType: (typeof PACKAGING_QUOTE_CONFIGS)[T]['quoteType']
  service: (typeof PACKAGING_QUOTE_CONFIGS)[T]['service']
  source: (typeof PACKAGING_QUOTE_CONFIGS)[T]['source']
  contact: {
    name: string
    email: string
    phone: string
  }
  projectDetails: PackagingQuoteDetails
}

export type CustomPackagingQuotePayload = PackagingQuotePayload<'custom-packaging'>
export type MylarBagsQuotePayload = PackagingQuotePayload<'mylar-bags'>

export type CustomPackagingFieldErrors = Partial<Record<
  | 'name'
  | 'email'
  | 'phone'
  | 'bagSizes'
  | 'printFinish'
  | 'spotFinish'
  | 'enclosures'
  | 'artworkPrintReady'
  | 'bestContact',
  string
>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

function includesValue<T extends string>(options: readonly T[], value: unknown): value is T {
  return typeof value === 'string' && options.includes(value as T)
}

export function validatePackagingQuote<T extends PackagingQuoteType>(
  input: unknown,
  expectedQuoteType: T,
): { success: true; data: PackagingQuotePayload<T> } | { success: false; errors: CustomPackagingFieldErrors } {
  const value = input && typeof input === 'object' ? input as Record<string, unknown> : {}
  const contactValue = value.contact && typeof value.contact === 'object'
    ? value.contact as Record<string, unknown>
    : {}
  const detailsValue = value.projectDetails && typeof value.projectDetails === 'object'
    ? value.projectDetails as Record<string, unknown>
    : {}

  const name = typeof contactValue.name === 'string' ? contactValue.name.trim() : ''
  const email = typeof contactValue.email === 'string' ? contactValue.email.trim() : ''
  const phone = typeof contactValue.phone === 'string' ? contactValue.phone.trim() : ''
  const rawBagSizes = Array.isArray(detailsValue.bagSizes) ? detailsValue.bagSizes : []
  const bagSizes = rawBagSizes.map(size => {
    const item = size && typeof size === 'object' ? size as Record<string, unknown> : {}
    return {
      width: typeof item.width === 'number' ? item.width : Number(item.width),
      length: typeof item.length === 'number' ? item.length : Number(item.length),
      unit: item.unit,
    }
  })
  const printFinish = detailsValue.printFinish
  const spotFinish = detailsValue.spotFinish
  const artworkPrintReady = detailsValue.artworkPrintReady
  const rawEnclosures = Array.isArray(detailsValue.enclosures) ? detailsValue.enclosures : []
  const rawBestContact = Array.isArray(detailsValue.bestContact) ? detailsValue.bestContact : []
  const enclosures = rawEnclosures as Enclosure[]
  const bestContact = rawBestContact as BestContact[]
  const config = PACKAGING_QUOTE_CONFIGS[expectedQuoteType]

  const errors: CustomPackagingFieldErrors = {}
  if (value.quoteType !== config.quoteType || value.service !== config.service || value.source !== config.source) {
    errors.name = 'This quote request is not in the expected format.'
  } else if (!name) {
    errors.name = 'Enter your name.'
  }
  if (email && !isValidEmail(email)) errors.email = 'Enter a valid email address.'
  if (phone && !isValidPhone(phone)) errors.phone = 'Enter a valid phone number.'
  if (
    bagSizes.length === 0
    || bagSizes.some(size => !Number.isFinite(size.width) || size.width <= 0 || !Number.isFinite(size.length) || size.length <= 0 || size.unit !== 'in')
  ) {
    errors.bagSizes = 'Enter a positive width and length for every bag size.'
  }
  if (!includesValue(PRINT_FINISHES, printFinish)) errors.printFinish = 'Choose a print finish.'
  if (!includesValue(SPOT_FINISHES, spotFinish)) errors.spotFinish = 'Choose a spot finish, including None if applicable.'
  if (rawEnclosures.some(item => !includesValue(ENCLOSURES, item))) errors.enclosures = 'Choose only supported enclosure types.'
  if (!includesValue(ARTWORK_OPTIONS, artworkPrintReady)) errors.artworkPrintReady = 'Tell us whether your artwork is print ready.'
  if (bestContact.length === 0) errors.bestContact = 'Choose at least one way to contact you.'
  else if (rawBestContact.some(item => !includesValue(BEST_CONTACT_OPTIONS, item))) {
    errors.bestContact = 'Choose only supported ways to contact you.'
  }
  if (bestContact.includes('Email') && !isValidEmail(email)) {
    errors.email = 'A valid email is required when Email is a preferred contact method.'
  }
  if ((bestContact.includes('Text') || bestContact.includes('Call')) && !isValidPhone(phone)) {
    errors.phone = 'A valid phone number is required for Text or Call.'
  }

  if (Object.keys(errors).length > 0) return { success: false, errors }

  return {
    success: true,
    data: {
      quoteType: config.quoteType,
      service: config.service,
      source: config.source,
      contact: { name, email, phone },
      projectDetails: {
        bagSizes: bagSizes as BagSize[],
        printFinish: printFinish as PrintFinish,
        spotFinish: spotFinish as SpotFinish,
        enclosures,
        artworkPrintReady: artworkPrintReady as ArtworkPrintReady,
        bestContact,
      },
    } as PackagingQuotePayload<T>,
  }
}

export function validateCustomPackagingQuote(
  input: unknown,
): { success: true; data: CustomPackagingQuotePayload } | { success: false; errors: CustomPackagingFieldErrors } {
  return validatePackagingQuote(input, 'custom-packaging')
}
