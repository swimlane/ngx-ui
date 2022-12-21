import {
  fillValue,
  findInput,
  findLabel,
  getValue,
  iff,
  LOG,
  NGX,
  setValue,
  open,
  close,
  getByLabel,
  getByPlaceholder
} from './functions';

// -------------- Helpers --------------

// Workaround for https://github.com/cypress-io/cypress/issues/18879
function Cypress_Commands_add_Subject<T extends keyof Cypress.Chainable>(name: T, options: any, fn: any): void {
  Cypress.Commands.add(name, options, fn);
}

// -------------- Utils --------------

/**
 * Find element by name attribute.
 */
Cypress.Commands.add(
  'getByName',
  (
    name: string,
    options: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow> = {}
  ) => {
    return cy.get(`*[name="${name}"]`, options);
  }
);

/**
 * Find element by label attribute.
 */
Cypress.Commands.add('getByLabel', (label: string, options: Partial<Cypress.Loggable & Cypress.Withinable>) => {
  options = {
    log: true,
    withinSubject: cy['state']('withinSubject'),
    ...options
  };

  const $el = getByLabel(label, options) as JQuery<any>;

  if (options.log) {
    Cypress.log({
      name: 'getByLabel',
      message: label,
      $el,
      consoleProps: () => {
        return {
          Yielded: $el,
          Elements: $el?.length,
          Label: label
        };
      }
    });
  }

  return cy.wrap($el, LOG);
});

/**
 * Find element by placeholder text.
 */
Cypress.Commands.add('getByPlaceholder', (text: string, options: Partial<Cypress.Loggable & Cypress.Withinable>) => {
  options = {
    log: true,
    withinSubject: cy['state']('withinSubject'),
    ...options
  };

  const $el = getByPlaceholder(text, options) as JQuery<any>;

  if (options.log) {
    Cypress.log({
      name: 'getByPlaceholder',
      message: text,
      $el,
      consoleProps: () => {
        return {
          Yielded: $el,
          Elements: $el?.length,
          Placeholder: text
        };
      }
    });
  }

  return cy.wrap($el, LOG);
});

// TODO: getByRole?

/**
 * Like `cy.within`, but for each element.
 */
Cypress_Commands_add_Subject(
  'withinEach',
  { prevSubject: 'element' },
  (
    subject: JQuery<any>,
    fn: (el: JQuery<any>) => void,
    options: Partial<Cypress.Loggable>
  ): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };
    if (options.log) {
      Cypress.log({
        name: 'withinEach',
        $el: subject,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length
          };
        }
      });
    }

    // TODO: support `.withinEach(options, callbackFn)`
    subject.each((_: number, element: Element) => {
      cy.wrap(element, LOG).within(LOG, fn);
    });
    return cy.wrap(subject, LOG);
  }
);

Cypress_Commands_add_Subject(
  'ngxHover',
  { prevSubject: 'element' },
  (subject: JQuery<any>, options: Partial<Cypress.Loggable>): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };
    if (options.log) {
      Cypress.log({
        name: 'hover',
        $el: subject,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length
          };
        }
      });
    }

    return cy
      .wrap(subject, LOG)
      .trigger('mouseover', LOG)
      .trigger('mouseenter', LOG)
      .invoke(LOG, 'addClass', 'cy-hover');
  }
);

Cypress_Commands_add_Subject(
  'ngxUnhover',
  { prevSubject: 'element' },
  (subject: JQuery<any>, options: Partial<Cypress.Loggable>): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };
    if (options.log) {
      Cypress.log({
        name: 'unhover',
        $el: subject,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length
          };
        }
      });
    }

    return cy
      .wrap(subject, LOG)
      .invoke(LOG, 'removeClass', 'cy-hover')
      .trigger('mouseleave', LOG)
      .trigger('mouseout', LOG);
  }
);

/**
 * Like `cy.within` but also forces the element into a hover state.
 */
Cypress_Commands_add_Subject(
  'whileHovering',
  { prevSubject: 'element' },
  (
    subject: JQuery<any>,
    fn: (currentSubject: JQuery<any>) => void,
    options: Partial<Cypress.Loggable>
  ): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };
    if (options.log) {
      Cypress.log({
        name: 'whileHovering',
        $el: subject,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length
          };
        }
      });
    }

    // TODO: support `.whileHovering(options, callbackFn)`
    cy.wrap(subject, LOG)
      .ngxHover(LOG)
      .within(LOG, fn)
      .iff(
        undefined,
        $el => {
          return cy.wrap($el, LOG).ngxUnhover(LOG);
        },
        LOG
      );
    return cy.wrap(subject, LOG);
  }
);

/**
 * Like `cy.within` but only if the element exists in the DOM.
 */
Cypress_Commands_add_Subject(
  'iff',
  { prevSubject: true },
  (
    subject: JQuery<any>,
    selector: string,
    fn,
    options: Partial<Cypress.Loggable>
  ): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };
    if (options.log) {
      Cypress.log({
        name: 'iff',
        $el: subject,
        message: selector,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length,
            Selector: selector
          };
        }
      });
    }

    // TODO: support `.iff(selector, options, callbackFn)`
    iff(subject, selector, fn);
    return cy.wrap(subject, LOG);
  }
);

// -------------- Commands --------------

/**
 * Set ngx-ui-testing debug mode.
 */
Cypress.Commands.add('ngxDebug', (value: boolean): any => {
  LOG.log = value;
});

/**
 * Given an ngx-ui element, returns the child native input element.
 */
Cypress_Commands_add_Subject(
  'ngxFindNativeInput',
  { prevSubject: 'element' },
  (subject: JQuery<any>, options: Partial<Cypress.Loggable> = {}): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };

    const $el = findInput(subject);

    if (options.log) {
      Cypress.log({
        name: 'ngxFindNativeInput',
        $el: subject,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length,
            Yielded: $el
          };
        }
      });
    }
    return cy.wrap($el, LOG);
  }
);

/**
 * Given an element, returns the label element.
 */
Cypress_Commands_add_Subject(
  'ngxFindLabel',
  { prevSubject: 'element' },
  (subject: JQuery<any>, options: Partial<Cypress.Loggable> = {}): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };

    const $el = findLabel(subject);

    if (options.log) {
      Cypress.log({
        name: 'ngxFindLabel',
        $el: subject,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length,
            Yielded: $el
          };
        }
      });
    }
    return cy.wrap($el);
  }
);

/**
 * Close all ngx-ui notifications, if any.
 */
Cypress.Commands.add('ngxCloseNotifications', () => {
  return cy.get('ngx-notification-container').iff('.ngx-notification-close', $el => $el.trigger('click'));
});

Cypress_Commands_add_Subject(
  'ngxOpen',
  { prevSubject: 'element' },
  (subject: JQuery<any>, options: Partial<Cypress.Loggable> = {}): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };
    if (options.log) {
      Cypress.log({
        name: 'ngxOpen',
        $el: subject,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length
          };
        }
      });
    }

    switch (subject.prop('tagName').toLowerCase()) {
      case NGX.SELECT:
      case NGX.SECTION:
      case NGX.DROPDOWN:
      case NGX.PLUS_MENU:
      case NGX.NAG:
        return cy.wrap(subject, LOG).withinEach(open, LOG);
    }
    return; // THROW ERROR
  }
);

Cypress_Commands_add_Subject(
  'ngxClose',
  { prevSubject: 'element' },
  (subject: JQuery<any>, options: Partial<Cypress.Loggable> = {}): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };
    if (options.log) {
      Cypress.log({
        name: 'ngxClose',
        $el: subject,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length
          };
        }
      });
    }

    switch (subject.prop('tagName').toLowerCase()) {
      case NGX.SELECT:
      case NGX.SECTION:
      case NGX.DROPDOWN:
      case NGX.PLUS_MENU:
      case NGX.LFD:
      case NGX.MFD:
      case NGX.NOTIFICATION:
      case NGX.NAG:
      case NGX.ALERT:
      case NGX.DRAWER:
        return cy.wrap(subject, LOG).withinEach(close, LOG);
    }
    return; // THROW ERROR
  }
);

/**
 * Like `cy.type` but clears existing text before and works with ngx-ui elements.
 */
Cypress_Commands_add_Subject(
  'ngxFill',
  { prevSubject: 'element' },
  (
    subject: JQuery<any>,
    text?: string,
    options: Partial<Cypress.Loggable> = {}
  ): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };

    if (options.log) {
      Cypress.log({
        name: 'ngxFill',
        $el: subject,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length,
            text
          };
        }
      });
    }
    return cy.wrap(subject, LOG).each(el => fillValue(el, text, options));
  }
);

/**
 * Given an element, returns the element's value.
 */
Cypress_Commands_add_Subject(
  'ngxGetValue',
  { prevSubject: 'element' },
  (
    subject: JQuery<any>,
    options: Partial<Cypress.Loggable> = {}
  ): Cypress.Chainable<string | number | string[] | undefined | boolean> => {
    options = {
      log: true,
      ...options
    };

    let consoleProps: Record<string, any> = null;

    if (options.log) {
      consoleProps = {
        'Applied To': subject,
        Elements: subject?.length
      };

      options['_log'] = Cypress.log({
        name: 'ngxGetValue',
        $el: subject,
        consoleProps: () => consoleProps
      });
    }

    const internalGetValue = () => {
      const value = getValue(subject);
      if (consoleProps) {
        consoleProps['Returned'] = value;
      }
      return value;
    };

    const onRetry = () =>
      Cypress.Promise.try(internalGetValue).then(value => {
        return cy['verifyUpcomingAssertions'](value, options, { onRetry });
      });

    return onRetry() as any;
  }
);

/**
 * Set an elements value directly
 */
Cypress_Commands_add_Subject(
  'ngxSetValue',
  { prevSubject: 'element' },
  (
    subject: JQuery<any>,
    text?: string,
    options: Partial<Cypress.Loggable> = {}
  ): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };

    if (options.log) {
      Cypress.log({
        name: 'ngxSetValue',
        $el: subject,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length,
            Value: text
          };
        }
      });
    }
    return cy.wrap(subject, LOG).each(el => setValue(el, text));
  }
);

Cypress_Commands_add_Subject(
  'ngxSelectTab',
  { prevSubject: 'element' },
  (
    subject: JQuery<any>,
    textOrIndex: string | number,
    options: Partial<Cypress.Loggable> = {}
  ): Cypress.Chainable<JQuery<Element>> => {
    options = {
      log: true,
      ...options
    };
    if (options.log) {
      Cypress.log({
        name: 'ngxSelectTab',
        $el: subject,
        consoleProps: () => {
          return {
            'Applied To': subject,
            Elements: subject?.length
          };
        }
      });
    }

    switch (subject.prop('tagName').toLowerCase()) {
      case NGX.TABS:
        return cy.wrap(subject, LOG).withinEach(() => {
          if (typeof textOrIndex === 'number') {
            cy.get('.ngx-tabs-list button.ngx-tab').eq(textOrIndex).click();
          } else {
            cy.get('.ngx-tabs-list button.ngx-tab').contains(textOrIndex).click();
          }
        }, LOG);
    }
    return; // THROW ERROR
  }
);
