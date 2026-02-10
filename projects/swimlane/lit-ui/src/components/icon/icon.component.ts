import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { iconStyles } from './icon.styles';
import { iconRegistry } from '../../utils/icon-registry';

/**
 * SwimIcon - Icon component matching @swimlane/ngx-ui design system.
 * Uses swim/ngx font icons only (via fontIcon + fontSet) or slotted content (e.g. another swim-icon).
 * The host app must load the ngx-icon font CSS and woff when using fontIcon.
 *
 * @slot - Default content when no fontIcon (e.g. slotted swim-icon or image)
 *
 * @csspart icon - The icon element (i or span)
 */
@customElement('swim-icon')
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

  @state()
  private _cssClasses: string[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this._updateFontIcon();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('fontIcon') || changedProperties.has('fontSet')) {
      this._updateFontIcon();
    }
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

    if (!classes || classes.length === 0) {
      return html`
        <span
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
          class="swim-icon__i ${classes[0]}"
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
        ${classes.map((c, i) => html`<i part="icon icon-${i}" class="swim-icon__i swim-icon__i--${i} ${c}"></i>`)}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-icon': SwimIcon;
  }
}
