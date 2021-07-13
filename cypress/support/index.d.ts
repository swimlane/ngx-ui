/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable<T = unknown> {
    /**
     * Get and alias all elements with `[data-cy]` attr on the current page.
     * @see https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements
     *
     * @example
     *    <div data-cy="firstDiv"></div>
     *    <div data-cy="secondDiv"></div>
     *
     *    cy.asAllDataCy();
     *    // equivalent to:
     *    cy.get('[data-cy=firstDiv]').as('firstDiv');
     *    cy.get('[data-cy=secondDiv]').as('secondDiv');
     */
    asAllDataCy(): Chainable<void>;
  }
}
