# Playwright Test Framework with Cucumber

A modern test automation framework built with Playwright and Cucumber.js for web application testing.

## Features

- 🎭 Playwright for reliable browser automation
- 🥒 Cucumber.js for BDD-style test writing
- 📝 TypeScript for type safety and better development experience
- 🏗️ Page Object Model design pattern
- 🔍 Custom locator management
- ⏱️ Configurable wait strategies
- 📊 Built-in logging system
- 🔧 Easy configuration management

## Prerequisites

- Node.js v20 or higher
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-test-framework-template
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Project Structure

```
├── features/                 # Cucumber feature files
│   └── login.feature        # Login test scenarios
├── src/
│   ├── pages/              # Page Object Model
│   │   ├── base/          # Base page class
│   │   └── login.page.ts  # Login page implementation
│   ├── step-definitions/  # Cucumber step definitions
│   │   └── login.steps.ts
│   └── support/           # Utility classes and types
│       ├── hooks.ts
│       └── locator.types.ts
├── cucumber.js            # Cucumber configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Writing Tests

### Feature Files

Feature files are written in Gherkin syntax. Example:
```gherkin
Feature: Login to Sauce Demo
    Scenario: Successful login with valid credentials
        Given I am on the login page
        When I login with username "standard_user" and password "secret_sauce"
        Then I should be logged in successfully
```

### Step Definitions

Step definitions map the Gherkin steps to TypeScript code. They are located in `src/step-definitions/`.

Example (`src/step-definitions/login.steps.ts`):
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { page } from '../support/hooks';

let loginPage: LoginPage;

Given('I am on the login page', async () => {
    // Instantiate page object with the global page from hooks
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
});

When('I login with username {string} and password {string}', async (username: string, password: string) => {
    await loginPage.login(username, password);
});

Then('I should be logged in successfully', async () => {
    await expect(page).toHaveURL(/.*inventory.html/);
});
```

### Page Objects

Page objects follow the Page Object Model pattern with inline locators:
```typescript
export class LoginPage extends BasePage {
    readonly usernameInput = this.page.locator('[data-test="username"]');
    readonly passwordInput = this.page.locator('[data-test="password"]');
    readonly loginButton = this.page.locator('[data-test="login-button"]');

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
```

## Running Tests

### Basic Test Run
```bash
npx cucumber-js
```

## Configuration

### Cucumber Configuration
Configure test settings in `cucumber.js`:
```javascript
module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['src/step-definitions/*.ts', 'src/support/hooks.ts'],
        paths: ['features/*.feature'],
        format: ['progress-bar'],
        timeout: 60000
    }
};
```

### Environment Configuration
Set environment variables in `.env` file:
```
BASE_URL=https://www.saucedemo.com
DEFAULT_TIMEOUT=30000
```

## Best Practices

1. **Page Objects**
   - Keep page objects focused on element interaction and navigation
   - **Do not** include assertions in Page Objects; return values or expose locators instead
   - Use `readonly` properties for locators for lazy evaluation and better readability
   - Use the base page class for shared context (like `page` fixture)

2. **Locators**
   - Use `data-test` attributes (e.g., `data-test="submit-button"`) for resilient selectors
   - Define locators as public `readonly` properties in Page Objects
   - Avoid generic selectors like `div > button`

3. **Step Definitions**
   - Keep steps focused on **User Intent** ("I login") rather than implementation details ("I click button")
   - Perform **Assertions** here using `expect`
   - Keep steps reusable and atomic

4. **Test Organization**
   - Step definitions should be in `src/step-definitions`
   - Feature files should be in `features/`
   - Tests should be independent and not rely on execution order
