describe('Sections', () => {
  before(() => {
    cy.visit('/sections');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Section', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="Title and Shadow"]').as('SUT');
      cy.get('@SUT').find('ngx-section').first().as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').ngxOpen();
      cy.wait(100);
    });

    it('has no detectable a11y violations on load', () => {
      cy.get('@CUT').then($el => {
        cy.checkA11y($el);
      });
    });

    it('has aria tags', () => {
      cy.get('@CUT').within(() => {
        cy.get('.ngx-section-toggle')
          .should('have.attr', 'aria-controls', 'attack-details')
          .should('have.attr', 'aria-expanded', 'true');
        cy.root().ngxClose();
        cy.get('.ngx-section-toggle').should('have.attr', 'aria-expanded', 'false');
        cy.wait(100);
        cy.root().ngxOpen();
        cy.get('.ngx-section-toggle').should('have.attr', 'aria-expanded', 'true');
      });
    });

    it('Opens and closes sections with click', () => {
      cy.get('@CUT').within(() => {
        cy.get('.ngx-section-header').first().should('not.have.class', 'section-collapsed');
        cy.get('.ngx-section-content').first().should('exist');
        cy.get('.ngx-section-toggle').first().click();
        cy.wait(100);
        cy.get('.ngx-section-header').first().should('have.class', 'section-collapsed');
        cy.get('.ngx-section-content').should('not.exist');
      });
    });

    it('adds outline on focus', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-header').realClick({ x: 100, y: 10 });

        cy.get('@CUT').find('.ngx-section-toggle').as('toggle').should('have.css', 'outline-style', 'none');

        cy.realPress('Tab'); // Navigates to first button
        cy.get('@toggle')
          .should('have.css', 'outline-style', 'solid')
          .should('have.css', 'outline-color', 'rgb(148, 198, 255)');
      });
    });

    it('sections work using the keyboard only', () => {
      cy.get('@SUT').within(() => {
        cy.get('.ngx-section-header').realClick({ x: 100, y: 10 }); // Navigates to first section

        cy.get('@CUT').find('.ngx-section-header').should('not.have.class', 'section-collapsed');

        cy.realPress('Tab'); // Tabs to the toggle button

        cy.realPress('Space'); // Presses the button
        cy.get('@CUT').find('.ngx-section-header').should('have.class', 'section-collapsed');
        cy.wait(100);

        cy.realPress('Space'); // Presses the button
        cy.get('@CUT').find('.ngx-section-header').should('not.have.class', 'section-collapsed');
      });
    });
  });
});
