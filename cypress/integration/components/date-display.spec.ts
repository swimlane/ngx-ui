describe('Date/Time Display', () => {
  const TOKYO = 'Friday, March 11, 2011 2:46 PM';
  const GMT = 'Friday, March 11, 2011 5:46 AM';
  const LA = 'Thursday, March 10, 2011 9:46 PM'; // America/Los_Angeles should be passed as TZ env var to cypress

  before(() => {
    cy.visit('/date-display');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Basic Dates', () => {
    beforeEach(() => {
      cy.get('ngx-section').first().as('SUT');
      cy.get('@SUT').find('ngx-date-display').as('CUT');
    });

    it('Default Date-Time', () => {
      cy.get('@CUT')
        .first()
        .whileHovering(() => {
          cy.get('abbr').should('contain.text', LA);
          cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', LA).and('contain.text', GMT);
        });
    });

    it('Human', () => {
      cy.get('@CUT')
        .eq(1)
        .whileHovering(() => {
          cy.get('abbr').should('contain.text', 'years ago');
          cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', LA).and('contain.text', GMT);
        });
    });

    it('Local', () => {
      cy.get('@CUT')
        .eq(2)
        .whileHovering(() => {
          cy.get('abbr').should('contain.text', LA);
        });
    });
  });

  describe('Time Zones', () => {
    beforeEach(() => {
      cy.get('ngx-section').eq(1).as('SUT');
      cy.get('@SUT').find('ngx-date-display').as('CUT');
    });

    it('Default Date-Time', () => {
      cy.get('@CUT')
        .first()
        .whileHovering(() => {
          cy.get('abbr').should('contain.text', 'Friday, March 11, 2011 2:46 PM');
          cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', LA).and('contain.text', GMT);
        });
    });

    it('Default Input TimeZone', () => {
      cy.get('@CUT')
        .eq(1)
        .whileHovering(() => {
          cy.get('abbr').should('contain.text', LA);
          cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', LA).and('contain.text', GMT);
        });
    });

    it('input overrides default', () => {
      cy.get('@CUT')
        .eq(2)
        .whileHovering(() => {
          cy.get('abbr').should('contain.text', LA);
          cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', LA).and('contain.text', GMT);
        });
    });
  });

  describe('Popups', () => {
    beforeEach(() => {
      cy.get('ngx-section').eq(2).as('SUT');
      cy.get('@SUT').find('ngx-date-display').as('CUT');
    });

    it('Native Tooltip', () => {
      cy.get('@CUT')
        .first()
        .whileHovering(() => {
          cy.get('abbr').should('contain.text', LA);
          cy.get('.ngx-date-display__container').invoke('attr', 'title').should('contain', LA).and('contain', GMT);
        });
    });

    it('Defined Timezones', () => {
      cy.get('@CUT')
        .eq(1)
        .whileHovering(() => {
          cy.get('abbr').should('contain.text', LA);
          cy.root()
            .closest('body')
            .find('ngx-tooltip-content')
            .should('contain.text', TOKYO)
            .should('contain.text', LA)
            .and('contain.text', GMT);
        });
    });
  });
});
