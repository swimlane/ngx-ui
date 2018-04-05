describe('ngx-ui demo', () => {
  before(() => {
    cy.visit('/');
    cy.get('.page-loader')
      .should('not.be.visible', {timeout: 20000});
  });

  it('loads', () => {
    cy.contains('Angular Style and Component Library');
  });

  const visitSection = (str) => {
    return () => {
      cy.get('ul.list-reset')
        .contains('li', str)
        .find('a')
        .click();
      cy.contains('h3', str)
        .should('be.visible');
    }
  }

  describe('Forms', () => {
    describe('Inputs', () => {
      beforeEach(visitSection('Inputs'));

      describe('Text Input', () => {
        beforeEach(() => {
          cy.get('ngx-input[name="input1"]')
            .as('CUT');
        });

        it('has a label', () => {
          cy.get('@CUT')
            .find('.ngx-input-label')
            .contains('Name');
        });

        it('has no placeholder', () => {
          cy.get('@CUT')
            .find('input')
            .then($el => {
              expect($el.attr('placeholder')).to.equal('');
            });
        });

        it('enters text', () => {
          const text = 'hello world';

          cy.get('@CUT')
            .find('input')
            .type(text)
            .blur();

          cy.get('@CUT')
            .find('input')
            .should('have.prop', 'value', text);
          cy.contains(`Output: "${text}"`);
        });
    
        it('underlines active input', () => {
          // reset active input box
          cy.get('@CUT')
            .find('input')
            .click()
            .blur();

          cy.get('@CUT')
            .find('.ngx-input-underline .underline-fill')
            .should('have.attr', 'style', 'width: 0%;');
    
          // when we click on the input box
          // it underlines it
          cy.get('@CUT')
            .find('input')
            .click();

          cy.get('@CUT')
            .find('.ngx-input-underline .underline-fill')
            .should('have.attr', 'style', 'width: 100%;');
        });
      });

      describe('Text Input with placeholder', () => {
        beforeEach(() => {
          cy.get('ngx-input[name="input2"]')
            .as('CUT');
        });

        it('adds a placeholder', () => {
          cy.get('@CUT')
            .find('input')
            .should('have.attr', 'placeholder', 'Enter your first and last name');
        });

        it('has no label', () => {
          cy.get('@CUT')
            .find('ngx-input-label')
            .should('have.length', 0);
        });

        it('underlines active input', () => {
          // reset active input box
          cy.get('@CUT')
            .find('input')
            .click()
            .blur();

          cy.get('@CUT')
            .find('.ngx-input-underline .underline-fill')
            .should('have.attr', 'style', 'width: 0%;');
    
          // when we click on the input box
          // it underlines it
          cy.get('@CUT')
            .find('input')
            .click();

          cy.get('@CUT')
            .find('.ngx-input-underline .underline-fill')
            .should('have.attr', 'style', 'width: 100%;');
        });
      });

      describe('Text Input with prefix and suffix', () => {
        beforeEach(() => {
          cy.get('ngx-input[label="Prefix Suffix Input"]')
            .as('CUT');
        });

        it('has a label', () => {
          cy.get('@CUT')
            .find('.ngx-input-label')
            .contains('Prefix Suffix Input');
        });

        it('have no placeholder', () => {
          cy.get('@CUT')
            .find('input')
            .then($el => {
              expect($el.attr('placeholder')).to.equal('');
            });
        });

        it('adds a prefix', () => {
          cy.get('@CUT')
            .find('ngx-input-prefix i')
            .should('have.attr', 'class', 'icon-add-new');
        });

        it('adds a suffix', () => {
          cy.get('@CUT')
            .contains('Clear');
        });
      });

      describe('Disabled Example', () => {
        beforeEach(() => {
          cy.get('ngx-input[name="input3"]')
            .as('CUT');
        });

        it('has a label', () => {
          cy.get('@CUT')
            .find('.ngx-input-label')
            .contains('Disabled Example');
        });

        it('has no placeholder', () => {
          cy.get('@CUT')
            .find('input')
            .then($el => {
              expect($el.attr('placeholder')).to.equal('');
            });
        });

        it('has a value', () => {
          cy.get('@CUT')
            .find('input')
            .should('have.prop', 'value', 'Disabled value');
        });

        it('should be disabled', () => {
          cy.get('@CUT')
            .find('input')
            .should('be.disabled');
        });
      });

      describe('Required Example', () => {
        beforeEach(() => {
          cy.get('ngx-input[name="input4"]')
            .as('CUT');
        });

        it('has a label with asterisk', () => {
          cy.get('@CUT')
            .find('.ngx-input-label')
            .contains('Required Input Example Of The Day *');
        });

        it('has no placeholder', () => {
          cy.get('@CUT')
            .find('input')
            .then($el => {
              expect($el.attr('placeholder')).to.equal('');
            });
        });

        it('should be required', () => {
          cy.get('@CUT')
            .find('input')
            .should('have.attr', 'required');
        });
      });

      describe('Default value', () => {
        beforeEach(() => {
          cy.get('ngx-input[name="input44"]')
            .as('CUT');
        });

        it('has a label', () => {
          cy.get('@CUT')
            .find('.ngx-input-label')
            .contains('Default value');
        });

        it('has no placeholder', () => {
          cy.get('@CUT')
            .find('input')
            .then($el => {
              expect($el.attr('placeholder')).to.equal('');
            });
        });

        it('should be required', () => {
          cy.get('@CUT')
            .find('input')
            .should('have.prop', 'value', 'Defaulted!');
        });
      });

      describe.only('Password', () => {
        beforeEach(() => {
          cy.get('ngx-input[name="input6"]')
            .as('CUT');
        });

        it('has a label', () => {
          cy.get('@CUT')
            .find('.ngx-input-label')
            .contains('Password *');
        });

        it('has no placeholder', () => {
          cy.get('@CUT')
            .find('input')
            .then($el => {
              expect($el.attr('placeholder')).to.equal('');
            });
        });

        it('should have a password ', () => {
          cy.get('@CUT')
            .find('input')
            .first()
            .should('have.attr', 'type', 'password');

          cy.get('@CUT')
            .find('input')
            .last()
            .should('have.attr', 'type', 'text');
        });

        it('should allow input', () => {
          cy.get('@CUT')
            .find('input')
            .then($el => {
              expect($el.prop('value')).to.equal('');
            });

          cy.get('@CUT')
            .find('input')
            .last()
            .should('be.hidden');
          
          const text = '>vQ9~4W$%ag!ACe$';
          
          cy.get('@CUT')
            .find('input')
            .first()
            .type(text)
            .blur();

          cy.get('@CUT')
            .find('input')
            .first()
            .should('have.prop', 'value', text);

          cy.get('@CUT')
            .find('input')
            .last()
            .should('have.prop', 'value', text);
        });

        it('should toggle password', () => {
          cy.get('@CUT')
            .find('input')
            .first()
            .should('not.be.hidden');

          cy.get('@CUT')
            .find('input')
            .last()
            .should('be.hidden');
          
          cy.get('@CUT')
            .find('.icon-eye')
            .click();
          
          cy.get('@CUT')
            .find('input')
            .first()
            .should('be.hidden');

          cy.get('@CUT')
            .find('input')
            .last()
            .should('not.be.hidden');
        });
      });
    });
  });

  context('Components', () => {
    beforeEach(visitSection('Overlay'));

    describe('Overlay', () => {
      const overlayMessage = 'Click anywhere to return';

      it('Shows overlay', () => {
        cy.contains('Show Overlay').click();
        cy.contains(overlayMessage).should('be.visible').click();
        cy.contains(overlayMessage).should('not.be.visible');
      });

      it('Handles small screen', () => {
        cy.contains('Show Overlay').click();
        cy.viewport(500, 600);

        const message = 'Your browser is too small';
        cy.contains(message).should('be.visible');

        cy.viewport(1000, 600);
        cy.contains(message).should('not.be.visible');

        cy.contains(overlayMessage).should('be.visible').click();
        cy.contains(overlayMessage).should('not.be.visible');
      });
    });
  });
});
