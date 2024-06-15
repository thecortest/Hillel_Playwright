import { defineConfig, devices } from '@playwright/test';
import path from 'path';
export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');
require('dotenv').config();

module.exports = defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html', { open: 'never' }]],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        baseURL: process.env.BASE_URL,
        httpCredentials: {
            username: process.env.HTTP_CREDENTIALS_USERNAME,
            password: process.env.HTTP_CREDENTIALS_PASSWORD,
        },
        /*Headless mode*/
        headless: !!process.env.CI,
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },
    timeout: 15000,
    /* Configure projects for major browsers */
    projects: [
        {
            // to run the global-setup file and store login state
            name: 'setup',
            testMatch: 'tests/setup/*.setup.ts',
        },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: STORAGE_STATE,
            },
            //testMatch: 'tests/ui/specs/**/*.spec.ts',
            dependencies: ['setup'],
            testMatch: 'tests/ui/specs/*.spec.ts',
        },

        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },

        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],
});
