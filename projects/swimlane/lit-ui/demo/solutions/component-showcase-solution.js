/**
 * Component Showcase Solution (CDN) – vertical-tabbed demo of every swim-* element.
 *
 * Usage:
 *   <script type="module" src="component-showcase-solution.js"></script>
 *   <component-showcase-solution></component-showcase-solution>
 *
 * Imports:
 *   - SwimlaneElement, css, html → https://esm.sh/@swimlane/swimlane-element@2
 *   - swim-* elements → per-component scripts (only what this showcase uses)
 *
 * No document/window listeners or recurring timers – no manual cleanup required.
 */
import { SwimlaneElement, css, html } from 'https://esm.sh/@swimlane/swimlane-element@2';

import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/button.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/button-group.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/button-toggle.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/input.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/select.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/date-time.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/checkbox.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/radio.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/toggle.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/slider.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/card.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/tabs.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/section.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/navbar.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/split.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/list.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/dialog.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/drawer.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/tooltip.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/icon.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/progress-spinner.js';

/* ================================================================== */
/*  Shared demo data                                                   */
/* ================================================================== */

const BUTTON_VARIANTS = [
  { name: 'default', label: 'Default' },
  { name: 'primary', label: 'Primary' },
  { name: 'warning', label: 'Warning' },
  { name: 'danger', label: 'Danger' },
  { name: 'link', label: 'Link' },
  { name: 'bordered', label: 'Bordered' }
];

const ATTACK_OPTIONS = [
  { name: 'Breach', value: 'breach' },
  { name: 'DDOS', value: 'ddos' },
  { name: 'Physical', value: 'physical' },
  { name: 'Malware', value: 'malware' },
  { name: 'Phishing', value: 'phishing' },
  { name: 'Ransomware', value: 'ransomware' }
];

const COLOR_OPTIONS = [
  { name: 'Red', value: 'red' },
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Purple', value: 'purple' },
  { name: 'Orange', value: 'orange' }
];

const ATTACK_DATE = new Date('10/10/2016 2:35 PM');
const MOON_LANDING = new Date('1969-07-20T20:17:43Z');
const TOHOKU_EARTHQUAKE = new Date('2011-03-11T05:46:24Z');

const LIST_DATA = [
  { type: 'Malware', date: '2025-01-10', origin: 'China', status: 'error' },
  { type: 'DDOS', date: '2025-01-15', origin: 'Russia', status: 'warning' },
  { type: 'Breach', date: '2025-02-01', origin: 'Unknown', status: 'success' },
  { type: 'Phishing', date: '2025-02-08', origin: 'Nigeria', status: 'error' },
  { type: 'Ransomware', date: '2025-03-12', origin: 'North Korea', status: 'error' },
  { type: 'SQL Injection', date: '2025-03-20', origin: 'Brazil', status: 'warning' },
  { type: 'XSS', date: '2025-04-05', origin: 'India', status: 'success' }
];

/* ================================================================== */
/*  Component API documentation data                                   */
/* ================================================================== */

const COMPONENT_API = {
  button: {
    tag: 'swim-button',
    summary:
      'Versatile button with multiple variants, sizes, and automatic promise-based state management for async operations.',
    properties: [
      {
        attr: 'variant',
        type: "'default' | 'primary' | 'warning' | 'danger' | 'link' | 'bordered'",
        default: "'default'",
        desc: 'Visual style variant'
      },
      { attr: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", desc: 'Button size' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables the button' },
      {
        attr: 'state',
        type: "'active' | 'in-progress' | 'success' | 'fail'",
        default: "'active'",
        desc: 'Visual state of the button'
      },
      { attr: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", desc: 'HTML button type' },
      {
        attr: '.timeout',
        type: 'number',
        default: '3000',
        desc: 'Duration (ms) to show success/fail before returning to active'
      },
      {
        attr: '.promise',
        type: 'Promise',
        default: 'undefined',
        desc: 'Bind a promise to auto-manage in-progress → success/fail states'
      }
    ],
    events: [
      {
        name: 'click',
        detail: 'MouseEvent',
        desc: 'Fired when the button is clicked (suppressed when disabled or in-progress)'
      }
    ]
  },

  buttonGroup: {
    tag: 'swim-button-group',
    summary:
      'Container that groups buttons with shared styling. Supports horizontal/vertical orientation and contained/text variants.',
    properties: [
      {
        attr: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        desc: 'Layout direction of the group'
      },
      { attr: 'variant', type: "'contained' | 'text'", default: "'contained'", desc: 'Button group visual variant' },
      {
        attr: 'button-group-style',
        type: "'default' | 'primary'",
        default: "'default'",
        desc: 'Color style applied to the group'
      }
    ],
    events: []
  },

  buttonToggle: {
    tag: 'swim-button-toggle-group',
    summary:
      'Toggle button group for exclusive single selection. Use swim-button-toggle children for individual options.',
    properties: [
      { attr: 'value', type: 'unknown', default: 'undefined', desc: 'Currently selected toggle value' },
      { attr: 'label', type: 'string', default: "''", desc: 'Accessible label for the group' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables all toggles in the group' }
    ],
    events: [{ name: 'value-change', detail: 'unknown', desc: 'Fired when the selected toggle changes' }],
    childTag: 'swim-button-toggle',
    childProperties: [
      { attr: 'value', type: 'unknown', default: 'false', desc: 'Value associated with this toggle' },
      { attr: 'checked', type: 'boolean', default: 'false', desc: 'Whether this toggle is currently selected' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables this individual toggle' }
    ]
  },

  input: {
    tag: 'swim-input',
    summary:
      'Full-featured text input supporting multiple types (text, password, email, number, tel, url, textarea), appearances, sizes, validation, and prefix/suffix slots.',
    properties: [
      {
        attr: 'type',
        type: "'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'textarea'",
        default: "'text'",
        desc: 'Input type'
      },
      { attr: 'label', type: 'string', default: "''", desc: 'Label text displayed above the input' },
      { attr: 'placeholder', type: 'string', default: "''", desc: 'Placeholder text' },
      { attr: 'hint', type: 'string', default: "''", desc: 'Hint text displayed below the input' },
      { attr: 'value', type: 'string', default: "''", desc: 'Current input value' },
      { attr: 'appearance', type: "'legacy' | 'fill'", default: "'legacy'", desc: 'Visual appearance style' },
      { attr: 'size', type: "'sm' | 'md' | 'lg'", default: "'sm'", desc: 'Input size' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables the input' },
      { attr: 'readonly', type: 'boolean', default: 'false', desc: 'Makes the input read-only' },
      { attr: 'required', type: 'boolean', default: 'false', desc: 'Marks the input as required' },
      {
        attr: 'password-toggle-enabled',
        type: 'boolean',
        default: 'false',
        desc: 'Shows a toggle to reveal/hide password text'
      },
      { attr: 'marginless', type: 'boolean', default: 'false', desc: 'Removes bottom margin spacing' },
      { attr: '.withHint', type: 'boolean', default: 'true', desc: 'Show or hide the hint area' },
      { attr: 'min', type: 'number', default: '—', desc: 'Minimum value (number type)' },
      { attr: 'max', type: 'number', default: '—', desc: 'Maximum value (number type)' },
      { attr: 'textarea-rows', type: 'number', default: '3', desc: 'Number of visible rows (textarea type)' }
    ],
    events: [
      { name: 'change', detail: 'string', desc: 'Fired when the value changes' },
      { name: 'input', detail: 'Event', desc: 'Fired on every keystroke' },
      { name: 'focus', detail: '', desc: 'Fired when the input gains focus' },
      { name: 'blur', detail: '', desc: 'Fired when the input loses focus' }
    ]
  },

  select: {
    tag: 'swim-select',
    summary:
      'Dropdown select with single/multi-select modes, type-to-filter, clear button support, and customizable appearance.',
    properties: [
      { attr: 'label', type: 'string', default: "''", desc: 'Label text' },
      { attr: 'placeholder', type: 'string', default: "'Select...'", desc: 'Placeholder when no value is selected' },
      { attr: 'hint', type: 'string', default: "''", desc: 'Hint text below the select' },
      { attr: '.options', type: 'Array<{name, value}>', default: '[]', desc: 'Array of selectable options' },
      { attr: 'multiple', type: 'boolean', default: 'false', desc: 'Enable multi-select mode' },
      { attr: 'filterable', type: 'boolean', default: 'true', desc: 'Enable type-to-filter in the dropdown' },
      { attr: '.allowClear', type: 'boolean', default: 'true', desc: 'Show a clear button when a value is selected' },
      { attr: 'appearance', type: "'legacy' | 'fill'", default: "'legacy'", desc: 'Visual appearance style' },
      { attr: 'size', type: "'sm' | 'md' | 'lg'", default: "'sm'", desc: 'Select size' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables the select' },
      { attr: 'required', type: 'boolean', default: 'false', desc: 'Marks the select as required' }
    ],
    events: [
      { name: 'change', detail: 'any | any[]', desc: 'Fired when the selection changes' },
      { name: 'open', detail: '', desc: 'Fired when the dropdown opens' },
      { name: 'close', detail: '', desc: 'Fired when the dropdown closes' }
    ]
  },

  dateTime: {
    tag: 'swim-date-time',
    summary:
      'Date, time, and datetime picker with formatting, timezone support, precision control, min/max date constraints, and autosize mode.',
    properties: [
      { attr: 'label', type: 'string', default: "''", desc: 'Label text' },
      { attr: 'hint', type: 'string', default: "''", desc: 'Hint text below the picker' },
      { attr: '.value', type: 'Date | string | null', default: 'null', desc: 'Selected date/time value' },
      {
        attr: 'input-type',
        type: "'date' | 'time' | 'datetime'",
        default: "'date'",
        desc: 'Type of picker to display'
      },
      { attr: 'format', type: 'string', default: 'auto', desc: 'Display format string (e.g. "M/Y", "MMM DD, YYYY")' },
      {
        attr: 'precision',
        type: "'year' | 'month' | 'hour' | 'minute'",
        default: 'auto',
        desc: 'Date/time precision level'
      },
      { attr: 'timezone', type: 'string', default: 'local', desc: 'IANA timezone (e.g. "utc", "Asia/Tokyo")' },
      {
        attr: 'display-mode',
        type: "'local' | 'timezone'",
        default: 'auto',
        desc: 'How the timezone label is displayed'
      },
      { attr: 'min-date', type: 'string | Date', default: '—', desc: 'Minimum selectable date' },
      { attr: 'max-date', type: 'string | Date', default: '—', desc: 'Maximum selectable date' },
      { attr: 'appearance', type: "'legacy' | 'fill'", default: "'legacy'", desc: 'Visual appearance style' },
      { attr: 'autosize', type: 'boolean', default: 'false', desc: 'Auto-sizes input width to fit content' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables the picker' },
      { attr: 'required', type: 'boolean', default: 'false', desc: 'Marks the picker as required' },
      { attr: 'marginless', type: 'boolean', default: 'false', desc: 'Removes bottom margin spacing' }
    ],
    events: [
      { name: 'change', detail: 'Date | null', desc: 'Fired when a valid date is selected or cleared' },
      { name: 'value-change', detail: 'any', desc: 'Fired on any value change (valid or invalid)' },
      { name: 'input-change', detail: 'string', desc: 'Fired when the user types in the text input' },
      { name: 'date-time-selected', detail: 'Date', desc: 'Fired when a date is picked from the calendar' },
      { name: 'blur', detail: '', desc: 'Fired when the component loses focus' },
      { name: 'focus', detail: '', desc: 'Fired when the component gains focus' }
    ]
  },

  checkbox: {
    tag: 'swim-checkbox',
    summary: 'Checkbox with checked, indeterminate, disabled, and round variants. Supports custom diameter sizing.',
    properties: [
      { attr: 'checked', type: 'boolean', default: 'false', desc: 'Whether the checkbox is checked' },
      { attr: 'indeterminate', type: 'boolean', default: 'false', desc: 'Shows the indeterminate (partial) state' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables the checkbox' },
      { attr: 'round', type: 'boolean', default: 'false', desc: 'Uses a circular shape instead of square' },
      { attr: 'diameter', type: 'string', default: "'18px'", desc: 'Size of the checkbox' },
      { attr: 'name', type: 'string', default: "''", desc: 'Form control name' }
    ],
    events: [
      { name: 'change', detail: '{ target: { checked } }', desc: 'Fired when the checked state changes' },
      { name: 'checked-change', detail: 'boolean', desc: 'Fired with the new checked boolean value' },
      { name: 'indeterminate-change', detail: 'boolean', desc: 'Fired when the indeterminate state changes' }
    ]
  },

  radio: {
    tag: 'swim-radio-group',
    summary:
      'Radio group for single-selection with arrow-key keyboard navigation. Use swim-radio children for individual options.',
    properties: [
      { attr: 'name', type: 'string', default: "''", desc: 'Form name shared by all radios in the group' },
      { attr: 'value', type: 'unknown', default: "''", desc: 'Currently selected radio value' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables all radios in the group' }
    ],
    events: [{ name: 'change', detail: 'string', desc: 'Fired when the selected radio changes' }],
    childTag: 'swim-radio',
    childProperties: [
      { attr: 'value', type: 'string', default: "''", desc: 'Value for this radio option' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables this individual radio' }
    ]
  },

  toggle: {
    tag: 'swim-toggle',
    summary: 'On/off switch toggle with optional check/x icons. Form-associated for native form submission.',
    properties: [
      {
        attr: 'label',
        type: 'string',
        default: "''",
        desc: 'Label text (attribute). Or use the default slot for label content.'
      },
      { attr: 'checked', type: 'boolean', default: 'false', desc: 'Whether the toggle is on' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables the toggle' },
      { attr: 'required', type: 'boolean', default: 'false', desc: 'Marks the toggle as required for form validation' },
      { attr: 'show-icons', type: 'boolean', default: 'true', desc: 'Shows check/x icons inside the track' },
      { attr: 'name', type: 'string', default: "''", desc: 'Form control name' }
    ],
    events: [{ name: 'change', detail: '{ target: { checked } }', desc: 'Fired when the toggle state changes' }]
  },

  slider: {
    tag: 'swim-slider',
    summary:
      'Range slider for single or dual-thumb value selection with optional filled track, tick marks, and vertical orientation.',
    properties: [
      {
        attr: 'value',
        type: 'string',
        default: "'0'",
        desc: 'Current value(s). Comma-separated for multiple thumbs (e.g. "25,75")'
      },
      { attr: 'min', type: 'number', default: '0', desc: 'Minimum value' },
      { attr: 'max', type: 'number', default: '100', desc: 'Maximum value' },
      { attr: 'step', type: 'number', default: '1', desc: 'Step increment' },
      { attr: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", desc: 'Slider direction' },
      { attr: 'filled', type: 'boolean', default: 'false', desc: 'Show a filled track between min and thumb(s)' },
      { attr: 'multiple', type: 'boolean', default: 'false', desc: 'Enable dual-thumb range mode' },
      { attr: 'show-ticks', type: 'boolean', default: 'false', desc: 'Show tick marks along the track' },
      { attr: 'tick-step', type: 'number', default: 'step', desc: 'Interval between tick marks' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables the slider' }
    ],
    events: [{ name: 'change', detail: '{ value, percent }', desc: 'Fired when the slider value changes' }]
  },

  card: {
    tag: 'swim-card',
    summary:
      'Card container with header, body, footer, avatar, selectable checkbox, status indicators, and flat/outline appearance.',
    properties: [
      {
        attr: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        desc: 'Card layout direction'
      },
      {
        attr: 'status',
        type: "'success' | 'error' | 'disabled'",
        default: '—',
        desc: 'Status color indicator on the accent bar'
      },
      { attr: 'selectable', type: 'boolean', default: 'false', desc: 'Shows a selection checkbox on the card' },
      { attr: 'selected', type: 'boolean', default: 'false', desc: 'Whether the card is currently selected' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables the card' },
      {
        attr: 'appearance',
        type: "'normal' | 'flat'",
        default: "'normal'",
        desc: 'Visual style (flat removes shadow)'
      },
      { attr: 'hide-accent', type: 'boolean', default: 'false', desc: 'Hides the top accent bar' },
      { attr: 'outline-text', type: 'string', default: "''", desc: 'Text shown in an outline label overlay' }
    ],
    events: [
      { name: 'select', detail: 'boolean', desc: 'Fired when the selection checkbox is toggled' },
      { name: 'outline-click', detail: '', desc: 'Fired when the outline text label is clicked' }
    ],
    childTag: 'swim-card-header / swim-card-body / swim-card-footer',
    childProperties: [
      {
        attr: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        desc: 'Header layout (swim-card-header)'
      },
      {
        attr: 'slot="avatar"',
        type: '—',
        default: '—',
        desc: 'Place swim-card-avatar in this slot (swim-card-header)'
      },
      { attr: 'slot="title"', type: '—', default: '—', desc: 'Title text slot (swim-card-header)' },
      { attr: 'slot="subtitle"', type: '—', default: '—', desc: 'Subtitle text slot (swim-card-header)' }
    ]
  },

  tabs: {
    tag: 'swim-tabs',
    summary:
      'Tabbed container organizing content into switchable panels. Supports horizontal/vertical layout and light/legacy appearance.',
    properties: [
      { attr: 'vertical', type: 'boolean', default: 'false', desc: 'Switches to vertical tab layout' },
      { attr: 'appearance', type: "'legacy' | 'light'", default: "'legacy'", desc: 'Visual appearance of the tab bar' }
    ],
    events: [{ name: 'select-tab', detail: '{ tab }', desc: 'Fired when the active tab changes' }],
    childTag: 'swim-tab',
    childProperties: [
      { attr: 'label', type: 'string', default: "''", desc: 'Tab label text displayed in the tab bar' },
      { attr: 'active', type: 'boolean', default: 'false', desc: 'Whether this tab is currently active' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables this tab' }
    ]
  },

  section: {
    tag: 'swim-section',
    summary: 'Collapsible section panel with configurable title, toggle position, and multiple appearance variants.',
    properties: [
      { attr: 'section-title', type: 'string', default: "''", desc: 'Section heading text' },
      { attr: 'section-collapsed', type: 'boolean', default: 'false', desc: 'Whether the section starts collapsed' },
      {
        attr: 'section-collapsible',
        type: 'boolean',
        default: 'true',
        desc: 'Whether the section can be collapsed/expanded'
      },
      {
        attr: 'appearance',
        type: "'legacy' | 'outline' | 'light' | 'minimal'",
        default: "'legacy'",
        desc: 'Visual appearance variant'
      },
      {
        attr: 'toggle-position',
        type: "'left' | 'right' | 'none'",
        default: "'left'",
        desc: 'Position of the expand/collapse icon'
      },
      { attr: 'header-toggle', type: 'boolean', default: 'false', desc: 'Makes the entire header clickable to toggle' },
      { attr: 'padding', type: 'string', default: "'1.8em'", desc: 'Content area padding' }
    ],
    events: [{ name: 'toggle', detail: 'boolean', desc: 'Fired when the section is expanded or collapsed' }]
  },

  navbar: {
    tag: 'swim-navbar',
    summary: 'Navigation bar with icon items and a sliding active indicator. Supports top/bottom bar placement.',
    properties: [
      {
        attr: 'bar-at-top',
        type: 'boolean',
        default: 'false',
        desc: 'Places the active indicator bar at the top instead of bottom'
      },
      { attr: 'active', type: 'number', default: '0', desc: 'Index of the currently active navigation item' }
    ],
    events: [{ name: 'active-change', detail: 'number', desc: 'Fired when the active item changes' }],
    childTag: 'swim-navbar-item',
    childProperties: [
      { attr: '(slot content)', type: '—', default: '—', desc: 'Place icon or content inside each navbar item' }
    ]
  },

  split: {
    tag: 'swim-split',
    summary: 'Resizable split-pane layout. Combine swim-split-area panels with swim-split-handle dividers as children.',
    properties: [
      {
        attr: 'direction',
        type: "'row' | 'column'",
        default: "'row'",
        desc: 'Split direction (row = horizontal, column = vertical)'
      }
    ],
    events: [],
    childTag: 'swim-split-area / swim-split-handle',
    childProperties: [
      {
        attr: 'area-basis',
        type: 'string',
        default: "'1 1 1e-9px'",
        desc: 'Flex shorthand (grow shrink basis) for each area'
      }
    ]
  },

  list: {
    tag: 'swim-list',
    summary:
      'Data list with column headers, configurable row status colors, flexible column layout, and scroll-based pagination.',
    properties: [
      { attr: '.dataSource', type: 'Array<Record>', default: '[]', desc: 'Array of data objects to render as rows' },
      { attr: '.headerLabels', type: 'string[]', default: '[]', desc: 'Array of header label strings' },
      { attr: '.columns', type: 'string[]', default: '[]', desc: 'Data keys to display (use "$index" for row number)' },
      { attr: 'column-layout', type: 'string', default: "''", desc: 'CSS grid-template-columns (e.g. "3fr 2fr 2fr")' },
      {
        attr: 'default-row-status',
        type: "'error' | 'warning' | 'success'",
        default: "'error'",
        desc: 'Default row status indicator color'
      },
      { attr: 'height', type: 'number', default: '—', desc: 'Fixed height in pixels for the list container' }
    ],
    events: [
      { name: 'page-change', detail: 'number', desc: 'Fired when scroll-based pagination page changes' },
      { name: 'scroll', detail: 'number', desc: 'Fired when the list body is scrolled (detail: scrollTop)' }
    ]
  },

  dialog: {
    tag: 'swim-dialog',
    summary: 'Modal dialog overlay with title, close button, backdrop, and regular/medium/large format sizes.',
    properties: [
      { attr: 'dialog-title', type: 'string', default: "''", desc: 'Title text displayed in the dialog header' },
      { attr: 'format', type: "'regular' | 'medium' | 'large'", default: "'regular'", desc: 'Dialog size format' },
      { attr: 'close-button', type: 'boolean', default: 'true', desc: 'Shows a close (X) button in the header' },
      {
        attr: 'visible',
        type: 'boolean',
        default: 'false',
        desc: 'Controls dialog visibility (or call show()/hide())'
      },
      { attr: 'z-index', type: 'number', default: '991', desc: 'CSS z-index stacking order' }
    ],
    events: [
      { name: 'open', detail: '', desc: 'Fired when the dialog is shown' },
      { name: 'close', detail: '', desc: 'Fired when the dialog is closed' }
    ]
  },

  drawer: {
    tag: 'swim-drawer',
    summary: 'Slide-in panel from left, right, or bottom edges with configurable size and outside-click-to-close.',
    properties: [
      {
        attr: 'direction',
        type: "'left' | 'right' | 'bottom'",
        default: "'left'",
        desc: 'Edge the drawer slides in from'
      },
      { attr: 'size', type: 'number', default: '80', desc: 'Width/height as a percentage of the viewport' },
      { attr: 'z-index', type: 'number', default: '998', desc: 'CSS z-index stacking order' },
      {
        attr: 'close-on-outside-click',
        type: 'boolean',
        default: 'true',
        desc: 'Close the drawer when clicking outside it'
      },
      { attr: 'open', type: 'boolean', default: 'false', desc: 'Controls visibility (or call show()/hide())' }
    ],
    events: [{ name: 'close', detail: '', desc: 'Fired when the drawer is closed' }]
  },

  tooltip: {
    tag: 'swim-tooltip',
    summary: 'Tooltip and popover wrapper with configurable placement, trigger events, caret, and alignment.',
    properties: [
      { attr: 'content', type: 'string', default: "''", desc: 'Tooltip text (or use slot="content" for rich HTML)' },
      {
        attr: 'type',
        type: "'tooltip' | 'popover'",
        default: "'popover'",
        desc: 'Display mode — tooltip (text) or popover (rich content)'
      },
      {
        attr: 'placement',
        type: "'top' | 'bottom' | 'left' | 'right'",
        default: "'top'",
        desc: 'Position relative to the trigger element'
      },
      {
        attr: 'show-event',
        type: "'all' | 'click' | 'focus' | 'mouseover'",
        default: "'all'",
        desc: 'Event(s) that trigger the tooltip'
      },
      { attr: 'show-caret', type: 'boolean', default: 'true', desc: 'Shows the directional caret/arrow' },
      { attr: 'disabled', type: 'boolean', default: 'false', desc: 'Disables the tooltip entirely' },
      { attr: 'spacing', type: 'number', default: '10', desc: 'Gap in pixels between trigger and tooltip' },
      { attr: 'css-class', type: 'string', default: "''", desc: 'Extra CSS class applied to the tooltip panel' }
    ],
    events: [
      { name: 'show', detail: '', desc: 'Fired when the tooltip becomes visible' },
      { name: 'hide', detail: '', desc: 'Fired when the tooltip is hidden' }
    ]
  },

  icon: {
    tag: 'swim-icon',
    summary:
      'Icon component rendering glyphs from the ngx icon font set. Specify the icon name via the font-icon attribute.',
    properties: [
      {
        attr: 'font-icon',
        type: 'string',
        default: "''",
        desc: 'Icon name from the ngx font (e.g. "search", "user", "check")'
      },
      { attr: 'alt', type: 'string', default: "''", desc: 'Alternative text for accessibility' },
      { attr: 'font-set', type: 'string', default: "'ngx'", desc: 'Icon font set to use' }
    ],
    events: []
  },

  progressSpinner: {
    tag: 'swim-progress-spinner',
    summary:
      'Circular progress indicator with indeterminate/determinate modes, optional center icons, custom colors, and configurable stroke width.',
    properties: [
      {
        attr: 'mode',
        type: "'indeterminate' | 'determinate'",
        default: "'indeterminate'",
        desc: 'Spinner animation mode'
      },
      { attr: 'value', type: 'number', default: '0', desc: 'Current progress value (determinate mode)' },
      { attr: 'total', type: 'number', default: '100', desc: 'Maximum progress value' },
      { attr: 'diameter', type: 'number', default: '100', desc: 'Spinner diameter in pixels' },
      { attr: 'stroke-width', type: 'number', default: '3', desc: 'Thickness of the progress arc' },
      { attr: 'color', type: 'string', default: 'var(--blue-500)', desc: 'Progress arc color' },
      { attr: 'appearance', type: "'default' | 'icon'", default: "'default'", desc: 'Show center icon when "icon"' },
      { attr: 'is-failure', type: 'boolean', default: 'false', desc: 'Shows the failure icon (icon appearance only)' }
    ],
    events: []
  }
};

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export default class ComponentShowcaseSolution extends SwimlaneElement {
  static get properties() {
    return {
      _promiseStatus: { type: String, state: true }
    };
  }

  constructor() {
    super();
    this._promiseStatus = '';
    // Cache promise-demo event handlers so they are not recreated on every render
    this._handlePromiseSuccess = this._createPromiseHandler('success', 1500);
    this._handlePromiseFail = this._createPromiseHandler('fail', 1500);
    this._handlePromiseSlow = this._createPromiseHandler('success', 5000);
  }

  /* ---------------------------------------------------------------- */
  /*  Styles                                                           */
  /* ---------------------------------------------------------------- */

  static get styles() {
    return css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      :host {
        display: block;
        height: 100vh;
        font-family: var(--font-family, 'Source Sans Pro', sans-serif);
        font-size: var(--font-size-m, 1rem);
        color: var(--grey-050, #ebedf2);
        --sp: var(--spacing-16, 16px);
        --r: var(--radius-4, 4px);
      }

      /* Vertical tabs take full height */
      swim-tabs {
        height: 100%;
      }

      /* Tab content panel */
      .panel {
        padding: var(--spacing-24, 24px) var(--spacing-32, 32px);
        max-width: 960px;
      }

      .panel-title {
        font-size: 1.5rem;
        font-weight: var(--font-weight-bold, 700);
        margin: 0 0 0.25rem;
        color: var(--blue-400, #1483ff);
      }

      .panel-desc {
        font-size: 0.9rem;
        color: var(--grey-300, #72819f);
        margin: 0 0 1.5rem;
        line-height: 1.5;
      }

      /* Demo layout helpers */
      .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        gap: var(--sp);
        padding: var(--sp) 0;
      }

      .demo-grid-wide {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--sp);
        padding: var(--sp) 0;
      }

      .demo-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .demo-label {
        font-size: var(--font-size-xxs, 0.625rem);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--grey-300, #72819f);
        font-weight: var(--font-weight-bold, 700);
      }

      .demo-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--sp);
        padding: var(--sp) 0;
      }

      .demo-col {
        display: flex;
        flex-direction: column;
        gap: var(--sp);
        padding: var(--sp) 0;
      }

      .demo-status {
        font-size: 0.85rem;
        color: var(--grey-300, #72819f);
        min-height: 1.4em;
        margin-top: 0.5rem;
      }

      /* Section spacing */
      .sg {
        margin-bottom: var(--spacing-24, 24px);
      }

      p.hint {
        color: var(--grey-300, #72819f);
        margin: 0 0 0.75rem;
        font-size: 0.9rem;
      }

      /* Card demo layout */
      .card-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--sp);
        padding: var(--sp) 0;
      }

      .card-row > swim-card,
      .card-row > swim-card-placeholder {
        flex: 1 1 280px;
      }

      /* Split demo container */
      .split-demo {
        height: 200px;
        border: 1px solid var(--grey-700, #313847);
        border-radius: var(--r);
        overflow: hidden;
      }

      .split-pane {
        padding: var(--sp);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--grey-300, #72819f);
        font-size: 0.9rem;
        height: 100%;
      }

      /* Slider vertical container */
      .slider-vertical-wrap {
        height: 200px;
        display: inline-flex;
        gap: var(--sp);
      }

      /* Navbar demo */
      .navbar-demo {
        background: var(--grey-800, #1b1e27);
        border-radius: var(--r);
        padding: 4px;
        display: inline-block;
      }

      /* List height limit */
      swim-list {
        display: block;
      }

      /* Icon grid */
      .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: var(--sp);
        padding: var(--sp) 0;
      }

      .icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        padding: 0.75rem;
        border-radius: var(--r);
        background: var(--grey-800, #1b1e27);
      }

      .icon-item swim-icon {
        font-size: 1.5rem;
      }

      .icon-name {
        font-size: 0.65rem;
        color: var(--grey-400, #5a6884);
        text-align: center;
        word-break: break-all;
      }

      /* Progress spinner row */
      .spinner-row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: var(--spacing-32, 32px);
        padding: var(--sp) 0;
      }

      .spinner-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      /* Drawer demo container for contained drawer */
      .drawer-contained-demo {
        position: relative;
        height: 300px;
        background: var(--grey-800, #1b1e27);
        border: 1px solid var(--grey-700, #313847);
        border-radius: var(--r);
        overflow: hidden;
      }

      .drawer-contained-demo .drawer-inner-content {
        padding: var(--sp);
        color: var(--grey-300, #72819f);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      /* Prefix/suffix demo styling */
      .input-addon {
        display: flex;
        align-items: center;
        color: var(--grey-300, #72819f);
        font-size: 0.85rem;
        padding: 0 0.25rem;
      }

      /* Scrollbar demo boxes */
      .scroll-box {
        height: 250px;
        width: 100%;
        max-width: 300px;
        border: 1px solid var(--grey-600, #454f63);
        border-radius: var(--r);
      }

      .scroll-box-content {
        min-height: 520px;
        display: flex;
        flex-direction: column;
        gap: var(--sp);
        padding: var(--sp);
      }

      /* swim-scroll: always-visible styled scrollbar */
      .scroll-default {
        overflow: auto;
      }
      .scroll-default::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .scroll-default::-webkit-scrollbar-thumb {
        background: var(--grey-500, #5a6884);
        border-radius: 3px;
      }
      .scroll-default::-webkit-scrollbar-track {
        background: transparent;
      }

      /* swim-scroll-overlay: show scrollbar on hover only */
      .scroll-overlay {
        overflow: hidden;
      }
      .scroll-overlay:hover {
        overflow: auto;
      }
      .scroll-overlay::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .scroll-overlay::-webkit-scrollbar-thumb {
        background: var(--grey-500, #5a6884);
        border-radius: 3px;
      }
      .scroll-overlay::-webkit-scrollbar-track {
        background: transparent;
      }

      /* swim-scroll-muted: muted opacity, brighter on hover */
      .scroll-muted {
        overflow: auto;
      }
      .scroll-muted::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .scroll-muted::-webkit-scrollbar-thumb {
        background: var(--grey-600, #454f63);
        border-radius: 3px;
      }
      .scroll-muted::-webkit-scrollbar-track {
        background: transparent;
      }
      .scroll-muted:hover::-webkit-scrollbar-thumb {
        background: var(--grey-500, #5a6884);
      }

      /* API Reference section */
      .api-ref {
        margin-top: 0.5rem;
      }

      .api-tag-name {
        display: inline-block;
        background: var(--grey-800, #1b1e27);
        padding: 0.25rem 0.6rem;
        border-radius: var(--r);
        color: var(--blue-300, #65b2ff);
        font-family: monospace;
        font-size: 0.85rem;
        margin-bottom: 0.75rem;
      }

      .api-heading {
        font-size: 0.75rem;
        font-weight: var(--font-weight-bold, 700);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--grey-200, #a8b2c7);
        margin: 1.25rem 0 0.5rem;
      }

      .api-table-wrap {
        overflow-x: auto;
        margin-bottom: 0.5rem;
      }

      .api-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.8rem;
        line-height: 1.5;
      }

      .api-table th {
        text-align: left;
        padding: 0.5rem 0.75rem;
        background: var(--grey-800, #1b1e27);
        color: var(--grey-200, #a8b2c7);
        font-weight: var(--font-weight-bold, 700);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        border-bottom: 1px solid var(--grey-700, #313847);
        white-space: nowrap;
      }

      .api-table td {
        padding: 0.4rem 0.75rem;
        border-bottom: 1px solid var(--grey-800, #1b1e27);
        color: var(--grey-300, #72819f);
        vertical-align: top;
      }

      .api-table td code {
        background: var(--grey-800, #1b1e27);
        padding: 0.1rem 0.3rem;
        border-radius: 3px;
        color: var(--blue-300, #65b2ff);
        font-size: 0.75rem;
      }

      .api-table tr:hover td {
        background: rgba(255, 255, 255, 0.02);
      }
    `;
  }

  /* ---------------------------------------------------------------- */
  /*  Main render                                                      */
  /* ---------------------------------------------------------------- */

  render() {
    return html`
      <swim-tabs vertical appearance="light">
        <swim-tab label="Button" active>${this._buttonDemo()}${this._apiRef(COMPONENT_API.button)}</swim-tab>
        <swim-tab label="Button Group">${this._buttonGroupDemo()}${this._apiRef(COMPONENT_API.buttonGroup)}</swim-tab>
        <swim-tab label="Button Toggle"
          >${this._buttonToggleDemo()}${this._apiRef(COMPONENT_API.buttonToggle)}</swim-tab
        >
        <swim-tab label="Input">${this._inputDemo()}${this._apiRef(COMPONENT_API.input)}</swim-tab>
        <swim-tab label="Select">${this._selectDemo()}${this._apiRef(COMPONENT_API.select)}</swim-tab>
        <swim-tab label="Date Time">${this._dateTimeDemo()}${this._apiRef(COMPONENT_API.dateTime)}</swim-tab>
        <swim-tab label="Checkbox">${this._checkboxDemo()}${this._apiRef(COMPONENT_API.checkbox)}</swim-tab>
        <swim-tab label="Radio">${this._radioDemo()}${this._apiRef(COMPONENT_API.radio)}</swim-tab>
        <swim-tab label="Toggle">${this._toggleDemo()}${this._apiRef(COMPONENT_API.toggle)}</swim-tab>
        <swim-tab label="Slider">${this._sliderDemo()}${this._apiRef(COMPONENT_API.slider)}</swim-tab>
        <swim-tab label="Card">${this._cardDemo()}${this._apiRef(COMPONENT_API.card)}</swim-tab>
        <swim-tab label="Tabs">${this._tabsDemo()}${this._apiRef(COMPONENT_API.tabs)}</swim-tab>
        <swim-tab label="Section">${this._sectionDemo()}${this._apiRef(COMPONENT_API.section)}</swim-tab>
        <swim-tab label="Navbar">${this._navbarDemo()}${this._apiRef(COMPONENT_API.navbar)}</swim-tab>
        <swim-tab label="Split">${this._splitDemo()}${this._apiRef(COMPONENT_API.split)}</swim-tab>
        <swim-tab label="List">${this._listDemo()}${this._apiRef(COMPONENT_API.list)}</swim-tab>
        <swim-tab label="Dialog">${this._dialogDemo()}${this._apiRef(COMPONENT_API.dialog)}</swim-tab>
        <swim-tab label="Drawer">${this._drawerDemo()}${this._apiRef(COMPONENT_API.drawer)}</swim-tab>
        <swim-tab label="Tooltip">${this._tooltipDemo()}${this._apiRef(COMPONENT_API.tooltip)}</swim-tab>
        <swim-tab label="Icon">${this._iconDemo()}${this._apiRef(COMPONENT_API.icon)}</swim-tab>
        <swim-tab label="Progress Spinner"
          >${this._spinnerDemo()}${this._apiRef(COMPONENT_API.progressSpinner)}</swim-tab
        >
        <swim-tab label="Scrollbars">${this._scrollbarsDemo()}</swim-tab>
      </swim-tabs>

      <!-- Overlay elements rendered at root for proper z-index stacking -->
      ${this._overlayElements()}
    `;
  }

  /* ================================================================ */
  /*  Per-component demos                                              */
  /* ================================================================ */

  /* ---- Button ---------------------------------------------------- */
  _buttonDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Button</h2>
        <p class="panel-desc">
          Button component with variants, sizes, and states. Supports promise-based automatic state management
          (in-progress → success/fail → active).
        </p>

        <section class="sg" aria-label="Button variants">
          <swim-section section-title="Variants">
            <div class="demo-grid">
              ${BUTTON_VARIANTS.map(
                v => html`
                  <div class="demo-item">
                    <span class="demo-label">${v.label}</span>
                    <swim-button variant=${v.name}>${v.label}</swim-button>
                  </div>
                `
              )}
            </div>
          </swim-section>
        </section>

        <section class="sg" aria-label="Button sizes">
          <swim-section section-title="Sizes">
            <div class="demo-row">
              <swim-button size="small" variant="primary">Small</swim-button>
              <swim-button size="medium" variant="primary">Medium</swim-button>
              <swim-button size="large" variant="primary">Large</swim-button>
            </div>
          </swim-section>
        </section>

        <section class="sg" aria-label="Button states">
          <swim-section section-title="States">
            <div class="demo-grid">
              <div class="demo-item">
                <span class="demo-label">Active</span>
                <swim-button variant="primary">Active</swim-button>
              </div>
              <div class="demo-item">
                <span class="demo-label">In Progress</span>
                <swim-button state="in-progress" variant="primary">Loading</swim-button>
              </div>
              <div class="demo-item">
                <span class="demo-label">Success</span>
                <swim-button state="success" variant="primary">Success</swim-button>
              </div>
              <div class="demo-item">
                <span class="demo-label">Fail</span>
                <swim-button state="fail" variant="primary">Failed</swim-button>
              </div>
              <div class="demo-item">
                <span class="demo-label">Disabled</span>
                <swim-button disabled variant="primary">Disabled</swim-button>
              </div>
            </div>
          </swim-section>
        </section>

        <section class="sg" aria-label="Promise handling">
          <swim-section section-title="Interactive – Promise Handling">
            <p class="hint">Click to trigger a simulated async operation with automatic state transitions.</p>
            <div class="demo-row">
              <swim-button variant="primary" aria-label="Simulate success" @click=${this._handlePromiseSuccess}
                >Click for Success</swim-button
              >
              <swim-button variant="danger" aria-label="Simulate failure" @click=${this._handlePromiseFail}
                >Click for Failure</swim-button
              >
              <swim-button
                variant="warning"
                .timeout=${5000}
                aria-label="Slow operation"
                @click=${this._handlePromiseSlow}
                >Slow (5 s)</swim-button
              >
            </div>
            <div class="demo-status" role="status" aria-live="polite">${this._promiseStatus}</div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Button Group ---------------------------------------------- */
  _buttonGroupDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Button Group</h2>
        <p class="panel-desc">
          Groups buttons together with shared styling. Supports horizontal/vertical orientation, contained/text
          variants, and default/primary color styles.
        </p>

        <section class="sg">
          <swim-section section-title="Horizontal – Contained (default)">
            <div class="demo-row">
              <swim-button-group>
                <swim-button>One</swim-button>
                <swim-button>Two</swim-button>
                <swim-button>Three</swim-button>
              </swim-button-group>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Horizontal – Primary">
            <div class="demo-row">
              <swim-button-group button-group-style="primary">
                <swim-button>One</swim-button>
                <swim-button>Two</swim-button>
                <swim-button>Three</swim-button>
              </swim-button-group>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Vertical">
            <div class="demo-row">
              <swim-button-group orientation="vertical">
                <swim-button>Top</swim-button>
                <swim-button>Middle</swim-button>
                <swim-button>Bottom</swim-button>
              </swim-button-group>
              <swim-button-group orientation="vertical" button-group-style="primary">
                <swim-button>Top</swim-button>
                <swim-button>Middle</swim-button>
                <swim-button>Bottom</swim-button>
              </swim-button-group>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Text Variant">
            <div class="demo-row">
              <swim-button-group variant="text">
                <swim-button>Edit</swim-button>
                <swim-button>Copy</swim-button>
                <swim-button>Delete</swim-button>
              </swim-button-group>
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Button Toggle --------------------------------------------- */
  _buttonToggleDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Button Toggle</h2>
        <p class="panel-desc">Single or grouped toggle buttons for exclusive selection.</p>

        <section class="sg">
          <swim-section section-title="Toggle Group">
            <p class="hint">Select one option from the group.</p>
            <div class="demo-col">
              <swim-button-toggle-group value="sequential" label="Process Type">
                <swim-button-toggle value="sequential">Sequential</swim-button-toggle>
                <swim-button-toggle value="parallel">Parallel</swim-button-toggle>
                <swim-button-toggle value="conditional">Conditional</swim-button-toggle>
              </swim-button-toggle-group>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Disabled Group">
            <div class="demo-col">
              <swim-button-toggle-group value="A" disabled>
                <swim-button-toggle value="A">Option A</swim-button-toggle>
                <swim-button-toggle value="B">Option B</swim-button-toggle>
              </swim-button-toggle-group>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Individual Toggles">
            <div class="demo-row">
              <swim-button-toggle value="bold">Bold</swim-button-toggle>
              <swim-button-toggle value="italic" checked>Italic</swim-button-toggle>
              <swim-button-toggle value="underline" disabled>Underline</swim-button-toggle>
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Input ----------------------------------------------------- */
  _inputDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Input</h2>
        <p class="panel-desc">
          Text, number, password, email, tel, url, textarea inputs with labels, hints, validation states, fill/legacy
          appearances, sizes, and prefix/suffix slots.
        </p>

        <section class="sg">
          <swim-section section-title="Types">
            <div class="demo-grid-wide">
              <swim-input label="Text" placeholder="Enter text"></swim-input>
              <swim-input
                type="password"
                label="Password"
                placeholder="Enter password"
                password-toggle-enabled
              ></swim-input>
              <swim-input type="email" label="Email" placeholder="user@example.com"></swim-input>
              <swim-input type="number" label="Age" placeholder="0" min="0" max="150"></swim-input>
              <swim-input type="tel" label="Phone" placeholder="+1 (555) 000-0000"></swim-input>
              <swim-input type="url" label="Website" placeholder="https://example.com"></swim-input>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Textarea">
            <swim-input
              type="textarea"
              label="Comments"
              placeholder="Enter your comments…"
              textarea-rows="4"
              hint="Maximum 500 characters"
            ></swim-input>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Prefix / Suffix Slots">
            <div class="demo-grid-wide">
              <swim-input label="Amount" placeholder="0.00">
                <span slot="prefix" class="input-addon">$</span>
              </swim-input>
              <swim-input label="Weight" placeholder="0">
                <span slot="suffix" class="input-addon">kg</span>
              </swim-input>
              <swim-input label="Search" placeholder="Type to search…">
                <swim-icon slot="prefix" font-icon="search" style="font-size:0.9rem;color:var(--grey-400)"></swim-icon>
              </swim-input>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Appearances">
            <div class="demo-grid-wide">
              <swim-input appearance="legacy" label="Legacy (default)" placeholder="Legacy"></swim-input>
              <swim-input appearance="fill" label="Fill" placeholder="Filled"></swim-input>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Sizes">
            <div class="demo-grid-wide">
              <swim-input size="sm" label="Small" placeholder="Small"></swim-input>
              <swim-input size="md" label="Medium" placeholder="Medium"></swim-input>
              <swim-input size="lg" label="Large" placeholder="Large"></swim-input>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="States">
            <div class="demo-grid-wide">
              <swim-input label="Required" required placeholder="Required field"></swim-input>
              <swim-input label="Disabled" disabled value="Cannot edit"></swim-input>
              <swim-input label="Readonly" readonly value="Read-only value"></swim-input>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="With Hint">
            <div class="demo-grid-wide">
              <swim-input label="Username" hint="Must be 3–20 characters" placeholder="Username"></swim-input>
              <swim-input label="No Hint" .withHint=${false} placeholder="Hint hidden"></swim-input>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Marginless">
            <div class="demo-grid-wide">
              <swim-input label="Normal margin" placeholder="Default spacing"></swim-input>
              <swim-input label="Marginless" marginless placeholder="No bottom margin"></swim-input>
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Select ---------------------------------------------------- */
  _selectDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Select</h2>
        <p class="panel-desc">Single and multi-select with filtering, groups, and clear support.</p>

        <section class="sg">
          <swim-section section-title="Single Select (no filter)">
            <div class="demo-grid-wide">
              <swim-select
                label="Attack Type"
                placeholder="Select…"
                .filterable=${false}
                .options=${ATTACK_OPTIONS}
              ></swim-select>
              <swim-select
                label="Required"
                required
                placeholder="Please select…"
                .filterable=${false}
                .options=${ATTACK_OPTIONS}
              ></swim-select>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Filterable">
            <p class="hint">Type to filter the options list. Filtering is enabled by default.</p>
            <swim-select
              label="Search Attacks"
              placeholder="Type to filter…"
              filterable
              .options=${ATTACK_OPTIONS}
            ></swim-select>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Multi Select">
            <swim-select
              label="Colors"
              placeholder="Pick colors…"
              multiple
              .options=${COLOR_OPTIONS}
              hint="Select one or more"
            ></swim-select>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Appearances & Sizes">
            <div class="demo-grid-wide">
              <swim-select
                appearance="fill"
                label="Fill Appearance"
                placeholder="Select…"
                .filterable=${false}
                .options=${ATTACK_OPTIONS}
              ></swim-select>
              <swim-select
                size="md"
                label="Medium Size"
                placeholder="Select…"
                .filterable=${false}
                .options=${ATTACK_OPTIONS}
              ></swim-select>
              <swim-select
                size="lg"
                label="Large Size"
                placeholder="Select…"
                .filterable=${false}
                .options=${ATTACK_OPTIONS}
              ></swim-select>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Allow Clear Disabled">
            <swim-select
              label="No Clear"
              placeholder="Select…"
              .filterable=${false}
              .allowClear=${false}
              .options=${ATTACK_OPTIONS}
            ></swim-select>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Disabled">
            <swim-select
              label="Disabled Select"
              disabled
              placeholder="Cannot interact"
              .options=${ATTACK_OPTIONS}
            ></swim-select>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Date Time ------------------------------------------------- */
  _dateTimeDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Date Time</h2>
        <p class="panel-desc">
          Date, time, and datetime picker with formatting, timezone support, precision, autosize, and form association.
        </p>

        <section class="sg">
          <swim-section section-title="Date Input">
            <div class="demo-col">
              <swim-date-time label="Date of attack" .value=${ATTACK_DATE}></swim-date-time>
              <swim-date-time label="Disabled" disabled .value=${ATTACK_DATE}></swim-date-time>
              <swim-date-time label="Custom Format" format="M/Y" .value=${ATTACK_DATE}></swim-date-time>
              <swim-date-time
                label="Min/Max Dates"
                min-date="2016-10-02"
                max-date="2016-10-22"
                hint="Select date between 10/2/2016 and 10/22/2016"
                .value=${ATTACK_DATE}
              ></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Date/Time Input">
            <swim-date-time label="Moon Landing" input-type="datetime" .value=${MOON_LANDING}></swim-date-time>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Timezones">
            <div class="demo-col">
              <swim-date-time
                label="Local Time"
                input-type="datetime"
                display-mode="timezone"
                .value=${TOHOKU_EARTHQUAKE}
              ></swim-date-time>
              <swim-date-time
                label="UTC"
                input-type="datetime"
                timezone="utc"
                .value=${TOHOKU_EARTHQUAKE}
              ></swim-date-time>
              <swim-date-time
                label="JST"
                input-type="datetime"
                timezone="Asia/Tokyo"
                .value=${TOHOKU_EARTHQUAKE}
              ></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Time Input">
            <div class="demo-col">
              <swim-date-time label="Time of attack" input-type="time" .value=${MOON_LANDING}></swim-date-time>
              <swim-date-time
                label="Time (Timezone)"
                input-type="time"
                display-mode="timezone"
                .value=${MOON_LANDING}
              ></swim-date-time>
              <swim-date-time
                label="Time (UTC)"
                input-type="time"
                timezone="utc"
                .value=${MOON_LANDING}
              ></swim-date-time>
              <swim-date-time
                label="Time (JST)"
                input-type="time"
                timezone="Asia/Tokyo"
                .value=${MOON_LANDING}
              ></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Precision">
            <div class="demo-col">
              <swim-date-time label="Year" precision="year" .value=${MOON_LANDING}></swim-date-time>
              <swim-date-time label="Month" precision="month" .value=${MOON_LANDING}></swim-date-time>
              <swim-date-time label="Hour" precision="hour" .value=${MOON_LANDING}></swim-date-time>
              <swim-date-time label="Minutes" precision="minute" .value=${MOON_LANDING}></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Autosize">
            <div class="demo-col">
              <swim-date-time
                autosize
                input-type="date"
                label="Year"
                precision="year"
                format="YYYY"
                .value=${ATTACK_DATE}
              ></swim-date-time>
              <swim-date-time
                autosize
                input-type="date"
                label="Month"
                precision="month"
                format="MMM YYYY"
                .value=${ATTACK_DATE}
              ></swim-date-time>
              <swim-date-time
                autosize
                appearance="fill"
                input-type="datetime"
                label="Hour"
                precision="hour"
                format="MMM DD, YYYY, hh:mm"
                .value=${ATTACK_DATE}
              ></swim-date-time>
              <swim-date-time
                autosize
                appearance="fill"
                input-type="datetime"
                label="Minutes"
                precision="minute"
                format="MMM DD, YYYY, hh:mm:ss"
                .value=${ATTACK_DATE}
              ></swim-date-time>
              <swim-date-time
                autosize
                appearance="fill"
                marginless
                input-type="datetime"
                label="Marginless"
                precision="minute"
                format="MMM DD, YYYY, hh:mm:ss"
                .value=${ATTACK_DATE}
              ></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Appearances">
            <div class="demo-grid-wide">
              <swim-date-time
                label="Legacy (default)"
                .value=${ATTACK_DATE}
                hint="A brief bit of help text"
              ></swim-date-time>
              <swim-date-time
                appearance="fill"
                label="Fill"
                .value=${ATTACK_DATE}
                hint="A brief bit of help text"
              ></swim-date-time>
            </div>
            <div class="demo-grid-wide">
              <swim-date-time
                required
                label="Required"
                .value=${ATTACK_DATE}
                hint="A brief bit of help text"
              ></swim-date-time>
              <swim-date-time
                appearance="fill"
                required
                label="Required Fill"
                .value=${ATTACK_DATE}
                hint="A brief bit of help text"
              ></swim-date-time>
            </div>
            <div class="demo-grid-wide">
              <swim-date-time
                input-type="time"
                label="Time"
                .value=${ATTACK_DATE}
                hint="A brief bit of help text"
              ></swim-date-time>
              <swim-date-time
                input-type="time"
                appearance="fill"
                label="Time Fill"
                .value=${ATTACK_DATE}
                hint="A brief bit of help text"
              ></swim-date-time>
            </div>
            <div class="demo-grid-wide">
              <swim-date-time
                input-type="datetime"
                label="Date/Time"
                .value=${ATTACK_DATE}
                hint="A brief bit of help text"
              ></swim-date-time>
              <swim-date-time
                input-type="datetime"
                appearance="fill"
                label="Date/Time Fill"
                .value=${ATTACK_DATE}
                hint="A brief bit of help text"
              ></swim-date-time>
            </div>
            <div class="demo-grid-wide">
              <swim-date-time
                disabled
                label="Disabled"
                .value=${ATTACK_DATE}
                hint="A brief bit of help text"
              ></swim-date-time>
              <swim-date-time
                disabled
                appearance="fill"
                label="Disabled Fill"
                .value=${ATTACK_DATE}
                hint="A brief bit of help text"
              ></swim-date-time>
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Checkbox -------------------------------------------------- */
  _checkboxDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Checkbox</h2>
        <p class="panel-desc">Checkboxes with checked, indeterminate, disabled, and round variants.</p>

        <section class="sg">
          <swim-section section-title="Basic">
            <div class="demo-col">
              <swim-checkbox>Unchecked</swim-checkbox>
              <swim-checkbox checked>Checked</swim-checkbox>
              <swim-checkbox indeterminate>Indeterminate</swim-checkbox>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Disabled">
            <div class="demo-col">
              <swim-checkbox disabled>Disabled</swim-checkbox>
              <swim-checkbox checked disabled>Checked + Disabled</swim-checkbox>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Round">
            <div class="demo-col">
              <swim-checkbox round>Round</swim-checkbox>
              <swim-checkbox round checked>Round Checked</swim-checkbox>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Custom Diameter">
            <div class="demo-row">
              <swim-checkbox diameter="14px" checked>14px</swim-checkbox>
              <swim-checkbox diameter="18px" checked>18px (default)</swim-checkbox>
              <swim-checkbox diameter="24px" checked>24px</swim-checkbox>
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Radio ----------------------------------------------------- */
  _radioDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Radio</h2>
        <p class="panel-desc">Radio buttons in a group for single-selection choices.</p>

        <section class="sg">
          <swim-section section-title="Radio Group">
            <swim-radio-group name="season" value="Summer">
              <swim-radio value="Spring">Spring</swim-radio>
              <swim-radio value="Summer">Summer</swim-radio>
              <swim-radio value="Fall">Fall</swim-radio>
              <swim-radio value="Winter">Winter</swim-radio>
            </swim-radio-group>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Individual Disabled">
            <swim-radio-group name="season-partial">
              <swim-radio value="Spring" disabled>Spring (disabled)</swim-radio>
              <swim-radio value="Summer">Summer</swim-radio>
              <swim-radio value="Fall" disabled>Fall (disabled)</swim-radio>
              <swim-radio value="Winter">Winter</swim-radio>
            </swim-radio-group>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Group Disabled">
            <swim-radio-group name="season-all-disabled" disabled value="Summer">
              <swim-radio value="Spring">Spring</swim-radio>
              <swim-radio value="Summer">Summer</swim-radio>
              <swim-radio value="Fall">Fall</swim-radio>
            </swim-radio-group>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Toggle ---------------------------------------------------- */
  _toggleDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Toggle</h2>
        <p class="panel-desc">On/off toggle switch with optional check/x icons.</p>

        <section class="sg">
          <swim-section section-title="Basic (label attribute)">
            <div class="demo-col">
              <swim-toggle label="Off"></swim-toggle>
              <swim-toggle label="On" checked></swim-toggle>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Slot Label">
            <div class="demo-col">
              <swim-toggle>Enable notifications</swim-toggle>
              <swim-toggle checked>Dark mode</swim-toggle>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Without Icons">
            <div class="demo-col">
              <swim-toggle label="No icons" show-icons="false"></swim-toggle>
              <swim-toggle label="No icons (on)" show-icons="false" checked></swim-toggle>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Disabled">
            <div class="demo-col">
              <swim-toggle label="Disabled" disabled></swim-toggle>
              <swim-toggle label="Disabled on" checked disabled></swim-toggle>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Required (for forms)">
            <div class="demo-col">
              <swim-toggle label="Accept terms" required></swim-toggle>
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Slider ---------------------------------------------------- */
  _sliderDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Slider</h2>
        <p class="panel-desc">Slider for single or range values with optional fill and tick marks.</p>

        <section class="sg">
          <swim-section section-title="Basic">
            <div class="demo-col">
              <swim-slider value="50" aria-label="Basic slider"></swim-slider>
              <swim-slider filled value="40" aria-label="Filled slider"></swim-slider>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Range (Multiple Thumbs)">
            <div class="demo-col">
              <swim-slider multiple filled value="25,75" aria-label="Range slider"></swim-slider>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="With Ticks">
            <div class="demo-col">
              <swim-slider show-ticks step="10" value="50" aria-label="Slider with ticks"></swim-slider>
              <swim-slider
                show-ticks
                filled
                multiple
                value="20,80"
                min="0"
                max="200"
                step="5"
                tick-step="20"
                aria-label="Range with ticks"
              ></swim-slider>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Vertical">
            <div class="slider-vertical-wrap">
              <swim-slider orientation="vertical" value="30" aria-label="Vertical slider"></swim-slider>
              <swim-slider orientation="vertical" filled value="70" aria-label="Vertical filled"></swim-slider>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Disabled">
            <swim-slider disabled value="60" aria-label="Disabled slider"></swim-slider>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Card ------------------------------------------------------ */
  _cardDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Card</h2>
        <p class="panel-desc">Cards with header, body, footer, avatar, selectable state, status, and placeholders.</p>

        <section class="sg">
          <swim-section section-title="Basic Cards">
            <div class="card-row">
              <swim-card>
                <swim-card-header>
                  <span slot="title">Basic Card</span>
                  <span slot="subtitle">Default orientation</span>
                </swim-card-header>
                <swim-card-body>Card body content goes here.</swim-card-body>
                <swim-card-footer>
                  <swim-button variant="primary" size="small">Action</swim-button>
                </swim-card-footer>
              </swim-card>

              <swim-card orientation="vertical">
                <swim-card-header orientation="vertical">
                  <swim-card-avatar slot="avatar">VT</swim-card-avatar>
                  <span slot="title">Vertical Card</span>
                  <span slot="subtitle">With avatar</span>
                </swim-card-header>
                <swim-card-body>Vertical layout content.</swim-card-body>
              </swim-card>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Status">
            <div class="card-row">
              <swim-card status="success">
                <swim-card-header>
                  <swim-card-avatar slot="avatar" status="success">OK</swim-card-avatar>
                  <span slot="title">Success</span>
                </swim-card-header>
                <swim-card-body>Status: success</swim-card-body>
              </swim-card>

              <swim-card status="error">
                <swim-card-header>
                  <swim-card-avatar slot="avatar" status="error">ER</swim-card-avatar>
                  <span slot="title">Error</span>
                </swim-card-header>
                <swim-card-body>Status: error</swim-card-body>
              </swim-card>

              <swim-card disabled>
                <swim-card-header>
                  <span slot="title">Disabled</span>
                </swim-card-header>
                <swim-card-body>Disabled card</swim-card-body>
              </swim-card>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Selectable">
            <div class="card-row">
              <swim-card selectable>
                <swim-card-header>
                  <span slot="title">Selectable</span>
                  <span slot="subtitle">Click checkbox</span>
                </swim-card-header>
                <swim-card-body>Toggle selection via checkbox.</swim-card-body>
              </swim-card>

              <swim-card selectable selected>
                <swim-card-header>
                  <span slot="title">Pre-selected</span>
                </swim-card-header>
                <swim-card-body>This card starts selected.</swim-card-body>
              </swim-card>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Flat Appearance & Accent">
            <div class="card-row">
              <swim-card appearance="flat">
                <swim-card-header>
                  <span slot="title">Flat Card</span>
                </swim-card-header>
                <swim-card-body>Flat appearance, no shadow.</swim-card-body>
              </swim-card>

              <swim-card hide-accent>
                <swim-card-header>
                  <span slot="title">No Accent</span>
                </swim-card-header>
                <swim-card-body>Accent bar hidden via hide-accent.</swim-card-body>
              </swim-card>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Outline Text">
            <div class="card-row">
              <swim-card outline-text="NEW" status="success">
                <swim-card-header>
                  <span slot="title">With Outline Text</span>
                </swim-card-header>
                <swim-card-body>Clickable outline label (outline-text).</swim-card-body>
              </swim-card>

              <swim-card outline-text="DRAFT">
                <swim-card-header>
                  <span slot="title">Draft Status</span>
                </swim-card-header>
                <swim-card-body>Outline text shows a subtle label.</swim-card-body>
              </swim-card>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Placeholders">
            <div class="card-row">
              <swim-card-placeholder size="small"></swim-card-placeholder>
              <swim-card-placeholder size="medium"></swim-card-placeholder>
              <swim-card-placeholder size="large"></swim-card-placeholder>
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Tabs ------------------------------------------------------ */
  _tabsDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Tabs</h2>
        <p class="panel-desc">Horizontal and vertical tabbed containers with light/legacy appearance.</p>

        <section class="sg">
          <swim-section section-title="Horizontal (default)">
            <swim-tabs>
              <swim-tab label="Overview" active>
                <div style="padding:1rem">Overview panel content.</div>
              </swim-tab>
              <swim-tab label="Details">
                <div style="padding:1rem">Details panel content.</div>
              </swim-tab>
              <swim-tab label="History">
                <div style="padding:1rem">History panel content.</div>
              </swim-tab>
              <swim-tab label="Disabled" disabled>
                <div style="padding:1rem">This tab is disabled.</div>
              </swim-tab>
            </swim-tabs>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Light Appearance">
            <swim-tabs appearance="light">
              <swim-tab label="Alpha" active>
                <div style="padding:1rem">Alpha content.</div>
              </swim-tab>
              <swim-tab label="Beta">
                <div style="padding:1rem">Beta content.</div>
              </swim-tab>
              <swim-tab label="Gamma">
                <div style="padding:1rem">Gamma content.</div>
              </swim-tab>
            </swim-tabs>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Vertical">
            <swim-tabs vertical>
              <swim-tab label="Tab A" active>
                <div style="padding:1rem">Vertical tab A content.</div>
              </swim-tab>
              <swim-tab label="Tab B">
                <div style="padding:1rem">Vertical tab B content.</div>
              </swim-tab>
              <swim-tab label="Tab C">
                <div style="padding:1rem">Vertical tab C content.</div>
              </swim-tab>
            </swim-tabs>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Section --------------------------------------------------- */
  _sectionDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Section</h2>
        <p class="panel-desc">Collapsible sections with title, toggle position, and appearance variants.</p>

        <section class="sg">
          <swim-section section-title="Default (Legacy)">
            <p>This section uses the default legacy appearance with left toggle.</p>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Outline Appearance" appearance="outline">
            <p>Outline appearance with a bordered container.</p>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Light Appearance" appearance="light">
            <p>Light appearance for subtle sections.</p>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Minimal Appearance" appearance="minimal">
            <p>Minimal appearance — just the content with minimal chrome.</p>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Toggle Right" toggle-position="right">
            <p>Toggle icon positioned on the right side.</p>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Initially Collapsed" section-collapsed>
            <p>This section starts collapsed. Click to expand.</p>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Not Collapsible" section-collapsible="false">
            <p>This section cannot be collapsed — no toggle icon.</p>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Header Toggle" header-toggle toggle-position="none">
            <swim-section-header slot="header">
              <span style="font-weight:700;font-size:1rem">Custom Header (click to toggle)</span>
            </swim-section-header>
            <p>Clicking anywhere on the header toggles this section.</p>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Navbar ----------------------------------------------------- */
  _navbarDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Navbar</h2>
        <p class="panel-desc">Navigation bar with icon items and an animated active indicator.</p>

        <section class="sg">
          <swim-section section-title="Basic (bar bottom)">
            <div class="navbar-demo">
              <swim-navbar>
                <swim-navbar-item><swim-icon font-icon="apps"></swim-icon></swim-navbar-item>
                <swim-navbar-item><swim-icon font-icon="chart-scatter"></swim-icon></swim-navbar-item>
                <swim-navbar-item><swim-icon font-icon="database"></swim-icon></swim-navbar-item>
                <swim-navbar-item><swim-icon font-icon="user"></swim-icon></swim-navbar-item>
              </swim-navbar>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Bar at Top">
            <div class="navbar-demo">
              <swim-navbar bar-at-top active="1">
                <swim-navbar-item><swim-icon font-icon="apps"></swim-icon></swim-navbar-item>
                <swim-navbar-item><swim-icon font-icon="chart-scatter"></swim-icon></swim-navbar-item>
                <swim-navbar-item><swim-icon font-icon="database"></swim-icon></swim-navbar-item>
              </swim-navbar>
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Split ----------------------------------------------------- */
  _splitDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Split</h2>
        <p class="panel-desc">Resizable split panes — horizontal (row) and vertical (column).</p>

        <section class="sg">
          <swim-section section-title="Horizontal">
            <div class="split-demo">
              <swim-split direction="row">
                <swim-split-area area-basis="1 1 50%">
                  <div class="split-pane">Left pane</div>
                </swim-split-area>
                <swim-split-handle></swim-split-handle>
                <swim-split-area area-basis="1 1 50%">
                  <div class="split-pane">Right pane</div>
                </swim-split-area>
              </swim-split>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Vertical">
            <div class="split-demo">
              <swim-split direction="column">
                <swim-split-area area-basis="1 1 50%">
                  <div class="split-pane">Top pane</div>
                </swim-split-area>
                <swim-split-handle></swim-split-handle>
                <swim-split-area area-basis="1 1 50%">
                  <div class="split-pane">Bottom pane</div>
                </swim-split-area>
              </swim-split>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Three Panes">
            <div class="split-demo">
              <swim-split direction="row">
                <swim-split-area area-basis="1 1 30%">
                  <div class="split-pane">Sidebar</div>
                </swim-split-area>
                <swim-split-handle></swim-split-handle>
                <swim-split-area area-basis="1 1 40%">
                  <div class="split-pane">Main</div>
                </swim-split-area>
                <swim-split-handle></swim-split-handle>
                <swim-split-area area-basis="1 1 30%">
                  <div class="split-pane">Inspector</div>
                </swim-split-area>
              </swim-split>
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- List ------------------------------------------------------ */
  _listDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">List</h2>
        <p class="panel-desc">Data list with column headers, row statuses, and scroll-based pagination.</p>

        <section class="sg">
          <swim-section section-title="Basic List">
            <swim-list
              .dataSource=${LIST_DATA}
              .headerLabels=${['Attack Type', 'Date', 'Origin']}
              .columns=${['type', 'date', 'origin']}
              column-layout="3fr 2fr 2fr"
              default-row-status="error"
              height="280"
            ></swim-list>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="With Row Index">
            <swim-list
              .dataSource=${LIST_DATA}
              .headerLabels=${['#', 'Attack Type', 'Date', 'Origin']}
              .columns=${['$index', 'type', 'date', 'origin']}
              column-layout="0.5fr 3fr 2fr 2fr"
              default-row-status="warning"
              height="280"
            ></swim-list>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Success Row Status">
            <swim-list
              .dataSource=${LIST_DATA}
              .headerLabels=${['Attack Type', 'Date', 'Origin']}
              .columns=${['type', 'date', 'origin']}
              column-layout="3fr 2fr 2fr"
              default-row-status="success"
              height="280"
            ></swim-list>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Dialog ----------------------------------------------------- */
  _dialogDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Dialog</h2>
        <p class="panel-desc">Modal dialogs — regular, medium, and large format with header, body, and footer.</p>

        <section class="sg">
          <swim-section section-title="Regular Dialog">
            <swim-button variant="primary" @click=${() => this._showOverlay('demoDialog')}>Open Dialog</swim-button>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Medium Format Dialog">
            <swim-button variant="primary" @click=${() => this._showOverlay('demoMediumDialog')}
              >Open Medium Dialog</swim-button
            >
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Large Format Dialog">
            <swim-button variant="primary" @click=${() => this._showOverlay('demoLargeDialog')}
              >Open Large Dialog</swim-button
            >
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Drawer ----------------------------------------------------- */
  _drawerDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Drawer</h2>
        <p class="panel-desc">Slide-in panels from left, right, or bottom.</p>

        <section class="sg">
          <swim-section section-title="Left Drawer">
            <swim-button variant="primary" @click=${() => this._showOverlay('demoDrawerLeft')}
              >Open Left Drawer</swim-button
            >
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Right Drawer">
            <swim-button variant="primary" @click=${() => this._showOverlay('demoDrawerRight')}
              >Open Right Drawer</swim-button
            >
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Bottom Drawer">
            <swim-button variant="primary" @click=${() => this._showOverlay('demoDrawerBottom')}
              >Open Bottom Drawer</swim-button
            >
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Tooltip ---------------------------------------------------- */
  _tooltipDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Tooltip</h2>
        <p class="panel-desc">Tooltips and popovers with configurable placement, trigger events, and alignment.</p>

        <section class="sg">
          <swim-section section-title="Tooltip Type – Placement">
            <div class="demo-row">
              <swim-tooltip content="Top tooltip" type="tooltip" placement="top">
                <swim-button>Top</swim-button>
              </swim-tooltip>
              <swim-tooltip content="Bottom tooltip" type="tooltip" placement="bottom">
                <swim-button>Bottom</swim-button>
              </swim-tooltip>
              <swim-tooltip content="Left tooltip" type="tooltip" placement="left">
                <swim-button>Left</swim-button>
              </swim-tooltip>
              <swim-tooltip content="Right tooltip" type="tooltip" placement="right">
                <swim-button>Right</swim-button>
              </swim-tooltip>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Show Events">
            <p class="hint">
              Control when the tooltip appears: hover+focus (all), click-only, focus-only, or mouseover-only.
            </p>
            <div class="demo-row">
              <swim-tooltip content="All events (default)" type="tooltip" placement="top" show-event="all">
                <swim-button>All</swim-button>
              </swim-tooltip>
              <swim-tooltip content="Click only" type="tooltip" placement="top" show-event="click">
                <swim-button>Click</swim-button>
              </swim-tooltip>
              <swim-tooltip content="Focus only" type="tooltip" placement="top" show-event="focus">
                <swim-button>Focus</swim-button>
              </swim-tooltip>
              <swim-tooltip content="Mouseover only" type="tooltip" placement="top" show-event="mouseover">
                <swim-button>Mouseover</swim-button>
              </swim-tooltip>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Popover Type">
            <div class="demo-row">
              <swim-tooltip type="popover" placement="bottom">
                <swim-button variant="primary">Click for Popover</swim-button>
                <div slot="content" style="padding:0.75rem">
                  <p style="margin:0 0 0.5rem;font-weight:700">Popover Title</p>
                  <p style="margin:0;color:var(--grey-300)">Rich content inside a popover panel.</p>
                </div>
              </swim-tooltip>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Without Caret">
            <swim-tooltip content="No caret" type="tooltip" placement="top" show-caret="false">
              <swim-button variant="bordered">No Caret</swim-button>
            </swim-tooltip>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Disabled Tooltip">
            <swim-tooltip content="You won't see me" type="tooltip" placement="top" disabled>
              <swim-button variant="bordered">Disabled Tooltip</swim-button>
            </swim-tooltip>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Icon ------------------------------------------------------ */
  _iconDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Icon</h2>
        <p class="panel-desc">Icons from the ngx icon font set.</p>

        <section class="sg">
          <swim-section section-title="Common Icons">
            <div class="icon-grid">
              ${[
                'plus',
                'x',
                'check',
                'search',
                'user',
                'lock',
                'gear',
                'trash',
                'pencil',
                'copy',
                'download',
                'upload',
                'arrow-left',
                'arrow-right',
                'arrow-up',
                'arrow-down',
                'apps',
                'bell',
                'database',
                'chart-scatter',
                'eye',
                'eye-disabled',
                'info-circle',
                'warning-circle'
              ].map(
                name => html`
                  <div class="icon-item">
                    <swim-icon font-icon=${name} alt=${name}></swim-icon>
                    <span class="icon-name">${name}</span>
                  </div>
                `
              )}
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Progress Spinner ------------------------------------------ */
  _spinnerDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Progress Spinner</h2>
        <p class="panel-desc">Indeterminate and determinate spinners with optional icon states.</p>

        <section class="sg">
          <swim-section section-title="Indeterminate">
            <div class="spinner-row">
              <div class="spinner-item">
                <swim-progress-spinner mode="indeterminate" diameter="60" aria-label="Loading"></swim-progress-spinner>
                <span class="demo-label">Default</span>
              </div>
              <div class="spinner-item">
                <swim-progress-spinner
                  mode="indeterminate"
                  diameter="40"
                  aria-label="Loading small"
                ></swim-progress-spinner>
                <span class="demo-label">Small</span>
              </div>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Determinate">
            <div class="spinner-row">
              <div class="spinner-item">
                <swim-progress-spinner
                  mode="determinate"
                  value="25"
                  total="100"
                  diameter="80"
                  aria-label="25 percent"
                ></swim-progress-spinner>
                <span class="demo-label">25%</span>
              </div>
              <div class="spinner-item">
                <swim-progress-spinner
                  mode="determinate"
                  value="50"
                  total="100"
                  diameter="80"
                  aria-label="50 percent"
                ></swim-progress-spinner>
                <span class="demo-label">50%</span>
              </div>
              <div class="spinner-item">
                <swim-progress-spinner
                  mode="determinate"
                  value="75"
                  total="100"
                  diameter="80"
                  aria-label="75 percent"
                ></swim-progress-spinner>
                <span class="demo-label">75%</span>
              </div>
              <div class="spinner-item">
                <swim-progress-spinner
                  mode="determinate"
                  value="100"
                  total="100"
                  diameter="80"
                  aria-label="Complete"
                ></swim-progress-spinner>
                <span class="demo-label">100%</span>
              </div>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Icon Appearance">
            <div class="spinner-row">
              <div class="spinner-item">
                <swim-progress-spinner
                  mode="determinate"
                  value="50"
                  total="100"
                  diameter="80"
                  appearance="icon"
                  aria-label="50 percent with icon"
                ></swim-progress-spinner>
                <span class="demo-label">In Progress</span>
              </div>
              <div class="spinner-item">
                <swim-progress-spinner
                  mode="determinate"
                  value="100"
                  total="100"
                  diameter="80"
                  appearance="icon"
                  aria-label="Complete with icon"
                ></swim-progress-spinner>
                <span class="demo-label">Complete</span>
              </div>
              <div class="spinner-item">
                <swim-progress-spinner
                  mode="determinate"
                  value="100"
                  total="100"
                  diameter="80"
                  appearance="icon"
                  is-failure
                  aria-label="Failed with icon"
                ></swim-progress-spinner>
                <span class="demo-label">Failure</span>
              </div>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Custom Colors & Stroke">
            <div class="spinner-row">
              <div class="spinner-item">
                <swim-progress-spinner
                  mode="determinate"
                  value="65"
                  total="100"
                  diameter="80"
                  stroke-width="5"
                  color="var(--green-500)"
                  aria-label="Green spinner"
                ></swim-progress-spinner>
                <span class="demo-label">Green / thick</span>
              </div>
              <div class="spinner-item">
                <swim-progress-spinner
                  mode="determinate"
                  value="40"
                  total="100"
                  diameter="80"
                  stroke-width="2"
                  color="var(--orange-500)"
                  aria-label="Orange spinner"
                ></swim-progress-spinner>
                <span class="demo-label">Orange / thin</span>
              </div>
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ---- Scrollbars ------------------------------------------------ */
  _scrollbarsDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Scrollbars</h2>
        <p class="panel-desc">
          Utility classes for styled scrollbars matching ngx-ui. Apply to scrollable elements (with overflow) or to body
          for global scrollbars.
        </p>

        <section class="sg">
          <swim-section section-title="swim-scroll">
            <p class="hint">
              The <code>.swim-scroll</code> class sets <code>overflow: auto</code> and styles the scrollbar. Apply it to
              an element (e.g. a fixed-height container) or to <code>body</code> for global scrollbars.
            </p>
            <div class="scroll-box scroll-default">
              <div class="scroll-box-content">
                <swim-icon font-icon="graph" style="font-size:300px"></swim-icon>
              </div>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="swim-scroll-overlay">
            <p class="hint">The <code>.swim-scroll-overlay</code> class only shows scrollbars on hover.</p>
            <div class="scroll-box scroll-overlay">
              <div class="scroll-box-content">
                <swim-icon font-icon="graph" style="font-size:300px"></swim-icon>
              </div>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="swim-scroll-muted">
            <p class="hint">
              The <code>.swim-scroll-muted</code> class shows muted scrollbars that increase opacity on hover.
            </p>
            <div class="scroll-box scroll-muted">
              <div class="scroll-box-content">
                <swim-icon font-icon="graph" style="font-size:300px"></swim-icon>
              </div>
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ================================================================ */
  /*  API Reference helper                                             */
  /* ================================================================ */

  _apiRef(data) {
    if (!data) return '';
    const { tag, summary, properties, events, childTag, childProperties } = data;
    return html`
      <div class="panel" style="padding-top:0">
        <section class="sg">
          <swim-section section-title="API Reference" section-collapsed>
            <div class="api-ref">
              ${summary ? html`<p class="panel-desc" style="margin-bottom:0.75rem">${summary}</p>` : ''}
              <div><span class="api-tag-name">&lt;${tag}&gt;</span></div>

              ${properties?.length
                ? html`
                    <h4 class="api-heading">Properties</h4>
                    <div class="api-table-wrap">
                      <table class="api-table">
                        <thead>
                          <tr>
                            <th>Attribute</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${properties.map(
                            p => html`
                              <tr>
                                <td><code>${p.attr}</code></td>
                                <td><code>${p.type}</code></td>
                                <td><code>${p.default}</code></td>
                                <td>${p.desc}</td>
                              </tr>
                            `
                          )}
                        </tbody>
                      </table>
                    </div>
                  `
                : ''}
              ${events?.length
                ? html`
                    <h4 class="api-heading">Events</h4>
                    <div class="api-table-wrap">
                      <table class="api-table">
                        <thead>
                          <tr>
                            <th>Event</th>
                            <th>Detail</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${events.map(
                            e => html`
                              <tr>
                                <td><code>${e.name}</code></td>
                                <td>${e.detail ? html`<code>${e.detail}</code>` : '—'}</td>
                                <td>${e.desc}</td>
                              </tr>
                            `
                          )}
                        </tbody>
                      </table>
                    </div>
                  `
                : ''}
              ${childTag
                ? html`
                    <div style="margin-top:1.25rem"><span class="api-tag-name">&lt;${childTag}&gt;</span></div>
                    ${childProperties?.length
                      ? html`
                          <h4 class="api-heading">Child Properties</h4>
                          <div class="api-table-wrap">
                            <table class="api-table">
                              <thead>
                                <tr>
                                  <th>Attribute</th>
                                  <th>Type</th>
                                  <th>Default</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                ${childProperties.map(
                                  p => html`
                                    <tr>
                                      <td><code>${p.attr}</code></td>
                                      <td><code>${p.type}</code></td>
                                      <td><code>${p.default}</code></td>
                                      <td>${p.desc}</td>
                                    </tr>
                                  `
                                )}
                              </tbody>
                            </table>
                          </div>
                        `
                      : ''}
                  `
                : ''}
            </div>
          </swim-section>
        </section>
      </div>
    `;
  }

  /* ================================================================ */
  /*  Overlay elements (dialogs & drawers at root for proper z-index)  */
  /* ================================================================ */

  _overlayElements() {
    return html`
      <!-- Regular dialog -->
      <swim-dialog id="demoDialog" dialog-title="Example Dialog" close-button>
        <p style="padding:1rem;color:var(--grey-200)">
          This is a regular-format dialog with a title and close button. Click the X to close.
        </p>
      </swim-dialog>

      <!-- Medium-format dialog -->
      <swim-dialog id="demoMediumDialog" format="medium" close-button>
        <swim-large-format-dialog-content
          format="medium"
          dialog-title="Medium Format Dialog"
          dialog-subtitle="A mid-sized dialog layout"
        >
          <p style="padding:1rem;color:var(--grey-200)">Medium-format dialog with header, body, and footer.</p>
          <swim-large-format-dialog-footer slot="footer" format="medium">
            <swim-button variant="bordered" @click=${() => this._hideOverlay('demoMediumDialog')}>Cancel</swim-button>
            <swim-button variant="primary" @click=${() => this._hideOverlay('demoMediumDialog')}>Confirm</swim-button>
          </swim-large-format-dialog-footer>
        </swim-large-format-dialog-content>
      </swim-dialog>

      <!-- Large-format dialog -->
      <swim-dialog id="demoLargeDialog" format="large" close-button>
        <swim-large-format-dialog-content
          format="large"
          dialog-title="Large Format Dialog"
          dialog-subtitle="Subtitle for additional context"
        >
          <p style="padding:1rem;color:var(--grey-200)">Large-format dialog with header, body, and footer.</p>
          <swim-large-format-dialog-footer slot="footer">
            <swim-button variant="bordered" @click=${() => this._hideOverlay('demoLargeDialog')}>Cancel</swim-button>
            <swim-button variant="primary" @click=${() => this._hideOverlay('demoLargeDialog')}>Confirm</swim-button>
          </swim-large-format-dialog-footer>
        </swim-large-format-dialog-content>
      </swim-dialog>

      <!-- Left drawer -->
      <swim-drawer id="demoDrawerLeft" direction="left" size="35">
        <div style="padding:2rem">
          <h3 style="margin:0 0 1rem;color:var(--blue-400)">Left Drawer</h3>
          <p style="color:var(--grey-200)">Slide-in panel from the left edge.</p>
          <swim-button variant="bordered" style="margin-top:1rem" @click=${() => this._hideOverlay('demoDrawerLeft')}
            >Close</swim-button
          >
        </div>
      </swim-drawer>

      <!-- Right drawer -->
      <swim-drawer id="demoDrawerRight" direction="right" size="35">
        <div style="padding:2rem">
          <h3 style="margin:0 0 1rem;color:var(--blue-400)">Right Drawer</h3>
          <p style="color:var(--grey-200)">Slide-in panel from the right edge.</p>
          <swim-button variant="bordered" style="margin-top:1rem" @click=${() => this._hideOverlay('demoDrawerRight')}
            >Close</swim-button
          >
        </div>
      </swim-drawer>

      <!-- Bottom drawer -->
      <swim-drawer id="demoDrawerBottom" direction="bottom" size="40">
        <div style="padding:2rem">
          <h3 style="margin:0 0 1rem;color:var(--blue-400)">Bottom Drawer</h3>
          <p style="color:var(--grey-200)">Slide-in panel from the bottom edge.</p>
          <swim-button variant="bordered" style="margin-top:1rem" @click=${() => this._hideOverlay('demoDrawerBottom')}
            >Close</swim-button
          >
        </div>
      </swim-drawer>
    `;
  }

  /* ================================================================ */
  /*  Interaction helpers                                              */
  /* ================================================================ */

  /**
   * Creates a cached event handler that sets a promise on the clicked button.
   * Called once in the constructor to avoid creating new closures each render.
   */
  _createPromiseHandler(outcome, delay) {
    return e => {
      const btn = e.currentTarget;
      this._promiseStatus = `Running ${outcome === 'fail' ? 'failure' : 'success'} demo…`;
      btn.promise = new Promise((resolve, reject) => {
        setTimeout(() => (outcome === 'fail' ? reject(new Error('Simulated')) : resolve()), delay);
      });
      btn.promise
        .then(() => {
          this._promiseStatus = 'Promise resolved – returning to active.';
        })
        .catch(() => {
          this._promiseStatus = 'Promise rejected – showing fail state.';
        });
    };
  }

  /** Show an overlay element (dialog or drawer) by id. */
  _showOverlay(id) {
    this.renderRoot.querySelector(`#${id}`)?.show();
  }

  /** Hide an overlay element (dialog or drawer) by id. */
  _hideOverlay(id) {
    this.renderRoot.querySelector(`#${id}`)?.hide();
  }
}
