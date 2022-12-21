describe('Large Format Dialog', () => {
  before(() => {
    cy.visit('/dialog-medium-format');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('should open and close dialog', () => {
    cy.contains('button', 'Open Medium Dialog').click();

    cy.get('ngx-medium-format-dialog-content').within(() => {
      cy.get('.dialog-container__header h1').should('contain', 'Title');
      cy.get('.dialog-container__body').should('contain', 'Content');
      cy.get('.dialog-container__header button').should('contain', 'Close').click();
    });
    cy.get('ngx-medium-format-dialog-content').should('not.exist');
  });

  it('should scroll with content', () => {
    cy.contains('button', 'Open Medium Dialog and Content').click();

    cy.get('ngx-medium-format-dialog-content').within(() => {
      cy.get('.dialog-container__header h1').should('contain', 'Title');
    });
    cy.get('ngx-medium-format-dialog-content').invoke('outerHeight').should('be.lt', 500);

    cy.get('ngx-medium-format-dialog-content').within(() => {
      cy.get('ngx-large-format-dialog-header-title').should('be.visible');
      cy.get('.dialog-container__body').invoke('outerHeight').should('be.lt', 450);
      cy.get('.anchor-bottom').scrollIntoView();
      cy.get('ngx-large-format-dialog-header-title').should('be.visible');
    });

    cy.get('ngx-medium-format-dialog-content').ngxClose();
    cy.get('ngx-medium-format-dialog-content').should('not.exist');
  });

  it('should close dialog with testing lib', () => {
    cy.contains('button', 'Open Medium Dialog w/ Footer').click();
    cy.get('ngx-medium-format-dialog-content').ngxClose();
    cy.get('ngx-medium-format-dialog-content').should('not.exist');
  });

  it('should scroll with content and footer', () => {
    cy.contains('button', 'Open Medium Dialog w/ Footer and Content').click();

    cy.get('ngx-medium-format-dialog-content').within(() => {
      cy.get('.dialog-container__header h1').should('contain', 'Title');
    });
    cy.get('ngx-medium-format-dialog-content').invoke('outerHeight').should('be.lt', 500);

    cy.get('ngx-medium-format-dialog-content').within(() => {
      cy.get('ngx-medium-format-dialog-footer').should('be.visible');
      cy.get('.dialog-container__body').invoke('outerHeight').should('be.lt', 450);
      cy.get('.anchor-bottom').scrollIntoView();
      cy.get('ngx-medium-format-dialog-footer').should('be.visible');
    });

    cy.get('ngx-medium-format-dialog-content').ngxClose();
    cy.get('ngx-medium-format-dialog-content').should('not.exist');
  });
});
