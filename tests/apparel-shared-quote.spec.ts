import { test, expect } from '@playwright/test'

for (const service of [
  { slug: 'embroidery', name: 'Embroidery', locationLabel: /Embroidery locations/, colorLabel: 'Number of thread colors' },
  { slug: 'dtg', name: 'DTG Printing', locationLabel: /Print locations/, colorLabel: null },
] as const) {
  for (const width of [390, 1440]) {
    test(`${service.slug} shared quote flow ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      let payload: { service: string; projectDetails: Record<string, string> } | undefined
      await page.route('**/api/quote', async route => {
        payload = route.request().postDataJSON()
        await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' })
      })
      await page.goto(`/services/apparel/${service.slug}`)
      const form = page.getByRole('region', { name: new RegExp(`Request an? ${service.name.toLowerCase()} quote`) })
      await expect(form.getByRole('heading', { name: 'Tell us about the project' })).toBeVisible()
      await form.getByLabel(/Garment type/).selectOption('T-shirt')
      await form.getByPlaceholder('e.g. 48').fill('48')
      await form.getByLabel(service.locationLabel).selectOption('1')
      await form.locator('#location1Name').fill('Front chest')
      if (service.colorLabel) {
        await expect(form.getByLabel(service.colorLabel)).toBeVisible()
        await expect(form.getByRole('button', { name: /Continue/ })).toBeDisabled()
        await form.locator('#location1Colors').selectOption('2')
      } else {
        await expect(form.getByText(/Number of (ink|thread) colors/)).toHaveCount(0)
        await expect(form.locator('#location1Colors')).toHaveCount(0)
      }
      await form.getByRole('button', { name: /Continue/ }).click()
      await form.getByRole('button', { name: /Flexible/ }).click()
      await form.getByRole('button', { name: /Continue/ }).click()
      await form.getByPlaceholder('Your name').fill('QA Test')
      await form.getByPlaceholder('your@email.com').fill('qa@example.com')
      await form.getByRole('button', { name: /Submit Request/ }).click()
      await expect(form.getByRole('heading', { name: 'We got it!' })).toBeVisible()
      expect(payload?.service).toBe(service.name)
      expect(payload?.projectDetails).toMatchObject({ printLocations: '1', location1Name: 'Front chest' })
      if (service.slug === 'dtg') expect(Object.keys(payload?.projectDetails ?? {}).some(key => /colors/i.test(key))).toBe(false)
      else expect(payload?.projectDetails.location1Colors).toBe('2')
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    })
  }
}

test('DTG server rejects injected color counts and missing locations without sending', async ({ request }) => {
  const base = { service: 'DTG Printing', timeline: 'flexible', contact: { name: 'QA Test', email: 'qa@example.com' }, projectDetails: { garmentType: 'T-shirt', quantity: '48', printLocations: '1', location1Name: 'Front chest' } }
  for (const projectDetails of [
    { ...base.projectDetails, location1Colors: '2' },
    { ...base.projectDetails, printLocations: '' },
  ]) {
    const response = await request.post('/api/quote', { data: { ...base, projectDetails } })
    expect(response.status()).toBe(400)
  }
})
