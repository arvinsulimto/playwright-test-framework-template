import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { page } from '../support/hooks';

let inventoryPage: InventoryPage;

Given('I am logged in as a standard user', async () => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage = new InventoryPage(page);
});

When('I sort the products by {string}', async (sortValue: string) => {
    await inventoryPage.sortProducts(sortValue);
});

Then('the products should be sorted by price from low to high', async () => {
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
});
