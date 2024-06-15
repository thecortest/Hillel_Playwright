import { test, expect } from '../../../fixtures/userGaragePageFixture';
import { GaragePage } from '../pages/garage.page';
import { BasePage } from '../pages/base-page';

let garagePage: GaragePage;
let basePage: BasePage;

test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page, '');
    garagePage = new GaragePage(page);
    basePage.openURL();
});
test.describe('Garage Tests', async () => {
    test('Click add car button', async ({}) => {
        await garagePage.assertGarageTitleIsPresent();
        await garagePage.clickAddCarButton();
        await garagePage.assertaddCarTitleModalIsPresent();
    });
});
