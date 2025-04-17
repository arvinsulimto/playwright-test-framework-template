import { Before, After } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
export let page: Page;

Before(async () => {
    browser = await chromium.launch({
        headless: false
    });
    context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    page = await context.newPage();
});

After(async () => {
    await page.close();
    await context.close();
    await browser.close();
}); 