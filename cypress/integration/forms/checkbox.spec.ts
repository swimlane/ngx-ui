describe('Checkbox', () => {
  before(() => {
    cy.visit('/checkbox');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Checkbox', () => {
    beforeEach(() => {
      cy.getByName('chk1').as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').check();
    });

    it('has a label', () => {
      cy.get('@CUT').findLabel().should('contain.text', 'Alert the SOC');
    });

    it('click toggles value', () => {
      cy.get('@CUT').getValue().should('equal', true);
      cy.get('@CUT').click();
      cy.get('@CUT').getValue().should('equal', false);
    });

    it('label click toggles value', () => {
      cy.get('@CUT').getValue().should('equal', true);
      cy.get('@CUT').findLabel().click();
      cy.get('@CUT').getValue().should('equal', false);
    });

    it('clears value', () => {
      cy.get('@CUT').getValue().should('equal', true);
      cy.get('@CUT').clear();
      cy.get('@CUT').getValue().should('equal', false);
    });

    it('can use check/uncheck', () => {
      cy.get('@CUT').getValue().should('equal', true);
      cy.get('@CUT').check();
      cy.get('@CUT').getValue().should('equal', true);
      cy.get('@CUT').uncheck();
      cy.get('@CUT').getValue().should('equal', false);
    });
  });
});
