# swim-ui Component API Reference

Use this when you need exact property names, attribute names, events, and slots for `swim-*` elements. Source of truth: `projects/swimlane/swim-ui/src/components/<name>/*.component.ts`.

**Custom events:** Dispatched **only on the `swim-*` element host** (`bubbles: false`, `composed: false`). Listen on that element—do not use `document` / parent delegation. Conventional event names are used because events do not leave the host. Full table: [SKILL.md](SKILL.md#per-event-reference) (Events section).

---

## swim-button

**Properties:** `variant` (default|primary|warning|danger|link|bordered), `size` (small|medium|large), `disabled`, `state` (active|in-progress|success|fail), `type` (button|submit|reset), `timeout` (number, ms), `promise` (Promise, attribute: false).  
**Slots:** default (button content).  
**Events:** `click` (native, when not disabled/in-progress).  
**Parts:** `button`.

**Icon-only:** put `<swim-icon font-icon="…">` in the default slot; set `aria-label` (or `title`) because there is no visible text. Slotted icons inherit `color` from `<swim-button>` (same `--swim-button-color` / variant defaults as labels).

```html
<script type="module">
  import '@swimlane/swim-ui/button';
  import '@swimlane/swim-ui/icon';
</script>

<swim-button variant="primary" aria-label="Save">
  <swim-icon font-icon="check"></swim-icon>
</swim-button>
```

**Host styling (CSS on `swim-button` or an ancestor):** `--swim-button-padding`, `--swim-button-background`, `--swim-button-hover-background`, `--swim-button-border-width`, `--swim-button-border-style`, `--swim-button-border-color`, `--swim-button-hover-border-color`, `--swim-button-color`, `--swim-button-hover-color`, `--swim-button-shadow`, `--swim-button-outline-color`, `--swim-button-hover-outline-color`. These override every `variant` (including hover).

```html
<swim-button
  variant="primary"
  style="
    --swim-button-padding: 0.65em 1.1em;
    --swim-button-background: linear-gradient(120deg, var(--purple-500), var(--blue-500));
    --swim-button-hover-background: linear-gradient(120deg, var(--purple-600), var(--blue-600));
    --swim-button-border-width: 2px;
    --swim-button-border-color: rgba(255, 255, 255, 0.35);
  "
>
  Gradient
</swim-button>
```

(Full row + more examples: `projects/swimlane/swim-ui/demo/public/sections/buttons.html`.)

---

## swim-button-group

**Properties:** `orientation`, `variant` (e.g. default, primary).  
**Slots:** default (swim-button or native button children).

---

## swim-button-toggle / swim-button-toggle-group

**Toggle:** `value`, `disabled`; slot: default (label). Event: `value-change` (detail: value).  
**Group:** slot: swim-button-toggle children. Event: `value-change` (detail: selected value).

---

## swim-input

**Properties:** `type` (text|number|textarea|…), `label`, `placeholder`, `hint`, `value`, `name`, `id`, `disabled`, `readonly`, `required`, `autofocus`, `autocomplete`, `appearance`, `size` (sm|md|lg), `marginless`, `withHint`, `password-toggle-enabled`, `min`, `max`, `minlength`, `maxlength`, `rows` (textarea), etc.  
**Slots:** `prefix`, `suffix`, `hint`.  
**Events:** `change`, `input`, `focus`, `blur`.  
**Parts:** `input`, `label`.

---

## swim-select

**Properties:** `label`, `placeholder`, `hint`, `empty-placeholder`, `filter-placeholder`, `options` (array of {name, value, …}), `value` (single or array if multiple), `name`, `id`, `disabled`, `required`, `appearance`, `size`, `marginless`, `withHint`, `filterable`, `multiple`.  
**Slots:** default (swim-option children), `hint`.  
**Events:** `change`, `dropdown-open`, `dropdown-close`.  
**Parts:** `select`, `dropdown`.  
**Options:** Use `<swim-option name="Label" value="val">` or `options` property.

---

## swim-checkbox

**Properties:** `checked`, `indeterminate`, `disabled`, `required`, `name`, `value`.  
**Slots:** default (label).  
**Events:** `change`, `checked-change`, `indeterminate-change`, `focus`, `blur`.  
**Parts:** `box`, `content`.

---

## swim-radio / swim-radio-group

**Radio:** `value`, `checked`, `disabled`, `name`; slot: default (label). Events: `change`, `focus`, `blur`.  
**Group:** slot: swim-radio children. Events: `change` (detail: selected value), `focus`, `blur`.

---

## swim-toggle

**Properties:** `checked`, `label`, `disabled`.  
**Slots:** default (label).  
**Events:** `change`, `focus`, `blur`.  
**Parts:** `track`, `thumb`, `text`.

---

## swim-slider

**Properties:** `value` (number or [min,max] for range), `min`, `max`, `step`, `disabled`, `ticks`, `filled`, etc.  
**Events:** `change` (detail: `{ value, percent }`).  
**Parts:** `track`, `fill`, `thumb`.

---

## swim-tabs / swim-tab

**Tabs:** `vertical`, `appearance` (legacy|light). Slot: swim-tab children. Events: `select-tab`, `select` (detail: `{ tab }`). Parts: `tablist`, `tab-content`.  
**Tab:** `id`, `tab-id`, `label`, `title` (alias), `active`, `disabled`. Slots: `label`, default (panel content).

---

## swim-section

**Properties:** `id`, `section-collapsed`, `section-collapsible`, `section-title`, `section-toggle-position` (left|right), `header-toggle`, `appearance`.  
**Slots:** `header`, default (body).  
**Events:** `toggle` (detail: boolean collapsed).

---

## swim-card

**Properties:** `disabled`, `orientation` (horizontal|vertical), `status` (success|error|disabled), `status-tooltip`, `selectable`, `selected`, `error`, `outline-text`, `appearance` (normal|flat).  
**Slots:** default (header, body, footer, etc.).  
**Events:** `select` (detail: selected), `outline-click`.  
**Parts:** `outline-text`.  
**Subcomponents:** swim-card-header, swim-card-body, swim-card-footer, swim-card-avatar, swim-card-placeholder.

---

## swim-card-header / swim-card-body / swim-card-footer

**Header slots:** `avatar`, `tag`, `title`, `subtitle`, default.  
**Body/Footer:** default slot.

---

## swim-dialog

**Properties:** `dialog-title`, `content`, `class`, `css-class`, `format` (regular|medium|large), `show-backdrop`, `close-button`, `close-on-blur`, `close-on-escape`, `visible`, `zIndex`.  
**Slots:** default (body).  
**Events:** `open`, `close` (detail optional).  
**Parts:** `content`, `close-button`.  
**Large format:** swim-large-format-dialog-content (slots: body, footer), swim-large-format-dialog-footer.

---

## swim-drawer

**Properties:** `css-class`, `direction` (left|right|bottom), `size` (%), `zIndex`, `close-on-outside-click`, `is-root`, `open`.  
**Methods:** `show()`, `hide()`.  
**Slots:** default (body).  
**Events:** `close`.  
**Parts:** `content`.  
**Imperative:** `openDrawer(options)` from drawer controller; options: `direction`, `size`, `zIndex`, `closeOnOutsideClick`, `isRoot`, `parentContainer`, `content` (HTMLElement|DocumentFragment|string), `cssClass`. Returns `{ close(), drawer }`.

---

## swim-tooltip

**Properties:** `content`, `placement`, `alignment`, `type` (tooltip|popover), `show-event` (all|focus|mouseover|click), `spacing`, `show-caret`, `disabled`.  
**Slots:** default (trigger), `content`.  
**Events:** `show`, `hide`.  
**Parts:** `trigger`, `panel`, `content`.

---

## swim-icon

**Properties:** `font-icon` (string or JSON array for stacked), `font-set` (e.g. "lit"), `alt`, `icon-class`.  
**Slots:** default (when no fontIcon).  
**Parts:** `icon`.

---

## swim-navbar / swim-navbar-item

**Navbar:** slot: swim-navbar-item children. Event: `active-change` (detail: index). Parts: `nav-items`, `bar-track`, `bar`.  
**Item:** slot: default (content). Event: `active-change` (detail: index).

---

## swim-list

**Properties:** `column-layout` (e.g. "1fr 1fr 1fr"), `dataSource` (array of records), `height`, `paginationConfig`, `default-row-status` (error|success|warning), `headerLabels`, `columns` (keys; use `$index` for row number).  
**Events:** `page-change` (detail: page number), `scroll` (detail: scrollTop).

---

## swim-progress-spinner

**Properties:** `mode` (indeterminate|determinate), `value`, `appearance`, `spinner-label`, etc.  
**Slots:** `in-progress-icon`, `complete-icon`, `fail-icon`.  
**Parts:** `container`, `label`.

---

## swim-split / swim-split-area / swim-split-handle

**Split:** slot: swim-split-area, swim-split-handle. (The parent `swim-split` does not currently dispatch a `resize` custom event; panes update when the handle fires `drag` / `dblclick`.)  
**Area:** `basis` (flex), slot: default.  
**Handle:** `drag`, `dragstart`, `dragend`, `dblclick` (bubble only, not composed).

---

## swim-calendar

**Events:** `change`, `day-key-enter`.

---

## swim-date-time

**Properties:** type, format, value, etc.  
**Events:** `change`, `value-change`, `input-change`, `date-time-selected`, `blur`, `focus`.  
**Parts:** `input`, `calendar-btn`.

---

## Large-format dialog

**swim-large-format-dialog-content:** slots: default (body), `footer`. Event: `close-or-cancel` (detail: boolean dirty).  
**swim-large-format-dialog-footer:** slot: default.

---

For enums (e.g. ButtonState, InputAppearance, DrawerDirection), see the corresponding `*.enum.ts` files in each component folder.
