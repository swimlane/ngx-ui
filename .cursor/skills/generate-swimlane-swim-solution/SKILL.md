---
name: generate-swimlane-swim-solution
description: Generate Swimlane Lit Element Solution (CDN). Requires the use-swim-ui skill for component list, API, CDN, and design rules.
disable-model-invocation: true
---

# Generate Swimlane Lit Element Solution (CDN)

**Prerequisite:** When executing this skill, you **must** apply the **use-swim-ui** skill: use it for the component list, CDN/base usage, design rules, and for property/event/slot API (use-swim-ui’s reference.md or component source). Do not generate the solution without that context.

Generate a **standalone Lit-based solution** (custom widget or small app) that uses **SwimlaneElement** (wrapper for Lit) and **Swimlane custom Lit elements** (`swim-*`) from `@swimlane/swim-ui`, with all dependencies loaded from **CDN**. Use **lit-elements as-is** — do not add additional styling for the elements (no custom colors, borders, shadows, typography on components); **only layout styling** (flex, grid, spacing, positioning) is allowed. The solution must be professional, consistent, accessible (WCAG), and free of memory leaks. You may use **HTML**, **vanilla JavaScript**, and **Swimlane Lit custom elements** only.

**Base library**: All custom elements must extend **SwimlaneElement** and use its exports (`css`, `html`, `svg`, `unsafeCSS`) — not raw LitElement. For **component list**, **CDN/base usage**, and **design rules** (layout-only styling, tokens), apply the **use-swim-ui** skill; for full property/event/slot API see **use-swim-ui**’s [reference.md](../use-swim-ui/reference.md).

- **SwimlaneElement**: [npm @swimlane/swimlane-element](https://www.npmjs.com/package/@swimlane/swimlane-element) · [GitHub swimlane/swimlane-element](https://github.com/swimlane/swimlane-element)

Example (solution file):

```js
import { SwimlaneElement, css, html, svg, unsafeCSS } from '@swimlane/swimlane-element@2';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/swim-ui@gh-pages/swim-ui.js?v=1';
import { repeat } from 'lit-html@1/directives/repeat.js';
```

## Input

- **Goal/solution required**: Use the user's description of the solution (e.g. "dashboard widget", "form with validation", "alert configurator"). **If the user does not provide a goal or solution to build, ask them:** e.g. *"What solution or widget would you like to build? (e.g. dashboard widget, form with validation, alert configurator)"* — and **do not generate any output** until they provide one.
- **Updating an existing solution**: If the user refers to the **same solution again** or **points to a specific file** (e.g. an existing `.js` file in `projects/swimlane/swim-ui/demo/solutions`), **update that existing solution file** instead of creating a new one. Use the referenced file as the target to modify; preserve or refine behavior based on their new instructions.
- If the user @-mentions a file or provides a spec, use that as the target (or as the file to update when applicable).
- You may take **inspiration** from patterns at [Swimlane Platform Custom Widgets](https://swimlane.github.io/custom-widgets) (layout, UX, use cases), but **all UI elements must be Swimlane Lit custom elements** (`swim-*`) from `@swimlane/swim-ui` — do not copy non-Lit or framework-specific patterns from that site.

## Output Location and Structure

- **Output is a single `.js` file** (ES module) under **`projects/swimlane/swim-ui/demo/solutions`** with a **unique name**.
- **Naming**: Derive a unique filename from the solution purpose, e.g. `<slug>-solution.js` (e.g. `alert-configurator-solution.js`, `dashboard-widget-solution.js`). Ensure the name does not conflict with existing files in that directory.
- **When updating**: If the user pointed to an existing file or the same solution, write to **that existing file** (e.g. the same `projects/swimlane/swim-ui/demo/solutions/<name>.js`) instead of creating a new file.
- The `.js` file is a **self-contained ES module** that imports from CDN (Lit and swim-ui), **exports a default class** extending `SwimlaneElement` (the main solution component), composes the UI with `swim-*` components, and can be loaded by the demo app or a minimal HTML page (e.g. `<script type="module" src="...">`). No build step required.
- **Do not register** the solution class as a custom element (no `customElements.define(...)`) — custom element registration is handled by the Swimlane platform.

## CDN Imports

All runtime dependencies must be loaded from CDN (no npm install or bundling). Follow **use-swim-ui** for SwimlaneElement base and swim-ui bundle URL; ensure the `lit` specifier is available (e.g. import map). Solution-specific:

- In the solution file: import SwimlaneElement (or Lit) first, then the swim-ui bundle; use the same Lit instance.
- For directives (e.g. `repeat`): `import { repeat } from 'https://esm.sh/lit-html@1/directives/repeat.js'` (or `lit-html@1/directives/repeat.js` with import map).
- The solution class must **extend `SwimlaneElement`**, use `html`, `css`, `svg`, `unsafeCSS` from that package, and **export as default** — do not call `customElements.define()`.
- In the command output, list every import with exact CDN URLs or import-map specifiers so the solution is copy-paste runnable.

## Available Swimlane Lit Custom Elements

Use **only** the `swim-*` elements listed in the **use-swim-ui** skill (component list and usage). Do not invent or assume other tag names. For properties, events, slots, and imperative APIs (e.g. drawer), use **use-swim-ui** and its [reference.md](../use-swim-ui/reference.md); or read `projects/swimlane/swim-ui/src/components/<name>/` for the source of truth.

## Design and Consistency

Follow the **use-swim-ui** skill for design rules (lit-elements as-is, layout-only styling, CSS variables, no hardcoded colors on components). In addition for solutions: use semantic HTML (`main`, `section`, `header`, `form`, `label`, etc.) and keep the DOM clear and minimal for maintainability and accessibility.


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
- **Swimlane Lit custom elements**: All UI components must be `swim-*` from `@swimlane/swim-ui` as listed in the **use-swim-ui** skill.
- **Optional**: Custom Lit elements defined in the solution's own script (e.g. a wrapper or app shell) must **extend SwimlaneElement** and use `css`, `html`, `svg`, `unsafeCSS` from `@swimlane/swimlane-element@2`; use directives (e.g. `repeat`) from `lit-html@1/directives/` as needed. **The main solution class must be the default export** — do not call `customElements.define()` (registration is handled by the Swimlane platform). Follow the same accessibility and no–memory-leak rules.

## What Not to Do

- Do **not** use Angular, React, Vue, or any other framework. Only **SwimlaneElement** (for any custom element you write) and Swimlane's `swim-*` components. Do not use raw LitElement.
- Do **not** add additional styling to `swim-*` elements (e.g. custom colors, borders, shadows, typography). Use lit-elements as-is; only layout-related CSS (flex, grid, spacing, positioning) is allowed.
- Do **not** use components or patterns from other design systems or from the custom-widgets site that are not part of `@swimlane/swim-ui`. Use only the `swim-*` elements listed in this command.
- Do **not** assume a build step (e.g. bundling or npm install) unless the user explicitly asks for it. Default is runnable in the browser via CDN.
- Do **not** call `customElements.define()` to register the solution class — the Swimlane platform handles registration. Always **export default** the class instead.
- Do **not** leave event listeners or timers attached after the component or page context is gone.

## Steps

1. **Apply use-swim-ui**: Use the **use-swim-ui** skill (and its reference.md) for the component list, CDN usage, design rules, and per-component properties/events/slots. Do not rely on memory alone for `swim-*` API.
2. **Get the goal**: If the user did not provide a goal or solution to build, **ask** for one and stop. Do not generate output until they specify what to build.
3. **Determine create vs update**: If the user points to an existing file (e.g. a `.js` file in `projects/swimlane/swim-ui/demo/solutions`) or refers to the same solution they had before, **update** that file. Otherwise, **create** a new `.js` file with a unique name in `projects/swimlane/swim-ui/demo/solutions`.
4. **Clarify scope**: From the user's request, determine the solution's purpose (e.g. single widget, form, dashboard), which `swim-*` components are needed (from use-swim-ui), and whether to add any custom Lit element.
5. **Choose CDN URLs**: Decide exact CDN URLs (or import-map specifiers) for **SwimlaneElement** (`@swimlane/swimlane-element@2`), any lit-html directives (e.g. `lit-html@1/directives/repeat.js`), and for **swim-ui** use the bundle at `https://cdn.jsdelivr.net/gh/surya-pabbineedi/swim-ui@gh-pages/swim-ui.js?v=1`. Ensure `lit` is provided (e.g. via import map) so the bundle resolves. Document the import URLs in a short comment at the top of the file if helpful.
6. **Design structure**: Outline the structure (semantic sections, form groups, layout) and which Swimlane components go where (from **use-swim-ui** component list and reference.md). Reuse design tokens from the swim-ui demo for consistency (or inject minimal `:root` via the script if the solution is loaded standalone).
7. **Implement**: Write the single `.js` file at `projects/swimlane/swim-ui/demo/solutions/<unique-name>.js`. The file must: import **SwimlaneElement**, `css`, `html`, `svg`, `unsafeCSS` from `@swimlane/swimlane-element@2`; import any needed directives (e.g. `repeat` from `lit-html@1/directives/repeat.js`); import swim-ui from CDN; **export a default class** extending **SwimlaneElement** (do not call `customElements.define()` — registration is handled by the Swimlane platform); compose the UI with `swim-*` elements and wire events using **use-swim-ui** API (properties, events, slots); ensure every interactive element is accessible; and have any custom element clean up in `disconnectedCallback()`. When updating an existing file, apply the user's changes while keeping the same file path and unique name.
8. **Verify**: Check that (a) all imports resolve (correct CDN URLs or import maps), (b) custom elements extend **SwimlaneElement** and use its exports, (c) only listed `swim-*` elements are used (per use-swim-ui), (d) labels/ARIA/keyboard/focus are in place, and (e) there are no listener/timer leaks.

Deliver a **professional, consistent, accessible, leak-free** solution in **one `.js` file** under `projects/swimlane/swim-ui/demo/solutions` with a **unique name**, **exporting a default class** extending **SwimlaneElement** (from `@swimlane/swimlane-element@2`) — do **not** register it as a custom element (no `customElements.define()`), using **only** `swim-*` components from `@swimlane/swim-ui`, and loading **all dependencies from CDN**. When the user refers to the same solution or points to a file, **update** that file instead of creating a new one.
