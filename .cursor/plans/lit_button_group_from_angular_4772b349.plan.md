---
name: Lit Button Group from Angular
overview: "Add a Lit `swim-button-group` component under `@swimlane/lit-ui` that mirrors the Angular `ngx-button-group`: a presentational container for grouping buttons with orientation (horizontal/vertical), variant (contained/text), and style (default/primary), including shared colors and border-radius behavior. Optional swim-button CSS variable support enables unified group styling."
todos: []
isProject: false
---

# Generate Lit Button Group from Angular

## Source (Angular)

- **Component**: [projects/swimlane/ngx-ui/src/lib/components/button-group/button-group.component.ts](projects/swimlane/ngx-ui/src/lib/components/button-group/button-group.component.ts)
- **Template**: Single `<ng-content></ng-content>` (project children).
- **Styles**: [projects/swimlane/ngx-ui/src/lib/components/button-group/button-group.component.scss](projects/swimlane/ngx-ui/src/lib/components/button-group/button-group.component.scss)

**API summary**

- **Inputs**: `orientation` (horizontal | vertical), `variant` (contained | text), `buttonGroupStyle` (default | primary). No outputs.
- **Enums**: `ButtonGroupOrientation`, `ButtonGroupVariant`, `BottonGroupStyle` (typo in ngx-ui; use `ButtonGroupStyle` in Lit for correctness).
- **Behavior**: Container sets CSS variables (`--button-bg`, `--button-border`, `--button-text`, `--button-hover`) on the host; child buttons are styled via those variables and via first/middle/last border-radius and shared borders. Angular also has rules for `ngx-dropdown` inside the group; Lit can omit dropdown-specific rules until `swim-dropdown` exists.

**Design tokens in SCSS**

- Default: `--grey-600`, `--grey-700`, `white`.
- Primary: `--blue-400`, `--blue-500`, `white`.
- Spacing/sizing: `--spacing-*`, `--font-size-m`, `max-height: 30px` for horizontal contained.
- All via CSS variables (no hex); mirror in Lit with `var(--...)` from [projects/swimlane/lit-ui/src/styles/base.ts](projects/swimlane/lit-ui/src/styles/base.ts).

---

## Implementation Plan

### 1. Enums and component folder

- Create `projects/swimlane/lit-ui/src/components/button-group/`.
- Add enum files (or a single `button-group.enums.ts`):
  - `ButtonGroupOrientation`: `'horizontal' | 'vertical'`.
  - `ButtonGroupVariant`: `'contained' | 'text'`.
  - `ButtonGroupStyle`: `'default' | 'primary'` (fix ngx-ui typo `BottonGroupStyle`).
- Export enums from `index.ts`.

### 2. Lit component (`button-group.component.ts`)

- `@customElement('swim-button-group')`.
- **Properties** (reflect for styling): `orientation`, `variant`, `buttonGroupStyle` (map attribute `button-group-style` for kebab-case). Defaults: horizontal, contained, default.
- **Template**: `render()` returns a single default `<slot></slot>` (no wrapper needed unless we add a BEM block wrapper; Angular uses host as block, so `:host` + slot is enough).
- **Styles**: Compose `baseStyles` and `button-group.styles.ts`.
- **JSDoc**: `@slot` default for button content. No `@fires` (no events). Optional `@csspart` if a wrapper is added.
- **Lifecycle**: No `connectedCallback`/`updated` logic required for initial version.
- **Global types**: `declare global { interface HTMLElementTagNameMap { 'swim-button-group': SwimButtonGroup; } }`.

### 3. Styles (`button-group.styles.ts`)

- **BEM**: Block `swim-button-group`; modifiers via `:host([orientation='vertical'])`, `:host([variant='text'])`, `:host([button-group-style='primary'])` (or reflected `buttonGroupStyle` attribute).
- **Layout**: `:host { display: inline-flex; position: relative; }`. Vertical: `flex-direction: column; align-items: stretch;`.
- **CSS variables on `:host**` (so slotted children inherit):
  - Default: `--button-bg`, `--button-border`, `--button-text`, `--button-hover` (grey-600 / grey-700 / white).
  - When `button-group-style="primary"`: blue-400 / blue-500 / white.
- **Slotted content**:
  - Use `::slotted(swim-button)` (and optionally `::slotted(button)`) for:
    - Horizontal contained: first/last/middle border-radius removal, `border-left: 0` between items, `margin-right: 1px` (or equivalent gap), `max-height: 30px`.
  - Vertical contained: first/last/middle radius removal, `border-top: 0` between items, `margin-bottom: 1px`.
  - Text variant: divider between items (e.g. `border-right` / `border-bottom` with `var(--white)` or design token).
- Do **not** duplicate ngx-ui’s `ngx-dropdown`-specific rules; add a short comment that dropdown support can be added when `swim-dropdown` exists.
- Use only design tokens (e.g. `var(--grey-600)`, `var(--blue-400)`, `var(--radius-4)`, `var(--font-size-m)`, `var(--spacing-*)`).

### 4. swim-button variable support (required for visual parity)

- Slotted `swim-button` elements are DOM children of `swim-button-group`, so they inherit `--button-bg`, `--button-border`, `--button-text`, `--button-hover` from the group host. The **internal** `<button>` inside `swim-button`’s shadow DOM will only see these if `swim-button` uses them in its own styles.
- **Change in [projects/swimlane/lit-ui/src/components/button/button.styles.ts**](projects/swimlane/lit-ui/src/components/button/button.styles.ts): For the default and primary variants, use fallbacks to the group variables, e.g.:
  - `background: var(--button-bg, var(--grey-600));`
  - `border-color: var(--button-border, var(--grey-600));`
  - `color: var(--button-text, var(--white));`
  - Hover: `var(--button-hover, var(--grey-700))` and primary hover `var(--button-hover, var(--blue-500))`.
- This keeps standalone buttons unchanged and lets group override when used inside `swim-button-group`.

### 5. Exports and demo

- **index.ts**: Create [projects/swimlane/lit-ui/src/components/button-group/index.ts](projects/swimlane/lit-ui/src/components/button-group/index.ts) re-exporting the component and enums.
- **Package entry**: In [projects/swimlane/lit-ui/src/index.ts](projects/swimlane/lit-ui/src/index.ts), add `export * from './components/button-group';`.
- **Demo HTML**: In [projects/swimlane/lit-ui/demo/index.html](projects/swimlane/lit-ui/demo/index.html), after the Tabs Usage section (after the closing `</section>` of “Tabs Usage”, before `</div>`), add:
  - `<hr>` and main heading **Button Group** with subtitle.
  - **Basic Button Group**: Horizontal default (three `swim-button`), horizontal primary, vertical primary (mirror [button-group-page.component.html](src/app/components/button-group-page/button-group-page.component.html) “Basic Button Group”).
  - **Text variant**: `variant="text"` with several link-style buttons (native `<button>` or `swim-button variant="link"`).
  - **Usage** section: `<pre><code>` with `import '@swimlane/lit-ui/button-group';` (or `@swimlane/lit-ui`) and example `<swim-button-group>...</swim-button-group>` with nested `swim-button`s.
- **Demo script**: In [projects/swimlane/lit-ui/demo/src/main.ts](projects/swimlane/lit-ui/demo/src/main.ts), add `import '../../src/components/button-group/button-group.component';` (or from index). No extra DOMContentLoaded logic needed unless you add interactive group examples.

---

## Accessibility and performance

- **A11y**: The group is a layout container. Use `role="group"` on the host if desired; optional `aria-label` when a visible label isn’t present. Buttons remain focusable and keyboard-usable; no keyboard trap. No change to focus order.
- **Performance**: No slotchange or heavy logic; minimal re-renders. Use `@property` for public API and avoid reflecting internal state.

---

## File checklist


| Action | Path                                                                                                             |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| Create | `projects/swimlane/lit-ui/src/components/button-group/button-group-orientation.enum.ts` (or combined enums file) |
| Create | `projects/swimlane/lit-ui/src/components/button-group/button-group-variant.enum.ts`                              |
| Create | `projects/swimlane/lit-ui/src/components/button-group/button-group-style.enum.ts`                                |
| Create | `projects/swimlane/lit-ui/src/components/button-group/button-group.component.ts`                                 |
| Create | `projects/swimlane/lit-ui/src/components/button-group/button-group.styles.ts`                                    |
| Create | `projects/swimlane/lit-ui/src/components/button-group/index.ts`                                                  |
| Edit   | `projects/swimlane/lit-ui/src/index.ts` (add button-group export)                                                |
| Edit   | `projects/swimlane/lit-ui/src/components/button/button.styles.ts` (add --button-* variable fallbacks)            |
| Edit   | `projects/swimlane/lit-ui/demo/index.html` (Button Group section + Usage)                                        |
| Edit   | `projects/swimlane/lit-ui/demo/src/main.ts` (import button-group)                                                |


---

## Optional later

- When `swim-dropdown` exists: add styles for `::slotted(swim-dropdown)` (padding, position, first/middle/last radius and borders) to match ngx-ui’s “Dropdown Button Group” behavior.

