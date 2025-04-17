import { Page, Locator, expect, Keyboard, Mouse } from '@playwright/test';
import { PageLocators, LocatorType } from '../../types/locator.types';
import { ConfigManager } from '../../config/config.manager';
import { 
    IBasePage, 
    IElementInteractions, 
    IElementState, 
    IKeyboardInteractions, 
    IElementContent,
    IPageState,
    BasePageInterface
} from '../../types/page.types';
import { Logger } from '../../utils/logger';
import { WaitStrategy } from '../../utils/wait.strategy';
import { 
    ElementNotFoundError, 
    ElementNotVisibleError, 
    NavigationError, 
    TimeoutError 
} from '../../types/errors';

const config = ConfigManager.getInstance();

export abstract class BasePage implements BasePageInterface {
    public page: Page;
    protected locators: PageLocators;
    protected keyboard: Keyboard;
    protected mouse: Mouse;
    protected defaultTimeout: number;
    protected logger: Logger;
    protected waitStrategy: WaitStrategy;
    protected config: ConfigManager;

    constructor(page: Page) {
        this.page = page;
        this.locators = {};
        this.keyboard = page.keyboard;
        this.mouse = page.mouse;
        this.defaultTimeout = config.getNumber('DEFAULT_TIMEOUT');
        this.logger = Logger.getInstance();
        this.waitStrategy = new WaitStrategy(page);
        this.config = ConfigManager.getInstance();
    }

    abstract getLocators(): PageLocators;

    protected getLocatorValue(key: string): string {
        const locator = this.getLocators()[key];
        return typeof locator === 'string' ? locator : locator.value;
    }

    /**
     * Get a locator for the specified selector
     * @param selector - CSS or XPath selector
     * @returns Promise<Locator>
     */
    public async getElement(selector: string): Promise<Locator> {
        try {
            return this.page.locator(selector);
        } catch (error) {
            throw new Error(`Failed to get element with selector: ${selector}. Error: ${error}`);
        }
    }

    /**
     * Wait for page to be fully loaded
     * @param timeout - Optional timeout in milliseconds
     */
    public async waitForPageLoad(timeout?: number): Promise<void> {
        try {
            await this.waitStrategy.waitForNetworkIdle(timeout);
        } catch (error) {
            this.logger.error('Failed to wait for page load', error as Error);
            throw error;
        }
    }

    /**
     * Click on an element with retry mechanism
     * @param selector - CSS or XPath selector
     * @param retries - Number of retry attempts
     */
    public async click(selector: string, retries: number = 3): Promise<void> {
        for (let i = 0; i < retries; i++) {
            try {
                this.logger.debug(`Clicking element: ${selector} (attempt ${i + 1}/${retries})`);
                await this.page.click(selector);
                return;
            } catch (error) {
                if (i === retries - 1) {
                    this.logger.error(`Failed to click element ${selector} after ${retries} attempts`, error as Error);
                    throw new ElementNotFoundError(selector);
                }
                await this.page.waitForTimeout(1000);
            }
        }
    }

    /**
     * Fill an input field with value
     * @param selector - CSS or XPath selector
     * @param value - Value to fill
     */
    public async fill(selector: string, value: string): Promise<void> {
        try {
            this.logger.debug(`Filling element ${selector} with value: ${value}`);
            await this.page.fill(selector, value);
        } catch (error) {
            this.logger.error(`Failed to fill element ${selector}`, error as Error);
            throw new ElementNotFoundError(selector);
        }
    }

    /**
     * Check if element is visible
     * @param selector - CSS or XPath selector
     * @param timeout - Optional timeout in milliseconds
     */
    public async isVisible(selector: string, timeout?: number): Promise<boolean> {
        try {
            return await this.page.locator(selector).isVisible({ timeout: timeout || this.defaultTimeout });
        } catch (error) {
            return false;
        }
    }

    /**
     * Get text content of an element
     * @param selector - CSS or XPath selector
     */
    public async getText(selector: string): Promise<string> {
        try {
            const text = await this.page.locator(selector).textContent();
            return text || '';
        } catch (error) {
            this.logger.error(`Failed to get text from element ${selector}`, error as Error);
            throw new ElementNotFoundError(selector);
        }
    }

    /**
     * Navigate to a URL
     * @param url - URL to navigate to
     */
    public async navigateTo(): Promise<void> {
        try {
            await this.logger.info(`Navigating to ${this.config.get('BASE_URL') || 'https://www.tokopedia.com/'}`);
            await this.page.goto(this.config.get('BASE_URL') || 'https://www.tokopedia.com/');
            await this.waitStrategy.waitForNavigation();
        } catch (error) {
            this.logger.error(`Failed to navigate to ${this.config.get('BASE_URL') || 'https://www.tokopedia.com/'}`, error as Error);
            throw new NavigationError(`Failed to navigate: ${error}`);
        }
    }

    /**
     * Verify element contains expected text
     * @param selector - CSS or XPath selector
     * @param expectedText - Expected text content
     */
    public async shouldContainText(selector: string, expectedText: string): Promise<void> {
        try {
            await expect(this.page.locator(selector)).toContainText(expectedText);
        } catch (error) {
            this.logger.error(`Element ${selector} does not contain text "${expectedText}"`, error as Error);
            throw error;
        }
    }

    /**
     * Wait for element to be visible
     * @param selector - CSS or XPath selector
     * @param timeout - Optional timeout in milliseconds
     */
    public async waitForVisible(selector: string, timeout?: number): Promise<void> {
        try {
            await this.waitStrategy.waitForElement(selector, 'visible', timeout);
        } catch (error) {
            throw new ElementNotVisibleError(selector);
        }
    }

    /**
     * Press a key on the keyboard
     * @param key - Key to press
     */
    public async pressKey(key: string): Promise<void> {
        try {
            this.logger.debug(`Pressing key: ${key}`);
            await this.keyboard.press(key);
        } catch (error) {
            this.logger.error(`Failed to press key ${key}`, error as Error);
            throw error;
        }
    }

    /**
     * Type text using keyboard
     * @param text - Text to type
     */
    public async type(text: string): Promise<void> {
        try {
            this.logger.debug(`Typing text: ${text}`);
            await this.keyboard.type(text);
        } catch (error) {
            this.logger.error(`Failed to type text "${text}"`, error as Error);
            throw error;
        }
    }

    /**
     * Take a screenshot
     * @param name - Name of the screenshot file
     */
    public async takeScreenshot(name: string): Promise<void> {
        try {
            this.logger.debug(`Taking screenshot: ${name}`);
            await this.page.screenshot({ path: `${config.get('SCREENSHOT_PATH')}/${name}.png` });
        } catch (error) {
            this.logger.error(`Failed to take screenshot ${name}`, error as Error);
            throw error;
        }
    }

    /**
     * Hover over an element
     * @param selector - CSS or XPath selector
     */
    public async hover(selector: string): Promise<void> {
        try {
            this.logger.debug(`Hovering over element: ${selector}`);
            await this.page.locator(selector).hover();
        } catch (error) {
            this.logger.error(`Failed to hover over element ${selector}`, error as Error);
            throw new ElementNotFoundError(selector);
        }
    }

    /**
     * Double click on an element
     * @param selector - CSS or XPath selector
     */
    public async doubleClick(selector: string): Promise<void> {
        try {
            this.logger.debug(`Double clicking element: ${selector}`);
            await this.page.locator(selector).dblclick();
        } catch (error) {
            this.logger.error(`Failed to double click element ${selector}`, error as Error);
            throw new ElementNotFoundError(selector);
        }
    }

    /**
     * Select an option from a dropdown
     * @param selector - CSS or XPath selector
     * @param value - Value to select
     */
    public async selectOption(selector: string, value: string): Promise<void> {
        try {
            this.logger.debug(`Selecting option ${value} from element: ${selector}`);
            await this.page.selectOption(selector, value);
        } catch (error) {
            this.logger.error(`Failed to select option from element ${selector}`, error as Error);
            throw new ElementNotFoundError(selector);
        }
    }

    /**
     * Check if element is enabled
     * @param selector - CSS or XPath selector
     */
    public async isEnabled(selector: string): Promise<boolean> {
        try {
            return await this.page.locator(selector).isEnabled();
        } catch (error) {
            return false;
        }
    }

    /**
     * Wait for element to be hidden
     * @param selector - CSS or XPath selector
     * @param timeout - Optional timeout in milliseconds
     */
    public async waitForHidden(selector: string, timeout?: number): Promise<void> {
        try {
            await this.waitStrategy.waitForElement(selector, 'hidden', timeout);
        } catch (error) {
            throw new TimeoutError(`Element ${selector} did not become hidden`);
        }
    }

    // IPageState implementation
    public async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    public async getTitle(): Promise<string> {
        return this.page.title();
    }

    public async isPageLoaded(): Promise<boolean> {
        try {
            await this.waitForPageLoad(5000);
            return true;
        } catch {
            return false;
        }
    }
} 