describe('List', () => {
  before(() => {
    cy.visit('/list');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('List', () => {
    it('displays list the correct number of headers, columns and rows', () => {
      cy.get('ngx-list').first().as('CUT');
      cy.get('@CUT').find('ngx-list-header').should('have.length', 3);
      cy.get('@CUT').find('ngx-list-row').should('have.length', 10);
      cy.get('@CUT').find('ngx-list-column').should('have.length', 30);
    });

    it('displays a custom column layout', () => {
      cy.get('ngx-list').eq(1).as('CUT');
      const expectedStyle = 'display: grid; gap: 1rem; grid-template-columns: 3fr 2fr 1fr;';
      cy.get('@CUT').find('div.ngx-list__headers-container').should('have.attr', 'style', expectedStyle);
      cy.get('@CUT').find('ngx-list-row').first().find('> div').should('have.attr', 'style', expectedStyle);
    });

    it('displays the row number using the row index', () => {
      cy.get('ngx-list').eq(2).as('CUT');
      cy.get('@CUT').find('ngx-list-column').first().should('contain.text', '1.');
    });
  });
});
