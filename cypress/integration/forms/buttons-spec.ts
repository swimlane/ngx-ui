describe('Buttons', () => {
  before(() => {
    cy.visit('/buttons');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  beforeEach(() => {
    cy.clock();
  });

  it('should have Default button', () => {
    cy.get('[sectiontitle="ngx-button"]').within(() => {
      cy.get('ngx-button').contains('Default').parent('ngx-button').should('exist').as('CUT');

      cy.get('@CUT').should('contain', 'Default').click();
      cy.get('@CUT').should('have.class', 'in-progress');
      cy.tick(4000);
      cy.get('@CUT').should('have.class', 'success');
    });
  });

  it('should have Primary button', () => {
    cy.get('[sectiontitle="ngx-button"]').within(() => {
      cy.get('ngx-button').contains('Primary').parent('ngx-button').should('exist').as('CUT');

      cy.get('@CUT').should('contain', 'Primary').click();
      cy.get('@CUT').should('have.class', 'in-progress');
      cy.tick(4000);
      cy.get('@CUT').should('have.class', 'fail');
    });
  });
});
