import { Before, After, World } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';
import { CustomWorld } from '../types/custom-world';
import { PageFactory } from './page.factory';


let page: Page;
let browser: Browser;
let context: BrowserContext;

Before(async function (this: World & CustomWorld) {
  const headless = process.env.HEADLESS === 'true';

  browser = await chromium.launch({ headless: headless });
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  this.pageFactory = PageFactory.getInstance(page);
  this.getPage = function<T>(pageClass: new (page: Page) => T): T {
    return this.pageFactory.getPage(pageClass);
  };
});

After(async function () {
  await page.close();
  await context.close();
  await browser.close();
});

export { page };