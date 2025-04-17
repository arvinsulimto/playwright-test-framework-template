import { Page } from '@playwright/test';
import { IWaitStrategy } from '../types/page.types';
import { TimeoutError } from '../types/errors';
import { Logger } from './logger';

export class WaitStrategy implements IWaitStrategy {
    private page: Page;
    private logger: Logger;
    private timeout: number;

    constructor(page: Page, timeout: number = 30000) {
        this.page = page;
        this.logger = Logger.getInstance();
        this.timeout = timeout;
    }

    public async waitForElement(selector: string, state: 'visible' | 'hidden' | 'attached' | 'detached', timeout?: number): Promise<void> {
        try {
            this.logger.debug(`Waiting for element ${selector} to be ${state}`);
            await this.page.waitForSelector(selector, { state, timeout });
        } catch (error) {
            throw new TimeoutError(`Element ${selector} did not become ${state} within timeout`);
        }
    }

    public async waitForNetworkIdle(timeout?: number): Promise<void> {
        try {
            this.logger.debug('Waiting for network to be idle');
            await this.page.waitForLoadState('networkidle', { timeout });
        } catch (error) {
            throw new TimeoutError('Network did not become idle within timeout');
        }
    }

    public async waitForNavigation(timeout?: number): Promise<void> {
        try {
            this.logger.debug('Waiting for navigation to complete');
            await this.page.waitForLoadState('networkidle', { timeout });
        } catch (error) {
            throw new TimeoutError('Navigation did not complete within timeout');
        }
    }

    public static async waitForElementStatic(page: Page, selector: string, timeout: number = 5000): Promise<void> {
        await page.waitForSelector(selector, { timeout });
    }

    public static async waitForNavigationStatic(page: Page, timeout: number = 5000): Promise<void> {
        await page.waitForNavigation({ timeout });
    }
} 