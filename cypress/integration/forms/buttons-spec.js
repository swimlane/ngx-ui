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
              'color-contrast': { enabled: false }
            }
          });
        });
      });
    });

    it('adds outline on focus', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-content button').first().as('CUT');

        cy.get('@CUT').findPseudoAfter().its('opacity').should('eq', '0');

        cy.get('.ngx-section-content').realClick({ x: 10, y: 10 });
        cy.realPress('Tab'); // Navigates to first button
        cy.get('@CUT').findPseudoAfter().its('opacity').should('eq', '1');
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

    it('does not fucus on disable buttons', () => {
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
        cy.get('.ngx-section-content ngx-button').then($el => {
          cy.checkA11y($el, {
            rules: {
              'color-contrast': { enabled: false }
            }
          });
        });
      });
    });

    it('adds outline on focus', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-content ngx-button').first().as('CUT');

        cy.get('@CUT').find('button').findPseudoAfter().its('opacity').should('eq', '0');

        cy.get('.ngx-section-content').realClick({ x: 10, y: 10 });
        cy.realPress('Tab'); // Navigates to first button
        cy.get('@CUT').find('button').findPseudoAfter().its('opacity').should('eq', '1');
      });
    });

    it('buttons work using the keyboard only', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'log').as('consoleLog');
      });

      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-content').realClick({ x: 10, y: 10 }); // Navigates to first section

        cy.realPress('Tab'); // Navigates to first button
        cy.focused().should('contain.text', 'Default').findPseudoAfter().its('opacity').should('eq', '1');
        cy.realPress('Space'); // Presses the button
        cy.get('@consoleLog').should('be.calledWith', 'Demo app click: Default');

        cy.realPress('Tab'); // Navigates to first button
        cy.focused().should('contain.text', 'Primary').findPseudoAfter().its('opacity').should('eq', '1');
        cy.realPress('Space'); // Presses the button
        cy.get('@consoleLog').should('be.calledWith', 'Demo app click: Primary');
      });
    });

    it('does not fucus on disable buttons', () => {
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
