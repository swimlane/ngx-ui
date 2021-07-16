/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    navigate(url: string, options: any): Chainable;
    dataCy(value: string): Chainable;
    asAllDataCy(): Chainable<Element>;
  }
}
