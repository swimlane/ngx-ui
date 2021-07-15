const CODEMIRROR = 'NGX-CODEMIRROR';
const SELECT = 'NGX-SELECT';
const INPUT = 'NGX-INPUT';
const DATETIME = 'NGX-DATE-TIME';
const TOGGLE = 'NGX-TOGGLE';
const CHECKBOX = 'NGX-CHECKBOX';
const SLIDER = 'NGX-SLIDER';
const RADIOBUTTON_GROUP = 'NGX-RADIOBUTTON-GROUP';
const RADIOBUTTON = 'NGX-RADIOBUTTON';

const CLEAR = Cypress.platform != 'darwin' ? '{ctrl}a{del}' : '{meta}a{del}';

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
 * Given an element, returns the child input element.
 */
Cypress.Commands.add('findInput', { prevSubject: true }, element => {
  console.log(element.prop('tagName'));
  switch (element.prop('tagName')) {
    case INPUT:
    case DATETIME:
      return cy.wrap(element).click().find('input,textarea');
    case CODEMIRROR:
      return cy.wrap(element).find('div.CodeMirror').click().find('textarea');
    case TOGGLE:
    case CHECKBOX:
      return cy.wrap(element).find('input[type="checkbox"]');
    case SLIDER:
      return cy.wrap(element).find('input[type="range"]');
    case RADIOBUTTON:
      return cy.wrap(element).find('input[type="radio"]');
  }
  return cy.wrap(element).click();
});

Cypress.Commands.add('findLabel', { prevSubject: true }, element => {
  switch (element.prop('tagName')) {
    case INPUT:
    case DATETIME:
      return cy.wrap(element).find('.ngx-input-label');
    case TOGGLE:
      return cy.wrap(element).find('.ngx-toggle-text');
    case CHECKBOX:
      return cy.wrap(element).find('.ngx-checkbox--content');
    case SELECT:
      return cy.wrap(element).find('.ngx-select-label');
  }
  return cy.wrap(element);
});

/**
 * Given an element, returns the child input element's value.
 */
Cypress.Commands.add('getValue', { prevSubject: true }, element => {
  switch (element.prop('tagName')) {
    case CODEMIRROR: {
      const $el = element.find('.CodeMirror');
      return $el[0]?.CodeMirror?.getValue() || '';
    }
    case SELECT: {
      const $el = element.find('.ngx-select-input-name');
      if (element.hasClass('multi-selection') || $el.length > 1) {
        return Cypress.$.map($el, el => Cypress.$(el).text());
      } else {
        return $el?.text() || '';
      }
    }
    case INPUT:
    case DATETIME:
      return cy.wrap(element).findInput().invoke('val');
    case TOGGLE:
    case CHECKBOX:
      return cy
        .wrap(element)
        .findInput()
        .then(el => el.is(':checked'));
    case SLIDER:
      return cy.wrap(element).findInput().invoke('val');
    case RADIOBUTTON_GROUP: {
      // This is not good, need to find the real value
      const el = element.find('input[type="radio"]:checked');
      if (!el) return '';
      return el.parent().find('.radio-label--content').text().trim() || '';
    }
    case RADIOBUTTON:
      return cy
        .wrap(element)
        .findInput()
        .then(el => el.is(':checked'));
  }

  return cy.wrap(element).invoke('val');
});

/**
 * Close all notifications, if any.
 */
Cypress.Commands.add('closeNotifications', () => {
  cy.get('ngx-notification-container').iff('.ngx-notification-close', $el => $el.trigger('click'));
});

/**
 * Like `cy.within`, but for each element.
 */
Cypress.Commands.add('withinEach', { prevSubject: true }, (subject, fn) => {
  cy.wrap(subject).each($el => {
    cy.wrap($el).within(fn);
  });
});

/**
 * Like `cy.within` but also forces the element into a hover state.
 */
Cypress.Commands.add('whileHovering', { prevSubject: true }, (subject, fn) => {
  return cy
    .wrap(subject)
    .trigger('mouseover', { log: false })
    .trigger('mouseenter', { log: false })
    .within($el => {
      subject.addClass('cy-hover');
      fn($el);
      subject.removeClass('cy-hover');
    })
    .iff($el => {
      return cy.wrap($el).trigger('mouseleave', { log: false }).trigger('mouseout', { log: false });
    });
});

/**
 * Overwrites `cy.clear` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('clear', (originalFn, element, ...options) => {
  switch (element.prop('tagName')) {
    case CODEMIRROR:
      cy.wrap(element).findInput().type(CLEAR);
      return cy.wrap(element);
    case INPUT:
    case DATETIME:
      cy.wrap(element).findInput().clear();
      return cy.wrap(element);
    case SELECT:
      cy.wrap(element).iff('.ngx-select-clear', $el => $el.trigger('click'));
      return cy.wrap(element);
    case TOGGLE:
    case CHECKBOX:
      return cy.wrap(element).uncheck();
    case SLIDER:
      return cy
        .wrap(element)
        .findInput()
        .then($el => {
          const min = $el.attr('min');
          return $el.val(min);
        });
  }
  return originalFn(element, ...options);
});

Cypress.Commands.overwrite('click', (originalFn, element, ...options) => {
  switch (element.prop('tagName')) {
    case TOGGLE:
      cy.wrap(element)
        .find('.ngx-toggle-label')
        .click(...options);
      return cy.wrap(element);
    case CHECKBOX:
      cy.wrap(element)
        .find('.ngx-checkbox--label')
        .click(...options);
      return cy.wrap(element);
  }
  return originalFn(element, ...options);
});

Cypress.Commands.overwrite('check', (originalFn, element, ...options) => {
  switch (element.prop('tagName')) {
    case TOGGLE:
    case CHECKBOX:
    case RADIOBUTTON:
      cy.wrap(element)
        .findInput()
        .check({ ...options, force: true });
      return cy.wrap(element);
  }
  return originalFn(element, ...options);
});

Cypress.Commands.overwrite('uncheck', (originalFn, element, ...options) => {
  switch (element.prop('tagName')) {
    case TOGGLE:
    case CHECKBOX:
      cy.wrap(element)
        .findInput()
        .uncheck({ ...options, force: true });
      return cy.wrap(element);
  }
  return originalFn(element, ...options);
});

Cypress.Commands.overwrite('select', (originalFn, element, text, ...options) => {
  switch (element.prop('tagName')) {
    case SELECT:
      return cy
        .wrap(element)
        .clear()
        .within(() => {
          cy.get('.ngx-select-caret').click();
          if (Array.isArray(text)) {
            text.forEach(t => {
              cy.contains(t).click();
            });
          } else {
            cy.contains(text).click();
          }
          cy.get('.ngx-select-caret').click();
        });
  }
  return originalFn(element, text, ...options);
});

/**
 * Like `cy.type` clears existing text before and works with ngx-ui elements.
 */
Cypress.Commands.add('fill', { prevSubject: true }, (subject, text?, ...options) => {
  if (!text) {
    return cy.wrap(subject).clear(...options);
  }
  switch (subject.prop('tagName')) {
    case SELECT:
      cy.wrap(subject).clear();
      return cy.wrap(subject).type(`${text}{downarrow}{enter}`, ...options);
    case INPUT:
    case DATETIME:
    case CODEMIRROR:
      cy.wrap(subject)
        .clear()
        .findInput()
        .type(text, ...options)
        .blur();
      return cy.wrap(subject);
    case SLIDER:
      cy.wrap(subject).findInput().invoke('val', text).trigger('change');
      return cy.wrap(subject);
    case RADIOBUTTON_GROUP:
      // This is not good, need to find the real value
      cy.get('@CUT').contains(text).click();
      return cy.wrap(subject);
  }

  cy.wrap(subject)
    .clear()
    .type(text, ...options)
    .blur();
  return cy.wrap(subject);
});

/**
 * Like `cy.within` but only if the element exists in the DOM.
 */
Cypress.Commands.add('iff', { prevSubject: true }, (subject, selector, fn) => {
  if (typeof selector === 'function') {
    fn = selector;
    selector = '';
  }
  if (Cypress.$('body').find(subject).length) {
    // check if subject is still in DOM
    const $el = selector ? subject.find(selector) : subject;
    if ($el.length) {
      return cy.wrap($el).within(fn);
    }
  }
  return subject;
});
