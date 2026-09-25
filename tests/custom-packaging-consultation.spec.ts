import { expect, test, type Page } from '@playwright/test'

const path = '/services/packaging/custom-packaging'

async function fillConsultation(page: Page) {
  await page.getByLabel('Name *').fill('Alex Rivera')
  await page.getByLabel('Company').fill('North Star Goods')
  await page.getByLabel('Email *').fill('alex@example.com')
  await page.getByLabel('Phone').fill('(917) 555-0198')
  await page.getByLabel('What are you packaging?').fill('Glass candle vessels')
  await page.getByLabel('Box').check()
  await page.getByLabel('Insert / Tray').check()
  await page.getByLabel('Estimated quantity *').fill('1,500 units')
  await page.getByLabel('Approximate product or package size').fill('4 x 4 x 5 in')
  await page.getByRole('radio', { name: 'Not sure' }).check()
  await page.getByLabel('Target timeline').fill('Launch in eight weeks')
  await page.getByLabel('Short project description *').fill('A premium retail carton with a protective insert.')
}

async function readMultipartRequest(request: import('@playwright/test').Request) {
  const contentType = request.headers()['content-type']
  const body = request.postDataBuffer()
  if (!contentType || !body) throw new Error('Expected multipart request body')
  const parsed = await new Request('http://local.test', {
    method: 'POST',
    headers: { 'content-type': contentType },
    body: new Uint8Array(body),
  }).formData()
  return parsed
}

test('custom packaging: submits exact consultation payload and file bytes', async ({ page }, testInfo) => {
  let submittedPayload: unknown
  const captured: { file?: File } = {}
  await page.route('**/api/quote', async route => {
    const multipart = await readMultipartRequest(route.request())
    submittedPayload = JSON.parse(String(multipart.get('payload')))
    const file = multipart.get('files')
    captured.file = file instanceof File ? file : undefined
    await new Promise(resolve => setTimeout(resolve, 200))
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) })
  })

  await page.goto(path)
  const form = page.locator('main form')
  await expect(page.getByRole('heading', { level: 1, name: 'Custom packaging, built around your brand.' })).toBeVisible()
  await expect(page.getByText('What we bring to the table', { exact: true })).toBeVisible()
  await expect(form.getByRole('button', { name: 'Request a Packaging Consultation' })).toBeVisible()
  for (const removed of ['Bag Size (inches)', 'Print Finish', 'Spot Finish', 'Enclosure', 'Is your artwork print ready?', 'Best form of contact']) {
    await expect(form.getByText(removed, { exact: false })).toHaveCount(0)
  }

  await form.getByRole('button', { name: 'Request a Packaging Consultation' }).click()
  await expect(page.getByText('Enter your name.')).toBeVisible()
  await expect(page.getByText('Enter your email address.')).toBeVisible()
  await expect(page.getByText('Choose at least one packaging type.')).toBeVisible()
  await expect(page.locator(':focus')).toHaveAttribute('name', 'name')

  await fillConsultation(page)
  const pdf = Buffer.from('%PDF-1.7\nreference content')
  await page.getByLabel('Upload files / reference images').setInputFiles({
    name: 'launch-brief.pdf',
    mimeType: 'application/pdf',
    buffer: pdf,
  })
  await page.screenshot({
    path: testInfo.outputPath(`custom-packaging-${testInfo.project.name}.png`),
    fullPage: true,
  })
  await form.getByRole('button', { name: 'Request a Packaging Consultation' }).click()
  await expect(form.getByRole('button', { name: 'Sending request…' })).toBeDisabled()
  await expect(page.getByRole('heading', { name: 'We got your packaging consultation request.' })).toBeVisible()

  expect(submittedPayload).toEqual({
    quoteType: 'custom-packaging',
    service: 'Packaging',
    source: path,
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
  })
  expect(captured.file).toBeDefined()
  if (!captured.file) throw new Error('Expected submitted file')
  expect(captured.file.name).toBe('launch-brief.pdf')
  expect(captured.file.type).toBe('application/pdf')
  expect(Buffer.from(await captured.file.arrayBuffer())).toEqual(pdf)

})

test('custom packaging: validates email and phone and recovers from server failure', async ({ page }) => {
  let requestCount = 0
  await page.route('**/api/quote', async route => {
    requestCount += 1
    await route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Submission failed' }) })
  })
  await page.goto(path)
  await fillConsultation(page)
  await page.getByLabel('Email *').fill('not-an-email')
  await page.getByLabel('Phone').fill('555')
  await page.getByRole('button', { name: 'Request a Packaging Consultation' }).click()
  await expect(page.getByText('Enter a valid email address.')).toBeVisible()
  await expect(page.getByText('Enter a valid phone number.')).toBeVisible()
  expect(requestCount).toBe(0)

  await page.getByLabel('Email *').fill('alex@example.com')
  await page.getByLabel('Phone').fill('(917) 555-0198')
  await page.getByRole('button', { name: 'Request a Packaging Consultation' }).click()
  await expect(page.getByText('Something went wrong. Your request was not submitted.', { exact: false })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Request a Packaging Consultation' })).toBeEnabled()
  expect(requestCount).toBe(1)
})

test('custom packaging: rejects legacy custom fields and insecure uploads server-side', async ({ request }) => {
  const payload = {
    quoteType: 'custom-packaging',
    service: 'Packaging',
    source: path,
    contact: { name: 'Schema Test', company: '', email: 'schema@example.com', phone: '' },
    projectDetails: {
      packagingContents: '',
      packagingTypes: ['Box'],
      estimatedQuantity: '500',
      approximateSize: '',
      artworkDielineStatus: 'No',
      targetTimeline: '',
      projectDescription: 'Test project.',
      printFinish: 'Matte',
    },
  }
  const oldFieldResponse = await request.post('/api/quote', { data: payload })
  expect(oldFieldResponse.status()).toBe(400)
  await expect(oldFieldResponse.json()).resolves.toMatchObject({ fields: { request: expect.any(String) } })

  delete (payload.projectDetails as Record<string, unknown>).printFinish
  const wrongMagic = await request.post('/api/quote', {
    multipart: {
      payload: JSON.stringify(payload),
      files: { name: 'fake.pdf', mimeType: 'application/pdf', buffer: Buffer.from('not a pdf') },
    },
  })
  expect(wrongMagic.status()).toBe(400)
  await expect(wrongMagic.json()).resolves.toMatchObject({ fields: { files: expect.stringMatching(/do not match/) } })

})

test('custom packaging: keyboard controls, mobile-safe layout, and no browser errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await page.goto(path)
  await page.getByLabel('Name *').focus()
  await page.keyboard.press('Tab')
  await expect(page.getByLabel('Company')).toBeFocused()
  await page.getByLabel('Box').focus()
  await page.keyboard.press('Space')
  await expect(page.getByLabel('Box')).toBeChecked()
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
  expect(errors).toEqual([])
})

test('generic quote route remains available and uses its JSON contract', async ({ page }) => {
  let payload: unknown
  await page.route('**/api/quote', async route => {
    payload = route.request().postDataJSON()
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) })
  })
  await page.goto('/get-quote')
  await page.locator('button').filter({ hasText: 'Something else — tell us about it' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByPlaceholder('Describe what you need — the more detail, the better.').fill('A generic quote request')
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /Flexible/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByPlaceholder('Your name').fill('Generic User')
  await page.getByPlaceholder('your@email.com').fill('generic@example.com')
  await page.getByRole('button', { name: 'Submit Request' }).click()
  await expect(page.getByRole('heading', { name: 'We got it!' })).toBeVisible()
  expect(payload).toEqual({
    service: 'Other',
    projectDetails: { details: 'A generic quote request' },
    timeline: 'flexible',
    contact: { name: 'Generic User', company: '', email: 'generic@example.com', phone: '' },
  })
})
