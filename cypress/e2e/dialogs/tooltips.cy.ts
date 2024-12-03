describe('Tooltips', () => {
  before(() => {
    cy.visit('/tooltip');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Tooltip', () => {
    beforeEach(() => {
      cy.get('ngx-section [ngx-tooltip]').first().as('CUT');
    });

    it('should show tooltip', () => {
      cy.get('@CUT').whileHovering(() => {
        cy.root().closest('body').find('ngx-tooltip-content').should('exist');
        cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', 'Phishing Attack');
      });
      cy.get('ngx-tooltip-content').should('exist');
    });
  });

  describe('Tooltip - Popover click', () => {
    it('should toggle on click', () => {
      cy.dataCy('popover-click').as('BUTTON');
      cy.get('@BUTTON').scrollIntoView();
      cy.get('@BUTTON').whileHovering(() => {
        // should not be visible on-hover
        cy.root().closest('body').get('.popover-custom').should('not.exist');
      });
      cy.get('@BUTTON').click();
      // should be visible on first click
      cy.get('.popover-custom').should('exist');
      cy.get('@BUTTON').click();
      // should no be visible on second click
      cy.root().find('.popover-custom').should('not.exist');
    });
  });
});
