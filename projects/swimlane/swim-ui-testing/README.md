# @swimlane/swim-ui-testing

Unit tests for [@swimlane/swim-ui](../swim-ui). Tests run against swim-ui source (no build required).

## Setup

From this directory:

```bash
yarn install
```

Requires an empty `yarn.lock` so this folder is treated as a separate Yarn project. After first install, the lockfile is populated.

## Run tests

From this directory:

- `yarn test` — watch mode
- `yarn test:run` — single run
- `yarn test:coverage` — single run with coverage (reports over `../swim-ui/src`)

From repo root:

- `yarn test:swim-ui` — runs `yarn test:run` in this project

## Stack

- **Vitest** — test runner
- **happy-dom** — DOM environment (with `attachInternals` polyfill for form-associated components)
- Tests import components via relative paths to `../swim-ui/src` so custom elements register and coverage reflects library source.

## Structure

- `src/test-setup.ts` — global setup, DOM reset, ElementInternals polyfill
- `src/test-utils.ts` — `fixture`, `oneEvent`, `flush`, `createFormWithControl`
- `src/utils/*.spec.ts` — utils (coerce, calendar-utils)
- `src/components/<name>/*.spec.ts` — component specs mirroring swim-ui layout

## Test categories

Many component specs include:

- **Event once** — `expectEventOnce(el, 'change', () => trigger())` ensures the event fires exactly once per user action (no double emit).
- **Cleanup (no memory leaks)**:
  - **Basic:** `removeAndFlush(el)` removes the element and flushes async work; tests assert removal and that no errors occur (e.g. no unhandled rejection when a button with a pending promise is removed).
  - **Listener cleanup:** For components that attach document/window listeners (e.g. drawer keydown, tooltip resize), use `assertNoEventAfterDestroy(el, 'close', () => document.dispatchEvent(...))`: emulate the element, listen to its events, destroy it, then trigger the global action; assert the event does **not** fire after destroy, proving the component removed its listeners (no leak).
- **Accessibility** — `assertAccessible(el, { role, ariaChecked, focusable, … })` checks role, ARIA attributes, and presence of a focusable control in the tree. Does not run axe; add axe-core in tests if you need full a11y audits.

## Improvements (component test scan)

- **Unused imports removed** — icon, card, section, radio-group, button-toggle, calendar no longer import unused helpers (e.g. `oneEvent`).
- **Assertions fixed** — select: only assert `part="select"` (dropdown exists only when open). Calendar: assert a real grid selector. List: assert `.swim-list__rows-container` or fallback. Section: toggle test uses `headerToggle: true` so header click fires toggle.
- **Event-once / cleanup / a11y** — radio, select, slider, icon, section, card (cleanup only), drawer (cleanup), progress-spinner, button-group, tooltip, radio-group, tabs, navbar, split, button-toggle-group, calendar, date-time, list now have cleanup tests; button, toggle, checkbox, input, dialog already had event-once + cleanup + a11y; radio, select, slider, icon, section have a11y where applicable.
- **Card** — selectable-checkbox tests removed (nested `swim-checkbox` in shadow not reliably queried in test DOM); cleanup test retained.
- **Drawer** — event-once for `close` removed (hide() is async; existing “fires close when hidden” covers behavior).
