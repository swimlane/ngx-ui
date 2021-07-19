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

- `.clear`
- `.click`
- `.check`
- `.uncheck`
- `.select`

### New Commands

- `.findInput`
- `.findLabel`
- `.getValue`
- `.fill`
- `.closeNotifications`

### Generic Helper Commands

- `.getByName`
- `.getByLabel`
- `.withinEach`
- `.whileHovering`
- `.iff`
