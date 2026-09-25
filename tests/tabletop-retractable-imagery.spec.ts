import { createHash } from 'node:crypto'
import { expect, test, type Locator, type Page } from '@playwright/test'

const listingPath = '/services/signage/banners'
const productPath = `${listingPath}/retractable-tabletop`
const assetPath = '/images/products/banners/retractable-tabletop/tabletop-retractable.webp'
const assetSha256 = '9aa0fb67b7d0efb57293517cadbbe44c4168def0bfc131ac87cd9ffe9b2ed98a'
const standardPrimaryId = '1lkdgvN3wjRMfftKmeu5X47ZwHyor7dzB'
const sharedSecondaryId = '1p_mlXivZBXkObui0RQPrmVH8uhVf9WNl'
const luxuryPrimaryPath = '/images/products/banners/retractable-luxury-33/luxury-base-retractable.webp'

function collectPageFailures(page: Page) {
  const failures: string[] = []

  page.on('console', message => {
    if (message.type() === 'error') failures.push(`console: ${message.text()}`)
  })
  page.on('pageerror', error => failures.push(`page: ${error.message}`))
  page.on('requestfailed', request => {
    failures.push(`request: ${request.url()} (${request.failure()?.errorText})`)
  })
  page.on('response', response => {
    if (response.status() >= 400) failures.push(`response: ${response.status()} ${response.url()}`)
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

async function decodedSrc(image: Locator) {
  return decodeURIComponent(await image.getAttribute('src') ?? '')
}

test('Table Top listing card uses the scoped asset and preserves sibling image sources', async ({ page, request }, testInfo) => {
  const failures = collectPageFailures(page)
  const assetResponse = await request.get(assetPath)
  expect(assetResponse.status()).toBe(200)
  expect(assetResponse.headers()['content-type']).toContain('image/webp')
  expect(createHash('sha256').update(await assetResponse.body()).digest('hex')).toBe(assetSha256)

  await page.goto(listingPath, { waitUntil: 'networkidle' })
  const tableTopHeading = page.getByRole('heading', { name: 'Table Top Retractable', exact: true })
  await expect(tableTopHeading).toBeVisible()
  const tableTopCard = tableTopHeading.locator('../..')
  await expect(tableTopCard.getByRole('link', { name: /Order Now/ })).toHaveAttribute('href', productPath)
  const tableTopImage = tableTopCard.locator('img')
  expect(await decodedSrc(tableTopImage)).toContain(assetPath)
  await expect(tableTopImage).toHaveClass(/object-contain/)
  expect(await tableTopImage.evaluate(image => getComputedStyle(image).objectFit)).toBe('contain')

  const standardCard = page.getByRole('heading', { name: 'Standard Retractable Banner', exact: true }).locator('../..')
  const luxuryCard = page.getByRole('heading', { name: 'Luxury Base Retractable', exact: true }).locator('../..')
  expect(await decodedSrc(standardCard.locator('img'))).toContain(standardPrimaryId)
  expect(await decodedSrc(luxuryCard.locator('img'))).toContain(luxuryPrimaryPath)

  await expectNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath(`tabletop-listing-${testInfo.project.name}.png`), fullPage: true })
  expect(failures).toEqual([])
})

test('Table Top gallery, configurator, and cart identity work end to end', async ({ page }, testInfo) => {
  const failures = collectPageFailures(page)
  await page.goto(productPath, { waitUntil: 'networkidle' })
  await expect(page.getByRole('heading', { name: 'Table Top Retractable', exact: true })).toBeVisible()

  const thumbnails = page.locator('button[aria-label^="View "]')
  await expect(thumbnails).toHaveCount(2)
  const mainImage = page.locator('main img[alt]').first()
  await expect(mainImage).toHaveAttribute('alt', 'Table top retractable banner display')
  expect(await decodedSrc(mainImage)).toContain(assetPath)
  await expect(mainImage).toHaveClass(/object-contain/)
  expect(await mainImage.evaluate(image => getComputedStyle(image).objectFit)).toBe('contain')

  await thumbnails.nth(1).click()
  await expect(mainImage).toHaveAttribute('alt', 'Retractable banner setup')
  expect(await decodedSrc(mainImage)).toContain(sharedSecondaryId)
  await thumbnails.nth(0).click()
  await expect(mainImage).toHaveAttribute('alt', 'Table top retractable banner display')
  expect(await decodedSrc(mainImage)).toContain(assetPath)

  const graphicOnly = page.locator('label:visible').filter({ has: page.getByText('Graphic Only', { exact: true }) })
  await graphicOnly.click()
  await expect(graphicOnly.locator('div').first()).toHaveClass(/border-lp-green/)
  await expect(page.locator('input[type="number"]:visible')).toHaveValue('1')
  await expectNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath(`tabletop-product-${testInfo.project.name}.png`), fullPage: true })

  await page.locator('button:visible').filter({ hasText: 'Add to Cart' }).click()
  await page.locator('a:visible').filter({ hasText: 'View Cart' }).click()
  await page.waitForURL(/\/cart$/)
  await page.waitForLoadState('networkidle')
  await expect(page.getByText('Table Top Retractable', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('Configured product · Qty 1 · Graphic Only · Graphic Only', { exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Edit configuration →' })).toHaveAttribute('href', productPath)
  await expectNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath(`tabletop-cart-${testInfo.project.name}.png`), fullPage: true })
  expect(failures).toEqual([])
})

test('Standard and Luxury galleries retain their exact source order', async ({ page }) => {
  const failures = collectPageFailures(page)

  await page.goto(`${listingPath}/retractable-standard`, { waitUntil: 'networkidle' })
  let thumbnails = page.locator('button[aria-label^="View "] img')
  await expect(thumbnails).toHaveCount(2)
  expect(await decodedSrc(thumbnails.nth(0))).toContain(standardPrimaryId)
  expect(await decodedSrc(thumbnails.nth(1))).toContain(sharedSecondaryId)

  await page.goto(`${listingPath}/retractable-luxury-33`, { waitUntil: 'networkidle' })
  thumbnails = page.locator('button[aria-label^="View "] img')
  await expect(thumbnails).toHaveCount(2)
  expect(await decodedSrc(thumbnails.nth(0))).toContain(luxuryPrimaryPath)
  expect(await decodedSrc(thumbnails.nth(1))).toContain(sharedSecondaryId)
  expect(failures).toEqual([])
})
