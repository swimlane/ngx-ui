describe('Inputs', () => {
  before(() => {
    cy.visit('/inputs');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Text Input', () => {
    beforeEach(() => {
      cy.getByName('input1').as('CUT');
    });

    it('has a label', () => {
      cy.get('@CUT').find('.ngx-input-label').contains('Name');
    });

    it('has no placeholder', () => {
      cy.get('@CUT')
        .findInput()
        .then($el => {
          expect($el.attr('placeholder')).to.equal('');
        });
    });

    it('entersand clears text', () => {
      const text = 'hello world';

      cy.get('@CUT').clear().type(text);

      cy.get('@CUT')
        .getValue()
        .should('equal', text);

      cy.get('@CUT')
        .clear()
        .getValue()
        .should('equal', '');
    });

    it('underlines active input', () => {
      // reset active input box
      cy.get('@CUT').findInput().click().blur();

      cy.get('@CUT')
        .find('.ngx-input-underline .underline-fill')
        .should(el => {
          expect(el).to.have.attr('style');
          expect(Cypress.$(el).attr('style')).to.match(/.*width:\s*0%.*/);
        });

      // when we click on the input box
      // it underlines it
      cy.get('@CUT').findInput().click();

      cy.get('@CUT')
        .find('.ngx-input-underline .underline-fill')
        .should(el => {
          expect(el).to.have.attr('style');
          expect(Cypress.$(el).attr('style')).to.match(/.*width:\s*100%.*/);
        });
    });
  });

  describe('Textarea Input', () => {
    beforeEach(() => {
      cy.getByName('input111').as('CUT');
    });

    it('has a label', () => {
      cy.get('@CUT').find('.ngx-input-label').contains('Name');
    });

    it('has no placeholder', () => {
      cy.get('@CUT')
        .findInput()
        .then($el => {
          expect($el.attr('placeholder')).to.equal('');
        });
    });

    it('enters text', () => {
      const text = ' hello world';

      cy.get('@CUT').clear().type(text);

      cy.get('@CUT').findInput().should('have.prop', 'value', text);
    });

    it('underlines active input', () => {
      // reset active input box
      cy.get('@CUT').findInput().click().blur();

      cy.get('@CUT')
        .find('.ngx-input-underline .underline-fill')
        .should(el => {
          expect(el).to.have.attr('style');
          expect(Cypress.$(el).attr('style')).to.match(/.*width:\s*0%.*/);
        });

      // when we click on the input box
      // it underlines it
      cy.get('@CUT').findInput().click();

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
      cy.getByName('input2').as('CUT');
    });

    it('adds a placeholder', () => {
      cy.get('@CUT').findInput().should('have.attr', 'placeholder', 'Enter your first and last name');
    });

    it('has no label', () => {
      cy.get('@CUT').find('ngx-input-label').should('have.length', 0);
    });

    it('underlines active input', () => {
      // reset active input box
      cy.get('@CUT').findInput().click().blur();

      cy.get('@CUT')
        .find('.ngx-input-underline .underline-fill')
        .should(el => {
          expect(el).to.have.attr('style');
          expect(Cypress.$(el).attr('style')).to.match(/.*width:\s*0%.*/);
        });

      // when we click on the input box
      // it underlines it
      cy.get('@CUT').findInput().click();

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

    it('has a label', () => {
      cy.get('@CUT').find('.ngx-input-label').contains('Prefix Suffix Input');
    });

    it('have no placeholder', () => {
      cy.get('@CUT')
        .findInput()
        .then($el => {
          expect($el.attr('placeholder')).to.equal('');
        });
    });

    it('adds a prefix', () => {
      cy.get('@CUT').find('ngx-input-prefix i').should('have.class', 'icon-add-new');
    });

    it('adds a suffix', () => {
      cy.get('@CUT').contains('Clear');
    });
  });

  describe('Disabled Example', () => {
    beforeEach(() => {
      cy.getByName('input3').as('CUT');
    });

    it('has a label', () => {
      cy.get('@CUT').find('.ngx-input-label').contains('Disabled Example');
    });

    it('has no placeholder', () => {
      cy.get('@CUT')
        .findInput()
        .then($el => {
          expect($el.attr('placeholder')).to.equal('');
        });
    });

    it('has a value', () => {
      cy.get('@CUT').findInput().should('have.prop', 'value', 'Disabled value');
    });

    it('should be disabled', () => {
      cy.get('@CUT').findInput().should('be.disabled');
    });
  });

  describe('Required Example', () => {
    beforeEach(() => {
      cy.get('ngx-input[name="input4"]').as('CUT');
    });

    it('has a label with asterisk', () => {
      cy.get('@CUT').find('.ngx-input-label').contains('Required Input Example Of The Day *');
    });

    it('has no placeholder', () => {
      cy.get('@CUT')
        .findInput()
        .then($el => {
          expect($el.attr('placeholder')).to.equal('');
        });
    });

    it('should be required', () => {
      cy.get('@CUT').findInput().should('have.attr', 'required');
    });
  });

  describe('Default value', () => {
    beforeEach(() => {
      cy.get('ngx-input[name="input44"]').as('CUT');
    });

    it('has a label', () => {
      cy.get('@CUT').find('.ngx-input-label').contains('Default value');
    });

    it('has no placeholder', () => {
      cy.get('@CUT')
        .findInput()
        .then($el => {
          expect($el.attr('placeholder')).to.equal('');
        });
    });

    it('should be required', () => {
      cy.get('@CUT').findInput().should('have.prop', 'value', 'Defaulted!');
    });
  });

  describe('Password', () => {
    beforeEach(() => {
      cy.getByName('input6').as('CUT');
    });

    it('has a label', () => {
      cy.get('@CUT').find('.ngx-input-label').contains('Password *');
    });

    it('has no placeholder', () => {
      cy.get('@CUT')
        .findInput()
        .then($el => {
          expect($el.attr('placeholder')).to.equal('');
        });
    });

    it('should have a password ', () => {
      cy.get('@CUT').findInput().first().should('have.attr', 'type', 'password');
    });

    it('should allow input', () => {
      cy.get('@CUT')
        .findInput()
        .then($el => {
          expect($el.prop('value')).to.equal('');
        });

      const text = '>vQ9~4W$%ag!ACe$';

      cy.get('@CUT').findInput().type(text).blur();
      cy.get('@CUT').findInput().should('have.prop', 'value', text);
    });

    it('should toggle password', () => {
      cy.get('@CUT').findInput().first().should('have.attr', 'type', 'password');

      cy.get('@CUT').find('.icon-eye').click();

      cy.get('@CUT').findInput().first().should('have.attr', 'type', 'text');
    });
  });
});
