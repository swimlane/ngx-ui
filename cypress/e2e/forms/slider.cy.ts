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
      cy.get('@CUT').ngxGetValue().should('equal', '85');

      const value = '60';

      cy.get('@CUT').ngxSetValue(value);
      cy.get('@CUT').ngxGetValue().should('equal', value);
      cy.get('@CUT').clear().ngxGetValue().should('equal', '10');
    });
  });
});
