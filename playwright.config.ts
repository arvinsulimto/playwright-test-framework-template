import { PlaywrightTestConfig } from '@playwright/test';
import * as path from 'path';

const config: PlaywrightTestConfig = {
    testDir: './features',
    testMatch: '*.feature',
    timeout: 30 * 1000,
    expect: {
        timeout: 5000
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: process.env.BASE_URL || 'https://www.tokopedia.com',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        bypassCSP: true,
        launchOptions: {
            args: [
                '--disable-http2',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security'
            ]
        },
        extraHTTPHeaders: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5'
        }
    },
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                headless: false,
                viewport: { width: 1280, height: 720 }
            }
        }
    ]
};

export default config; 