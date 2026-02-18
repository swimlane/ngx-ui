import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { iconStyles } from './icon.styles';
import { iconRegistry } from '../../utils/icon-registry';
import { ensureIconFontLoaded } from './icon-font-loader';

/**
 * SwimIcon - Icon component matching @swimlane/ngx-ui design system.
 * Uses swim/ngx font icons only (via fontIcon + fontSet) or slotted content (e.g. another swim-icon).
 *
 * The icon font is self-contained: a base64-encoded woff2 font is automatically
 * injected into the document head on first connection using a unique font-family
 * name ('swim-ngx-icon') to avoid conflicts with the host application's ngx-icon font.
 *
 * @slot - Default content when no fontIcon (e.g. slotted swim-icon or image)
 *
 * @csspart icon - The icon element (i or span)
 */
const ICON_TAG = 'swim-icon';
export class SwimIcon extends LitElement {
  static styles = [baseStyles, iconStyles];

  /**
   * Font icon name(s). Single string or JSON array for stacked icons (e.g. font-icon='["square-filled","x"]').
   */
  @property({ type: String, attribute: 'font-icon' })
  fontIcon: string | string[] = '';

  /**
   * Accessible label when the icon conveys meaning. When set, role="img" and aria-label are applied.
   */
  @property({ type: String })
  alt = '';

  /**
   * Icon set name for font icons (e.g. "ngx"). Used to expand keys like "arrow-left" to "ngx:arrow-left".
   */
  @property({ type: String, attribute: 'font-set' })
  fontSet = 'ngx';

  /**
   * Optional CSS class(es) applied to the host and to the actual icon element (the inner <i> or icon part).
   * Reflected to the host so selectors like .scrollbars-demo-icon work; inherited styles (e.g. font-size) apply to the icon.
   */
  @property({ type: String, attribute: 'icon-class' })
  iconClass = '';

  @state()
  private _cssClasses: string[] = [];

  private _iconClassTokensOnHost: string[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    ensureIconFontLoaded();
    this._updateFontIcon();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('fontIcon') || changedProperties.has('fontSet')) {
      this._updateFontIcon();
    }
    if (changedProperties.has('iconClass')) {
      this._syncIconClassToHost();
    }
  }

  private _syncIconClassToHost(): void {
    const tokens = (this.iconClass?.trim() ?? '').split(/\s+/).filter(Boolean);
    this._iconClassTokensOnHost.forEach(c => this.classList.remove(c));
    tokens.forEach(c => this.classList.add(c));
    this._iconClassTokensOnHost = tokens;
  }

  private _parseFontIcon(value: string | string[]): string[] {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value !== 'string' || !value) return [];
    const trimmed = value.trim();
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed) as string[];
        return Array.isArray(parsed) ? parsed : [trimmed];
      } catch {
        return [trimmed];
      }
    }
    return [trimmed];
  }

  private _updateFontIcon(): void {
    const names = this._parseFontIcon(this.fontIcon);
    if (names.length === 0) {
      this._cssClasses = [];
      return;
    }
    this._cssClasses = iconRegistry.get(names, this.fontSet);
  }

  render() {
    const classes = this._cssClasses;
    const hasAlt = Boolean(this.alt);

    const iconClass = this.iconClass?.trim() ?? '';
    const iconClassAttr = iconClass ? ` ${iconClass}` : '';

    if (!classes || classes.length === 0) {
      return html`
        <span
          part="icon"
          class="${iconClass}"
          role="${hasAlt ? 'img' : 'presentation'}"
          aria-label="${hasAlt ? this.alt : nothing}"
          aria-hidden="${hasAlt ? 'false' : 'true'}"
        >
          <slot></slot>
        </span>
      `;
    }

    if (classes.length === 1) {
      return html`
        <i
          part="icon"
          class="swim-icon__i ${classes[0]}${iconClassAttr}"
          role="${hasAlt ? 'img' : 'presentation'}"
          aria-label="${hasAlt ? this.alt : nothing}"
          aria-hidden="${hasAlt ? 'false' : 'true'}"
        ></i>
      `;
    }

    return html`
      <span
        class="swim-icon__stack"
        role="${hasAlt ? 'img' : 'presentation'}"
        aria-label="${hasAlt ? this.alt : nothing}"
        aria-hidden="${hasAlt ? 'false' : 'true'}"
      >
        ${classes.map(
          (c, i) => html`<i part="icon icon-${i}" class="swim-icon__i swim-icon__i--${i} ${c}${iconClassAttr}"></i>`
        )}
      </span>
    `;
  }
}

if (!customElements.get(ICON_TAG)) {
  customElements.define(ICON_TAG, SwimIcon);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-icon': SwimIcon;
  }
}
