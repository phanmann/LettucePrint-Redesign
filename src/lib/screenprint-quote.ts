export const MAX_PRINT_LOCATIONS = 20
export const INK_COLOR_OPTIONS = ['1', '2', '3', '4', '5+'] as const

export function printLocationCount(value: string | undefined): number {
  const count = Number(value)
  return value && Number.isInteger(count) && count >= 1 && count <= MAX_PRINT_LOCATIONS ? count : 0
}

export function validateScreenprintDetails(details: Record<string, string>): string | null {
  const count = printLocationCount(details.printLocations)
  if (!count) return 'Choose the number of print locations.'
  if (!details.garmentType?.trim() || !details.quantity?.trim()) return 'Add the garment type and quantity.'
  if (details.colors !== undefined) return 'Choose ink colors for each print location.'

  for (let index = 1; index <= count; index++) {
    if (!INK_COLOR_OPTIONS.includes(details[`location${index}Colors`] as typeof INK_COLOR_OPTIONS[number])) {
      return `Choose the ink colors for Location ${index}.`
    }
    if ((details[`location${index}Name`] ?? '').length > 100) return `Shorten the name for Location ${index}.`
  }

  if (Object.keys(details).some(key => {
    const match = /^location(\d+)(Colors|Name)$/.exec(key)
    return match && (Number(match[1]) < 1 || Number(match[1]) > count)
  })) return 'Remove inactive print locations.'
  return null
}
