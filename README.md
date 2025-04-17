# Playwright Test Framework with Cucumber

A modern test automation framework using Playwright and Cucumber.js for end-to-end testing.

## Project Structure

```
playwright-test-framework-template/
├── features/                    # Cucumber feature files
│   └── login.feature           # Login feature scenarios
├── src/
│   ├── config/                 # Configuration files
│   │   └── config.manager.ts   # Environment configuration manager
│   ├── locators/               # Page locators
│   │   ├── login.locators.ts   # Login page locators
│   │   └── shared.locators.ts  # Shared locators
│   ├── pages/                  # Page objects
│   │   ├── auth/              # Authentication pages
│   │   │   └── login.page.ts  # Login page implementation
│   │   ├── base/              # Base page classes
│   │   │   └── base.page.ts   # Base page implementation
│   │   └── page.factory.ts    # Page factory for page object management
│   ├── steps/                  # Step definitions
│   │   └── login.steps.ts     # Login step implementations
│   ├── support/               # Test support files
│   │   └── hooks.ts          # Cucumber hooks
│   ├── types/                # TypeScript type definitions
│   │   ├── custom-world.ts   # Custom Cucumber world
│   │   ├── locator.types.ts  # Locator type definitions
│   │   └── page.types.ts     # Page type definitions
│   └── utils/                # Utility classes
│       ├── logger.ts         # Logging utility
│       ├── locator.factory.ts # Locator factory
│       └── wait.strategy.ts  # Wait strategy implementation
├── .env                      # Environment variables
├── package.json              # Project dependencies
└── tsconfig.json            # TypeScript configuration
```

## Features

- **Modern Testing Stack**: Uses Playwright for browser automation and Cucumber.js for BDD
- **Type Safety**: Full TypeScript support with strict type checking
- **Page Object Model**: Clean and maintainable page object implementation
- **Locator Management**: Centralized locator management with type safety
- **Configuration**: Environment-based configuration using dotenv
- **Logging**: Built-in logging utility for test debugging

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Update environment variables as needed

3. **Run Tests**
   ```bash
   # Run all tests
   npm test

   # Run tests in headed mode
   npm run test:headed

   # Run specific feature
   npm run test:login
   ```

## Writing Tests

1. **Feature Files**
   ```gherkin
   Feature: Login Functionality
     As a user
     I want to login to the application
     So that I can access my account

     Scenario: Login with admin credentials
       Given I am on the login page
       When I login with "admin" credentials
       Then I should see the login form
   ```

2. **Step Definitions**
   ```typescript
   Given('I am on the login page', async function (this: CustomWorld) {
     const loginPage = this.getPage(LoginPage);
     await loginPage.navigateToLoginPage();
   });
   ```

3. **Page Objects**
   ```typescript
   export class LoginPage extends BasePage {
     async login(username: string, password: string): Promise<void> {
       await this.enterUsername(username);
       await this.enterPassword(password);
       await this.clickLoginButton();
     }
   }
   ```

## Best Practices

1. **Locators**
   - Use data-testid attributes for selectors
   - Keep locators in separate files
   - Use type-safe locator definitions

2. **Page Objects**
   - Extend BasePage for common functionality
   - Keep page-specific logic in page classes
   - Use the page factory for page object management

3. **Step Definitions**
   - Keep steps focused and single-purpose
   - Use the CustomWorld for test context
   - Leverage page objects for actions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 