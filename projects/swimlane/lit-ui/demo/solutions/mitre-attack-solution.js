/**
 * MITRE ATT&CK Security Orchestration Solution (CDN)
 *
 * Fetches Enterprise ATT&CK techniques from the official MITRE CTI JSON;
 * lists them in a left sidebar. Selecting a technique shows details in a
 * tabbed main area (Overview, References) and supports
 * a drawer for full description and links.
 *
 * Usage: Load this module and use <mitre-attack-solution></mitre-attack-solution>
 * in a page that registers the default export. No customElements.define() —
 * registration handled by Swimlane platform.
 *
 * Imports:
 *   - SwimlaneElement, css, html → https://esm.sh/@swimlane/swimlane-element@2
 *   - repeat → https://esm.sh/lit@2/directives/repeat.js
 *   - lit-ui → https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/<name>.js
 */
import { SwimlaneElement, css, html } from 'https://esm.sh/@swimlane/swimlane-element@2';
import { repeat } from 'https://esm.sh/lit@2/directives/repeat.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/button.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/drawer.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/input.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/progress-spinner.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/section.js';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/tabs.js';

const MITRE_ENTERPRISE_ATTACK_URL =
  'https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json';

/** @typedef {{ id: string; name: string; description: string; url: string; externalId: string; tacticNames: string[]; platforms: string[] }} Technique */

export default class MitreAttackSolution extends SwimlaneElement {
  static get properties() {
    return {
      techniques: { type: Array },
      selectedTechnique: { type: Object },
      loading: { type: Boolean },
      loadError: { type: String },
      _selectedIndex: { type: Number },
      _detailTabIndex: { type: Number },
      _drawerOpen: { type: Boolean }
    };
  }

  constructor() {
    super();
    /** @type {Technique[]} */
    this.techniques = [];
    /** @type {Technique | null} */
    this.selectedTechnique = null;
    this.loading = true;
    /** @type {string} */
    this.loadError = '';
    /** @type {number} */
    this._selectedIndex = -1;
    /** @type {number} */
    this._detailTabIndex = 0;
    this._drawerOpen = false;
    /** @type {AbortController | null} */
    this._fetchController = null;
    /** @type {(e: Event) => void} */
    this._selectTechniqueTabBound = e => this._onSelectTechniqueTab(e);
    /** @type {(e: Event) => void} */
    this._selectDetailTabBound = e => this._onSelectDetailTab(e);
    /** @type {(e: Event) => void} */
    this._closeDrawerBound = () => this._closeDrawer();
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        min-height: 320px;
      }
      .layout {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .master-detail {
        display: flex;
        flex: 1;
        min-height: 0;
      }
      .sidebar {
        flex: 0 0 260px;
        width: 260px;
        min-width: 200px;
        max-width: 320px;
        display: flex;
        flex-direction: column;
        overflow: auto;
      }
      .sidebar swim-tabs {
        flex: 1;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .sidebar-header {
        padding: var(--spacing-16, 16px);
        font-weight: 600;
        flex-shrink: 0;
      }
      .detail {
        flex: 1;
        min-width: 0;
        padding: var(--spacing-16, 16px);
        overflow: auto;
      }
      .loading-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-16, 16px);
        padding: var(--spacing-32, 32px);
        min-height: 200px;
      }
      .detail-tabs-wrap {
        display: block;
      }
      .detail-panel {
        padding: var(--spacing-16, 16px) 0;
      }
      .overview-grid {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-24, 24px);
      }
      .overview-desc {
        margin: 0;
        white-space: pre-wrap;
      }
      .ref-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .ref-item {
        padding: var(--spacing-12, 12px) 0;
      }
      .ref-item:last-child {
        border-bottom: none;
      }
      .drawer-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: var(--spacing-16, 16px);
      }
      .drawer-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--spacing-16, 16px);
        flex-shrink: 0;
        margin-bottom: var(--spacing-16, 16px);
      }
      .drawer-header h3 {
        margin: 0;
        flex: 1;
      }
      .drawer-body {
        flex: 1;
        min-height: 0;
        overflow: auto;
      }
      .drawer-desc {
        margin: 0 0 var(--spacing-16, 16px);
        white-space: pre-wrap;
      }
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      @media (max-width: 640px) {
        .master-detail {
          flex-direction: column;
        }
        .sidebar {
          max-height: 200px;
        }
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadTechniques();
  }

  disconnectedCallback() {
    if (this._fetchController) {
      this._fetchController.abort();
      this._fetchController = null;
    }
    const techniqueTabs = this.shadowRoot?.querySelector('#technique-tabs');
    if (techniqueTabs) {
      techniqueTabs.removeEventListener('select-tab', this._selectTechniqueTabBound);
      techniqueTabs.removeEventListener('select', this._selectTechniqueTabBound);
    }
    const detailTabs = this.shadowRoot?.querySelector('#detail-tabs');
    if (detailTabs) {
      detailTabs.removeEventListener('select-tab', this._selectDetailTabBound);
      detailTabs.removeEventListener('select', this._selectDetailTabBound);
    }
    super.disconnectedCallback();
  }

  async _loadTechniques() {
    this.loading = true;
    this.loadError = '';
    this.techniques = [];
    this.selectedTechnique = null;
    this._selectedIndex = -1;
    this._fetchController = new AbortController();
    this.requestUpdate();

    try {
      const res = await fetch(MITRE_ENTERPRISE_ATTACK_URL, {
        signal: this._fetchController.signal
      });
      if (!res.ok) throw new Error(res.statusText);
      const bundle = await res.json();
      this._fetchController = null;

      const objects = bundle.objects || [];
      const tacticsById = {};
      for (const obj of objects) {
        if (obj.type === 'x-mitre-tactic' && obj.id) {
          tacticsById[obj.id] = obj.name || obj.external_references?.[0]?.external_id || obj.id;
        }
      }

      const techniques = [];
      for (const obj of objects) {
        if (obj.type !== 'attack-pattern' || obj.x_mitre_deprecated) continue;
        const mitreRef = (obj.external_references || []).find(r => r.source_name === 'mitre-attack');
        const externalId = mitreRef?.external_id || '';
        if (!externalId) continue;
        const tacticNames = (obj.kill_chain_phases || [])
          .map(p => tacticsById[p.phase_id] || p.phase_name)
          .filter(Boolean);
        techniques.push({
          id: obj.id,
          name: obj.name || externalId,
          description: obj.description || '',
          url: mitreRef?.url || `https://attack.mitre.org/techniques/${externalId.replace('.', '/')}`,
          externalId,
          tacticNames,
          platforms: obj.x_mitre_platforms || []
        });
      }

      this.techniques = techniques;
      if (techniques.length > 0) {
        this._selectedIndex = 0;
        this.selectedTechnique = techniques[0];
      }
    } catch (err) {
      if (err?.name === 'AbortError') return;
      this.loadError = err?.message || 'Failed to load MITRE ATT&CK data';
      console.error('MITRE ATT&CK load error', err);
    } finally {
      this.loading = false;
      this.requestUpdate();
    }
  }

  _onSelectTechniqueTab(e) {
    const detail = e.detail;
    const tab = detail?.tab;
    if (!tab || !this.techniques.length) return;
    const idx = this.techniques.findIndex(t => String(t.externalId) === String(tab.getAttribute('data-technique-id')));
    if (idx < 0) return;
    this._selectedIndex = idx;
    this.selectedTechnique = this.techniques[idx];
    this._detailTabIndex = 0;
    this.requestUpdate();
  }

  _onSelectDetailTab(e) {
    const detail = e.detail;
    const tab = detail?.tab;
    if (!tab) return;
    const tabId = tab.getAttribute('data-detail-tab');
    const map = { overview: 0, references: 1 };
    if (tabId in map) this._detailTabIndex = map[tabId];
    this.requestUpdate();
  }

  _closeDrawer() {
    this._drawerOpen = false;
    this.requestUpdate();
  }

  _openDrawer() {
    this._drawerOpen = true;
    this.requestUpdate();
  }

  _techniqueTabId(t) {
    return `tech-${t.externalId.replace(/\./g, '-')}`;
  }

  /** Short label for sidebar tab; ellipsis in component handles overflow. */
  _techniqueTabLabel(tech) {
    return `${tech.externalId} ${tech.name || ''}`.trim();
  }

  render() {
    if (this.loading) {
      return html`
        <main class="layout" role="main" aria-busy="true" aria-label="Loading MITRE ATT&CK">
          <div class="loading-wrap">
            <swim-progress-spinner
              mode="indeterminate"
              spinner-label="Loading MITRE ATT&CK techniques…"
            ></swim-progress-spinner>
          </div>
        </main>
      `;
    }

    if (this.loadError) {
      return html`
        <main class="layout" role="main" aria-label="MITRE ATT&CK">
          <div class="loading-wrap">
            <p>${this.loadError}</p>
            <swim-button variant="primary" @click=${() => this._loadTechniques()}>Retry</swim-button>
          </div>
        </main>
      `;
    }

    return html`
      <main class="layout" role="main" aria-label="MITRE ATT&CK techniques and details">
        <div class="master-detail">
          <aside class="sidebar" role="navigation" aria-label="MITRE ATT&CK techniques">
            <header class="sidebar-header">Techniques</header>
            <swim-tabs
              id="technique-tabs"
              vertical
              @select-tab=${this._selectTechniqueTabBound}
              @select=${this._selectTechniqueTabBound}
            >
              ${repeat(
                this.techniques,
                t => t.id,
                (tech, i) => html`
                  <swim-tab
                    tab-id="${this._techniqueTabId(tech)}"
                    id="panel-${tech.externalId.replace(/\./g, '-')}"
                    label="${this._techniqueTabLabel(tech)}"
                    tab-title="${tech.name || tech.externalId}"
                    ?active=${i === this._selectedIndex}
                    data-technique-id="${tech.externalId}"
                  ></swim-tab>
                `
              )}
            </swim-tabs>
          </aside>
          <div class="detail" role="region" aria-label="Technique details">${this._renderDetail()}</div>
        </div>
        ${this._renderDrawer()}
      </main>
    `;
  }

  _renderDetail() {
    const t = this.selectedTechnique;
    if (!t) {
      return html`<p>Select a technique.</p>`;
    }

    return html`
      <div class="detail-tabs-wrap">
        <swim-tabs id="detail-tabs" @select-tab=${this._selectDetailTabBound} @select=${this._selectDetailTabBound}>
          <swim-tab
            tab-id="detail-overview"
            label="Overview"
            ?active=${this._detailTabIndex === 0}
            data-detail-tab="overview"
          >
            <div class="detail-panel" role="tabpanel" aria-labelledby="tab-overview">
              <h2 class="visually-hidden">Overview</h2>
              <div class="overview-grid">
                <swim-section section-title="Technique" section-collapsible>
                  <swim-input label="ID" .value=${t.externalId} readonly></swim-input>
                  <swim-input label="Name" .value=${t.name} readonly></swim-input>
                  ${t.platforms?.length
                    ? html`<swim-input label="Platforms" .value=${t.platforms.join(', ')} readonly></swim-input>`
                    : ''}
                </swim-section>
                <swim-section section-title="Description" section-collapsible>
                  <p class="overview-desc">${t.description || 'No description.'}</p>
                </swim-section>
                <swim-section section-title="Quick link" section-collapsible>
                  <swim-button variant="bordered" @click=${() => window.open(t.url, '_blank')}
                    >Open technique page</swim-button
                  >
                </swim-section>
              </div>
            </div>
          </swim-tab>
          <swim-tab
            tab-id="detail-references"
            label="References"
            ?active=${this._detailTabIndex === 1}
            data-detail-tab="references"
          >
            <div class="detail-panel" role="tabpanel" aria-labelledby="tab-references">
              <h2 class="visually-hidden">References</h2>
              <swim-section section-title="MITRE ATT&CK" section-collapsible>
                <p><a href="${t.url}" target="_blank" rel="noopener noreferrer">${t.url}</a></p>
              </swim-section>
              <swim-section section-title="More details" section-collapsible>
                <swim-button variant="primary" @click=${this._openDrawer.bind(this)}
                  >Open full description in drawer</swim-button
                >
              </swim-section>
              ${t.tacticNames?.length
                ? html`
                    <swim-section section-title="Tactics" section-collapsible>
                      <ul class="ref-list">
                        ${repeat(
                          t.tacticNames,
                          n => n,
                          name => html`<li class="ref-item">${name}</li>`
                        )}
                      </ul>
                    </swim-section>
                  `
                : ''}
            </div>
          </swim-tab>
        </swim-tabs>
      </div>
    `;
  }

  _renderDrawer() {
    const t = this.selectedTechnique;
    return html`
      <swim-drawer
        ?open=${this._drawerOpen}
        direction="right"
        size="50"
        close-on-outside-click
        is-root
        @close=${this._closeDrawerBound}
        aria-label="Full technique details"
      >
        ${t
          ? html`
              <div class="drawer-content">
                <div class="drawer-header">
                  <h3>${t.externalId} — ${t.name}</h3>
                  <swim-button variant="bordered" size="small" @click=${this._closeDrawerBound}>Close</swim-button>
                </div>
                <div class="drawer-body">
                  <p class="drawer-desc">${t.description || 'No description.'}</p>
                  <p><a href="${t.url}" target="_blank" rel="noopener noreferrer">${t.url}</a></p>
                  ${t.tacticNames?.length
                    ? html`
                        <ul class="ref-list">
                          ${repeat(
                            t.tacticNames,
                            n => n,
                            name => html`<li class="ref-item">${name}</li>`
                          )}
                        </ul>
                      `
                    : ''}
                </div>
              </div>
            `
          : ''}
      </swim-drawer>
    `;
  }
}
