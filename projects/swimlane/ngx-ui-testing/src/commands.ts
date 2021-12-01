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

// -------------- Utils --------------

/**
 * Find element by name attribute.
 */
Cypress.Commands.add('getByName', name => {
  return cy.get(`*[name="${name}"]`);
});

/**
 * Find element by label attribute.
 */
Cypress.Commands.add('getByLabel', (label, options) => {
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
Cypress.Commands.add('getByPlaceholder', (text, options) => {
  options = {
    log: true,
    withinSubject: cy['state']('withinSubject'),
    ...options
  };

  const $el = getByPlaceholder(text, options) as JQuery<any>;

  if (options.log) {
    Cypress.log({
      name: 'getByLabel',
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
Cypress.Commands.add('withinEach', { prevSubject: true }, (subject, fn, options) => {
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
});

Cypress.Commands.add('hover', { prevSubject: 'element' }, (subject, options) => {
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

  cy.wrap(subject, LOG).trigger('mouseover', LOG).trigger('mouseenter', LOG).invoke('addClass', 'cy-hover');
});

Cypress.Commands.add('unhover', { prevSubject: 'element' }, (subject, options) => {
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

  cy.wrap(subject, LOG).invoke('removeClass', 'cy-hover').trigger('mouseleave', LOG).trigger('mouseout', LOG);
});

/**
 * Like `cy.within` but also forces the element into a hover state.
 */
Cypress.Commands.add('whileHovering', { prevSubject: 'element' }, (subject, fn, options) => {
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
    .hover(LOG)
    .within(fn)
    .iff($el => {
      return cy.wrap($el).unhover(LOG);
    });
  return cy.wrap(subject, LOG);
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
});

// -------------- Commands --------------

/**
 * Set ngx-ui-testing debug mode.
 */
Cypress.Commands.add('ngxDebug', value => {
  LOG.log = value;
});

/**
 * Given an ngx-ui element, returns the child native input element.
 */
Cypress.Commands.add('ngxFindNativeInput', { prevSubject: 'element' }, (subject, options = {}) => {
  options = {
    log: true,
    ...options
  };

  const $el = findInput(subject);

  if (options.log) {
    Cypress.log({
      name: 'findInput',
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
  return $el;
});

/**
 * Given an element, returns the label element.
 */
Cypress.Commands.add('ngxFindLabel', { prevSubject: 'element' }, (subject, options = {}) => {
  options = {
    log: true,
    ...options
  };

  const $el = findLabel(subject);

  if (options.log) {
    Cypress.log({
      name: 'findLabel',
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
  return $el;
});

/**
 * Close all ngx-ui notifications, if any.
 */
Cypress.Commands.add('ngxCloseNotifications', () => {
  cy.get('ngx-notification-container').iff('.ngx-notification-close', $el => $el.trigger('click'));
});

Cypress.Commands.add('ngxOpen', { prevSubject: 'element' }, (subject, options = {}) => {
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
});

Cypress.Commands.add('ngxClose', { prevSubject: 'element' }, (subject, options = {}) => {
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
    case NGX.NOTIFICATION:
    case NGX.NAG:
    case NGX.ALERT:
    case NGX.DRAWER:
      return cy.wrap(subject, LOG).withinEach(close, LOG);
  }
  return; // THROW ERROR
});

/**
 * Like `cy.type` but clears existing text before and works with ngx-ui elements.
 */
Cypress.Commands.add('ngxFill', { prevSubject: 'element' }, (subject, text?, options = {}) => {
  options = {
    log: true,
    ...options
  };

  if (options.log) {
    Cypress.log({
      name: 'fill',
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
});

/**
 * Given an element, returns the element's value.
 */
Cypress.Commands.add('ngxGetValue', { prevSubject: 'element' }, (subject, options = {}) => {
  options = {
    log: true,
    ...options
  };

  const value = getValue(subject);

  if (options.log) {
    Cypress.log({
      name: 'getValue',
      $el: subject,
      consoleProps: () => {
        return {
          'Applied To': subject,
          Elements: subject?.length,
          Returned: value
        };
      }
    });
  }
  return value;
});

/**
 * Set an elements value directly
 */
Cypress.Commands.add('ngxSetValue', { prevSubject: 'element' }, (subject, text?, options = {}) => {
  options = {
    log: true,
    ...options
  };

  if (options.log) {
    Cypress.log({
      name: 'setValue',
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
});

Cypress.Commands.add(
  'ngxSelectTab',
  { prevSubject: 'element' },
  (subject, textOrIndex: string | number, options = {}) => {
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
