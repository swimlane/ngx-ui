/**
 * Employee Exit / Offboarding Workflow Solution (CDN) – single .js file.
 * Covers all @swimlane/lit-ui swim-* components in one workflow UI.
 *
 * Flow: Resignation → Create Exit Case → Assign (HRBP, Manager, IT/Sec) →
 * Schedule exit interview + Start offboarding → Pre-interview signals →
 * Conduct interview (Regrettable? Compliance concern?) → Offboarding tracks
 * (knowledge transfer, assets, access, finance/legal) → Close case.
 *
 * Usage:
 *   In demo app: ensure main.ts (or host) has registered all lit-ui components, then:
 *   <script type="module" src="employee-exit-offboarding-workflow-solution.js"></script>
 *   <employee-exit-offboarding-workflow-solution></employee-exit-offboarding-workflow-solution>
 *
 * Standalone: Load lit-ui bundle (and ensure "lit" is mapped) before this script.
 *
 * Imports: SwimlaneElement, css, html from https://esm.sh/@swimlane/swimlane-element@1
 * swim-* elements: per-component CDN scripts (only what this workflow uses).
 */
import { SwimlaneElement, css, html } from 'https://esm.sh/@swimlane/swimlane-element@1';

import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/button.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/button-group.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/button-toggle.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/input.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/select.js';
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

const ROLE_OPTIONS = [
  { name: 'Engineering', value: 'eng' },
  { name: 'Product', value: 'product' },
  { name: 'Sales', value: 'sales' },
  { name: 'HR', value: 'hr' },
  { name: 'Finance', value: 'finance' },
  { name: 'Other', value: 'other' }
];

const COMP_BAND_OPTIONS = [
  { name: 'Band 1', value: 'b1' },
  { name: 'Band 2', value: 'b2' },
  { name: 'Band 3', value: 'b3' },
  { name: 'Band 4', value: 'b4' }
];

const LIST_SOURCE = [
  { task: 'Knowledge transfer plan', status: 'pending', $index: 1 },
  { task: 'Asset return tracking', status: 'pending', $index: 2 },
  { task: 'Account access removal plan', status: 'pending', $index: 3 },
  { task: 'Finance/legal closure', status: 'pending', $index: 4 }
];

/**
 * Employee Exit Offboarding Workflow – uses every swim-* component.
 * No document/window listeners or timers; cleanup not required beyond component teardown.
 */
class EmployeeExitOffboardingWorkflowSolution extends SwimlaneElement {
  static get properties() {
    return {
      _navbarActive: { type: Number },
      _regrettable: { type: String },
      _privilegedAccess: { type: String },
      _drawerOpen: { type: Boolean },
      _closeDialogVisible: { type: Boolean },
      _loading: { type: Boolean },
      _employeeName: { type: String },
      _tenureYears: { type: Number },
      _handoverComplete: { type: Boolean },
      _assetsReturned: { type: Boolean },
      _docsSigned: { type: Boolean },
      _heightenedMonitoring: { type: Boolean },
      _loadTimeout: { type: Number }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--font-family, 'Source Sans Pro', sans-serif);
        font-size: var(--font-size-m, 1rem);
        color: var(--grey-050, #ebedf2);
        --workflow-spacing: var(--spacing-16, 16px);
        --workflow-radius: var(--radius-4, 4px);
      }

      .workflow-root {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--workflow-spacing);
      }

      .workflow-header {
        margin-bottom: var(--spacing-24, 24px);
      }

      .workflow-title {
        font-size: var(--font-size-xl, 1.25rem);
        font-weight: var(--font-weight-semibold, 600);
        color: var(--white, #fff);
        margin: 0 0 var(--spacing-8, 8px) 0;
      }

      .workflow-subtitle {
        font-size: var(--font-size-s, 0.8125rem);
        color: var(--grey-300, #909cb4);
        margin: 0;
      }

      .nav-wrap {
        margin-bottom: var(--workflow-spacing);
      }

      .tabs-wrap {
        margin-top: var(--workflow-spacing);
      }

      .form-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--workflow-spacing);
        margin-bottom: var(--spacing-16);
      }

      .form-row swim-input,
      .form-row swim-select {
        flex: 1 1 200px;
      }

      .decision-block {
        margin: var(--workflow-spacing) 0;
        padding: var(--workflow-spacing);
        background: var(--grey-800, #1c2029);
        border-radius: var(--workflow-radius);
        border-left: 4px solid var(--orange-500, #ffa814);
      }

      .decision-label {
        font-size: var(--font-size-xs, 0.75rem);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--orange-400, #ffbb47);
        margin-bottom: var(--spacing-4);
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--workflow-spacing);
      }

      .split-wrap {
        height: 320px;
        margin: var(--workflow-spacing) 0;
      }

      .spinner-wrap {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-8);
        margin: var(--spacing-16) 0;
      }

      .drawer-content {
        padding: var(--workflow-spacing);
      }

      .all-components-wrap {
        padding: var(--spacing-8) 0;
      }

      .all-components-wrap .component-block {
        margin-bottom: var(--spacing-24);
      }

      .all-components-wrap .component-block h3 {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-semibold);
        color: var(--grey-300);
        margin: 0 0 var(--spacing-8) 0;
        padding-bottom: var(--spacing-4);
        border-bottom: 1px solid var(--grey-700);
      }

      .all-components-wrap .component-block .demo-inline {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-16);
        align-items: center;
        margin-top: var(--spacing-8);
      }

      :host([hidden]) {
        display: none;
      }
    `;
  }

  constructor() {
    super();
    this._navbarActive = 0;
    this._regrettable = '';
    this._privilegedAccess = '';
    this._drawerOpen = false;
    this._closeDialogVisible = false;
    this._loading = false;
    this._employeeName = '';
    this._tenureYears = 3;
    this._handoverComplete = false;
    this._assetsReturned = false;
    this._docsSigned = false;
    this._heightenedMonitoring = false;
    this._loadTimeout = undefined;
  }

  disconnectedCallback() {
    if (this._loadTimeout != null) {
      clearTimeout(this._loadTimeout);
      this._loadTimeout = undefined;
    }
    super.disconnectedCallback();
  }

  _onNavbarChange(e) {
    this._navbarActive = e.detail ?? 0;
  }

  _openDrawer() {
    this._drawerOpen = true;
  }

  _closeDrawer() {
    this._drawerOpen = false;
  }

  _showCloseDialog() {
    this._closeDialogVisible = true;
  }

  _hideCloseDialog() {
    this._closeDialogVisible = false;
  }

  _onCloseDialogClose() {
    this._closeDialogVisible = false;
  }

  _simulateLoad() {
    if (this._loadTimeout != null) clearTimeout(this._loadTimeout);
    this._loading = true;
    this._loadTimeout = setTimeout(() => {
      this._loading = false;
      this._loadTimeout = undefined;
    }, 1500);
  }

  render() {
    return html`
      <main class="workflow-root" role="main" aria-label="Employee exit offboarding workflow">
        <header class="workflow-header">
          <h1 class="workflow-title">Employee Exit / Offboarding Workflow</h1>
          <p class="workflow-subtitle">Resignation → Exit Case → Assign → Interview → Offboarding → Close</p>
        </header>

        <nav class="nav-wrap" aria-label="Workflow stages">
          <swim-navbar
            .active=${this._navbarActive}
            @active-change=${this._onNavbarChange}
            aria-label="Workflow stages"
          >
            <swim-navbar-item>Resignation</swim-navbar-item>
            <swim-navbar-item>Exit case</swim-navbar-item>
            <swim-navbar-item>Interview</swim-navbar-item>
            <swim-navbar-item>Offboarding</swim-navbar-item>
            <swim-navbar-item>Close</swim-navbar-item>
          </swim-navbar>
        </nav>

        <div class="tabs-wrap" role="region" aria-label="Workflow content">
          <swim-tabs>
            <swim-tab label="All components" active>${this._renderAllComponents()}</swim-tab>
            <swim-tab label="Overview">${this._renderOverview()}</swim-tab>
            <swim-tab label="Exit case & assign">${this._renderExitCase()}</swim-tab>
            <swim-tab label="Exit interview">${this._renderInterview()}</swim-tab>
            <swim-tab label="Offboarding checklist">${this._renderOffboarding()}</swim-tab>
            <swim-tab label="Close case">${this._renderClose()}</swim-tab>
          </swim-tabs>
        </div>

        <!-- Declarative drawer for checklist details -->
        <swim-drawer
          ?open=${this._drawerOpen}
          direction="left"
          size="40"
          is-root
          close-on-outside-click
          @close=${this._closeDrawer}
          aria-label="Checklist details"
        >
          <div class="drawer-content">
            <h3 style="margin-top:0">Checklist details</h3>
            <p>Knowledge transfer, asset return, access removal, and finance/legal closure.</p>
            <swim-button variant="primary" @click=${this._closeDrawer}>Close</swim-button>
          </div>
        </swim-drawer>

        <!-- Close case confirmation dialog (large format) -->
        <swim-dialog
          ?visible=${this._closeDialogVisible}
          format="large"
          dialog-title="Close Exit Case"
          show-backdrop
          close-button
          @close=${this._onCloseDialogClose}
          aria-labelledby="close-dialog-title"
        >
          <swim-large-format-dialog-content
            format="medium"
            dialog-title="Close Exit Case"
            dialog-subtitle="Publish anonymized insights and archive the case."
            @close-or-cancel=${this._hideCloseDialog}
          >
            <p>
              Confirm that all exit docs are signed, payroll is confirmed, and you want to close this case and publish
              anonymized insights.
            </p>
            <swim-large-format-dialog-footer slot="footer">
              <swim-button variant="bordered" @click=${this._hideCloseDialog}>Cancel</swim-button>
              <swim-button variant="primary" @click=${this._hideCloseDialog}>Close case</swim-button>
            </swim-large-format-dialog-footer>
          </swim-large-format-dialog-content>
        </swim-dialog>
      </main>
    `;
  }

  _renderAllComponents() {
    return html`
      <div class="all-components-wrap" role="region" aria-label="All lit-ui components">
        <swim-section section-title="swim-navbar + swim-navbar-item" section-collapsible="false">
          <swim-navbar .active=${this._navbarActive} @active-change=${this._onNavbarChange} aria-label="Stages">
            <swim-navbar-item>One</swim-navbar-item>
            <swim-navbar-item>Two</swim-navbar-item>
            <swim-navbar-item>Three</swim-navbar-item>
          </swim-navbar>
        </swim-section>

        <swim-section section-title="swim-button" section-collapsible="false">
          <div class="demo-inline">
            <swim-button type="button">Default</swim-button>
            <swim-button type="button" variant="primary">Primary</swim-button>
            <swim-button type="button" variant="warning">Warning</swim-button>
            <swim-button type="button" variant="danger">Danger</swim-button>
            <swim-button type="button" variant="bordered">Bordered</swim-button>
            <swim-button type="button" variant="link">Link</swim-button>
            <swim-button type="button" size="small">Small</swim-button>
            <swim-button type="button" size="large">Large</swim-button>
            <swim-button type="button" disabled>Disabled</swim-button>
            <swim-button type="button"><swim-icon font-icon="plus" alt=""></swim-icon> With icon</swim-button>
          </div>
        </swim-section>

        <swim-section section-title="swim-button-group" section-collapsible="false">
          <div class="demo-inline">
            <swim-button-group>
              <swim-button type="button">One</swim-button>
              <swim-button type="button">Two</swim-button>
              <swim-button type="button">Three</swim-button>
            </swim-button-group>
            <swim-button-group button-group-style="primary">
              <swim-button type="button">A</swim-button>
              <swim-button type="button">B</swim-button>
            </swim-button-group>
          </div>
        </swim-section>

        <swim-section section-title="swim-button-toggle + swim-button-toggle-group" section-collapsible="false">
          <swim-button-toggle-group
            .value=${this._privilegedAccess}
            @value-change=${e => (this._privilegedAccess = e.detail)}
            label="Choice"
            aria-label="Choice"
          >
            <swim-button-toggle value="a">Option A</swim-button-toggle>
            <swim-button-toggle value="b">Option B</swim-button-toggle>
            <swim-button-toggle value="c">Option C</swim-button-toggle>
          </swim-button-toggle-group>
        </swim-section>

        <swim-section section-title="swim-input" section-collapsible="false">
          <div class="demo-inline" style="flex-direction: column; align-items: stretch;">
            <swim-input label="Text" value="" placeholder="Placeholder" aria-label="Text"></swim-input>
            <swim-input label="Number" type="number" value="0" aria-label="Number"></swim-input>
            <swim-input label="Textarea" type="textarea" placeholder="Multiline" aria-label="Textarea"></swim-input>
            <swim-input label="With hint" hint="Helper text" aria-label="With hint"></swim-input>
          </div>
        </swim-section>

        <swim-section section-title="swim-select" section-collapsible="false">
          <swim-select
            label="Single select"
            .options=${ROLE_OPTIONS}
            placeholder="Select..."
            aria-label="Single select"
          ></swim-select>
        </swim-section>

        <swim-section section-title="swim-checkbox" section-collapsible="false">
          <div class="demo-inline">
            <swim-checkbox label="Unchecked" aria-label="Unchecked"></swim-checkbox>
            <swim-checkbox label="Checked" checked aria-label="Checked"></swim-checkbox>
          </div>
        </swim-section>

        <swim-section section-title="swim-radio + swim-radio-group" section-collapsible="false">
          <swim-radio-group
            .value=${this._regrettable}
            @change=${e => (this._regrettable = e.detail)}
            name="demo"
            aria-label="Options"
          >
            <swim-radio value="1">Option 1</swim-radio>
            <swim-radio value="2">Option 2</swim-radio>
            <swim-radio value="3">Option 3</swim-radio>
          </swim-radio-group>
        </swim-section>

        <swim-section section-title="swim-toggle" section-collapsible="false">
          <swim-toggle
            label="Toggle on/off"
            ?checked=${this._heightenedMonitoring}
            @change=${e => (this._heightenedMonitoring = e.detail?.target?.checked ?? false)}
            aria-label="Toggle"
          ></swim-toggle>
        </swim-section>

        <swim-section section-title="swim-slider" section-collapsible="false">
          <swim-slider
            label="Value"
            min="0"
            max="100"
            step="1"
            .value="${this._tenureYears}"
            @change=${e => (this._tenureYears = Number(e.detail?.value ?? 50))}
            filled
            aria-label="Slider"
          ></swim-slider>
        </swim-section>

        <swim-section section-title="swim-tabs + swim-tab" section-collapsible="false">
          <swim-tabs>
            <swim-tab label="Tab 1" active><p>Tab 1 content.</p></swim-tab>
            <swim-tab label="Tab 2"><p>Tab 2 content.</p></swim-tab>
            <swim-tab label="Tab 3"><p>Tab 3 content.</p></swim-tab>
          </swim-tabs>
        </swim-section>

        <swim-section section-title="swim-section + swim-section-header" section-collapsible="true">
          <swim-section-header slot="header">
            <swim-icon font-icon="check" alt=""></swim-icon>
            <span>Custom section header</span>
          </swim-section-header>
          <p>Section body. Collapsible.</p>
        </swim-section>

        <swim-section
          section-title="swim-card, swim-card-header, swim-card-body, swim-card-footer, swim-card-avatar, swim-card-placeholder"
          section-collapsible="false"
        >
          <div class="card-grid">
            <swim-card orientation="vertical">
              <swim-card-header>
                <swim-card-avatar slot="avatar">AB</swim-card-avatar>
                <span slot="title">Card title</span>
                <span slot="subtitle">Subtitle</span>
              </swim-card-header>
              <swim-card-body><p>Body content.</p></swim-card-body>
              <swim-card-footer
                ><swim-button type="button" variant="primary" size="small">Action</swim-button></swim-card-footer
              >
            </swim-card>
            <swim-card orientation="vertical" status="success">
              <swim-card-placeholder size="small">Small placeholder</swim-card-placeholder>
            </swim-card>
            <swim-card orientation="vertical" status="error">
              <swim-card-placeholder size="medium">Medium</swim-card-placeholder>
            </swim-card>
            <swim-card orientation="vertical">
              <swim-card-placeholder size="large">Large placeholder</swim-card-placeholder>
            </swim-card>
          </div>
        </swim-section>

        <swim-section
          section-title="swim-dialog + swim-large-format-dialog-content + swim-large-format-dialog-footer"
          section-collapsible="false"
        >
          <swim-button type="button" variant="primary" @click=${this._showCloseDialog}>Open dialog</swim-button>
        </swim-section>

        <swim-section section-title="swim-drawer" section-collapsible="false">
          <swim-button type="button" variant="bordered" @click=${this._openDrawer}>Open drawer</swim-button>
        </swim-section>

        <swim-section section-title="swim-tooltip + swim-icon" section-collapsible="false">
          <div class="demo-inline">
            <swim-tooltip content="Tooltip text" placement="top">
              <swim-button type="button"><swim-icon font-icon="info" alt="Info"></swim-icon></swim-button>
            </swim-tooltip>
            <swim-icon font-icon="person" alt="Person"></swim-icon>
            <swim-icon font-icon="check" alt="Check"></swim-icon>
            <swim-icon font-icon="x" alt="Close"></swim-icon>
          </div>
        </swim-section>

        <swim-section section-title="swim-list" section-collapsible="false">
          <swim-list
            column-layout="60px 1fr 100px"
            .headerLabels=${['#', 'Task', 'Status']}
            .columns=${['$index', 'task', 'status']}
            .dataSource=${LIST_SOURCE}
            default-row-status="success"
            height="180"
            aria-label="Sample list"
          ></swim-list>
        </swim-section>

        <swim-section section-title="swim-progress-spinner" section-collapsible="false">
          <div class="demo-inline">
            <swim-progress-spinner
              mode="indeterminate"
              color="var(--blue-500)"
              aria-label="Loading"
            ></swim-progress-spinner>
            <swim-progress-spinner
              mode="determinate"
              .value=${60}
              .total=${100}
              color="var(--green-500)"
              aria-label="Progress"
            ></swim-progress-spinner>
          </div>
        </swim-section>

        <swim-section section-title="swim-split + swim-split-area + swim-split-handle" section-collapsible="false">
          <div class="split-wrap">
            <swim-split direction="row">
              <swim-split-area area-basis="1 1 40%"
                ><p style="padding: var(--spacing-16);">Left pane</p></swim-split-area
              >
              <swim-split-handle aria-label="Resize"></swim-split-handle>
              <swim-split-area area-basis="1 1 60%"
                ><p style="padding: var(--spacing-16);">Right pane</p></swim-split-area
              >
            </swim-split>
          </div>
        </swim-section>
      </div>
    `;
  }

  _renderOverview() {
    return html`
      <swim-section section-title="Workflow phases" section-collapsible="false">
        <ul role="list" style="margin:0; padding-left: 1.25rem;">
          <li>Resignation received → Create Exit Case record</li>
          <li>Assign HRBP + Manager + IT/Sec</li>
          <li>Schedule exit interview &amp; start offboarding checklist</li>
          <li>Conduct interview (regrettable attrition? compliance concerns?)</li>
          <li>Offboarding: knowledge transfer, assets, access, finance/legal</li>
          <li>Close Exit Case + publish anonymized insights</li>
        </ul>
      </swim-section>

      <swim-section section-title="Quick actions" section-collapsible="true">
        <swim-button-group button-group-style="primary">
          <swim-button type="button" @click=${this._simulateLoad}>
            <swim-icon font-icon="plus" alt=""></swim-icon> Create case
          </swim-button>
          <swim-button type="button">Schedule interview</swim-button>
          <swim-button type="button" variant="bordered">View checklist</swim-button>
        </swim-button-group>
        ${this._loading
          ? html`
              <div class="spinner-wrap" aria-live="polite">
                <swim-progress-spinner mode="indeterminate" color="var(--blue-500)"></swim-progress-spinner>
                <span>Loading…</span>
              </div>
            `
          : ''}
      </swim-section>
    `;
  }

  _renderExitCase() {
    return html`
      <swim-section section-title="Create Exit Case record" section-collapsible="false">
        <div class="card-grid">
          <swim-card orientation="vertical">
            <swim-card-header>
              <span slot="title">Employee</span>
              <span slot="subtitle">Primary contact</span>
            </swim-card-header>
            <swim-card-body>
              <swim-input
                label="Employee name"
                .value=${this._employeeName}
                @input=${e => (this._employeeName = e.target.value)}
                placeholder="Full name"
                aria-label="Employee name"
              ></swim-input>
            </swim-card-body>
          </swim-card>
          <swim-card orientation="vertical">
            <swim-card-header>
              <swim-card-avatar slot="avatar">R&amp;T</swim-card-avatar>
              <span slot="title">Role &amp; tenure</span>
            </swim-card-header>
            <swim-card-body>
              <swim-select
                label="Role"
                .options=${ROLE_OPTIONS}
                placeholder="Select role"
                aria-label="Role"
              ></swim-select>
              <swim-slider
                label="Tenure (years)"
                min="0"
                max="20"
                step="1"
                .value="${this._tenureYears}"
                @change=${e => (this._tenureYears = Number(e.detail?.value ?? 3))}
                filled
                aria-valuemin="0"
                aria-valuemax="20"
                aria-valuenow="${this._tenureYears}"
                aria-valuetext="${this._tenureYears} years"
              ></swim-slider>
            </swim-card-body>
          </swim-card>
          <swim-card orientation="vertical" status="success" status-tooltip="Ready">
            <swim-card-placeholder size="medium">Case created</swim-card-placeholder>
          </swim-card>
        </div>
      </swim-section>

      <swim-section section-title="Assign HRBP, Manager, IT/Sec" section-collapsible="true">
        <div class="form-row">
          <swim-select
            label="HRBP"
            .options=${[]}
            placeholder="Select HRBP"
            hint="Human Resources Business Partner"
          ></swim-select>
          <swim-select label="Manager" .options=${[]} placeholder="Select manager"></swim-select>
          <swim-select label="IT / Security" .options=${[]} placeholder="Select IT/Sec"></swim-select>
        </div>
      </swim-section>
    `;
  }

  _renderInterview() {
    return html`
      <swim-section section-title="Pre-interview signals" section-collapsible="false">
        <div class="form-row">
          <swim-input label="Role" value="" placeholder="Role" disabled></swim-input>
          <swim-input label="Tenure" value="" placeholder="Years" disabled></swim-input>
          <swim-select label="Comp band" .options=${COMP_BAND_OPTIONS} placeholder="Select band"></swim-select>
          <swim-input label="Perf notes" type="textarea" placeholder="Performance notes" hint="Optional"></swim-input>
        </div>
      </swim-section>

      <swim-section section-title="Conduct exit interview" section-collapsible="false">
        <div class="decision-block" role="group" aria-labelledby="dec-regrettable">
          <div class="decision-label" id="dec-regrettable">Decision</div>
          <p><strong>Regrettable attrition?</strong></p>
          <swim-radio-group
            .value=${this._regrettable}
            @change=${e => (this._regrettable = e.detail)}
            name="regrettable"
            aria-label="Regrettable attrition"
          >
            <swim-radio value="yes">Yes → Retention evaluation (role/comp/promotion path)</swim-radio>
            <swim-radio value="no">No → Proceed with standard exit</swim-radio>
          </swim-radio-group>
        </div>
        <div class="decision-block" role="group" aria-labelledby="dec-compliance">
          <div class="decision-label" id="dec-compliance">Decision</div>
          <p><strong>Any compliance / safety concern raised?</strong></p>
          <swim-button-toggle-group
            .value=${this._privilegedAccess}
            @value-change=${e => (this._privilegedAccess = e.detail)}
            label="Compliance"
            aria-label="Compliance concern"
          >
            <swim-button-toggle value="yes">Yes → Escalate HR + Legal</swim-button-toggle>
            <swim-button-toggle value="no">No → Capture insights</swim-button-toggle>
          </swim-button-toggle-group>
        </div>
      </swim-section>

      <swim-section section-title="Capture insights" section-collapsible="true">
        <swim-input
          label="Themes / notes"
          type="textarea"
          placeholder="Exit themes and anonymized insights"
        ></swim-input>
      </swim-section>
    `;
  }

  _renderOffboarding() {
    return html`
      <swim-section section-title="Offboarding tracks" section-collapsible="false">
        <swim-button variant="bordered" @click=${this._openDrawer} aria-label="Open checklist details">
          Open details
          <swim-tooltip content="View checklist details in a drawer" placement="top">
            <swim-icon font-icon="info" alt="Info"></swim-icon>
          </swim-tooltip>
        </swim-button>
      </swim-section>

      <swim-section section-title="Privileged access?" section-collapsible="true">
        <swim-toggle
          label="Heightened monitoring + access reduction"
          ?checked=${this._heightenedMonitoring}
          @change=${e => (this._heightenedMonitoring = e.detail?.target?.checked ?? false)}
          aria-label="Heightened monitoring"
        ></swim-toggle>
        <p style="color: var(--grey-300); font-size: var(--font-size-s); margin-top: var(--spacing-8);">
          Yes → Heightened monitoring and access reduction options. No → Normal access schedule.
        </p>
      </swim-section>

      <swim-section section-title="Checklist progress" section-collapsible="false">
        <div class="split-wrap">
          <swim-split direction="row">
            <swim-split-area area-basis="1 1 50%">
              <swim-list
                column-layout="60px 1fr 100px"
                .headerLabels=${['#', 'Task', 'Status']}
                .columns=${['$index', 'task', 'status']}
                .dataSource=${LIST_SOURCE}
                default-row-status="success"
                height="280"
                aria-label="Offboarding checklist"
              ></swim-list>
            </swim-split-area>
            <swim-split-handle aria-label="Resize panes"></swim-split-handle>
            <swim-split-area area-basis="1 1 50%">
              <div style="padding: var(--spacing-16);">
                <h4 style="margin-top:0">Completion</h4>
                <swim-checkbox
                  label="Handover complete?"
                  ?checked=${this._handoverComplete}
                  @change=${e => (this._handoverComplete = e.detail?.target?.checked ?? false)}
                  aria-label="Handover complete"
                ></swim-checkbox>
                <swim-checkbox
                  label="All assets returned?"
                  ?checked=${this._assetsReturned}
                  @change=${e => (this._assetsReturned = e.detail?.target?.checked ?? false)}
                  aria-label="All assets returned"
                ></swim-checkbox>
                <swim-checkbox
                  label="All exit docs signed and payroll confirmed?"
                  ?checked=${this._docsSigned}
                  @change=${e => (this._docsSigned = e.detail?.target?.checked ?? false)}
                  aria-label="Docs signed and payroll confirmed"
                ></swim-checkbox>
              </div>
            </swim-split-area>
          </swim-split>
        </div>
      </swim-section>
    `;
  }

  _renderClose() {
    return html`
      <swim-section section-title="Close Exit Case" section-collapsible="false">
        <swim-card orientation="vertical">
          <swim-card-body>
            <p>
              When all offboarding tracks are complete and anonymized insights are captured, close the case and publish
              insights.
            </p>
            <swim-card-footer>
              <swim-button-group>
                <swim-button type="button" variant="bordered" @click=${() => {}}>Export insights</swim-button>
                <swim-button type="button" variant="primary" @click=${this._showCloseDialog}>
                  Close Exit Case
                </swim-button>
              </swim-button-group>
            </swim-card-footer>
          </swim-card-body>
        </swim-card>
      </swim-section>

      <swim-section section-title="Section with custom header" section-collapsible="true">
        <swim-section-header slot="header">
          <swim-icon font-icon="check" alt=""></swim-icon>
          <span>All paths converge here</span>
        </swim-section-header>
        <p>
          Retention evaluation, standard exit, escalation, handover, assets, and finance/legal all lead to closing the
          Exit Case and publishing anonymized insights.
        </p>
      </swim-section>
    `;
  }
}

export default EmployeeExitOffboardingWorkflowSolution;
