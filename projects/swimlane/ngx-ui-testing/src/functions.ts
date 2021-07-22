// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./commands.d.ts'/>

export const enum NGX {
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

const DEBUG = false;
const CLEAR = Cypress.platform != 'darwin' ? '{ctrl}a{del}' : '{meta}a{del}';
export const LOG = { log: DEBUG };

export function findInput(element: JQuery<Element>): any {
  switch (element.prop('tagName').toLowerCase()) {
    case NGX.INPUT:
    case NGX.DATETIME:
      return element.find('input,textarea');
    case NGX.TOGGLE:
    case NGX.CHECKBOX:
      return element.find('input[type="checkbox"]');
    case NGX.SLIDER:
      return element.find('input[type="range"]');
    case NGX.RADIOBUTTON:
      return element.find('input[type="radio"]');
    case NGX.CODEMIRROR:
      return cy.wrap(element).find('div.CodeMirror').click().find('textarea');
    case NGX.SELECT:
      return element.find('input[type="search"]');
  }
  return element;
}

export function findLabel(element: JQuery<Element>): any {
  switch (element.prop('tagName').toLowerCase()) {
    case NGX.INPUT:
    case NGX.DATETIME:
      return element.find('.ngx-input-label');
    case NGX.TOGGLE:
      return element.find('.ngx-toggle-text');
    case NGX.CHECKBOX:
      return element.find('.ngx-checkbox--content');
    case NGX.SELECT:
      return element.find('.ngx-select-label');
  }
  return element;
}

export function clear(subject: JQuery<Element>) {
  switch (subject.prop('tagName').toLowerCase()) {
    case NGX.CODEMIRROR:
      return cy.wrap(subject, LOG).findInput().type(CLEAR, LOG);
    case NGX.INPUT:
    case NGX.DATETIME:
      return cy.wrap(findInput(subject), LOG).clear(LOG);
    case NGX.SELECT:
      return cy.wrap(subject, LOG).iff('.ngx-select-clear', $el => $el.trigger('click'));
    case NGX.TOGGLE:
    case NGX.CHECKBOX:
      return cy.wrap(findInput(subject), LOG).uncheck({ ...LOG, force: true });
    case NGX.SLIDER:
      const $el = findInput(subject);
      const min = $el.attr('min');
      return $el.val(min);
  }
}

export function getValue(element: JQuery<Element>): any {
  switch (element.prop('tagName').toLowerCase()) {
    case NGX.CODEMIRROR: {
      const $el = element.find('.CodeMirror');
      return $el[0]['CodeMirror']?.getValue() || '';
    }
    case NGX.SELECT: {
      const $el = element.find('.ngx-select-input-name');
      if (element.hasClass('multi-selection') || $el.length > 1) {
        return Cypress.$.map($el, (el: Element) => Cypress.$(el).text());
      } else {
        return $el?.text() || '';
      }
    }
    case NGX.TOGGLE:
    case NGX.CHECKBOX:
    case NGX.RADIOBUTTON:
      return findInput(element).is(':checked');
    case NGX.RADIOBUTTON_GROUP: {
      // This is not good, need to find the real value
      const el = element.find('input[type="radio"]:checked');
      if (!el) return '';
      return el.parent().find('.radio-label--content').text().trim() || '';
    }
  }
  return findInput(element).val();
}

export function setValue(element: JQuery<Element>, text?: string) {
  switch (element.prop('tagName').toLowerCase()) {
    case NGX.SELECT:
      return cy.wrap(element).select(text);
  }
  console.log(findInput(element));
  findInput(element).val(text);
  element.trigger('change');
}

export function fillValue(element: any, text?: string, options = {}) {
  switch (element.prop('tagName').toLowerCase()) {
    case NGX.SELECT:
      clear(element);
      if (text) {
        return cy.wrap(element, LOG).type(text, { ...options, ...LOG });
      }
    case NGX.SLIDER:
      return setValue(element, text);
    case NGX.RADIOBUTTON_GROUP:
      // This is not good, need to find the real value
      return cy.wrap(element, LOG).contains(text).click(LOG);
  }

  clear(element);
  if (text) {
    cy.wrap(element, LOG).type(text, { ...options, ...LOG });
  }
  return cy.focused(LOG).blur(LOG);
}

export function iff(element: any, selector: string, fn: any) {
  if (typeof selector === 'function') {
    fn = selector;
    selector = '';
  }
  if (Cypress.$('body').find(element).length) {
    // check if subject is still in DOM
    const $el = selector ? element.find(selector) : element;
    if ($el.length) {
      return cy.wrap($el, LOG).within(fn);
    }
  }
}
