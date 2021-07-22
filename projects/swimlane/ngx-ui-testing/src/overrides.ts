// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./commands.d.ts'/>

import { LOG, Components, clear, findInput } from './functions';

/**
 * Overwrites `cy.select` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('select', (originalFn, subject, text, ...options) => {
  switch (subject.prop('tagName').toLowerCase()) {
    case Components.SELECT:
      if (!Array.isArray(text)) text = [text];

      return cy
        .wrap(subject, LOG)
        .clear()
        .open()
        .withinEach(() => {
          // cy.get('.ngx-select-caret').click();
          text.forEach((t: string | number | RegExp) => {
            cy.get('li', LOG).contains(t).click(LOG);
          });
        })
        .close();
  }
  return originalFn(subject, text, ...options);
});

/**
 * Overwrites `cy.clear` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('clear', (originalFn, subject, options = {}, ...args) => {
  switch (subject.prop('tagName').toLowerCase()) {
    case Components.CODEMIRROR:
    case Components.INPUT:
    case Components.DATETIME:
    case Components.SELECT:
    case Components.TOGGLE:
    case Components.CHECKBOX:
    case Components.SLIDER: {
      if (options.log !== false) {
        Cypress.log({
          name: 'clear',
          $el: subject
        });
      }
      return cy.wrap(subject, LOG).each(clear);
    }
  }
  return originalFn(subject, options, ...args);
});

/**
 * Overwrites `cy.click` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('click', (originalFn, subject, ...options) => {
  switch (subject.prop('tagName').toLowerCase()) {
    case Components.TOGGLE:
    case Components.CHECKBOX:
      return cy.wrap(subject, LOG).each(el => {
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
    case Components.TOGGLE:
    case Components.CHECKBOX:
    case Components.RADIOBUTTON:
      // TODO: suppport `.check(value, options)`
      return cy.wrap(subject, LOG).each(el => {
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
    case Components.TOGGLE:
    case Components.CHECKBOX:
      // TODO: suppport `.uncheck(value, options)`
      return cy.wrap(subject, LOG).each(el => {
        originalFn(findInput(el), { ...options, force: true });
      });
  }
  return originalFn(subject, ...options);
});
