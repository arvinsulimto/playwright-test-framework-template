# Playwright Test Framework with Cucumber

A modern test automation framework built with Playwright and Cucumber.js for web application testing, featuring comprehensive Allure reporting.

## Features

- 🎭 **Playwright** for reliable browser automation
- 🥒 **Cucumber.js** for BDD-style test writing
- 📝 **TypeScript** for type safety and better development experience
- 🏗️ **Page Object Model** design pattern with subpage navigation
- 📊 **Allure Reporting** with historical data and trend analysis
- 🔄 **GitHub Actions** workflow for CI and GitHub Pages deployment
- 🔧 **Easy configuration** via `.env` file
- 🧹 **ESLint + Prettier** for code quality and consistent formatting

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
├── .github/workflows/    # CI/CD workflows
├── features/             # Cucumber feature files
│   ├── login.feature     # Login test scenarios
│   └── cart.feature      # Cart test scenarios
├── reports/              # Test reports (Allure results, screenshots, videos)
├── src/
│   ├── pages/            # Page Object Model
│   │   ├── base/         # Base page with shared navigation
│   │   ├── login.page.ts
│   │   ├── inventory.page.ts
│   │   └── cart.page.ts
│   ├── step-definitions/ # Cucumber step definitions
│   └── support/          # Hooks (browser setup/teardown)
├── cucumber.js           # Cucumber configuration
├── eslint.config.mjs     # ESLint configuration
├── .prettierrc           # Prettier configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Configuration

Environment variables are managed in `.env`:

| Variable | Description | Default |
|---|---|---|
| `BASE_URL` | Application base URL | `https://www.saucedemo.com` |
| `HEADLESS` | Run browser in headless mode | `true` |
| `SLOW_MO` | Slow down operations (ms) | `0` |
| `DEFAULT_TIMEOUT` | Default action timeout (ms) | `30000` |
| `NAVIGATION_TIMEOUT` | Navigation timeout (ms) | `60000` |
| `REPORT_PATH` | Directory for report artifacts | `./reports` |
| `SCREENSHOT_PATH` | Directory for failure screenshots | `./reports/screenshots` |

## Running Tests

### Standard Test Run
Run all tests:
```bash
npm test
```
This command runs the tests, generates the Allure report, and hints how to view it.

### Specific Test Modes
- **Headed Mode** (browser visible):
  ```bash
  npm run test:headed
  ```
- **Parallel Execution**:
  ```bash
  npm run test:parallel
  ```
- **Debug Mode**:
  ```bash
  npm run test:debug
  ```
- **By Tag**:
  ```bash
  npm run test:smoke
  npm run test:regression
  ```

### CI Environment
The CI command ensures proper exit codes and silent report generation:
```bash
npm run test:ci
```

## Reporting

The framework uses **Allure Report** for visualization.

### Viewing Reports
To serve the latest report locally:
```bash
npm run report:open
```

### Cleaning Reports
To remove all generated report files (screenshots, videos, results, html report):
```bash
npm run clean
```

### GitHub Pages Integration
This repository is configured to automatically deploy Allure reports into **GitHub Pages**.
- **Actions Workflow**: Runs tests on every push to `main`/`master` and Pull Requests.
- **Deployment**: Deploys the report to the `gh-pages` branch.
- **Historical Data**: Maintains test history across runs for trend analysis.

**Setup**:
1. Ensure your repository has a `gh-pages` branch (create as orphan if missing).
2. Enable GitHub Pages in Repository Settings -> Pages, pointing to `gh-pages` branch / root.

## Code Quality

### Linting
```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
```

### Formatting
```bash
npm run format        # Format all source files
```

## Writing Tests

### Feature Files
Located in `features/`, written in Gherkin syntax.
```gherkin
Feature: Login to Sauce Demo
    Scenario: Successful login
        Given I am on the login page
        When I login with valid credentials
        Then I should be logged in
```

### Page Objects
Located in `src/pages/`. Follows the Page Object Model pattern with per-page `path` navigation.
```typescript
export class LoginPage extends BasePage {
    protected path = '/';

    readonly usernameInput = this.page.locator('[data-test="username"]');
    // ... actions
}
```

## Best Practices

1. **Page Objects**: Keep them focused on interactions and locators. No assertions inside POs.
2. **Step Definitions**: Handle business logic and assertions (`expect`).
3. **Locators**: Prefer `data-test` attributes for resilience.
4. **Hooks**: Use `src/support/hooks.ts` for setup/teardown (browser launch, video recording configuration).
5. **Paths**: Set `protected path` in each page object for proper subpage navigation.
