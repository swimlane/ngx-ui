// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./commands.d.ts'/>

import { LOG, NGX, clear, findInput } from './functions';

function escapeRegex(string: string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * Overwrites `cy.select` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('select', (originalFn, subject, text: Array<string | RegExp>, options = {}, ...args) => {
  const tagName = subject.prop('tagName').toLowerCase();

  switch (tagName) {
    case NGX.DROPDOWN:
    case NGX.SELECT:
      if (options.log !== false) {
        Cypress.log({
          name: 'select',
          $el: subject,
          consoleProps: () => {
            return {
              Selected: text,
              'Applied to': subject,
              Elements: subject.length
            };
          }
        });
      }

      if (!Array.isArray(text)) text = [text];
      text = text.map(t => {
        if (t instanceof RegExp) return t;
        return new RegExp(`^\\s*${escapeRegex(t)}\\s*$`, 'g');
      });
  }

  switch (tagName) {
    case NGX.DROPDOWN:
      return cy
        .wrap(subject, LOG)
        .ngxOpen(LOG)
        .withinEach(() => {
          text.forEach((re: RegExp) => cy.get('li').contains(re, LOG).click(LOG));
        }, LOG)
        .ngxClose(LOG);
    case NGX.SELECT:
      return cy
        .wrap(subject, LOG)
        .clear(LOG)
        .ngxOpen(LOG)
        .withinEach(() => {
          // Support matching on value or display text
          text.forEach((re: RegExp) => cy.get('li').contains(re, LOG).click(LOG));
        }, LOG)
        .ngxClose(LOG);
  }
  return originalFn(subject, text, options, ...args);
});

/**
 * Overwrites `cy.clear` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('clear', (originalFn, subject, options = {}, ...args) => {
  switch (subject.prop('tagName').toLowerCase()) {
    case NGX.CODEMIRROR:
    case NGX.INPUT:
    case NGX.DATETIME:
    case NGX.SELECT:
    case NGX.TOGGLE:
    case NGX.CHECKBOX:
    case NGX.SLIDER: {
      if (options.log !== false) {
        Cypress.log({
          name: 'clear',
          $el: subject,
          consoleProps: () => {
            return {
              'Applied to': subject,
              Elements: subject.length
            };
          }
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
    case NGX.TOGGLE:
    case NGX.CHECKBOX:
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
    case NGX.TOGGLE:
    case NGX.CHECKBOX:
    case NGX.RADIOBUTTON:
      // TODO: support `.check(value, options)`
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
    case NGX.TOGGLE:
    case NGX.CHECKBOX:
      // TODO: support `.uncheck(value, options)`
      return cy.wrap(subject, LOG).each(el => {
        originalFn(findInput(el), { ...options, force: true });
      });
  }
  return originalFn(subject, ...options);
});
