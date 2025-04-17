import { Page } from '@playwright/test';

export class PageFactory {
    private static instance: PageFactory;
    private page: Page;
    private pageInstances: Map<new (page: Page) => any, any> = new Map();

    private constructor(page: Page) {
        this.page = page;
    }

    public static getInstance(page: Page): PageFactory {
        if (!PageFactory.instance) {
            PageFactory.instance = new PageFactory(page);
        }
        return PageFactory.instance;
    }

    public getPage<T>(pageClass: new (page: Page) => T): T {
        if (!this.pageInstances.has(pageClass)) {
            this.pageInstances.set(pageClass, new pageClass(this.page));
        }
        return this.pageInstances.get(pageClass);
    }
} 