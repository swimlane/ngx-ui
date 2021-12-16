// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./commands.d.ts'/>

import { LOG, NGX, clear, findInput } from './functions';

function escapeRegex(string: string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// Workaround for https://github.com/cypress-io/cypress/issues/18879
function Cypress_Commands_overwrite_Subject<T extends keyof Cypress.Chainable>(name: T, fn: any): void {
  Cypress.Commands.overwrite(name, fn as any);
}

/**
 * Overwrites `cy.select` to work with ngx-ui elements.
 */
Cypress_Commands_overwrite_Subject(
  'select',
  (
    originalFn: Function,
    subject: JQuery<HTMLElement>,
    text: Array<string | RegExp>,
    options: Partial<Cypress.SelectOptions> = {},
    ...args: any[]
  ) => {
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
    return originalFn(subject, text as any, options, ...args);
  }
);

/**
 * Overwrites `cy.clear` to work with ngx-ui elements.
 */
Cypress_Commands_overwrite_Subject(
  'clear',
  (originalFn: Function, subject: JQuery<HTMLElement>, options: Partial<Cypress.ClearOptions> = {}, ...args: any[]) => {
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
  }
);

/**
 * Overwrites `cy.click` to work with ngx-ui elements.
 */
Cypress_Commands_overwrite_Subject(
  'click',
  (originalFn: Function, subject: JQuery<Element>, options?: Partial<Cypress.ClickOptions>, ...args: any[]) => {
    switch (subject.prop('tagName').toLowerCase()) {
      case NGX.TOGGLE:
      case NGX.CHECKBOX:
        return cy.wrap(subject, LOG).each(el => {
          // TODO: support `.click(position:, options)
          originalFn(findInput(el), { ...options, force: true }, ...args);
        });
    }
    return originalFn(subject, options, ...args);
  }
);

/**
 * Overwrites `cy.check` to work with ngx-ui elements.
 */
Cypress_Commands_overwrite_Subject(
  'check',
  (originalFn: Function, subject: JQuery<Element>, options?: Partial<Cypress.CheckOptions>, ...args: any[]) => {
    switch (subject.prop('tagName').toLowerCase()) {
      case NGX.TOGGLE:
      case NGX.CHECKBOX:
      case NGX.RADIOBUTTON:
        // TODO: support `.check(value, options)`
        return cy.wrap(subject, LOG).each(el => {
          originalFn(findInput(el), { ...options, force: true });
        });
    }
    return originalFn(subject, options, ...args);
  }
);

/**
 * Overwrites `cy.uncheck` to work with ngx-ui elements.
 */
Cypress_Commands_overwrite_Subject(
  'uncheck',
  (originalFn: Function, subject: JQuery<Element>, options?: Partial<Cypress.CheckOptions>, ...args: any[]) => {
    switch (subject.prop('tagName').toLowerCase()) {
      case NGX.TOGGLE:
      case NGX.CHECKBOX:
        // TODO: support `.uncheck(value, options)`
        return cy.wrap(subject, LOG).each(el => {
          originalFn(findInput(el) as JQuery<HTMLElement>, { ...options, force: true }, ...args);
        });
    }
    return originalFn(subject, options, ...args);
  }
);
