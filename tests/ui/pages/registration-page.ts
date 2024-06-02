import { type Locator, type Page, expect } from '@playwright/test';

export class RegistrationPage {
    readonly page: Page;
    readonly signUpButton: Locator;
    readonly modalContent: Locator;
    readonly nameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly emailTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly repeatPasswordTextBox: Locator;
    readonly registerButton: Locator;
    readonly footer: Locator;
    readonly errorMessageLabel: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpButton = page.locator('button', { hasText: 'Sign up' });
        this.modalContent = page.locator('.modal-content');
        this.nameTextBox = this.modalContent.locator('input#signupName');
        this.lastNameTextBox = this.modalContent.locator('input#signupLastName');
        this.emailTextBox = this.modalContent.locator('input#signupEmail');
        this.passwordTextBox = this.modalContent.locator('input#signupPassword');
        this.repeatPasswordTextBox = this.modalContent.locator('input#signupRepeatPassword');
        this.registerButton = this.modalContent.locator('button', { hasText: 'Register' });
        this.footer = this.modalContent.locator('.modal-footer');
        this.errorMessageLabel = this.modalContent.locator('.invalid-feedback');
        this.closeButton = this.modalContent.locator('.close');
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async doRegistration(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
        await this.signUpButton.click();
        await this.fillName(name);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillRepeatPassword(repeatPassword);
        await this.clickRegisterButton();
    }

    async fillName(name: string) {
        await this.nameTextBox.fill(name);
    }

    async fillLastName(lastName: string) {
        await this.lastNameTextBox.fill(lastName);
    }

    async fillEmail(email: string) {
        await this.emailTextBox.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordTextBox.fill(password);
    }

    async fillRepeatPassword(repeatPassword: string) {
        await this.repeatPasswordTextBox.fill(repeatPassword);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async clickModalContent() {
        await this.modalContent.click();
    }

    async assertErrorMessageIsPresent() {
        await expect(this.errorMessageLabel).toBeVisible();
    }

    async assertRegisterButtonIsDisabled() {
        await expect(this.registerButton).toBeDisabled();
    }

    async assertErrorBorderColor(locator: Locator, expectedColor: string) {
        await expect(locator).toHaveCSS('border-color', expectedColor);
    }

    async assertErrorMessage(expectedMessage: string) {
        await expect(this.errorMessageLabel).toHaveText(expectedMessage);
    }

    async openModalWithFillValueInLocator(locator: Locator, value: string) {
        await this.signUpButton.click();
        await locator.fill(value);
        await this.footer.click();
    }

    async clickFooter() {
        await this.footer.click();
    }

    async clickCloseButton() {
        await this.closeButton.click();
    }

    async assertSignUpButtonIsVisible() {
        await expect(this.signUpButton).toBeVisible();
    }
}
