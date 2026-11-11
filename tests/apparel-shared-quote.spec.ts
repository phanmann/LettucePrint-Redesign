import { test, expect } from '@playwright/test'

for (const service of [
  { slug: 'embroidery', name: 'Embroidery', locationLabel: /Embroidery locations/, colorLabel: 'Number of thread colors' },
  { slug: 'dtf', name: 'DTF Printing', locationLabel: /Print locations/, colorLabel: null },
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
      await page.goto(`/shop/apparel/${service.slug}`)
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
      if (service.slug === 'dtg' || service.slug === 'dtf') expect(Object.keys(payload?.projectDetails ?? {}).some(key => /colors/i.test(key))).toBe(false)
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

test('DTF server rejects injected color counts and missing locations without sending', async ({ request }) => {
  const base = { service: 'DTF Printing', timeline: 'flexible', contact: { name: 'QA Test', email: 'qa@example.com' }, projectDetails: { garmentType: 'T-shirt', quantity: '48', printLocations: '1', location1Name: 'Front chest' } }
  for (const projectDetails of [
    { ...base.projectDetails, location1Colors: '2' },
    { ...base.projectDetails, printLocations: '' },
  ]) {
    const response = await request.post('/api/quote', { data: { ...base, projectDetails } })
    expect(response.status()).toBe(400)
  }
})

for (const width of [390, 1440]) {
  test(`DTF navigation and page layout ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/shop/apparel/dtg')
    if (width < 1024) await page.getByRole('button', { name: 'Toggle menu' }).click()
    else await page.getByRole('link', { name: 'Apparel & Promo', exact: true }).first().hover()
    const link = page.getByRole('link', { name: 'DTF', exact: true })
    await expect(link).toBeVisible()
    await link.click()
    await expect(page).toHaveURL(/\/shop\/apparel\/dtf$/)
    await expect(page.getByRole('heading', { name: 'DTF Printing', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Ready to price it?' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Tell us about the project' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://lettuceprint.com/shop/apparel/dtf')
    await expect(page.getByRole('button', { name: /Continue/ })).toBeDisabled()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: `/workspace/projects/lettuceprint/launch/dtf-${width}.png`, fullPage: true })
  })
}

test('DTF artwork stays attached to its own service in mocked request', async ({ page }) => {
  let body = ''
  await page.route('**/api/quote', async route => {
    body = route.request().postData() ?? ''
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' })
  })
  await page.goto('/shop/apparel/dtf')
  const form = page.getByRole('region', { name: 'Request a dtf printing quote' })
  await form.getByLabel(/Garment type/).selectOption('T-shirt')
  await form.getByPlaceholder('e.g. 48').fill('24')
  await form.getByLabel(/Print locations/).selectOption('2')
  await form.locator('#location1Name').fill('Front')
  await form.locator('#location2Name').fill('Back')
  await form.getByLabel(/Print locations/).selectOption('1')
  await expect(form.locator('#location2Name')).toHaveCount(0)
  await form.locator('input[type="file"]').setInputFiles({ name: 'artwork.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>') })
  await form.getByRole('button', { name: /Continue/ }).click()
  await form.getByRole('button', { name: /Flexible/ }).click()
  await form.getByRole('button', { name: /Continue/ }).click()
  await form.getByPlaceholder('Your name').fill('QA Test')
  await form.getByPlaceholder('your@email.com').fill('qa@example.com')
  await form.getByRole('button', { name: /Submit Request/ }).click()
  await expect(form.getByRole('heading', { name: 'We got it!' })).toBeVisible()
  expect(body).toContain('DTF Printing')
  expect(body).toContain('artwork.svg')
  expect(body).not.toContain('location2Name')
  expect(body).not.toContain('DTG Printing')
})
