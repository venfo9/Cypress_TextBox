// Import the TextBoxPage class to access page elements and methods
import TextBoxPage from '../support/pages/TextBoxPage';

// Import user data from a fixture file
import { userData } from '../fixtures/userData';

// Array of viewports to test responsiveness across different screen sizes
const viewports = [
    { name: 'Desktop', width: 1280, height: 800 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 }
];

describe('Responsive Tests For Text Box Page', () => {
    // Before each test, visit the Text Box page
    beforeEach(() => {
        TextBoxPage.visit();
    });

    // Iterate over each viewport to test the form's responsiveness
    viewports.forEach(viewport => {
        it(`Display the form correctly on ${viewport.name}`, () => {
            // Set the viewport to the current size
            cy.viewport(viewport.width, viewport.height);

            // Assert that all input fields and labels are visible
            TextBoxPage.userName.should('be.visible');
            TextBoxPage.userEmail.should('be.visible');
            TextBoxPage.currentAddress.should('be.visible');
            TextBoxPage.permanentAddress.should('be.visible');
            TextBoxPage.submitButton.should('be.visible');

            TextBoxPage.userNameLabel.should('be.visible');
            TextBoxPage.userEmailLabel.should('be.visible');
            TextBoxPage.currentAddressLabel.should('be.visible');
            TextBoxPage.permanentAddressLabel.should('be.visible');

            // Fill out the form with data from the userData fixture
            TextBoxPage.userName.type(userData.fullName);
            TextBoxPage.userEmail.type(userData.email);
            TextBoxPage.currentAddress.type(userData.currentAddress);
            TextBoxPage.permanentAddress.type(userData.permanentAddress);
            TextBoxPage.submitButton.click();

            // Assert that the submitted data is displayed correctly
            TextBoxPage.nameOutput.should('include.text', `${userData.fullName}`);
            TextBoxPage.emailOutput.should('include.text', `${userData.email}`);
            TextBoxPage.currentAddressOutput.should('include.text', `${userData.currentAddress}`);
            TextBoxPage.permanentAddressOutput.should('include.text', `${userData.permanentAddress}`);
        });
    });
});
