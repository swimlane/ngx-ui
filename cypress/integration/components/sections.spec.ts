describe('Sections', () => {
  before(() => {
    cy.visit('/sections');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Section', () => {
    beforeEach(() => {
      cy.get('ngx-section').first().as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').ngxOpen();
    });

    it('Opens and closes sections with click', () => {
      cy.get('@CUT').within(() => {
        cy.get('.ngx-section-header').first().should('not.have.class', 'section-collapsed');
        cy.get('.ngx-section-content').first().should('exist');
        cy.get('.ngx-section-toggle').first().click();
        cy.get('.ngx-section-header').first().should('have.class', 'section-collapsed');
        cy.get('.ngx-section-content').should('not.exist');
      });
    });

    it('Opens and closes sections with testing lib', () => {
      cy.get('@CUT').within(() => {
        cy.get('.ngx-section-content').first().should('exist');
        cy.root().ngxClose();
        cy.get('.ngx-section-content').should('not.exist');
        cy.root().ngxOpen();
        cy.get('.ngx-section-content').first().should('exist');
      });
    });
  });
});
