import { Page } from '@playwright/test';
import { PageLocators } from './locator.types';

export interface IPageState {
    getCurrentUrl(): Promise<string>;
    getTitle(): Promise<string>;
    isPageLoaded(): Promise<boolean>;
}




export interface BasePageInterface {
    page: Page;
    getLocators(): PageLocators;
    navigateTo(): Promise<void>;
} 