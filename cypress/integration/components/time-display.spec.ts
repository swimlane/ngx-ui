describe('Date/Time Display', () => {
  const UTC = '2011-03-11T05:46:24.000Z';

  const LA_LOCAL = '03/10/2011 9:46 PM';

  const TOKYO_DISPLAY = 'Fri, Mar 11, 2011 2:46 PM +09:00 (JST)';
  const GMT_DISPLAY = 'Fri, Mar 11, 2011 5:46 AM +00:00 (UTC)';
  const LA_DISPLAY = 'Thu, Mar 10, 2011 9:46 PM -08:00 (PST)'; // America/Los_Angeles should be passed as TZ env var to cypress

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
          cy.get('time').should('contain.text', LA_DISPLAY).should('have.attr', 'datetime', UTC);
          cy.root()
            .closest('body')
            .find('ngx-tooltip-content')
            .should('contain.text', LA_DISPLAY)
            .and('contain.text', GMT_DISPLAY);
        });
    });
  });

  describe('Modes', () => {
    beforeEach(() => {
      cy.get('ngx-section').eq(2).as('SUT');
      cy.get('@SUT').find('ngx-time').as('CUT');
    });

    it('Human', () => {
      cy.get('@CUT')
        .eq(0)
        .whileHovering(() => {
          cy.get('time').should('contain.text', 'years ago').should('have.attr', 'datetime', UTC);
          cy.root()
            .closest('body')
            .find('ngx-tooltip-content')
            .should('contain.text', LA_DISPLAY)
            .and('contain.text', GMT_DISPLAY);
        });
    });

    it('Local', () => {
      cy.get('@CUT')
        .eq(1)
        .whileHovering(() => {
          cy.get('time').should('contain.text', LA_LOCAL).should('have.attr', 'datetime', '2011-03-10T21:46:24.000');
        });
    });
  });

  describe('Time Zones', () => {
    beforeEach(() => {
      cy.get('ngx-section').eq(4).as('SUT');
      cy.get('@SUT').find('ngx-time').as('CUT');
    });

    it('Specific Timezone', () => {
      cy.get('@CUT')
        .first()
        .whileHovering(() => {
          cy.get('time').should('contain.text', TOKYO_DISPLAY).should('have.attr', 'datetime', UTC);
          cy.root()
            .closest('body')
            .find('ngx-tooltip-content')
            .should('contain.text', LA_DISPLAY)
            .and('contain.text', GMT_DISPLAY);
        });
    });

    it('Default Input TimeZone', () => {
      cy.get('@CUT')
        .eq(1)
        .whileHovering(() => {
          cy.get('time').should('contain.text', LA_DISPLAY).should('have.attr', 'datetime', UTC);
          cy.root()
            .closest('body')
            .find('ngx-tooltip-content')
            .should('contain.text', LA_DISPLAY)
            .and('contain.text', GMT_DISPLAY);
        });
    });

    it('input overrides default', () => {
      cy.get('@CUT')
        .eq(2)
        .whileHovering(() => {
          cy.get('time').should('contain.text', LA_DISPLAY).should('have.attr', 'datetime', UTC);
          cy.root()
            .closest('body')
            .find('ngx-tooltip-content')
            .should('contain.text', LA_DISPLAY)
            .and('contain.text', GMT_DISPLAY);
        });
    });
  });

  describe('Popups', () => {
    beforeEach(() => {
      cy.get('ngx-section').eq(5).as('SUT');
      cy.get('@SUT').find('ngx-time').as('CUT');
    });

    it('Native Tooltip', () => {
      cy.get('@CUT')
        .first()
        .whileHovering(() => {
          cy.get('time').should('contain.text', LA_DISPLAY).should('have.attr', 'datetime', UTC);
          cy.get('.ngx-time__container')
            .invoke('attr', 'title')
            .should('contain', LA_DISPLAY)
            .and('contain', GMT_DISPLAY);
        });
    });

    it('Defined Timezones', () => {
      cy.get('@CUT')
        .eq(1)
        .whileHovering(() => {
          cy.get('time').should('contain.text', LA_DISPLAY).should('have.attr', 'datetime', UTC);
          cy.root()
            .closest('body')
            .find('ngx-tooltip-content')
            .should('contain.text', TOKYO_DISPLAY)
            .should('contain.text', LA_DISPLAY)
            .and('contain.text', GMT_DISPLAY);
        });
    });
  });
});
