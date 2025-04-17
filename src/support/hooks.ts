import { Before, After, World } from '@cucumber/cucumber';
import { chromium, Page } from '@playwright/test';
import { CustomWorld } from '../types/custom-world';
import { PageFactory } from '../utils/page.factory';
let page: Page;

Before(async function (this: World & CustomWorld) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  this.pageFactory = PageFactory.getInstance(page);
  this.getPage = function<T>(pageClass: new (page: Page) => T): T {
    return this.pageFactory.getPage(pageClass);
  };
});

After(async function () {
  await page.close();
});

export { page }; 