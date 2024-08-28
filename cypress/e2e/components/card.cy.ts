describe('Dropdowns', () => {
  before(() => {
    cy.visit('/card');
    cy.get('.page-loader').should('not.exist', { timeout: 20000 });
  });

  describe('Selectable card', () => {
    it('should emit onSelect - it comes from the emitter named `change` of the checkbox component', () => {
      cy.dataCy('card-selectable').as('cardSelectable');
      cy.dataCy('card-onselect-event').as('cardOnSelectEvent');
      cy.get('@cardSelectable').scrollIntoView();
      cy.get('@cardSelectable').find('input[type=checkbox]').click();
      cy.get('@cardOnSelectEvent').should('be.visible').should('have.text', 'onSelect event: true');
      cy.get('@cardSelectable').find('input[type=checkbox]').click();
      cy.get('@cardOnSelectEvent').should('be.visible').should('have.text', 'onSelect event: false');
    });
  });
});
