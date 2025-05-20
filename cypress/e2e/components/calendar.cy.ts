import moment from 'moment-timezone';

describe('Calendar', () => {
  moment.suppressDeprecationWarnings = true;
  // TODO: replace date with static date instead of today.
  const today = moment();

  const NOT_FOCUSED = 'rgb(148, 198, 255) 0px';
  const FOCUSED = 'rgb(148, 198, 255) solid 2px';

  before(() => {
    cy.visit('/calendar');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('Check A11y', () => {
    cy.get('ngx-calendar').withinEach($el => {
      cy.checkA11y($el, {
        rules: {
          'color-contrast': { enabled: false } // NOTE: to be evaluated by UIUX
        }
      } as any);
    });
  });

  describe('Calendar', () => {
    beforeEach(() => {
      cy.get('ngx-section').first().as('SUT');
      cy.get('@SUT').find('ngx-calendar').first().as('CUT').scrollIntoView();
    });

    it('shows a calendar', () => {
      cy.get('@CUT')
        .should('exist')
        .within(() => {
          cy.get('.title-row .title').contains(today.format('MMMM YYYY'));
          cy.get('.day.active')
            .should('contain.text', today.date())
            .should('have.class', 'today')
            .should('have.class', 'focus')
            .should('have.attr', 'tabindex', '0');

          cy.get('.day.active')
            .parent()
            .siblings()
            .find('button')
            .should('have.class', 'day')
            .should('not.have.class', 'today')
            .should('not.have.class', 'focus')
            .should('have.attr', 'tabindex', '-1');
        });
    });

    it('is keyboard accessible', () => {
      cy.get('@SUT').find('h1').realClick();
      cy.get('@CUT').within(() => {
        const focusedDate = today.clone();

        cy.get('.prev-month').should('have.css', 'outline', NOT_FOCUSED);
        cy.get('.title').should('have.css', 'outline', NOT_FOCUSED);
        cy.get('.next-month').should('have.css', 'outline', NOT_FOCUSED);
        cy.get('.title').should('contain.text', focusedDate.format('MMMM YYYY'));

        cy.realPress('Tab'); // Tab to previous month
        cy.get('.prev-month').should('have.css', 'outline', FOCUSED);
        cy.get('.title').should('have.css', 'outline', NOT_FOCUSED);
        cy.get('.next-month').should('have.css', 'outline', NOT_FOCUSED);
        cy.realPress('Space'); // Enter to previous month
        cy.get('.title').should('contain.text', focusedDate.add(-1, 'month').format('MMMM YYYY'));

        cy.realPress('Tab'); // Tab to title
        cy.get('.prev-month').should('have.css', 'outline', NOT_FOCUSED);
        cy.get('.title').should('have.css', 'outline', FOCUSED);
        cy.get('.next-month').should('have.css', 'outline', NOT_FOCUSED);
        cy.get('.title').should('contain.text', focusedDate.format('MMMM YYYY'));

        cy.realPress('Tab'); // Tab to next month
        cy.get('.prev-month').should('have.css', 'outline', NOT_FOCUSED);
        cy.get('.title').should('have.css', 'outline', NOT_FOCUSED);
        cy.get('.next-month').should('have.css', 'outline', FOCUSED);
        cy.realPress('Space'); // Enter to next month
        cy.realPress('Space');
        cy.get('.title').should('contain.text', focusedDate.add(2, 'month').format('MMMM YYYY'));

        cy.realPress('Tab'); // Tab to day
        cy.get('.prev-month').should('have.css', 'outline', NOT_FOCUSED);
        cy.get('.title').should('have.css', 'outline', NOT_FOCUSED);
        cy.get('.next-month').should('have.css', 'outline', NOT_FOCUSED);
        cy.get('.title').should('contain.text', focusedDate.format('MMMM YYYY'));

        // Moving Date
        cy.get('.day.focus').should('contain.text', focusedDate.date());
        cy.realPress('ArrowLeft');
        cy.get('.day.focus').should('contain.text', focusedDate.add(-1, 'day').date());
        cy.realPress('ArrowRight');
        cy.realPress('ArrowRight');
        cy.get('.day.focus').should('contain.text', focusedDate.add(2, 'day').date());
        cy.realPress('ArrowUp');
        cy.get('.day.focus').should('contain.text', focusedDate.add(-1, 'week').date());
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');
        cy.get('.day.focus').should('contain.text', focusedDate.add(2, 'week').date());
        cy.get('.title').should('contain.text', focusedDate.format('MMMM YYYY'));

        // Moving Month
        cy.realPress('PageUp');
        cy.get('.day.focus').should('contain.text', focusedDate.add(-1, 'month').date());
        cy.realPress('PageDown');
        cy.realPress('PageDown');
        cy.get('.day.focus').should('contain.text', focusedDate.add(2, 'month').date());

        // Moving Year
        cy.realPress(['Alt', 'PageUp']);
        cy.get('.title').should('contain.text', focusedDate.add(-1, 'year').format('MMMM YYYY'));
        cy.realPress(['Alt', 'PageDown']);
        cy.realPress(['Alt', 'PageDown']);
        cy.get('.title').should('contain.text', focusedDate.add(2, 'year').format('MMMM YYYY'));

        // Selecting Date
        cy.realPress('Space');
        cy.get('.day.focus').should('have.class', 'active');
      });
    });
  });

  describe('Disabled Calendar', () => {
    beforeEach(() => {
      cy.get('ngx-section').first().as('SUT');
      cy.get('@SUT').find('ngx-calendar').eq(2).as('CUT').scrollIntoView();
    });

    it('shows a calendar', () => {
      cy.get('@CUT')
        .should('exist')
        .within(() => {
          cy.get('.title-row .title').contains(today.format('MMMM YYYY'));
          cy.root().should('have.class', 'ngx-calendar--disabled');
          cy.get('.day.active')
            .should('contain.text', today.date())
            .should('have.class', 'today')
            .should('not.have.class', 'focus')
            .should('have.attr', 'tabindex', '-1');
        });
    });
  });

  describe('Month View', () => {
    beforeEach(() => {
      cy.get('ngx-section').first().as('SUT');
      cy.getByName('calendar5').as('CUT').scrollIntoView();
    });

    it('shows a calendar', () => {
      cy.get('@CUT')
        .should('exist')
        .within(() => {
          cy.get('.title-row .title').contains(today.format('YYYY'));
          cy.get('.month.active')
            .should('contain.text', today.format('MMM'))
            .should('have.class', 'current')
            .should('have.class', 'focus')
            .should('have.attr', 'tabindex', '0');

          cy.get('.month.active')
            .parent()
            .siblings()
            .find('button')
            .should('have.class', 'month')
            .should('not.have.class', 'current')
            .should('not.have.class', 'focus')
            .should('have.attr', 'tabindex', '-1');
        });
    });

    it('is keyboard accessible', () => {
      cy.get('@CUT').prev('h4').realClick();
      cy.get('@CUT').within(() => {
        const focusedDate = today.clone();

        cy.get('.title').should('contain.text', focusedDate.format('YYYY'));

        cy.realPress('Tab');
        cy.realPress('Tab');
        cy.realPress('Tab');
        cy.realPress('Tab'); // On date

        // Moving Month
        cy.get('.month.focus').should('contain.text', focusedDate.format('MMM'));
        cy.realPress('ArrowLeft');
        cy.get('.month.focus').should('contain.text', focusedDate.add(-1, 'month').format('MMM'));
        cy.realPress('ArrowRight');
        cy.realPress('ArrowRight');
        cy.get('.month.focus').should('contain.text', focusedDate.add(2, 'month').format('MMM'));
        cy.realPress('ArrowUp');
        cy.get('.month.focus').should('contain.text', focusedDate.add(-3, 'month').format('MMM'));
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');
        cy.get('.month.focus').should('contain.text', focusedDate.add(6, 'month').format('MMM'));
        cy.get('.title').should('contain.text', focusedDate.format('YYYY'));

        // Moving Year
        cy.realPress('PageUp');
        cy.get('.title').should('contain.text', focusedDate.add(-1, 'year').format('YYYY'));
        cy.realPress('PageDown');
        cy.realPress('PageDown');
        cy.get('.title').should('contain.text', focusedDate.add(2, 'year').format('YYYY'));

        cy.realPress('Space');
        cy.get('.title').should('contain.text', focusedDate.format('MMMM YYYY'));
      });
    });
  });

  describe('Year View', () => {
    beforeEach(() => {
      cy.get('ngx-section').first().as('SUT');
      cy.getByName('calendar6').as('CUT').scrollIntoView().focus();
    });

    it('shows a calendar', () => {
      cy.get('@CUT')
        .should('exist')
        .within(() => {
          cy.get('.title-row .title').contains('2021 - 2041');
          cy.get('.year.active')
            .should('contain.text', today.format('YYYY'))
            .should('have.class', 'current')
            .should('have.class', 'focus')
            .should('have.attr', 'tabindex', '0');

          cy.get('.year.active')
            .parent()
            .siblings()
            .find('button')
            .should('have.class', 'year')
            .should('not.have.class', 'current')
            .should('not.have.class', 'focus')
            .should('have.attr', 'tabindex', '-1');
        });
    });

    // TODO: flaky in CI, works in Open Mode.

    xit('is keyboard accessible', () => {
      cy.get('@CUT').prev('h4').realClick();
      cy.get('@CUT').within(() => {
        cy.root().scrollIntoView();
        const focusedDate = today.clone();
        cy.get('.title').should('contain.text', '2021 - 2041');

        cy.get('.year.focus').focus();

        // Moving Year
        cy.get('.year.focus').should('contain.text', focusedDate.year());
        cy.realPress('ArrowLeft');
        cy.get('.year.focus').should('contain.text', focusedDate.add(-1, 'year').year());
        cy.realPress('ArrowLeft');
        cy.realPress('ArrowLeft');
        cy.realPress('ArrowDown');
        cy.get('.year.focus').should('contain.text', focusedDate.add(2, 'year').year());
        cy.realPress('ArrowUp');
        cy.get('.year.focus').should('contain.text', focusedDate.add(-4, 'year').year());
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');
        cy.get('.year.focus').should('contain.text', focusedDate.add(8, 'year').year());
        cy.get('.title').should('contain.text', '2021 - 2041');

        // Moving Decade
        cy.realPress('PageUp');
        cy.get('.title').should('contain.text', '2001 - 2021');
        cy.realPress('PageDown');
        cy.realPress('PageDown');
        cy.get('.title').should('contain.text', '2041 - 2061');

        cy.realPress('Space');
        cy.get('.title').should('contain.text', focusedDate.add(20, 'year').year());
      });
    });
  });
});
