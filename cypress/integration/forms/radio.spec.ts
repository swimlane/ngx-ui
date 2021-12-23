describe('Radio', () => {
  before(() => {
    cy.visit('/radio');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('Check A11y', () => {
    cy.get('ngx-radiobutton, ngx-radiobutton-group').withinEach($el => {
      cy.checkA11y($el);
    });
  });

  describe('Radio Button', () => {
    beforeEach(() => {
      cy.getByLabel('Winter').as('CUT');
    });

    afterEach(() => {
      cy.get('ngx-radiobutton').eq(1).click();
    });

    it('sets value with click', () => {
      cy.get('@CUT').ngxGetValue().should('equal', false);
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'false');

      cy.get('@CUT').click();
      
      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'true');
    });

    it('sets value with check', () => {
      cy.get('@CUT').ngxGetValue().should('equal', false);
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'false');

      cy.get('@CUT').check();

      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'true');
    });
  });

  describe('Radio Group', () => {
    beforeEach(() => {
      cy.get('ngx-radiobutton-group').first().as('CUT');
    });

    it('enters text and clears', () => {
      cy.get('@CUT').find('input[type="radio"]').should('have.length', 4);
      cy.get('@CUT').ngxGetValue().should('equal', 'Summer');

      const value = 'Winter';

      cy.get('@CUT').ngxSetValue(value);
      cy.get('@CUT').ngxGetValue().should('equal', value);
    });
  });
});
