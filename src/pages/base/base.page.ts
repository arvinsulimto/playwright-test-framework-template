import { Page, expect } from '@playwright/test';

export abstract class BasePage {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateTo(): Promise<void> {
        const baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
        await this.page.goto(baseUrl);
    }
} 