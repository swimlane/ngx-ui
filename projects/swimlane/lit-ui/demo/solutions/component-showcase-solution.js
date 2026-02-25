/**
 * Component Showcase Solution (CDN) – vertical-tabbed demo of every swim-* element.
 *
 * Usage:
 *   <script type="module" src="component-showcase-solution.js"></script>
 *   <component-showcase-solution></component-showcase-solution>
 *
 * Imports:
 *   - SwimlaneElement, css, html → https://esm.sh/@swimlane/swimlane-element@1
 *   - swim-* elements must be registered by the host page (e.g. via the lit-ui bundle).
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

/** All swim-icon font icon names (from lit-ui icon set). */
const ICON_NAMES = [
  '3d-rotate',
  'action',
  'action-close',
  'action-maximize',
  'action-maximize-inverse',
  'action-minimize',
  'action-outline',
  'action-outline-small',
  'add-circle',
  'add-circle-filled',
  'add-circle-medium',
  'add-circle-thin',
  'add-edge',
  'add-new',
  'add-node',
  'advanced-pie',
  'alert',
  'app-store',
  'app-workspaces',
  'applet',
  'applets',
  'application',
  'apps',
  'area-chart',
  'arrow-bold-circle-left',
  'arrow-bold-circle-right',
  'arrow-bold-down',
  'arrow-bold-left',
  'arrow-bold-right',
  'arrow-bold-up',
  'arrow-down',
  'arrow-input',
  'arrow-output',
  'arrow-right',
  'arrow-right-down-medium',
  'arrow-right-medium',
  'arrow-tail-left',
  'arrow-tail-right',
  'arrow-tail-solid-left',
  'arrow-tail-solid-right',
  'arrow-tail-subright',
  'arrow-up',
  'asset-outline',
  'asset-outline-small',
  'assets',
  'attachment',
  'automation',
  'automation-alternate',
  'back-arrow',
  'back-arrow-filled',
  'bars',
  'bell',
  'bell-alarm',
  'bold',
  'bolt',
  'branch-node',
  'branch-node-vert',
  'broom',
  'browser-size',
  'bug',
  'builder',
  'builder-outline',
  'button-push-outline',
  'button-push-outline-large',
  'button-push-outline-small',
  'calendar',
  'calendar-clock',
  'calender-clock',
  'cards',
  'center-align',
  'chart-area',
  'chart-bar-bar',
  'chart-bubble',
  'chart-donut',
  'chart-full-stacked-area',
  'chart-heat',
  'chart-horz-full-stack-bar',
  'chart-number-card',
  'chart-pie',
  'chart-pie-grid',
  'chart-scatter',
  'chart-spider',
  'chart-stacked-area',
  'chart-vert-bar',
  'chart-vert-bar2',
  'chart-vert-stacked-bar',
  'check',
  'check-filled',
  'check-filled-sm',
  'check-square-filled',
  'checklist',
  'chevron-bold-down',
  'chevron-bold-left',
  'chevron-bold-right',
  'chevron-bold-up',
  'circle',
  'circle-filled',
  'circles',
  'circuit-board',
  'clipboard',
  'clock',
  'cloud-download',
  'cloud-upload',
  'code',
  'cog',
  'collapse',
  'commandline',
  'comments',
  'component',
  'component-create',
  'condition',
  'copy',
  'copy-app',
  'copy-filled',
  'credit-card',
  'dashboard',
  'dashboard-outline',
  'database',
  'debug',
  'devil',
  'disable',
  'document',
  'documentation',
  'domain',
  'dots-horz',
  'dots-vert',
  'dots-vert-round',
  'double-down',
  'double-left',
  'double-right',
  'double-up',
  'downgrade',
  'downgrade-horizontal',
  'download-outline',
  'download-outline-large',
  'download-outline-small',
  'drag',
  'edit',
  'edit-app',
  'edit-outline',
  'edit-outline-large',
  'edit-outline-small',
  'email',
  'enrich-small',
  'escalate',
  'events-outline',
  'events-outline-small',
  'expand',
  'explore',
  'export',
  'export-filled',
  'export-outline',
  'export-outline-large',
  'export-outline-small',
  'eye',
  'eye-disabled',
  'eye-hidden',
  'field-created-by',
  'field-created-date',
  'field-date',
  'field-double-select',
  'field-dynamic',
  'field-edited-by',
  'field-edited-date',
  'field-grid',
  'field-html',
  'field-json',
  'field-list',
  'field-list-small',
  'field-lists',
  'field-multiselect',
  'field-number',
  'field-numeric',
  'field-richtext',
  'field-single-select',
  'field-singleline',
  'field-text',
  'field-textarea',
  'field-textual',
  'field-users',
  'filter',
  'filter-bar',
  'find-page',
  'flame',
  'folder',
  'folder-closed-small',
  'folder-open-small',
  'folders',
  'font',
  'format-indent-decrease',
  'format-indent-increase',
  'formula',
  'forward-arrow',
  'forward-arrow-filled',
  'full-align',
  'gauge',
  'gear',
  'gear-small',
  'gear-square',
  'globe',
  'graph',
  'graph-alt1',
  'grid-view',
  'hand',
  'handle',
  'heat',
  'helper',
  'history',
  'horz-bar-graph-grouped',
  'horz-stacked-bar',
  'html-code',
  'icon-chart-bar-horizontal',
  'icon-chart-horz-bar',
  'import-outline',
  'import-outline-large',
  'import-outline-small',
  'info-filled',
  'info-filled-2',
  'info-filled-small',
  'ingest-small',
  'inspect',
  'integration',
  'integrations',
  'ip',
  'italic',
  'key',
  'key-outline',
  'key-outline-small',
  'keyboard',
  'keyboard-return',
  'layer',
  'left-align',
  'library',
  'line-chart',
  'line-graph',
  'linear-gauge',
  'link',
  'list',
  'list-1',
  'list-view',
  'loading',
  'locate-filled',
  'locate-outline',
  'locate-outline-large',
  'location',
  'lock',
  'lock-sm',
  'mail',
  'mail-1',
  'map',
  'marketplace',
  'menu',
  'mfa',
  'mic',
  'minus',
  'money',
  'mouse-hold',
  'multi-line',
  'new-app',
  'notation-arrow-down-left',
  'notation-arrow-up',
  'numbered-list',
  'open',
  'orchestration',
  'paragraph',
  'pause',
  'pause-circle',
  'percent-gauge',
  'phone',
  'photo',
  'pie-chart',
  'pin',
  'plane',
  'play',
  'play-circle',
  'playbook-outline',
  'playbook-outline-small',
  'plugin',
  'plugin-outline',
  'plugin-outline-small',
  'plus',
  'plus-bold',
  'prev',
  'printer',
  'profile',
  'profile-filled',
  'promote',
  'promote-horizontal',
  'question',
  'question-filled',
  'question-filled-sm',
  'radio-button',
  'redo',
  'redo-all',
  'reference',
  'reference-grid',
  'reference-multi',
  'reference-single',
  'reference-tree',
  'refresh',
  'refresh-circle',
  'refresh-small',
  'remove',
  'remove-edge',
  'remove-node',
  'remove-users',
  'repeat',
  'replace',
  'reports',
  'reports-outline',
  'resize',
  'right-align',
  'rocket',
  'rotate',
  'rule-outline',
  'runner',
  'runs-outline',
  'runs-outline-small',
  'sankey',
  'save',
  'save-outline',
  'save-outline-large',
  'save-outline-small',
  'screen',
  'screen-1',
  'search',
  'section',
  'select-all',
  'select-user',
  'select-users',
  'sensor-outline',
  'sensor-outline-small',
  'server',
  'shield',
  'shrink',
  'skip',
  'slide-left',
  'slide-right',
  'sliders',
  'smartphone',
  'smiley-frown',
  'snapshot',
  'solution',
  'sort-ascending',
  'sort-descending',
  'spaces',
  'spaces-list',
  'spaces-outline',
  'spaces-outline-large',
  'speedometer',
  'split-handle',
  'square',
  'square-filled',
  'star',
  'star-filled',
  'stars',
  'stopwatch',
  'superscript',
  'swap',
  'switch',
  'system-diagnostics',
  'system-diagnostics-2',
  'table',
  'tabs',
  'tag-filled',
  'tags-outline',
  'target',
  'task-outline',
  'thumb-down-filled',
  'thumb-down-outline',
  'thumb-down-outline-large',
  'thumb-up-filled',
  'thumb-up-outline',
  'thumb-up-outline-large',
  'tracking-id',
  'transfer',
  'trash',
  'tree',
  'tree-collapse',
  'tree-expand',
  'trend-down',
  'trend-level',
  'trend-up',
  'trending',
  'underline',
  'undo',
  'undo-all',
  'unlink',
  'upload-outline',
  'upload-outline-large',
  'upload-outline-small',
  'user',
  'user-add',
  'user-circle',
  'user-groups',
  'users',
  'version',
  'vert-bar-graph-grouped',
  'vert-full-stack-bar',
  'view-code',
  'view-designer',
  'view-split',
  'wand',
  'warning-filled',
  'warning-filled-sm',
  'warning-thin',
  'web-api',
  'webhook-outline',
  'webhook-outline-large',
  'webhook-outline-small',
  'widget',
  'worker',
  'workflow',
  'workflow-alternate',
  'workflow-alternate-large',
  'workflow-alternate-small',
  'workspaces',
  'workstation',
  'wrench',
  'x',
  'x-filled',
  'x-small'
];

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
/*  Component                                                          */
/* ================================================================== */

const BUTTON_STATES = ['active', 'in-progress', 'success', 'fail'];

export default class ComponentShowcaseSolution extends SwimlaneElement {
  static get properties() {
    return {
      _promiseStatus: { type: String, state: true },
      /** Bound to swim-button .state – update this to change the button (e.g. .state=${loadingStatus}) */
      _loadingStatus: { type: String, state: true }
    };
  }

  constructor() {
    super();
    this._promiseStatus = '';
    this._loadingStatus = 'active';
    this._cyclingTimer = null;
  }

  connectedCallback() {
    super.connectedCallback?.();
    let idx = 0;
    this._cyclingTimer = setInterval(() => {
      idx = (idx + 1) % BUTTON_STATES.length;
      this._loadingStatus = BUTTON_STATES[idx];
    }, 2000);
  }

  disconnectedCallback() {
    if (this._cyclingTimer) clearInterval(this._cyclingTimer);
    super.disconnectedCallback?.();
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
        width: 100%;
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

      /* Code blocks under demos */
      .demo-pre {
        margin: 0.75rem 0 0;
        padding: var(--sp);
        background: var(--grey-800, #1b1e27);
        border-radius: var(--r);
        font-size: 0.8rem;
        line-height: 1.4;
        overflow-x: auto;
        white-space: pre;
        color: var(--grey-200, #8b96a8);
      }
      .demo-pre code {
        font-family: ui-monospace, monospace;
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
    `;
  }

  /* ---------------------------------------------------------------- */
  /*  Main render                                                      */
  /* ---------------------------------------------------------------- */

  render() {
    return html`
      <swim-tabs vertical>
        <swim-tab label="Button" active>${this._buttonDemo()}</swim-tab>
        <swim-tab label="Button Group">${this._buttonGroupDemo()}</swim-tab>
        <swim-tab label="Button Toggle">${this._buttonToggleDemo()}</swim-tab>
        <swim-tab label="Input">${this._inputDemo()}</swim-tab>
        <swim-tab label="Select">${this._selectDemo()}</swim-tab>
        <swim-tab label="Checkbox">${this._checkboxDemo()}</swim-tab>
        <swim-tab label="Radio">${this._radioDemo()}</swim-tab>
        <swim-tab label="Toggle">${this._toggleDemo()}</swim-tab>
        <swim-tab label="Slider">${this._sliderDemo()}</swim-tab>
        <swim-tab label="Date / Time">${this._dateTimeDemo()}</swim-tab>
        <swim-tab label="Card">${this._cardDemo()}</swim-tab>
        <swim-tab label="Tabs">${this._tabsDemo()}</swim-tab>
        <swim-tab label="Section">${this._sectionDemo()}</swim-tab>
        <swim-tab label="Navbar">${this._navbarDemo()}</swim-tab>
        <swim-tab label="Split">${this._splitDemo()}</swim-tab>
        <swim-tab label="List">${this._listDemo()}</swim-tab>
        <swim-tab label="Dialog">${this._dialogDemo()}</swim-tab>
        <swim-tab label="Drawer">${this._drawerDemo()}</swim-tab>
        <swim-tab label="Tooltip">${this._tooltipDemo()}</swim-tab>
        <swim-tab label="Icon">${this._iconDemo()}</swim-tab>
        <swim-tab label="Progress Spinner">${this._spinnerDemo()}</swim-tab>
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
            <p class="hint">
              Static state examples; use <code>timeout="0"</code> so they do not auto-return to active.
            </p>
            <div class="demo-grid">
              <div class="demo-item">
                <span class="demo-label">Active</span>
                <swim-button variant="primary" aria-label="Active state">Active</swim-button>
              </div>
              <div class="demo-item">
                <span class="demo-label">In Progress</span>
                <swim-button state="in-progress" timeout="0" variant="primary" aria-label="Loading state"
                  >Loading</swim-button
                >
              </div>
              <div class="demo-item">
                <span class="demo-label">Success</span>
                <swim-button state="success" timeout="0" variant="primary" aria-label="Success state"
                  >Success</swim-button
                >
              </div>
              <div class="demo-item">
                <span class="demo-label">Fail</span>
                <swim-button state="fail" timeout="0" variant="primary" aria-label="Fail state">Failed</swim-button>
              </div>
              <div class="demo-item">
                <span class="demo-label">Disabled</span>
                <swim-button disabled variant="primary" aria-label="Disabled state">Disabled</swim-button>
              </div>
            </div>
          </swim-section>
        </section>

        <section class="sg" aria-label="State from variable">
          <swim-section section-title="State from variable">
            <p class="hint">
              Bind <code>state</code> to a variable (e.g. <code>.state=$${'{loadingStatus}'}</code> in your template);
              when it changes, the button updates. Below: <code>_loadingStatus</code> cycles every 2s.
            </p>
            <div class="demo-row">
              <div class="demo-item">
                <span class="demo-label">Current: ${this._loadingStatus}</span>
                <swim-button .state=${this._loadingStatus} timeout="0" variant="primary">Bound to variable</swim-button>
              </div>
            </div>
          </swim-section>
        </section>

        <section class="sg" aria-label="Promise handling">
          <swim-section section-title="Interactive – Promise Handling">
            <p class="hint">Click to trigger a simulated async operation with automatic state transitions.</p>
            <div class="demo-row">
              <swim-button variant="primary" aria-label="Simulate success" @click=${this._makePromise('success', 1500)}
                >Click for Success</swim-button
              >
              <swim-button variant="danger" aria-label="Simulate failure" @click=${this._makePromise('fail', 1500)}
                >Click for Failure</swim-button
              >
              <swim-button
                variant="warning"
                .timeout=${5000}
                aria-label="Slow operation"
                @click=${this._makePromise('success', 5000)}
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
      </div>
    `;
  }

  /* ---- Input ----------------------------------------------------- */
  _inputDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Input</h2>
        <p class="panel-desc">
          Text, number, password, email, textarea inputs with labels, hints, validation states, fill/legacy appearances,
          and sizes.
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
          <swim-section section-title="Single Select">
            <div class="demo-grid-wide">
              <swim-select label="Attack Type" placeholder="Select…" .options=${ATTACK_OPTIONS}></swim-select>
              <swim-select
                label="Required"
                required
                placeholder="Please select…"
                .options=${ATTACK_OPTIONS}
              ></swim-select>
            </div>
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
          <swim-section section-title="Filterable">
            <swim-select
              label="Search Attacks"
              placeholder="Type to filter…"
              filterable
              .options=${ATTACK_OPTIONS}
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
                .options=${ATTACK_OPTIONS}
              ></swim-select>
              <swim-select size="md" label="Medium Size" placeholder="Select…" .options=${ATTACK_OPTIONS}></swim-select>
            </div>
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
          <swim-section section-title="Basic">
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
              <swim-toggle label="No icons" .showIcons=${false}></swim-toggle>
              <swim-toggle label="No icons (on)" .showIcons=${false} checked></swim-toggle>
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

  /* ---- Date / Time ----------------------------------------------- */
  _dateTimeDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Date / Time</h2>
        <p class="panel-desc">
          Date, time, and datetime picker with formatting, timezone support, precision levels, and form association.
        </p>

        <section class="sg">
          <swim-section section-title="Date Input">
            <div class="demo-grid-wide">
              <swim-date-time label="Date of attack" .value=${new Date('2016-10-10')}></swim-date-time>
              <swim-date-time label="Disabled" disabled .value=${new Date('2016-10-10')}></swim-date-time>
              <swim-date-time
                label="Custom Format (M/Y)"
                format="M/Y"
                .value=${new Date('2016-10-10')}
              ></swim-date-time>
              <swim-date-time
                label="Min/Max Dates"
                min-date="2016-10-02"
                max-date="2016-10-22"
                hint="Between 10/2/2016 and 10/22/2016"
                .value=${new Date('2016-10-10')}
              ></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Date/Time Input">
            <div class="demo-grid-wide">
              <swim-date-time
                input-type="datetime"
                label="Moon Landing"
                .value=${new Date('1969-07-20T20:17:43Z')}
              ></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Time Input">
            <div class="demo-grid-wide">
              <swim-date-time
                input-type="time"
                label="Time of attack"
                .value=${new Date('2016-10-10T14:30:00')}
              ></swim-date-time>
              <swim-date-time
                input-type="time"
                display-mode="timezone"
                label="Time (Timezone)"
                .value=${new Date('2016-10-10T14:30:00')}
              ></swim-date-time>
              <swim-date-time
                input-type="time"
                timezone="utc"
                label="Time (UTC)"
                .value=${new Date('2016-10-10T14:30:00')}
              ></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="TimeZones">
            <div class="demo-grid-wide">
              <swim-date-time
                input-type="datetime"
                label="Local Time"
                display-mode="timezone"
                .value=${new Date('2016-10-10T14:30:00')}
              ></swim-date-time>
              <swim-date-time
                input-type="datetime"
                label="UTC"
                timezone="utc"
                .value=${new Date('2016-10-10T14:30:00')}
              ></swim-date-time>
              <swim-date-time
                input-type="datetime"
                label="JST"
                timezone="Asia/Tokyo"
                .value=${new Date('2016-10-10T14:30:00')}
              ></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Precision">
            <div class="demo-grid-wide">
              <swim-date-time label="Year" precision="year" .value=${new Date('2016-10-10')}></swim-date-time>
              <swim-date-time label="Month" precision="month" .value=${new Date('2016-10-10')}></swim-date-time>
              <swim-date-time
                label="Hour"
                precision="hour"
                input-type="datetime"
                .value=${new Date('2016-10-10T14:30:00')}
              ></swim-date-time>
              <swim-date-time
                label="Minutes"
                precision="minute"
                input-type="datetime"
                .value=${new Date('2016-10-10T14:30:00')}
              ></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Appearances">
            <div class="demo-grid-wide">
              <swim-date-time
                label="Legacy (default)"
                hint="A brief bit of help text"
                .value=${new Date('2016-10-10')}
              ></swim-date-time>
              <swim-date-time
                appearance="fill"
                label="Fill"
                hint="A brief bit of help text"
                .value=${new Date('2016-10-10')}
              ></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Autosize">
            <div class="demo-row">
              <swim-date-time
                autosize
                input-type="date"
                label="Year"
                precision="year"
                format="YYYY"
                .value=${new Date('2016-10-10')}
              ></swim-date-time>
              <swim-date-time
                autosize
                input-type="date"
                label="Month"
                precision="month"
                format="MMM YYYY"
                .value=${new Date('2016-10-10')}
              ></swim-date-time>
              <swim-date-time
                autosize
                appearance="fill"
                input-type="datetime"
                label="Hour"
                precision="hour"
                format="MMM DD, YYYY, hh:mm"
                .value=${new Date('2016-10-10T14:30:00')}
              ></swim-date-time>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="States">
            <div class="demo-grid-wide">
              <swim-date-time label="Required" required hint="This field is required"></swim-date-time>
              <swim-date-time label="With Placeholder" placeholder="Select a date…"></swim-date-time>
              <swim-date-time label="Disabled" disabled .value=${new Date('2016-10-10')}></swim-date-time>
            </div>
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
        <p class="panel-desc">
          Card container with horizontal or vertical layout, optional status, selection, outline, and placeholders.
        </p>

        <section class="sg">
          <swim-section section-title="Horizontal Card">
            <div class="demo-col">
              <swim-card orientation="horizontal">
                <swim-card-header>
                  <swim-card-avatar slot="avatar">AB</swim-card-avatar>
                  <span slot="title">Horizontal Card Title</span>
                  <span slot="subtitle">Subtitle or description line</span>
                </swim-card-header>
              </swim-card>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Vertical Card">
            <div class="card-row">
              <swim-card orientation="vertical" status="success">
                <swim-card-header orientation="vertical" label="CARD">
                  <swim-card-avatar slot="avatar" status="success">AB</swim-card-avatar>
                  <span slot="title">Card Title</span>
                  <span slot="subtitle">Subtitle</span>
                </swim-card-header>
                <swim-card-body>
                  <div style="text-align:center;color:var(--grey-350);font-size:0.9rem">
                    <div
                      style="font-size:var(--font-size-xl);font-weight:var(--font-weight-semibold);color:var(--grey-050)"
                    >
                      148
                    </div>
                    <div style="font-size:var(--font-size-xxs);text-transform:uppercase">Runs / 24hrs</div>
                  </div>
                </swim-card-body>
                <swim-card-footer label="ACTIONS">
                  <swim-icon font-icon="integrations" style="cursor:pointer;color:var(--grey-300)"></swim-icon>
                </swim-card-footer>
              </swim-card>

              <swim-card orientation="vertical">
                <swim-card-header orientation="vertical" label="Header label">
                  <swim-card-avatar slot="avatar">SW</swim-card-avatar>
                  <span slot="title">Vertical Card</span>
                  <span slot="subtitle">With label and footer</span>
                </swim-card-header>
                <swim-card-footer label="Footer label">
                  <swim-button variant="primary" size="small">Action</swim-button>
                </swim-card-footer>
              </swim-card>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Status and Appearance">
            <div class="demo-col">
              <span class="demo-label">Status: success</span>
              <swim-card orientation="horizontal" status="success">
                <swim-card-header>
                  <span slot="title">Success status</span>
                </swim-card-header>
              </swim-card>

              <span class="demo-label">Status: error</span>
              <swim-card orientation="horizontal" status="error">
                <swim-card-header>
                  <span slot="title">Error status</span>
                </swim-card-header>
              </swim-card>

              <span class="demo-label">Flat appearance</span>
              <swim-card orientation="horizontal" appearance="flat">
                <swim-card-header>
                  <span slot="title">Flat card</span>
                </swim-card-header>
              </swim-card>

              <span class="demo-label">Disabled</span>
              <swim-card orientation="horizontal" disabled>
                <swim-card-header>
                  <span slot="title">Disabled card</span>
                </swim-card-header>
              </swim-card>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Selectable">
            <div class="demo-col">
              <swim-card orientation="horizontal" selectable selected>
                <swim-card-header>
                  <swim-card-avatar slot="avatar">SC</swim-card-avatar>
                  <span slot="title">Selectable Card</span>
                  <span slot="subtitle">Click checkbox to toggle selection</span>
                </swim-card-header>
              </swim-card>

              <swim-card orientation="horizontal" selectable>
                <swim-card-header>
                  <swim-card-avatar slot="avatar">UN</swim-card-avatar>
                  <span slot="title">Unselected Card</span>
                  <span slot="subtitle">Not yet selected</span>
                </swim-card-header>
              </swim-card>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Outline Text and Error">
            <div class="demo-col">
              <swim-card orientation="horizontal" outline-text="View details">
                <swim-card-header>
                  <swim-card-avatar slot="avatar">OT</swim-card-avatar>
                  <span slot="title">Outline Card</span>
                  <span slot="subtitle">Click the outline label below</span>
                </swim-card-header>
              </swim-card>

              <swim-card orientation="horizontal" error outline-text="Error">
                <swim-card-header>
                  <swim-card-avatar slot="avatar">ER</swim-card-avatar>
                  <span slot="title">Error Card</span>
                  <span slot="subtitle">Error state with outline text</span>
                </swim-card-header>
              </swim-card>
            </div>
          </swim-section>
        </section>

        <section class="sg">
          <swim-section section-title="Placeholders">
            <swim-card orientation="horizontal">
              <swim-card-header class="no-click">
                <swim-card-avatar slot="avatar">...</swim-card-avatar>
                <span slot="title"><swim-card-placeholder size="large"></swim-card-placeholder></span>
                <span slot="subtitle"><swim-card-placeholder size="small"></swim-card-placeholder></span>
              </swim-card-header>
            </swim-card>
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
    const basicListCode = `<swim-list id="listBasic"></swim-list>
<script>
  const list = document.getElementById('listBasic');
  list.dataSource = [
    { type: 'Malware', date: '2025-01-10', origin: 'China' },
    { type: 'DDOS', date: '2025-01-15', origin: 'Russia' }
  ];
  list.headerLabels = ['Attack Type', 'Date', 'Origin'];
  list.columns = ['type', 'date', 'origin'];
  list.columnLayout = '3fr 2fr 2fr';
  list.defaultRowStatus = 'error';
  list.height = 280;
</script>`;
    const rowIndexCode = `<swim-list id="listWithIndex"></swim-list>
<script>
  const list = document.getElementById('listWithIndex');
  list.dataSource = [
    { type: 'Malware', date: '2025-01-10', origin: 'China' },
    { type: 'DDOS', date: '2025-01-15', origin: 'Russia' }
  ];
  list.headerLabels = ['#', 'Attack Type', 'Date', 'Origin'];
  list.columns = ['$index', 'type', 'date', 'origin'];
  list.columnLayout = '0.5fr 3fr 2fr 2fr';
  list.defaultRowStatus = 'warning';
  list.height = 280;
</script>`;
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
            <pre class="demo-pre"><code>${basicListCode}</code></pre>
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
            <pre class="demo-pre"><code>${rowIndexCode}</code></pre>
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
        <p class="panel-desc">Modal dialogs — regular and large format with header, body, and footer.</p>

        <section class="sg">
          <swim-section section-title="Regular Dialog">
            <swim-button variant="primary" @click=${() => this._showOverlay('demoDialog')}>Open Dialog</swim-button>
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
        <p class="panel-desc">Slide-in panels from left or right.</p>

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
      </div>
    `;
  }

  /* ---- Tooltip ---------------------------------------------------- */
  _tooltipDemo() {
    return html`
      <div class="panel">
        <h2 class="panel-title">Tooltip</h2>
        <p class="panel-desc">Tooltips and popovers with configurable placement and trigger events.</p>

        <section class="sg">
          <swim-section section-title="Tooltip Type">
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
            <swim-tooltip content="No caret" type="tooltip" placement="top" .showCaret=${false}>
              <swim-button variant="bordered">No Caret</swim-button>
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
        <p class="panel-desc">Icons from the swim-icon lit font set (host loads the font).</p>

        <section class="sg">
          <swim-section section-title="All Icons">
            <div class="icon-grid">
              ${ICON_NAMES.map(
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
          This is a regular-format dialog with a title and close button. Click the X or the backdrop to close.
        </p>
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
    `;
  }

  /* ================================================================ */
  /*  Interaction helpers                                              */
  /* ================================================================ */

  /** Returns an event handler that sets a promise on the clicked button. */
  _makePromise(outcome, delay) {
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
