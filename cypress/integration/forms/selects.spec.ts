describe('Selects', () => {
  before(() => {
    cy.visit('/selects');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('have no detectable a11y violations on load', () => {
    cy.get('ngx-select-input').withinEach($el => {
      cy.checkA11y($el, {
        rules: {
          'color-contrast': { enabled: false }, // NOTE: to be evaluated by UIUX
          label: { enabled: false } // TODO: fix these
        }
      });
    });
  });

  describe('Basic Input', () => {
    beforeEach(() => {
      cy.get('#select-1').as('CUT');
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().should('contain.text', 'Attack Type');
    });

    it('selects and clears value', () => {
      cy.get('@CUT').ngxGetValue().should('equal', '');

      const text = 'DDOS';

      cy.get('@CUT').select(text).ngxGetValue().should('equal', text);

      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
    });
  });

  describe('Filtering Input', () => {
    beforeEach(() => {
      cy.get('#select-3').as('CUT');
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().should('contain.text', 'Attack Type');
    });

    it('selects and clears value', () => {
      const text = 'DDOS';

      cy.get('@CUT').ngxFill(text).select(text).ngxGetValue().should('equal', text);

      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
    });
  });

  describe('Templates', () => {
    beforeEach(() => {
      cy.get('#select-9').as('CUT');
    });

    it('selects and clears value', () => {
      cy.get('@CUT').ngxGetValue().should('equal', '');

      const text = 'breach';

      cy.get('@CUT').select(text).ngxGetValue().should('equal', text);

      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
    });
  });

  describe('Multiple Select', () => {
    beforeEach(() => {
      cy.get('#select-19').as('CUT');
    });

    it('selects and clears value', () => {
      cy.get('@CUT').ngxGetValue().should('deep.equal', []);

      cy.get('@CUT').select('DDOS').ngxGetValue().should('deep.equal', ['DDOS']);
      cy.get('@CUT').select(['DDOS', 'Physical']).ngxGetValue().should('deep.equal', ['DDOS', 'Physical']);

      cy.get('@CUT').clear().ngxGetValue().should('deep.equal', []);
    });
  });

  describe('Native Select', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="Native"] select').first().as('CUT');
    });

    it('selects value', () => {
      cy.get('@CUT').ngxGetValue().should('equal', 'Red');
      cy.get('@CUT').select('Green').ngxGetValue().should('equal', 'Green');
    });
  });

  describe('Native MultiSelect', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="Native"] select').eq(1).as('CUT');
    });

    it('selects value', () => {
      cy.get('@CUT').ngxGetValue().should('deep.equal', []);
      cy.get('@CUT').select('Green').ngxGetValue().should('deep.equal', ['Green']);
      cy.get('@CUT').select(['Green', 'Red']).ngxGetValue().should('deep.equal', ['Red', 'Green']);
    });
  });

  describe('Async', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="Async"] ngx-select').first().as('CUT').scrollIntoView();
      cy.intercept(`https://jsonplaceholder.typicode.com/posts?q=*`, {
        delay: 600,
        body: [
          {
              "userId": 1,
              "id": 4,
              "title": "eum et est occaecati",
              "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
          },
          {
              "userId": 1,
              "id": 6,
              "title": "dolorem eum magni eos aperiam quia",
              "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
          },
          {
              "userId": 1,
              "id": 8,
              "title": "dolorem dolore est ipsam",
              "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
          }
      ]}).as('api');
    });

    it('selects value', () => {
      cy.get('@CUT').ngxGetValue().should('deep.equal', '');
      cy.get('@CUT').ngxFill('dolorem');
      cy.wait('@api');
      cy.get('@CUT').find('li.ngx-select-dropdown-option').should('have.length', 2);
      cy.get('@CUT').select('dolorem eum magni eos aperiam quia');
      cy.get('@CUT').ngxGetValue().should('deep.equal', 'dolorem eum magni eos aperiam quia');
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
