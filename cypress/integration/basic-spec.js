describe('ngx-ui basics', () => {
  // usually we want to start from nothing
  // and reload the page before each test
  // but for the component library we can
  // load the page once and exercise each component
  before(() => {
    cy.visit('/#inputs');
    cy.get('.page-loader')
      .should('not.be.visible', {timeout: 20000});
  });

  it('loads', () => {
    cy.contains('Angular Style and Component Library');
  });

  const visitSection = (str) => {
    return () => {
      cy.get('ul.list-reset')
        .contains('li', str)
        .find('a')
        .click();
      cy.contains('h3', str)
        .should('be.visible');
    }
  }

  context('Forms', () => {
    describe('Inputs', () => {
      beforeEach(visitSection('Inputs'));

      it('enters text', () => {
        const text = 'hello world';
        cy.get('ngx-input[name="input1"]')
          .find('input#input-1')
          .type(text)
          .blur();
        cy.contains(`Output: "${text}"`);
      });

      it('underlines active input', () => {
        // reset active input box
        cy.get('ngx-input[name="input1"]')
          .find('input#input-1')
          .click()
          .blur();
        cy.get('ngx-input[name="input1"]')
          .find('.ngx-input-underline .underline-fill')
          .should('have.attr', 'style', 'width: 0%;');

        // when we click on the input box
        // it underlines it
        cy.get('ngx-input[name="input1"]')
          .find('input#input-1')
          .click();
        cy.get('ngx-input[name="input1"]')
          .find('.ngx-input-underline .underline-fill')
          .should('have.attr', 'style', 'width: 100%;');
      });
    });
  });

  context('Components', () => {
    describe('Overlay', () => {
      const overlayMessage = 'Click anywhere to return';

      beforeEach(visitSection('Overlay'));

      it('Shows overlay', () => {
        cy.contains('Show Overlay').click();
        cy.contains(overlayMessage).should('be.visible').click();
        cy.contains(overlayMessage).should('not.be.visible');
      });

      it('Handles small screen', () => {
        cy.contains('Show Overlay').click();
        cy.viewport(500, 600);

        const message = 'Your browser is too small';
        cy.contains(message).should('be.visible');

        cy.viewport(1000, 600);
        cy.contains(message).should('not.be.visible');

        cy.contains(overlayMessage).should('be.visible').click();
        cy.contains(overlayMessage).should('not.be.visible');
      });
    });
  });
});
