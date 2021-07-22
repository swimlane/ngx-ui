import { fillValue, findInput, findLabel, getValue, iff, LOG, NGX, setValue } from './functions';

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
  cy.wrap(subject, LOG)
    .trigger('mouseover', LOG)
    .trigger('mouseenter', LOG)
    .within($el => {
      subject.addClass('cy-hover');
      fn($el);
      subject.removeClass('cy-hover');
    })
    .iff($el => {
      return cy.wrap($el).trigger('mouseleave', LOG).trigger('mouseout', LOG);
    });
  return cy.wrap(subject, LOG);
});

Cypress.Commands.add('open', { prevSubject: 'element' }, subject => {
  console.log({ subject });
  switch (subject.prop('tagName').toLowerCase()) {
    case NGX.SELECT:
      return cy.wrap(subject, LOG).withinEach($el => {
        if (!$el.hasClass('active')) {
          $el.find('.ngx-select-caret').trigger('click', LOG);
        }
      });
  }
  return; // THROW ERROR
});

Cypress.Commands.add('close', { prevSubject: 'element' }, subject => {
  switch (subject.prop('tagName').toLowerCase()) {
    case NGX.SELECT:
      return cy.wrap(subject, LOG).withinEach($el => {
        if (subject.hasClass('active')) {
          subject.find('.ngx-select-caret').trigger('click', LOG);
        }
      });
  }
  return; // THROW ERROR
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
  return cy.wrap(subject, LOG).each(el => fillValue(el, text, options));
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
  return cy.wrap(subject, LOG).each(el => setValue(el, text));
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
  return cy.wrap(subject, LOG);
});
