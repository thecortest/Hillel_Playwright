// import { expect, test as setup } from '@playwright/test';

// const authFile = 'playwright/.auth/user.json';

// setup('authenticate', async ({ page }) => {
//     await page.goto('https://qauto2.forstudy.space/');
//     await page.locator('.btn.header_signin').click();
//     await page.locator('[id=signinEmail]').fill('test12Qz@test.com');
//     await page.locator('[id=signinPassword]').fill('Qasdfr56nTGH3#4');
//     await page.locator('.modal-footer .btn-primary').click();
//     await expect(page).toHaveURL(/.*garage/);

//     await page.context().storageState({ path: authFile });
// });

import { expect, test as setup } from '@playwright/test';
import path from 'path';
export const STORAGE_STATE = path.join(__dirname, '../../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    await page.goto('https://qauto2.forstudy.space/');
    await page.locator('.btn.header_signin').click();
    await page.locator('[id=signinEmail]').fill('test12Qz12222@test.com');
    await page.locator('[id=signinPassword]').fill('Qasdfr56nTGH3#4');
    await page.locator('.modal-footer .btn-primary').click();
    await expect(page).toHaveURL(/.*garage/);

    await page.context().storageState({ path: STORAGE_STATE });
});
