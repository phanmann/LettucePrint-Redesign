import { defineConfig, devices } from '@playwright/test'

const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL
const localPort = process.env.PLAYWRIGHT_PORT ?? '3100'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: externalBaseURL ?? `http://127.0.0.1:${localPort}`,
    trace: 'retain-on-failure',
  },
  webServer: externalBaseURL ? undefined : {
    command: `npm run dev -- --hostname 127.0.0.1 --port ${localPort}`,
    url: `http://127.0.0.1:${localPort}/services/packaging/custom-packaging`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['iPhone 13'], browserName: 'chromium' },
    },
    {
      name: 'tablet-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 820, height: 1180 } },
    },
  ],
})
