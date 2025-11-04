import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e', // directory for E2E tests
  timeout: 30 * 1000, // 30 seconds per test
  webServer: {
    command: 'pnpm start',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  expect: { timeout: 5000 }, // wait time for assertions
  fullyParallel: true, // run tests in parallel
  reporter: [['list'], ['html']], // console + HTML report
  use: {
    headless: true, // run in headless mode
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000, // max wait per action
    baseURL: 'http://localhost:3000', // your dev server
    trace: 'on-first-retry', // trace for debugging failing tests
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          env: { HOME: '/root' }, // ✅ Fix for Firefox permission issue
        },
      },
    },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
