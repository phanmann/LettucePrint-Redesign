import { expect, test, type Page } from '@playwright/test'

const listingPath = '/services/marketing-materials/booklets'

const products = [
  { pageName: 'Saddle-Stitch Booklet', path: `${listingPath}/saddle-stitch-55x85`, card: '/images/products/booklets/saddle-stitch-55x85/card.webp', primary: '/images/products/booklets/saddle-stitch-55x85/booklet-set.webp' },
  { pageName: 'Saddle-Stitch Booklet', path: `${listingPath}/saddle-stitch-85x11`, card: '/images/products/booklets/saddle-stitch-85x11/card.webp', primary: '/images/products/booklets/saddle-stitch-85x11/booklet-set.webp' },
  { pageName: 'Square Saddle-Stitch Booklet', path: `${listingPath}/saddle-stitch-square`, card: '/images/products/booklets/saddle-stitch-square/card.webp', primary: '/images/products/booklets/saddle-stitch-square/booklet-set.webp' },
  { pageName: 'Perfect Bound Booklet', path: `${listingPath}/perfect-bound-85x11`, card: '/images/products/booklets/perfect-bound-85x11/card.webp', primary: '/images/products/booklets/perfect-bound-85x11/booklet-stack.webp' },
  { pageName: 'Perfect Bound Booklet', path: `${listingPath}/perfect-bound-6x9`, card: '/images/products/booklets/perfect-bound-6x9/card.webp', primary: '/images/products/booklets/perfect-bound-6x9/booklet-stack.webp' },
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

test('booklet listing has five route-matched cards and exact links', async ({ page }, testInfo) => {
  const failures = collectPageFailures(page)
  await page.goto(listingPath, { waitUntil: 'networkidle' })
  for (const product of products) {
    const orderLink = page.locator(`a[href="${product.path}"]`).filter({ hasText: 'Order Now' })
    await expect(orderLink).toHaveCount(1)
    const imageSources = await page.locator('img').evaluateAll(images => images.map(image => image.getAttribute('src') ?? ''))
    expect(imageSources.some(source => decodeURIComponent(source).includes(product.card))).toBe(true)
  }
  await expectNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath(`booklets-listing-${testInfo.project.name}.png`), fullPage: true })
  expect(failures).toEqual([])
})

for (const product of products) {
  test(`${product.path.split('/').at(-1)} gallery, configurator, and cart smoke`, async ({ page }, testInfo) => {
    const failures = collectPageFailures(page)
    await page.goto(product.path, { waitUntil: 'networkidle' })
    await expect(page.getByRole('heading', { name: product.pageName, exact: true })).toBeVisible()
    const thumbnails = page.locator('button[aria-label^="View "]')
    await expect(thumbnails).toHaveCount(2)
    const mainImage = page.locator('main img[alt]').first()
    expect(decodeURIComponent(await mainImage.getAttribute('src') ?? '')).toContain(product.primary)
    for (let index = 0; index < 2; index += 1) {
      const thumbnail = thumbnails.nth(index)
      const label = await thumbnail.getAttribute('aria-label')
      await thumbnail.click()
      await expect(mainImage).toHaveAttribute('alt', label?.replace(/^View /, '') ?? '')
      await expect(mainImage).toBeVisible()
    }
    await page.locator('label:visible').filter({ has: page.getByText('Matte Cover', { exact: true }) }).click()
    await page.locator('label:visible').filter({ has: page.getByText('70 lb. text', { exact: true }) }).click()
    await page.locator('label:visible').filter({ has: page.getByText('24 pages', { exact: true }) }).click()
    await expectNoHorizontalOverflow(page)
    await page.screenshot({ path: testInfo.outputPath(`${product.path.split('/').at(-1)}-${testInfo.project.name}.png`), fullPage: true })
    await page.locator('button:visible').filter({ hasText: 'Add to Cart' }).click()
    await page.locator('a:visible').filter({ hasText: 'View Cart' }).click()
    await expect(page).toHaveURL(/\/cart$/)
    await expect(page.getByText(product.pageName, { exact: true }).first()).toBeVisible()
    expect(failures).toEqual([])
  })
}
