# Playwright Test Framework with Cucumber

A modern test automation framework built with Playwright and Cucumber.js for web application testing, featuring comprehensive Allure reporting and AI agent integration capabilities.

## Features

- 🎭 **Playwright** for reliable browser automation
- 🥒 **Cucumber.js** for BDD-style test writing
- 📝 **TypeScript** for type safety and better development experience
- 🏗️ **Page Object Model** design pattern
- 📊 **Allure Reporting** with historical data and trend analysis
- 🔄 **GitHub Actions** workflow for CI and GitHub Pages deployment
- 🔧 **Easy configuration** management

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
│   └── login.feature     # Login test scenarios
├── reports/              # Test reports (Allure results and report)
├── src/
│   ├── pages/            # Page Object Model
│   ├── step-definitions/ # Cucumber step definitions
│   └── support/          # Utility classes, hooks, and types
├── cucumber.js           # Cucumber configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Running Tests

### Standard Test Run
Run all tests:
```bash
npm test
```
This command runs the tests, generates the Allure report, and hints how to view it.

### Specific Test Modes
- **Headless Mode** (Default is headed):
  ```bash
  HEADLESS=true npm test
  ```
- **Headed Mode**:
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

## GitHub Actions Workflow

The CI/CD pipeline is defined in `.github/workflows/playwright.yml`.

### Workflow Structure
The workflow consists of a single job `test` with the following steps:
1. **Checkout Code**: Fetches the repository.
2. **Setup Node**: Installs Node.js (v20).
3. **Install Dependencies**: Runs `npm ci`.
4. **Install Browsers**: Installs Playwright browsers.
5. **Run Tests**: Executes `npm run test:ci`.
6. **Generate Report**: Uses `simple-elf/allure-report-action` to generate history.
7. **Deploy**: Pushes the report to `gh-pages` branch.

### Configuration
You can customize the workflow by editing `.github/workflows/playwright.yml`:

- **Triggers**: By default, it runs on `push` and `pull_request` to `main`/`master`.
  ```yaml
  on:
    push:
      branches: [ main, master ]
    schedule:
      - cron: '0 0 * * *' # Run daily at midnight
  ```

- **Environment Variables**: Add secrets or env vars if needed.
  ```yaml
  env:
    BASE_URL: ${{ secrets.BASE_URL }}
    HEADLESS: true
  ```


## MCP Server (Model Context Protocol)

This framework includes an MCP server that allows AI agents to interact with the test suite.

### Starting the Server
```bash
npm run mcp:start
```
This starts a Stdio server that agents can connect to for discovering and running tests programmatically.

## Writing Tests

### Feature Files
Located in `features/`. written in Gherkin syntax.
```gherkin
Feature: Login to Sauce Demo
    Scenario: Successful login
        Given I am on the login page
        When I login with valid credentials
        Then I should be logged in
```

### Page Objects
Located in `src/pages/`. Follows the Page Object Model pattern.
```typescript
export class LoginPage extends BasePage {
    readonly usernameInput = this.page.locator('[data-test="username"]');
    // ... actions
}
```

## Best Practices

1. **Page Objects**: Keep them focused on interactions and locators. No assertions inside POs.
2. **Step Definitions**: handle business logic and assertions (`expect`).
3. **Locators**: Prefer `data-test` attributes for resilience.
4. **Hooks**: Use `src/support/hooks.ts` for setup/teardown (browser launch, video recording configuration).
