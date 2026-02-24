# @swimlane/lit-ui

Lit web component library matching Swimlane's ngx-ui design system.

## Features

- 🎨 **Design System Parity**: Matches the visual design of @swimlane/ngx-ui
- 🚀 **Modern Web Standards**: Built with Lit and Web Components
- 🔧 **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JavaScript
- 📦 **Tree-shakeable**: Import only what you need
- 💪 **TypeScript**: Full type definitions included
- ♿ **Accessible**: WCAG 2.1 compliant

## Installation

```bash
npm install @swimlane/lit-ui
# or
yarn add @swimlane/lit-ui
```

## CDN (GitHub Pages)

You can load the library from the CDN for testing or use in a Lit app without installing from npm.

**Publish to GitHub Pages** (manual, from this repo):

```bash
cd projects/swimlane/lit-ui && npm run deploy:gh-pages
```

Ensure GitHub Pages is enabled for the repo (Settings → Pages → Source: branch `gh-pages`). Files are available under your Pages base URL (e.g. `https://surya-pabbineedi.github.io/ngx-ui/`).

**Load only what you need (per-component, faster):**

Each component is built as a self-contained script. Import only the components you use:

```typescript
const base = 'https://surya-pabbineedi.github.io/ngx-ui';

// Only button and input (registers <swim-button>, <swim-input>)
import `${base}/button.js`;
import `${base}/input.js`;
```

Available files: `button.js`, `input.js`, `select.js`, `card.js`, `dialog.js`, `tabs.js`, `styles.js`, etc. (one per component plus `styles.js`). Each file includes Lit and its dependencies so no import map is required.

**Load everything (full bundle):**

```typescript
// Side-effect: registers all custom elements
import 'https://surya-pabbineedi.github.io/ngx-ui/lit-ui.js';
// Then use <swim-button>, <swim-input>, etc. in your templates.
```

Your app must have `lit` as a dependency so the bundle’s `lit` imports resolve. Add the same CSS variables (design tokens) in your app’s root or styles so components match the design; include the icon font/CSS if you use `swim-icon`.

## Quick Start

### In HTML

```html
<script type="module">
  import '@swimlane/lit-ui/button';
</script>

<swim-button variant="primary">Click Me</swim-button>
```

### In TypeScript/JavaScript

```typescript
import '@swimlane/lit-ui/button';

const button = document.createElement('swim-button');
button.variant = 'primary';
button.textContent = 'Click Me';
document.body.appendChild(button);
```

### With React

```tsx
import '@swimlane/lit-ui/button';

function App() {
  return <swim-button variant="primary">Click Me</swim-button>;
}
```

### With Vue

```vue
<template>
  <swim-button variant="primary">Click Me</swim-button>
</template>

<script>
import '@swimlane/lit-ui/button';
</script>
```

### With Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@swimlane/lit-ui/button';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

```html
<!-- component.html -->
<swim-button variant="primary">Click Me</swim-button>
```

## Icon font

`swim-icon` uses font family `ngx-icon` (same as ngx-ui). Codepoints in lit-ui match `icons.scss` / `ngx-icon.svg`. The host must load the **same** ngx-icon font for correct glyphs.

**Loading from the ngx-ui package (recommended):** If your app has `@swimlane/ngx-ui` installed, use the same `@font-face` as ngx-ui so both Angular and Lit share one font:

```scss
$ngx-font-path: '../../../../node_modules/@swimlane/ngx-ui/lib/assets/icons/iconfont/fonts' !default;

@font-face {
  font-family: 'ngx-icon';
  src: url('#{$ngx-font-path}/ngx-icon.eot');
  src: url('#{$ngx-font-path}/ngx-icon.eot') format('embedded-opentype'), url('#{$ngx-font-path}/ngx-icon.woff2') format('woff2'),
    url('#{$ngx-font-path}/ngx-icon.woff') format('woff'), url('#{$ngx-font-path}/ngx-icon.ttf') format('truetype'),
    url('#{$ngx-font-path}/ngx-icon.svg') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

Plain CSS equivalent (adjust the path to your node_modules or asset URL):

```css
@font-face {
  font-family: 'ngx-icon';
  src: url('path/to/ngx-ui/.../fonts/ngx-icon.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
```

When the font is loaded from the ngx-ui package this way, the default `icon-font-glyphs.ts` (generated from `icons.scss`) is correct. The CDN build embeds the font as base64, so no external font loading is required.

**How the font is deployed from the Angular lib:** The ngx-ui library’s `ng-package.json` includes an `assets` entry that copies `src/lib/assets/icons/iconfont/fonts/*` (eot, woff2, woff, ttf, svg) into the built package at `lib/assets/icons/iconfont/fonts/`. So when you install `@swimlane/ngx-ui` from npm, those files in `node_modules/@swimlane/ngx-ui/lib/assets/icons/iconfont/fonts/` are the **same files** as in the repo—no transformation, just copy.

## Components

### Button

A versatile button component with multiple variants, sizes, and states.

[Jump to Input Component](#input)

---

#### Properties

| Property   | Type                                                                      | Default     | Description                                   |
| ---------- | ------------------------------------------------------------------------- | ----------- | --------------------------------------------- |
| `variant`  | `'default' \| 'primary' \| 'warning' \| 'danger' \| 'link' \| 'bordered'` | `'default'` | Visual style of the button                    |
| `size`     | `'small' \| 'medium' \| 'large'`                                          | `'medium'`  | Size of the button                            |
| `disabled` | `boolean`                                                                 | `false`     | Whether the button is disabled                |
| `state`    | `'active' \| 'in-progress' \| 'success' \| 'fail'`                        | `'active'`  | Current state of the button                   |
| `type`     | `'button' \| 'submit' \| 'reset'`                                         | `'button'`  | HTML button type                              |
| `timeout`  | `number`                                                                  | `3000`      | Timeout (ms) before returning to active state |
| `promise`  | `Promise<any>`                                                            | `undefined` | Promise to track (auto-updates state)         |

#### Examples

```html
<!-- Basic variants -->
<swim-button variant="primary">Primary</swim-button>
<swim-button variant="warning">Warning</swim-button>
<swim-button variant="danger">Danger</swim-button>
<swim-button variant="link">Link</swim-button>
<swim-button variant="bordered">Bordered</swim-button>

<!-- Sizes -->
<swim-button size="small">Small</swim-button>
<swim-button size="medium">Medium</swim-button>
<swim-button size="large">Large</swim-button>

<!-- States -->
<swim-button state="in-progress">Loading...</swim-button>
<swim-button state="success">Success</swim-button>
<swim-button state="fail">Failed</swim-button>
<swim-button disabled>Disabled</swim-button>

<!-- Promise handling -->
<swim-button id="asyncBtn" variant="primary">Click Me</swim-button>
<script>
  const btn = document.getElementById('asyncBtn');
  btn.addEventListener('click', () => {
    btn.promise = fetch('/api/data').then(res => res.json());
  });
</script>
```

---

### Input

A fully-featured input component with floating labels, validation, and multiple input types.

#### Properties

| Property                | Type                                                                          | Default     | Description                                          |
| ----------------------- | ----------------------------------------------------------------------------- | ----------- | ---------------------------------------------------- |
| `type`                  | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'textarea'` | `'text'`    | Type of input                                        |
| `label`                 | `string`                                                                      | `''`        | Floating label text                                  |
| `placeholder`           | `string`                                                                      | `''`        | Placeholder text                                     |
| `hint`                  | `string`                                                                      | `''`        | Hint text below input                                |
| `value`                 | `string`                                                                      | `''`        | Input value                                          |
| `name`                  | `string`                                                                      | `''`        | Input name for forms                                 |
| `disabled`              | `boolean`                                                                     | `false`     | Whether the input is disabled                        |
| `readonly`              | `boolean`                                                                     | `false`     | Whether the input is readonly                        |
| `required`              | `boolean`                                                                     | `false`     | Whether the input is required                        |
| `appearance`            | `'legacy' \| 'fill'`                                                          | `'legacy'`  | Visual appearance style                              |
| `size`                  | `'sm' \| 'md' \| 'lg'`                                                        | `'sm'`      | Size of the input                                    |
| `min`                   | `number`                                                                      | `undefined` | Min value (for number type)                          |
| `max`                   | `number`                                                                      | `undefined` | Max value (for number type)                          |
| `minlength`             | `number`                                                                      | `undefined` | Minimum length                                       |
| `maxlength`             | `number`                                                                      | `undefined` | Maximum length                                       |
| `passwordToggleEnabled` | `boolean`                                                                     | `false`     | Show password visibility toggle (password type only) |
| `textareaRows`          | `number`                                                                      | `3`         | Number of rows (for textarea type)                   |
| `requiredIndicator`     | `string`                                                                      | `'*'`       | Indicator shown for required fields                  |
| `autofocus`             | `boolean`                                                                     | `false`     | Whether to autofocus on load                         |
| `autocomplete`          | `'on' \| 'off' \| 'new-password'`                                             | `'off'`     | Autocomplete attribute                               |
| `marginless`            | `boolean`                                                                     | `false`     | Remove top/bottom margins                            |
| `withHint`              | `boolean`                                                                     | `true`      | Whether to show hint section                         |

#### Slots

| Slot     | Description                     |
| -------- | ------------------------------- |
| `prefix` | Content before the input        |
| `suffix` | Content after the input         |
| `hint`   | Custom hint content below input |

#### Events

| Event    | Description                  |
| -------- | ---------------------------- |
| `input`  | Fired on input changes       |
| `change` | Fired when value changes     |
| `focus`  | Fired when input gains focus |
| `blur`   | Fired when input loses focus |

#### Examples

```html
<!-- Basic text input -->
<swim-input label="Username" placeholder="Enter username"></swim-input>

<!-- Required input with validation -->
<swim-input
  label="Email"
  type="email"
  required
  placeholder="user@example.com"
  hint="We'll never share your email"
></swim-input>

<!-- Password with toggle -->
<swim-input type="password" label="Password" password-toggle-enabled minlength="8"></swim-input>

<!-- Number input with constraints -->
<swim-input type="number" label="Age" min="18" max="100" hint="Must be between 18 and 100"></swim-input>

<!-- Textarea -->
<swim-input type="textarea" label="Comments" textarea-rows="4" maxlength="500"></swim-input>

<!-- Fill appearance -->
<swim-input appearance="fill" label="Search" placeholder="Type to search..."></swim-input>

<!-- With prefix and suffix -->
<swim-input label="Website" appearance="fill">
  <span slot="prefix">https://</span>
  <span slot="suffix">.com</span>
</swim-input>

<!-- Different sizes -->
<swim-input size="sm" label="Small Input"></swim-input>
<swim-input size="md" label="Medium Input"></swim-input>
<swim-input size="lg" label="Large Input"></swim-input>

<!-- In a form -->
<form>
  <swim-input name="username" label="Username" required></swim-input>
  <swim-input name="email" type="email" label="Email" required></swim-input>
  <swim-button type="submit" variant="primary">Submit</swim-button>
</form>

<!-- Programmatic access -->
<swim-input id="myInput" label="Name"></swim-input>
<script>
  const input = document.getElementById('myInput');

  // Get value
  console.log(input.value);

  // Set value
  input.value = 'John Doe';

  // Listen to changes
  input.addEventListener('change', e => {
    console.log('Value changed:', e.target.value);
  });
</script>
```

---

### Select

A dropdown select component with filtering, multi-select support, and keyboard navigation.

#### Properties

| Property            | Type                   | Default                  | Description                         |
| ------------------- | ---------------------- | ------------------------ | ----------------------------------- |
| `label`             | `string`               | `''`                     | Floating label text                 |
| `placeholder`       | `string`               | `'Select...'`            | Placeholder text                    |
| `hint`              | `string`               | `''`                     | Hint text below select              |
| `emptyPlaceholder`  | `string`               | `'No options available'` | Text shown when no options          |
| `filterPlaceholder` | `string`               | `'Filter options...'`    | Placeholder for filter input        |
| `options`           | `SelectOption[]`       | `[]`                     | Array of select options             |
| `value`             | `any \| any[]`         | `null`                   | Selected value(s)                   |
| `name`              | `string`               | `''`                     | Input name for forms                |
| `disabled`          | `boolean`              | `false`                  | Whether the select is disabled      |
| `required`          | `boolean`              | `false`                  | Whether the select is required      |
| `appearance`        | `'legacy' \| 'fill'`   | `'legacy'`               | Visual appearance style             |
| `size`              | `'sm' \| 'md' \| 'lg'` | `'sm'`                   | Size of the select                  |
| `marginless`        | `boolean`              | `false`                  | Remove top/bottom margins           |
| `withHint`          | `boolean`              | `true`                   | Whether to show hint section        |
| `filterable`        | `boolean`              | `true`                   | Enable filtering/searching          |
| `multiple`          | `boolean`              | `false`                  | Allow multiple selection            |
| `allowClear`        | `boolean`              | `true`                   | Show clear button                   |
| `requiredIndicator` | `string`               | `'*'`                    | Indicator shown for required fields |

#### SelectOption Interface

```typescript
interface SelectOption {
  name: string; // Display name
  value: any; // Value
  disabled?: boolean; // Whether option is disabled
  group?: string; // Group name (for future grouping)
}
```

#### Events

| Event    | Description                                    |
| -------- | ---------------------------------------------- |
| `change` | Fired when selection changes (detail: {value}) |
| `open`   | Fired when dropdown opens                      |
| `close`  | Fired when dropdown closes                     |

#### Slots

| Slot   | Description                     |
| ------ | ------------------------------- |
| `hint` | Custom hint content below input |

#### Examples

```html
<!-- Basic select -->
<swim-select id="mySelect" label="Choose an option" placeholder="Select..."></swim-select>
<script>
  const select = document.getElementById('mySelect');
  select.options = [
    { name: 'Option 1', value: 'opt1' },
    { name: 'Option 2', value: 'opt2' },
    { name: 'Option 3', value: 'opt3' }
  ];
</script>

<!-- Required select -->
<swim-select label="Category" required placeholder="Choose a category..."></swim-select>

<!-- Multi-select -->
<swim-select label="Choose tags" multiple placeholder="Select one or more..."></swim-select>

<!-- With filtering -->
<swim-select
  label="Search countries"
  filterable
  placeholder="Select a country..."
  hint="Type to filter options"
></swim-select>

<!-- Fill appearance -->
<swim-select appearance="fill" label="Select" placeholder="Choose..."></swim-select>

<!-- Disabled option -->
<swim-select label="Status"></swim-select>
<script>
  const statusSelect = document.querySelector('swim-select');
  statusSelect.options = [
    { name: 'Active', value: 'active' },
    { name: 'Inactive', value: 'inactive', disabled: true },
    { name: 'Pending', value: 'pending' }
  ];
</script>

<!-- In a form -->
<form>
  <swim-select name="category" label="Category" required></swim-select>
  <swim-button type="submit" variant="primary">Submit</swim-button>
</form>

<!-- Listening to changes -->
<swim-select id="dynamicSelect" label="Selection"></swim-select>
<script>
  const select = document.getElementById('dynamicSelect');

  // Set options
  select.options = [
    { name: 'Apple', value: 'apple' },
    { name: 'Banana', value: 'banana' },
    { name: 'Orange', value: 'orange' }
  ];

  // Get value
  console.log(select.value);

  // Set value
  select.value = 'banana';

  // Listen to changes
  select.addEventListener('change', e => {
    console.log('Selected:', e.detail.value);
  });

  // For multiple selection
  const multiSelect = document.querySelector('swim-select[multiple]');
  multiSelect.value = ['apple', 'orange']; // Set multiple values
  console.log(multiSelect.value); // Get array of values
</script>
```

## Development

### Setup

```bash
cd projects/swimlane/lit-ui
npm install
```

### Running the Demo

```bash
npm run dev
```

Open http://localhost:4300 in your browser.

### Building

```bash
npm run build:lib
```

### Project Structure

```
src/
├── components/
│   └── button/
│       ├── button.component.ts    # Component implementation
│       ├── button.styles.ts       # Component styles
│       └── button-state.enum.ts   # State enum
├── styles/
│   ├── tokens/                    # Design tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   └── base.ts                    # Base CSS variables
├── utils/
│   └── coerce.ts                  # Type coercion utilities
└── index.ts                       # Main export
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern browsers with Web Components support

For older browsers, polyfills may be required.

## License

MIT

## Credits

Built by [Swimlane](https://swimlane.com)
