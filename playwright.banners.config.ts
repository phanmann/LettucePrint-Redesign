import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
  testDir: './tests', testMatch: 'banner-pricing.spec.ts',
  outputDir: './launch/lp-banners-20261009/test-results',
  use: { baseURL: process.env.BANNER_PREVIEW_URL ?? 'http://127.0.0.1:3110', screenshot:'only-on-failure' },
  projects: [
    {name:'desktop',use:{...devices['Desktop Chrome']}},
    {name:'mobile',use:{...devices['iPhone 13'],defaultBrowserType:'chromium'}},
  ],
})
