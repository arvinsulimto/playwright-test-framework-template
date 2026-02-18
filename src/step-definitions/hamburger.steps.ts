import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../support/hooks';
import { InventoryPage } from '../pages/inventory.page';

let inventoryPage: InventoryPage;

When('I click the hamburger menu', async () => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.hamburgerMenu.open();
});

Then('I should see the hamburger menu', async () => {
    await expect(inventoryPage.hamburgerMenu.inventoryLink).toBeVisible();
    await expect(inventoryPage.hamburgerMenu.aboutLink).toBeVisible();
    await expect(inventoryPage.hamburgerMenu.logoutLink).toBeVisible();
    await expect(inventoryPage.hamburgerMenu.resetLink).toBeVisible();
});

When('I click the about link', async () => {
    await inventoryPage.hamburgerMenu.clickAbout();
});

Then('I should land in about page', async () => {
    await expect(page).toHaveURL('https://saucelabs.com/');
});