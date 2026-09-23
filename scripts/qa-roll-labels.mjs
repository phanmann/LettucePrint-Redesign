import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const baseUrl = process.env.ROLL_LABEL_BASE_URL ?? 'http://127.0.0.1:62005'
const outputDir = process.env.ROLL_LABEL_ARTIFACT_DIR ?? '/Users/phanman/.openclaw/workspace/artifacts/roll-labels-first-pass'
const widths = [1440, 1280, 768, 390, 360]
const skipScreenshots = process.env.ROLL_LABEL_SKIP_SCREENSHOTS === '1'
const results = []
const runtimeErrors = []

function watchRuntime(page, label) {
  page.on('pageerror', error => runtimeErrors.push(`${label} pageerror: ${error.message}`))
  page.on('console', message => {
    if (message.type() === 'error') runtimeErrors.push(`${label} console: ${message.text()}`)
  })
}

function check(condition, name, details = '') {
  if (!condition) throw new Error(`${name}${details ? `: ${details}` : ''}`)
  results.push(`PASS ${name}${details ? ` — ${details}` : ''}`)
}

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true })

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 })
    watchRuntime(page, `${width}px landing`)
    await page.goto(`${baseUrl}/lp/roll-labels`, { waitUntil: 'networkidle' })
    const wordmark = page.locator('nav img[src="/images/logos/LP_Logos_Wordmark-Green.svg"]')
    check(await wordmark.isVisible(), `canonical wordmark visible at ${width}px`)
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }))
    check(dimensions.scrollWidth <= dimensions.clientWidth, `no horizontal overflow at ${width}px`, JSON.stringify(dimensions))
    if (!skipScreenshots) {
      const screenshotPath = path.join(outputDir, `roll-labels-${width}.png`)
      await page.screenshot({ path: screenshotPath, fullPage: true })
      results.push(`CAPTURE ${screenshotPath}`)
    }
    await page.close()
  }

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
  watchRuntime(page, 'interaction')
  await page.goto(`${baseUrl}/lp/roll-labels`, { waitUntil: 'networkidle' })

  check(await page.getByText('Upload your artwork in the cart before payment. Need help with your file? Contact us before ordering.', { exact: true }).isVisible(), 'landing page states actual artwork workflow')
  check(await page.locator('summary').filter({ hasText: 'What artwork works best?' }).count() === 1, 'artwork FAQ is present')

  const heroPricingCta = page.locator('section').first().getByRole('link', { name: 'Get Instant Pricing' })
  await heroPricingCta.click()
  await page.waitForFunction(() => location.hash === '#pricing')
  const pricingTop = await page.locator('#pricing').evaluate((el) => el.getBoundingClientRect().top)
  check(pricingTop >= 0 && pricingTop < 180, 'pricing CTA anchors visible configurator', `top=${Math.round(pricingTop)}px`)

  const helpLink = page.getByRole('link', { name: 'Help me choose' }).first()
  await Promise.all([
    page.waitForURL('**/get-quote?**'),
    helpLink.click(),
  ])
  await page.waitForLoadState('networkidle')
  const helpUrl = new URL(page.url())
  check(helpUrl.pathname === '/get-quote', 'Help me choose opens quote route', helpUrl.pathname)
  check(helpUrl.searchParams.get('product') === 'roll-labels' && helpUrl.searchParams.get('source') === 'lp-roll-labels', 'quote route retains roll-label context', helpUrl.search)
  const stickersService = page.getByRole('button', { name: /Stickers & Labels/ })
  check((await stickersService.getAttribute('aria-pressed')) === 'true', 'quote form visibly preselects Stickers & Labels')
  check(await page.getByRole('status').getByText(/Roll labels selected/).isVisible(), 'quote form displays roll-label context')
  await page.getByRole('button', { name: /Continue/ }).click()
  check((await page.locator('select').inputValue()) === 'Not sure', 'roll-label material help is safely prefilled')
  check((await page.locator('textarea').inputValue()).includes('Custom roll labels'), 'roll-label project context is safely prefilled')

  await page.goto(`${baseUrl}/get-quote`, { waitUntil: 'networkidle' })
  check(await page.getByRole('status').count() === 0, 'ordinary quote route has no campaign context')
  check(await page.getByRole('button', { name: /Continue/ }).isDisabled(), 'ordinary quote route remains unselected')

  await page.goto(`${baseUrl}/get-quote?service=stickers-labels&product=other&details=do-not-copy`, { waitUntil: 'networkidle' })
  check(await page.getByRole('status').count() === 0, 'unrecognized query context is ignored')
  check(await page.getByRole('button', { name: /Continue/ }).isDisabled(), 'arbitrary query values do not preselect the form')

  await page.goto(`${baseUrl}/lp/roll-labels#pricing`, { waitUntil: 'networkidle' })
  await page.getByLabel('Width (W)').fill('3')
  await page.getByLabel('Length (L)').fill('2')
  await page.getByRole('button', { name: /1,000 —/ }).click()
  await page.getByRole('button', { name: /5,000.*\$728\.48/ }).click()
  await page.getByText('$728.48', { exact: true }).first().waitFor()
  check(await page.getByText('$728.48', { exact: true }).first().isVisible(), '5,000 3x2 standard matte configuration shows canonical price', '$728.48')

  const byHand = page.getByRole('button', { name: /By hand/ })
  check((await byHand.getAttribute('aria-pressed')) === 'true', 'hand application is valid default')

  await page.getByRole('button', { name: /With a machine/ }).click()
  const addToCart = page.getByRole('button', { name: 'Add to cart' })
  check(await addToCart.isDisabled(), 'machine application requires unwind edge')
  await page.getByRole('button', { name: /Top first/ }).click()
  await page.getByRole('button', { name: /Face inside/ }).click()
  check(!(await addToCart.isDisabled()), 'complete machine direction enables purchase')

  await addToCart.click()
  await Promise.all([
    page.waitForURL('**/cart'),
    page.getByRole('button', { name: 'View cart' }).click(),
  ])
  await page.waitForLoadState('networkidle')
  check(new URL(page.url()).pathname === '/cart', 'View cart opens cart')
  check(await page.getByText('Custom Roll Labels', { exact: true }).isVisible(), 'cart displays roll-label product')
  check(await page.getByText(/Machine applied — Top edge first, face inside/).isVisible(), 'cart displays machine direction')
  check(await page.getByText('$728.48', { exact: true }).first().isVisible(), 'cart displays canonical configured price', '$728.48')
  check(await page.getByText(/Upload artwork for 1 item before checking out/).isVisible(), 'cart displays required artwork warning')
  check(await page.getByRole('button', { name: /Proceed to payment/ }).isDisabled(), 'cart blocks payment until artwork is attached')

  const cartOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)
  check(cartOverflow, 'cart has no horizontal overflow at 1280px')
  check(runtimeErrors.length === 0, 'no browser console or page errors', runtimeErrors.join(' | '))
  await page.close()
} finally {
  await browser.close()
}

console.log(results.join('\n'))
