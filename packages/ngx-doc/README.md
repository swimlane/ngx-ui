# ngx-doc

This library is intended to be used to build documentations for **Angular** library with `@swimlane/ngx-ui` design system.

## Installation

```ts
npm install @swimlane/ngx-doc @swimlane/ngx-ui
```

## Set up

1. Include `ngx-ui` styles and icons in `angular.json`. Check out how at [NGX-UI Documentations](https://ngx-ui-beta.netlify.app)
2. Include `prismjs` for syntax highlighting

```json
"scripts": [
  "node_modules/marked/lib/marked.js",
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-typescript.min.js",
  "node_modules/prismjs/components/prism-bash.min.js",
  "node_modules/prismjs/components/prism-css.min.js",
  "node_modules/prismjs/components/prism-scss.min.js",
  "node_modules/prismjs/components/prism-css-extras.min.js",
  "node_modules/prismjs/components/prism-markup.min.js",
  "node_modules/prismjs/components/prism-json.min.js"
]
```

> This is an example. You can pick any languages you need. `marked.js` and `prism.js` are **required**

3. Include a PrismJS theme

```json
"styles": [
  "packages/docs/src/styles.scss",
  "node_modules/prism-themes/themes/prism-dracula.css"
],
```

> This is an example. You can pick any theme you want

4. TBD 

## Building blocks

### `ngx-doc-main`

### `ngx-doc-page`

### `ngx-doc-example`

### `ngx-doc-markdown`
