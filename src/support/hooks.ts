import { Before, After, World, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';

setDefaultTimeout(60000);




let page: Page;
let browser: Browser;
let context: BrowserContext;

Before(async function () {
  const headless = process.env.HEADLESS === 'true';

  browser = await chromium.launch({ headless: headless });
  context = await browser.newContext({
    recordVideo: {
      dir: 'reports/videos/',
      size: { width: 1280, height: 720 },
    }
  });
  page = await context.newPage();
});

import { Status } from '@cucumber/cucumber';

After(async function ({ result, pickle }) {
  if (result?.status === Status.FAILED) {
    const screenshot = await page.screenshot({
      path: `./reports/screenshots/${pickle.name}.png`,
      fullPage: true
    });
    this.attach(screenshot, 'image/png');
  }

  let videoPath: string | null = null;
  const video = page.video();
  if (video) {
    videoPath = await video.path();
  }


  await page.close();
  await context.close();

  if (result?.status === Status.FAILED) {
    if (videoPath) {
      const fs = require('fs');
      if (fs.existsSync(videoPath)) {
        const videoBuffer = fs.readFileSync(videoPath);
        this.attach(videoBuffer, 'video/webm');
      }
    }
  } else {
    if (videoPath) {
      const fs = require('fs');
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }
    }
  }

  await browser.close();
});

export { page };