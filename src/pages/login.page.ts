import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';
import { loginLocators } from '../locators/login.locators';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    getLocators() {
        return loginLocators;
    }

    async navigateTo(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com');
        await this.waitStrategy.waitForNavigation();
    }

    async login(username: string, password: string): Promise<void> {
        await this.page.fill(this.getLocators().usernameInput.value, username);
        await this.page.fill(this.getLocators().passwordInput.value, password);
        await this.page.click(this.getLocators().loginButton.value);
    }

    async isErrorMessageVisible(): Promise<boolean> {
        return this.page.isVisible(this.getLocators().errorMessage.value);
    }

    async getErrorMessage(): Promise<string | null> {
        return this.page.textContent(this.getLocators().errorMessage.value);
    }
} 