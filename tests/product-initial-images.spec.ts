import { test, expect } from '@playwright/test'

const groups = {
  banners: ['vinyl-banner', 'fabric-banner', 'mesh-banner'],
  backdrops: ['step-repeat-8x8', 'step-repeat-10x8'],
}

for (const [group, slugs] of Object.entries(groups)) {
  test(`${group}: CMS images render before client gallery requests`, async ({ page, request }) => {
    // A failed refresh must not replace a valid server-resolved image.
    await page.route('**/api/product-gallery?**', route => route.abort())
    const root = `/services/signage/${group}`
    const listing = await request.get(root)
    expect(listing.ok()).toBeTruthy()
    const html = await listing.text()
    for (const slug of slugs) {
      expect(html).toContain(`data-product-preview="${root}/${slug}" data-preview-source="sanity"`)
    }
    await page.goto(root)
    for (const slug of slugs) {
      const preview = page.locator(`[data-product-preview="${root}/${slug}"]`)
      await expect(preview).toHaveAttribute('data-preview-source', 'sanity')
      await expect(preview).toHaveAttribute('src', /cdn\.sanity\.io|cdn%2Fsanity|cdn\.sanity/)
    }
    for (const slug of slugs) {
      const path = `${root}/${slug}`
      const detail = await request.get(path)
      expect(detail.ok()).toBeTruthy()
      expect(await detail.text()).toContain(`data-product-gallery="${path}" data-gallery-source="sanity"`)
      await page.goto(root)
      await page.locator(`a[href="${path}"]`).first().click()
      await expect(page).toHaveURL(new RegExp(`${path}$`))
      const gallery = page.locator(`[data-product-gallery="${path}"]`)
      await expect(gallery).toHaveAttribute('data-gallery-source', 'sanity')
      const main = gallery.locator('img').first()
      await expect(main).toHaveAttribute('src', /cdn\.sanity\.io/)
      await expect.poll(() => main.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
    }
  })
}
