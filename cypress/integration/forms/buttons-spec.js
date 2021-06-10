describe('Buttons', () => {
  before(() => {
    cy.visit('/buttons');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('has no detectable a11y violations on load', () => {
    cy.get('[sectiontitle="Buttons"] > section > .ngx-section-content button').then($el => {
      cy.checkA11y($el, {
        rules: {
          'color-contrast': { enabled: false }
        }
      });
    })
  });
});