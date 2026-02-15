import { Before, After, World } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';
import { CustomWorld } from '../types/custom-world';



let page: Page;
let browser: Browser;
let context: BrowserContext;

Before(async function (this: World & CustomWorld) {
  const headless = process.env.HEADLESS === 'true';

  browser = await chromium.launch({ headless: headless });
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
});

After(async function () {
  await page.close();
  await context.close();
  await browser.close();
});

export { page };