describe('Buttons', () => {
  before(() => {
    cy.visit('/buttons', { failOnStatusCode: false });
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('button', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="Buttons"]').as('SUT');
    });

    it('has no detectable a11y violations on load', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-content button').then($el => {
          cy.checkA11y($el, {
            rules: {
              'color-contrast': { enabled: false } // NOTE: to be evaluated by UIUX
            }
          });
        });
      });
    });

    it('should have Default button', () => {
      cy.get('@SUT').within(() => {
        cy.get('button').contains('Default').should('exist').as('CUT');
        cy.get('@CUT').should('contain', 'Default').click();
      });
    });

    it('should have Primary button', () => {
      cy.get('@SUT').within(() => {
        cy.get('button').contains('Primary').should('exist').as('CUT');
        cy.get('@CUT').should('contain', 'Primary').click();
      });
    });

    it('adds outline on focus', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-content button').first().as('CUT');

        cy.get('@CUT').should('have.css', 'outline-style', 'none');
        cy.get('@CUT').should('have.css', 'outline-color', 'rgb(255, 255, 255)');

        cy.get('.ngx-section-content').realClick({ x: 10, y: 10 });
        cy.realPress('Tab'); // Navigates to first button
        cy.get('@CUT').should('have.css', 'outline-style', 'solid');
        cy.get('@CUT').should('have.css', 'outline-color', 'rgb(69, 80, 102)');
      });
    });

    it('buttons work using the keyboard only', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'log').as('consoleLog');
      });

      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-content').realClick({ x: 10, y: 10 }); // Navigates to first section

        cy.realPress('Tab'); // Navigates to first button
        cy.focused().should('have.text', 'Default').findPseudoAfter().its('opacity').should('eq', '1');
        cy.realPress('Space'); // Presses the button
        cy.get('@consoleLog').should('be.calledWith', 'Demo app click: Default');

        cy.realPress('Tab'); // Navigates to first button
        cy.focused().should('have.text', 'Primary').findPseudoAfter().its('opacity').should('eq', '1');
        cy.realPress('Space'); // Presses the button
        cy.get('@consoleLog').should('be.calledWith', 'Demo app click: Primary');
      });
    });

    it('does not focus on disable buttons', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-content').realClick({ x: 10, y: 10 }); // Navigates to first section
        cy.realPress('Tab')
          .realPress('Tab')
          .realPress('Tab')
          .realPress('Tab')
          .realPress('Tab')
          .realPress('Tab')
          .realPress('Tab'); // Navigates to last button
        cy.realPress('Tab');
        cy.focused().should('have.prop', 'tagName', 'PRE');
      });
    });
  });

  describe('ngx-button', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="ngx-button"]').as('SUT');
    });

    it('has no detectable a11y violations on load', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-content ngx-button').withinEach($el => {
          cy.checkA11y($el, {
            rules: {
              'color-contrast': { enabled: false } // NOTE: to be evaluated by UIUX
            }
          });
        });
      });
    });

    it('should have Default button', () => {
      cy.get('@SUT').within(() => {
        cy.clock();
        cy.get('ngx-button').contains('Default').parent('ngx-button').should('exist').as('CUT');

        cy.get('@CUT').should('contain', 'Default').click();
        cy.get('@CUT').should('have.class', 'in-progress');
        cy.tick(4000);
        cy.get('@CUT').should('have.class', 'success');
      });
    });

    it('should have Primary button', () => {
      cy.get('@SUT').within(() => {
        cy.clock();
        cy.get('ngx-button').contains('Primary').parent('ngx-button').should('exist').as('CUT');

        cy.get('@CUT').should('contain', 'Primary').click();
        cy.get('@CUT').should('have.class', 'in-progress');
        cy.tick(4000);
        cy.get('@CUT').should('have.class', 'fail');
      });
    });

    it('adds outline on focus', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-content ngx-button').first().as('CUT');

        cy.get('@CUT').find('button').should('have.css', 'outline-style', 'none');

        cy.get('.ngx-section-content').realClick({ x: 10, y: 10 });
        cy.realPress('Tab'); // Navigates to first button
        cy.get('@CUT').find('button').should('have.css', 'outline-style', 'solid');
      });
    });

    it('buttons work using the keyboard only', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'log').as('consoleLog');
      });

      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-content').realClick({ x: 10, y: 10 }); // Navigates to first section

        cy.realPress('Tab'); // Navigates to first button
        cy.focused().should('contain.text', 'Default').should('have.css', 'outline-style', 'solid');
        cy.realPress('Space'); // Presses the button
        cy.get('@consoleLog').should('be.calledWith', 'Demo app click: Default');

        cy.realPress('Tab'); // Navigates to first button
        cy.focused().should('contain.text', 'Primary').should('have.css', 'outline-style', 'solid');
        cy.realPress('Space'); // Presses the button
        cy.get('@consoleLog').should('be.calledWith', 'Demo app click: Primary');
      });
    });

    it('does not focus on disable buttons', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-content').realClick({ x: 10, y: 10 }); // Navigates to first section
        cy.realPress('Tab')
          .realPress('Tab')
          .realPress('Tab')
          .realPress('Tab')
          .realPress('Tab')
          .realPress('Tab')
          .realPress('Tab')
          .realPress('Tab'); // Navigates to last button
        cy.realPress('Tab');
        cy.focused().should('have.prop', 'tagName', 'PRE');
      });
    });
  });
});
