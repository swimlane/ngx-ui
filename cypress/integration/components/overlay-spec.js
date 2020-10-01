describe('Overlay', () => {
  before(() => {
    cy.visit('/overlay');
    cy.get('.page-loader').should('not.be.visible', { timeout: 20000 });
  });

  describe('Overlay', () => {
    const overlayMessage = 'Click anywhere to return';

    it('Shows overlay', () => {
      cy.contains('Show Overlay').click();
      cy.contains(overlayMessage).should('be.visible').click();
      cy.contains(overlayMessage).should('not.be.visible');
    });

    it('Handles small screen', () => {
      cy.contains('Show Overlay').click();
      cy.viewport(500, 600);

      const message = 'Your browser is too small';
      cy.contains(message).should('be.visible');

      cy.viewport(1000, 800);
      cy.contains(message).should('not.be.visible');

      cy.contains(overlayMessage).should('be.visible').click();
      cy.contains(overlayMessage).should('not.be.visible');
    });
  });
});
