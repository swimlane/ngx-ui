describe('Selects', () => {
  before(() => {
    cy.visit('/selects');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  const shouldBeNotFocused = () =>
    cy.get('.ngx-select-input-underline .underline-fill').should('have.css', 'width', '0px');
  const shouldBeFocused = () =>
    cy.get('.ngx-select-input-underline .underline-fill').should('not.have.css', 'width', '0px');
  const shouldBeNotActive = () => cy.root().should('not.have.class', 'active');
  const shouldBeActive = () => cy.root().should('have.class', 'active');

  it('have no detectable a11y violations on load', () => {
    cy.get('ngx-select:not(.autosize) ngx-select-input').withinEach($el => {
      cy.checkA11y($el, {
        rules: {
          'color-contrast': { enabled: false }, // NOTE: to be evaluated by UIUX
          label: { enabled: false } // TODO: fix these
        }
      } as any);
    });
  });

  describe('Basic Input', () => {
    beforeEach(() => {
      cy.get('ngx-section').first().as('SUT');
      cy.get('@SUT').find('ngx-select').first().as('CUT');
      cy.get('@CUT').ngxClose();
      cy.get('@CUT').clear();
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

    it('selects and clears value by number', () => {
      cy.get('@CUT').ngxGetValue().should('equal', '');

      cy.get('@CUT').select(2).ngxGetValue().should('equal', 'Physical');

      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
    });

    it('deselects on click', () => {
      cy.get('@CUT').ngxGetValue().should('equal', '');

      const text = 'DDOS';

      cy.get('@CUT').select(text).ngxGetValue().should('equal', text);

      cy.get('@CUT').ngxOpen();
      cy.get('@CUT').find('.ngx-select-dropdown-option').contains(text).click();

      cy.get('@CUT').ngxGetValue().should('equal', '');
    });

    it('selects and clears value twice', () => {
      cy.get('@CUT').ngxGetValue().should('equal', '');

      const text = 'DDOS';
      cy.get('@CUT').select(text).ngxGetValue().should('equal', text);
      cy.get('@CUT').clear().ngxGetValue().should('equal', '');

      cy.get('@CUT').select(text).ngxGetValue().should('equal', text);
      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
    });

    it('is keyboard accessible', () => {
      cy.get('@SUT').find('h4').contains('Basic').realClick();

      cy.get('@CUT').within(() => {
        // Starts out not focused not open
        shouldBeNotFocused();
        shouldBeNotActive();

        // Tab into the select, now focused but still closed
        cy.realPress('Tab');
        shouldBeFocused();
        shouldBeNotActive();

        // Down arrow to open and select first item
        cy.realPress('ArrowDown');
        shouldBeFocused();
        shouldBeActive();

        cy.get('.ngx-select-dropdown-options li li').first().should('have.class', 'active');
        cy.get('.ngx-select-dropdown-options li li').last().should('not.have.class', 'active');
        cy.realPress('ArrowDown').realPress('ArrowDown');
        cy.get('.ngx-select-dropdown-options li li').first().should('not.have.class', 'active');
        cy.get('.ngx-select-dropdown-options li li').last().should('have.class', 'active');

        // Escape to close list
        cy.realPress('Escape');
        shouldBeFocused();
        shouldBeNotActive();

        // Arrow up to open and select last item
        cy.realPress('ArrowUp');
        shouldBeFocused();
        shouldBeActive();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(10); // Needed for testing!!!

        cy.get('.ngx-select-dropdown-options li li').first().should('not.have.class', 'active');
        cy.get('.ngx-select-dropdown-options li li').last().should('have.class', 'active');
        cy.realPress('ArrowUp');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(10); // Needed for testing!!!
        cy.realPress('ArrowUp');
        cy.get('.ngx-select-dropdown-options li li').first().should('have.class', 'active');
        cy.get('.ngx-select-dropdown-options li li').last().should('not.have.class', 'active');

        // Enter selects an option and closes the list
        cy.realPress('Enter');
        shouldBeFocused();
        shouldBeNotActive();
        cy.root().ngxGetValue().should('equal', 'Breach');

        // Space opens
        cy.realPress('Space');
        shouldBeFocused();
        shouldBeActive();

        // Space selects an option but leaves list open
        cy.realPress('ArrowDown');
        cy.realPress('Space');
        cy.root().ngxGetValue().should('equal', 'DDOS');
        shouldBeFocused();
        shouldBeActive();

        // Can deselect
        cy.realPress('Space');
        cy.root().ngxGetValue().should('equal', '');
        shouldBeFocused();
        shouldBeActive();

        // Tab away
        cy.root().ngxClose();
        cy.realPress('Tab');
        shouldBeNotFocused();
        shouldBeNotActive();
      });
    });
  });

  describe('Tagging', () => {
    beforeEach(() => {
      cy.get('ngx-section[data-cy=tagging]').as('SUT');
      cy.get('@SUT').find('ngx-select').first().as('CUT');
      cy.get('@CUT').ngxClose();
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().should('contain.text', 'Tagging');
    });

    it('selects and clears existing values', () => {
      cy.get('@CUT').ngxGetValue().should('equal', '');

      const text = 'DDOS';

      cy.get('@CUT').select(text).ngxGetValue().should('equal', text);

      // TODO(ngx-ui-testing): tagging should return an array of values
      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
    });

    it('can add and clear a new value', () => {
      cy.get('@CUT').ngxGetValue().should('equal', '');

      const text = 'Other';

      // TODO(ngx-ui-testing): support ngxFill for tagging
      cy.get('@CUT').find('input').click().type(text).type('{enter}');
      cy.get('@CUT').ngxGetValue().should('equal', text);

      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
    });

    it('can add and clear multiple values', () => {
      cy.get('@CUT').ngxGetValue().should('equal', '');

      cy.get('@CUT').select('DDOS').ngxGetValue().should('equal', 'DDOS');
      cy.get('@CUT').find('input').click().type('Other').type('{enter}');
      cy.get('@CUT').ngxGetValue().should('contain', 'DDOS').should('contain', 'Other');

      cy.get('@CUT').find('.ngx-select-clear').first().click();
      cy.get('@CUT').find('.ngx-select-clear').first().click();
    });

    it('is keyboard accessible', () => {
      cy.get('@SUT').find('h4').contains('Basic').realClick();

      cy.get('@CUT').within(() => {
        // Starts out not focused not open
        shouldBeNotFocused();
        shouldBeNotActive();

        // Tab into the select, now focused and open
        cy.realPress('Tab');
        shouldBeFocused();
        shouldBeActive();
      });
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100); // Wait for element to refocus

      cy.focused().type('Other{enter}'); // Input should be focused

      cy.get('@CUT').ngxGetValue().should('contain', 'Other');

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100); // Wait for element to refocus

      // Down arrow to select second item, closes list, stays active
      cy.realPress('ArrowDown');
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100); // Needed for testing!!!
      cy.realPress('Enter');

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(120); // Wait for element to refocus on input

      cy.get('@CUT').within(() => {
        shouldBeFocused();
        shouldBeActive();
      });

      cy.get('@CUT').ngxGetValue().should('contain', 'Other').should('contain', 'DDOS');

      // Clears with backspace
      cy.focused().type('{backspace}{backspace}{backspace}'); // For some reason needs three backspaces in testing
 
    });
  });

  describe('Input with AbstractControl', () => {
    beforeEach(() => {
      cy.getByName('formCtrl1').as('CUT');
      cy.get('[data-cy=reactiveFormSelectToggleBtn]').as('reactiveFormSelectToggleBtn');
    });

    it('should be able to be disabled', () => {
      cy.get('@CUT').should('not.have.class', 'disabled');
      cy.get('@reactiveFormSelectToggleBtn').click();
      cy.get('@CUT').should('have.class', 'disabled');
    });

    it('should be able to get re-enabled', () => {
      cy.get('@reactiveFormSelectToggleBtn').click();
      cy.get('@CUT').should('not.have.class', 'disabled');
    });
  });

  describe('Input with AbstractControl disabled by default', () => {
    beforeEach(() => {
      cy.getByName('formCtrl2').as('CUT');
    });

    it('should be able to be disabled', () => {
      cy.get('@CUT').should('have.class', 'disabled');
    });
  });

  describe('Filtering Input', () => {
    beforeEach(() => {
      cy.getByName('filtering').as('CUT');
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
      cy.get('[data-cy=templates]').as('CUT');
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
      cy.get('section header h1').contains('Multi Select').closest('ngx-section').as('SUT');
      cy.get('@SUT').find('ngx-select').first().as('CUT');
    });

    it('selects and clears value', () => {
      cy.get('@CUT').ngxGetValue().should('deep.equal', []);

      cy.get('@CUT').select('DDOS').ngxGetValue().should('deep.equal', ['DDOS']);
      cy.get('@CUT').select(['DDOS', 'Physical']).ngxGetValue().should('deep.equal', ['DDOS', 'Physical']);

      cy.get('@CUT').find('.ngx-select-clear').first().click();
      cy.get('@CUT').find('.ngx-select-clear').last().click();
      cy.get('@CUT').ngxGetValue().should('deep.equal', []);
    });

    it('is keyboard accessible', () => {
      cy.get('@SUT').find('h4').contains('Basic').realClick();
   
      // Starts out not focused not open
      shouldBeNotFocused();
      shouldBeNotActive();

      // Tab into the select, now focused but still closed
      cy.realPress('Tab');

      cy.get('@CUT').within(() => {
        shouldBeFocused();
        shouldBeNotActive();
      });

      // Down arrow to open and select first item
      cy.realPress('ArrowDown');

      cy.get('@CUT').within(() => {
        shouldBeFocused();
        shouldBeActive();
      });

      cy.get('.ngx-select-dropdown-options li li').first().should('have.class', 'active'); // active
      cy.get('.ngx-select-dropdown-options li li').last().should('not.have.class', 'active'); // not active

      cy.realPress('ArrowDown').realPress('ArrowDown');
      cy.get('.ngx-select-dropdown-options li li').first().should('not.have.class', 'active'); // not active
      cy.get('.ngx-select-dropdown-options li li').last().should('have.class', 'active'); // active

      // Escape to close list
      cy.realPress('Escape');

      cy.get('@CUT').within(() => {
        shouldBeFocused();
        shouldBeNotActive();
      });

      //  Arrow up to open and select last item
      cy.realPress('ArrowUp');
      cy.get('@CUT').within(() => {
        shouldBeFocused();
        shouldBeActive();
      });

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(10); // Needed for testing!!!

      cy.get('.ngx-select-dropdown-options li li').first().should('not.have.class', 'active'); // not active
      cy.get('.ngx-select-dropdown-options li li').last().should('have.class', 'active'); // active

      cy.realPress('ArrowUp');
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(10); // Needed for testing!!!
      cy.realPress('ArrowUp');
      cy.get('.ngx-select-dropdown-options li li').first().should('have.class', 'active'); // active
      cy.get('.ngx-select-dropdown-options li li').last().should('not.have.class', 'active'); // not active
        
      // Enter selects an option and leaves list open
      cy.realPress('Enter');
      cy.get('@CUT').within(() => {
        shouldBeFocused();
        shouldBeActive();
      });


      cy.get('@CUT').ngxGetValue().should('deep.equal', ['Breach']);

      // Space selects an option but leaves list open
      cy.realPress('ArrowDown');
      cy.realPress('Space');
      cy.get('@CUT').ngxGetValue().should('deep.equal', ['Breach', 'DDOS']);

      cy.get('@CUT').within(() => {
        shouldBeFocused();
        shouldBeActive();

        // Can deselect an option
        cy.realPress('ArrowUp');
        cy.realPress('Space');
      });


      cy.get('@CUT').ngxGetValue().should('deep.equal', ['DDOS']);

      cy.get('@CUT').within(() => {
        shouldBeFocused();
        shouldBeActive();
      });

      cy.get('@CUT').ngxClose();
      cy.realPress('Tab');
      
      cy.get('@CUT').within(() => {
        shouldBeNotFocused();
        shouldBeNotActive();
      });

    });
  });

  describe('Native Select', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="Native"] select').first().as('CUT');
    });

    it('selects value', () => {
      cy.get('@CUT').ngxGetValue().should('equal', 'Red');
      cy.get('@CUT').select('Green').ngxGetValue().should('equal', 'Green');
      cy.get('@CUT').select(2).ngxGetValue().should('equal', 'Blue-Green');
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
            userId: 1,
            id: 4,
            title: 'eum et est occaecati',
            body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'
          },
          {
            userId: 1,
            id: 6,
            title: 'dolorem eum magni eos aperiam quia',
            body: 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae'
          },
          {
            userId: 1,
            id: 8,
            title: 'dolorem dolore est ipsam',
            body: 'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae'
          }
        ]
      }).as('api');
    });

    it('selects value', () => {
      cy.get('@CUT').ngxGetValue().should('deep.equal', '');
      cy.get('@CUT').ngxOpen();
      cy.get('@CUT').find('input').ngxFill('dolorem');
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
      cy.get('@attackType').within(() => {
        cy.get('.ngx-select-dropdown-options').should('not.exist');
        cy.get('.ngx-select-input-box').click();
        cy.get('.ngx-select-dropdown-options').first().scrollIntoView();
        cy.get('.ngx-select-dropdown-options').should('be.visible');
      });

      cy.get('@attackTypeRequired').within(() => {
        cy.get('.ngx-select-dropdown-options').should('not.exist');
        cy.get('.ngx-select-input-box').click();
        cy.get('.ngx-select-dropdown-options').first().scrollIntoView();
        cy.get('.ngx-select-dropdown-options').should('be.visible');
      });

      // the current opened select should be closed
      cy.get('@attackType').find('.ngx-select-dropdown-options').should('not.exist');
    });

    it('should close on caret down click', () => {
      cy.get('@attackType').within(() => {
        cy.get('.ngx-select-dropdown-options').should('not.exist');
        cy.get('.ngx-select-caret').click();
        cy.get('.ngx-select-dropdown-options').first().scrollIntoView();
        cy.get('.ngx-select-dropdown-options').should('be.visible');
      });

      cy.get('@attackTypeRequired').within(() => {
        cy.get('.ngx-select-dropdown-options').should('not.exist');
        cy.get('.ngx-select-caret').click();
        cy.get('.ngx-select-dropdown-options').first().scrollIntoView();
        cy.get('.ngx-select-dropdown-options').should('be.visible');
      });

      // the current opened select should be closed
      cy.get('@attackType').find('.ngx-select-dropdown-options').should('not.exist');
    });
  });
});
