// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./commands.d.ts'/>

export const enum NGX {
  CODEMIRROR = 'ngx-codemirror',
  SELECT = 'ngx-select',
  INPUT = 'ngx-input',
  DATETIME = 'ngx-date-time',
  TOGGLE = 'ngx-toggle',
  CHECKBOX = 'ngx-checkbox',
  SLIDER = 'ngx-slider',
  RADIOBUTTON_GROUP = 'ngx-radiobutton-group',
  RADIOBUTTON = 'ngx-radiobutton',
  SECTION = 'ngx-section',
  DROPDOWN = 'ngx-dropdown',
  PLUS_MENU = 'ngx-plus-menu',
  LFD = 'ngx-large-format-dialog-content',
  MFD = 'ngx-medium-format-dialog-content',
  NOTIFICATION = 'ngx-notification',
  NAG = 'ngx-nag',
  ALERT = 'ngx-alert-dialog',
  DRAWER = 'ngx-drawer',
  TABS = 'ngx-tabs'
}

const DEBUG = false;
const CLEAR = Cypress.platform != 'darwin' ? '{ctrl}a{del}' : '{meta}a{del}';
export const LOG = { log: DEBUG };

const $ = Cypress.$;

export function getTagName(el: JQuery<Element>): string {
  const tagName = el.prop('tagName') || '';
  return tagName.toLowerCase();
}

// TODO: add ngx-select
export function ngxClosest(element: JQuery<Element>): JQuery<Element> {
  let $ngx = element.closest(NGX.DATETIME);
  if ($ngx.length) return $ngx;

  $ngx = element.closest(NGX.INPUT);
  if ($ngx.length) return $ngx;

  $ngx = element.closest(NGX.RADIOBUTTON);
  if ($ngx.length) return $ngx;

  return;
}

// TODO: options for exact or fuzzy match
export function getByLabel(label: string, options: Partial<Cypress.Loggable & Cypress.Withinable>): JQuery<Element> {
  const root = options.withinSubject ? $(options.withinSubject) : $('body');

  let $el = root.find(`*[label="${label}"]`); // todo: add support for aria-label
  if ($el.length) return $el;

  $el = root.find(`label:contains("${label}")`);
  if (!$el.length) return;

  const id = $el.attr('for');
  if (id) {
    $el = $(`#${id}`);
    return ngxClosest($el) || $el;
  }

  return ngxClosest($el) || $el.next() || $el.parent();
}

// TODO: options for exact or fuzzy match
export function getByPlaceholder(
  label: string,
  options: Partial<Cypress.Loggable & Cypress.Withinable>
): JQuery<Element> {
  const root = options.withinSubject ? $(options.withinSubject) : $('body');

  const $el = root.find(`*[placeholder="${label}"]`);
  if (!$el.length) return;

  return ngxClosest($el) || $el;
}

export function findInput(element: JQuery<Element>): JQuery<Element> {
  switch (getTagName(element)) {
    case NGX.INPUT:
    case NGX.DATETIME:
      return element.find('input,textarea');
    case NGX.TOGGLE:
    case NGX.CHECKBOX:
      return element.find('input[type="checkbox"]');
    case NGX.SLIDER:
      return element.find('input[type="range"]');
    case NGX.RADIOBUTTON:
      return element.find('input[type="radio"]');
    case NGX.CODEMIRROR:
      const $cm = element.find('div.CodeMirror');
      cy.wrap($cm, LOG).click(LOG);
      return $cm.find('textarea');
    case NGX.SELECT:
      return element.find('input[type="search"]');
  }
  return element;
}

export function findLabel(element: JQuery<Element>): JQuery<Element> {
  switch (getTagName(element)) {
    case NGX.INPUT:
    case NGX.DATETIME:
      return element.find('.ngx-input-label');
    case NGX.TOGGLE:
      return element.find('.ngx-toggle-text');
    case NGX.CHECKBOX:
      return element.find('.ngx-checkbox--content');
    case NGX.SELECT:
      return element.find('.ngx-select-label');
  }
  return element;
}

export function clear(element: JQuery<Element>): Cypress.Chainable<JQuery<any>> {
  switch (getTagName(element)) {
    case NGX.CODEMIRROR:
      return cy
        .wrap(element, LOG)
        .ngxFindNativeInput(LOG)
        .type(CLEAR, { ...LOG, force: true });
    case NGX.INPUT:
    case NGX.DATETIME:
      return cy.wrap(findInput(element), LOG).clear(LOG);
    case NGX.SELECT:
      return cy.wrap(element, LOG).iff('.ngx-select-clear', $el => $el.trigger('click'), LOG);
    case NGX.TOGGLE:
    case NGX.CHECKBOX:
      return cy.wrap(findInput(element), LOG).uncheck({ ...LOG, force: true });
    case NGX.SLIDER:
      const $el = findInput(element);
      const min = $el.attr('min') || $el.attr('aria-valuemin');
      $el.val(min);
      return cy.wrap($el);
  }
}

export function getValue(element: JQuery<Element>): string | number | string[] | undefined | boolean {
  switch (getTagName(element)) {
    case NGX.CODEMIRROR: {
      const $el = element.find('.CodeMirror');
      return $el[0]['CodeMirror']?.getValue() || '';
    }
    case NGX.SELECT: {
      if (element.hasClass('multi-selection')) {
        // TODO: aria
        const $el = element.find('.ngx-select-input-name');
        return $.map($el, (el: Element) => $(el).text().trim());
      } else {
        const $el = element.find('.ngx-select-input-list');
        return $el?.text().trim() || '';
      }
    }
    case NGX.TOGGLE:
    case NGX.CHECKBOX:
    case NGX.RADIOBUTTON:
      return findInput(element).is(':checked');
    case NGX.RADIOBUTTON_GROUP: {
      // This is not good, need to find the real value
      const el = element.find('input[type="radio"]:checked'); // TODO: aria-checked
      if (!el) return '';
      return el.parent().find('.radio-label--content').text().trim() || '';
    }
  }
  return findInput(element).val();
}

export function setValue(element: JQuery<Element>, text?: string): Cypress.Chainable<JQuery<Element>> {
  switch (getTagName(element)) {
    case NGX.SELECT:
      return cy.wrap(element, LOG).select(text);
    case NGX.RADIOBUTTON_GROUP:
      // TODO: select based on display text or value
      return cy.wrap(element, LOG).contains(text).click(LOG);
  }
  findInput(element).val(text);
  element.trigger('change');
  return cy.wrap(element);
}

export function fillValue(
  element: any,
  text?: string,
  options: Partial<Cypress.TypeOptions> = {}
): Cypress.Chainable<JQuery<Element>> {
  switch (getTagName(element)) {
    case NGX.SELECT:
      cy.wrap(element, LOG).clear(LOG);
      if (text) {
        return cy.wrap(element, LOG).type(text, { ...options, ...LOG });
      }
      return;
    case NGX.CODEMIRROR:
      cy.wrap(element, LOG).clear(LOG);
      if (text) {
        cy.wrap(element, LOG)
          .ngxFindNativeInput(LOG)
          .type(text, { ...options, ...LOG, force: true });
      }
      return cy.focused(LOG).blur(LOG);
    case NGX.SLIDER:
      throw new Error(`don't use .ngxFill on ngx-sliders, use .ngxSetValue`);
    case NGX.RADIOBUTTON_GROUP:
      throw new Error(`don't use .ngxFill on ngx-radiobutton-group, use .ngxSetValue`);
  }

  cy.wrap(element, LOG).clear(LOG);
  if (text) {
    cy.wrap(element, LOG).type(text, { ...options, ...LOG });
  }
  return cy.focused(LOG).blur(LOG);
}

export function iff(
  element: JQuery<HTMLElement>,
  selector: string,
  fn: (currentSubject: JQuery<any>) => void
): Cypress.Chainable<JQuery<Element>> {
  if (typeof selector === 'function') {
    fn = selector;
    selector = '';
  }
  if ($('body').find(element).length) {
    // check if subject is still in DOM
    const $el = selector ? element.find(selector) : element;
    if ($el.length) {
      return cy.wrap($el, LOG).within(LOG, fn);
    }
  }
}

export function open(element: JQuery<Element>): Cypress.Chainable<JQuery<Element>> {
  switch (getTagName(element)) {
    case NGX.SELECT:
      if (!element.hasClass('active')) {
        element.find('.ngx-select-caret').trigger('click');
      }
      return;
    case NGX.SECTION:
      if (element.find('.ngx-section-header').hasClass('section-collapsed')) {
        element.find('.ngx-section-toggle').trigger('click');
      }
      return;
    case NGX.DROPDOWN:
      console.log(element.hasClass('open'), element);
      if (!element.hasClass('open')) {
        element.find('ngx-dropdown-toggle button').trigger('click'); // TODO: add a dropdown toggle class to ngx-dropdown
      }
      return;
    case NGX.PLUS_MENU:
      if (!element.hasClass('open')) {
        element.find('.ngx-plus-menu--circle-container').trigger('click');
      }
      return;
    case NGX.NAG:
      if (!element.hasClass('ngx-nag-open')) {
        element.find('.ngx-nag-icon').trigger('click');
      }
      return;
  }
}

export function close(element: JQuery<Element>): Cypress.Chainable<JQuery<Element>> {
  switch (getTagName(element)) {
    case NGX.SELECT:
      if (element.hasClass('active')) {
        element.find('.ngx-select-caret').trigger('click', LOG);
      }
      return;
    case NGX.SECTION:
      if (!element.find('.ngx-section-header').hasClass('section-collapsed')) {
        element.find('.ngx-section-toggle').trigger('click', LOG);
      }
      return;
    case NGX.DROPDOWN:
      if (element.hasClass('open')) {
        element.find('button').first().trigger('click'); // TODO: add a dropdown toggle class to ngx-dropdown
      }
      return;
    case NGX.PLUS_MENU:
      if (element.hasClass('open')) {
        element.find('.ngx-plus-menu--circle-container').trigger('click');
      }
      return;
    case NGX.LFD:
    case NGX.MFD:
      element.find('.dialog-container__header button').trigger('click');
      return;
    case NGX.NOTIFICATION:
      element.find('.ngx-notification-close').trigger('click');
      return;
    case NGX.NAG:
      if (element.hasClass('ngx-nag-open')) {
        element.find('.ngx-nag-icon').trigger('click');
      }
      return;
    case NGX.ALERT:
      element.find('.close-button').trigger('click');
      return;
    case NGX.DRAWER:
      element.find('.ngx-dialog-drawer-content__dismiss-btn').trigger('click');
      return;
  }
}
