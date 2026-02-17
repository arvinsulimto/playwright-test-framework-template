import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';

export class LoginPage extends BasePage {
    protected path = '/';

    readonly usernameInput = this.page.locator('[data-test="username"]');
    readonly passwordInput = this.page.locator('[data-test="password"]');
    readonly loginButton = this.page.locator('[data-test="login-button"]');
    readonly errorMessage = this.page.locator('[data-test="error"]');

    constructor(page: Page) {
        super(page);
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
} 