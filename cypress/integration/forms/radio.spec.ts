describe('Radio', () => {
  before(() => {
    cy.visit('/radio');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('Check A11y', () => {
    cy.get('ngx-radiobutton, ngx-radiobutton-group').withinEach($el => {
      cy.checkA11y($el);
    });
  });

  describe('Single Radio Buttons', () => {
    beforeEach(() => {
      cy.get('ngx-section').first().as('SUT');
      cy.get('@SUT').getByLabel('Winter').as('CUT');
    });

    afterEach(() => {
      cy.get('@SUT').find('ngx-radiobutton').eq(1).click();
    });

    it('sets value with click', () => {
      cy.get('@CUT').ngxGetValue().should('equal', false);
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'false');

      cy.get('@CUT').click();

      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'true');
    });

    it('sets value with check', () => {
      cy.get('@CUT').ngxGetValue().should('equal', false);
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'false');

      cy.get('@CUT').check();

      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'true');
    });

    it('keyboard accessible', () => {
      // Without a radio group, the radio button are accessible via tab

      cy.get('@SUT').find('h1').click();
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) none 0px'); // not focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'false'); // not checked

      cy.realPress('Tab'); // Tab to first radio button
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) solid 2px'); // focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'false'); // not checked

      cy.realPress('Space'); // Select to first radio button
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) solid 2px'); // focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'true'); // checked

      cy.realPress('Tab'); // Tab to second radio button
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) none 0px'); // not focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'true'); // still checked

      cy.realPress('Space'); // Select second radio button
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) none 0px'); // not focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'false'); // not checked

      cy.realPress(['Shift', 'Tab']);
      cy.realPress('Space'); // Select to first radio button
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) solid 2px'); // focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'true'); // checked
    });
  });

  describe('Radio Group', () => {
    beforeEach(() => {
      cy.get('ngx-section').eq(1).as('SUT');
      cy.get('@SUT').find('ngx-radiobutton-group').first().as('CUT');
    });

    afterEach(() => {
      cy.get('@SUT').find('ngx-radiobutton').eq(1).click();
    });

    it('enters text and clears', () => {
      cy.get('@CUT').find('input[type="radio"]').should('have.length', 4);
      cy.get('@CUT').ngxGetValue().should('equal', 'Summer');

      const value = 'Winter';

      cy.get('@CUT').ngxSetValue(value);
      cy.get('@CUT').ngxGetValue().should('equal', value);
    });

    it('keyboard accessible', () => {
      // Within a radio group, the radio button are accessible via arrows

      cy.get('@SUT').find('h1').click();
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) none 0px'); // not focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'false'); // not checked
      cy.get('@CUT').ngxGetValue().should('equal', 'Spring');

      cy.realPress('Tab'); // Tab to radio group, focuses on first radio button
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) solid 2px'); // focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'false'); // not checked
      cy.get('@CUT').ngxGetValue().should('equal', 'Spring');

      cy.realPress('Space'); // Select to first radio button
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) solid 2px'); // focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'true'); // checked
      cy.get('@CUT').ngxGetValue().should('equal', 'Winter');

      cy.realPress('ArrowDown'); // Arrow to second radio button
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) none 0px'); // not focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'true'); // still checked
      cy.get('@CUT').ngxGetValue().should('equal', 'Winter');

      cy.realPress('Space'); // Select second radio button
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) none 0px'); // not focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'false'); // not checked
      cy.get('@CUT').ngxGetValue().should('equal', 'Spring');

      cy.realPress('ArrowUp'); // Arrow to first radio button
      cy.realPress('Space'); // Select to first radio button
      cy.get('@CUT').find('.checkmark').should('have.css', 'outline', 'rgb(148, 198, 255) solid 2px'); // focused
      cy.get('@CUT').find('input').should('have.attr', 'aria-checked', 'true'); // checked
      cy.get('@CUT').ngxGetValue().should('equal', 'Winter');
    });
  });
});
