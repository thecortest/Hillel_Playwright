import { test } from '@playwright/test';

test.only('Intercept Profile request', async ({ page }) => {
    const responseObj = {
        status: 'ok',
        data: {
            userId: 54336,
            photoFilename: 'default-user.png',
            name: 'TestVasa123',
            lastName: 'TestTestov456',
        },
    };

    await page.route('**/api/users/profile', (route) => {
        route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify(responseObj),
        });
    });

    await page.goto('https://qauto2.forstudy.space/panel/profile');

    const test = 3;
});
