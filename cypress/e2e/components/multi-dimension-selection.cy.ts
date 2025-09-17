describe('Multi Dimension Selection', () => {
  before(() => {
    cy.visit('/multi-dimension-selection');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Multi Dimension Selection Component ', () => {
    it('displays the selection component after clicking on the filter', () => {
      cy.get('ngx-filter').first().find('div.ngx-chip').first().click();
      cy.get('ngx-multi-dimension-selection').first().should('exist');
    });

    it('displays child dimensions when clicking on a parent dimension', () => {
      cy.get('ngx-filter').first().find('div.ngx-chip').first().click();
      cy.get('ngx-multi-dimension-selection').first().as('CUT').should('exist');
      cy.get('@CUT').find('ngx-selection-list').find('li').contains('Option 6').click();
      cy.get('@CUT').find('ngx-selection-list').eq(1).find('li').contains('Option 6E').click();
      cy.get('@CUT').find('ngx-selection-list').eq(2).find('li').contains('Option 6E-1').should('exist');
      cy.get('@CUT').find('ngx-selection-list').should('have.length', 3);
    });

    it('finds matching results from all dimensions when entering a search term, regardless of letter casing', () => {
      cy.get('ngx-filter').first().find('div.ngx-chip').first().click();
      cy.get('ngx-multi-dimension-selection').first().as('CUT').should('exist');
      cy.get('@CUT').find('ngx-input').ngxFill('option 6e-1');
      cy.get('@CUT').find('ngx-selection-list').should('have.length', 3);
      cy.get('@CUT').find('ngx-selection-list').eq(0).find('li').contains('Option 6').should('exist');
      cy.get('@CUT').find('ngx-selection-list').eq(1).find('li').contains('Option 6E').should('exist');
      cy.get('@CUT').find('ngx-selection-list').eq(2).find('li').contains('Option 6E-1').should('exist');
    });

    it(`should display 'No matches...' when a search term is entered that does not match any options`, () => {
      cy.get('ngx-filter').first().find('div.ngx-chip').first().click();
      cy.get('ngx-multi-dimension-selection').first().as('CUT').should('exist');
      cy.get('@CUT').find('ngx-input').ngxFill('random text with no matches');
      cy.get('@CUT').find('ngx-selection-list').should('not.exist');
      cy.get('@CUT').find('span.selection-lists__no-results').should('contain.text', 'No matches...');
    });

    it('should select and deselect all options in every dimension when the select and deselect all buttons are clicked from the first dimension', () => {
      cy.get('ngx-filter').first().find('div.ngx-chip').as('SUT').first().click();
      cy.get('ngx-multi-dimension-selection').first().as('CUT').should('exist');
      cy.get('@CUT').find('button.select-deselect-all-btn').click();
      cy.get('@SUT').find('span.ngx-chip-value > span').should('contain.text', '40 Selected');
      cy.get('ngx-multi-dimension-selection').first().as('CUT').should('exist');
      cy.get('@CUT').find('button.select-deselect-all-btn').click();
      cy.get('@SUT').find('span.ngx-chip-value > span').should('contain.text', 'All');
    });

    it('should select all ancestors when selecting a nested option', () => {
      cy.dataCy('multi-dimension-filter-disabled-options').as('SUT').find('div.ngx-chip').first().click();
      cy.get('@SUT').find('ngx-multi-dimension-selection').as('CUT').should('exist').scrollIntoView();
      cy.get('@CUT').find('ngx-selection-list').eq(0).find('li').contains('Option 6').click();
      cy.get('@CUT').find('ngx-selection-list').eq(1).find('li').contains('Option 6E').should('exist').click();
      cy.get('@CUT').find('ngx-selection-list').eq(2).find('li').first().find('ngx-checkbox').click();
      cy.get('@SUT').find('span.ngx-chip-value > span').should('contain.text', '3 Selected');
    });
  });
});
