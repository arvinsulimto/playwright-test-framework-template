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
- nvm (Node Version Manager) - recommended

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
│   ├── locators/           # Page element locators
│   │   └── login.locators.ts
│   ├── pages/              # Page Object Model
│   │   ├── base/          # Base page class
│   │   └── login.page.ts  # Login page implementation
│   ├── steps/             # Cucumber step definitions
│   │   └── login.steps.ts
│   ├── types/             # TypeScript type definitions
│   │   ├── custom-world.ts
│   │   ├── errors.ts
│   │   ├── locator.types.ts
│   │   └── page.types.ts
│   └── utils/             # Utility classes
│       ├── hooks.ts
│       ├── logger.ts
│       ├── page.factory.ts
│       └── wait.strategy.ts
├── cucumber.js            # Cucumber configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Writing Tests

### Feature Files

Feature files are written in Gherkin syntax. Example:
```gherkin
Feature: Login to Sauce Demo
    As a user
    I want to login to Sauce Demo
    So that I can access the application

    Scenario: Successful login with valid credentials
        Given I am on the login page
        When I login with username "standard_user" and password "secret_sauce"
        Then I should be logged in successfully
```

### Step Definitions

Step definitions map the Gherkin steps to TypeScript code. They are located in `src/steps/`.

Example (`src/steps/login.steps.ts`):
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/login.page';
import { page } from '../utils/hooks';

let loginPage: LoginPage;

Given('I am on the login page', async () => {
    // Instantiate page object with the global page from hooks
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
});

When('I login with username {string} and password {string}', async (username: string, password: string) => {
    await loginPage.login(username, password);
});
```

### Page Objects

Page objects follow the Page Object Model pattern:
```typescript
export class LoginPage extends BasePage {
    async login(username: string, password: string): Promise<void> {
        await this.page.fill(this.getLocators().usernameInput.value, username);
        await this.page.fill(this.getLocators().passwordInput.value, password);
        await this.page.click(this.getLocators().loginButton.value);
    }
}
```

## Running Tests

### Basic Test Run
```bash
npx cucumber-js
```

### Run with Specific Node Version
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm use 20 && npx cucumber-js
```
## Configuration

### Cucumber Configuration
Configure test settings in `cucumber.js`:
```javascript
module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['src/steps/*.ts', 'src/utils/hooks.ts'],
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
   - Keep page objects focused on page-specific functionality
   - Use the base page class for common functionality
   - Implement proper error handling

2. **Locators**
   - Use data-test attributes when possible
   - Keep locators in separate files
   - Add descriptions for better maintainability

3. **Step Definitions**
   - Keep steps reusable
   - Use proper parameter types
   - Implement proper error handling

4. **Test Organization**
   - Group related scenarios in feature files
   - Use tags for test categorization
   - Keep scenarios independent

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
