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

import { Status } from '@cucumber/cucumber';

After(async function ({ result, pickle }) {
  if (result?.status === Status.FAILED) {
    const screenshot = await page.screenshot({ 
      path: `./screenshots/${pickle.name}.png`, 
      fullPage: true 
    });
    this.attach(screenshot, 'image/png');
  }

  await page.close();
  await context.close();
  await browser.close();
});

export { page };