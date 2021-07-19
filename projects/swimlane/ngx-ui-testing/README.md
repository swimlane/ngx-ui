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

## Usage

### Extended Commands

#### `.clear`

Overwrites [cy.clear](https://docs.cypress.io/api/commands/clear) to work with ngx-ui elements: `ngx-codemirror`, `ngx-input`, `ngx-date-time`, `ngx-select`, `ngx-toggle`, `ngx-checkbox`, `ngx-select`, `ngx-slider`.

#### `.click`

Overwrites [cy.click](https://docs.cypress.io/api/commands/click) to work with ngx-ui elements: `ngx-toggle`, `ngx-checkbox`.

#### `.check`

Overwrites [cy.check](https://docs.cypress.io/api/commands/check) to work with ngx-ui elements: `ngx-toggle`, `ngx-checkbox`, `ngx-radiobutton`.

#### `.uncheck`

Overwrites [cy.uncheck](https://docs.cypress.io/api/commands/uncheck) to work with ngx-ui elements: `ngx-toggle`, `ngx-checkbox`.

#### `.select`

Overwrites [cy.select](https://docs.cypress.io/api/commands/select) to work with ngx-ui elements: `ngx-select`.

### New Commands

#### `.findInput`

Given an ngx-ui element, returns the child native input element. Works with: `ngx-codemirror`, `ngx-input`, `ngx-date-time`, `ngx-toggle`, `ngx-checkbox`, `ngx-select`, `ngx-slider`, `ngx-radiobutton`.

#### `.findLabel`

Given an element, returns the label element. Works with: `ngx-input`, `ngx-date-time`, `ngx-toggle`, `ngx-checkbox`, `ngx-select`.

#### `.getValue`

Given an element, returns the element's value. Works with: `ngx-codemirror`, `ngx-input`, `ngx-date-time`, `ngx-toggle`, `ngx-checkbox`, `ngx-select`, `ngx-slider`, `ngx-radiobutton-group`.

#### `.fill`

Like [cy.type](https://docs.cypress.io/api/commands/type) but clears existing text before and works with ngx-ui elements. Works with: `ngx-codemirror`, `ngx-input`, `ngx-date-time`, `ngx-select`, `ngx-slider`, `ngx-radiobutton-group`.

#### `.closeNotifications`

Close all `.ngx-notification`s, if any.

### Generic Helper Commands

#### `.getByName`

Find element by name attribute.

#### `.getByLabel`

Find element by label attribute. Alias for ` cy.get(``*[name="${name}"]``) `

#### `.withinEach`

Like [cy.within](https://docs.cypress.io/api/commands/within), but for each element.

#### `.whileHovering`

Like [cy.within](https://docs.cypress.io/api/commands/within) but also forces the element into a hover state. Useful for running assertions on a notification or other element that needs to be hovered over.

#### `.iff`

Like [cy.within](https://docs.cypress.io/api/commands/within) but only if the element exists in the DOM.
