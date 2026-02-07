# Generate Lit Component from Angular Implementation

Generate a Lit web component in `@swimlane/lit-ui` that mirrors the design and behavior of an Angular component from `@swimlane/ngx-ui`. The output must match existing Lit patterns and design system parity.

## Input

- Use the Angular component the user has provided, has open, or @-mentioned. If the user typed a component name or path after this command (e.g. `/generate-lit-from-angular checkbox`), use that as the target.
- Include the component class file (`.component.ts`), template (`.html`), and styles (`.scss`) when converting.

## Output Location and Structure

- All new files go under `projects/swimlane/lit-ui/src/components/<name>/`.
- Generate:
  - `<name>.component.ts` – main Lit class
  - `<name>.styles.ts` – component styles (Lit `css` template)
  - `index.ts` – re-exports for the component and any enums/interfaces
  - Optional: `*.enum.ts`, `*.interface.ts` when the Angular component defines enums or shared types
- Update `projects/swimlane/lit-ui/src/index.ts` to export the new component (add `export * from './components/<name>';`).

## Reference Implementations (Quality Bar)

Follow these existing Lit components for structure, patterns, and style:

- **Button** (simpler): `projects/swimlane/lit-ui/src/components/button/` – props, state, promise handling, styles
- **Input** (form control): `projects/swimlane/lit-ui/src/components/input/` – form-associated, validation, slots, ElementInternals
- **Select** (complex): `projects/swimlane/lit-ui/src/components/select/` – options, dropdown, filter, form association

Read their `.component.ts`, `.styles.ts`, and `index.ts` to match style and API documentation.

## Angular → Lit Mapping

Apply these mappings consistently:

| Angular | Lit |
|---------|-----|
| `@Input()` | `@property()` with correct `type`, `reflect: true` where needed, `attribute` for kebab-case |
| `@Output() x = new EventEmitter<T>()` | In handlers: `this.dispatchEvent(new CustomEvent('x', { detail: value, bubbles: true }))` and document with JSDoc `@fires x` |
| `<ng-content>` / `<ng-content select="...">` | `<slot></slot>` / `<slot name="..."></slot>` |
| `@ContentChild` / `@ViewChild` | `@query('selector')` for DOM refs; use slots for content projection |
| Template (`.html`) | `render()` returning `html` template literal |
| Styles (`.scss`) | Separate `*.styles.ts` with `css` tagged template; compose `baseStyles` and component styles in `static styles = [baseStyles, componentStyles]`. Use **BEM** for class names (see CSS section below). |
| Host classes (e.g. `[class.in-progress]`) | `:host([state='in-progress'])` in styles and/or reflected attributes on the host |
| `ngOnInit` / `ngOnChanges` | `connectedCallback()`, `updated()`, `firstUpdated()` as appropriate |
| Angular coercion (`@angular/cdk/coercion`, etc.) | Use `projects/swimlane/lit-ui/src/utils/coerce.ts`: `coerceBooleanProperty`, `coerceNumberProperty` |
| Enums (e.g. in `button-state.enum.ts`) | Keep as `*.enum.ts` in the component folder and export from `index.ts` |

## CSS: Colors and Variables

- **Do not copy hex or raw color values** from the Angular styles. Always use **CSS variables** from the ngx-ui design system. These are defined in `projects/swimlane/lit-ui/src/styles/base.ts` (and tokens) and mirror ngx-ui (e.g. `var(--blue-500)`, `var(--grey-600)`, `var(--red-500)`, `var(--radius-4)`, `var(--font-size-m)`). Refer to ngx-ui’s SCSS variables/tokens to pick the correct variable names.
- Never hardcode `#...`, `rgb(...)`, or `rgba(...)` for design tokens; use `var(--...)` so theming and consistency are preserved.

## CSS: BEM Naming

- Use **BEM** (Block__element--modifier) for class names in the Lit component template and styles.
- **Block**: The component root (e.g. `swim-button` → class like `swim-button` or a short block name).
- **Element**: Descendant, double underscore: `block__element` (e.g. `swim-button__content`, `swim-button__icon`).
- **Modifier**: State/variant, double hyphen: `block__element--modifier` or `block--modifier` (e.g. `swim-button--primary`, `swim-button__icon--spinning`).
- Apply BEM classes in the `render()` template and style them in `*.styles.ts` so selectors are clear and predictable.

## Design System and Quality

- **Tokens and base**: Use design tokens and `baseStyles` from `projects/swimlane/lit-ui/src/styles/` (and `styles/base.ts`). Rely on CSS variables (see above); do not introduce new hardcoded colors or spacing that contradict ngx-ui.
- **Custom element name**: Map `ngx-<name>` to `swim-<name>` (e.g. `ngx-button` → `swim-button`). Use `@customElement('swim-<name>')`.
- **JSDoc**: Document public API with `@slot`, `@fires`, and `@csspart` where applicable.
- **Form controls**: If the Angular component is used in forms, implement `static formAssociated = true` and use `ElementInternals` for value and validation (see input and select).
- Follow **Accessibility (WCAG)** and **Performance** sections below.

## Accessibility (WCAG)

Components must meet **WCAG 2.1** expectations so they are usable by keyboard, screen readers, and assistive tech. Apply these consistently:

- **Semantics**: Use the correct HTML element or ARIA role (e.g. `role="button"` only when not a `<button>`, `role="tablist"` / `role="tab"` / `role="tabpanel"`, `role="combobox"`, `role="listbox"`).
- **ARIA**: Preserve or add ARIA from the Angular implementation: `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-expanded`, `aria-selected`, `aria-controls`, `aria-disabled`, `aria-invalid`, `aria-required`, `aria-hidden` where they convey state or relationships. Keep `id` / `aria-controls` / `aria-labelledby` links valid and stable.
- **Keyboard**: Full keyboard operation: Tab into the component, Enter/Space to activate buttons and options, Arrow keys for lists/tabs/combos, Escape to close/cancel where appropriate. No keyboard traps; focus moves logically (e.g. roving tabindex or focus management in modals/dropdowns).
- **Focus**: Visible focus indicator (e.g. `:focus-visible` with outline) and no `outline: none` without a visible replacement. When opening overlays or changing active item, move focus as needed (e.g. to first focusable or selected item).
- **Labels**: All form controls and interactive regions have an accessible name (label, `aria-label`, or `aria-labelledby`). Use `<label>` + `id` or ElementInternals for form-associated controls.
- **State**: Expose state to assistive tech (e.g. `aria-selected`, `aria-checked`, `aria-expanded`, `aria-disabled`) and keep it in sync with the component.
- **Contrast**: Rely on design tokens for colors; ensure focus/active/disabled states meet contrast requirements (design system should already align with WCAG where applicable).

## Performance

Keep components efficient and avoid unnecessary work:

- **Property vs state**: Use `@property()` for public API and `@state()` for internal UI state. Avoid reflecting internal state as attributes unless needed for styling or accessibility.
- **Updates**: Only trigger `requestUpdate()` or change properties when data actually changes. In setters, guard with `if (this._x !== next)` before assigning and dispatching.
- **Slot/children**: Prefer `slot.assignedElements()` / `slot.assignedNodes()` in `firstUpdated()` or in response to `slotchange`; avoid querying on every `render()` or in tight loops.
- **Event listeners**: Attach in `firstUpdated()` or `connectedCallback()`; remove in `disconnectedCallback()` (e.g. `slotchange`, document click-outside, resize). Prefer one delegated listener over many per-item listeners where practical.
- **Heavy work**: Defer non-critical work (e.g. `requestAnimationFrame`, `setTimeout(..., 0)`) so initial render stays fast. Avoid synchronous layout thrash (e.g. reading then writing layout properties repeatedly).
- **Styles**: Keep `static styles` as shared `css` template literals; avoid defining new style objects per instance. Reuse `baseStyles` and component-level `css` blocks.
- **Re-renders**: Use `updated(changedProperties)` to run logic only when specific properties change; avoid side effects in `render()`.

## Steps

1. Identify the target Angular component (from context or user message).
2. Read its class, template, and styles; list all inputs, outputs, content projection, and behavior.
3. Create the component folder under `projects/swimlane/lit-ui/src/components/<name>/`.
4. Implement the Lit component, styles, and any enums/interfaces following the mapping, reference components, **Accessibility (WCAG)**, and **Performance** sections.
5. Add `index.ts` exports and update `projects/swimlane/lit-ui/src/index.ts`.
6. Add a `declare global { interface HTMLElementTagNameMap { 'swim-<name>': ComponentClass; } }` block for TypeScript.
7. **Add a demo for the new component** in `projects/swimlane/lit-ui/demo/index.html` and register it in `demo/src/main.ts`:
   - **Avoid any inline styles**, even in demo templates. Use demo CSS classes from `index.html` (e.g. `.section-divider`, `.page-title`, `.section-desc`, `.demo-row--column`, `.demo-label--after`, `.demo-pre`).
   - **Collapsible panels (swim-section)**: Match the Angular component demo structure. Where the Angular demo uses `<ngx-section sectionTitle="...">` to wrap a logical block (e.g. in `src/app/forms/buttons-page/`, `inputs-page/`, `selects-page/`, etc.), use **`<swim-section section-title="...">`** in the Lit demo so each subsection is a collapsible panel. Wrap the content inside each `<section class="section">` with `<swim-section section-title="...">` using the same title as the `<h2 class="section-title">`, so structure and behavior align with ngx-ui. Use `section-collapsible="false"` only when the Angular demo does (e.g. non-collapsible block). When using swim-section in demos, ensure `import '../../src/components/section';` (or the section component) is registered in `demo/src/main.ts` if not already loaded.
   - In **index.html**: Add a new block after the last component demo (after the final Usage section), separated by an `<hr class="section-divider">`:
     - Main heading: `<h1 id="component-name" class="page-title">Component Name</h1>`
     - Subtitle: `<p class="subtitle">Short description</p>`
     - One or more `<section class="section">` blocks with `<h2 class="section-title">...</h2>` showing:
       - Wrap each block’s content in `<swim-section section-title="...">...</swim-section>` (matching Angular’s ngx-section usage) unless the component being demoed is section itself.
       - Variants, sizes, or key props (use `.demo-grid`, `.demo-item`, `.demo-label`, `.demo-row`, `.demo-row--column` as in existing Button/Input/Select demos)
       - States (e.g. disabled, active) if applicable
       - Interactive example if useful
     - A **Usage** section at the end with a `<pre class="demo-pre"><code>...</code></pre>` showing:
       - `<script type="module">` importing the component (e.g. `import '@swimlane/lit-ui/<name>';` or the main package)
       - Minimal HTML example of the component (and `import '@swimlane/lit-ui/section';` when swim-section is used in the demo).
   - In **demo/src/main.ts**:
     - Add `import '../../src/components/<name>/<name>.component';` (and any sibling components, e.g. tab + tabs).
     - When the demo uses swim-section, add `import '../../src/components/section';` if not already present.
     - If the component needs runtime setup (e.g. options, event listeners), add DOMContentLoaded logic or a helper like `setupSelectDemos()` and call it from DOMContentLoaded.

Produce a complete, usable Lit component that mirrors the Angular implementation with best quality. Components must be **accessible (WCAG 2.1)** and **efficient in performance**; ensure the demo page showcases the component.
