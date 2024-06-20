/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    // ---- Utilities ----
    getByName(text: string): Chainable<JQuery<Element>>;
    getByLabel(text: string, options?: Partial<Loggable & Withinable>): Chainable<JQuery<Element>>;
    getByPlaceholder(text: string, options?: Partial<Loggable & Withinable>): Chainable<JQuery<Element>>;
    withinEach(fn: (el: JQuery<any>) => void, options?: Partial<Loggable>): Chainable<JQuery<Element>>;
    whileHovering(fn: (el: JQuery<any>, options?: Partial<Loggable>) => void): Chainable<JQuery<Element>>;
    iff(
      selector: string | ((el: JQuery<any>) => void),
      fn?: (el: JQuery<any>) => void,
      options?: Partial<Loggable>
    ): Chainable<JQuery<Element>>;
    ngxHover(options?: Partial<Loggable>): Chainable<JQuery<Element>>;
    ngxUnhover(options?: Partial<Loggable>): Chainable<JQuery<Element>>;
    // ---- Commands ----
    ngxDebug(value: boolean): Chainable<void>;
    ngxFindNativeInput(options?: Partial<Loggable>): Chainable<JQuery<Element>>;
    ngxFindLabel(options?: Partial<Loggable>): Chainable<JQuery<Element>>;
    ngxOpen(options?: Partial<Loggable>): Chainable<JQuery<Element>>;
    ngxClose(options?: Partial<Loggable>): Chainable<JQuery<Element>>;
    ngxCloseNotifications(): Chainable<JQuery<Element>>;
    ngxFill(text: string, options?: Partial<TypeOptions>): Chainable<JQuery<Element>>;
    ngxGetValue(options?: Partial<Loggable>): Chainable<string | number | string[] | undefined | boolean>;
    ngxSetValue(text: string, options?: Partial<Loggable>): Chainable<JQuery<Element>>;
    ngxSelectTab(textOrIndex: string | number, options?: Partial<Loggable>): Chainable<JQuery<Element>>;
  }
}
