const fs = require('fs');
const { defineConfig, devices } = require('@playwright/test');
const localChromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : '50%',
  timeout: 60 * 1000,
  expect: {
    timeout: 15 * 1000
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.onliner.by',
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
    viewport: { width: 1440, height: 900 },
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: fs.existsSync(localChromePath)
          ? { executablePath: localChromePath }
          : undefined
      }
    }
  ]
});
