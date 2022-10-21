describe('Date/Time', () => {
  const INVALID = 'rgb(255, 69, 20)';
  const FOCUSED = 'rgb(20, 131, 255)';
  const UNFOCUSED = 'rgb(129, 143, 169)';
  const FOCUS_OUTLINE = 'rgb(148, 198, 255) solid 2px';

  before(() => {
    cy.visit('/datetime');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('Check A11y', () => {
    cy.get('ngx-date-time').each($el => {
      cy.checkA11y($el);
    });
  });

  describe('Basic Date Input', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="Date Input"]').as('SUT');
      cy.get('@SUT').getByLabel('Date of attack').as('CUT');
      cy.get('@SUT').getByLabel('Current Value:').first().as('output');
      cy.get('@CUT').ngxFill('10/10/2016').ngxFindNativeInput().focus().blur();
    });

    it('has a label', () => {
      // With Value
      cy.get('@CUT')
        .ngxFindLabel()
        .should('contain.text', 'Date of attack')
        .should('have.css', 'color', UNFOCUSED)
        .should('have.css', 'font-size', '11.2px')
        .should('have.css', 'top', '-13.44px'); // -1.2em

      // Without Value
      cy.get('@CUT').ngxFill('');
      cy.get('@SUT').find('h1').click(); // blur
      cy.get('@CUT')
        .ngxFindLabel()
        .should('contain.text', 'Date of attack')
        .should('have.css', 'color', UNFOCUSED)
        .should('have.css', 'font-size', '16px')
        .should('have.css', 'top', '6.4px');

      // with focus
      cy.get('@CUT').ngxFindNativeInput().focus().click();
      cy.get('@CUT')
        .ngxFindLabel()
        .should('contain.text', 'Date of attack')
        .should('have.css', 'color', FOCUSED)
        .should('have.css', 'font-size', '11.2px')
        .should('have.css', 'top', '-13.44px'); // -1.2em
    });

    it('enters text', () => {
      const text = '12/12/2020';

      cy.get('@CUT').clear().type(text);

      cy.get('@CUT').ngxGetValue().should('equal', text);
      cy.get('@output').should('contain.text', text);

      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
    });

    it('handles invalid input', () => {
      const text = 'what what';

      cy.get('@CUT').clear().type(text);

      cy.get('@CUT').ngxGetValue().should('equal', text);
      cy.get('@output').should('contain.text', text);
      cy.get('@CUT').should('have.class', 'ngx-date-time--date-invalid');
      cy.get('@CUT').find('label').should('have.css', 'color', INVALID);

      cy.get('@SUT').find('h1').click(); // blur
      cy.get('@CUT').ngxGetValue().should('equal', text);
      cy.get('@output').should('contain.text', text);
      cy.get('@CUT').should('have.class', 'ngx-date-time--date-invalid');
      cy.get('@CUT').find('label').should('have.css', 'color', INVALID);

      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
      cy.get('@CUT').should('not.have.class', 'ngx-date-time--date-invalid');
      cy.get('@CUT').find('label').should('have.css', 'color', FOCUSED);
    });

    it('opens calendar with button', () => {
      cy.get('@CUT').find('.calendar-dialog-btn').click();
      cy.get('.ngx-date-time-dialog')
        .should('exist')
        .find('.selected-header h1')
        .should('contain.text', 'Mon, Oct 10 2016');
      cy.get('.day').contains('17').click();
      cy.get('.apply-btn').click();
      cy.get('.ngx-date-time-dialog').should('not.exist');
      cy.get('@output').should('contain.text', '2016-10-17');
    });

    it('opens calendar with keyboard', () => {
      cy.get('@CUT').ngxFindNativeInput().focus();
      cy.realPress('ArrowDown');
      cy.get('.ngx-date-time-dialog')
        .should('exist')
        .find('.selected-header h1')
        .should('contain.text', 'Mon, Oct 10 2016'); // BUG
      cy.get('.day.focus').should('contain.text', '10').should('have.css', 'outline', FOCUS_OUTLINE); // Focuses on current value
      cy.realPress('ArrowDown');
      cy.get('.day.focus').should('contain.text', '17').should('have.css', 'outline', FOCUS_OUTLINE); // Focuses on current value
      cy.realPress('Space');
      cy.realPress('Enter');
      cy.get('@output').should('contain.text', '2016-10-17');
    });
  });

  describe('Custom Format', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="Date Input"]').as('SUT');
      cy.get('@SUT').getByLabel('Custom Format').as('CUT');
      cy.get('@SUT').getByLabel('Current Value:').eq(1).as('output');
    });

    it('enters text', () => {
      const text = '12/12/2020';

      cy.get('@CUT').clear().type(text);

      cy.get('@CUT').ngxGetValue().should('equal', text);
      cy.get('@output').should('contain.text', text);

      cy.get('@SUT').find('h1').click(); // blur formats

      cy.get('@CUT').ngxGetValue().should('equal', '12/2020');
      cy.get('@output').should('contain.text', '12/2020');
    });
  });

  describe('Min/max', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="Date Input"]').as('SUT');
      cy.get('@SUT').getByLabel('Min/Max Dates').as('CUT');
      cy.get('@SUT').getByLabel('Current Value:').as('output');
    });

    it('enters text', () => {
      cy.get('@CUT').ngxFill('');
      cy.get('@CUT').should('not.have.class', 'ngx-date-time--date-out-of-range');
      cy.get('@CUT').find('label').should('have.css', 'color', UNFOCUSED);

      cy.get('@CUT').ngxFill('10/28/2016');
      cy.get('@CUT').should('have.class', 'ngx-date-time--date-out-of-range');
      cy.get('@CUT').find('label').should('have.css', 'color', INVALID);

      cy.get('@CUT').ngxFill('10/10/2016');
      cy.get('@CUT').should('not.have.class', 'ngx-date-time--date-out-of-range');
      cy.get('@CUT').find('label').should('have.css', 'color', UNFOCUSED);

      cy.get('@CUT').ngxFill('10/1/2016');
      cy.get('@CUT').should('have.class', 'ngx-date-time--date-out-of-range');
      cy.get('@CUT').find('label').should('have.css', 'color', INVALID);
    });
  });

  describe('TimeZones', () => {
    beforeEach(() => {
      cy.get('[sectiontitle="TimeZones"]').as('SUT');
      cy.get('@SUT').within(() => {
        cy.get('ngx-date-time').first().as('CUT');
        // Bug in ngx-ui testing... can't get the get by label off a get
        cy.getByLabel('Current Value:').as('output');
      });
    });

    it('has current values', () => {
      cy.get('@output').should('contain.text', '2011-03-11T05:46:24.000Z'); // Timezone set by env var

      cy.get('@SUT').within(() => {
        cy.get('ngx-date-time').eq(0).ngxGetValue().should('equal', '03/10/2011 9:46 PM -08:00');
        cy.get('ngx-date-time').eq(1).ngxGetValue().should('equal', '03/11/2011 5:46 AM +00:00');
        cy.get('ngx-date-time').eq(2).ngxGetValue().should('equal', '03/11/2011 2:46 PM +09:00');
      });
    });

    it('has popups', () => {
      cy.get('@SUT')
        .find('ngx-date-time')
        .each($el => {
          cy.wrap($el).whileHovering(() => {
            cy.root()
              .closest('body')
              .find('.date-tip-tooltip')
              .should('be.visible')
              .should('contain.text', 'Mar 10, 2011 9:46 PM -08:00 (PST)')
              .should('contain.text', 'Mar 11, 2011 5:46 AM +00:00 (UTC)');
          });
        });
    });

    it('has correct popup', () => {
      cy.get('@SUT').find('ngx-date-time').eq(0).find('.calendar-dialog-btn').click();
      cy.get('.ngx-dialog .selected-header')
        .should('contain.text', 'Thu, Mar 10 2011')
        .should('contain.text', '9:46 pm');
      cy.get('body').click();

      cy.get('@SUT').find('ngx-date-time').eq(1).find('.calendar-dialog-btn').click();
      cy.get('.ngx-dialog .selected-header')
        .should('contain.text', 'Fri, Mar 11 2011')
        .should('contain.text', '5:46 am');
      cy.get('body').click();

      cy.get('@SUT').find('ngx-date-time').eq(2).find('.calendar-dialog-btn').click();
      cy.get('.ngx-dialog .selected-header')
        .should('contain.text', 'Fri, Mar 11 2011')
        .should('contain.text', '2:46 pm');
      cy.get('body').click();
    });

    it('opens calendar with button', () => {
      cy.get('@CUT').find('.calendar-dialog-btn').click();
      cy.get('.ngx-date-time-dialog')
        .should('exist')
        .find('.selected-header h1')
        .should('contain.text', 'Thu, Mar 10 2011')
        .should('contain.text', '9:46 pm');
      cy.get('.day').contains('17').click(); // Note: local
      cy.get('.ngx-date-time-dialog')
        .should('exist')
        .find('.selected-header h1')
        .should('contain.text', 'Thu, Mar 17 2011')
        .should('contain.text', '9:46 pm');
      cy.get('.apply-btn').click();
      cy.get('.ngx-date-time-dialog').should('not.exist');
      cy.get('@output').should('contain.text', '2011-03-18T05:46:24.000Z'); // Note: UTC
    });

    it('handles invalid input', () => {
      const text = 'what what';

      cy.get('@CUT').clear().type(text);

      cy.get('@CUT').ngxGetValue().should('equal', text);
      cy.get('@output').should('contain.text', text);
      cy.get('@CUT').should('have.class', 'ngx-date-time--date-invalid');
      cy.get('@CUT').find('label').should('have.css', 'color', INVALID);

      cy.get('@SUT').find('h1').click(); // blur
      cy.get('@CUT').ngxGetValue().should('equal', text);
      cy.get('@output').should('contain.text', text);
      cy.get('@CUT').should('have.class', 'ngx-date-time--date-invalid');
      cy.get('@CUT').find('label').should('have.css', 'color', INVALID);

      cy.get('@CUT').clear().ngxGetValue().should('equal', '');
      cy.get('@CUT').should('not.have.class', 'ngx-date-time--date-invalid');
      cy.get('@CUT').find('label').should('have.css', 'color', FOCUSED);
    });
  });
});
