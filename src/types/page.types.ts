import { Page } from '@playwright/test';
import { PageLocators } from './locator.types';

export interface IPageState {
    getCurrentUrl(): Promise<string>;
    getTitle(): Promise<string>;
    isPageLoaded(): Promise<boolean>;
}

export interface IWaitStrategy {
    waitForElement(selector: string, state: 'visible' | 'hidden', timeout?: number): Promise<void>;
    waitForNetworkIdle(timeout?: number): Promise<void>;
    waitForNavigation(timeout?: number): Promise<void>;
}

export interface ILogger {
    info(message: string): void;
    error(message: string, error?: Error): void;
    debug(message: string): void;
}

export interface IPageFactory {
    createPage<T extends BasePageInterface>(pageClass: new (page: Page) => T): T;
}

export interface BasePageInterface {
    page: Page;
    getLocators(): PageLocators;
    navigateTo(): Promise<void>;
    waitForPageLoad(timeout?: number): Promise<void>;
} 