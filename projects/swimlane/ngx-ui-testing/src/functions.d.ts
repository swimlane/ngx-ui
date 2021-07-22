/// <reference path="commands.d.ts" />
/// <reference types="cypress" />
export declare const enum Components {
  CODEMIRROR = 'ngx-codemirror',
  SELECT = 'ngx-select',
  INPUT = 'ngx-input',
  DATETIME = 'ngx-date-time',
  TOGGLE = 'ngx-toggle',
  CHECKBOX = 'ngx-checkbox',
  SLIDER = 'ngx-slider',
  RADIOBUTTON_GROUP = 'ngx-radiobutton-group',
  RADIOBUTTON = 'ngx-radiobutton'
}
export declare const LOG: {
  log: boolean;
};
export declare function findInput(element: JQuery<Element>): any;
export declare function findLabel(element: JQuery<Element>): any;
export declare function clear(subject: JQuery<Element>): any;
export declare function getValue(element: JQuery<Element>): any;
export declare function setValue(element: JQuery<Element>, text?: string): Cypress.Chainable<JQuery<Element>>;
export declare function fillValue(element: any, text?: string, options?: {}): Cypress.Chainable<JQuery<any>>;
export declare function iff(element: any, selector: string, fn: any): Cypress.Chainable<JQuery<any>>;
