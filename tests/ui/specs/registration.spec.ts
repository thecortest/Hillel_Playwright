import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/registration-page';
import { BasePage } from '../pages/base-page';
import { ProfilePage } from '../pages/profile.page';
import { GaragePage } from '../pages/garage.page';
import userData from '../../commons/data/user-data';
import * as utils from '../../commons/utils/general-util';

let registrationPage: RegistrationPage;
let basePage: BasePage;
let profilePage: ProfilePage;
let garagePage: GaragePage;

const errorBorderColor = 'rgb(220, 53, 69)';

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session

test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    basePage = new BasePage(page, '');
    garagePage = new GaragePage(page);
    basePage.openURL();
});

test.describe('Registeration suite', () => {
    test('Register a new user and check Garage title is shown', async () => {
        await registrationPage.doRegistration(
            userData.name,
            userData.lastName,
            utils.generateRandomEmail(),
            userData.password,
            userData.password,
        );
        await garagePage.assertGarageTitleIsPresent();
    });
});

test('Register a new user with empty Name', async ({}) => {
    const expectedMessage = 'Name required';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.nameTextBox, '');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.nameTextBox, errorBorderColor);
});

test('Register a new user with invalid and incorrect  Name', async ({}) => {
    const expectedMessage = 'Name is invalidName has to be from 2 to 20 characters long';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.nameTextBox, '4');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.nameTextBox, errorBorderColor);
});

test('Register a new user with empty Last name', async ({}) => {
    const expectedMessage = 'Last name required';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.lastNameTextBox, '');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.lastNameTextBox, errorBorderColor);
});

test('Register a new user with incorrect and invalid Last name', async ({}) => {
    const expectedMessage = 'Last name is invalidLast name has to be from 2 to 20 characters long';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.lastNameTextBox, '4');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.lastNameTextBox, errorBorderColor);
});

test('Register a new user with empty email', async ({}) => {
    const expectedMessage = 'Email required';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.emailTextBox, '');
    await registrationPage.clickFooter();
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.emailTextBox, errorBorderColor);
});

test('Register a new user with incorrect email', async ({}) => {
    const expectedMessage = 'Email is incorrect';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.emailTextBox, 'test@email');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.emailTextBox, errorBorderColor);
});

test('Register a new user with empty password', async ({}) => {
    const expectedMessage = 'Password required';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.passwordTextBox, '');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.passwordTextBox, errorBorderColor);
});

test('Register a new user with too short password', async ({}) => {
    const expectedMessage =
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.passwordTextBox, '12345Qw');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.passwordTextBox, errorBorderColor);
});

test('Register a new user with too long password', async ({}) => {
    const expectedMessage =
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.passwordTextBox, '123456789012345Qa');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.passwordTextBox, errorBorderColor);
});

test('Register a new user with password that does not contain capital letter', async ({}) => {
    const expectedMessage =
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.passwordTextBox, '1234567890123wa');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.passwordTextBox, errorBorderColor);
});

test('Register a new user with password that does not contain small letter', async ({}) => {
    const expectedMessage =
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.passwordTextBox, '1234567890123QW');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.passwordTextBox, errorBorderColor);
});

test('Register a new user with password that does not contain integers', async ({}) => {
    const expectedMessage =
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.passwordTextBox, 'qwertyuiopasdF');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.passwordTextBox, errorBorderColor);
    //will fail there is a bug that pswrd w/o integrers is treated as valid
});

test('Register a new user with empty repeat password', async ({}) => {
    const expectedMessage = 'Re-enter password required';
    await registrationPage.openModalWithFillValueInLocator(registrationPage.repeatPasswordTextBox, '');
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.repeatPasswordTextBox, errorBorderColor);
});

test('Register a new user if passwords do not match', async ({}) => {
    const expectedMessage = 'Passwords do not match';
    await registrationPage.clickSignUpButton();
    await registrationPage.fillPassword(userData.password);
    // await page.pause();
    await registrationPage.fillRepeatPassword('qwer12346AQWSDE');
    await registrationPage.clickFooter();
    await registrationPage.assertErrorMessageIsPresent();
    await registrationPage.assertErrorMessage(expectedMessage);
    await registrationPage.assertRegisterButtonIsDisabled();
    await registrationPage.assertErrorBorderColor(registrationPage.repeatPasswordTextBox, errorBorderColor);
});

test('Check Register modal can be closed', async ({}) => {
    await registrationPage.clickSignUpButton();
    await registrationPage.clickCloseButton();
    await registrationPage.assertSignUpButtonIsVisible();
});
