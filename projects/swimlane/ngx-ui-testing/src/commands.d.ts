/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    // ---- Utilities ----
    getByName(text: string): Chainable<JQuery<any>>;
    getByLabel(text: string): Chainable<JQuery<any>>;
    getByPlaceholder(text: string): Chainable<JQuery<any>>;
    withinEach(fn: (el: JQuery<any>) => void, options?: Partial<Loggable>): Chainable<void>;
    whileHovering(fn: (el: JQuery<any>, options?: Partial<Loggable>) => void): Chainable<void>;
    iff(
      selector: string | ((el: JQuery<any>) => void),
      fn?: (el: JQuery<any>) => void,
      options?: Partial<Loggable>
    ): Chainable<JQuery<any>>;
    hover(options?: Partial<Loggable>): Chainable<JQuery<any>>;
    unhover(options?: Partial<Loggable>): Chainable<JQuery<any>>;
    // ---- Commands ----
    ngxDebug(value: boolean): Chainable<void>;
    ngxFindNativeInput(options?: Partial<Loggable>): Chainable<JQuery<any>>;
    ngxFindLabel(options?: Partial<Loggable>): Chainable<JQuery<any>>;
    ngxOpen(options?: Partial<Loggable>): Chainable<JQuery<any>>;
    ngxClose(options?: Partial<Loggable>): Chainable<JQuery<any>>;
    ngxCloseNotifications(): Chainable<void>;
    ngxFill(text: string, options?: Partial<Loggable>): Chainable<Element>;
    ngxGetValue(options?: Partial<Loggable>): Chainable<string>;
    ngxSetValue(text: string, options?: Partial<Loggable>): Chainable<JQuery<any>>;
  }
}
