describe('Radio', () => {
  before(() => {
    cy.visit('/radio');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Radio Button', () => {
    beforeEach(() => {
      cy.get('ngx-radiobutton').first().as('CUT');
    });

    afterEach(() => {
      cy.get('ngx-radiobutton').eq(1).click();
    });

    it('sets value with click', () => {
      cy.get('@CUT').getValue().should('equal', false);
      cy.get('@CUT').click();
      cy.get('@CUT').getValue().should('equal', true);
    });

    it('sets value with check', () => {
      cy.get('@CUT').getValue().should('equal', false);
      cy.get('@CUT').check();
      cy.get('@CUT').getValue().should('equal', true);
    });
  });

  describe('Radio Group', () => {
    beforeEach(() => {
      cy.get('ngx-radiobutton-group').first().as('CUT');
    });

    it('enters text and clears', () => {
      cy.get('@CUT').find('input[type="radio"]').should('have.length', 4);
      cy.get('@CUT').getValue().should('equal', '');

      const value = 'Winter';

      cy.get('@CUT').fill(value);
      cy.get('@CUT').getValue().should('equal', value);
    });
  });
});