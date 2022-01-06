describe('Code Editor', () => {
  before(() => {
    cy.visit('/code-editor');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Code Input', () => {
    beforeEach(() => {
      cy.get('ngx-codemirror').first().as('CUT');
    });

    it('enters text and clears', () => {
      const text = '<a>hello\nworld</a>';

      cy.get('@CUT').ngxFill(text);

      cy.get('@CUT').ngxGetValue().should('equal', text);

      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
    });

    it('focuses and blurs', () => {
      cy.get('@CUT').focus();
      cy.focused().closest('ngx-codemirror').should('exist');
      cy.get('@CUT').blur();
      cy.focused().should('not.exist');
    });
  });
});
