/**
 * Swimlane Turbine AI SOC Platform Solution
 *
 * A comprehensive Security Operations Center dashboard featuring:
 * - Signal Triage with Hero AI Analysis
 * - Case Management
 * - Threat Intelligence Artifacts
 * - Knowledge Base Articles
 *
 * CDN imports:
 * - SwimlaneElement from @swimlane/swimlane-element@2
 * - swim-* components from lit-ui bundle
 */
import { SwimlaneElement, css, html } from '@swimlane/swimlane-element@2';
import 'https://cdn.jsdelivr.net/gh/surya-pabbineedi/lit-ui@gh-pages/lit-ui.js?v=1';

// ─── Mock Data ──────────────────────────────────────────────────────────────────

const SIGNALS = [
  {
    id: 'SIG-10421',
    evidence: 'Suspicious outbound traffic to 185.220.101.34 detected on finance-srv-02',
    verdict: 'Malicious',
    confidence: 92,
    status: 'Escalated',
    created: '2024-01-15 14:30',
    observables: ['185.220.101.34', 'evil-payload.com'],
    correlated: ['SIG-10398', 'SIG-10340'],
    analysis:
      'IP 185.220.101.34 is a known Tor exit node associated with APT28 campaigns. Domain evil-payload.com was registered 3 days ago and resolves to the same IP range. Traffic pattern matches ransomware C2 beacon behavior with 15-minute intervals.'
  },
  {
    id: 'SIG-10422',
    evidence: 'Multiple failed login attempts from 203.0.113.42 targeting admin accounts',
    verdict: 'Suspicious',
    confidence: 78,
    status: 'Analyzing',
    created: '2024-01-15 15:12',
    observables: ['203.0.113.42'],
    correlated: ['SIG-10415'],
    analysis:
      'Source IP 203.0.113.42 located in Eastern Europe. 47 failed authentication attempts across 6 admin accounts within 12 minutes. Pattern consistent with credential stuffing but no successful auth detected.'
  },
  {
    id: 'SIG-10423',
    evidence: 'Unusual DNS query pattern to recently registered domain tracker-updates.net',
    verdict: 'Suspicious',
    confidence: 65,
    status: 'Triaged',
    created: '2024-01-15 16:45',
    observables: ['tracker-updates.net', '198.51.100.77'],
    correlated: [],
    analysis:
      'Domain tracker-updates.net registered 5 days ago via privacy-protected registrar. DNS queries originating from 3 internal workstations. Domain resolves to 198.51.100.77 which has no prior reputation data. Possible DGA-generated domain.'
  },
  {
    id: 'SIG-10424',
    evidence: 'Scheduled task created on endpoint WKS-FIN-003 executing encoded PowerShell',
    verdict: 'Malicious',
    confidence: 97,
    status: 'Escalated',
    created: '2024-01-15 17:22',
    observables: ['WKS-FIN-003', 'base64-encoded-payload'],
    correlated: ['SIG-10421'],
    analysis:
      'Scheduled task "WindowsUpdateCheck" created with base64-encoded PowerShell payload. Decoded content reveals reverse shell connecting to 185.220.101.34:4443. Strongly correlated with SIG-10421. Indicates lateral movement from initial compromise.'
  },
  {
    id: 'SIG-10425',
    evidence: 'VPN connection from user jsmith from location inconsistent with travel records',
    verdict: 'Benign',
    confidence: 88,
    status: 'Triaged',
    created: '2024-01-15 18:05',
    observables: ['jsmith', '10.0.0.55'],
    correlated: [],
    analysis:
      'VPN connection from São Paulo, Brazil. User jsmith confirmed via Slack that they are traveling for a conference. Travel was not logged in the HR system. Verified as legitimate — updated travel records accordingly.'
  },
  {
    id: 'SIG-10426',
    evidence: 'Email with suspicious attachment invoice_jan2024.xlsm sent to 12 recipients',
    verdict: 'Malicious',
    confidence: 89,
    status: 'Escalated',
    created: '2024-01-16 08:14',
    observables: ['invoice_jan2024.xlsm', 'sender@phish-domain.org', '91.234.56.78'],
    correlated: ['SIG-10422'],
    analysis:
      'Macro-enabled Excel file contains obfuscated VBA macro that downloads second-stage payload from 91.234.56.78. Sender domain phish-domain.org spoofs legitimate vendor. 3 of 12 recipients opened the attachment. Immediate containment recommended.'
  },
  {
    id: 'SIG-10427',
    evidence: 'Anomalous data transfer of 2.3GB from database server DB-PROD-01 to external IP',
    verdict: 'Suspicious',
    confidence: 72,
    status: 'New',
    created: '2024-01-16 09:30',
    observables: ['DB-PROD-01', '104.21.45.89'],
    correlated: [],
    analysis:
      'Large data transfer detected outside business hours. Destination IP 104.21.45.89 belongs to a Cloudflare-fronted service. Could be legitimate backup or data exfiltration. Requires manual review of database access logs.'
  },
  {
    id: 'SIG-10428',
    evidence: 'Windows Defender detected Mimikatz execution on DC-01',
    verdict: 'Malicious',
    confidence: 99,
    status: 'Escalated',
    created: '2024-01-16 10:02',
    observables: ['DC-01', 'mimikatz.exe', 'NTLM hashes'],
    correlated: ['SIG-10421', 'SIG-10424'],
    analysis:
      'Mimikatz credential harvesting tool detected on domain controller DC-01. Process executed under service account svc-backup. NTLM hashes for 847 domain accounts potentially compromised. Critical escalation of the ongoing intrusion chain (SIG-10421 → SIG-10424 → SIG-10428).'
  }
];

const CASES = [
  {
    id: 'CASE-789',
    title: 'Ransomware C2 communication on finance server',
    priority: 'P1',
    status: 'In Progress',
    assignedTo: 'john.doe@company.com',
    created: '2024-01-15 14:35',
    resolved: null,
    signals: ['SIG-10421', 'SIG-10424', 'SIG-10428'],
    description:
      'Active intrusion chain detected starting with C2 communication from finance-srv-02, followed by lateral movement to WKS-FIN-003 and credential harvesting on DC-01. Multiple indicators of compromise present across network segments.',
    resolution: ''
  },
  {
    id: 'CASE-790',
    title: 'Phishing campaign targeting finance department',
    priority: 'P2',
    status: 'In Progress',
    assignedTo: 'sarah.chen@company.com',
    created: '2024-01-16 08:20',
    resolved: null,
    signals: ['SIG-10426'],
    description:
      'Targeted phishing campaign using macro-enabled Excel attachments. 12 recipients across finance department, 3 confirmed opens. Sender spoofing legitimate vendor domain.',
    resolution: ''
  },
  {
    id: 'CASE-785',
    title: 'Credential stuffing attack on admin portal',
    priority: 'P3',
    status: 'Resolved',
    assignedTo: 'mike.jones@company.com',
    created: '2024-01-14 10:15',
    resolved: '2024-01-14 16:30',
    signals: ['SIG-10415', 'SIG-10422'],
    description:
      'Automated credential stuffing attack detected against admin portal. Source IP from Eastern Europe. No successful authentications detected.',
    resolution:
      'Blocked source IP at WAF. Enforced MFA for all admin accounts. Added rate limiting to authentication endpoint. Verified no account compromise occurred.'
  },
  {
    id: 'CASE-782',
    title: 'Unauthorized VPN access investigation',
    priority: 'P4',
    status: 'Closed',
    assignedTo: 'john.doe@company.com',
    created: '2024-01-13 09:00',
    resolved: '2024-01-13 11:45',
    signals: ['SIG-10405'],
    description: 'VPN connection from unexpected geography flagged by impossible travel detection.',
    resolution:
      'Confirmed legitimate travel by user. Updated HR travel records. Tuned impossible travel detection threshold. No security incident.'
  },
  {
    id: 'CASE-791',
    title: 'Potential data exfiltration from production database',
    priority: 'P2',
    status: 'Open',
    assignedTo: null,
    created: '2024-01-16 09:45',
    resolved: null,
    signals: ['SIG-10427'],
    description:
      'Anomalous 2.3GB data transfer from DB-PROD-01 to external IP during non-business hours. Requires immediate investigation to determine if this is authorized activity or data exfiltration.',
    resolution: ''
  }
];

const THREATS = [
  {
    id: 'TIA-456',
    type: 'IP',
    value: '185.220.101.34',
    verdict: 'Malicious',
    actor: 'APT28',
    campaign: 'Operation Ghost',
    firstSeen: '2024-01-10',
    lastSeen: '2024-01-16',
    confidence: 'High',
    source: 'VirusTotal',
    tags: ['ransomware', 'C2', 'tor-exit']
  },
  {
    id: 'TIA-457',
    type: 'Domain',
    value: 'evil-payload.com',
    verdict: 'Malicious',
    actor: 'APT28',
    campaign: 'Operation Ghost',
    firstSeen: '2024-01-12',
    lastSeen: '2024-01-15',
    confidence: 'High',
    source: 'Internal Analysis',
    tags: ['C2', 'newly-registered']
  },
  {
    id: 'TIA-458',
    type: 'IP',
    value: '203.0.113.42',
    verdict: 'Suspicious',
    actor: 'Unknown',
    campaign: '',
    firstSeen: '2024-01-14',
    lastSeen: '2024-01-15',
    confidence: 'Medium',
    source: 'AbuseIPDB',
    tags: ['brute-force', 'credential-stuffing']
  },
  {
    id: 'TIA-459',
    type: 'Domain',
    value: 'tracker-updates.net',
    verdict: 'Suspicious',
    actor: 'Unknown',
    campaign: '',
    firstSeen: '2024-01-15',
    lastSeen: '2024-01-15',
    confidence: 'Low',
    source: 'DomainTools',
    tags: ['DGA', 'newly-registered']
  },
  {
    id: 'TIA-460',
    type: 'Hash',
    value: 'a1b2c3d4e5f67890abcdef1234567890',
    verdict: 'Malicious',
    actor: 'APT28',
    campaign: 'Operation Ghost',
    firstSeen: '2024-01-15',
    lastSeen: '2024-01-16',
    confidence: 'High',
    source: 'VirusTotal',
    tags: ['ransomware', 'mimikatz']
  },
  {
    id: 'TIA-461',
    type: 'Email',
    value: 'sender@phish-domain.org',
    verdict: 'Malicious',
    actor: 'Unknown',
    campaign: '',
    firstSeen: '2024-01-16',
    lastSeen: '2024-01-16',
    confidence: 'High',
    source: 'Internal Analysis',
    tags: ['phishing', 'spoofing']
  },
  {
    id: 'TIA-462',
    type: 'IP',
    value: '91.234.56.78',
    verdict: 'Malicious',
    actor: 'Unknown',
    campaign: '',
    firstSeen: '2024-01-16',
    lastSeen: '2024-01-16',
    confidence: 'Medium',
    source: 'AlienVault OTX',
    tags: ['malware-hosting', 'payload-delivery']
  },
  {
    id: 'TIA-463',
    type: 'URL',
    value: 'http://91.234.56.78/stage2.bin',
    verdict: 'Malicious',
    actor: 'Unknown',
    campaign: '',
    firstSeen: '2024-01-16',
    lastSeen: '2024-01-16',
    confidence: 'High',
    source: 'Sandbox Analysis',
    tags: ['payload', 'dropper']
  },
  {
    id: 'TIA-464',
    type: 'Domain',
    value: 'phish-domain.org',
    verdict: 'Malicious',
    actor: 'Unknown',
    campaign: '',
    firstSeen: '2024-01-15',
    lastSeen: '2024-01-16',
    confidence: 'High',
    source: 'PhishTank',
    tags: ['phishing', 'vendor-impersonation']
  }
];

const ARTICLES = [
  {
    id: 'KB-101',
    title: 'How to Respond to Phishing Incidents',
    category: 'Procedure',
    content:
      'Step-by-step guide for handling phishing incidents including email quarantine, credential reset, endpoint scanning, and user notification procedures.',
    tags: ['phishing', 'email', 'response'],
    author: 'jane.smith@company.com',
    created: '2024-01-01',
    updated: '2024-01-10',
    cases: ['CASE-790']
  },
  {
    id: 'KB-102',
    title: 'Ransomware Containment Playbook',
    category: 'Procedure',
    content:
      'Comprehensive playbook for ransomware containment including network isolation, C2 blocking, credential rotation, and backup verification procedures.',
    tags: ['ransomware', 'containment', 'playbook'],
    author: 'mike.jones@company.com',
    created: '2023-12-15',
    updated: '2024-01-15',
    cases: ['CASE-789']
  },
  {
    id: 'KB-103',
    title: 'APT28 Threat Profile',
    category: 'Threat Analysis',
    content:
      'Detailed analysis of APT28 (Fancy Bear) including known TTPs, infrastructure patterns, targeting preferences, and recommended detection rules. Nation-state actor with ties to Russian military intelligence (GRU Unit 26165).',
    tags: ['APT28', 'threat-actor', 'nation-state'],
    author: 'sarah.chen@company.com',
    created: '2023-11-20',
    updated: '2024-01-12',
    cases: []
  },
  {
    id: 'KB-104',
    title: 'Credential Stuffing Detection Guide',
    category: 'Tool Guide',
    content:
      'Guide for configuring and tuning credential stuffing detection rules including threshold settings, geo-analysis, and integration with identity providers.',
    tags: ['credential-stuffing', 'detection', 'authentication'],
    author: 'john.doe@company.com',
    created: '2023-12-01',
    updated: '2024-01-14',
    cases: ['CASE-785']
  },
  {
    id: 'KB-105',
    title: 'Impossible Travel Alert Tuning',
    category: 'Tool Guide',
    content:
      'Best practices for configuring impossible travel detection including VPN considerations, known travel patterns, and reducing false positives.',
    tags: ['impossible-travel', 'VPN', 'false-positive'],
    author: 'jane.smith@company.com',
    created: '2024-01-05',
    updated: '2024-01-13',
    cases: ['CASE-782']
  },
  {
    id: 'KB-106',
    title: 'Data Exfiltration Investigation Procedures',
    category: 'Procedure',
    content:
      'Investigation procedures for suspected data exfiltration including database log analysis, network flow examination, and evidence preservation guidelines.',
    tags: ['data-exfiltration', 'investigation', 'forensics'],
    author: 'mike.jones@company.com',
    created: '2023-12-20',
    updated: '2024-01-08',
    cases: []
  }
];

// ─── Utility Functions ──────────────────────────────────────────────────────────

function verdictBadgeClass(verdict) {
  switch (verdict) {
    case 'Malicious':
      return 'badge-malicious';
    case 'Suspicious':
      return 'badge-suspicious';
    case 'Benign':
      return 'badge-benign';
    default:
      return '';
  }
}

function priorityBadgeClass(priority) {
  switch (priority) {
    case 'P1':
      return 'badge-p1';
    case 'P2':
      return 'badge-p2';
    case 'P3':
      return 'badge-p3';
    case 'P4':
      return 'badge-p4';
    default:
      return '';
  }
}

function statusBadgeClass(status) {
  switch (status) {
    case 'Escalated':
    case 'Open':
      return 'badge-status-open';
    case 'In Progress':
    case 'Analyzing':
    case 'New':
      return 'badge-status-active';
    case 'Triaged':
    case 'Resolved':
      return 'badge-status-resolved';
    case 'Closed':
      return 'badge-status-closed';
    default:
      return '';
  }
}

function confidenceColor(score) {
  if (score >= 80) return 'var(--red-400, #ff6d6d)';
  if (score >= 50) return 'var(--orange-400, #ffbb47)';
  return 'var(--green-400, #53d769)';
}

function priorityLabel(p) {
  switch (p) {
    case 'P1':
      return 'P1 Critical';
    case 'P2':
      return 'P2 High';
    case 'P3':
      return 'P3 Medium';
    case 'P4':
      return 'P4 Low';
    default:
      return p;
  }
}

// ─── Solution Component ─────────────────────────────────────────────────────────

class AiSocPlatformSolution extends SwimlaneElement {
  static get properties() {
    return {
      _selectedItem: { attribute: false },
      _detailType: { attribute: false },
      _detailOpen: { attribute: false },
      _aiAnalyzing: { attribute: false },
      _aiResult: { attribute: false },
      _signalFilter: { attribute: false },
      _caseFilter: { attribute: false },
      _threatFilter: { attribute: false },
      _kbFilter: { attribute: false },
      _searchTerm: { attribute: false }
    };
  }

  constructor() {
    super();
    this._selectedItem = null;
    this._detailType = '';
    this._detailOpen = false;
    this._aiAnalyzing = false;
    this._aiResult = null;
    this._signalFilter = '';
    this._caseFilter = '';
    this._threatFilter = '';
    this._kbFilter = '';
    this._searchTerm = '';
    this._aiTimer = undefined;
  }

  disconnectedCallback() {
    if (this._aiTimer) {
      clearTimeout(this._aiTimer);
      this._aiTimer = undefined;
    }
    super.disconnectedCallback();
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--font-family, 'Source Sans Pro', sans-serif);
        font-size: var(--font-size-m, 1rem);
        color: var(--grey-050, #ebedf2);
        --soc-spacing: var(--spacing-16, 16px);
        --soc-radius: var(--radius-4, 4px);
        --soc-bg-card: var(--grey-800, #1c2029);
        --soc-bg-hover: var(--grey-750, #212631);
        --soc-border: var(--grey-700, #2b3245);
      }

      :host([hidden]) {
        display: none;
      }

      .soc-root {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--soc-spacing);
      }

      /* ─── Header ───────────────────────────────────────── */

      .platform-header {
        margin-bottom: var(--spacing-24, 24px);
        padding-bottom: var(--soc-spacing);
        border-bottom: 1px solid var(--soc-border);
      }

      .platform-header h1 {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--white, #fff);
        margin: 0;
        line-height: 1.2;
      }

      .platform-subtitle {
        color: var(--blue-400, #7ab9ff);
        font-size: var(--font-size-m, 1rem);
        margin: 4px 0 0;
      }

      .platform-meta {
        display: flex;
        gap: 12px;
        margin-top: 8px;
        font-size: var(--font-size-s, 0.8125rem);
        color: var(--grey-300, #909cb4);
        flex-wrap: wrap;
      }

      .meta-divider {
        color: var(--grey-600, #455066);
      }

      /* ─── Stats Grid ───────────────────────────────────── */

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: var(--soc-spacing);
        margin-bottom: var(--spacing-24, 24px);
      }

      .stat-card {
        background: var(--soc-bg-card);
        border-radius: var(--soc-radius);
        padding: var(--soc-spacing);
        border-left: 3px solid var(--blue-500, #1483ff);
      }

      .stat-card--red {
        border-left-color: var(--red-500, #ff4534);
      }
      .stat-card--orange {
        border-left-color: var(--orange-500, #ffa814);
      }
      .stat-card--green {
        border-left-color: var(--green-500, #2ecc71);
      }
      .stat-card--blue {
        border-left-color: var(--blue-500, #1483ff);
      }
      .stat-card--purple {
        border-left-color: #a855f7;
      }

      .stat-value {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--white, #fff);
        line-height: 1;
      }

      .stat-label {
        font-size: var(--font-size-s, 0.8125rem);
        color: var(--grey-300, #909cb4);
        margin-top: 4px;
      }

      /* ─── Filter Bar ───────────────────────────────────── */

      .filter-bar {
        display: flex;
        gap: var(--soc-spacing);
        margin-bottom: var(--soc-spacing);
        flex-wrap: wrap;
        align-items: flex-end;
      }

      .filter-bar swim-select {
        width: 200px;
        flex-shrink: 0;
      }

      .filter-bar swim-input {
        flex: 1;
        min-width: 200px;
      }

      /* ─── Item List ────────────────────────────────────── */

      .item-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .interactive-card {
        cursor: pointer;
        transition: filter 0.15s ease;
        --swim-card-min-width: 0;
      }

      .interactive-card:hover {
        filter: brightness(1.15);
      }

      .interactive-card:focus-visible {
        outline: 2px solid var(--blue-500, #1483ff);
        outline-offset: 2px;
        border-radius: var(--soc-radius);
      }

      .card-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .card-id {
        font-weight: 600;
        color: var(--white, #fff);
        font-size: var(--font-size-m, 1rem);
        min-width: 90px;
      }

      .card-evidence,
      .card-title-text {
        color: var(--grey-050, #ebedf2);
        font-size: var(--font-size-s, 0.8125rem);
        margin-top: 6px;
        line-height: 1.4;
      }

      .card-bottom {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 8px;
        font-size: var(--font-size-xs, 0.75rem);
        color: var(--grey-200, #c1c7d6);
        flex-wrap: wrap;
      }

      /* ─── Badges ───────────────────────────────────────── */

      .badge {
        display: inline-flex;
        align-items: center;
        padding: 2px 8px;
        border-radius: 3px;
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        white-space: nowrap;
      }

      .badge-malicious {
        background: rgba(255, 69, 52, 0.15);
        color: var(--red-400, #ff6d6d);
      }
      .badge-suspicious {
        background: rgba(255, 168, 20, 0.15);
        color: var(--orange-400, #ffbb47);
      }
      .badge-benign {
        background: rgba(46, 204, 113, 0.15);
        color: var(--green-400, #53d769);
      }

      .badge-p1 {
        background: rgba(255, 69, 52, 0.15);
        color: var(--red-400, #ff6d6d);
      }
      .badge-p2 {
        background: rgba(255, 168, 20, 0.15);
        color: var(--orange-400, #ffbb47);
      }
      .badge-p3 {
        background: rgba(20, 131, 255, 0.15);
        color: var(--blue-400, #7ab9ff);
      }
      .badge-p4 {
        background: rgba(46, 204, 113, 0.15);
        color: var(--green-400, #53d769);
      }

      .badge-status-open {
        background: rgba(255, 69, 52, 0.12);
        color: var(--red-400, #ff6d6d);
      }
      .badge-status-active {
        background: rgba(20, 131, 255, 0.12);
        color: var(--blue-400, #7ab9ff);
      }
      .badge-status-resolved {
        background: rgba(46, 204, 113, 0.12);
        color: var(--green-400, #53d769);
      }
      .badge-status-closed {
        background: rgba(114, 129, 159, 0.12);
        color: var(--grey-400, #72819f);
      }

      .badge-type {
        background: rgba(168, 85, 247, 0.15);
        color: #c084fc;
      }

      .badge-category {
        background: rgba(20, 131, 255, 0.12);
        color: var(--blue-400, #7ab9ff);
      }

      .confidence-text {
        font-size: var(--font-size-xs, 0.75rem);
        font-weight: 600;
      }

      /* ─── Detail Dialog ────────────────────────────────── */

      .detail-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px 24px;
        margin-bottom: var(--soc-spacing);
      }

      .detail-field {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .detail-field--full {
        grid-column: 1 / -1;
      }

      .detail-label {
        font-size: var(--font-size-xs, 0.75rem);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--grey-400, #72819f);
      }

      .detail-value {
        color: var(--grey-050, #ebedf2);
        font-size: var(--font-size-m, 1rem);
        line-height: 1.4;
        word-break: break-word;
      }

      .observable-list,
      .correlated-list,
      .signal-list,
      .case-list {
        list-style: none;
        margin: 4px 0 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .observable-item,
      .signal-ref,
      .case-ref {
        display: inline-flex;
        padding: 2px 8px;
        border-radius: 3px;
        font-size: var(--font-size-xs, 0.75rem);
        font-family: monospace;
        background: rgba(20, 131, 255, 0.1);
        color: var(--blue-300, #7ab9ff);
      }

      .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 4px;
      }

      .tag {
        display: inline-flex;
        padding: 2px 8px;
        border-radius: 3px;
        font-size: var(--font-size-xs, 0.75rem);
        background: rgba(168, 85, 247, 0.12);
        color: #c084fc;
      }

      /* ─── AI Analysis ──────────────────────────────────── */

      .ai-section {
        margin-top: var(--soc-spacing);
        padding: var(--soc-spacing);
        background: var(--soc-bg-card);
        border-radius: var(--soc-radius);
        border-left: 3px solid var(--blue-500, #1483ff);
      }

      .ai-section-title {
        font-size: var(--font-size-xs, 0.75rem);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--blue-400, #7ab9ff);
        margin-bottom: 12px;
        font-weight: 600;
      }

      .ai-analyzing {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--grey-300, #909cb4);
        padding: 12px 0;
      }

      .ai-verdict-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }

      .ai-analysis-text {
        color: var(--grey-050, #ebedf2);
        font-size: var(--font-size-s, 0.8125rem);
        line-height: 1.6;
        margin: 0;
      }

      /* ─── Empty State ──────────────────────────────────── */

      .empty-state {
        text-align: center;
        padding: 48px var(--soc-spacing);
        color: var(--grey-400, #72819f);
      }

      .empty-state-text {
        font-size: var(--font-size-m, 1rem);
        margin: 0;
      }

      /* ─── Tab Content ──────────────────────────────────── */

      .tab-content {
        padding-top: var(--soc-spacing);
      }

      .section-title {
        font-size: var(--font-size-m, 1rem);
        font-weight: 600;
        color: var(--white, #fff);
        margin: 0 0 var(--soc-spacing) 0;
      }

      /* ─── Dialog ─────────────────────────────────────────── */

      swim-dialog::part(content) {
        width: min(680px, calc(100vw - 48px));
      }

      /* ─── Responsive ───────────────────────────────────── */

      @media (max-width: 600px) {
        .detail-grid {
          grid-template-columns: 1fr;
        }
        .filter-bar {
          flex-direction: column;
        }
        .filter-bar swim-select,
        .filter-bar swim-input {
          width: 100%;
        }
      }
    `;
  }

  // ─── Computed Getters ───────────────────────────────────────────────────────

  get _filteredSignals() {
    let items = SIGNALS;
    if (this._signalFilter) {
      items = items.filter(s => s.verdict === this._signalFilter);
    }
    if (this._searchTerm) {
      const term = this._searchTerm.toLowerCase();
      items = items.filter(s => s.id.toLowerCase().includes(term) || s.evidence.toLowerCase().includes(term));
    }
    return items;
  }

  get _filteredCases() {
    let items = CASES;
    if (this._caseFilter) {
      items = items.filter(c => c.priority === this._caseFilter);
    }
    if (this._searchTerm) {
      const term = this._searchTerm.toLowerCase();
      items = items.filter(c => c.id.toLowerCase().includes(term) || c.title.toLowerCase().includes(term));
    }
    return items;
  }

  get _filteredThreats() {
    let items = THREATS;
    if (this._threatFilter) {
      items = items.filter(t => t.type === this._threatFilter);
    }
    if (this._searchTerm) {
      const term = this._searchTerm.toLowerCase();
      items = items.filter(
        t =>
          t.id.toLowerCase().includes(term) ||
          t.value.toLowerCase().includes(term) ||
          t.actor.toLowerCase().includes(term)
      );
    }
    return items;
  }

  get _filteredArticles() {
    let items = ARTICLES;
    if (this._kbFilter) {
      items = items.filter(a => a.category === this._kbFilter);
    }
    if (this._searchTerm) {
      const term = this._searchTerm.toLowerCase();
      items = items.filter(
        a =>
          a.id.toLowerCase().includes(term) ||
          a.title.toLowerCase().includes(term) ||
          a.tags.some(t => t.toLowerCase().includes(term))
      );
    }
    return items;
  }

  // ─── Event Handlers ─────────────────────────────────────────────────────────

  _openDetail(type, item) {
    this._detailType = type;
    this._selectedItem = item;
    this._aiAnalyzing = false;
    this._aiResult = null;
    this._detailOpen = true;
  }

  _closeDetail() {
    if (this._aiTimer) {
      clearTimeout(this._aiTimer);
      this._aiTimer = undefined;
    }
    this._detailOpen = false;
    this._selectedItem = null;
    this._detailType = '';
    this._aiAnalyzing = false;
    this._aiResult = null;
  }

  _runAiAnalysis() {
    if (!this._selectedItem || this._aiAnalyzing) return;
    this._aiAnalyzing = true;
    this._aiTimer = setTimeout(() => {
      this._aiTimer = undefined;
      this._aiAnalyzing = false;
      this._aiResult = {
        verdict: this._selectedItem.verdict,
        confidence: this._selectedItem.confidence,
        analysis: this._selectedItem.analysis
      };
    }, 2500);
  }

  _onCardKeydown(type, item, e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._openDetail(type, item);
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  render() {
    const openCases = CASES.filter(c => c.status !== 'Closed').length;
    return html`
      <main class="soc-root" role="main" aria-label="Swimlane Turbine AI SOC Platform">
        <header class="platform-header">
          <h1>Swimlane Turbine</h1>
          <p class="platform-subtitle">AI SOC Platform</p>
          <div class="platform-meta" aria-label="Platform summary">
            <span>4 Applications</span>
            <span class="meta-divider" aria-hidden="true">|</span>
            <span>${SIGNALS.length} Active Signals</span>
            <span class="meta-divider" aria-hidden="true">|</span>
            <span>${openCases} Open Cases</span>
            <span class="meta-divider" aria-hidden="true">|</span>
            <span>${THREATS.length} Threat Indicators</span>
          </div>
        </header>

        <swim-tabs>
          <swim-tab label="Signal Triage" active> ${this._renderSignalTriage()} </swim-tab>
          <swim-tab label="Case Management"> ${this._renderCaseManagement()} </swim-tab>
          <swim-tab label="Threat Intelligence"> ${this._renderThreatIntel()} </swim-tab>
          <swim-tab label="Knowledge Base"> ${this._renderKnowledgeBase()} </swim-tab>
        </swim-tabs>

        <swim-dialog
          .visible=${this._detailOpen}
          dialog-title="${this._getDialogTitle()}"
          @close=${() => this._closeDetail()}
        >
          ${this._detailOpen ? this._renderDetailContent() : html``}
        </swim-dialog>
      </main>
    `;
  }

  // ─── Signal Triage ────────────────────────────────────────────────────────

  _renderSignalTriage() {
    const malicious = SIGNALS.filter(s => s.verdict === 'Malicious').length;
    const suspicious = SIGNALS.filter(s => s.verdict === 'Suspicious').length;
    const benign = SIGNALS.filter(s => s.verdict === 'Benign').length;
    const filtered = this._filteredSignals;

    return html`
      <section class="tab-content" aria-label="Signal Triage">
        <div class="stats-grid" role="group" aria-label="Signal statistics">
          ${this._renderStat(SIGNALS.length, 'Total Signals', 'blue')}
          ${this._renderStat(malicious, 'Malicious', 'red')} ${this._renderStat(suspicious, 'Suspicious', 'orange')}
          ${this._renderStat(benign, 'Benign', 'green')}
        </div>

        <div class="filter-bar" role="search" aria-label="Filter signals">
          <swim-select
            label="Verdict"
            placeholder="All Verdicts"
            allow-clear
            @change=${e => {
              this._signalFilter = e.detail?.value ?? '';
            }}
          >
            <swim-option name="Malicious" value="Malicious"></swim-option>
            <swim-option name="Suspicious" value="Suspicious"></swim-option>
            <swim-option name="Benign" value="Benign"></swim-option>
          </swim-select>
          <swim-input
            label="Search"
            placeholder="Search by ID or evidence..."
            @input=${e => {
              this._searchTerm = e.target?.value ?? '';
            }}
          ></swim-input>
        </div>

        ${filtered.length
          ? html`
              <div class="item-list" role="list" aria-label="Signals">
                ${filtered.map(s => this._renderSignalCard(s))}
              </div>
            `
          : html`<div class="empty-state"><p class="empty-state-text">No signals match the current filters.</p></div>`}
      </section>
    `;
  }

  _renderSignalCard(signal) {
    return html`
      <swim-card
        class="interactive-card"
        role="button"
        tabindex="0"
        aria-label="Signal ${signal.id}: ${signal.verdict} — ${signal.evidence}"
        @click=${() => this._openDetail('signal', signal)}
        @keydown=${e => this._onCardKeydown('signal', signal, e)}
      >
        <swim-card-body>
          <div class="card-row">
            <span class="card-id">${signal.id}</span>
            <span class="badge ${verdictBadgeClass(signal.verdict)}">${signal.verdict}</span>
            <span class="confidence-text" style="color:${confidenceColor(signal.confidence)}"
              >${signal.confidence}%</span
            >
            <span class="badge ${statusBadgeClass(signal.status)}">${signal.status}</span>
          </div>
          <div class="card-evidence">${signal.evidence}</div>
          <div class="card-bottom">
            <span>${signal.created}</span>
            <span>${signal.observables.length} observable${signal.observables.length !== 1 ? 's' : ''}</span>
            ${signal.correlated.length ? html`<span>${signal.correlated.length} correlated</span>` : html``}
          </div>
        </swim-card-body>
      </swim-card>
    `;
  }

  // ─── Case Management ──────────────────────────────────────────────────────

  _renderCaseManagement() {
    const open = CASES.filter(c => c.status === 'Open').length;
    const inProgress = CASES.filter(c => c.status === 'In Progress').length;
    const resolved = CASES.filter(c => c.status === 'Resolved').length;
    const filtered = this._filteredCases;

    return html`
      <section class="tab-content" aria-label="Case Management">
        <div class="stats-grid" role="group" aria-label="Case statistics">
          ${this._renderStat(CASES.length, 'Total Cases', 'blue')} ${this._renderStat(open, 'Open', 'red')}
          ${this._renderStat(inProgress, 'In Progress', 'orange')} ${this._renderStat(resolved, 'Resolved', 'green')}
        </div>

        <div class="filter-bar" role="search" aria-label="Filter cases">
          <swim-select
            label="Priority"
            placeholder="All Priorities"
            allow-clear
            @change=${e => {
              this._caseFilter = e.detail?.value ?? '';
            }}
          >
            <swim-option name="P1 Critical" value="P1"></swim-option>
            <swim-option name="P2 High" value="P2"></swim-option>
            <swim-option name="P3 Medium" value="P3"></swim-option>
            <swim-option name="P4 Low" value="P4"></swim-option>
          </swim-select>
          <swim-input
            label="Search"
            placeholder="Search by ID or title..."
            @input=${e => {
              this._searchTerm = e.target?.value ?? '';
            }}
          ></swim-input>
        </div>

        ${filtered.length
          ? html`
              <div class="item-list" role="list" aria-label="Cases">${filtered.map(c => this._renderCaseCard(c))}</div>
            `
          : html`<div class="empty-state"><p class="empty-state-text">No cases match the current filters.</p></div>`}
      </section>
    `;
  }

  _renderCaseCard(caseItem) {
    return html`
      <swim-card
        class="interactive-card"
        role="button"
        tabindex="0"
        aria-label="Case ${caseItem.id}: ${caseItem.title}"
        @click=${() => this._openDetail('case', caseItem)}
        @keydown=${e => this._onCardKeydown('case', caseItem, e)}
      >
        <swim-card-body>
          <div class="card-row">
            <span class="card-id">${caseItem.id}</span>
            <span class="badge ${priorityBadgeClass(caseItem.priority)}">${priorityLabel(caseItem.priority)}</span>
            <span class="badge ${statusBadgeClass(caseItem.status)}">${caseItem.status}</span>
          </div>
          <div class="card-title-text">${caseItem.title}</div>
          <div class="card-bottom">
            <span>${caseItem.created}</span>
            <span>${caseItem.assignedTo || 'Unassigned'}</span>
            <span>${caseItem.signals.length} signal${caseItem.signals.length !== 1 ? 's' : ''}</span>
          </div>
        </swim-card-body>
      </swim-card>
    `;
  }

  // ─── Threat Intelligence ──────────────────────────────────────────────────

  _renderThreatIntel() {
    const ips = THREATS.filter(t => t.type === 'IP').length;
    const domains = THREATS.filter(t => t.type === 'Domain').length;
    const hashes = THREATS.filter(t => t.type === 'Hash').length;
    const other = THREATS.filter(t => !['IP', 'Domain', 'Hash'].includes(t.type)).length;
    const filtered = this._filteredThreats;

    return html`
      <section class="tab-content" aria-label="Threat Intelligence">
        <div class="stats-grid" role="group" aria-label="Threat indicator statistics">
          ${this._renderStat(THREATS.length, 'Total Indicators', 'blue')} ${this._renderStat(ips, 'IPs', 'red')}
          ${this._renderStat(domains, 'Domains', 'orange')}
          ${this._renderStat(hashes + other, 'Hashes / Other', 'purple')}
        </div>

        <div class="filter-bar" role="search" aria-label="Filter threat indicators">
          <swim-select
            label="Indicator Type"
            placeholder="All Types"
            allow-clear
            @change=${e => {
              this._threatFilter = e.detail?.value ?? '';
            }}
          >
            <swim-option name="IP" value="IP"></swim-option>
            <swim-option name="Domain" value="Domain"></swim-option>
            <swim-option name="Hash" value="Hash"></swim-option>
            <swim-option name="URL" value="URL"></swim-option>
            <swim-option name="Email" value="Email"></swim-option>
          </swim-select>
          <swim-input
            label="Search"
            placeholder="Search by ID, value, or actor..."
            @input=${e => {
              this._searchTerm = e.target?.value ?? '';
            }}
          ></swim-input>
        </div>

        ${filtered.length
          ? html`
              <div class="item-list" role="list" aria-label="Threat indicators">
                ${filtered.map(t => this._renderThreatCard(t))}
              </div>
            `
          : html`<div class="empty-state">
              <p class="empty-state-text">No threat indicators match the current filters.</p>
            </div>`}
      </section>
    `;
  }

  _renderThreatCard(threat) {
    return html`
      <swim-card
        class="interactive-card"
        role="button"
        tabindex="0"
        aria-label="Threat ${threat.id}: ${threat.type} ${threat.value}"
        @click=${() => this._openDetail('threat', threat)}
        @keydown=${e => this._onCardKeydown('threat', threat, e)}
      >
        <swim-card-body>
          <div class="card-row">
            <span class="card-id">${threat.id}</span>
            <span class="badge badge-type">${threat.type}</span>
            <span class="badge ${verdictBadgeClass(threat.verdict)}">${threat.verdict}</span>
            ${threat.actor !== 'Unknown' ? html`<span class="badge badge-category">${threat.actor}</span>` : html``}
          </div>
          <div class="card-evidence" style="font-family:monospace">${threat.value}</div>
          <div class="card-bottom">
            <span>First seen: ${threat.firstSeen}</span>
            <span>Source: ${threat.source}</span>
            <span>Confidence: ${threat.confidence}</span>
          </div>
        </swim-card-body>
      </swim-card>
    `;
  }

  // ─── Knowledge Base ───────────────────────────────────────────────────────

  _renderKnowledgeBase() {
    const procedures = ARTICLES.filter(a => a.category === 'Procedure').length;
    const threatAnalysis = ARTICLES.filter(a => a.category === 'Threat Analysis').length;
    const toolGuides = ARTICLES.filter(a => a.category === 'Tool Guide').length;
    const filtered = this._filteredArticles;

    return html`
      <section class="tab-content" aria-label="Knowledge Base">
        <div class="stats-grid" role="group" aria-label="Knowledge base statistics">
          ${this._renderStat(ARTICLES.length, 'Total Articles', 'blue')}
          ${this._renderStat(procedures, 'Procedures', 'green')}
          ${this._renderStat(threatAnalysis, 'Threat Analysis', 'red')}
          ${this._renderStat(toolGuides, 'Tool Guides', 'orange')}
        </div>

        <div class="filter-bar" role="search" aria-label="Filter articles">
          <swim-select
            label="Category"
            placeholder="All Categories"
            allow-clear
            @change=${e => {
              this._kbFilter = e.detail?.value ?? '';
            }}
          >
            <swim-option name="Procedure" value="Procedure"></swim-option>
            <swim-option name="Threat Analysis" value="Threat Analysis"></swim-option>
            <swim-option name="Tool Guide" value="Tool Guide"></swim-option>
          </swim-select>
          <swim-input
            label="Search"
            placeholder="Search by title or tag..."
            @input=${e => {
              this._searchTerm = e.target?.value ?? '';
            }}
          ></swim-input>
        </div>

        ${filtered.length
          ? html`
              <div class="item-list" role="list" aria-label="Articles">
                ${filtered.map(a => this._renderArticleCard(a))}
              </div>
            `
          : html`<div class="empty-state"><p class="empty-state-text">No articles match the current filters.</p></div>`}
      </section>
    `;
  }

  _renderArticleCard(article) {
    return html`
      <swim-card
        class="interactive-card"
        role="button"
        tabindex="0"
        aria-label="Article ${article.id}: ${article.title}"
        @click=${() => this._openDetail('article', article)}
        @keydown=${e => this._onCardKeydown('article', article, e)}
      >
        <swim-card-body>
          <div class="card-row">
            <span class="card-id">${article.id}</span>
            <span class="badge badge-category">${article.category}</span>
          </div>
          <div class="card-title-text">${article.title}</div>
          <div class="card-bottom">
            <span>${article.author}</span>
            <span>Updated: ${article.updated}</span>
            ${article.cases.length
              ? html`<span>${article.cases.length} linked case${article.cases.length !== 1 ? 's' : ''}</span>`
              : html``}
          </div>
        </swim-card-body>
      </swim-card>
    `;
  }

  // ─── Shared Renderers ─────────────────────────────────────────────────────

  _renderStat(value, label, color) {
    return html`
      <div class="stat-card stat-card--${color}" role="status" aria-label="${label}: ${value}">
        <div class="stat-value">${value}</div>
        <div class="stat-label">${label}</div>
      </div>
    `;
  }

  _getDialogTitle() {
    if (!this._selectedItem) return '';
    switch (this._detailType) {
      case 'signal':
        return `Signal ${this._selectedItem.id}`;
      case 'case':
        return `Case ${this._selectedItem.id}`;
      case 'threat':
        return `Threat Indicator ${this._selectedItem.id}`;
      case 'article':
        return `${this._selectedItem.id}: ${this._selectedItem.title}`;
      default:
        return '';
    }
  }

  _renderDetailContent() {
    switch (this._detailType) {
      case 'signal':
        return this._renderSignalDetail();
      case 'case':
        return this._renderCaseDetail();
      case 'threat':
        return this._renderThreatDetail();
      case 'article':
        return this._renderArticleDetail();
      default:
        return html``;
    }
  }

  // ─── Signal Detail ────────────────────────────────────────────────────────

  _renderSignalDetail() {
    const s = this._selectedItem;
    if (!s) return html``;

    return html`
      <div class="detail-grid">
        <div class="detail-field">
          <span class="detail-label">Status</span>
          <span class="detail-value"><span class="badge ${statusBadgeClass(s.status)}">${s.status}</span></span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Created</span>
          <span class="detail-value">${s.created}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Verdict</span>
          <span class="detail-value"><span class="badge ${verdictBadgeClass(s.verdict)}">${s.verdict}</span></span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Confidence</span>
          <span class="detail-value confidence-text" style="color:${confidenceColor(s.confidence)}"
            >${s.confidence}%</span
          >
        </div>
        <div class="detail-field detail-field--full">
          <span class="detail-label">Evidence</span>
          <span class="detail-value">${s.evidence}</span>
        </div>
        <div class="detail-field${s.observables.length > 3 ? ' detail-field--full' : ''}">
          <span class="detail-label">Observables</span>
          <ul class="observable-list" aria-label="Observables">
            ${s.observables.map(o => html`<li class="observable-item">${o}</li>`)}
          </ul>
        </div>
        ${s.correlated.length
          ? html`
              <div class="detail-field">
                <span class="detail-label">Correlated Signals</span>
                <ul class="correlated-list" aria-label="Correlated signals">
                  ${s.correlated.map(c => html`<li class="signal-ref">${c}</li>`)}
                </ul>
              </div>
            `
          : html``}
      </div>

      <div class="ai-section" role="region" aria-label="Hero AI Analysis">
        <div class="ai-section-title">Hero AI Analysis</div>
        ${this._aiAnalyzing
          ? html`
              <div class="ai-analyzing" role="status" aria-live="polite">
                <swim-progress-spinner diameter="32" stroke-width="3"></swim-progress-spinner>
                <span>Analyzing signal with Hero AI...</span>
              </div>
            `
          : this._aiResult
          ? html`
              <div class="ai-verdict-row">
                <span class="badge ${verdictBadgeClass(this._aiResult.verdict)}">${this._aiResult.verdict}</span>
                <span class="confidence-text" style="color:${confidenceColor(this._aiResult.confidence)}"
                  >${this._aiResult.confidence}% confidence</span
                >
              </div>
              <p class="ai-analysis-text">${this._aiResult.analysis}</p>
            `
          : html`
              <swim-button
                variant="primary"
                @click=${() => this._runAiAnalysis()}
                aria-label="Run Hero AI analysis on this signal"
              >
                Run Hero AI Analysis
              </swim-button>
            `}
      </div>
    `;
  }

  // ─── Case Detail ──────────────────────────────────────────────────────────

  _renderCaseDetail() {
    const c = this._selectedItem;
    if (!c) return html``;

    return html`
      <div class="detail-grid">
        <div class="detail-field">
          <span class="detail-label">Priority</span>
          <span class="detail-value"
            ><span class="badge ${priorityBadgeClass(c.priority)}">${priorityLabel(c.priority)}</span></span
          >
        </div>
        <div class="detail-field">
          <span class="detail-label">Status</span>
          <span class="detail-value"><span class="badge ${statusBadgeClass(c.status)}">${c.status}</span></span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Assigned To</span>
          <span class="detail-value">${c.assignedTo || 'Unassigned'}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Created</span>
          <span class="detail-value">${c.created}</span>
        </div>
        ${c.resolved
          ? html`
              <div class="detail-field">
                <span class="detail-label">Resolved</span>
                <span class="detail-value">${c.resolved}</span>
              </div>
            `
          : html``}
        <div class="detail-field detail-field--full">
          <span class="detail-label">Title</span>
          <span class="detail-value" style="font-weight:600;color:var(--white,#fff)">${c.title}</span>
        </div>
        <div class="detail-field detail-field--full">
          <span class="detail-label">Description</span>
          <span class="detail-value">${c.description}</span>
        </div>
        <div class="detail-field detail-field--full">
          <span class="detail-label">Related Signals</span>
          <ul class="signal-list" aria-label="Related signals">
            ${c.signals.map(s => html`<li class="signal-ref">${s}</li>`)}
          </ul>
        </div>
        ${c.resolution
          ? html`
              <div class="detail-field detail-field--full">
                <span class="detail-label">Resolution</span>
                <span class="detail-value">${c.resolution}</span>
              </div>
            `
          : html``}
      </div>
    `;
  }

  // ─── Threat Detail ────────────────────────────────────────────────────────

  _renderThreatDetail() {
    const t = this._selectedItem;
    if (!t) return html``;

    return html`
      <div class="detail-grid">
        <div class="detail-field">
          <span class="detail-label">Indicator Type</span>
          <span class="detail-value"><span class="badge badge-type">${t.type}</span></span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Verdict</span>
          <span class="detail-value"><span class="badge ${verdictBadgeClass(t.verdict)}">${t.verdict}</span></span>
        </div>
        <div class="detail-field detail-field--full">
          <span class="detail-label">Indicator Value</span>
          <span class="detail-value" style="font-family:monospace">${t.value}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Threat Actor</span>
          <span class="detail-value">${t.actor}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Campaign</span>
          <span class="detail-value">${t.campaign || '—'}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">First Seen</span>
          <span class="detail-value">${t.firstSeen}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Last Seen</span>
          <span class="detail-value">${t.lastSeen}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Confidence</span>
          <span class="detail-value">${t.confidence}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Source</span>
          <span class="detail-value">${t.source}</span>
        </div>
        <div class="detail-field detail-field--full">
          <span class="detail-label">Tags</span>
          <div class="tags-container">${t.tags.map(tag => html`<span class="tag">${tag}</span>`)}</div>
        </div>
      </div>
    `;
  }

  // ─── Article Detail ───────────────────────────────────────────────────────

  _renderArticleDetail() {
    const a = this._selectedItem;
    if (!a) return html``;

    return html`
      <div class="detail-grid">
        <div class="detail-field">
          <span class="detail-label">Category</span>
          <span class="detail-value"><span class="badge badge-category">${a.category}</span></span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Author</span>
          <span class="detail-value">${a.author}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Created</span>
          <span class="detail-value">${a.created}</span>
        </div>
        <div class="detail-field">
          <span class="detail-label">Last Updated</span>
          <span class="detail-value">${a.updated}</span>
        </div>
        <div class="detail-field detail-field--full">
          <span class="detail-label">Content</span>
          <span class="detail-value">${a.content}</span>
        </div>
        <div class="detail-field detail-field--full">
          <span class="detail-label">Tags</span>
          <div class="tags-container">${a.tags.map(tag => html`<span class="tag">${tag}</span>`)}</div>
        </div>
        ${a.cases.length
          ? html`
              <div class="detail-field detail-field--full">
                <span class="detail-label">Related Cases</span>
                <ul class="case-list" aria-label="Related cases">
                  ${a.cases.map(c => html`<li class="case-ref">${c}</li>`)}
                </ul>
              </div>
            `
          : html``}
      </div>
    `;
  }
}

export default AiSocPlatformSolution;
