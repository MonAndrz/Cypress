class infraredPage {
    _headerElement = '.elementor-widget-container > .elementor-heading-title';
    _submitButton = '#wpforms-submit-1221';
    _submitButtonContact = '#wpforms-submit-1701';

    selectHeader (){
        return cy.get(this._headerElement);
    }

    clickSubmitOnForm () {
        return cy.get(this._submitButton).click();;
    }

    clickSubmitOnContactForm (){
        return cy.get(this._submitButtonContact).click();
    }

    arrayOfElementsShould(elements, checkedValue) {
        elements.forEach((el) => {
            cy.get(el).should(checkedValue);
        });
    }
}
export default infraredPage;