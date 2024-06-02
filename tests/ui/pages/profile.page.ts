import { type Locator, type Page, expect } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly title: Locator;
    readonly profileName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.panel-page_heading', { hasText: 'Profile' });
        this.profileName = page.locator('.profile_name');
    }

    async assertProfileTitleIsPresent() {
        await expect(this.title).toBeVisible();
    }

    async assertProfileNameIsCorrect() {
        await expect(this.profileName).toBeVisible();
    }
}
