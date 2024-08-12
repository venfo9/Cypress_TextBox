class TextBoxPage {
    visit() {
        cy.visit('https://demoqa.com/text-box');
    }

    get userName() {
        return cy.get('#userName');
    }

    get userEmail() {
        return cy.get('#userEmail');
    }

    get currentAddress() {
        return cy.get('#currentAddress');
    }

    get permanentAddress() {
        return cy.get('#permanentAddress');
    }

    get submitButton() {
        return cy.get('#submit');
    }

    get userNameLabel() {
        return cy.get('#userName-label');
    }

    get userEmailLabel() {
        return cy.get('#userEmail-label');
    }

    get currentAddressLabel() {
        return cy.get('#currentAddress-label');
    }

    get permanentAddressLabel() {
        return cy.get('#permanentAddress-label');
    }

    get nameOutput() {
        return cy.get('#name');
    }

    get emailOutput() {
        return cy.get('#email');
    }

    get currentAddressOutput() {
        return cy.get('.border > #currentAddress');
    }

    get permanentAddressOutput() {
        return cy.get('.border > #permanentAddress');
    }
}

export default new TextBoxPage();
