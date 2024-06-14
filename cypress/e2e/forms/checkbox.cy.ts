describe('Checkbox', () => {
  before(() => {
    cy.visit('/checkbox');
    cy.injectAxe();
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  it('Check A11y', () => {
    cy.get('ngx-checkbox').withinEach($el => {
      cy.checkA11y($el);
    });
  });

  describe('Checkbox', () => {
    beforeEach(() => {
      cy.get('#section-1').as('SUT');
      cy.getByName('chk1').as('CUT');
    });

    afterEach(() => {
      cy.get('@CUT').check();
    });

    it('has a label', () => {
      cy.get('@CUT').ngxFindLabel().should('contain.text', 'Alert the SOC');
    });

    it('click toggles value', () => {
      cy.get('@CUT').scrollIntoView();
      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').click();
      cy.get('@CUT').ngxGetValue().should('equal', false);
    });

    it('label click toggles value', () => {
      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').ngxFindLabel().click();
      cy.get('@CUT').ngxGetValue().should('equal', false);
    });


    it('can use check/uncheck', () => {
      cy.get('@CUT').ngxGetValue().should('equal', true);
      cy.get('@CUT').click();
      cy.get('@CUT').ngxGetValue().should('equal', false);
      cy.get('@CUT').click();
      cy.get('@CUT').ngxGetValue().should('equal', true);
    });

    it('is keyboard accessible', () => {
      cy.get('@SUT').find('h1').contains('Demo').realClick();

      cy.get('@CUT').find('.ngx-checkbox--box').should('have.css', 'outline', 'rgb(148, 198, 255) none 0px');
      cy.get('@CUT').ngxGetValue().should('equal', true);

      cy.realPress('Tab');
      cy.get('@CUT').find('.ngx-checkbox--box').should('have.css', 'outline', 'rgb(148, 198, 255) solid 2px');
      cy.get('@CUT').ngxGetValue().should('equal', true);

      cy.realPress('Space');
      cy.get('@CUT').find('.ngx-checkbox--box').should('have.css', 'outline', 'rgb(148, 198, 255) solid 2px');
      cy.get('@CUT').ngxGetValue().should('equal', false);

      cy.realPress('Space').realPress('Tab');
      cy.get('@CUT').find('.ngx-checkbox--box').should('have.css', 'outline', 'rgb(148, 198, 255) none 0px');
      cy.get('@CUT').ngxGetValue().should('equal', true);
    });
  });

  describe('checked event', () => {
    beforeEach(() => {
      cy.getByName('chk5').as('CUT');
    });

    it('toggles', () => {
      cy.get('@CUT').next().find('code').should('contain.text', 'false');
      cy.get('@CUT').click();
      cy.get('@CUT').next().find('code').should('contain.text', 'true');
    });
  });

  describe('formgroup', () => {
    beforeEach(() => {
      cy.get('[data-cy=form-group]').as('GUT');
    });

    it('work with form group', () => {
      cy.get('@GUT').next().find('code').should('contain.text', '"breach": false');
      cy.get('@GUT').next().find('code').should('contain.text', '"ddos": false');
      cy.get('@GUT').next().find('code').should('contain.text', '"physical": false');

      cy.get('@GUT').find('ngx-checkbox').eq(0).click();
      cy.get('@GUT').next().find('code').should('contain.text', '"breach": true');
      cy.get('@GUT').next().find('code').should('contain.text', '"ddos": false');
      cy.get('@GUT').next().find('code').should('contain.text', '"physical": false');

      cy.get('@GUT').find('ngx-checkbox').eq(2).click();
      cy.get('@GUT').next().find('code').should('contain.text', '"breach": true');
      cy.get('@GUT').next().find('code').should('contain.text', '"ddos": false');
      cy.get('@GUT').next().find('code').should('contain.text', '"physical": true');
    });
  });
});
