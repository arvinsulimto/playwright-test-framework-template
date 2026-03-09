import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { page } from '../support/hooks';

let inventoryPage: InventoryPage;

When('I sort the products by {string}', async (sortValue: string) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.sortProducts(sortValue);
});

Then('the products should be sorted by price from low to high', async () => {
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
});
