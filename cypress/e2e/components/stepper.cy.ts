describe('Overlay', () => {
  before(() => {
    cy.visit('/stepper');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('steps', () => {
    cy.get('[sectiontitle="Stepper"]').within(() => {
      cy.get('.ngx-stepper--content.active').should('contain.text', 'Step #3');
      cy.contains('Next Step').click();
      cy.get('.ngx-stepper--content.active').should('contain.text', 'Step #4');
      cy.contains('First Step').click();
      cy.get('.ngx-stepper--content.active').should('contain.text', 'Step #1');
      cy.contains('Last Step').click();
      cy.get('.ngx-stepper--content.active').should('contain.text', 'Step #4');
      cy.contains('Previous Step').click();
      cy.get('.ngx-stepper--content.active').should('contain.text', 'Step #3');
    });
  });
});
