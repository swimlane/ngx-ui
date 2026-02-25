/**
 * Entity Verdict Widget Solution (CDN) – Turbine-compatible IOC / threat intel widget.
 *
 * Functional: Display IOC, risk score gauge, parsed JSON enrichment table, verdict (Malicious/Suspicious/Benign),
 * and a remediation (block) action. Reads from this.record, writes via this.updateRecordValue(), triggers playbook via this.triggerButton().
 *
 * Usage: Load as ES module; host (e.g. Swimlane Turbine) provides record, updateRecordValue, triggerButton.
 * Replace FIELD_IDS below with your application's field tracking IDs.
 *
 * CDN Imports:
 *   - SwimlaneElement, css, html → https://esm.sh/@swimlane/swimlane-element@2
 *   - lit-ui bundle → https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/lit-ui.js?v=1
 */
import { SwimlaneElement, css, html } from 'https://esm.sh/@swimlane/swimlane-element@2';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/lit-ui.js?v=1';

/* ========== Field mapping: replace with your Turbine field tracking IDs ========== */
const FIELD_IDS = {
  iocValue: 'tracking_id_ioc_value',
  riskScore: 'tracking_id_risk_score',
  enrichData: 'tracking_id_enrich_data',
  verdict: 'tracking_id_verdict',
  blockButton: 'tracking_id_block_btn'
};

const VERDICT_OPTIONS = [
  { value: 'malicious', label: 'Malicious' },
  { value: 'suspicious', label: 'Suspicious' },
  { value: 'benign', label: 'Benign' }
];

/** Default record for demo when not running inside Turbine */
const DEFAULT_RECORD = {
  [FIELD_IDS.iocValue]: '192.168.1.105',
  [FIELD_IDS.riskScore]: 72,
  [FIELD_IDS.enrichData]: JSON.stringify([
    { source: 'VirusTotal', detection: 'Malware', count: 8 },
    { source: 'CrowdStrike', detection: 'Suspicious', count: 2 },
    { source: 'AlienVault', detection: 'Malicious', count: 1 }
  ]),
  [FIELD_IDS.verdict]: 'suspicious'
};

/**
 * Parse enrichment JSON (string or object) into rows for swim-list.
 * Supports: array of objects, or object with nested key/value we flatten.
 */
function parseEnrichmentToRows(raw) {
  if (raw == null || raw === '') return [];
  let data = raw;
  if (typeof raw === 'string') {
    try {
      data = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  if (Array.isArray(data)) {
    return data.map((row, i) => ({ ...row, $index: i + 1 }));
  }
  if (typeof data === 'object' && data !== null) {
    const rows = [];
    let idx = 0;
    for (const [source, value] of Object.entries(data)) {
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        for (const [k, v] of Object.entries(value)) {
          rows.push({ source, key: k, value: String(v), $index: ++idx });
        }
      } else {
        rows.push({ source, key: 'value', value: String(value), $index: ++idx });
      }
    }
    return rows;
  }
  return [];
}

/**
 * Infer list columns and headers from first row keys (excluding $index).
 */
function inferColumnsAndHeaders(rows) {
  if (rows.length === 0) return { columns: [], headerLabels: [] };
  const first = rows[0];
  const keys = Object.keys(first).filter(k => k !== '$index');
  const headerLabels = keys.map(k => k.charAt(0).toUpperCase() + k.slice(1));
  return { columns: keys, headerLabels };
}

export default class EntityVerdictWidgetSolution extends SwimlaneElement {
  static get properties() {
    return {
      /** Record from Turbine (keyed by field tracking IDs). */
      record: { type: Object },
      /** Turbine API: (fieldId, value) => void */
      updateRecordValue: { type: Object },
      /** Turbine API: (buttonFieldId) => void */
      triggerButton: { type: Object }
    };
  }

  static styles = css`
    :host {
      display: block;
      padding: var(--spacing-16, 16px);
      box-sizing: border-box;
    }
    .entity-verdict {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-16, 16px);
    }
    .entity-verdict__ioc {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
    }
    .entity-verdict__risk-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-16, 16px);
    }
    .entity-verdict__risk-gauge {
      flex-shrink: 0;
    }
    .entity-verdict__risk-label {
      margin: 0;
      font-size: 0.875rem;
    }
    .entity-verdict__section-title {
      font-size: 0.875rem;
      font-weight: 600;
      margin: 0 0 var(--spacing-8, 8px);
    }
    .entity-verdict__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-12, 12px);
    }
    .entity-verdict__verdict-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-8, 8px);
    }
  `;

  constructor() {
    super();
    this.record = undefined;
    this.updateRecordValue = undefined;
    this.triggerButton = undefined;
    this._blockClickInProgress = false;
  }

  get _record() {
    return this.record && typeof this.record === 'object' ? this.record : DEFAULT_RECORD;
  }

  get _iocValue() {
    const v = this._record[FIELD_IDS.iocValue];
    return v != null ? String(v) : '—';
  }

  get _riskScore() {
    const n = Number(this._record[FIELD_IDS.riskScore]);
    return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0;
  }

  get _enrichRows() {
    const raw = this._record[FIELD_IDS.enrichData];
    return parseEnrichmentToRows(raw);
  }

  get _verdictValue() {
    const v = this._record[FIELD_IDS.verdict];
    return v != null ? String(v) : '';
  }

  get _listConfig() {
    const rows = this._enrichRows;
    return inferColumnsAndHeaders(rows);
  }

  _onVerdictChange(e) {
    const value = e.detail;
    if (typeof this.updateRecordValue === 'function') {
      this.updateRecordValue(FIELD_IDS.verdict, value);
    } else {
      this.record = { ...this._record, [FIELD_IDS.verdict]: value };
    }
  }

  _onBlockClick(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (this._blockClickInProgress) return;
    const fn = this.triggerButton;
    if (typeof fn !== 'function') return;
    this._blockClickInProgress = true;
    const fieldId = FIELD_IDS.blockButton;
    setTimeout(() => {
      try {
        fn(fieldId);
      } finally {
        this._blockClickInProgress = false;
      }
    }, 0);
  }

  render() {
    const { columns, headerLabels } = this._listConfig;
    const enrichRows = this._enrichRows;

    return html`
      <main class="entity-verdict" role="main" aria-label="Entity verdict and enrichment">
        <header>
          <h2 class="entity-verdict__ioc" id="entity-verdict-ioc">${this._iocValue}</h2>
          <p class="entity-verdict__risk-label" id="entity-verdict-ioc-desc">Indicator of Compromise</p>
        </header>

        <section aria-labelledby="entity-verdict-risk-title">
          <h3 class="entity-verdict__section-title" id="entity-verdict-risk-title">Risk score</h3>
          <div class="entity-verdict__risk-row">
            <div class="entity-verdict__risk-gauge" aria-hidden="true">
              <swim-progress-spinner
                mode="determinate"
                value="${this._riskScore}"
                total="100"
                diameter="80"
                stroke-width="6"
                color="var(--blue-500, #2196f3)"
              ></swim-progress-spinner>
            </div>
            <p class="entity-verdict__risk-label" aria-live="polite">${this._riskScore} / 100</p>
          </div>
        </section>

        <section class="entity-verdict__verdict-group" aria-labelledby="entity-verdict-verdict-title">
          <h3 class="entity-verdict__section-title" id="entity-verdict-verdict-title">Verdict</h3>
          <swim-radio-group
            .value="${this._verdictValue}"
            name="verdict"
            aria-label="Set verdict: Malicious, Suspicious, or Benign"
            @change="${this._onVerdictChange}"
          >
            ${VERDICT_OPTIONS.map(opt => html` <swim-radio value="${opt.value}">${opt.label}</swim-radio> `)}
          </swim-radio-group>
        </section>

        <section aria-labelledby="entity-verdict-enrich-title">
          <h3 class="entity-verdict__section-title" id="entity-verdict-enrich-title">Enrichment data</h3>
          ${enrichRows.length
            ? html`
                <swim-list
                  .dataSource="${enrichRows}"
                  .headerLabels="${headerLabels}"
                  .columns="${columns}"
                  height="200"
                  default-row-status="error"
                ></swim-list>
              `
            : html`<p class="entity-verdict__risk-label">No enrichment data available.</p>`}
        </section>

        <section class="entity-verdict__actions" aria-label="Remediation actions">
          <swim-button variant="danger" @click="${this._onBlockClick}" aria-label="Launch block remediation playbook">
            Block entity
          </swim-button>
        </section>
      </main>
    `;
  }
}
