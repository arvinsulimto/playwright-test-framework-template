import { Page, Locator, expect, Keyboard, Mouse } from '@playwright/test';
import { PageLocators } from '../../types/locator.types';

import { 
    BasePageInterface
} from '../../types/page.types';

export abstract class BasePage implements BasePageInterface {
    public page: Page;
    protected locators: PageLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = {};
    }

    abstract getLocators(): PageLocators;

    protected getLocatorValue(key: string): string {
        const locator = this.getLocators()[key];
        return typeof locator === 'string' ? locator : locator.value;
    }

    public async navigateTo(): Promise<void> {
        const baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
        await this.page.goto(baseUrl);
    }
} 