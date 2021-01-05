describe('Overlay', () => {
  before(() => {
    cy.visit('/overlay');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Overlay', () => {
    const overlayMessage = 'Click anywhere to return';

    it('Shows overlay', () => {
      cy.contains('Show Overlay').click();
      cy.get('.ngx-overlay').should('have.attr', 'style').should('contain', 'visibility: visible');
      cy.contains(overlayMessage).click();
      cy.get('.ngx-overlay').should('have.attr', 'style').should('contain', 'visibility: hidden');
    });

    it('Handles small screen', () => {
      cy.contains('Show Overlay').click();
      cy.viewport(500, 600);

      const message = 'Your browser is too small';
      cy.contains(message).should('have.text', message);

      cy.viewport(1000, 800);
      cy.get('ngx-resize-overlay .ngx-overlay').should('have.attr', 'style').should('contain', 'visibility: hidden');

      cy.contains(overlayMessage).click();
      cy.get('.ngx-overlay').should('have.attr', 'style').should('contain', 'visibility: hidden');
    });
  });
});
