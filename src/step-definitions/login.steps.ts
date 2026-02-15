import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { page } from '../support/hooks';

let loginPage: LoginPage;

Given('I am on the login page', async () => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
});

When('I login with username {string} and password {string}', async (username: string, password: string) => {
    await loginPage.login(username, password);
});

Then('I should be logged in successfully', async () => {
    await expect(page).toHaveURL(/.*inventory.html/);
});

Then('I should see an error message {string}', async (expectedErrorMessage: string) => {
    await expect(loginPage.errorMessage).toContainText(expectedErrorMessage);
}); 