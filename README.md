## Datacom-Framework: E2E Test Automation

This project is an End-to-End (E2E) Test Automation Framework designed to validate the Bugs Form on a QA practice environment.

It is built using Playwright for automation and TypeScript for robust, clean, and scalable development.

### Prerequisites

Absolutely! Here is the English version of the README.md for your Datacom-Framework project.

🚀 Datacom-Framework: E2E Test Automation
This project is an End-to-End (E2E) Test Automation Framework designed to validate the Bugs Form on a QA practice environment.

It is built using Playwright for automation and TypeScript for robust, clean, and scalable development.

### Prerequisites

Before you start, make sure you have the following installed:

- Node.js: Version 18 or higher.
- NPM: The Node.js package manager (included with Node.js).
- Git: To clone the repository.

### Installation

1. Clone the repository

```
git clone https://github.com/crafjer01/Datacom-framework.git

cd Datacom-framework
```

2. Install dependencies

Install all necessary packages from package.json, including Playwright, Allure, and TypeScript.

```
npm install
```

3. Install Playwright browsers

```
npx playwright install
```

### Running Tests

The project uses NPM scripts for easy execution of tests and generation of reports.

#### Run all tests

Executes all tests in the ./tests folder in headless mode (without opening the browser) and generates Allure results.

```
npm test
```

#### Run tests with the User Interface (UI Mode)

Opens the Playwright graphical interface to view, debug, and run tests interactively.

```
npm run test:ui
```

#### Run a specific test file

You can run a single test file by passing the path after npm run test --.

```
npm run test -- tests/bugs-form.spec.ts
```

### Allure Reports

To view the Playwright reports using the Allure format, follow these steps.

#### Generate the report.

```
npm run allure:generate
```

#### Open the report in the browser

```
npm run allure:open
```

### Key Playwright Configuration

The playwright.config.ts file is configured with

- Dual Reporting: Generates a local HTML report and the necessary results for Allure.

- Retries: Tests will be retried 2 times only in Continuous Integration (CI) environments.

- Trace Viewer: Browser traces are collected on failed retries (on-first-retry) for easier debugging.

- Browser: By default, tests are executed on the Chromium browser.

### Author

Carlos Pineda
