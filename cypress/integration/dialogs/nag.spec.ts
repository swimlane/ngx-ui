describe('NAG', () => {
  before(() => {
    cy.visit('/nag');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('should open and close dialog with header click', () => {
    cy.get('button').contains('Add Nag Alert').click();

    cy.get('ngx-nag')
      .should('exist')
      .within(() => {
        cy.get('.ngx-nag-toolbar header h2').should('contain', '1 Alerts Detected'); // TODO: fix pluralization
        cy.get('.ngx-section-content').should('not.be.visible');
        cy.get('.ngx-nag-toolbar header').click();
        cy.get('.ngx-section-content').should('be.visible');
        cy.get('.ngx-nag-toolbar header').click();
        cy.get('.ngx-section-content').should('not.be.visible');
      });

    cy.get('button').contains('Remove Nag Alert').click();
  });

  it('should open and close dialog using helpder commands', () => {
    cy.get('button').contains('Add Nag Alert').click();

    cy.get('ngx-nag')
      .should('exist')
      .within(() => {
        cy.get('.ngx-nag-toolbar header h2').should('contain', '1 Alerts Detected'); // TODO: fix pluralization
        cy.get('.ngx-section-content').should('not.be.visible');
        cy.root().ngxOpen();
        cy.get('.ngx-section-content').should('be.visible');
        cy.root().ngxClose();
        cy.get('.ngx-section-content').should('not.be.visible');
      });

    cy.get('button').contains('Remove Nag Alert').click();
  });
});
