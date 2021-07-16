/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    getByName(name: string): Chainable<Element>;
    getByLabel(name: string): Chainable<Element>;
    findInput(): Chainable<Element>;
    findLabel(): Chainable<Element>;
    getValue(): Chainable<string>;
    closeNotifications(): Chainable<void>;
    withinEach(fn: (el: JQuery<any>) => void): Chainable<void>;
    whileHovering(fn: (el: JQuery<any>) => void): Chainable<void>;
    fill(text: string): Chainable<void>;
    iff(selector: string | ((el: JQuery<any>) => void), fn?: (el: JQuery<any>) => void): Chainable<void>;
  }
}
