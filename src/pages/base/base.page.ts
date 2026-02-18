import { Page } from '@playwright/test';
import { HamburgerMenu } from '../hamburger.menu';

export abstract class BasePage {
    public page: Page;
    protected path: string = '/';

    public hamburgerMenu: HamburgerMenu;

    constructor(page: Page) {
        this.page = page;
        this.hamburgerMenu = new HamburgerMenu(page);
    }

    public async navigateTo(): Promise<void> {
        const baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
        await this.page.goto(`${baseUrl}${this.path}`);
    }
} 