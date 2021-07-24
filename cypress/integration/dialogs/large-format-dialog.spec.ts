describe('Large Format Dialog', () => {
  before(() => {
    cy.visit('/dialog-large-format');
  });

  it('should open and close dialog', () => {
    cy.get('button').contains('Open Large Dialog').click();

    cy.get('ngx-large-format-dialog-content').within(() => {
      cy.get('.dialog-container__header h1').should('contain', 'Title');
      cy.get('.dialog-container__header h4').should('contain', 'Optional Subtitle');
      cy.get('.dialog-container__body').should('contain', 'Content');
      cy.get('.dialog-container__header button').should('contain', 'Close').click();
    });
    cy.get('ngx-large-format-dialog-content').should('not.exist');
  });

  it('should close dialog with testing lib', () => {
    cy.get('button').contains('Open Large Dialog').click();

    cy.get('ngx-large-format-dialog-content').ngxClose();
    cy.get('ngx-large-format-dialog-content').should('not.exist');
  });
});
