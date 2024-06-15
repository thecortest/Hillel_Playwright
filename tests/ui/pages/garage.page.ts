import { type Locator, type Page, expect } from '@playwright/test';

export class GaragePage {
    readonly page: Page;
    readonly title: Locator;
    readonly garageMainPage: Locator;
    readonly addCarButton: Locator;
    readonly globalCarModal: Locator;
    readonly addCarTitleModal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.garageMainPage = page.locator('app-garage');
        this.title = this.garageMainPage.locator('div.panel-page_heading', { hasText: 'Garage' });
        this.addCarButton = this.garageMainPage.locator('button.btn.btn-primary', { hasText: 'Add car' });
        this.globalCarModal = this.page.locator('div.modal-content');
        this.addCarTitleModal = this.globalCarModal.locator('.modal-title', { hasText: 'Add a car' });
    }

    async assertGarageTitleIsPresent() {
        await expect(this.title).toBeVisible();
    }

    async clickAddCarButton() {
        await this.addCarButton.click();
    }

    async assertaddCarTitleModalIsPresent() {
        await expect(this.addCarTitleModal).toBeVisible();
    }
}
