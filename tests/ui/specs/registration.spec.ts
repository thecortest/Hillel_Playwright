import { test, expect } from '@playwright/test';

export function generateRandomEmail(): string {
    const userName = 'pw-thecortest' + Math.floor(Math.random() * 1000); // Generate random number from 0 to 1000 and add to "thecortest"
    const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Generate a random letter from a to z
    const domain = 'gmail.com';
    return `${userName}${randomLetter}@${domain}`;
}
const name = 'MyName';
const lastName = 'MySurname';
const userpassword = 'G123#rw9Kwsx';
const fullName = `${name} ${lastName}`;
const profileUrl = 'https://qauto2.forstudy.space/panel/profile';
const garageUrl = 'https://qauto2.forstudy.space/panel/garage';
const errorBorderColor = 'rgb(220, 53, 69)';

test.describe('Registration of new user suite', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    test('Register a new user valid test case', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const nameInput = modalSignUp.locator('input#signupName');
        const lastNameInput = modalSignUp.locator('input#signupLastName');
        const emailInput = modalSignUp.locator('input#signupEmail');
        const password = modalSignUp.locator('input#signupPassword');
        const repeatPassword = modalSignUp.locator('input#signupRepeatPassword');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        const profileName = page.locator('.profile_name');
        await signUpButton.click();
        await modalSignUp.waitFor();
        await nameInput.fill(name);
        await lastNameInput.fill(lastName);
        await emailInput.fill(generateRandomEmail());
        await password.fill(userpassword);
        await repeatPassword.fill(userpassword);
        await registerButton.click();
        await page.waitForURL('**/panel/garage');
        await expect(page).toHaveURL(garageUrl);
        await page.goto(profileUrl);
        await expect(profileName).toHaveText(fullName);
    });

    test('Register a new user with empty Name', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const nameInput = modalSignUp.locator('input#signupName');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await nameInput.fill('');
        await modalSignUp.click();
        await expect(invalidFeedback).toHaveText('Name required');
        await expect(registerButton).toBeDisabled();
        await expect(nameInput).toHaveCSS('border-color', errorBorderColor);
    });

    test('Register a new user with invalid and incorrect  Name', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const nameInput = modalSignUp.locator('input#signupName');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await nameInput.fill('1');
        await modalSignUp.click();
        await expect(invalidFeedback).toHaveText(/Name is invalid.*Name has to be from 2 to 20 characters long/);
        await expect(registerButton).toBeDisabled();
        await expect(nameInput).toHaveCSS('border-color', errorBorderColor);
    });

    test('Register a new user with empty Last name', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const lastNameInput = modalSignUp.locator('input#signupLastName');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await lastNameInput.fill('');
        await modalSignUp.click();
        await expect(invalidFeedback).toHaveText('Last name required');
        await expect(registerButton).toBeDisabled();
        await expect(lastNameInput).toHaveCSS('border-color', errorBorderColor);
    });

    test('Register a new user with incorrect and invalid Last name', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const lastNameInput = modalSignUp.locator('input#signupLastName');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await lastNameInput.fill('4');
        await modalSignUp.click();
        await page.waitForSelector('.invalid-feedback');
        await expect(invalidFeedback).toHaveText(
            /Last name is invalid.*Last name has to be from 2 to 20 characters long/,
        );
        await expect(registerButton).toBeDisabled();
        await expect(lastNameInput).toHaveCSS('border-color', errorBorderColor);
    });

    test('Register a new user with empty email', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const nameInput = modalSignUp.locator('input#signupName');
        const lastNameInput = modalSignUp.locator('input#signupLastName');
        const emailInput = modalSignUp.locator('input#signupEmail');
        const password = modalSignUp.locator('input#signupPassword');
        const repeatPassword = modalSignUp.locator('input#signupRepeatPassword');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const footer = modalSignUp.locator('.modal-footer');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await nameInput.fill(name);
        await lastNameInput.fill(lastName);
        await password.fill(userpassword);
        await repeatPassword.fill(userpassword);
        await emailInput.fill('');
        await footer.click();
        await page.waitForSelector('.invalid-feedback');
        await expect(invalidFeedback).toHaveText('Email required');
        await expect(registerButton).toBeDisabled();
        await expect(emailInput).toHaveCSS('border-color', errorBorderColor);
    });
    test('Register a new user with incorrect email', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const emailInput = modalSignUp.locator('input#signupEmail');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const footer = modalSignUp.locator('.modal-footer');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await emailInput.fill('test@email');
        await footer.click();
        await page.waitForSelector('.invalid-feedback');
        await expect(invalidFeedback).toHaveText('Email is incorrect');
        await expect(registerButton).toBeDisabled();
        await expect(emailInput).toHaveCSS('border-color', errorBorderColor);
    });
    test('Register a new user with empty password', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const password = modalSignUp.locator('input#signupPassword');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const footer = modalSignUp.locator('.modal-footer');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await password.fill('');
        await footer.click();
        await page.waitForSelector('.invalid-feedback');
        await expect(invalidFeedback).toHaveText('Password required');
        await expect(registerButton).toBeDisabled();
        await expect(password).toHaveCSS('border-color', errorBorderColor);
    });

    test('Register a new user with too short password', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const password = modalSignUp.locator('input#signupPassword');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const footer = modalSignUp.locator('.modal-footer');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await password.fill('12345Qw');
        await footer.click();
        await page.waitForSelector('.invalid-feedback');
        await expect(invalidFeedback).toHaveText(
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        await expect(registerButton).toBeDisabled();
        await expect(password).toHaveCSS('border-color', errorBorderColor);
    });

    test('Register a new user with too long password', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const password = modalSignUp.locator('input#signupPassword');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const footer = modalSignUp.locator('.modal-footer');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await password.fill('123456789012345Qa');
        await footer.click();
        await page.waitForSelector('.invalid-feedback');
        await expect(invalidFeedback).toHaveText(
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        await expect(registerButton).toBeDisabled();
        await expect(password).toHaveCSS('border-color', errorBorderColor);
    });

    test('Register a new user with password that does not contain capital letter', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const password = modalSignUp.locator('input#signupPassword');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const footer = modalSignUp.locator('.modal-footer');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await password.fill('1234567890123wa');
        await footer.click();
        await page.waitForSelector('.invalid-feedback');
        await expect(invalidFeedback).toHaveText(
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        await expect(registerButton).toBeDisabled();
        await expect(password).toHaveCSS('border-color', errorBorderColor);
    });

    test('Register a new user with password that does not contain small letter', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const password = modalSignUp.locator('input#signupPassword');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const footer = modalSignUp.locator('.modal-footer');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await password.fill('1234567890123QW');
        await footer.click();
        await page.waitForSelector('.invalid-feedback');
        await expect(invalidFeedback).toHaveText(
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        await expect(registerButton).toBeDisabled();
        await expect(password).toHaveCSS('border-color', errorBorderColor);
    });

    test('Register a new user with password that does not contain integers', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const password = modalSignUp.locator('input#signupPassword');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const footer = modalSignUp.locator('.modal-footer');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await password.fill('qwertyuiopasdF');
        await footer.click();
        await page.waitForSelector('.invalid-feedback');
        await expect(invalidFeedback).toHaveText(
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        await expect(registerButton).toBeDisabled();
        await expect(password).toHaveCSS('border-color', errorBorderColor);
    });

    test('Register a new user with empty repeat password', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const password = modalSignUp.locator('input#signupPassword');
        const repeatPassword = modalSignUp.locator('input#signupRepeatPassword');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const footer = modalSignUp.locator('.modal-footer');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await password.fill(userpassword);
        await repeatPassword.fill('');
        await footer.click();
        await page.waitForSelector('.invalid-feedback');
        await expect(invalidFeedback).toHaveText('Re-enter password required');
        await expect(registerButton).toBeDisabled();
        await expect(password).toHaveCSS('border-color', errorBorderColor);
    });

    test('Register a new user if passwords do not match', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const password = modalSignUp.locator('input#signupPassword');
        const repeatPassword = modalSignUp.locator('input#signupRepeatPassword');
        const invalidFeedback = modalSignUp.locator('.invalid-feedback');
        const footer = modalSignUp.locator('.modal-footer');
        const registerButton = modalSignUp.locator('button', { hasText: 'Register' });
        await signUpButton.click();
        await modalSignUp.waitFor();
        await password.fill(userpassword);
        await repeatPassword.fill('qwer12346AQWSDE');
        await footer.click();
        await page.waitForSelector('.invalid-feedback');
        await expect(invalidFeedback).toHaveText('Passwords do not match');
        await expect(registerButton).toBeDisabled();
        await expect(password).toHaveCSS('border-color', errorBorderColor);
    });

    test('Check Register modal can be closed', async ({ page }) => {
        const signUpButton = page.locator('button', { hasText: 'Sign up' });
        const modalSignUp = page.locator('.modal-dialog');
        const closeButton = modalSignUp.locator('.close');
        await signUpButton.click();
        await modalSignUp.waitFor();
        await closeButton.click();
        await expect(signUpButton).toBeVisible();
    });
});
