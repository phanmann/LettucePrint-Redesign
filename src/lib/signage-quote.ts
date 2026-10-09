export interface SignageField {
  key: string
  label: string
  type?: 'date' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: string[]
}

export const signageSections: { title: string; fields: SignageField[] }[] = [
  { title: 'Event & timing', fields: [
    { key: 'eventName', label: 'Event name', placeholder: 'Trade show, pop-up, conference…' },
    { key: 'eventDate', label: 'Event date', type: 'date', required: true },
    { key: 'readyByDate', label: 'When do you need everything ready?', type: 'date', required: true },
    { key: 'venue', label: 'Venue & location', required: true, placeholder: 'Venue name and city, or “Not confirmed yet”' },
  ] },
  { title: 'Booth & venue specs', fields: [
    { key: 'boothSpecs', label: 'Booth dimensions & layout', type: 'textarea', required: true, placeholder: 'Width × depth × height (include units), open sides, booth number, or “Need help figuring this out”' },
    { key: 'venueRequirements', label: 'Venue requirements', type: 'textarea', required: true, placeholder: 'Height limits, approved materials, fire ratings, rigging, setup/access times — or “Not sure yet”' },
  ] },
  { title: 'Print, hardware & design', fields: [
    { key: 'printNeeds', label: 'What do you need printed?', type: 'textarea', required: true, placeholder: 'Backdrops, banners, table graphics, signs… Include sizes and quantities, or ask us to recommend a setup.' },
    { key: 'hardwareNeeds', label: 'Do you need hardware?', type: 'select', required: true, options: ['Print and new hardware', 'Print only — I have hardware', 'Not sure — please recommend'] },
    { key: 'existingHardware', label: 'Existing hardware details (if applicable)', placeholder: 'Brand/model, frame size, or template details' },
    { key: 'designHelp', label: 'Where are you with the design?', type: 'select', required: true, options: ['Need booth design help', 'Have a concept — need artwork help', 'Have print-ready artwork', 'Not sure yet'] },
    { key: 'budget', label: 'Approximate budget (optional)', placeholder: 'A range is fine' },
    { key: 'additionalDetails', label: 'Anything else? (optional)', type: 'textarea', placeholder: 'Reference links, organizer specs, installation needs, or questions. We can arrange artwork/spec-file handoff when we follow up.' },
  ] },
]

export function validateSignageDetails(details: Record<string, string>): string | null {
  for (const field of signageSections.flatMap(section => section.fields)) {
    const value = details[field.key]?.trim()
    if (field.required && !value) return `Please complete: ${field.label}.`
    if (value && field.options && !field.options.includes(value)) return `Please select an option for: ${field.label}.`
    if (value && field.type === 'date' && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value)) return `Please enter a valid date for: ${field.label}.`
  }
  if (details.readyByDate > details.eventDate) return 'The ready-by date must be on or before the event date.'
  return null
}
