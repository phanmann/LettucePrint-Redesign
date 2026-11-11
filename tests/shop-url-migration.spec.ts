import { validateDtgQuote } from '../src/lib/dtg-quote'
import { validateEmbroideryQuote } from '../src/lib/embroidery-quote'
import { test, expect } from '@playwright/test'
import { toShopPath, legacyServicePath } from '../src/lib/shop-paths'

test('normalization preserves queries and does not rewrite unrelated paths', () => {
  expect(toShopPath('/services/signage/banners?size=large#details')).toBe('/shop/signage/banners?size=large#details')
  expect(toShopPath('/services-extra')).toBe('/services-extra')
  expect(legacyServicePath('/shop/stickers')).toBeUndefined()
  expect(legacyServicePath('/shop/packaging/mylar-bags')).toBe('/services/packaging/mylar-bags')
})

test('legacy aliases preserve destination, query and fragment', async ({ request }) => {
  for (const [path, target] of [
    ['/services', '/shop'],
    ['/services/marketing-materials/flyers/tabloid', '/shop/marketing-materials/flyers/full-page?size=tabloid'],
    ['/services/marketing-materials/posters', '/shop/marketing-materials/flyers#posters'],
    ['/services/marketing-materials/booklets', '/shop/marketing-materials/brochures#booklets'],
    ['/services/packaging/boxes', '/shop/packaging'],
    ['/services/apparel/dtf?ref=old', '/shop/apparel/dtf?ref=old'],
  ]) {
    const response = await request.get(path, { maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(response.headers().location).toBe(target)
  }
})

test('gallery aliases return the same existing CMS artwork', async ({ request }) => {
  for (const path of ['/marketing-materials/business-cards/standard', '/signage/banners/retractable-tabletop', '/packaging/mylar-bags/standard']) {
    const old = await request.get('/api/product-gallery?productPath='+encodeURIComponent('/services'+path))
    const current = await request.get('/api/product-gallery?productPath='+encodeURIComponent('/shop'+path))
    expect(old.ok()).toBeTruthy(); expect(current.ok()).toBeTruthy()
    const gallery = await current.json()
    expect(gallery?.images?.length).toBeGreaterThan(0)
    expect(gallery).toEqual(await old.json())
  }
})

for (const width of [390, 1440]) {
  test(`new URLs, images, canonicals and links ${width}px`, async ({ page }) => {
    await page.setViewportSize({width,height:900})
    for (const path of ['/shop/marketing-materials/business-cards/standard', '/shop/packaging/mylar-bags/standard', '/shop/signage/banners/retractable-standard', '/shop/stickers/die-cut']) {
      await page.goto(path)
      await expect(page.locator('h1')).toBeVisible()
      expect(await page.locator('a[href^="/services"]').count()).toBe(0)
      expect(await page.locator('link[rel="canonical"]').getAttribute('href')).not.toContain('/services')
      await expect(page.locator('img[src*="cdn.sanity.io"]').first()).toBeVisible()
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
    }
  })
}

test('legacy saved cart survives and remains quote-only for backdrops', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lp_cart_v3',JSON.stringify([{id:'migration-test',product:'Premium Step and Repeat',size:'10 x 8 ft',qty:1,material:'Fabric',finish:'Standard',rush:'Standard',totalCents:12500,totalFormatted:'$125.00',productPath:'/services/signage/backdrops/premium-step-repeat',addedAt:1}])))
  await page.goto('/cart')
  await expect(page.getByText('Premium Step and Repeat',{exact:true})).toBeVisible()
  await expect(page.getByRole('link',{name:/Request a Quote/i})).toBeVisible()
  const items = await page.evaluate(()=>JSON.parse(localStorage.getItem('lp_cart_v3')!))
  expect(items[0].productPath).toBe('/shop/signage/backdrops/premium-step-repeat')
  expect(items[0].totalCents).toBe(12500)
})

test('sitemap uses new URLs without duplicate shop entry', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  const xml = await response.text()
  expect(xml).not.toContain('/services')
  const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g), match=>match[1])
  expect(new Set(urls).size).toBe(urls.length)
  expect(urls).toContain('https://lettuceprint.com/shop/apparel/dtf')
})

test('already-open DTG and embroidery forms accept legacy sources', async () => {
  const common = { garmentType:'Hoodies', quantity:'48',garmentSource:'Lettuce Print supplies garments',garmentColor:'Black',locations:[{placement:'Front',approximateSize:'10x10'}],notes:'',inHandsDate:'2026-12-01',shippingZip:'11222',contact:{name:'QA',company:'',email:'qa@example.com',phone:'9175550198'},artworkLocations:[] }
  const dtg = validateDtgQuote({...common,formType:'dtg',service:'DTG Printing',source:'/services/apparel/dtg'})
  expect(dtg.success).toBe(true)
  if(dtg.success) expect(dtg.data.source).toBe('/shop/apparel/dtg')
  const embroidery = validateEmbroideryQuote({...common,garmentType:'Hoodie',formType:'embroidery',service:'Embroidery',source:'/services/apparel/embroidery'})
  expect(embroidery.success).toBe(true)
  if(embroidery.success) expect(embroidery.data.source).toBe('/shop/apparel/embroidery')
})
