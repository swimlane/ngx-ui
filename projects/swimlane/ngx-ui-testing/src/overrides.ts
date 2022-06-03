// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./commands.d.ts'/>

import { LOG, NGX, clear, findInput } from './functions';

const { $ } = Cypress;

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
    valueOrTextOrIndex: Array<string | RegExp | number>,
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
                Selected: valueOrTextOrIndex,
                'Applied to': subject,
                Elements: subject.length
              };
            }
          });
        }
    }

    switch (tagName) {
      case NGX.DROPDOWN:
        return cy
          .wrap(subject, LOG)
          .ngxOpen(LOG)
          .withinEach($el => selectItems($el, 'li'), LOG)
          .ngxClose(LOG);
      case NGX.SELECT:
        return cy
          .wrap(subject, LOG)
          .clear(LOG)
          .ngxOpen(LOG)
          .withinEach($el => selectItems($el, '.ngx-select-dropdown-option'), LOG)
          .ngxClose(LOG);
    }
    return originalFn(subject, valueOrTextOrIndex as any, options, ...args);

    function getOptions($el: JQuery<any>, selector: string) {
      const optionEls = new Set<JQuery<any>>();

      if (!Array.isArray(valueOrTextOrIndex)) valueOrTextOrIndex = [valueOrTextOrIndex];
      $el.find(selector).map((index, el) => {
        $el = $(el);
        const content = $el.text();
        const value = $el.attr('data-value');

        if (
          valueOrTextOrIndex.includes(index) ||
          valueOrTextOrIndex.includes(content) ||
          valueOrTextOrIndex.includes(value)
        ) {
          optionEls.add(el);
          return;
        }

        valueOrTextOrIndex.forEach(item => {
          if (typeof item === 'string') item = new RegExp(`^\\s*${escapeRegex(item)}\\s*$`, 'g');
          if (item instanceof RegExp) {
            if (value?.match(item) || content?.match(item)) optionEls.add(el);
          }
        });
      });
      return Array.from(optionEls);
    }

    function selectItems($el: JQuery<any>, selector: string) {
      const options = getOptions($el, selector);
      if (options.length === 0) {
        throw new Error(
          `cy.select() failed because it could not find an item with value, index, or text matching: ${valueOrTextOrIndex}`
        );
      }

      // TODO: throw if more than one option is found and item is not multi-selectable

      options.forEach(option => {
        // TODO: throw if option is disabled
        cy.wrap(option, LOG).click(LOG);
      });
    }
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
