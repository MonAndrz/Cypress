/// <reference types="cypress" />

import infraredPage from '../../pageObject/infraredPage';
const infraPage = new infraredPage();
describe('Infrared Test', () => {
    beforeEach('Enter infararedheat page', () => {
        cy.clearLocalStorageCache();
        cy.visit('/');
        cy.viewport(1920, 1080);
        cy.url().should('contain', 'infraredheat.pl');
    });
    it('Go to InfraredHeat with logo', { tags: ['navigation'] },  () => {
        cy.get('.custom-logo').click();
        cy.get('#menu-item-20 > a').click();
        cy.url().should('contain', 'infraredheat.pl');
    })
    it('Check form validation', { tags: ['forms'] }, () => {
        infraPage.clickSubmitOnForm();
        infraPage.arrayOfElementsShould(['#wpforms-1221-field_0-error', '#wpforms-1221-field_5-error', '#wpforms-1221-field_4-error', '#wpforms-1221-field_2-error'], 'be.visible');
        cy.fixture('formFraze').then((frazes) => {
            cy.get('#wpforms-1221-field_0').type(frazes[0].fraze);
            cy.get('#wpforms-1221-field_5').type(frazes[1].fraze);
            cy.get('#wpforms-1221-field_4').type(frazes[2].fraze);
            cy.get('#wpforms-1221-field_2').type(frazes[3].fraze);
        })
        infraPage.arrayOfElementsShould(['#wpforms-1221-field_0-error', '#wpforms-1221-field_5-error', '#wpforms-1221-field_4-error', '#wpforms-1221-field_2-error'], 'not.be.visible');
    })
    it('Go to Sklep', { tags: ['navigation'] }, () => {
        cy.get('#menu-item-2562 > a').click();
        cy.url().should('contain', 'infraredheat.com.pl');
        cy.get('.jumbotron__h').contains('Home');
    })
    it('Add to basket', { tags: ['forms'] }, () => {
        cy.get('#menu-item-2562 > a').click();
        cy.get(':nth-child(1) > .product-box > .product-box-img').click();
        cy.get('#pa_rozmiar').select('30cm');
        cy.get('#pa_moc').select('140W');
        cy.get('.variations_form').submit().get(':nth-child(3) > .navbar-btn > .count').contains(1);
    })
    it('Go to Metody Akumulacyjne', { tags: ['navigation'] }, () => {
        cy.get('#menu-item-1187').rightclick();
        cy.get('#menu-item-1192').click();
        infraPage.selectHeader().contains('System akumulacyjny');
    })
    it('Go to kontakt and check form validation', { tags: ['forms'] }, () => {
        cy.get('#menu-item-20 > a').click();
        infraPage.clickSubmitOnContactForm();
        infraPage.arrayOfElementsShould(['#wpforms-1701-field_5-error', '#wpforms-1701-field_6-error', '#wpforms-1701-field_8-error', '#wpforms-1701-field_4-error', '#wpforms-1701-field_2-error'], 'be.visible');

        cy.fixture('formFraze').then((frazes) => {
            cy.get('#wpforms-1701-field_5').type(frazes[0].fraze);
            cy.get('#wpforms-1701-field_6').type(frazes[1].fraze);
            cy.get('#wpforms-1701-field_8').type(frazes[2].fraze);
            cy.get('#wpforms-1701-field_4').type(frazes[3].fraze);
            cy.get('#wpforms-1701-field_2').type(frazes[4].fraze);
        })

        infraPage.arrayOfElementsShould(['#wpforms-1701-field_5-error', '#wpforms-1701-field_6-error', '#wpforms-1701-field_8-error', '#wpforms-1701-field_4-error', '#wpforms-1701-field_2-error'], 'not.be.visible');
    })
    it('Go to Nasze realizacje and check gallery', { tags: ['photosGallery'] }, () => {
        cy.get('#menu-item-1184 > a').click();
        cy.scrollTo('center');
        cy.get('.n2-ss-slide-315').should('be.visible');
        cy.get('.n2-ss-slide-331').should('not.be.visible');
        cy.get('#n2-ss-13-arrow-next > .n2-ow').click();
        cy.get('.n2-ss-slide-315').should('not.be.visible');
        cy.get('.n2-ss-slide-331').should('be.visible');
    })
    it('Enter in Zalety folii grzewczych', { tags: ['navigation'] }, () => {
        cy.get('#menu-item-1186 > a').click();
        infraPage.selectHeader().contains('Zalety folii');
    })
    it('Enter in Metody Montazu', { tags: ['navigation'] }, () => {
        cy.get('[href="https://infraredheat.pl/metody-montazu/"]').click();
        infraPage.selectHeader().contains('Metody montażu');

    })
    it('Check if whats up have correct number', { tags: ['navigation'] }, () => {
        cy.intercept('https://web.whatsapp.com/*').as('whatsapp');
        cy.get('.ht-ctc-chat').click().wait('@whatsapp')
            .then(res => {
                cy.wrap(res.request.url).should('contain', 'phone=48664804301')
            });
    })
})
