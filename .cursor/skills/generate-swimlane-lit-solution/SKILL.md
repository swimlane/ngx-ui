---
name: generate-swimlane-lit-solution
description: Generate Swimlane Lit Element Solution (CDN)
disable-model-invocation: true
---

# Generate Swimlane Lit Element Solution (CDN)

Generate a **standalone Lit-based solution** (custom widget or small app) that uses **SwimlaneElement** (wrapper for Lit) and **Swimlane custom Lit elements** (`swim-*`) from `@swimlane/lit-ui`, with all dependencies loaded from **CDN**. The solution must be professional, consistent, accessible (WCAG), and free of memory leaks. You may use **HTML**, **vanilla JavaScript**, and **Swimlane Lit custom elements** only.

**Base library**: All custom elements must extend **SwimlaneElement** and use its exports (`css`, `html`, `svg`, `unsafeCSS`) — not raw LitElement.

- **SwimlaneElement** usage and API: [npm @swimlane/swimlane-element](https://www.npmjs.com/package/@swimlane/swimlane-element) · [GitHub swimlane/swimlane-element](https://github.com/swimlane/swimlane-element)

Example:

```js
import { SwimlaneElement, css, html, svg, unsafeCSS } from '@swimlane/swimlane-element@2';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/lit-ui.js?v=1';
import { repeat } from 'lit-html@1/directives/repeat.js';
```

## Input

- **Goal/solution required**: Use the user's description of the solution (e.g. "dashboard widget", "form with validation", "alert configurator"). **If the user does not provide a goal or solution to build, ask them:** e.g. *"What solution or widget would you like to build? (e.g. dashboard widget, form with validation, alert configurator)"* — and **do not generate any output** until they provide one.
- **Updating an existing solution**: If the user refers to the **same solution again** or **points to a specific file** (e.g. an existing `.js` file in `projects/swimlane/lit-ui/demo/solutions`), **update that existing solution file** instead of creating a new one. Use the referenced file as the target to modify; preserve or refine behavior based on their new instructions.
- If the user @-mentions a file or provides a spec, use that as the target (or as the file to update when applicable).
- You may take **inspiration** from patterns at [Swimlane Platform Custom Widgets](https://swimlane.github.io/custom-widgets) (layout, UX, use cases), but **all UI elements must be Swimlane Lit custom elements** (`swim-*`) from `@swimlane/lit-ui` — do not copy non-Lit or framework-specific patterns from that site.

## Output Location and Structure

- **Output is a single `.js` file** (ES module) under **`projects/swimlane/lit-ui/demo/solutions`** with a **unique name**.
- **Naming**: Derive a unique filename from the solution purpose, e.g. `<slug>-solution.js` (e.g. `alert-configurator-solution.js`, `dashboard-widget-solution.js`). Ensure the name does not conflict with existing files in that directory.
- **When updating**: If the user pointed to an existing file or the same solution, write to **that existing file** (e.g. the same `projects/swimlane/lit-ui/demo/solutions/<name>.js`) instead of creating a new file.
- The `.js` file is a **self-contained ES module** that imports from CDN (Lit and lit-ui), **exports a default class** extending `SwimlaneElement` (the main solution component), composes the UI with `swim-*` components, and can be loaded by the demo app or a minimal HTML page (e.g. `<script type="module" src="...">`). No build step required.
- **Do not register** the solution class as a custom element (no `customElements.define(...)`) — custom element registration is handled by the Swimlane platform.

## CDN Imports

All runtime dependencies must be loaded from CDN so the solution runs without npm install or bundling.

1. **SwimlaneElement (Lit wrapper)**  
   - **Always** use **SwimlaneElement** as the base for any custom element — do not use raw `LitElement`.
   - Import from CDN, e.g.:
     - `import { SwimlaneElement, css, html, svg, unsafeCSS } from 'https://esm.sh/@swimlane/swimlane-element@2'` (or `@swimlane/swimlane-element@2` if the demo uses import maps).
   - For directives (e.g. `repeat`): `import { repeat } from 'https://esm.sh/lit-html@1/directives/repeat.js'` (or `lit-html@1/directives/repeat.js` with import map).
   - In the solution file, use the same pattern as Swimlane custom widgets, e.g.:
     ```js
     import { SwimlaneElement, css, html, svg, unsafeCSS } from '@swimlane/swimlane-element@2';
     import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/lit-ui.js?v=1';
     import { repeat } from 'lit-html@1/directives/repeat.js';
     ```
   - The solution class must **extend `SwimlaneElement`** and use `html`, `css`, `svg`, `unsafeCSS` from that package. **Export it as the default export** — do not call `customElements.define()`.

2. **@swimlane/lit-ui (Swimlane Lit custom elements)**  
   - The **lit-ui** library is hosted as a single pre-built bundle at:
     - **`https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/lit-ui.js?v=1`**
   - Load this bundle so all used `swim-*` custom elements are registered. The bundle expects the **`lit`** specifier to be available (it imports `LitElement`, `html`, `css`, `nothing`, and `lit/decorators.js`, `lit/directives/*`). So:
     - **Option A (import map)**: Map `"lit"` (and `"lit/decorators.js"`, `"lit/directives/*"`) to your CDN (e.g. `https://esm.sh/lit@3`) or to SwimlaneElement if compatible. Then load the lit-ui bundle with `import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/lit-ui.js?v=1'`.
     - **Option B (order)**: In the solution file, import SwimlaneElement (or Lit) first, then import the lit-ui bundle. Ensure the same Lit instance is used (e.g. via import map that maps `lit` to the same source).
   - In the command output, **list every import** (SwimlaneElement, directives, and the lit-ui bundle URL) with the exact CDN URLs or import-map specifiers used so the solution is copy-paste runnable.

3. **Only import what you use**  
   - Import only the Swimlane components the solution actually uses (or the main entry that registers them). Do not add unused components.

## Available Swimlane Lit Custom Elements

Use **only** these `swim-*` custom elements from `@swimlane/lit-ui`. Do not invent or assume other tag names. The following is the full set of available elements.

| Element | Purpose |
|--------|---------|
| `swim-button` | Buttons (variants, sizes, promise/loading state) |
| `swim-button-group` | Group of buttons (orientation, style, variant) |
| `swim-button-toggle` | Single toggle button |
| `swim-button-toggle-group` | Group of toggle buttons (single selection) |
| `swim-input` | Text / number / textarea inputs (label, hint, validation, appearance) |
| `swim-select` | Single or multi select with filtering |
| `swim-checkbox` | Checkbox (optional indeterminate) |
| `swim-radio` | Single radio option |
| `swim-radio-group` | Group of radios (single selection) |
| `swim-toggle` | Toggle switch (on/off) |
| `swim-slider` | Slider (single or range, optional ticks) |
| `swim-tabs` | Tab container (horizontal or vertical) |
| `swim-tab` | Single tab panel (use inside `swim-tabs`) |
| `swim-section` | Collapsible section with header (toggle left/right) |
| `swim-section-header` | Custom header for section (slot) |
| `swim-card` | Card container (horizontal/vertical, selectable, status) |
| `swim-card-header` | Card header (title, subtitle, avatar slots) |
| `swim-card-body` | Card body content |
| `swim-card-footer` | Card footer |
| `swim-card-avatar` | Card avatar (image or initial) |
| `swim-card-placeholder` | Card placeholder (sizes: small, medium, large) |
| `swim-dialog` | Modal dialog (regular, medium, large; backdrop, close button) |
| `swim-large-format-dialog-content` | Large/medium dialog layout (header, body, footer slots) |
| `swim-large-format-dialog-footer` | Footer slot wrapper for large-format dialog |
| `swim-drawer` | Slide-in panel (use `openDrawer()` from lit-ui for imperative API) |
| `swim-tooltip` | Tooltip / popover (placement, show on focus/hover/click) |
| `swim-icon` | Icons (`font-icon`, `font-set`; ngx icon set) |
| `swim-navbar` | Navbar with optional indicator bar |
| `swim-navbar-item` | Navbar item (use inside `swim-navbar`) |
| `swim-list` | List with headers, rows, status (error/success/warning), optional pagination |
| `swim-progress-spinner` | Loading spinner (indeterminate/determinate, optional icon) |
| `swim-split` | Resizable split container (row/column) |
| `swim-split-area` | Pane in a split (flex basis) |
| `swim-split-handle` | Draggable handle between split areas |

Refer to the component APIs in `projects/swimlane/lit-ui/src/components/<name>/` (e.g. properties, events, slots) so your solution uses them correctly. Do not rely on patterns from other widget systems; use the actual `swim-*` API.

## Design and Consistency

- **CSS variables**: Reuse the same design tokens as the lit-ui demo where possible (e.g. `--blue-500`, `--grey-600`, `--radius-4`, `--font-size-m`, `--spacing-16`). You can copy a minimal `:root` block from `projects/swimlane/lit-ui/demo/index.html` so the solution looks consistent with Swimlane's design system.
- **No hardcoded colors**: Prefer `var(--...)` for colors, spacing, and typography.
- **Structure**: Use semantic HTML (`main`, `section`, `header`, `form`, `label`, etc.) and keep the DOM clear and minimal so the solution is maintainable and accessible.

## Accessibility (WCAG 2.1)

- **Semantics**: Use the correct elements and ARIA roles (e.g. `role="button"` only when not a `<button>`, `role="tablist"` / `role="tab"` / `role="tabpanel"` where appropriate). Prefer native elements when they fit (e.g. `<button>`, `<input>`, `<label>`).
- **ARIA**: Add `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-expanded`, `aria-selected`, `aria-controls`, `aria-disabled`, `aria-invalid`, `aria-required` where they convey state or relationships. Keep `id` / `aria-controls` / `aria-labelledby` links valid and stable.
- **Keyboard**: Full keyboard operation: Tab, Enter/Space to activate, Arrow keys where appropriate (e.g. lists, tabs), Escape to close overlays. No keyboard traps; focus moves logically (e.g. into/out of dialogs and drawers).
- **Focus**: Visible focus indicator (e.g. `:focus-visible` with outline). When opening overlays, move focus as needed (e.g. to first focusable element or close button).
- **Labels**: Every form control and interactive region has an accessible name (associated `<label>`, `aria-label`, or `aria-labelledby`).
- **State**: Expose state to assistive tech (`aria-selected`, `aria-checked`, `aria-expanded`, `aria-disabled`, etc.) and keep it in sync with the UI.
- **Contrast**: Use design tokens; ensure focus/active/disabled states meet contrast requirements.

## No Memory Leaks

If the solution includes **custom Lit elements** (in addition to `swim-*`), or attaches **listeners/timers** in script:

1. **Event listeners**
   - Remove any listener added to **document**, **window**, or other elements (e.g. slotted content). Use the same bound reference for `addEventListener` and `removeEventListener`.
   - Prefer storing the handler as a class field (e.g. `this._clickBound = () => this._onClick();`) so it can be removed in `disconnectedCallback()`.

2. **Timers**
   - Clear every `setTimeout`, `setInterval`, and recurring `requestAnimationFrame` in `disconnectedCallback()` (or when the relevant UI is torn down). Set stored timer ids to `undefined` after clearing.

3. **Cleanup order**
   - In `disconnectedCallback()`, remove listeners and clear timers **before** calling `super.disconnectedCallback()`.

4. **No long-lived refs**
   - Avoid holding references to DOM nodes or objects that are no longer in the document after the component is disconnected.

If the solution is **only** HTML and uses `swim-*` elements without adding its own listeners or timers, document that no extra cleanup is required beyond what the Swimlane components already do.

## Allowed Technologies

- **HTML5**: Structure, semantics, and minimal inline or linked CSS (prefer CSS variables).
- **Vanilla JavaScript (ES module)**: Logic, event handlers, and dynamic updates. Use `type="module"` and CDN imports.
- **Swimlane Lit custom elements**: All UI components must be `swim-*` from `@swimlane/lit-ui` as listed above.
- **Optional**: Custom Lit elements defined in the solution's own script (e.g. a wrapper or app shell) must **extend SwimlaneElement** and use `css`, `html`, `svg`, `unsafeCSS` from `@swimlane/swimlane-element@2`; use directives (e.g. `repeat`) from `lit-html@1/directives/` as needed. **The main solution class must be the default export** — do not call `customElements.define()` (registration is handled by the Swimlane platform). Follow the same accessibility and no–memory-leak rules.

## What Not to Do

- Do **not** use Angular, React, Vue, or any other framework. Only **SwimlaneElement** (for any custom element you write) and Swimlane's `swim-*` components. Do not use raw LitElement.
- Do **not** use components or patterns from other design systems or from the custom-widgets site that are not part of `@swimlane/lit-ui`. Use only the `swim-*` elements listed in this command.
- Do **not** assume a build step (e.g. bundling or npm install) unless the user explicitly asks for it. Default is runnable in the browser via CDN.
- Do **not** call `customElements.define()` to register the solution class — the Swimlane platform handles registration. Always **export default** the class instead.
- Do **not** leave event listeners or timers attached after the component or page context is gone.

## Steps

1. **Get the goal**: If the user did not provide a goal or solution to build, **ask** for one and stop. Do not generate output until they specify what to build.
2. **Determine create vs update**: If the user points to an existing file (e.g. a `.js` file in `projects/swimlane/lit-ui/demo/solutions`) or refers to the same solution they had before, **update** that file. Otherwise, **create** a new `.js` file with a unique name in `projects/swimlane/lit-ui/demo/solutions`.
3. **Clarify scope**: From the user's request, determine the solution's purpose (e.g. single widget, form, dashboard), which `swim-*` components are needed, and whether to add any custom Lit element.
4. **Choose CDN URLs**: Decide exact CDN URLs (or import-map specifiers) for **SwimlaneElement** (`@swimlane/swimlane-element@2`), any lit-html directives (e.g. `lit-html@1/directives/repeat.js`), and for **lit-ui** use the bundle at `https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/lit-ui.js?v=1`. Ensure `lit` is provided (e.g. via import map) so the bundle resolves. Document the import URLs in a short comment at the top of the file if helpful.
5. **Design structure**: Outline the structure (semantic sections, form groups, layout) and which Swimlane components go where. Reuse design tokens from the lit-ui demo for consistency (or inject minimal `:root` via the script if the solution is loaded standalone).
6. **Implement**: Write the single `.js` file at `projects/swimlane/lit-ui/demo/solutions/<unique-name>.js`. The file must: import **SwimlaneElement**, `css`, `html`, `svg`, `unsafeCSS` from `@swimlane/swimlane-element@2`; import any needed directives (e.g. `repeat` from `lit-html@1/directives/repeat.js`); import lit-ui from CDN; **export a default class** extending **SwimlaneElement** (do not call `customElements.define()` — registration is handled by the Swimlane platform); compose the UI with `swim-*` elements and wire events; ensure every interactive element is accessible; and have any custom element clean up in `disconnectedCallback()`. When updating an existing file, apply the user's changes while keeping the same file path and unique name.
7. **Verify**: Check that (a) all imports resolve (correct CDN URLs or import maps), (b) custom elements extend **SwimlaneElement** and use its exports, (c) only listed `swim-*` elements are used, (d) labels/ARIA/keyboard/focus are in place, and (e) there are no listener/timer leaks.

Deliver a **professional, consistent, accessible, leak-free** solution in **one `.js` file** under `projects/swimlane/lit-ui/demo/solutions` with a **unique name**, **exporting a default class** extending **SwimlaneElement** (from `@swimlane/swimlane-element@2`) — do **not** register it as a custom element (no `customElements.define()`), using **only** `swim-*` components from `@swimlane/lit-ui`, and loading **all dependencies from CDN**. When the user refers to the same solution or points to a file, **update** that file instead of creating a new one.
