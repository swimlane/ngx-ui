Setting the `disabled` attribute on a button provides a faded look to signal to the user this button does not provide any action.

Note: Your logic should account for preventing actions taken on buttons, instead of just disabling buttons. [Disabling a button is not application logic](https://dev.to/davidkpiano/no-disabling-a-button-is-not-app-logic-598i)

```html
<button type="button" class="btn" disabled>Default</button>
<button type="button" class="btn btn-primary" disabled>Primary</button>
<button type="button" class="btn btn-primary btn-primary-gradient" disabled>Primary Gradient</button>
<button type="button" class="btn btn-warning" disabled>Warning</button>
<button type="button" class="btn btn-danger" disabled>Danger</button>
<button type="button" class="btn btn-bordered" disabled>Bordered</button>
<button type="button" class="btn btn-link" disabled>Link</button>
```
