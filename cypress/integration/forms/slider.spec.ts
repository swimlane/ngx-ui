describe('Slider', () => {
  before(() => {
    cy.visit('/slider');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Slider', () => {
    beforeEach(() => {
      cy.get('ngx-slider').first().as('CUT');
    });

    it('enters text and clears', () => {
      cy.get('@CUT').getValue().should('equal', '85');

      const value = '60';

      cy.get('@CUT').fill(value);
      cy.get('@CUT').getValue().should('equal', value);
      cy.get('@CUT').clear().getValue().should('equal', '10');
    });
  });
});
