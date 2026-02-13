/**
 * SOC Incident Response Workflow Solution (CDN) – works as a single .js file.
 * Phishing → Token Theft → Suspicious Mailbox Rules
 *
 * Usage: Load this file as an ES module (no import map needed for this file’s own imports).
 *   <script type="module" src="soc-incident-response-workflow-solution.js"></script>
 *   <soc-incident-response-workflow-solution></soc-incident-response-workflow-solution>
 *
 * Imports (all full URLs so the .js works standalone):
 * - SwimlaneElement, css, html from esm.sh
 *
 * Context: Lit elements (swim-*) are imported in another Lit component (the host/widget shell).
 * This solution is dynamically injected as a widget, so it must NOT import the lit-ui bundle —
 * the host already registered swim-* in the same CustomElementRegistry. For standalone demos,
 * the page must load lit-ui before this module.
 */
import { SwimlaneElement, css, html } from 'https://esm.sh/@swimlane/swimlane-element@1';

const workflowPhases = [
  { id: 'alert', title: 'Alert', desc: 'Unusual OAuth consent + impossible travel' },
  { id: 'triage', title: 'Triage', desc: 'Validate alert + enrich context' },
  { id: 'evidence', title: 'Evidence', desc: 'IdP logs, M365 audit, EDR, SIEM' },
  { id: 'containment', title: 'Containment', desc: 'Revoke sessions/tokens + reset password' },
  { id: 'remediation', title: 'Remediation', desc: 'Rules, forwarding, or CA policies + MFA rebind' },
  { id: 'recovery', title: 'Recovery', desc: 'Validate access restored + monitor' },
  { id: 'post', title: 'Post-incident', desc: 'Lessons learned + detection tuning' },
  { id: 'close', title: 'Close', desc: 'Document RCA, MTTR, actions, approvals' }
];

/**
 * SOC Incident Response Workflow – interactive runbook using Swimlane Lit components.
 * No document/window listeners or timers; cleanup not required beyond component teardown.
 */
class SocIncidentResponseWorkflowSolution extends SwimlaneElement {
  static get properties() {
    return {};
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
        max-width: 900px;
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

      .workflow-tabs-wrapper {
        margin-top: var(--workflow-spacing);
      }

      .phase-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .phase-list li {
        padding: var(--spacing-8) 0;
        border-bottom: 1px solid var(--grey-700, #1c2029);
        display: flex;
        align-items: baseline;
        gap: var(--spacing-8);
      }

      .phase-list li:last-child {
        border-bottom: none;
      }

      .phase-num {
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background: var(--blue-500, #1483ff);
        color: var(--white);
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: var(--font-weight-semibold);
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .phase-title {
        font-weight: var(--font-weight-semibold);
        color: var(--grey-050);
      }

      .phase-desc {
        color: var(--grey-300);
        font-size: var(--font-size-s);
      }

      .decision-block {
        margin: var(--workflow-spacing) 0;
        padding: var(--workflow-spacing);
        background: var(--grey-800, #1c2029);
        border-radius: var(--workflow-radius);
        border-left: 4px solid var(--orange-500, #ffa814);
      }

      .decision-label {
        font-size: var(--font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--orange-400, #ffbb47);
        margin-bottom: var(--spacing-4);
      }

      .decision-outcomes {
        display: flex;
        flex-wrap: wrap;
        gap: var(--workflow-spacing);
        margin-top: var(--spacing-8);
      }

      .outcome {
        flex: 1 1 200px;
        padding: var(--spacing-8);
        background: var(--grey-750, #212631);
        border-radius: var(--workflow-radius);
      }

      .outcome strong {
        color: var(--blue-300, #7ab9ff);
      }

      .step-card {
        margin-bottom: var(--workflow-spacing);
      }

      .branch-note {
        font-size: var(--font-size-s);
        color: var(--grey-400);
        margin-top: var(--spacing-8);
        font-style: italic;
      }

      :host([hidden]) {
        display: none;
      }
    `;
  }

  render() {
    return html`
      <main class="workflow-root" role="main" aria-label="SOC incident response workflow">
        <header class="workflow-header">
          <h1 class="workflow-title">SOC Incident Response Workflow</h1>
          <p class="workflow-subtitle">Phishing → Token Theft → Suspicious Mailbox Rules</p>
        </header>

        <div class="workflow-tabs-wrapper" role="region" aria-label="Workflow phases">
          <swim-tabs>
            <swim-tab label="Overview" active> ${this._renderOverview()} </swim-tab>
            <swim-tab label="Triage"> ${this._renderTriage()} </swim-tab>
            <swim-tab label="Evidence & containment"> ${this._renderEvidenceContainment()} </swim-tab>
            <swim-tab label="Remediation"> ${this._renderRemediation()} </swim-tab>
            <swim-tab label="Recovery & close"> ${this._renderRecoveryClose()} </swim-tab>
          </swim-tabs>
        </div>
      </main>
    `;
  }

  _renderOverview() {
    return html`
      <swim-section section-title="Workflow phases" section-collapsible="false">
        <ul class="phase-list" role="list">
          ${workflowPhases.map(
            (p, i) => html`
              <li>
                <span class="phase-num" aria-hidden="true">${i + 1}</span>
                <span class="phase-title">${p.title}</span>
                <span class="phase-desc">— ${p.desc}</span>
              </li>
            `
          )}
        </ul>
      </swim-section>
    `;
  }

  _renderTriage() {
    return html`
      <swim-section section-title="Alert" section-collapsible="false">
        <swim-card class="step-card">
          <swim-card-body>
            <p><strong>Unusual OAuth consent + impossible travel</strong></p>
            <p>Initial alert that triggers the workflow.</p>
          </swim-card-body>
        </swim-card>
      </swim-section>

      <swim-section section-title="Triage" section-collapsible="false">
        <swim-card class="step-card">
          <swim-card-body>
            <p>Validate alert and enrich context (user, device, geo, IdP).</p>
          </swim-card-body>
        </swim-card>
      </swim-section>

      <div class="decision-block" role="group" aria-labelledby="decision-priv">
        <div class="decision-label" id="decision-priv">Decision</div>
        <p><strong>Is user a privileged account?</strong></p>
        <div class="decision-outcomes">
          <div class="outcome"><strong>Yes</strong> → Escalate priority and assign L2/L3.</div>
          <div class="outcome"><strong>No</strong> → Proceed with standard triage.</div>
        </div>
      </div>
    `;
  }

  _renderEvidenceContainment() {
    return html`
      <swim-section section-title="Collect evidence" section-collapsible="false">
        <swim-card class="step-card">
          <swim-card-body>
            <p>Collect evidence: IdP logs, M365 audit, EDR, SIEM.</p>
          </swim-card-body>
        </swim-card>
      </swim-section>

      <div class="decision-block" role="group" aria-labelledby="decision-evidence">
        <div class="decision-label" id="decision-evidence">Decision</div>
        <p><strong>Evidence shows active session or token abuse?</strong></p>
        <div class="decision-outcomes">
          <div class="outcome"><strong>Yes</strong> → Containment: revoke sessions/tokens and reset password.</div>
          <div class="outcome"><strong>No</strong> → Investigate further: device posture and geo/IP reputation.</div>
        </div>
      </div>

      <swim-section section-title="Optional branch" section-collapsible="true">
        <p>If evidence was "No", then:</p>
        <div class="decision-block" role="group" aria-labelledby="decision-consent">
          <div class="decision-label" id="decision-consent">Decision</div>
          <p><strong>User confirms suspicious consent prompt?</strong></p>
          <div class="decision-outcomes">
            <div class="outcome">
              <strong>Yes</strong> → Go to containment (revoke sessions/tokens + reset password).
            </div>
            <div class="outcome"><strong>No</strong> → False positive: close with notes and tune threshold.</div>
          </div>
        </div>
      </swim-section>
    `;
  }

  _renderRemediation() {
    return html`
      <div class="decision-block" role="group" aria-labelledby="decision-mailbox">
        <div class="decision-label" id="decision-mailbox">Decision</div>
        <p><strong>Mailbox rules or forwarding found?</strong></p>
        <div class="decision-outcomes">
          <div class="outcome"><strong>Yes</strong> → Remediate: remove rules, block forwarding, hunt for exfil.</div>
          <div class="outcome"><strong>No</strong> → Remediate: tighten CA policies and MFA rebind.</div>
        </div>
      </div>

      <swim-section section-title="Remediation actions" section-collapsible="false">
        <swim-card class="step-card">
          <swim-card-body>
            <p>
              <strong>If rules/forwarding found:</strong> Remove malicious rules, block forwarding, hunt for
              exfiltration.
            </p>
          </swim-card-body>
        </swim-card>
        <swim-card class="step-card">
          <swim-card-body>
            <p><strong>If no rules:</strong> Tighten Conditional Access policies and MFA rebind.</p>
          </swim-card-body>
        </swim-card>
      </swim-section>
    `;
  }

  _renderRecoveryClose() {
    return html`
      <swim-section section-title="Recovery" section-collapsible="false">
        <swim-card class="step-card">
          <swim-card-body>
            <p>Validate access restored and monitor for recurrence.</p>
          </swim-card-body>
        </swim-card>
      </swim-section>

      <swim-section section-title="Post-incident" section-collapsible="false">
        <swim-card class="step-card">
          <swim-card-body>
            <p>Lessons learned and detection tuning.</p>
          </swim-card-body>
        </swim-card>
      </swim-section>

      <swim-section section-title="Close" section-collapsible="false">
        <swim-card class="step-card">
          <swim-card-body>
            <p>Document RCA, MTTR, actions, and approvals. Close case.</p>
          </swim-card-body>
        </swim-card>
      </swim-section>

      <p class="branch-note">
        False positive path: close with notes and tune threshold → then document and close (same Close step).
      </p>
    `;
  }
}

export default SocIncidentResponseWorkflowSolution;
