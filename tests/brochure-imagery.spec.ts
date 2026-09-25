import { expect, test, type Page } from '@playwright/test'

const listingPath = '/services/marketing-materials/brochures'

const products = [
  {
    name: 'Bi-Fold Brochure',
    path: `${listingPath}/bi-fold-letter`,
    card: '/images/products/brochures/bi-fold-letter/card.webp',
    galleryCount: 2,
  },
  {
    name: 'Bi-Fold Brochure — Tabloid',
    pageName: 'Bi-Fold Brochure - Tabloid',
    path: `${listingPath}/bi-fold-tabloid`,
    card: '/images/products/brochures/bi-fold-tabloid/card.webp',
    galleryCount: 2,
  },
  {
    name: 'Tri-Fold Brochure',
    path: `${listingPath}/tri-fold-letter`,
    card: '/images/products/brochures/tri-fold-letter/card.webp',
    galleryCount: 4,
  },
  {
    name: 'Tri-Fold Brochure — Legal',
    pageName: 'Tri-Fold Brochure - Legal',
    path: `${listingPath}/tri-fold-legal`,
    card: '/images/products/brochures/tri-fold-legal/card.webp',
    galleryCount: 4,
  },
] as const

function collectPageFailures(page: Page) {
  const failures: string[] = []

  page.on('console', message => {
    if (message.type() === 'error') failures.push(`console: ${message.text()}`)
  })
  page.on('pageerror', error => failures.push(`page: ${error.message}`))
  page.on('requestfailed', request => {
    if (request.failure()?.errorText !== 'net::ERR_ABORTED') {
      failures.push(`request: ${request.url()} (${request.failure()?.errorText})`)
    }
  })
  page.on('response', response => {
    if (response.request().resourceType() === 'image' && !response.ok()) {
      failures.push(`image: ${response.status()} ${response.url()}`)
    }
  })

  return failures
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1)
}

test('brochure listing uses four distinct route-matched cards and exact links', async ({ page }, testInfo) => {
  const failures = collectPageFailures(page)
  await page.goto(listingPath, { waitUntil: 'networkidle' })

  const cardSources: string[] = []
  for (const product of products) {
    const heading = page.getByRole('heading', { name: product.name, exact: true })
    await expect(heading).toBeVisible()
    const card = heading.locator('../..')
    await expect(card.getByRole('link', { name: /Order Now/ })).toHaveAttribute('href', product.path)
    const source = decodeURIComponent(await card.locator('img').getAttribute('src') ?? '')
    expect(source).toContain(product.card)
    cardSources.push(source)
  }

  expect(new Set(cardSources).size).toBe(4)
  await expectNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('brochures-listing.png'), fullPage: true })
  expect(failures).toEqual([])
})

for (const product of products) {
  test(`${product.pageName ?? product.name} gallery and configurator smoke`, async ({ page }, testInfo) => {
    const failures = collectPageFailures(page)
    await page.goto(product.path, { waitUntil: 'networkidle' })
    await expect(page.getByRole('heading', { name: product.pageName ?? product.name, exact: true })).toBeVisible()

    const thumbnails = page.locator('button[aria-label^="View "]')
    await expect(thumbnails).toHaveCount(product.galleryCount)
    const mainImage = page.locator('main img[alt]').first()
    for (let index = 0; index < product.galleryCount; index += 1) {
      const thumbnail = thumbnails.nth(index)
      const label = await thumbnail.getAttribute('aria-label')
      await thumbnail.click()
      await expect(mainImage).toHaveAttribute('alt', label?.replace(/^View /, '') ?? '')
      await expect(mainImage).toBeVisible()
    }

    await page.locator('label:visible').filter({ has: page.getByText('Matte', { exact: true }) }).click()
    await page.locator('label:visible').filter({ has: page.getByText('100 lb. cover', { exact: true }) }).click()
    await page.locator('label:visible').filter({ has: page.getByText('Soft Touch', { exact: true }) }).click()
    await expectNoHorizontalOverflow(page)
    await page.screenshot({ path: testInfo.outputPath(`${product.path.split('/').at(-1)}.png`), fullPage: true })

    await page.locator('button:visible').filter({ hasText: 'Add to Cart' }).click()
    await page.locator('a:visible').filter({ hasText: 'View Cart' }).click()
    await expect(page).toHaveURL(/\/cart$/)
    await expect(page.getByText(product.pageName ?? product.name, { exact: true }).first()).toBeVisible()
    expect(failures).toEqual([])
  })
}
