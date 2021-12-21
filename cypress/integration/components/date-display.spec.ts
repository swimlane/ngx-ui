import moment from 'moment-timezone';

describe('Date/Time Display', () => {

  const TOHOKU_EARTHQUAKE = '2011-03-11T05:46:24Z';
  const TOHOKU_TOKYO = 'Friday, March 11, 2011 2:46 PM';
  const TOHOKU_GMT = 'Friday, March 11, 2011 5:46 AM';
  const localTimezone = moment.tz.guess();
  const localString = moment(TOHOKU_EARTHQUAKE).tz(localTimezone).format('LLL');

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
      cy.get('@CUT').first().whileHovering(() => {
        cy.get('abbr').should('contain.text', localString);
        cy.root().closest('body').find('ngx-tooltip-content')
          .should('contain.text', localString)
          .and('contain.text', TOHOKU_GMT);
      });
    });

    it('Human', () => {
      cy.get('@CUT').eq(1).whileHovering(() => {
        cy.get('abbr').should('contain.text', 'years ago');
        cy.root().closest('body').find('ngx-tooltip-content')
          .should('contain.text', localString)
          .and('contain.text', TOHOKU_GMT);
      });
    });

    it('Local', () => {
      cy.get('@CUT').eq(2).whileHovering(() => {
        cy.get('abbr').should('contain.text', localString);
      });
    });
  });

  describe('Time Zones', () => {
    beforeEach(() => {
      cy.get('ngx-section').eq(1).as('SUT');
      cy.get('@SUT').find('ngx-date-display').as('CUT');
    });

    it('Default Date-Time', () => {
      cy.get('@CUT').first().whileHovering(() => {
        cy.get('abbr').should('contain.text', 'Friday, March 11, 2011 2:46 PM');
        cy.root().closest('body').find('ngx-tooltip-content')
          .should('contain.text', localString)
          .and('contain.text', TOHOKU_GMT);
      });
    });

    it('Default Input TimeZone', () => {
      cy.get('@CUT').eq(1).whileHovering(() => {
        cy.get('abbr').should('contain.text', localString);
        cy.root().closest('body').find('ngx-tooltip-content')
          .should('contain.text', localString)
          .and('contain.text', TOHOKU_GMT);
      });
    });

    it('input overrides default', () => {
      cy.get('@CUT').eq(2).whileHovering(() => {
        cy.get('abbr').should('contain.text', localString);
        cy.root().closest('body').find('ngx-tooltip-content')
          .should('contain.text', localString)
          .and('contain.text', TOHOKU_GMT);
      });
    });
  });

  describe('Popups', () => {
    beforeEach(() => {
      cy.get('ngx-section').eq(2).as('SUT');
      cy.get('@SUT').find('ngx-date-display').as('CUT');
    });

    it('Native Tooltip', () => {
      cy.get('@CUT').first().whileHovering(() => {
        cy.get('abbr').should('contain.text', localString);
        cy.get('.ngx-date-display__container').invoke('attr', 'title')
          .should('contain', localString)
          .and('contain', TOHOKU_GMT);
      });
    });

    it('Defined Timezones', () => {
      cy.get('@CUT').eq(1).whileHovering(() => {
        cy.get('abbr').should('contain.text', localString);
        cy.root().closest('body').find('ngx-tooltip-content')
          .should('contain.text', TOHOKU_TOKYO)
          .should('contain.text', localString)
          .and('contain.text', TOHOKU_GMT);
      });
    });
  });
});