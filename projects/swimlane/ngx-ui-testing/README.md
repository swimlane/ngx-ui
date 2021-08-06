# swimlane/ngx-ui-testing

Cypress Helper commands for testing application that utilize ngx-ui.

## Installation

```sh
npm install --save-dev cypress-ngx-ui-testing
```

Import the `@swimalne/ngx-ui-testing` `cypress/support/index.(ts|js)` file:

```ts
import '@swimlane/ngx-ui-testing';
```

## Extended Commands

### `.clear`

Overwrites [cy.clear](https://docs.cypress.io/api/commands/clear) to work with ngx-ui elements: `ngx-codemirror`, `ngx-input`, `ngx-date-time`, `ngx-select`, `ngx-toggle`, `ngx-checkbox`, `ngx-select`, `ngx-slider`.

```ts
.clear()
.clear(options)
```

---

### `.click`

Overwrites [cy.click](https://docs.cypress.io/api/commands/click) to work with ngx-ui elements: `ngx-toggle`, `ngx-checkbox`.

```ts
.click()
.click(options)
.click(position)
.click(position, options)
.click(x, y)
.click(x, y, options)
```

---

### `.check`

Overwrites [cy.check](https://docs.cypress.io/api/commands/check) to work with ngx-ui elements: `ngx-toggle`, `ngx-checkbox`, `ngx-radiobutton`.

```ts
.check()
.check(options)
```

---

### `.uncheck`

Overwrites [cy.uncheck](https://docs.cypress.io/api/commands/uncheck) to work with ngx-ui elements: `ngx-toggle`, `ngx-checkbox`.

```ts
.uncheck()
.uncheck(options)
```

---

### `.select`

Overwrites [cy.select](https://docs.cypress.io/api/commands/select) to work with ngx-ui elements: `ngx-select`, `ngx-dropdown`.

```ts
.select(value)
.select(values)
.select(value, options)
.select(values, options)
```

---

## New Commands

### `.ngxFindNativeInput`

Given an ngx-ui element, returns the child native input element. Works with: `ngx-codemirror`, `ngx-input`, `ngx-date-time`, `ngx-toggle`, `ngx-checkbox`, `ngx-select`, `ngx-slider`, `ngx-radiobutton`.

```ts
.ngxFindNativeInput()
```

#### example

```ts
cy.get('ngx-input').ngxFindNativeInput().should('have.attr', 'type');
```

---

### `.ngxFindLabel`

Given an element, returns the label element. Works with: `ngx-input`, `ngx-date-time`, `ngx-toggle`, `ngx-checkbox`, `ngx-select`.

```ts
.ngxFindLabel()
```

---

### `.ngxGetValue`

Given an element, returns the element's value. Works with: `ngx-codemirror`, `ngx-input`, `ngx-date-time`, `ngx-toggle`, `ngx-checkbox`, `ngx-select`, `ngx-slider`, `ngx-radiobutton`, `ngx-radiobutton-group`.

```ts
.ngxGetValue()
```

#### example

```ts
cy.get('ngx-input').ngxGetValue().should('eq', 'foo');
```

---

### `.ngxFill`

Like [cy.type](https://docs.cypress.io/api/commands/type) but clears existing text before and works with ngx-ui elements: `ngx-codemirror`, `ngx-input`, `ngx-date-time`, `ngx-select`.

```ts
.fill(value)
.fill(value, options)
```

#### example

```ts
cy.get('ngx-input').fill('foo').ngxGetValue().should('eq', 'foo');
cy.get('ngx-select').fill('foo').selct('foo').ngxGetValue().should('eq', 'foo');
```

---

### `.ngxOpen`

Open a ngx-ui components if it is closed. Works with `ngx-select`, `ngx-section`, `ngx-dropdown`, `ngx-plus-menu`.

```ts
.ngxOpen()
```

---

### `.ngxClose`

Close a ngx-ui components if it is open. Works with `ngx-select`, `ngx-section`, `ngx-dropdown`, `ngx-plus-menu`, `ngx-largeformat-dialog`, `ngx-notification`, `ngx-nag`, `ngx-alert-dialog`, `ngx-drawer.

```ts
.ngxClose()
```

---

### `.ngxCloseNotifications`

Close all `.ngx-notification`s, if any. Will not fail if no notifications are found.

```ts
.ngxCloseNotifications()
```

---

## Generic Helper Commands

### `.getByName`

Find element by name attribute. Alias for ` cy.get(``*[name="${name}"]``) `

```ts
.getByName('name')
```

---

#### `.getByLabel`

Find element by label either within a ngx-ui component or via the `for` attribute.

```ts
.getByLabel('label')
```

---

#### `.getByPlaceholder`

Find element by placeholder.

```ts
.getByPlaceholder('label')
```

---

#### `.withinEach`

Like [cy.within](https://docs.cypress.io/api/commands/within), but for each element.

```ts
.withinEach(callbackFn)
```

#### example

```ts
cy.get('.my-inputs').withinEach(el => {
  ...
});
```

---

#### `.whileHovering`

Like [cy.within](https://docs.cypress.io/api/commands/within) but also forces the element into a hover state. Useful for running assertions on a notification that persist while hovering.

```ts
.whileHovering(callbackFn)
```

---

#### `.iff`

Like [cy.within](https://docs.cypress.io/api/commands/within) but only if the element exists in the DOM.

```ts
.iff(callbackFn)
.iff(selector, callbackFn)
```

#### example

```ts
cy.get('#my-input').iff(el => {
  ...
});

cy.get('#my-input').iff('div', el => {
  ...
});
```

---
