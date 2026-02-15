import { Before, After, World } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';




let page: Page;
let browser: Browser;
let context: BrowserContext;

Before(async function () {
  const headless = process.env.HEADLESS === 'true';

  browser = await chromium.launch({ headless: headless });
  context = await browser.newContext();
  page = await context.newPage();
});

After(async function () {
  await page.close();
  await context.close();
  await browser.close();
});

export { page };