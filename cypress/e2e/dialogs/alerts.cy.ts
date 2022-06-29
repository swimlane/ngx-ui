describe('Alerts', () => {
  before(() => {
    cy.visit('/alert');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('should open and close alerts', () => {
    cy.get('button').contains('Info').click();

    cy.get('ngx-alert-dialog')
      .should('exist')
      .within(() => {
        cy.get('.ngx-dialog-header h1').should('contain', 'Alert SOC');
        cy.get('.ngx-dialog-body').should('contain', 'Intrusion Happened!!!');
        cy.get('.close-button').click();
      });

    cy.get('ngx-alert-dialog').should('not.exist');
  });

  it('should open and close alerts using helpers', () => {
    cy.get('button').contains('Danger').click();

    cy.get('ngx-alert-dialog')
      .should('exist')
      .within(() => {
        cy.get('.ngx-dialog-header h1').should('contain', 'Alert SOC');

        cy.root().ngxClose();
      });

    cy.get('ngx-alert-dialog').should('not.exist');
  });
});
