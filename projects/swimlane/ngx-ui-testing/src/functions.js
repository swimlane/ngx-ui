// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./commands.d.ts'/>
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var DEBUG = false;
var CLEAR = Cypress.platform != 'darwin' ? '{ctrl}a{del}' : '{meta}a{del}';
export var LOG = { log: DEBUG };
export function findInput(element) {
  switch (element.prop('tagName').toLowerCase()) {
    case 'ngx-input' /* INPUT */:
    case 'ngx-date-time' /* DATETIME */:
      return element.find('input,textarea');
    case 'ngx-toggle' /* TOGGLE */:
    case 'ngx-checkbox' /* CHECKBOX */:
      return element.find('input[type="checkbox"]');
    case 'ngx-slider' /* SLIDER */:
      return element.find('input[type="range"]');
    case 'ngx-radiobutton' /* RADIOBUTTON */:
      return element.find('input[type="radio"]');
    case 'ngx-codemirror' /* CODEMIRROR */:
      return cy.wrap(element).find('div.CodeMirror').click().find('textarea');
    case 'ngx-select' /* SELECT */:
      return element.find('input[type="search"]');
  }
  return element;
}
export function findLabel(element) {
  switch (element.prop('tagName').toLowerCase()) {
    case 'ngx-input' /* INPUT */:
    case 'ngx-date-time' /* DATETIME */:
      return element.find('.ngx-input-label');
    case 'ngx-toggle' /* TOGGLE */:
      return element.find('.ngx-toggle-text');
    case 'ngx-checkbox' /* CHECKBOX */:
      return element.find('.ngx-checkbox--content');
    case 'ngx-select' /* SELECT */:
      return element.find('.ngx-select-label');
  }
  return element;
}
export function clear(subject) {
  switch (subject.prop('tagName').toLowerCase()) {
    case 'ngx-codemirror' /* CODEMIRROR */:
      return cy.wrap(subject, LOG).findInput().type(CLEAR, LOG);
    case 'ngx-input' /* INPUT */:
    case 'ngx-date-time' /* DATETIME */:
      return cy.wrap(findInput(subject), LOG).clear(LOG);
    case 'ngx-select' /* SELECT */:
      return cy.wrap(subject, LOG).iff('.ngx-select-clear', function ($el) {
        return $el.trigger('click');
      });
    case 'ngx-toggle' /* TOGGLE */:
    case 'ngx-checkbox' /* CHECKBOX */:
      return cy.wrap(findInput(subject), LOG).uncheck(__assign(__assign({}, LOG), { force: true }));
    case 'ngx-slider' /* SLIDER */:
      var $el = findInput(subject);
      var min = $el.attr('min');
      return $el.val(min);
  }
}
export function getValue(element) {
  var _a;
  switch (element.prop('tagName').toLowerCase()) {
    case 'ngx-codemirror' /* CODEMIRROR */: {
      var $el = element.find('.CodeMirror');
      return ((_a = $el[0]['CodeMirror']) === null || _a === void 0 ? void 0 : _a.getValue()) || '';
    }
    case 'ngx-select' /* SELECT */: {
      var $el = element.find('.ngx-select-input-name');
      if (element.hasClass('multi-selection') || $el.length > 1) {
        return Cypress.$.map($el, function (el) {
          return Cypress.$(el).text();
        });
      } else {
        return ($el === null || $el === void 0 ? void 0 : $el.text()) || '';
      }
    }
    case 'ngx-toggle' /* TOGGLE */:
    case 'ngx-checkbox' /* CHECKBOX */:
    case 'ngx-radiobutton' /* RADIOBUTTON */:
      return findInput(element).is(':checked');
    case 'ngx-radiobutton-group' /* RADIOBUTTON_GROUP */: {
      // This is not good, need to find the real value
      var el = element.find('input[type="radio"]:checked');
      if (!el) return '';
      return el.parent().find('.radio-label--content').text().trim() || '';
    }
  }
  return findInput(element).val();
}
export function setValue(element, text) {
  switch (element.prop('tagName').toLowerCase()) {
    case 'ngx-select' /* SELECT */:
      return cy.wrap(element).select(text);
  }
  console.log(findInput(element));
  findInput(element).val(text);
  element.trigger('change');
}
export function fillValue(element, text, options) {
  if (options === void 0) {
    options = {};
  }
  switch (element.prop('tagName').toLowerCase()) {
    case 'ngx-select' /* SELECT */:
      clear(element);
      if (text) {
        return cy.wrap(element, LOG).type(text, __assign(__assign({}, options), LOG));
      }
    case 'ngx-slider' /* SLIDER */:
      return setValue(element, text);
    case 'ngx-radiobutton-group' /* RADIOBUTTON_GROUP */:
      // This is not good, need to find the real value
      return cy.wrap(element, LOG).contains(text).click(LOG);
  }
  clear(element);
  if (text) {
    cy.wrap(element, LOG).type(text, __assign(__assign({}, options), LOG));
  }
  return cy.focused(LOG).blur(LOG);
}
export function iff(element, selector, fn) {
  if (typeof selector === 'function') {
    fn = selector;
    selector = '';
  }
  if (Cypress.$('body').find(element).length) {
    // check if subject is still in DOM
    var $el = selector ? element.find(selector) : element;
    if ($el.length) {
      return cy.wrap($el, LOG).within(fn);
    }
  }
}
