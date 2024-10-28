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
        
        cy.get(':nth-child(1) > .control > .input').should('be.visible')
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


    it('Test Case 04 - Validate the Address input box', () => {

        cy.get(':nth-child(3) > .control > .input'),should('be.visible')

    })

    const arr = [
        {
            validationTitle: 'Validate the Address input box',
            locator: ':nth-child(3) > .control > .input',
            inputBox: 'displayed',
            label: 'Address',
            placeholder: 'Enter your address*',
            isRequired: false
        },
        {
            validationTitle: 'Validate the Email input box',
            locator: ':nth-child(4) > .control > .input',
            inputBox: 'displayed',
            label: 'Email *',
            placeholder: 'Enter your email',
            isRequired: true
        },
        {
            validationTitle: 'Validate the Phone input box',
            locator: ':nth-child(5) > .control > .input',
            inputBox: 'displayed',
            label: 'Phone',
            placeholder: 'Enter your phone number',
            isRequired: false
        },
        {
            validationTitle: 'Validate the Message text area',
            locator: '.textarea',
            inputBox: 'displayed',
            label: 'Message',
            placeholder: 'Type your message here…',
            isRequired: false
        }
    ];

    arr.forEach((el) => {
        it(el.validationTitle, () => {
            cy.get(el.locator).should('be.visible')
            .and('have.attr', 'required', el.isRequired)
            .and('have.attr', 'placeholder', el.placeholder);
        })
    })



    
    it('Submit button validation', () => {
        
        cy.get('.is-link').should('be.visible')
        .should('have.text', 'SUBMIT').click();
        
        cy.on("uncaught:exception", () => {
            return false;
        });

    });

    });

    


    

    