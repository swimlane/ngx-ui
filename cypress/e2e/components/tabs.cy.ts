describe('Tabs', () => {
  before(() => {
    cy.visit('/tabs');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Basic Tabs', () => {
    beforeEach(() => {
      cy.get('ngx-section').first().as('SUT');
      cy.get('ngx-tabs').first().as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').ngxSelectTab(0);
    });

    it('has no detectable a11y violations on load', () => {
      cy.get('@CUT').then($el => {
        cy.checkA11y($el);
      });
    });

    it('shows tabs', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-tab').eq(0).should('contain', 'Tab 1');
        cy.get('.ngx-tab').eq(1).should('contain', 'Tab 2');
        cy.get('.ngx-tab').eq(2).should('contain', 'Tab 3');
        cy.get('.ngx-tab').eq(3).should('contain', 'Tab 4');
      });
    });

    it('starts on first tab and should select other tabs on click', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-tab-content ngx-tab').eq(0).should('be.visible').should('contain', 'Tab 1 contents.');
        cy.get('.ngx-tab').eq(1).click();
        cy.get('.ngx-tab-content ngx-tab').eq(1).should('be.visible').should('contain', 'Tab 2 contents.');
        cy.get('.ngx-tab').eq(2).click();
        cy.get('.ngx-tab-content ngx-tab').eq(2).should('be.visible').should('contain', 'Tab 3 contents.');
        cy.get('.ngx-tab').eq(3).click();
        cy.get('.ngx-tab-content ngx-tab').eq(3).should('be.visible').should('contain', 'Tab 4 contents.');
      });
    });

    it('selects tabs using ngxSelectTab', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-tab-content ngx-tab').eq(0).should('be.visible').should('contain', 'Tab 1 contents.');
        cy.root().ngxSelectTab('Tab 2');
        cy.get('.ngx-tab-content ngx-tab').eq(1).should('be.visible').should('contain', 'Tab 2 contents.');
        cy.root().ngxSelectTab(2);
        cy.get('.ngx-tab-content ngx-tab').eq(2).should('be.visible').should('contain', 'Tab 3 contents.');
        cy.root().ngxSelectTab('Tab 4');
        cy.get('.ngx-tab-content ngx-tab').eq(3).should('be.visible').should('contain', 'Tab 4 contents.');
      });
    });

    it('adds outline on focus', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-header').realClick({ x: 100, y: 10 });

        cy.get('@CUT').find('.ngx-tab').eq(0).as('button').should('have.css', 'outline-style', 'none');

        cy.realPress('Tab'); // Navigates to first button
        cy.get('@button')
          .should('have.css', 'outline-style', 'solid')
          .should('have.css', 'outline-color', 'rgb(148, 198, 255)');
      });
    });

    it('starts on first tab and should select other tabs on keyboard', () => {
      cy.get('@SUT').get('.ngx-section-header').realClick({ x: 100, y: 10 });

      cy.get('@CUT').within(() => {
        cy.get('.ngx-tab-content ngx-tab').eq(0).should('be.visible').should('contain', 'Tab 1 contents.');
        cy.realPress(['Tab', 'Tab', 'Space']);
        cy.get('.ngx-tab-content ngx-tab').eq(1).should('be.visible').should('contain', 'Tab 2 contents.');
        cy.realPress(['Tab', 'Space']);
        cy.get('.ngx-tab-content ngx-tab').eq(2).should('be.visible').should('contain', 'Tab 3 contents.');
        cy.realPress(['Tab', 'Space']);
        cy.get('.ngx-tab-content ngx-tab').eq(3).should('be.visible').should('contain', 'Tab 4 contents.');
      });
    });
  });
});
