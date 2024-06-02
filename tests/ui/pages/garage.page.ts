import { type Locator, type Page, expect } from '@playwright/test';

export class GaragePage {
    readonly page: Page;
    readonly title: Locator;
    readonly garageMainPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.garageMainPage = page.locator('app-garage');
        this.title = this.garageMainPage.locator('div.panel-page_heading', { hasText: 'Garage' });
    }

    async assertGarageTitleIsPresent() {
        await expect(this.title).toBeVisible();
    }
}
