import { Page, expect } from '@playwright/test';
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
        await super.navigateTo();
    }

    async login(username: string, password: string): Promise<void> {
        await this.fill(this.getLocators().usernameInput.value, username);
        await this.fill(this.getLocators().passwordInput.value, password);
        await this.click(this.getLocators().loginButton.value);
    }


    async verifyLoginSuccess(): Promise<void> {
        
        await expect(this.page).toHaveURL(/inventory\.html/);
    }

    async verifyErrorMessage(expectedMessage: string): Promise<void> {
        await this.shouldContainText(this.getLocators().errorMessage.value, expectedMessage);
    }
} 