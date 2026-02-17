import { Page } from '@playwright/test';

export abstract class BasePage {
    public page: Page;
    protected path: string = '/';

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateTo(): Promise<void> {
        const baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
        await this.page.goto(`${baseUrl}${this.path}`);
    }
} 