import { expect, test, type Page } from '@playwright/test'

const listingPath = '/services/signage/banners'
const productPath = `${listingPath}/retractable-luxury-33`
const assetPath = '/images/products/banners/retractable-luxury-33/luxury-base-retractable.webp'

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

test('Luxury Base listing card uses the supplied route asset and exact product link', async ({ page, request }, testInfo) => {
  const failures = collectPageFailures(page)
  const assetResponse = await request.get(assetPath)
  expect(assetResponse.status()).toBe(200)
  expect(assetResponse.headers()['content-type']).toContain('image/webp')

  await page.goto(listingPath, { waitUntil: 'networkidle' })
  const heading = page.getByRole('heading', { name: 'Luxury Base Retractable', exact: true })
  await expect(heading).toBeVisible()
  const card = heading.locator('../..')
  await expect(card.getByRole('link', { name: /Order Now/ })).toHaveAttribute('href', productPath)
  const image = card.locator('img')
  expect(decodeURIComponent(await image.getAttribute('src') ?? '')).toContain(assetPath)
  await expect(image).toHaveClass(/object-contain/)

  const standardCard = page.getByRole('heading', { name: 'Standard Retractable Banner', exact: true }).locator('../..')
  const tabletopCard = page.getByRole('heading', { name: 'Table Top Retractable', exact: true }).locator('../..')
  expect(decodeURIComponent(await standardCard.locator('img').getAttribute('src') ?? '')).toContain('1lkdgvN3wjRMfftKmeu5X47ZwHyor7dzB')
  expect(decodeURIComponent(await tabletopCard.locator('img').getAttribute('src') ?? '')).toContain('1lkdgvN3wjRMfftKmeu5X47ZwHyor7dzB')

  await expectNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath(`banners-listing-${testInfo.project.name}.png`), fullPage: true })
  expect(failures).toEqual([])
})

test('Luxury Base gallery order, switching, configurator, and cart identity', async ({ page }, testInfo) => {
  const failures = collectPageFailures(page)
  await page.goto(productPath, { waitUntil: 'networkidle' })
  await expect(page.getByRole('heading', { name: 'Luxury Base Retractable', exact: true })).toBeVisible()

  const thumbnails = page.locator('button[aria-label^="View "]')
  await expect(thumbnails).toHaveCount(2)
  const mainImage = page.locator('main img[alt]').first()
  await expect(mainImage).toHaveAttribute('alt', 'Luxury base retractable banner display')
  expect(decodeURIComponent(await mainImage.getAttribute('src') ?? '')).toContain(assetPath)
  await expect(mainImage).toHaveClass(/object-contain/)

  await thumbnails.nth(1).click()
  await expect(mainImage).toHaveAttribute('alt', 'Retractable banner setup')
  expect(decodeURIComponent(await mainImage.getAttribute('src') ?? '')).toContain('1p_mlXivZBXkObui0RQPrmVH8uhVf9WNl')
  await thumbnails.nth(0).click()
  await expect(mainImage).toHaveAttribute('alt', 'Luxury base retractable banner display')

  const graphicOnly = page.locator('label:visible').filter({ has: page.getByText('Graphic Only', { exact: true }) })
  await graphicOnly.click()
  await expect(graphicOnly.locator('div').first()).toHaveClass(/border-lp-green/)
  await expectNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath(`luxury-base-product-${testInfo.project.name}.png`), fullPage: true })

  await page.locator('button:visible').filter({ hasText: 'Add to Cart' }).click()
  await page.locator('a:visible').filter({ hasText: 'View Cart' }).click()
  await expect(page).toHaveURL(/\/cart$/)
  await expect(page.getByText('Luxury Base Retractable', { exact: true }).first()).toBeVisible()
  await expect(page.getByText(/Configured product · Qty 1 · Graphic Only · Graphic Only/)).toBeVisible()
  await expectNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath(`luxury-base-cart-${testInfo.project.name}.png`), fullPage: true })
  expect(failures).toEqual([])
})
