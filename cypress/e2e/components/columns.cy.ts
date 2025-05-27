describe('Columns', () => {
  before(() => {
    cy.visit('/columns');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Columns', () => {
    it('displays the correct number of rows in first column', () => {
      cy.get('ngx-column').first().as('CUT');
      cy.get('@CUT').find('.column').should('have.length', 1);
      cy.get('@CUT').find('.ngx-list__virtual-scroll__item').should('have.length', 12);
    });

    it('displays correct number of columns', () => {
      cy.get('ngx-column').should('have.length', 3);
    });

    it('displays the row number using the row index', () => {
      cy.get('ngx-column').eq(2).as('CUT');
      cy.get('@CUT').find('.ngx-list__virtual-scroll__item').first().click();
      cy.get('.column-expanded').find('h1').should('contain.text', 'Column Test Content');
    });
  });
});
