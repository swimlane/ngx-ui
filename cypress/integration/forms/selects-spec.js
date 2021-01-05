describe('Selects', () => {
  before(() => {
    cy.visit('/selects');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Close on body click', () => {
    beforeEach(() => {
      cy.asAllDataCy();
    });

    it('should close on input click', () => {
      cy.get('@attackType').find('.ngx-select-dropdown-options').should('not.exist');
      cy.get('@attackType').find('.ngx-select-input-box').click();
      cy.get('@attackType').find('.ngx-select-dropdown-options').should('be.visible');

      cy.get('@attackTypeRequired').find('.ngx-select-dropdown-options').should('not.exist');
      cy.get('@attackTypeRequired').find('.ngx-select-input-box').click();
      cy.get('@attackTypeRequired').find('.ngx-select-dropdown-options').should('be.visible');

      // the current opened select should be closed
      cy.get('@attackType').find('.ngx-select-dropdown-options').should('not.exist');
    });

    it('should close on caret down click', () => {
      cy.get('@attackType').find('.ngx-select-dropdown-options').should('not.exist');
      cy.get('@attackType').find('.ngx-select-caret').click();
      cy.get('@attackType').find('.ngx-select-dropdown-options').should('be.visible');

      cy.get('@attackTypeRequired').find('.ngx-select-dropdown-options').should('not.exist');
      cy.get('@attackTypeRequired').find('.ngx-select-caret').click();
      cy.get('@attackTypeRequired').find('.ngx-select-dropdown-options').should('be.visible');

      // the current opened select should be closed
      cy.get('@attackType').find('.ngx-select-dropdown-options').should('not.exist');
    });
  });
});
