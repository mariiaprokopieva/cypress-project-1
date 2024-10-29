/// <reference types="cypress"/>

describe('Form elements', () => {

    beforeEach(() => {
        cy.visit('https://techglobal-training.com/frontend/project-1');
      });


    it('Test Case 01 - Validate the Contact Us information', () => {

        const contactInfo = [ 'Contact Us', '2800 S River Rd Suite 310, Des Plaines, IL 60018', 'info@techglobalschool.com', '(224) 580-2150' ];

        cy.get('.mb-5').children().each(($el, index) => {
            cy.wrap($el).should('have.text', contactInfo[index]);
        });
    });


    it('Test Case 02 - Validate the Full name input box', () => {
        
        cy.get(':nth-child(1) > .control > input').should('be.visible')
        .and('have.attr', 'required');

        cy.get('[for="name"]').should('have.text', 'Full name *');

        cy.get(':nth-child(1) > .control > .input').should('have.attr', 'placeholder', 'Enter your full name');

    });


    it('Test Case 03 - Validate the Gender radio button', () => {

        const genders = [ 'Male', 'Female', 'Prefer not to disclose'];

        cy.get('.control > .label').should('have.text', 'Gender *');

        cy.get(':nth-child(2) > .mr-1').should('have.attr', 'required');

        cy.get('.radio').each(($el, index) => {
            cy.wrap($el).should('have.text', genders[index]);
        });

        cy.get('.radio .mr-1').each(($el) => {
            cy.wrap($el).should('not.be.checked');
        });

        const checkOptionAndValidate = (optionToCheck, expectedTexts) => {

            cy.contains(optionToCheck).find('input').check().should('be.checked');
    
            expectedTexts.filter(option => option !== optionToCheck).forEach(uncheckedOptions => {
                cy.contains(uncheckedOptions).find('input').should('not.be.checked');
            });
        }

        checkOptionAndValidate('Male', genders);
        checkOptionAndValidate('Female', genders);

    });

    const arr = [
        {
            validationTitle: 'Test Case 04 - Validate the Address input box',
            locator: ':nth-child(3) > .control > .input',
            label: 'Address',
            placeholder: 'Enter your address',
            isRequired: false
        },
        {
            validationTitle: 'Test Case 05 - Validate the Email input box',
            locator: ':nth-child(4) > .control > .input',
            label: 'Email *',
            placeholder: 'Enter your email',
            isRequired: true
        },
        {
            validationTitle: 'Test Case 06 - Validate the Phone input box',
            locator: ':nth-child(5) > .control > .input',
            label: 'Phone',
            placeholder: 'Enter your phone number',
            isRequired: false
        },
        {
            validationTitle: 'Test Case 07 - Validate the Message text area',
            locator: '.textarea',
            label: 'Message',
            placeholder: 'Type your message here...',
            isRequired: false
        }
    ];

    arr.forEach((arrEl) => {
        it(arrEl.validationTitle, () => {
            cy.get(arrEl.locator).should('be.visible')
            .and(($el) => {
                if(arrEl.isRequired) expect($el).to.have.attr('required');
                else expect($el).to.not.have.attr('required'); 
            })
            .and('have.attr', 'placeholder', arrEl.placeholder)
            .parent().parent().find('label').should('have.text', arrEl.label);
        });
    });


    it('Test Case 08 - Validate the Consent checkbox', () => {
        cy.get('[type="checkbox"]').should('be.enabled')
        .click().should('be.checked')
        .click().should('not.be.checked')
        .parent().should('have.text', ' I give my consent to be contacted.')
        .children()
        .should('have.attr', 'required');
    });


    it('Test Case 09 - Validate the SUBMIT button', () => {
        
        cy.get('.is-link').should('be.visible')
        .should('have.text', 'SUBMIT').click();
        
        cy.on("uncaught:exception", () => {
            return false;
        });
    });


    it('Test Case 10 - Validate the form submission', () => {

        const testData = ['Mariia Prokopieva', 'Montreal, QC, Canada', 'mariiaprokopieva@gmail.com', '123-111-1212', 'Thank you and have a great day!']

        cy.get('.input,.textarea').each(($el, index) => {
            cy.wrap($el).type(testData[index]);
        });
        cy.get(':nth-child(3) > .mr-1').check();
        cy.get('[type="checkbox"]').click();

        cy.get('.is-link').click();
        cy.on("uncaught:exception", () => {
            return false;
        });

        cy.get('.mt-5').should('have.text', 'Thanks for submitting!');
    })

    });

    


    

    