import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { baseStyles } from '../../styles/base';
import { dateDisplayStyles } from './date-display.styles';
import { coerceBooleanProperty, litBooleanAttrDefaultFalse } from '../../utils/coerce';
import {
  formatDate,
  parseDate,
  isValidDate,
  roundToPrecision,
  resolveFormat,
  getEffectiveDisplayFormat,
  getEffectiveInputFormat,
  normalizeTimezone
} from '../date-time/date-format';
import { DateDisplayType } from '../date-time/date-time-display.enum';
import { DateTimeType } from '../date-time/date-time-type.enum';
import '../tooltip/tooltip.component';
import '../button/button.component';
import '../icon/icon.component';
import { PlacementType } from '../tooltip/placement-type.enum';
import { StyleType } from '../tooltip/style-type.enum';

const TAG = 'swim-date-display';

/** Sentinel: `clickable` attribute omitted — use ngx-style default from timezones / default-copy-key. */
const CLICKABLE_AUTO = Symbol('swim-date-display-clickable-auto');

function guessTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

function formatRelativeTime(date: Date): string {
  const diffSec = Math.round((date.getTime() - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second');
  const diffHour = Math.round(diffMin / 60);
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute');
  const diffDay = Math.round(diffHour / 24);
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour');
  const diffWeek = Math.round(diffDay / 7);
  if (Math.abs(diffDay) < 7) return rtf.format(diffDay, 'day');
  if (Math.abs(diffWeek) < 5) return rtf.format(diffWeek, 'week');
  const diffMonth = Math.round(diffDay / 30);
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, 'month');
  const diffYear = Math.round(diffDay / 365);
  return rtf.format(diffYear, 'year');
}

function resolveInputDate(datelike: string | Date | undefined | null): Date | null {
  if (datelike == null) return null;
  if (datelike instanceof Date) return isValidDate(datelike) ? datelike : null;
  return parseDate(datelike);
}

function normalizeDisplayMode(mode: string | undefined): DateDisplayType {
  const v = (mode ?? '').toLowerCase();
  if (v === DateDisplayType.HUMAN) return DateDisplayType.HUMAN;
  if (v === DateDisplayType.LOCAL) return DateDisplayType.LOCAL;
  if (v === DateDisplayType.CUSTOM) return DateDisplayType.CUSTOM;
  return DateDisplayType.TIMEZONE;
}

function normalizeDateTimeType(type: string | undefined): DateTimeType {
  const v = (type ?? '').toLowerCase();
  if (v === DateTimeType.date) return DateTimeType.date;
  if (v === DateTimeType.time) return DateTimeType.time;
  return DateTimeType.datetime;
}

export type ZoneValue = { key: string; clip: string; display: string };

/**
 * SwimDateDisplay — read-only date/time text with optional multi-zone tooltip and clipboard copy,
 * matching **ngx-time** (`ngx-time` / time-display) from @swimlane/ngx-ui.
 *
 * @slot - Not used (text is generated from `datetime`).
 *
 * @fires date-copied - Fired after a timezone string is copied (`bubbles: true`, `composed: true`).
 *   `detail`: `{ key: string, clip: string, message: string }`.
 *
 * @csspart - None (inner `<time>` is not part-exposed).
 */
@customElement(TAG)
export class SwimDateDisplay extends LitElement {
  static styles = [baseStyles, dateDisplayStyles];

  @property({ attribute: 'datetime' })
  datetime: string | Date | undefined;

  @property({ type: String })
  precision?: string;

  @property({ type: String, reflect: true })
  timezone = '';

  @property({ type: String, attribute: 'default-input-time-zone' })
  defaultInputTimeZone = '';

  @property({ type: String, reflect: true })
  mode = DateDisplayType.TIMEZONE;

  @property({ type: String, reflect: true })
  type = DateTimeType.datetime;

  @property({ type: String })
  format = '';

  @property({ type: String, attribute: 'tooltip-format' })
  tooltipFormat = '';

  @property({ type: String, attribute: 'clip-format' })
  clipFormat = '';

  private _timezones: Record<string, string> = {
    UTC: 'Etc/UTC',
    Local: ''
  };

  @property({ type: Object, attribute: 'timezones' })
  get timezones(): Record<string, string> {
    return this._timezones;
  }
  set timezones(val: Record<string, string> | null | undefined) {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      this._timezones = val;
    }
  }

  @property({ type: Boolean, reflect: true, attribute: 'tooltip-disabled', converter: litBooleanAttrDefaultFalse })
  get tooltipDisabled(): boolean {
    return this._tooltipDisabled;
  }
  set tooltipDisabled(v: boolean) {
    this._tooltipDisabled = coerceBooleanProperty(v);
  }
  private _tooltipDisabled = false;

  @property({ type: String, attribute: 'tooltip-css-class' })
  tooltipCssClass = 'date-tip-tooltip swim-date-display-tip';

  @property({ type: String, attribute: 'tooltip-placement' })
  tooltipPlacement: PlacementType | string = PlacementType.top;

  @property({ type: String, attribute: 'default-copy-key' })
  defaultCopyKey = 'Local';

  @property({ type: String, attribute: 'invalid-date-message' })
  invalidDateMessage = 'Invalid date';

  @property({
    attribute: 'clickable',
    reflect: true,
    converter: {
      fromAttribute(value: string | null): boolean | symbol {
        if (value === null) return CLICKABLE_AUTO;
        return value !== 'false';
      },
      toAttribute(value: boolean | symbol): string | null {
        if (value === CLICKABLE_AUTO) return null;
        return value ? '' : 'false';
      }
    }
  })
  clickable: boolean | symbol = CLICKABLE_AUTO;

  @state() private _displayText = '';
  @state() private _dateInvalid = true;
  @state() private _utcDatetimeAttr = '';
  @state() private _zoneList: ZoneValue[] = [];
  @state() private _rawDatetimeEcho = '';
  @state() private _titleValue = '';

  private _zoneValues: Record<string, ZoneValue> = {};

  connectedCallback(): void {
    super.connectedCallback();
    this._recompute();
  }

  protected willUpdate(cp: PropertyValues): void {
    if (
      cp.has('datetime') ||
      cp.has('precision') ||
      cp.has('timezone') ||
      cp.has('defaultInputTimeZone') ||
      cp.has('mode') ||
      cp.has('type') ||
      cp.has('format') ||
      cp.has('tooltipFormat') ||
      cp.has('clipFormat') ||
      cp.has('timezones')
    ) {
      this._recompute();
    }
  }

  private _effectiveTimezone(): string {
    return normalizeTimezone(this.timezone) || guessTimeZone();
  }

  private _recompute(): void {
    this._rawDatetimeEcho = typeof this.datetime === 'string' ? this.datetime : '';
    this._zoneValues = {};
    this._zoneList = [];
    this._utcDatetimeAttr = '';
    this._titleValue = '';
    this._dateInvalid = true;
    this._displayText = '';

    if (this.datetime == null || this.datetime === '') {
      return;
    }

    const parsed = resolveInputDate(this.datetime as string | Date);
    if (!parsed) {
      this._dateInvalid = true;
      this._rawDatetimeEcho = String(this.datetime);
      return;
    }

    const working = this.precision ? roundToPrecision(parsed, this.precision) : parsed;
    const displayMode = normalizeDisplayMode(this.mode);
    const inputType = normalizeDateTimeType(this.type);

    const resolvedFormat =
      (this.format && resolveFormat(this.format)) || getEffectiveDisplayFormat(displayMode, inputType, this.precision);
    const resolvedTooltipFormat = (this.tooltipFormat && resolveFormat(this.tooltipFormat)) || resolvedFormat;
    const resolvedClipFormat =
      (this.clipFormat && resolveFormat(this.clipFormat)) ||
      getEffectiveInputFormat(displayMode, inputType, this.precision);

    const tzDisplay = this._effectiveTimezone();

    this._dateInvalid = false;

    if (displayMode === DateDisplayType.LOCAL) {
      this._utcDatetimeAttr = formatDate(working, 'YYYY-MM-DD[T]HH:mm:ss.SSS', undefined);
      this._displayText = formatDate(working, resolvedFormat, tzDisplay);
      return;
    }

    this._utcDatetimeAttr = working.toISOString();

    if (displayMode === DateDisplayType.HUMAN) {
      this._displayText = formatRelativeTime(working);
    } else {
      this._displayText = formatDate(working, resolvedFormat, tzDisplay);
    }

    this._zoneValues = this._buildZoneValues(working, resolvedTooltipFormat, resolvedClipFormat);
    this._zoneList = Object.keys(this.timezones)
      .map(k => this._zoneValues[k])
      .filter((v): v is ZoneValue => !!v);

    this._titleValue = Object.keys(this.timezones)
      .map(key => {
        const z = this._zoneValues[key];
        return z ? `${z.display} [${key}]` : '';
      })
      .filter(Boolean)
      .join('\n');
  }

  private _buildZoneValues(instant: Date, tooltipFmt: string, clipFmt: string): Record<string, ZoneValue> {
    const out: Record<string, ZoneValue> = {};
    for (const key of Object.keys(this.timezones)) {
      const tzRaw = this.timezones[key];
      const tz = normalizeTimezone(tzRaw) || guessTimeZone();
      out[key] = {
        key,
        clip: formatDate(instant, clipFmt, tz),
        display: formatDate(instant, tooltipFmt, tz)
      };
    }
    return out;
  }

  private get _displayMode(): DateDisplayType {
    return normalizeDisplayMode(this.mode);
  }

  /** ngx `hasPopup`: underline + zone tooltip (non-local, valid). */
  private get _hasPopup(): boolean {
    return !this._dateInvalid && this._displayMode !== DateDisplayType.LOCAL;
  }

  private get _showTooltipPanel(): boolean {
    return this._hasPopup && !this.tooltipDisabled;
  }

  private _effectiveClickable(): boolean {
    if (this.clickable !== CLICKABLE_AUTO) {
      return coerceBooleanProperty(this.clickable as boolean);
    }
    const v = this._zoneValues[this.defaultCopyKey];
    return !!this.defaultCopyKey && !!v?.clip;
  }

  private _onTimeActivate(e: Event): void {
    if (!this._effectiveClickable() || this._dateInvalid) return;
    e.preventDefault();
    e.stopPropagation();
    void this._copyRow(this.defaultCopyKey);
  }

  private _onTimeKeyDown(e: KeyboardEvent): void {
    if (!this._effectiveClickable() || this._dateInvalid) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      void this._copyRow(this.defaultCopyKey);
    }
  }

  private async _copyRow(key: string): Promise<void> {
    const row = this._zoneValues[key];
    if (!row?.clip) return;
    try {
      await navigator.clipboard.writeText(row.clip);
    } catch {
      /* clipboard may be denied */
    }
    this.dispatchEvent(
      new CustomEvent('date-copied', {
        detail: { key, clip: row.clip, message: `${key} date copied to clipboard` },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    const invalid = this._dateInvalid;
    const showPanel = this._showTooltipPanel;
    const underline = this._hasPopup && !invalid;
    const clickOn = this._effectiveClickable() && !invalid;
    const nativeTitle = this.tooltipDisabled && underline && this._titleValue ? this._titleValue : '';

    const timeClasses = [
      'swim-date-display__time',
      underline ? 'swim-date-display__time--popup' : '',
      clickOn ? 'swim-date-display__time--clickable' : ''
    ]
      .filter(Boolean)
      .join(' ');

    const timeTpl = html`
      <time
        class="${timeClasses}"
        datetime="${ifDefined(invalid || !this._utcDatetimeAttr ? undefined : this._utcDatetimeAttr)}"
        title="${nativeTitle}"
        tabindex="${clickOn ? 0 : nothing}"
        role="${clickOn ? 'button' : nothing}"
        aria-invalid="${invalid ? 'true' : 'false'}"
        @click="${this._onTimeActivate}"
        @keydown="${this._onTimeKeyDown}"
      >
        ${invalid ? html`${this.invalidDateMessage} &quot;${this._rawDatetimeEcho}&quot;` : this._displayText}
      </time>
    `;

    return html`
      <div class="swim-date-display__root">
        ${showPanel
          ? html`
              <swim-tooltip
                type="${StyleType.popover}"
                placement="${this.tooltipPlacement as PlacementType}"
                css-class="${this.tooltipCssClass}"
                show-timeout="400"
                show-caret="true"
              >
                ${timeTpl}
                <div slot="content" class="swim-date-display__tooltip-body">
                  ${repeat(
                    this._zoneList,
                    z => z.key,
                    z => html`
                      <div class="swim-date-display__zone-row">
                        <span class="swim-date-display__zone-label">${z.display}</span>
                        <swim-button
                          class="swim-date-display__copy-btn"
                          variant="bordered"
                          size="small"
                          type="button"
                          @click="${(e: Event) => {
                            e.stopPropagation();
                            void this._copyRow(z.key);
                          }}"
                        >
                          <swim-icon font-icon="copy"></swim-icon>
                          ${z.key}
                        </swim-button>
                      </div>
                    `
                  )}
                </div>
              </swim-tooltip>
            `
          : timeTpl}
      </div>
    `;
  }

  protected updated(_changed: PropertyValues): void {
    super.updated(_changed);
    this.toggleAttribute('invalid', this._dateInvalid);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG]: SwimDateDisplay;
  }
}
