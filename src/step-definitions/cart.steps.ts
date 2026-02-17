import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { page } from '../support/hooks';

let inventoryPage: InventoryPage;
let cartPage: CartPage;

When('I add {string} to the cart', async (itemName: string) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(itemName);
});

Then('the cart badge should verify {string}', async (count: string) => {
    await expect(inventoryPage.cartBadge).toHaveText(count);
});

Then('I should see {string} in the cart', async (itemName: string) => {
    await page.locator('.shopping_cart_link').click();

    cartPage = new CartPage(page);
    await expect(cartPage.cartItemName(itemName)).toBeVisible();
});
