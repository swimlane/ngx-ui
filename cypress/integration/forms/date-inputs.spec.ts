describe('Date/Time', () => {
  before(() => {
    cy.visit('/datetime');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('Check A11y', () => {
    cy.get('ngx-date-time').withinEach($el => {
      cy.checkA11y($el);
    });
  });

  describe('Basic Date Input', () => {
    beforeEach(() => {
      cy.get('ngx-date-time').first().as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').clear();
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().should('contain.text', 'Date of attack');
    });

    it('enters text', () => {
      const text = '12/12/2020';

      cy.get('@CUT').clear().type(text);

      cy.get('@CUT').ngxGetValue().should('equal', text);

      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
    });
  });
});
