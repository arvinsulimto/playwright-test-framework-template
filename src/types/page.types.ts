import { Page, Locator } from '@playwright/test';
import { PageLocators } from './locator.types';

export interface IBasePage {
    waitForPageLoad(timeout?: number): Promise<void>;
    navigateTo(url: string): Promise<void>;
    takeScreenshot(name: string): Promise<void>;
}

export interface IElementInteractions {
    click(selector: string, retries?: number): Promise<void>;
    fill(selector: string, value: string): Promise<void>;
    hover(selector: string): Promise<void>;
    doubleClick(selector: string): Promise<void>;
    selectOption(selector: string, value: string): Promise<void>;
}

export interface IElementState {
    isVisible(selector: string, timeout?: number): Promise<boolean>;
    isEnabled(selector: string): Promise<boolean>;
    waitForVisible(selector: string, timeout?: number): Promise<void>;
    waitForHidden(selector: string, timeout?: number): Promise<void>;
}

export interface IKeyboardInteractions {
    pressKey(key: string): Promise<void>;
    type(text: string): Promise<void>;
}

export interface IElementContent {
    getText(selector: string): Promise<string>;
    shouldContainText(selector: string, expectedText: string): Promise<void>;
}

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
    createPage<T extends BasePage>(pageClass: new (page: Page) => T): T;
}

export interface BasePageInterface {
    page: Page;
    getLocators(): PageLocators;
    navigateTo(): Promise<void>;
    isVisible(selector: string, timeout?: number): Promise<boolean>;
    getText(selector: string): Promise<string>;
    click(selector: string, retries?: number): Promise<void>;
    fill(selector: string, value: string): Promise<void>;
    waitForVisible(selector: string, timeout?: number): Promise<void>;
    waitForPageLoad(timeout?: number): Promise<void>;
} 