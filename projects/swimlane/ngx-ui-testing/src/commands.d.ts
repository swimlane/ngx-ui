/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByName(name: string): Chainable<JQuery<any>>;
    getByLabel(name: string): Chainable<JQuery<any>>;
    findInput(): Chainable<JQuery<any>>;
    findLabel(): Chainable<JQuery<any>>;
    open(): Chainable<JQuery<any>>;
    close(): Chainable<JQuery<any>>;
    getValue(): Chainable<string>;
    closeNotifications(): Chainable<void>;
    withinEach(fn: (el: JQuery<any>) => void): Chainable<void>;
    whileHovering(fn: (el: JQuery<any>) => void): Chainable<void>;
    fill(text: string): Chainable<Element>;
    setValue(text: string): Chainable<JQuery<any>>;
    iff(selector: string | ((el: JQuery<any>) => void), fn?: (el: JQuery<any>) => void): Chainable<Element>;
  }
}
