describe('Inputs', () => {
  before(() => {
    cy.visit('/inputs');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Text Input', () => {
    const defaultText = 'A Value';

    beforeEach(() => {
      cy.getByName('input1').as('CUT');
    });

    it('has no detectable a11y violations on load', () => {
      cy.get('@CUT').then($el => {
        cy.checkA11y($el);
      });
    });

    afterEach(() => {
      cy.get('@CUT').ngxSetValue(defaultText);
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().should('contain.text', 'Name');
    });

    it('has no placeholder', () => {
      cy.get('@CUT').ngxFindNativeInput().should('have.attr', 'placeholder', '');
    });

    it('enters and clears text', () => {
      const text = 'hello world';

      cy.get('@CUT').ngxGetValue().should('equal', defaultText);

      cy.get('@CUT').ngxFill(text).ngxGetValue().should('equal', text);

      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
    });

    it('enters and clears text using native elements', () => {
      const text = 'hello world';

      cy.get('@CUT').ngxFindNativeInput().ngxGetValue().should('equal', defaultText);

      cy.get('@CUT').ngxFindNativeInput().ngxFill(text).ngxGetValue().should('equal', text);

      cy.get('@CUT').ngxFindNativeInput().clear().ngxGetValue().should('equal', '');
    });

    it('underlines active input', () => {
      // cy.get('@CUT')
      //   .find('.ngx-input-underline .underline-fill')
      //   .invoke('attr', 'style')
      //   .should('contain', 'width: 0%');

      // when we click on the input box
      // it underlines it
      cy.get('@CUT').click();

      cy.get('@CUT')
        .find('.ngx-input-underline .underline-fill')
        .invoke('attr', 'style')
        .should('contain', 'width: 100%');
    });
  });

  describe('Native Input', () => {
    beforeEach(() => {
      cy.getByLabel('Text').as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').ngxSetValue('');
    });

    it('enters and clears text', () => {
      const text = 'hello world';

      cy.get('@CUT').ngxGetValue().should('equal', '');

      cy.get('@CUT').ngxFill(text);

      cy.get('@CUT').ngxGetValue().should('equal', text);

      cy.get('@CUT').clear();

      cy.get('@CUT').ngxGetValue().should('equal', '');
    });
  });

  describe('Textarea Input', () => {
    beforeEach(() => {
      cy.getByName('input111').as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').ngxSetValue('A Value');
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().contains('Name');
    });

    it('has no placeholder', () => {
      cy.get('@CUT').ngxFindNativeInput().should('have.attr', 'placeholder', '');
    });

    it('enters text', () => {
      const text = ' hello world';

      cy.get('@CUT').ngxFill(text);

      cy.get('@CUT').ngxGetValue().should('equal', text);
    });

    it('underlines active input', () => {
      cy.get('@CUT')
        .find('.ngx-input-underline .underline-fill')
        .should(el => {
          expect(el).to.have.attr('style');
          expect(Cypress.$(el).attr('style')).to.match(/.*width:\s*0%.*/);
        });

      // when we click on the input box
      // it underlines it
      cy.get('@CUT').ngxFindNativeInput().click();

      cy.get('@CUT')
        .find('.ngx-input-underline .underline-fill')
        .should(el => {
          expect(el).to.have.attr('style');
          expect(Cypress.$(el).attr('style')).to.match(/.*width:\s*100%.*/);
        });
    });
  });

  describe('Text Input with placeholder', () => {
    beforeEach(() => {
      cy.getByPlaceholder('Enter your first and last name').as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').ngxSetValue('');
    });

    it('has no detectable a11y violations on load', () => {
      cy.get('@CUT').then($el => {
        cy.checkA11y($el)
      });
    });

    it('adds a placeholder', () => {
      cy.get('@CUT').ngxFindNativeInput().should('have.attr', 'placeholder', 'Enter your first and last name');
    });

    it('underlines active input', () => {
      // reset active input box
      cy.focused().blur();

      cy.get('@CUT')
        .find('.ngx-input-underline .underline-fill')
        .should(el => {
          expect(el).to.have.attr('style');
          expect(Cypress.$(el).attr('style')).to.match(/.*width:\s*0%.*/);
        });

      // when we click on the input box
      // it underlines it
      cy.get('@CUT').ngxFindNativeInput().click();

      cy.get('@CUT')
        .find('.ngx-input-underline .underline-fill')
        .should(el => {
          expect(el).to.have.attr('style');
          expect(Cypress.$(el).attr('style')).to.match(/.*width:\s*100%.*/);
        });
    });
  });

  describe('Text Input with prefix and suffix', () => {
    beforeEach(() => {
      cy.getByLabel('Prefix Suffix Input').as('CUT');
    });
    afterEach(() => {
      cy.get('@CUT').ngxSetValue('');
    });

    it('has no detectable a11y violations on load', () => {
      cy.get('@CUT').find('.ngx-input-flex-wrap-inner').then($el => {
        cy.checkA11y($el)
      });
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().should('contain.text', 'Prefix Suffix Input');
    });

    it('have no placeholder', () => {
      cy.get('@CUT').ngxFindNativeInput().should('have.attr', 'placeholder', '');
    });

    it('adds a prefix', () => {
      cy.get('@CUT').find('ngx-input-prefix i').should('have.class', 'icon-add-new');
    });

    it('adds a suffix', () => {
      cy.get('@CUT').should('contain.text', 'Clear');
    });
  });

  describe('Disabled Example', () => {
    beforeEach(() => {
      cy.getByName('input3').as('CUT');
    });

    it('has no detectable a11y violations on load', () => {
      cy.get('@CUT').find('.ngx-input-flex-wrap-inner').then($el => {
        cy.checkA11y($el)
      });
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().should('contain.text', 'Disabled Example');
    });

    it('has no placeholder', () => {
      cy.get('@CUT').ngxFindNativeInput().should('have.attr', 'placeholder', '');
    });

    it('has a value', () => {
      cy.get('@CUT').ngxGetValue().should('equal', 'Disabled value');
    });

    it('should be disabled', () => {
      cy.get('@CUT').ngxFindNativeInput().should('be.disabled');
    });
  });

  describe('Required Example', () => {
    beforeEach(() => {
      cy.get('ngx-input[name="input4"]').as('CUT');
    });

    it('has no detectable a11y violations on load', () => {
      cy.get('@CUT').find('.ngx-input-flex-wrap-inner').then($el => {
        cy.checkA11y($el)
      });
    });

    it('has a label with asterisk', () => {
      cy.get('@CUT').ngxFindLabel().should('contain.text', 'Required Input Example Of The Day');
      // todo: check if the asterisk is in the right place
    });

    it('has no placeholder', () => {
      cy.get('@CUT').ngxFindNativeInput().should('have.attr', 'placeholder', '');
    });

    it('should be required', () => {
      cy.get('@CUT').ngxFindNativeInput().should('have.attr', 'required');
    });
  });

  describe('Default value', () => {
    beforeEach(() => {
      cy.get('ngx-input[name="input44"]').as('CUT');
    });

    it('has no detectable a11y violations on load', () => {
      cy.get('@CUT').find('.ngx-input-flex-wrap-inner').then($el => {
        cy.checkA11y($el)
      });
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().should('contain.text', 'Default value');
    });

    it('has no placeholder', () => {
      cy.get('@CUT').ngxFindNativeInput().should('have.attr', 'placeholder', '');
    });

    it('should be required', () => {
      cy.get('@CUT').ngxGetValue().should('equal', 'Defaulted!');
    });
  });

  describe('Password', () => {
    beforeEach(() => {
      cy.getByName('input6').as('CUT');
    });

    it('has no detectable a11y violations on load', () => {
      cy.get('@CUT').find('.ngx-input-flex-wrap-inner').then($el => {
        cy.checkA11y($el)
      });
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().contains('Password *');
    });

    it('has no placeholder', () => {
      cy.get('@CUT').ngxFindNativeInput().should('have.attr', 'placeholder', '');
    });

    it('should have a password ', () => {
      cy.get('@CUT').ngxFindNativeInput().first().should('have.attr', 'type', 'password');
    });

    it('should allow input', () => {
      const text = '>vQ9~4W$%ag!ACe$';

      cy.get('@CUT').ngxFill(text);
      cy.get('@CUT').ngxGetValue().should('equal', text);
    });

    it('should toggle password', () => {
      cy.get('@CUT').ngxFindNativeInput().first().should('have.attr', 'type', 'password');

      cy.get('@CUT').find('.icon-eye').click();

      cy.get('@CUT').ngxFindNativeInput().first().should('have.attr', 'type', 'text');
    });
  });
});
