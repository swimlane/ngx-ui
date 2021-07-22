/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByName(name: string): Chainable<JQuery<any>>;
    getByLabel(name: string): Chainable<JQuery<any>>;
    findInput(): Chainable<JQuery<any>>;
    findLabel(): Chainable<JQuery<any>>;
    getValue(): Chainable<string | boolean | number>;
    closeNotifications(): Chainable<void>;
    withinEach(fn: (el: JQuery<any>) => void): Chainable<void>;
    whileHovering(fn: (el: JQuery<any>) => void): Chainable<void>;
    fill(text: string): Chainable<JQuery<any>>;
    setValue(text: string): Chainable<JQuery<any>>;
    iff(selector: string | ((el: JQuery<any>) => void), fn?: (el: JQuery<any>) => void): Chainable<JQuery<any>>;
  }
}

const CODEMIRROR = 'ngx-codemirror';
const SELECT = 'ngx-select';
const INPUT = 'ngx-input';
const DATETIME = 'ngx-date-time';
const TOGGLE = 'ngx-toggle';
const CHECKBOX = 'ngx-checkbox';
const SLIDER = 'ngx-slider';
const RADIOBUTTON_GROUP = 'ngx-radiobutton-group';
const RADIOBUTTON = 'ngx-radiobutton';

const CLEAR = Cypress.platform != 'darwin' ? '{ctrl}a{del}' : '{meta}a{del}';
const LOG_FALSE = { log: false };

function findInput(element: JQuery<Element>): any {
  switch (element.prop('tagName').toLowerCase()) {
    case INPUT:
    case DATETIME:
      return element.find('input,textarea');
    case TOGGLE:
    case CHECKBOX:
      return element.find('input[type="checkbox"]');
    case SLIDER:
      return element.find('input[type="range"]');
    case RADIOBUTTON:
      return element.find('input[type="radio"]');
    case CODEMIRROR:
      return cy.wrap(element).find('div.CodeMirror').click().find('textarea');
  }
  return element;
}

function findLabel(element: JQuery<Element>): any {
  switch (element.prop('tagName').toLowerCase()) {
    case INPUT:
    case DATETIME:
      return element.find('.ngx-input-label');
    case TOGGLE:
      return element.find('.ngx-toggle-text');
    case CHECKBOX:
      return element.find('.ngx-checkbox--content');
    case SELECT:
      return element.find('.ngx-select-label');
  }
  return element;
}

function clear(subject: JQuery<Element>) {
  switch (subject.prop('tagName').toLowerCase()) {
    case CODEMIRROR:
      return cy.wrap(subject, LOG_FALSE).findInput().type(CLEAR, LOG_FALSE);
    case INPUT:
    case DATETIME:
      return cy.wrap(findInput(subject), LOG_FALSE).clear(LOG_FALSE);
    case SELECT:
      return cy.wrap(subject, LOG_FALSE).iff('.ngx-select-clear', $el => $el.trigger('click'));
    case TOGGLE:
    case CHECKBOX:
      return cy.wrap(findInput(subject), LOG_FALSE).uncheck({ ...LOG_FALSE, force: true });
    case SLIDER:
      const $el = findInput(subject);
      const min = $el.attr('min');
      return $el.val(min);
  }
}

function getValue(element: JQuery<Element>): any {
  switch (element.prop('tagName').toLowerCase()) {
    case CODEMIRROR: {
      const $el = element.find('.CodeMirror');
      return $el[0]['CodeMirror']?.getValue() || '';
    }
    case SELECT: {
      const $el = element.find('.ngx-select-input-name');
      if (element.hasClass('multi-selection') || $el.length > 1) {
        return Cypress.$.map($el, (el: Element) => Cypress.$(el).text());
      } else {
        return $el?.text() || '';
      }
    }
    case TOGGLE:
    case CHECKBOX:
    case RADIOBUTTON:
      return findInput(element).is(':checked');
    case RADIOBUTTON_GROUP: {
      // This is not good, need to find the real value
      const el = element.find('input[type="radio"]:checked');
      if (!el) return '';
      return el.parent().find('.radio-label--content').text().trim() || '';
    }
  }
  return findInput(element).val();
}

function setValue(element: JQuery<Element>, text?: string, options = {}) {
  findInput(element).val(text);
  element.trigger('change');
}

function fillValue(element: any, text?: string, options = {}) {
  switch (element.prop('tagName').toLowerCase()) {
    case SELECT:
      clear(element);
      if (text) {
        return cy.wrap(element, LOG_FALSE).type(`${text}{downarrow}{enter}`, { ...options, ...LOG_FALSE });
      }
    case SLIDER:
      return setValue(element, text);
    case RADIOBUTTON_GROUP:
      // This is not good, need to find the real value
      return cy.wrap(element, LOG_FALSE).contains(text).click(LOG_FALSE);
  }

  clear(element);
  if (text) {
    cy.wrap(element, LOG_FALSE).type(text, { ...options, ...LOG_FALSE });
  }
  return cy.focused(LOG_FALSE).blur(LOG_FALSE);
}

function iff(element: any, selector: string, fn: any) {
  if (typeof selector === 'function') {
    fn = selector;
    selector = '';
  }
  if (Cypress.$('body').find(element).length) {
    // check if subject is still in DOM
    const $el = selector ? element.find(selector) : element;
    if ($el.length) {
      return cy.wrap($el).within(fn);
    }
  }
}

/**
 * Find element by name attribute.
 */
Cypress.Commands.add('getByName', name => {
  return cy.get(`*[name="${name}"]`);
});

/**
 * Find element by label attribute.
 */
Cypress.Commands.add('getByLabel', label => {
  return cy.get(`*[label="${label}"]`);
});

/**
 * Given an ngx-ui element, returns the child native input element.
 */
Cypress.Commands.add('findInput', { prevSubject: 'element' }, (subject, options = {}) => {
  options = {
    log: true,
    ...options
  };

  if (options.log) {
    Cypress.log({
      name: 'findInput',
      $el: subject
    });
  }
  return findInput(subject);
});

/**
 * Given an element, returns the label element.
 */
Cypress.Commands.add('findLabel', { prevSubject: 'element' }, (subject, options = {}) => {
  options = {
    log: true,
    ...options
  };

  if (options.log) {
    Cypress.log({
      name: 'findLabel',
      $el: subject
    });
  }
  return findLabel(subject);
});

/**
 * Given an element, returns the element's value.
 */
Cypress.Commands.add('getValue', { prevSubject: 'element' }, (subject, options = {}) => {
  options = {
    log: true,
    ...options
  };

  if (options.log) {
    Cypress.log({
      name: 'getValue',
      $el: subject
    });
  }
  return getValue(subject);
});

/**
 * Close all ngx-ui notifications, if any.
 */
Cypress.Commands.add('closeNotifications', () => {
  cy.get('ngx-notification-container').iff('.ngx-notification-close', $el => $el.trigger('click'));
});

/**
 * Like `cy.within`, but for each element.
 */
Cypress.Commands.add('withinEach', { prevSubject: true }, (subject, fn) => {
  // TODO: support `.withinEach(options, callbackFn)`
  subject.each(function () {
    cy.wrap(this).within(fn);
  });
});

/**
 * Like `cy.within` but also forces the element into a hover state.
 */
Cypress.Commands.add('whileHovering', { prevSubject: 'element' }, (subject, fn) => {
  // TODO: support `.whileHovering(options, callbackFn)`
  cy.wrap(subject, LOG_FALSE)
    .trigger('mouseover', LOG_FALSE)
    .trigger('mouseenter', LOG_FALSE)
    .within($el => {
      subject.addClass('cy-hover');
      fn($el);
      subject.removeClass('cy-hover');
    })
    .iff($el => {
      return cy.wrap($el).trigger('mouseleave', LOG_FALSE).trigger('mouseout', LOG_FALSE);
    });
  return cy.wrap(subject, LOG_FALSE);
});

/**
 * Overwrites `cy.clear` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('clear', (originalFn, subject, options = {}, ...args) => {
  switch (subject.prop('tagName').toLowerCase()) {
    case CODEMIRROR:
    case INPUT:
    case DATETIME:
    case SELECT:
    case TOGGLE:
    case CHECKBOX:
    case SLIDER: {
      if (options.log !== false) {
        Cypress.log({
          name: 'clear',
          $el: subject
        });
      }
      return cy.wrap(subject, LOG_FALSE).each(clear);
    }
  }
  return originalFn(subject, options, ...args);
});

/**
 * Overwrites `cy.click` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('click', (originalFn, subject, ...options) => {
  switch (subject.prop('tagName').toLowerCase()) {
    case TOGGLE:
    case CHECKBOX:
      return cy.wrap(subject, LOG_FALSE).each(el => {
        originalFn(findInput(el), { ...options, force: true });
      });
  }
  return originalFn(subject, ...options);
});

/**
 * Overwrites `cy.check` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('check', (originalFn, subject, ...options) => {
  switch (subject.prop('tagName').toLowerCase()) {
    case TOGGLE:
    case CHECKBOX:
    case RADIOBUTTON:
      // TODO: suppport `.check(value, options)`
      return cy.wrap(subject, LOG_FALSE).each(el => {
        originalFn(findInput(el), { ...options, force: true });
      });
  }
  return originalFn(subject, ...options);
});

/**
 * Overwrites `cy.uncheck` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('uncheck', (originalFn, subject, ...options) => {
  switch (subject.prop('tagName').toLowerCase()) {
    case TOGGLE:
    case CHECKBOX:
      // TODO: suppport `.uncheck(value, options)`
      return cy.wrap(subject, LOG_FALSE).each(el => {
        originalFn(findInput(el), { ...options, force: true });
      });
  }
  return originalFn(subject, ...options);
});

/**
 * Overwrites `cy.select` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('select', (originalFn, subject, text, ...options) => {
  switch (subject.prop('tagName').toLowerCase()) {
    case SELECT:
      // clear(subject);
      // subject.find('.ngx-select-caret').click();

      if (!Array.isArray(text)) text = [text];

      return cy.wrap(subject, LOG_FALSE).withinEach($el => {
        clear($el);
        cy.get('.ngx-select-caret').click();
        text.forEach((t: string | number | RegExp) => {
          cy.get('li', LOG_FALSE).contains(t).click(LOG_FALSE);
        });
        cy.get('.ngx-select-caret').click();
      });
  }
  return originalFn(subject, text, ...options);
});

/**
 * Like `cy.type` but clears existing text before and works with ngx-ui elements.
 */
Cypress.Commands.add('fill', { prevSubject: 'element' }, (subject, text?, options = {}) => {
  options = {
    log: true,
    ...options
  };

  if (options.log) {
    Cypress.log({
      name: 'fill',
      $el: subject
    });
  }
  return cy.wrap(subject, LOG_FALSE).each(el => fillValue(el, text, options));
});

/**
 * Set an elements value directly
 */
Cypress.Commands.add('setValue', { prevSubject: 'element' }, (subject, text?, options = {}) => {
  options = {
    log: true,
    ...options
  };

  if (options.log) {
    Cypress.log({
      name: 'setValue',
      $el: subject
    });
  }
  return cy.wrap(subject, LOG_FALSE).each(el => setValue(el, text, options));
});

/**
 * Like `cy.within` but only if the element exists in the DOM.
 */
Cypress.Commands.add('iff', { prevSubject: true }, (subject, selector, fn, options) => {
  options = {
    log: true,
    ...options
  };
  if (options.log) {
    Cypress.log({
      name: 'iff',
      $el: subject,
      message: selector
    });
  }

  // TODO: support `.iff(selector, options, callbackFn)`
  iff(subject, selector, fn);
  return cy.wrap(subject, LOG_FALSE);
});
