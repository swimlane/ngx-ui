describe('ngx-ui demo', () => {
  before(() => {
    cy.visit('/testing');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('getByLabel works with within', () => {
    cy.getByLabel('Name').first().then(console.log).should('have.attr', 'id', 'input1');
    cy.getByLabel('Name').eq(1).then(console.log).should('have.attr', 'id', 'input2');

    cy.get('#B').within(() => {
      cy.getByLabel('Name').first().then(console.log).should('have.attr', 'id', 'input2');
    });
  });
});
