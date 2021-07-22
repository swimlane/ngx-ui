/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    getByName(name: string): Chainable<JQuery<any>>;
    getByLabel(name: string): Chainable<JQuery<any>>;
    findInput(): Chainable<JQuery<any>>;
    findLabel(): Chainable<JQuery<any>>;
    getValue(): Chainable<string>;
    closeNotifications(): Chainable<void>;
    withinEach(fn: (el: JQuery<any>) => void): Chainable<void>;
    whileHovering(fn: (el: JQuery<any>) => void): Chainable<void>;
    fill(text: string): Chainable<Element>;
    setValue(text: string): Chainable<JQuery<any>>;
    iff(selector: string | ((el: JQuery<any>) => void), fn?: (el: JQuery<any>) => void): Chainable<Element>;
  }
}
declare const CODEMIRROR = 'NGX-CODEMIRROR';
declare const SELECT = 'NGX-SELECT';
declare const INPUT = 'NGX-INPUT';
declare const DATETIME = 'NGX-DATE-TIME';
declare const TOGGLE = 'NGX-TOGGLE';
declare const CHECKBOX = 'NGX-CHECKBOX';
declare const SLIDER = 'NGX-SLIDER';
declare const RADIOBUTTON_GROUP = 'NGX-RADIOBUTTON-GROUP';
declare const RADIOBUTTON = 'NGX-RADIOBUTTON';
declare const CLEAR: string;
