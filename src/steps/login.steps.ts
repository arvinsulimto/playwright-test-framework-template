import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { page } from '../utils/hooks';

let loginPage: LoginPage;

Given('I am on the login page', async () => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
});

When('I login with username {string} and password {string}', async (username: string, password: string) => {
    await loginPage.login(username, password);
});

Then('I should be logged in successfully', async () => {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

Then('I should see an error message {string}', async (expectedErrorMessage: string) => {
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const actualErrorMessage = await loginPage.getErrorMessage();
    expect(actualErrorMessage).toBe(expectedErrorMessage);
}); 