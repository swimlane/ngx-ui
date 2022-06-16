describe('Plus Menu', () => {
  before(() => {
    cy.visit('/plus-menu');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Plus Menu', () => {
    beforeEach(() => {
      cy.get('ngx-plus-menu').first().as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').ngxClose();
    });

    it('Opens and closes sections with click', () => {
      cy.get('@CUT').within(() => {
        cy.get('.ngx-plus-menu--items-container').should('not.be.visible');
        cy.root().click('topRight');
        cy.get('.ngx-plus-menu--items-container').should('be.visible');
        cy.root().click('topRight');
        cy.get('.ngx-plus-menu--items-container').should('not.be.visible');
      });
    });

    it('Opens and closes sections with testing lib', () => {
      cy.get('@CUT').within(() => {
        cy.get('.ngx-plus-menu--items-container').should('not.be.visible');
        cy.root().ngxOpen();
        cy.get('.ngx-plus-menu--items-container').should('be.visible');
        cy.root().ngxClose();
        cy.get('.ngx-plus-menu--items-container').should('not.be.visible');
      });
    });
  });
});
