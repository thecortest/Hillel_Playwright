// import { test as garage } from '@playwright/test';
// import { GaragePage } from '../tests/ui/pages/garage.page';

// type MyFixtures = {
//     garagePage: GaragePage;
// };

// export const test = garage.extend<MyFixtures>({
//     storageState: 'playwright/.auth/user.json',

//     garagePage: async ({ page }, use) => {
//         const garagePage = new GaragePage(page);
//         await garagePage.page.goto('https://qauto2.forstudy.space/');

//         await use(garagePage);
//     },
// });
// export { expect } from '@playwright/test';

import { test as garage } from '@playwright/test';
import { GaragePage } from '../tests/ui/pages/garage.page';
export { expect } from '@playwright/test';
import path from 'path';
export const STORAGE_STATE = path.join(__dirname, '../playwright/.auth/user.json');

type MyFixtures = {
    garagePage: GaragePage;
};

export const test = garage.extend<MyFixtures>({
    storageState: STORAGE_STATE,

    garagePage: async ({ page }, use) => {
        console.log('in test MyFixtures');
        const garagePage = new GaragePage(page);
        await garagePage.page.goto('https://qauto2.forstudy.space/');
        await use(garagePage);
    },
});
