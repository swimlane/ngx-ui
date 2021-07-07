const CODEMIRROR = 'NGX-CODEMIRROR';
const SELECT = 'NGX-SELECT';
const INPUT = 'NGX-INPUT';
const DATETIME = "NGX-DATE-TIME";

const CLEAR = Cypress.platform != 'darwin' ? '{ctrl}a{del}' : '{meta}a{del}';

Cypress.Commands.add('getByName', (name) => {
  return cy.get(`*[name="${name}"]`);
});

Cypress.Commands.add('getByLabel', (label) => {
  return cy.get(`*[label="${label}"]`);
});

/**
 * Given an element, returns the child input element.
 * */
Cypress.Commands.add('findInput', { prevSubject: true }, (element) => {
  switch (element.prop("tagName")) {
    case INPUT:
    case DATETIME:
      return cy.wrap(element)
        .click()
        .find('input,textarea');
    case CODEMIRROR:
      return cy.wrap(element)
        .find('div.CodeMirror')
        .click()
        .find('textarea');
  }
  return cy.wrap(element).click();
});

/**
 * Given an element, returns the child input element's value.
 * */
Cypress.Commands.add('getValue', { prevSubject: true }, (element) => {
  switch (element.prop("tagName")) {
    case CODEMIRROR: {
      const $el = element.find('.CodeMirror');
      return $el[0]?.CodeMirror?.getValue() || '';      
    }
    case SELECT: {
      const $el = element.find('.ngx-select-input-name');
      return $el?.text() || '';      
    }
    case INPUT:
    case DATETIME:
      return cy.wrap(element)
        .find('input,textarea')
        .invoke('val');
  }

  return cy.wrap(element)
    .invoke('val');
});

Cypress.Commands.add('closeNotifications', () => {
  cy.get('ngx-notification-container')
    .iff('.ngx-notification-close', $el => $el.click());
});

Cypress.Commands.add('withinEach', { prevSubject: true }, (subject, fn) => {
  cy.wrap(subject).each($el => {
    cy.wrap($el).within(fn);
  });
});

/**
 * Like `cy.within` but also forces the element into a hover state.
 * */
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
      return cy.wrap($el)
        .trigger('mouseleave', { log: false })
        .trigger('mouseout', { log: false });
    });
});

Cypress.Commands.overwrite('clear', (originalFn, element, options) => {
  switch (element.prop("tagName")) {
    case CODEMIRROR:
      cy.wrap(element)
        .findInput()
        .type(CLEAR);
      return cy.wrap(element);
    case INPUT:
    case DATETIME:
      cy.wrap(element)
        .findInput()
        .clear();
      return cy.wrap(element)
    case SELECT:
      cy.wrap(element)
        .iff('.ngx-select-clear', $el => $el.click());
      return cy.wrap(element);
  }
  return originalFn(element, options);
});

Cypress.Commands.add('fill', { prevSubject: true }, (subject, text, options) => {
  switch (subject.prop("tagName")) {
    case SELECT:
      return cy.wrap(subject)
        .clear()
        .type(`${text}{downarrow}{enter}`, options);
    case INPUT:
    case DATETIME:
    case CODEMIRROR:
      cy.wrap(subject)
        .clear()
        .findInput()
        .type(text, options)
        .blur();
      return cy.wrap(subject);
  }

  cy.wrap(subject)
    .clear()
    .type(text, options)
    .blur();
  return cy.wrap(subject);
});

Cypress.Commands.add('iff', { prevSubject: true }, (subject, selector, fn) => {
  if (typeof selector === 'function') {
    fn = selector;
    selector = '';
  }
  if (!!Cypress.$('body').find(subject).length) { // check if subject is still in DOM
    const $el = selector ? subject.find(selector) : subject;
    if (!!$el.length) {
      return cy.wrap($el).within(fn);
    }
  }
  return subject;
});
