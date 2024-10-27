/// <reference types="cypress"/>

describe('Form elements', () => {

    beforeEach(() => {
        cy.visit('https://techglobal-training.com/frontend/project-1');
      });

      it('')

    it('Validate the Contact Us information', () => {

        const contactInfo = [ 'Contact Us', '2800 S River Rd Suite 310, Des Plaines, IL 60018', 'info@techglobalschool.com', '(224) 580-2150' ];

        cy.get('.mb-5').children().each(($el, index) => {
            cy.wrap($el).should('have.text', contactInfo[index]);
        });
    });

    it('Input field visible and required validation', () => {

        const required = [ 'have.attr', 'have.attr', 'not.have.attr', 'not.have.attr', 'not.have.attr', 'have.attr', 'not.have.attr', 'not.have.attr', 'have.attr' ];

        cy.get('.field input,.textarea').each(($el, index) => {
            cy.wrap($el).should('be.visible')
            .should(required[index], 'required');
        });
    });

    it('Label validation', () => {

        const label = ['Full name *', 'Gender *', 'Address', 'Email *', 'Phone', 'Message', ' I give my consent to be contacted.'];

        cy.get('.field > label,.control > .label,label.checkbox').each(($el, index) => {
            cy.wrap($el).should('have.text', label[index]);
        });
    });

    it('Placeholder validation', () => {
        
        const placeholder = [ 'Enter your full name', 'Enter your address', 'Enter your email', 'Enter your phone number', 'Type your message here...' ];

        cy.get('.field input:not([type="radio"],[type="checkbox"]),.textarea').each(($el, index) => {
            cy.wrap($el).should('have.attr', 'placeholder', placeholder[index]);
        });
    });

    const genders = [ 'Male', 'Female', 'Prefer not to disclose' ];

    it('Gender options validation', () => {

        cy.get('.radio').each(($el, index) => {
            cy.wrap($el).should('have.text', genders[index]);

        });

        cy.contains('.radio', 'Male').should('not.be.checked');
        

    });

    it('Radio buttons validation', () => { // How to check other radio buttons are unchecked when one is checked?

        cy.get('.radio>input').each(($el) => {
            cy.wrap($el).should('not.be.checked').click().should('be.checked');

            const uncheckedOptions = genders.filter(x => x !== $el);

            for(const gender of uncheckedOptions) {
                cy.contains('.radio', gender).should('not.be.checked');
            }
            
        });

    });

    it('Checkbox validation', () => {
        
        cy.get('.checkbox>input').click().should('be.checked').click().should('not.be.checked');

    });

    it('Submit button validation', () => {
        
        cy.get('.is-link').should('be.visible')
        .should('have.text', 'SUBMIT').click();
        
        cy.on("uncaught:exception", () => {
            return false;
        });

    });

    });

    


    

    