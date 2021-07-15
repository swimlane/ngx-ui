describe('Selects', () => {
  before(() => {
    cy.visit('/selects');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Basic Input', () => {
    beforeEach(() => {
      cy.get('#select-1').as('CUT');
    });

    it('has a label', () => {
      cy.get('@CUT').findLabel().should('contain.text', 'Attack Type');
    });

    it('selects and clears value', () => {
      const text = 'DDOS';

      cy.get('@CUT').select(text).getValue().should('equal', text);

      cy.get('@CUT').clear().getValue().should('equal', '');
    });
  });

  describe('Filtering Input', () => {
    beforeEach(() => {
      cy.get('#select-3').as('CUT');
    });

    it('has a label', () => {
      cy.get('@CUT').findLabel().should('contain.text', 'Attack Type');
    });

    it('selects and clears value', () => {
      const text = 'DDOS';

      cy.get('@CUT').fill(text).getValue().should('equal', text);

      cy.get('@CUT').clear().getValue().should('equal', '');
    });
  });

  describe('Multiple Select', () => {
    beforeEach(() => {
      cy.get('#select-19').as('CUT');
    });

    it('selects and clears value', () => {
      cy.get('@CUT').getValue().should('deep.equal', []);

      cy.get('@CUT').select('DDOS').getValue().should('deep.equal', ['DDOS']);
      cy.get('@CUT').select(['DDOS', 'Physical']).getValue().should('deep.equal', ['DDOS', 'Physical']);

      cy.get('@CUT').clear().getValue().should('deep.equal', []);
    });
  });

  describe('Native Select', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="Native"] select').first().as('CUT');
    });

    it('selects value', () => {
      cy.get('@CUT').getValue().should('equal', 'Red');
      cy.get('@CUT').select('Green').getValue().should('equal', 'Green');
    });
  });

  describe('Native MultiSelect', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="Native"] select').eq(1).as('CUT');
    });

    it('selects value', () => {
      cy.get('@CUT').getValue().should('deep.equal', []);
      cy.get('@CUT').select('Green').getValue().should('deep.equal', ['Green']);
      cy.get('@CUT').select(['Green', 'Red']).getValue().should('deep.equal', ['Red', 'Green']);
      // cy.get('@CUT').clear().getValue().should('deep.equal', []);
    });
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
