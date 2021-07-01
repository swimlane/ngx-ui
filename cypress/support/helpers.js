const CODEMIRROR = 'NGX-CODEMIRROR';
const CLEAR = Cypress.platform != 'darwin' ? '{ctrl}a{del}' : '{meta}a{del}';

Cypress.Commands.add('getByName', (name) => {
  return cy.get(`*[name="${name}"]`);
});

Cypress.Commands.add('getByLabel', (label) => {
  return cy.get(`*[label="${label}"]`);
});

Cypress.Commands.add('findInput', { prevSubject: true }, (element) => {
  if (element.prop("tagName") === CODEMIRROR) {
    return cy.wrap(element)
      .find('div.CodeMirror')
      .click()
      .find('textarea');
  }
  return cy.wrap(element)
    .click()
    .find('input,textarea');
});

Cypress.Commands.add('getValue', { prevSubject: true }, (element) => {
  switch (element.prop("tagName")) {
    case CODEMIRROR: {
      const $el = element.find('.CodeMirror');
      return $el[0]?.CodeMirror?.getValue() || '';      
    }
    case 'NGX-SELECT': {
      const $el = element.find('.ngx-select-input-name');
      return $el?.text() || '';      
    }
    default:
      return cy.wrap(element)
        .find('input,textarea')
        .invoke('val');
  }
});

Cypress.Commands.overwrite('clear', (originalFn, element, options) => {
  switch (element.prop("tagName")) {
    case CODEMIRROR:
      cy.wrap(element)
        .findInput()
        .type(CLEAR);
      return cy.wrap(element);
    case 'NGX-SELECT':
      cy.wrap(element)
        .find('.ngx-select-clear')
        .click();
      return cy.wrap(element);
    default:
      return originalFn(element, options);
  }
});
