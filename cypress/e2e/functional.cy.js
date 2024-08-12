// Import the TextBoxPage class to interact with the elements on the page
import TextBoxPage from '../support/pages/TextBoxPage';

// Import user data from a fixture file
import { userData } from '../fixtures/userData';

describe('Functional Tests For Text Box Page', () => {
    // Visit the Text Box page before each test
    beforeEach(() => {
        TextBoxPage.visit();
    });

    it('Verify that input fields have the correct types', () => {
        TextBoxPage.userName.should('have.attr', 'type', 'text');
        TextBoxPage.userEmail.should('have.attr', 'type', 'email');
        TextBoxPage.currentAddress.should('have.prop', 'tagName', 'TEXTAREA');
        TextBoxPage.permanentAddress.should('have.prop', 'tagName', 'TEXTAREA');
    });

    it('Verify that each textbox has a clear and accurate label', () => {
        TextBoxPage.userNameLabel.should('have.text', 'Full Name');
        TextBoxPage.userEmailLabel.should('have.text', 'Email');
        TextBoxPage.currentAddressLabel.should('have.text', 'Current Address');
        TextBoxPage.permanentAddressLabel.should('have.text', 'Permanent Address');
    });

    it('Display placeholder text for fields', () => {
        TextBoxPage.userName.should('have.attr', 'placeholder', 'Full Name');
        TextBoxPage.userEmail.should('have.attr', 'placeholder', 'name@example.com');
        TextBoxPage.currentAddress.should('have.attr', 'placeholder', 'Current Address');
        TextBoxPage.permanentAddress.should('not.have.attr', 'placeholder');
    });

    it('Verify that clicking the submit button displays the correct values below the button', () => {
        // Fill out the form with data from the fixture
        TextBoxPage.userName.type(userData.fullName);
        TextBoxPage.userEmail.type(userData.email);
        TextBoxPage.currentAddress.type(userData.currentAddress);
        TextBoxPage.permanentAddress.type(userData.permanentAddress);

        // Submit the form
        TextBoxPage.submitButton.click();

        // Verify that the output matches the input data
        TextBoxPage.nameOutput.should('have.text', `Name:${userData.fullName}`);
        TextBoxPage.emailOutput.should('have.text', `Email:${userData.email}`);

        // The following assertions may fail due to extra spaces or special characters:
        // Use `include.text` instead of `have.text` to handle those cases.
        TextBoxPage.currentAddressOutput.should('have.text', `Current Address :${userData.currentAddress}`);
        TextBoxPage.permanentAddressOutput.should('have.text', `Permanent Address :${userData.permanentAddress}`);

        // To handle potential issues with trailing spaces or special characters, use:
        // TextBoxPage.currentAddressOutput.should('include.text', 'Current Address :${userData.currentAddress}');

        // will be failure according to the existed bug: expected '<p#permanentAddress.mb-1>' to contain text 'Permanent Address :456 Elm St', but the text was 'Permananet Address :456 Elm St'
        // TextBoxPage.permanentAddressOutput.should('include.text', 'Permanent Address :${userData.permanentAddress}');

    });

    it('Verify that clicking the submit button displays the correct values for only Full Name and Email below the button', () => {
        // Fill out only the 'Full Name' and 'Email' fields
        TextBoxPage.userName.type(userData.fullName);
        TextBoxPage.userEmail.type(userData.email);
        TextBoxPage.submitButton.click();

        // Verify that only the name and email outputs are displayed
        TextBoxPage.nameOutput.should('have.text', `Name:${userData.fullName}`);
        TextBoxPage.emailOutput.should('have.text', `Email:${userData.email}`);
        TextBoxPage.currentAddressOutput.should('not.exist');
        TextBoxPage.permanentAddressOutput.should('not.exist');
    });

    it('Verify that no data is displayed after submission if all fields are empty', () => {
        // Submit the form without entering any data
        TextBoxPage.submitButton.click();

        // Verify that no output is displayed
        TextBoxPage.nameOutput.should('not.exist');
        TextBoxPage.emailOutput.should('not.exist');
        TextBoxPage.currentAddressOutput.should('not.exist');
        TextBoxPage.permanentAddressOutput.should('not.exist');
    });

    it('Accept valid email addresses and reject invalid formats', () => {
        const validEmails = [
            'test@example.com',
            'user.name@domain.co',
            'user_name123@sub.domain.com',
            'USER@domain.ua'
        ];

        // Test each valid email
        validEmails.forEach(email => {
            TextBoxPage.userEmail.clear().type(email);
            TextBoxPage.submitButton.click();
            TextBoxPage.emailOutput.should('have.text', `Email:${email}`);
        });

        // Reload the page to reset the form
        cy.reload();

        const invalidEmails = [
            'plainaddress',
            '@missingusername.com',
            'user@.com',
            'user@domain..com',
            'user@domain.c',
            'test@#$%^&*()_+',
            '🙂😎🚀'
        ];

        // Test each invalid email
        invalidEmails.forEach(email => {
            TextBoxPage.userEmail.clear().type(email);
            TextBoxPage.submitButton.click();
            TextBoxPage.emailOutput.should('not.exist');
            TextBoxPage.userEmail.should('have.value', email);
        });
    });

    it('Verify that submission form contains long data in all fields except email', () => {
        // Generate long strings for name and address
        const longName = 'a'.repeat(50);
        const longAddress = 'a'.repeat(200);

        // Fill out the form with long data and verify that it handles the input correctly
        TextBoxPage.userName.type(longName).should('have.value', longName.substring(0, 50));
        TextBoxPage.currentAddress.type(longAddress).should('have.value', longAddress.substring(0, 200));
        TextBoxPage.permanentAddress.type(longAddress).should('have.value', longAddress.substring(0, 200));
        TextBoxPage.submitButton.click();

        // Verify that the output matches the expected truncated values
        TextBoxPage.nameOutput.should('include.text', `${longName.substring(0, 50)}`);
        TextBoxPage.currentAddressOutput.should('include.text', `${longAddress.substring(0, 200)}`);
        TextBoxPage.permanentAddressOutput.should('include.text', `${longAddress.substring(0, 200)}`);
    });

    it('Verify that submission form contains special characters in all fields except email', () => {
        const specialChars = [
            'áéíóúüñ',
            '@#$%^&*()_+',
            '你好',
            'مرحبا',
            '🙂😎🚀'
        ];

        // Test each special character string in the form fields
        specialChars.forEach(chars => {
            TextBoxPage.userName.clear().type(chars);
            TextBoxPage.currentAddress.clear().type(chars);
            TextBoxPage.permanentAddress.clear().type(chars);
            TextBoxPage.submitButton.click();

            // Verify that the output contains the special characters
            TextBoxPage.nameOutput.should('include.text', `${chars}`);
            TextBoxPage.currentAddressOutput.should('include.text', `${chars}`);
            TextBoxPage.permanentAddressOutput.should('include.text', `${chars}`);
        });
    });
});
