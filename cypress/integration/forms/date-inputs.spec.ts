describe('Date/Time', () => {
  before(() => {
    cy.visit('/datetime');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Date Input', () => {
    beforeEach(() => {
      cy.get('ngx-date-time').first().as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').clear();
    });

    it('has a label', () => {
      cy.get('@CUT').findLabel().should('contain.text', 'Date of attack');
    });

    it('enters text', () => {
      const text = '12/12/2020';

      cy.get('@CUT').clear().type(text);

      cy.get('@CUT').getValue().should('equal', text);

      cy.get('@CUT').clear().getValue().should('equal', '');
    });
  });
});
