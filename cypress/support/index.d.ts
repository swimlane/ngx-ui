// tslint:disable-next-line:no-namespace
declare namespace Cypress {
  interface Chainable<T = unknown> {
    dataCy(value: string): Chainable<Element>;
    asAllDataCy(): Chainable<void>;
    getByName(name: string): Chainable<Element>;
    getByLabel(name: string): Chainable<Element>;
    findInput(): Chainable<Element>;
    getValue(): Chainable<string>;
    closeNotifications(): Chainable<void>;
    withinEach(fn: (el: JQuery<any>) => void): Chainable<void>;
    whileHovering(fn: (el: JQuery<any>) => void): Chainable<void>;
    fill(text: string): Chainable<void>;
    iff(selector: (string | ((el: JQuery<any>) => void)), fn?: (el: Element) => void): Chainable<void>;
  }
}
