/// <reference types="cypress" />
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
var CODEMIRROR = 'NGX-CODEMIRROR';
var SELECT = 'NGX-SELECT';
var INPUT = 'NGX-INPUT';
var DATETIME = 'NGX-DATE-TIME';
var TOGGLE = 'NGX-TOGGLE';
var CHECKBOX = 'NGX-CHECKBOX';
var SLIDER = 'NGX-SLIDER';
var RADIOBUTTON_GROUP = 'NGX-RADIOBUTTON-GROUP';
var RADIOBUTTON = 'NGX-RADIOBUTTON';
var CLEAR = Cypress.platform != 'darwin' ? '{ctrl}a{del}' : '{meta}a{del}';
/**
 * Find element by name attribute.
 */
Cypress.Commands.add('getByName', function (name) {
  return cy.get('*[name="' + name + '"]');
});
/**
 * Find element by label attribute.
 */
Cypress.Commands.add('getByLabel', function (label) {
  return cy.get('*[label="' + label + '"]');
});
/**
 * Given an element, returns the child input element.
 */
Cypress.Commands.add('findInput', { prevSubject: true }, function (element) {
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
/**
 * Given an element, returns the child label element.
 */
Cypress.Commands.add('findLabel', { prevSubject: true }, function (element) {
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
Cypress.Commands.add('getValue', { prevSubject: true }, function (element) {
  var _a, _b;
  switch (element.prop('tagName')) {
    case CODEMIRROR: {
      var $el = element.find('.CodeMirror');
      return (
        ((_b = (_a = $el[0]) === null || _a === void 0 ? void 0 : _a.CodeMirror) === null || _b === void 0
          ? void 0
          : _b.getValue()) || ''
      );
    }
    case SELECT: {
      var $el = element.find('.ngx-select-input-name');
      if (element.hasClass('multi-selection') || $el.length > 1) {
        return Cypress.$.map($el, function (el) {
          return Cypress.$(el).text();
        });
      } else {
        return ($el === null || $el === void 0 ? void 0 : $el.text()) || '';
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
        .then(function (el) {
          return el.is(':checked');
        });
    case SLIDER:
      return cy.wrap(element).findInput().invoke('val');
    case RADIOBUTTON_GROUP: {
      // This is not good, need to find the real value
      var el = element.find('input[type="radio"]:checked');
      if (!el) return '';
      return el.parent().find('.radio-label--content').text().trim() || '';
    }
    case RADIOBUTTON:
      return cy
        .wrap(element)
        .findInput()
        .then(function (el) {
          return el.is(':checked');
        });
  }
  return cy.wrap(element).invoke('val');
});
/**
 * Close all notifications, if any.
 */
Cypress.Commands.add('closeNotifications', function () {
  cy.get('ngx-notification-container').iff('.ngx-notification-close', function ($el) {
    return $el.trigger('click');
  });
});
/**
 * Like `cy.within`, but for each element.
 */
Cypress.Commands.add('withinEach', { prevSubject: true }, function (subject, fn) {
  cy.wrap(subject).each(function ($el) {
    cy.wrap($el).within(fn);
  });
});
/**
 * Like `cy.within` but also forces the element into a hover state.
 */
Cypress.Commands.add('whileHovering', { prevSubject: true }, function (subject, fn) {
  return cy
    .wrap(subject)
    .trigger('mouseover', { log: false })
    .trigger('mouseenter', { log: false })
    .within(function ($el) {
      subject.addClass('cy-hover');
      fn($el);
      subject.removeClass('cy-hover');
    })
    .iff(function ($el) {
      return cy.wrap($el).trigger('mouseleave', { log: false }).trigger('mouseout', { log: false });
    });
});
/**
 * Overwrites `cy.clear` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('clear', function (originalFn, element) {
  var options = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    options[_i - 2] = arguments[_i];
  }
  switch (element.prop('tagName')) {
    case CODEMIRROR:
      cy.wrap(element).findInput().type(CLEAR);
      return cy.wrap(element);
    case INPUT:
    case DATETIME:
      cy.wrap(element).findInput().clear();
      return cy.wrap(element);
    case SELECT:
      cy.wrap(element).iff('.ngx-select-clear', function ($el) {
        return $el.trigger('click');
      });
      return cy.wrap(element);
    case TOGGLE:
    case CHECKBOX:
      return cy.wrap(element).uncheck();
    case SLIDER:
      return cy
        .wrap(element)
        .findInput()
        .then(function ($el) {
          var min = $el.attr('min');
          return $el.val(min);
        });
  }
  return originalFn.apply(void 0, __spreadArray([element], options));
});
/**
 * Overwrites `cy.click` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('click', function (originalFn, element) {
  var _a, _b;
  var options = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    options[_i - 2] = arguments[_i];
  }
  switch (element.prop('tagName')) {
    case TOGGLE:
      (_a = cy.wrap(element).find('.ngx-toggle-label')).click.apply(_a, options);
      return cy.wrap(element);
    case CHECKBOX:
      (_b = cy.wrap(element).find('.ngx-checkbox--label')).click.apply(_b, options);
      return cy.wrap(element);
  }
  return originalFn.apply(void 0, __spreadArray([element], options));
});
/**
 * Overwrites `cy.check` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('check', function (originalFn, element) {
  var options = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    options[_i - 2] = arguments[_i];
  }
  switch (element.prop('tagName')) {
    case TOGGLE:
    case CHECKBOX:
    case RADIOBUTTON:
      cy.wrap(element)
        .findInput()
        .check(__assign(__assign({}, options), { force: true }));
      return cy.wrap(element);
  }
  return originalFn.apply(void 0, __spreadArray([element], options));
});
/**
 * Overwrites `cy.uncheck` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('uncheck', function (originalFn, element) {
  var options = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    options[_i - 2] = arguments[_i];
  }
  switch (element.prop('tagName')) {
    case TOGGLE:
    case CHECKBOX:
      cy.wrap(element)
        .findInput()
        .uncheck(__assign(__assign({}, options), { force: true }));
      return cy.wrap(element);
  }
  return originalFn.apply(void 0, __spreadArray([element], options));
});
/**
 * Overwrites `cy.select` to work with ngx-ui elements.
 */
Cypress.Commands.overwrite('select', function (originalFn, element, text) {
  var options = [];
  for (var _i = 3; _i < arguments.length; _i++) {
    options[_i - 3] = arguments[_i];
  }
  switch (element.prop('tagName')) {
    case SELECT:
      return cy
        .wrap(element)
        .clear()
        .within(function () {
          cy.get('.ngx-select-caret').click();
          if (Array.isArray(text)) {
            text.forEach(function (t) {
              cy.contains(t).click();
            });
          } else {
            cy.contains(text).click();
          }
          cy.get('.ngx-select-caret').click();
        });
  }
  return originalFn.apply(void 0, __spreadArray([element, text], options));
});
/**
 * Like `cy.type` but clears existing text before and works with ngx-ui elements.
 */
Cypress.Commands.add('fill', { prevSubject: true }, function (subject, text) {
  var _a, _b, _c, _d;
  var options = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    options[_i - 2] = arguments[_i];
  }
  if (!text) {
    return (_a = cy.wrap(subject)).clear.apply(_a, options);
  }
  switch (subject.prop('tagName')) {
    case SELECT:
      cy.wrap(subject).clear();
      return (_b = cy.wrap(subject)).type.apply(_b, __spreadArray([text + '{downarrow}{enter}'], options));
    case INPUT:
    case DATETIME:
    case CODEMIRROR:
      (_c = cy.wrap(subject).clear().findInput()).type.apply(_c, __spreadArray([text], options)).blur();
      return cy.wrap(subject);
    case SLIDER:
      cy.wrap(subject).findInput().invoke('val', text).trigger('change');
      return cy.wrap(subject);
    case RADIOBUTTON_GROUP:
      // This is not good, need to find the real value
      cy.get('@CUT').contains(text).click();
      return cy.wrap(subject);
  }
  (_d = cy.wrap(subject).clear()).type.apply(_d, __spreadArray([text], options)).blur();
  return cy.wrap(subject);
});
/**
 * Like `cy.within` but only if the element exists in the DOM.
 */
Cypress.Commands.add('iff', { prevSubject: true }, function (subject, selector, fn) {
  if (typeof selector === 'function') {
    fn = selector;
    selector = '';
  }
  if (Cypress.$('body').find(subject).length) {
    // check if subject is still in DOM
    var $el = selector ? subject.find(selector) : subject;
    if ($el.length) {
      return cy.wrap($el).within(fn);
    }
  }
  return subject;
});
