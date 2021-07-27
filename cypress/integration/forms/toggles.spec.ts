describe('Toggles', () => {
  before(() => {
    cy.visit('/toggle');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Toggle', () => {
    beforeEach(() => {
      cy.getByName('toggle1').as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').check();
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().should('contain.text', 'High Priority');
    });

    it('click toggles value', () => {
      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').click();
      cy.get('@CUT').ngxGetValue().should('equal', false);
    });

    it('label click toggles value', () => {
      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').ngxFindLabel().click();
      cy.get('@CUT').ngxGetValue().should('equal', false);
    });

    it('clears value', () => {
      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').clear();
      cy.get('@CUT').ngxGetValue().should('equal', false);
    });

    it('can use check/uncheck', () => {
      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').check();
      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').uncheck();
      cy.get('@CUT').ngxGetValue().should('equal', false);
    });
  });
});
