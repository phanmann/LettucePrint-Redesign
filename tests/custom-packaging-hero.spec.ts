import { expect, test, type Page } from '@playwright/test'

const path = '/services/packaging/custom-packaging'

async function fillRequiredQuote(page: Page) {
  await page.getByLabel('Name *').fill('Alex Rivera')
  await page.getByRole('textbox', { name: 'Email' }).fill('alex@example.com')
  await page.getByLabel('Phone Number').fill('(917) 555-0198')
  const sizeRows = page.getByTestId('bag-size-row')
  await sizeRows.nth(0).getByLabel('Width').fill('4')
  await sizeRows.nth(0).getByLabel('Length').fill('6.5')
  await page.getByLabel('Print Finish *').selectOption('Soft-Touch')
  await page.getByLabel('Spot Finish *').selectOption('Spot Gold Foil')
  await page.getByLabel('Child-Resistant Zipper').check()
  await page.getByLabel('Tear Notch').check()
  await page.getByLabel('Yes').check()
  await page.getByRole('checkbox', { name: 'Email', exact: true }).check()
  await page.getByRole('checkbox', { name: 'Text', exact: true }).check()
}

test('adds/removes bag sizes, validates, and submits every field to the real endpoint path', async ({ page }) => {
  let submittedPayload: unknown
  await page.route('**/api/quote', async route => {
    submittedPayload = route.request().postDataJSON()
    await new Promise(resolve => setTimeout(resolve, 250))
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    })
  })

  await page.goto(path)
  await expect(page.getByRole('heading', { level: 1, name: 'Custom packaging, built around your brand.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'What we bring to the table' })).toBeVisible()

  const form = page.locator('main form')
  await form.getByRole('button', { name: 'Get a Quote' }).click()
  await expect(page.getByText('Enter your name.')).toBeVisible()
  await expect(page.getByText('Enter a positive width and length for every bag size.')).toBeVisible()
  await expect(page.getByText('Choose at least one way to contact you.')).toBeVisible()
  await expect(page.locator(':focus')).toHaveAttribute('name', 'name')

  const sizeRows = page.getByTestId('bag-size-row')
  await page.getByRole('button', { name: '+ Additional Sizes Needed' }).click()
  await page.getByRole('button', { name: '+ Additional Sizes Needed' }).click()
  await expect(sizeRows).toHaveCount(3)
  await page.getByRole('button', { name: 'Remove bag size 2' }).click()
  await expect(sizeRows).toHaveCount(2)

  await fillRequiredQuote(page)
  await sizeRows.nth(1).getByLabel('Width').fill('8')
  await sizeRows.nth(1).getByLabel('Length').fill('10')
  await page.getByLabel('Hang Hole').check()

  await form.getByRole('button', { name: 'Get a Quote' }).click()
  await expect(form.getByRole('button', { name: 'Sending quote…' })).toBeDisabled()
  await expect(page.getByRole('heading', { name: 'We got your packaging request.' })).toBeVisible()

  expect(submittedPayload).toEqual({
    quoteType: 'custom-packaging',
    service: 'Packaging',
    source: '/services/packaging/custom-packaging',
    contact: {
      name: 'Alex Rivera',
      email: 'alex@example.com',
      phone: '(917) 555-0198',
    },
    projectDetails: {
      bagSizes: [
        { width: 4, length: 6.5, unit: 'in' },
        { width: 8, length: 10, unit: 'in' },
      ],
      printFinish: 'Soft-Touch',
      spotFinish: 'Spot Gold Foil',
      enclosures: ['Child-Resistant Zipper', 'Tear Notch', 'Hang Hole'],
      artworkPrintReady: 'Yes',
      bestContact: ['Email', 'Text'],
    },
  })
})

test('blocks invalid channel details and recovers from a server error without fake success', async ({ page }) => {
  let requestCount = 0
  await page.route('**/api/quote', async route => {
    requestCount += 1
    await new Promise(resolve => setTimeout(resolve, 250))
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Submission failed' }),
    })
  })

  await page.goto(path)
  await fillRequiredQuote(page)
  const form = page.locator('main form')
  await page.getByRole('textbox', { name: 'Email' }).fill('not-an-email')
  await form.getByRole('button', { name: 'Get a Quote' }).click()
  await expect(page.getByText('A valid email is required when Email is a preferred contact method.')).toBeVisible()
  expect(requestCount).toBe(0)

  await page.getByRole('textbox', { name: 'Email' }).fill('alex@example.com')
  await page.getByLabel('Phone Number').fill('555')
  await form.getByRole('button', { name: 'Get a Quote' }).click()
  await expect(page.getByText('A valid phone number is required for Text or Call.')).toBeVisible()
  expect(requestCount).toBe(0)

  await page.getByLabel('Phone Number').fill('(917) 555-0198')
  await form.getByRole('button', { name: 'Get a Quote' }).click()
  await expect(form.getByRole('button', { name: 'Sending quote…' })).toBeDisabled()
  await expect(form.getByRole('alert')).toContainText('Something went wrong.')
  await expect(page.getByRole('heading', { name: 'We got your packaging request.' })).toHaveCount(0)
  await expect(form.getByRole('button', { name: 'Get a Quote' })).toBeEnabled()
  expect(requestCount).toBe(1)
})

test('the actual endpoint rejects unsupported values instead of silently dropping them', async ({ request }) => {
  const response = await request.post('/api/quote', {
    data: {
      quoteType: 'custom-packaging',
      service: 'Packaging',
      source: '/services/packaging/custom-packaging',
      contact: { name: 'Schema Test', email: '', phone: '(917) 555-0198' },
      projectDetails: {
        bagSizes: [{ width: 4, length: 6, unit: 'cm' }],
        printFinish: 'Matte',
        spotFinish: 'None',
        enclosures: ['Unsupported Closure'],
        artworkPrintReady: 'No',
        bestContact: ['Call'],
      },
    },
  })

  expect(response.status()).toBe(400)
  await expect(response.json()).resolves.toMatchObject({
    error: 'Invalid quote request',
    fields: {
      bagSizes: expect.any(String),
      enclosures: expect.any(String),
    },
  })
})
