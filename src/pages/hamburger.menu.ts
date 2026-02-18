import { Page, Locator } from '@playwright/test';

export class HamburgerMenu {
    readonly page: Page;
    readonly openButton: Locator;
    readonly inventoryLink: Locator;
    readonly aboutLink: Locator;
    readonly logoutLink: Locator;
    readonly resetLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openButton = page.locator('#react-burger-menu-btn');
        this.inventoryLink = page.locator('#inventory_sidebar_link');
        this.aboutLink = page.locator('#about_sidebar_link');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.resetLink = page.locator('#reset_sidebar_link');
    }

    async open(): Promise<void> {
        await this.openButton.click();
    }

    async clickAbout(): Promise<void> {
        await this.aboutLink.click();
    }
}
