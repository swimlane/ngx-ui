describe('Date/Time Display', () => {
  const UTC = '2011-03-11T05:46:24.000Z';
  const TOKYO = 'Friday, March 11, 2011 2:46 PM';
  const GMT = 'Friday, March 11, 2011 5:46 AM';
  const LA = 'Thursday, March 10, 2011 9:46 PM'; // America/Los_Angeles should be passed as TZ env var to cypress

  before(() => {
    cy.visit('/time-display');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Basic Dates', () => {
    beforeEach(() => {
      cy.get('ngx-section').first().as('SUT');
      cy.get('@SUT').find('ngx-time').as('CUT');
    });

    it('Default Date-Time', () => {
      cy.get('@CUT')
        .first()
        .whileHovering(() => {
          cy.get('time').should('contain.text', LA).should('have.attr', 'datetime', UTC);
          cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', LA).and('contain.text', GMT);
        });
    });

    it('Human', () => {
      cy.get('@CUT')
        .eq(1)
        .whileHovering(() => {
          cy.get('time').should('contain.text', 'years ago').should('have.attr', 'datetime', UTC);
          cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', LA).and('contain.text', GMT);
        });
    });

    it('Local', () => {
      cy.get('@CUT')
        .eq(2)
        .whileHovering(() => {
          cy.get('time').should('contain.text', LA).should('have.attr', 'datetime', '2011-03-10T21:46:24.000');
        });
    });
  });

  describe('Time Zones', () => {
    beforeEach(() => {
      cy.get('ngx-section').eq(1).as('SUT');
      cy.get('@SUT').find('ngx-time').as('CUT');
    });

    it('Default Date-Time', () => {
      cy.get('@CUT')
        .first()
        .whileHovering(() => {
          cy.get('time').should('contain.text', 'Friday, March 11, 2011 2:46 PM').should('have.attr', 'datetime', UTC);
          cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', LA).and('contain.text', GMT);
        });
    });

    it('Default Input TimeZone', () => {
      cy.get('@CUT')
        .eq(1)
        .whileHovering(() => {
          cy.get('time').should('contain.text', LA).should('have.attr', 'datetime', UTC);
          cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', LA).and('contain.text', GMT);
        });
    });

    it('input overrides default', () => {
      cy.get('@CUT')
        .eq(2)
        .whileHovering(() => {
          cy.get('time').should('contain.text', LA).should('have.attr', 'datetime', UTC);
          cy.root().closest('body').find('ngx-tooltip-content').should('contain.text', LA).and('contain.text', GMT);
        });
    });
  });

  describe('Popups', () => {
    beforeEach(() => {
      cy.get('ngx-section').eq(2).as('SUT');
      cy.get('@SUT').find('ngx-time').as('CUT');
    });

    it('Native Tooltip', () => {
      cy.get('@CUT')
        .first()
        .whileHovering(() => {
          cy.get('time').should('contain.text', LA).should('have.attr', 'datetime', UTC);
          cy.get('.ngx-time__container').invoke('attr', 'title').should('contain', LA).and('contain', GMT);
        });
    });

    it('Defined Timezones', () => {
      cy.get('@CUT')
        .eq(1)
        .whileHovering(() => {
          cy.get('time').should('contain.text', LA).should('have.attr', 'datetime', UTC);
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
