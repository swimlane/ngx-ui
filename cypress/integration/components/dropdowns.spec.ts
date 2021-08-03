describe('Dropdowns', () => {
  before(() => {
    cy.visit('/dropdown');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Section', () => {
    beforeEach(() => {
      cy.get('ngx-dropdown').first().as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').ngxClose();
    });

    it('Opens and closes sections with click', () => {
      cy.get('@CUT').within(() => {
        cy.get('.ngx-dropdown-menu').first().should('not.be.visible');
        cy.root().click();
        cy.get('.ngx-dropdown-menu').first().should('be.visible');
        cy.root().click();
        cy.get('.ngx-dropdown-menu').first().should('not.be.visible');
      });
    });

    it('Opens and closes sections with testing lib', () => {
      cy.get('@CUT').within(() => {
        cy.get('.ngx-dropdown-menu').first().should('not.be.visible');
        cy.root().ngxOpen();
        cy.get('.ngx-dropdown-menu').first().should('be.visible');
        cy.root().ngxClose();
        cy.get('.ngx-dropdown-menu').first().should('not.be.visible');
      });
    });
  });
});
