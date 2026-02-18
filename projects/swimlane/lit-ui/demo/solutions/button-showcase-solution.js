/**
 * Button Showcase Solution (CDN) – single .js ES module.
 *
 * Demonstrates every swim-button feature: variants, sizes, states,
 * promise-based loading, disabled, and combined examples.
 *
 * Usage:
 *   <script type="module" src="button-showcase-solution.js"></script>
 *   <button-showcase-solution></button-showcase-solution>
 *
 * Imports (full CDN URLs – no import map required):
 *   - SwimlaneElement, css, html  → https://esm.sh/@swimlane/swimlane-element@1
 *   - lit-ui: either load the full bundle (lit-ui.js) or only the components used here:
 *     e.g. button.js + section.js for minimal payload:
 *     https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/button.js
 *     https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/section.js
 *     Or use lit-ui.js for all components.
 */
import { SwimlaneElement, css, html } from 'https://esm.sh/@swimlane/swimlane-element@1';

import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/button.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/section.js';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const VARIANTS = [
  { name: 'default', label: 'Default' },
  { name: 'primary', label: 'Primary' },
  { name: 'warning', label: 'Warning' },
  { name: 'danger', label: 'Danger' },
  { name: 'link', label: 'Link' },
  { name: 'bordered', label: 'Bordered' }
];

const SIZES = [
  { name: 'small', label: 'Small' },
  { name: 'medium', label: 'Medium' },
  { name: 'large', label: 'Large' }
];

const STATES = [
  { name: 'active', label: 'Active (default)' },
  { name: 'in-progress', label: 'In Progress' },
  { name: 'success', label: 'Success' },
  { name: 'fail', label: 'Fail' }
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

class ButtonShowcaseSolution extends SwimlaneElement {
  static get properties() {
    return {
      /** Tracks how many promise demos are running so we can show status text */
      _promiseStatus: { type: String, state: true }
    };
  }

  constructor() {
    super();
    this._promiseStatus = '';
  }

  /* ---- Styles ---------------------------------------------------- */

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--font-family, 'Source Sans Pro', sans-serif);
        font-size: var(--font-size-m, 1rem);
        color: var(--grey-050, #ebedf2);
        --showcase-spacing: var(--spacing-16, 16px);
        --showcase-radius: var(--radius-4, 4px);
      }

      /* Layout */
      .showcase-root {
        max-width: 960px;
        margin: 0 auto;
        padding: var(--showcase-spacing);
      }

      .showcase-header {
        margin-bottom: var(--spacing-24, 24px);
      }

      .showcase-title {
        font-size: 1.75rem;
        font-weight: var(--font-weight-bold, 700);
        margin: 0 0 0.25rem;
        color: var(--blue-400, #1483ff);
      }

      .showcase-subtitle {
        font-size: 0.95rem;
        color: var(--grey-300, #72819f);
        margin: 0;
      }

      /* Grid & Row */
      .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: var(--showcase-spacing);
        padding: var(--showcase-spacing) 0;
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
        gap: var(--showcase-spacing);
        padding: var(--showcase-spacing) 0;
      }

      /* Matrix table for size × variant */
      .matrix {
        width: 100%;
        border-collapse: separate;
        border-spacing: 12px;
      }

      .matrix th {
        text-align: left;
        font-size: var(--font-size-xxs, 0.625rem);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--grey-300, #72819f);
        font-weight: var(--font-weight-bold, 700);
        padding-bottom: 4px;
      }

      .matrix td {
        padding: 6px 0;
      }

      /* Status text for promise demo */
      .status-text {
        font-size: 0.85rem;
        color: var(--grey-300, #72819f);
        min-height: 1.4em;
        margin-top: 0.5rem;
      }

      /* Code block */
      .code-block {
        background: var(--grey-800, #1b1e27);
        padding: 1rem;
        border-radius: var(--showcase-radius);
        overflow-x: auto;
        font-family: 'Fira Code', 'Menlo', monospace;
        font-size: 0.8rem;
        line-height: 1.5;
        color: var(--grey-200, #a0aabe);
        white-space: pre;
        margin: 0;
      }

      /* Section spacing */
      .section-gap {
        margin-bottom: var(--spacing-24, 24px);
      }

      p.hint {
        color: var(--grey-300, #72819f);
        margin: 0 0 0.75rem;
        font-size: 0.9rem;
      }
    `;
  }

  /* ---- Promise demo handlers ------------------------------------ */

  _handlePromise(type) {
    const delay = type === 'slow' ? 5000 : 1500;
    const shouldReject = type === 'fail';

    return e => {
      const btn = e.currentTarget;
      this._promiseStatus = `${
        type === 'slow' ? 'Slow operation' : type === 'fail' ? 'Failure demo' : 'Success demo'
      } running…`;

      btn.promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldReject) {
            reject(new Error('Simulated failure'));
          } else {
            resolve();
          }
        }, delay);
      });

      btn.promise
        .then(() => {
          this._promiseStatus = `Promise resolved – button returns to active after timeout.`;
        })
        .catch(() => {
          this._promiseStatus = `Promise rejected – button shows fail state, then returns to active.`;
        });
    };
  }

  /* ---- Render ---------------------------------------------------- */

  render() {
    return html`
      <div class="showcase-root">
        <!-- Header -->
        <header class="showcase-header">
          <h1 class="showcase-title">Button Showcase</h1>
          <p class="showcase-subtitle">
            Demonstrates every <code>swim-button</code> feature: variants, sizes, states, promise-based loading,
            disabled, and combined examples.
          </p>
        </header>

        <!-- 1. Variants -->
        <section class="section-gap" aria-label="Button variants">
          <swim-section section-title="Variants">
            <div class="demo-grid">
              ${VARIANTS.map(
                v => html`
                  <div class="demo-item">
                    <span class="demo-label">${v.label}</span>
                    <swim-button variant=${v.name}>${v.label} Button</swim-button>
                  </div>
                `
              )}
            </div>
          </swim-section>
        </section>

        <!-- 2. Sizes -->
        <section class="section-gap" aria-label="Button sizes">
          <swim-section section-title="Sizes">
            <div class="demo-row">
              ${SIZES.map(s => html` <swim-button size=${s.name} variant="primary">${s.label}</swim-button> `)}
            </div>
          </swim-section>
        </section>

        <!-- 3. States -->
        <section class="section-gap" aria-label="Button states">
          <swim-section section-title="States">
            <div class="demo-grid">
              ${STATES.map(
                st => html`
                  <div class="demo-item">
                    <span class="demo-label">${st.label}</span>
                    <swim-button state=${st.name} variant="primary">${st.label}</swim-button>
                  </div>
                `
              )}
              <div class="demo-item">
                <span class="demo-label">Disabled</span>
                <swim-button disabled variant="primary">Disabled</swim-button>
              </div>
            </div>
          </swim-section>
        </section>

        <!-- 4. Promise-based loading -->
        <section class="section-gap" aria-label="Promise handling demo">
          <swim-section section-title="Interactive – Promise Handling">
            <p class="hint">
              Click a button to trigger a simulated async operation. The button automatically transitions through
              <em>in-progress → success/fail → active</em>.
            </p>
            <div class="demo-row">
              <swim-button
                variant="primary"
                aria-label="Simulate successful promise"
                @click=${this._handlePromise('success')}
                >Click for Success</swim-button
              >

              <swim-button variant="danger" aria-label="Simulate failed promise" @click=${this._handlePromise('fail')}
                >Click for Failure</swim-button
              >

              <swim-button
                variant="warning"
                .timeout=${5000}
                aria-label="Simulate slow five-second operation"
                @click=${this._handlePromise('slow')}
                >Slow Operation (5 s)</swim-button
              >
            </div>
            <div class="status-text" role="status" aria-live="polite">${this._promiseStatus}</div>
          </swim-section>
        </section>

        <!-- 5. Size × Variant matrix -->
        <section class="section-gap" aria-label="Size and variant matrix">
          <swim-section section-title="Size × Variant Matrix">
            <table class="matrix" role="grid" aria-label="Button sizes and variants">
              <thead>
                <tr>
                  <th scope="col"></th>
                  ${VARIANTS.map(v => html`<th scope="col">${v.label}</th>`)}
                </tr>
              </thead>
              <tbody>
                ${SIZES.map(
                  s => html`
                    <tr>
                      <th scope="row">${s.label}</th>
                      ${VARIANTS.map(
                        v => html`
                          <td>
                            <swim-button size=${s.name} variant=${v.name}>${v.label}</swim-button>
                          </td>
                        `
                      )}
                    </tr>
                  `
                )}
              </tbody>
            </table>
          </swim-section>
        </section>

        <!-- 6. Disabled variants -->
        <section class="section-gap" aria-label="Disabled buttons">
          <swim-section section-title="Disabled Variants">
            <div class="demo-row">
              ${VARIANTS.map(v => html` <swim-button disabled variant=${v.name}>${v.label}</swim-button> `)}
            </div>
          </swim-section>
        </section>

        <!-- 7. Usage / Code -->
        <section class="section-gap" aria-label="Usage code example">
          <swim-section section-title="Usage">
            <p class="hint">Import and use the button component:</p>
            <pre class="code-block"><code>&lt;swim-button variant="primary"&gt;Click Me&lt;/swim-button&gt;

&lt;!-- Sizes --&gt;
&lt;swim-button size="small" variant="primary"&gt;Small&lt;/swim-button&gt;
&lt;swim-button size="large" variant="danger"&gt;Large Danger&lt;/swim-button&gt;

&lt;!-- Disabled --&gt;
&lt;swim-button disabled variant="primary"&gt;Cannot Click&lt;/swim-button&gt;

&lt;!-- Promise-based state (JavaScript) --&gt;
&lt;script&gt;
  const btn = document.querySelector('swim-button');
  btn.addEventListener('click', () =&gt; {
    btn.promise = fetch('/api/data');
  });
&lt;/script&gt;</code></pre>
          </swim-section>
        </section>

        <!-- 8. API reference -->
        <section class="section-gap" aria-label="API reference">
          <swim-section section-title="API Reference">
            <table class="matrix" role="table" aria-label="swim-button API">
              <thead>
                <tr>
                  <th scope="col">Property</th>
                  <th scope="col">Type</th>
                  <th scope="col">Default</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>variant</td>
                  <td>'default' | 'primary' | 'warning' | 'danger' | 'link' | 'bordered'</td>
                  <td>'default'</td>
                  <td>Button style variant</td>
                </tr>
                <tr>
                  <td>size</td>
                  <td>'small' | 'medium' | 'large'</td>
                  <td>'medium'</td>
                  <td>Button size</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Prevents interaction</td>
                </tr>
                <tr>
                  <td>state</td>
                  <td>'active' | 'in-progress' | 'success' | 'fail'</td>
                  <td>'active'</td>
                  <td>Visual/loading state</td>
                </tr>
                <tr>
                  <td>promise</td>
                  <td>Promise | undefined</td>
                  <td>undefined</td>
                  <td>Auto-manages state from promise lifecycle</td>
                </tr>
                <tr>
                  <td>timeout</td>
                  <td>number</td>
                  <td>3000</td>
                  <td>ms before returning to active after success/fail</td>
                </tr>
                <tr>
                  <td>type</td>
                  <td>'button' | 'submit' | 'reset'</td>
                  <td>'button'</td>
                  <td>HTML button type</td>
                </tr>
              </tbody>
            </table>
          </swim-section>
        </section>
      </div>
    `;
  }
}

/* No document/window listeners or timers – no cleanup needed beyond
   what SwimlaneElement and swim-* components handle internally. */

customElements.define('button-showcase-solution', ButtonShowcaseSolution);
