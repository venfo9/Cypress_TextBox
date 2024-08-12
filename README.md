# Cypress Testing Project

This repository contains a Cypress testing suite for automated testing of the forms on the [DemoQA](https://demoqa.com/text-box) website. The tests ensure that the form behaves as expected across different viewports, verifies form validation, and checks the correct display of input fields and outputs.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Descriptions](#test-descriptions)

## Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/venfo9/Cypress_TextBox.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Cypress_TextBox
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Project Structure

```plaintext
Cypress_TextBox/
│
├── cypress/
│   ├── e2e/
│   │   ├── functional.cy.js   # Test file for functional tests
│   │   └── viewports.cy.js     # Test file for responsiveness across different viewports
│   ├── fixtures/
│   │   └── userData.json      # Sample user data for form input
│   ├── support/
│   │   ├── pages/
│   │   │   └── TextBoxPage.js # Page Object Model for the Text Box form
│   │   └── commands.js        # Custom commands for Cypress
│   └── cypress.config.js      # Cypress configuration file
│
└── README.md                  # Project documentation
```

## Running Tests

You can run the tests in the Cypress Test Runner:

1. Open Cypress:
    ```bash
    npx cypress open
    ```
2. Select the test file you want to run (e.g., `functional.spec.js`).

Alternatively, you can run the tests in headless mode:

```bash
npx cypress run
```

### Running Specific Tests

To run a specific test file:

```bash
npx cypress run --spec "cypress/e2e/functional.spec.js"
```

## Test Descriptions

### Functional Tests (`functional.cy.js`)

The `functional.cy.js` file contains the main test suite that verifies the behavior of the Text Box form. The test scenarios include:

- **Input Field Types**: Ensures that the form fields have the correct types (e.g., text, email, textarea).
- **Label Verification**: Checks that each textbox has a clear and accurate label.
- **Placeholder Text**: Confirms that the form fields display helpful placeholder text.
- **Form Submission**: Verifies that the form correctly displays the submitted data.
- **Email Validation**: Tests the acceptance of valid email addresses and rejection of invalid formats.
- **Long Data Handling**: Ensures that the form handles long input strings correctly.
- **Special Characters**: Validates that the form accepts and displays special characters in the fields.

### Responsive Tests (`viewports.cy.js`)

The `viewports.cy.js` file contains tests that verify the responsiveness of the Text Box form across different screen sizes. The test scenarios include:

- **Viewport Testing**: Checks the form’s layout and visibility on various devices, including Desktop (1280x800), Tablet (768x1024), and Mobile (375x667).
- **Form Submission Across Viewports**: Ensures that the form submits data correctly and displays the output properly on each device.

---

This README provides an overview of the project and instructions for setting up, running, and contributing to the Cypress test suite. Adjust the `git clone` URL, license information, and any other project-specific details as necessary.# Cypress_TextBox
