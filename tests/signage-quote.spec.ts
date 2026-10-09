import { test, expect } from '@playwright/test'

test('focused signage inquiry validates dates, preserves failed requests, and submits details', async ({ page }) => {
  await page.goto('http://127.0.0.1:3107/services/signage')
  await expect(page.getByRole('heading', { name: 'Need help with your booth design?' })).toBeVisible()
  await page.getByRole('link', { name: 'Request a Signage Quote' }).click()
  await expect(page.getByRole('heading', { name: 'Let’s plan your booth.' })).toBeVisible()
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  let requests = 0
  await page.route('**/api/quote', async route => {
    requests++
    const payload = route.request().postDataJSON()
    expect(payload.formType).toBe('signage-booth')
    expect(payload.projectDetails.boothSpecs).toBe('10 × 10 ft')
    expect(payload.projectDetails.venueRequirements).toBe('Not sure yet')
    await route.fulfill({ status: requests === 1 ? 502 : 200, contentType: 'application/json', body: JSON.stringify({ success: requests > 1 }) })
  })
  const submit = page.getByRole('button', { name: 'Request a signage quote' })
  await submit.click()
  expect(requests).toBe(0)
  for (const [id, value] of Object.entries({ eventDate: '2026-12-10', readyByDate: '2026-12-11', venue: 'NYC test venue', boothSpecs: '10 × 10 ft', venueRequirements: 'Not sure yet', printNeeds: 'One backdrop', name: 'QA Test', email: 'qa@example.com' })) await page.locator('#' + id).fill(value)
  await page.locator('#hardwareNeeds').selectOption({ label: 'Print and new hardware' })
  await page.locator('#designHelp').selectOption({ label: 'Need booth design help' })
  await submit.click()
  await expect(page.locator('form [role="alert"]')).toContainText('ready-by date')
  expect(requests).toBe(0)
  await page.locator('#readyByDate').fill('2026-12-09')
  await submit.click()
  await expect(page.locator('form [role="alert"]')).toContainText('could not be confirmed')
  await expect(page.locator('#boothSpecs')).toHaveValue('10 × 10 ft')
  await submit.click()
  await expect(page.getByRole('heading', { name: 'Your signage request is in.' })).toBeVisible()
  expect(requests).toBe(2)
  const invalid = await page.request.post('http://127.0.0.1:3107/api/quote', { data: { formType: 'signage-booth', service: 'Signage & Displays', timeline: '', contact: { name: 'QA', email: 'qa@example.com' }, projectDetails: {} } })
  expect(invalid.status()).toBe(400)
})
