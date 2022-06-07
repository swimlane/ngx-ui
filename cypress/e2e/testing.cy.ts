describe('ngx-ui demo', () => {
  before(() => {
    cy.visit('/testing');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('getByLabel works with within', () => {
    cy.getByLabel('Name').first().should('have.attr', 'id', 'input1');
    cy.getByLabel('Name').eq(1).should('have.attr', 'id', 'input2');

    cy.get('#B').within(() => {
      cy.getByLabel('Name').first().should('have.attr', 'id', 'input2');
    });
  });

  it('getByPlaceholder works with within', () => {
    cy.getByPlaceholder('Name').first().should('have.attr', 'id', 'input1');
    cy.getByPlaceholder('Name').eq(1).should('have.attr', 'id', 'input2');

    cy.get('#B').within(() => {
      cy.getByPlaceholder('Name').first().should('have.attr', 'id', 'input2');
    });
  });

  it('getByName works with within', () => {
    cy.getByName('Name').first().should('have.attr', 'id', 'input1');
    cy.getByName('Name').eq(1).should('have.attr', 'id', 'input2');

    cy.get('#B').within(() => {
      cy.getByName('Name').first().should('have.attr', 'id', 'input2');
    });
  });
});
