describe('Large Format Dialog', () => {
  before(() => {
    cy.visit('/tooltip');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  beforeEach(() => {
    cy.get('ngx-section [ngx-tooltip]').first().as('CUT');
  });

  it('should show tooltip', () => {
    cy.get('@CUT').whileHovering(() => {
      cy.root().closest('body').find('ngx-tooltip-content').should('exist');
      cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', 'Phishing Attack');
    });
    cy.get('ngx-tooltip-content').should('exist');
  });
});
