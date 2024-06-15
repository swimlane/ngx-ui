describe('Dropdowns', () => {
  before(() => {
    cy.visit('/dropdown');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Section', () => {
    it('Opens and closes dropdowns with click', () => {
      cy.get('ngx-dropdown').first().as('CUT');
      cy.get('ngx-dropdown').eq(1).as('LUT');
      cy.get('@CUT').within(() => {
        cy.get('.ngx-dropdown-menu').first().should('not.be.visible');
        cy.get('ngx-dropdown-toggle').contains('Left Button List').click();
        cy.get('.ngx-dropdown-menu').first().should('be.visible');
        cy.root().click();
        cy.get('.ngx-dropdown-menu').first().should('not.be.visible');
      });

      cy.get('@LUT').within(() => {
        cy.get('.ngx-dropdown-menu').last().should('not.be.visible');
        cy.get('ngx-dropdown-toggle').contains('Right Button List').click();
        cy.get('button').contains('Button 2').click();
        cy.get('.ngx-dropdown-menu').first().should('not.be.visible');
      });
    });

    it('Opens and closes dropdowns with testing lib', () => {
      cy.get('ngx-dropdown').eq(1).as('CUT');
      cy.get('@CUT').within(() => {
        cy.get('.ngx-dropdown-menu').first().should('not.be.visible');
        cy.root().select('Button 2');
        cy.get('.ngx-dropdown-menu').first().should('not.be.visible');
      });
    });

    it('Opens and closes dropdowns with testing lib using index', () => {
      cy.get('ngx-dropdown').eq(1).as('CUT');
      cy.get('@CUT').within(() => {
        cy.get('.ngx-dropdown-menu').first().should('not.be.visible');
        cy.root().select(1);
        cy.get('.ngx-dropdown-menu').first().should('not.be.visible');
      });
    });
  });
});
