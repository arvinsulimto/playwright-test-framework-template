import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

setDefaultTimeout(60000);

let page: Page;
let browser: Browser;
let context: BrowserContext;

Before(async function () {
    const headless = process.env.HEADLESS !== 'false';
    const videoDir = process.env.VIDEO_PATH || 'reports/videos';

    browser = await chromium.launch({ headless });
    context = await browser.newContext({
        recordVideo: {
            dir: videoDir,
            size: { width: 1280, height: 720 },
        },
    });
    page = await context.newPage();
});

After(async function ({ result, pickle }) {
    const screenshotDir = process.env.SCREENSHOT_PATH || 'reports/screenshots';

    if (result?.status === Status.FAILED) {
        const screenshotPath = `${screenshotDir}/${pickle.name}.png`;

        // Ensure directory exists
        fs.mkdirSync(screenshotDir, { recursive: true });

        const screenshot = await page.screenshot({
            path: screenshotPath,
            fullPage: true,
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
        if (videoPath && fs.existsSync(videoPath)) {
            const videoBuffer = fs.readFileSync(videoPath);
            this.attach(videoBuffer, 'video/webm');
        }
    } else {
        if (videoPath && fs.existsSync(videoPath)) {
            fs.unlinkSync(videoPath);
        }
    }

    await browser.close();
});

export { page };