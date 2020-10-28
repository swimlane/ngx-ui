// tslint:disable-next-line:no-namespace
declare namespace Cypress {
  interface Chainable<T = unknown> {
    asAllDataCy(): Chainable<void>;
  }
}
