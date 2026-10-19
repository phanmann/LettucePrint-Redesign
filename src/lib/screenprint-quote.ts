export const MAX_PRINT_LOCATIONS = 20
export const INK_COLOR_OPTIONS = ['1', '2', '3', '4', '5+'] as const

export function printLocationCount(value: string | undefined): number {
  const count = Number(value)
  return value && Number.isInteger(count) && count >= 1 && count <= MAX_PRINT_LOCATIONS ? count : 0
}

export function validateScreenprintDetails(details: Record<string, string>, colorType: 'ink' | 'thread' | 'none' = 'ink'): string | null {
  const count = printLocationCount(details.printLocations)
  if (!count) return `Choose the number of ${colorType === 'thread' ? 'embroidery' : 'print'} locations.`
  if (!details.garmentType?.trim() || !details.quantity?.trim()) return 'Add the garment type and quantity.'
  if (details.colors !== undefined || (colorType === 'none' && Object.keys(details).some(key => /^location\d+Colors$/.test(key)))) return colorType === 'none' ? 'Remove color counts from DTG requests.' : `Choose ${colorType} colors for each location.`

  for (let index = 1; index <= count; index++) {
    if (colorType !== 'none' && !INK_COLOR_OPTIONS.includes(details[`location${index}Colors`] as typeof INK_COLOR_OPTIONS[number])) {
      return `Choose the ${colorType} colors for Location ${index}.`
    }
    if ((details[`location${index}Name`] ?? '').length > 100) return `Shorten the name for Location ${index}.`
  }

  if (Object.keys(details).some(key => {
    const match = /^location(\d+)(Colors|Name)$/.exec(key)
    return match && (Number(match[1]) < 1 || Number(match[1]) > count)
  })) return 'Remove inactive print locations.'
  return null
}
