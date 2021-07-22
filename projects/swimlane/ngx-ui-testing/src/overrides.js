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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
    return to;
  };
import { LOG, clear, findInput } from './functions';
/**
 * Overwrites `cy.select` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('select', function (originalFn, subject, text) {
  var options = [];
  for (var _i = 3; _i < arguments.length; _i++) {
    options[_i - 3] = arguments[_i];
  }
  switch (subject.prop('tagName').toLowerCase()) {
    case 'ngx-select' /* SELECT */:
      if (!Array.isArray(text)) text = [text];
      return cy
        .wrap(subject, LOG)
        .clear()
        .open()
        .withinEach(function () {
          // cy.get('.ngx-select-caret').click();
          text.forEach(function (t) {
            cy.get('li', LOG).contains(t).click(LOG);
          });
        })
        .close();
  }
  return originalFn.apply(void 0, __spreadArray([subject, text], options));
});
/**
 * Overwrites `cy.clear` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('clear', function (originalFn, subject, options) {
  if (options === void 0) {
    options = {};
  }
  var args = [];
  for (var _i = 3; _i < arguments.length; _i++) {
    args[_i - 3] = arguments[_i];
  }
  switch (subject.prop('tagName').toLowerCase()) {
    case 'ngx-codemirror' /* CODEMIRROR */:
    case 'ngx-input' /* INPUT */:
    case 'ngx-date-time' /* DATETIME */:
    case 'ngx-select' /* SELECT */:
    case 'ngx-toggle' /* TOGGLE */:
    case 'ngx-checkbox' /* CHECKBOX */:
    case 'ngx-slider' /* SLIDER */: {
      if (options.log !== false) {
        Cypress.log({
          name: 'clear',
          $el: subject
        });
      }
      return cy.wrap(subject, LOG).each(clear);
    }
  }
  return originalFn.apply(void 0, __spreadArray([subject, options], args));
});
/**
 * Overwrites `cy.click` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('click', function (originalFn, subject) {
  var options = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    options[_i - 2] = arguments[_i];
  }
  switch (subject.prop('tagName').toLowerCase()) {
    case 'ngx-toggle' /* TOGGLE */:
    case 'ngx-checkbox' /* CHECKBOX */:
      return cy.wrap(subject, LOG).each(function (el) {
        originalFn(findInput(el), __assign(__assign({}, options), { force: true }));
      });
  }
  return originalFn.apply(void 0, __spreadArray([subject], options));
});
/**
 * Overwrites `cy.check` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('check', function (originalFn, subject) {
  var options = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    options[_i - 2] = arguments[_i];
  }
  switch (subject.prop('tagName').toLowerCase()) {
    case 'ngx-toggle' /* TOGGLE */:
    case 'ngx-checkbox' /* CHECKBOX */:
    case 'ngx-radiobutton' /* RADIOBUTTON */:
      // TODO: suppport `.check(value, options)`
      return cy.wrap(subject, LOG).each(function (el) {
        originalFn(findInput(el), __assign(__assign({}, options), { force: true }));
      });
  }
  return originalFn.apply(void 0, __spreadArray([subject], options));
});
/**
 * Overwrites `cy.uncheck` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('uncheck', function (originalFn, subject) {
  var options = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    options[_i - 2] = arguments[_i];
  }
  switch (subject.prop('tagName').toLowerCase()) {
    case 'ngx-toggle' /* TOGGLE */:
    case 'ngx-checkbox' /* CHECKBOX */:
      // TODO: suppport `.uncheck(value, options)`
      return cy.wrap(subject, LOG).each(function (el) {
        originalFn(findInput(el), __assign(__assign({}, options), { force: true }));
      });
  }
  return originalFn.apply(void 0, __spreadArray([subject], options));
});
