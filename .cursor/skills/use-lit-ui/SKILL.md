---
name: use-lit-ui
description: Use Swimlane lit-ui (swim-* custom elements) when building custom solutions, record widgets, or report widgets for Turbine. Covers properties, events, slots, imperative APIs, and CDN usage. Apply this skill when using generate-swimlane-lit-solution (it depends on use-lit-ui for component list, API, and design). Use when authoring or modifying Turbine widgets, custom solutions, or any UI that uses @swimlane/lit-ui components.
---

# Using Swimlane lit-ui

Use this skill when building **custom solutions** or **widgets** for [Swimlane Turbine](https://docs.swimlane.com/widgets) with **Swimlane lit-ui** (`swim-*` web components). All UI must use these elements; do not invent tag names or assume other component libraries.

## Base and runtime

- **Custom elements**: Extend **SwimlaneElement** (from `@swimlane/swimlane-element@2`), not raw LitElement. Use `css`, `html`, `svg`, `unsafeCSS` from that package.
- **Widget docs**: [Turbine Widgets](https://docs.swimlane.com/widgets) — record widgets and report widgets; implementations are web components / custom elements.
- **Component source**: Full APIs (properties, events, slots) live in `projects/swimlane/lit-ui/src/components/<name>/`. For precise attribute names and event payloads, read the component `.component.ts` and `index.ts` files.

## CDN usage (solutions without build)

```js
import { SwimlaneElement, css, html } from '@swimlane/swimlane-element@2';  // or https://esm.sh/@swimlane/swimlane-element@2
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/lit-ui.js?v=1';
```

Ensure the `lit` specifier is available (e.g. via import map) so the lit-ui bundle resolves. Load SwimlaneElement (or Lit) before the lit-ui bundle.

## Attribute naming

- Lit properties are exposed as **kebab-case attributes**: `sectionCollapsed` → `section-collapsed`, `closeOnOutsideClick` → `close-on-outside-click`, `fontIcon` → `font-icon`.
- Booleans: presence = true; use `attribute="false"` or `close-on-outside-click="false"` where the component uses a custom converter for false.

## Events

Listen with `@event-name` (Lit) or `addEventListener('event-name', ...)`. Events bubble unless noted. Use `event.detail` for payloads.

| Element | Event | Detail |
|--------|---------|--------|
| swim-button | click | native |
| swim-input, swim-select | change | value / selection |
| swim-checkbox, swim-toggle | change, checked-change | checked state |
| swim-radio-group | change | selected value |
| swim-button-toggle-group | value-change | selected value |
| swim-tabs | select-tab, select | `{ tab }` |
| swim-section | toggle | `boolean` (collapsed) |
| swim-dialog | open, close | close: optional detail |
| swim-drawer | close | optional detail |
| swim-list | page-change, scroll | page number; scrollTop |
| swim-card | select, outline-click | selected; — |
| swim-tooltip | show, hide | — |
| swim-navbar | active-change | index |
| swim-slider | change | `{ value, percent }` |
| swim-split | resize | — |
| swim-calendar | change, day-key-enter | — |
| swim-date-time | change, value-change, blur, focus | — |

## Slots

Common patterns:

- **Default slot**: main content (e.g. `swim-card`, `swim-dialog`, `swim-drawer`, `swim-tab` body).
- **Named slots**: `slot="header"`, `slot="footer"`, `slot="hint"`, `slot="prefix"`, `slot="suffix"`, `slot="content"` (tooltip), `slot="label"` (tab), `slot="avatar"`, `slot="title"`, `slot="subtitle"`.

Use the component’s JSDoc `@slot` in `projects/swimlane/lit-ui/src/components/<name>/*.component.ts` for the exact list.

## Imperative APIs

### Drawer

- **Declarative**: `<swim-drawer open>` plus `show()` / `hide()` on the element reference.
- **Imperative**: `openDrawer(options)` from `@swimlane/lit-ui` (or the drawer controller). Options: `direction`, `size`, `zIndex`, `closeOnOutsideClick`, `isRoot`, `parentContainer`, `content` (HTMLElement | DocumentFragment | string), `cssClass`. Returns `{ close(), drawer }`. Listen to the drawer’s `close` event for cleanup.

```js
import { openDrawer } from '@swimlane/lit-ui/drawer';  // or from the CDN bundle if it exports it
const { close, drawer } = openDrawer({ direction: 'left', size: 80, content: fragmentOrElement });
// later: close();
```

When using the CDN bundle, the drawer may be created with `document.createElement('swim-drawer')`, set properties, append content, append to body, then call `drawer.show()` and on `close` remove from DOM. See `projects/swimlane/lit-ui/src/components/drawer/drawer-controller.ts`.

## Component list (quick reference)

| Tag | Purpose |
|-----|--------|
| swim-button | Buttons: variant, size, disabled, state (active/in-progress/success/fail), promise |
| swim-button-group | Group of buttons; orientation, variant |
| swim-button-toggle | Single toggle button |
| swim-button-toggle-group | Toggle group; single selection, value-change |
| swim-input | Text/number/textarea; label, hint, validation, appearance, prefix/suffix slots |
| swim-select | Single/multi select; options prop or swim-option children; filter |
| swim-checkbox | Checkbox; indeterminate; change, checked-change |
| swim-radio | Single option |
| swim-radio-group | Radios; change with value |
| swim-toggle | Toggle switch; change |
| swim-slider | Slider; single or range; change { value, percent } |
| swim-tabs | Tab container; vertical; appearance |
| swim-tab | Tab panel; label slot; active |
| swim-section | Collapsible section; section-title, section-collapsed, section-collapsible, header slot |
| swim-card | Card; orientation, status, selectable, selected, outline-text |
| swim-card-header, swim-card-body, swim-card-footer, swim-card-avatar, swim-card-placeholder | Card structure |
| swim-dialog | Modal; dialog-title, format (regular/medium/large), visible, show-backdrop, close-button |
| swim-large-format-dialog-content, swim-large-format-dialog-footer | Large/medium dialog layout slots |
| swim-drawer | Slide panel; direction (left/right/bottom), size, open, closeOnOutsideClick, isRoot; show()/hide() |
| swim-tooltip | Tooltip/popover; content, placement, alignment, type, show-event |
| swim-icon | Icons; font-icon, font-set (e.g. "lit"); alt for a11y |
| swim-navbar | Navbar; swim-navbar-item children; active-change |
| swim-list | List/table; columns, headerLabels, dataSource, column-layout, height, default-row-status; page-change, scroll |
| swim-progress-spinner | Spinner; mode, appearance; in-progress-icon, complete-icon, fail-icon slots |
| swim-split | Resizable split; swim-split-area, swim-split-handle children; resize event |
| swim-calendar | Calendar; change, day-key-enter |
| swim-date-time | Date/time input + picker; change, value-change, blur, focus |

## Design and accessibility

- Use **lit-elements as-is**: no extra visual styling (colors, borders, shadows, typography) on `swim-*`; only layout (flex, grid, spacing).
- Use design tokens where needed (e.g. `--spacing-16`, `--radius-4` from the demo).
- Preserve semantics and ARIA; ensure labels, focus, and keyboard behavior. See the generate-swimlane-lit-solution skill for full a11y and leak-free rules.

## Relationship to generate-swimlane-lit-solution

This skill is the **single source** for the lit-ui component list, CDN/base usage, design rules, and API (see reference.md). When the task is to **generate a full solution file** (single `.js` in `projects/swimlane/lit-ui/demo/solutions`), apply the **generate-swimlane-lit-solution** skill for output location, create vs update, WCAG, and no memory leaks; it references use-lit-ui for components and design.

## Detailed API reference

For per-component properties, events, slots, and enums, see [reference.md](reference.md) and the source under `projects/swimlane/lit-ui/src/components/<name>/`.
