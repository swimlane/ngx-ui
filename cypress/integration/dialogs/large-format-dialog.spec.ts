describe('Large Format Dialog', () => {
  before(() => {
    cy.visit('/dialog-large-format');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
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
    cy.get('button').contains('Open Large Dialog w/ Footer').click();

    cy.get('ngx-large-format-dialog-content').ngxClose();
    cy.get('ngx-large-format-dialog-content').should('not.exist');
  });

  it('should open dialog with drawer', () => {
    cy.get('button').contains('Open Large Dialog w/ Drawer').click();

    cy.get('ngx-large-format-dialog-content').within(() => {
      cy.get('button').contains('Open Drawer').click();
      cy.get('ngx-drawer').within(() => {
        cy.get('header h2').should('contain', 'Drawer');

        cy.get('button').contains('Open Drawer').click();
        cy.get('ngx-drawer').within(() => {
          cy.get('header h2').should('contain', 'Child Drawer');
          cy.root().ngxClose();
        });

        cy.get('ngx-drawer').should('not.exist');
        cy.get('.ngx-dialog-drawer-content__dismiss-btn').click();
      });
    });

    cy.get('ngx-large-format-dialog-content').ngxClose();
    cy.get('ngx-large-format-dialog-content').should('not.exist');
  });
});
