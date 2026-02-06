import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { baseStyles } from '../../styles/base';
import { iconStyles } from './icon.styles';
import { iconRegistry } from '../../utils/icon-registry';

/**
 * SwimIcon - Icon component matching @swimlane/ngx-ui design system.
 * Supports font icons (via fontIcon + fontSet), inline SVG (via svgSrc), or slotted content.
 * The host app must load the ngx-icon font CSS and woff when using fontIcon.
 *
 * @slot - Default content when no fontIcon or svgSrc (e.g. custom SVG or image)
 *
 * @csspart icon - The icon element (i or span for font, wrapper for SVG)
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
   * Base path for SVG loading when using svgSrc.
   */
  @property({ type: String, attribute: 'default-path' })
  defaultPath = 'assets/svgs';

  /**
   * Icon set name for font icons (e.g. "ngx"). Used to expand keys like "arrow-left" to "ngx:arrow-left".
   */
  @property({ type: String, attribute: 'font-set' })
  fontSet = 'ngx';

  /**
   * SVG filename (without .svg) to load from defaultPath and render inline.
   */
  @property({ type: String, attribute: 'svg-src' })
  get svgSrc(): string {
    return this._svgSrc;
  }
  set svgSrc(val: string) {
    if (this._svgSrc !== val) {
      this._svgSrc = val ?? '';
      this._loadSvg(this._svgSrc);
    }
  }
  private _svgSrc = '';

  @state()
  private _cssClasses: string[] = [];

  @state()
  private _svgContent = '';

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

  private async _loadSvg(val: string): Promise<void> {
    if (!val) {
      this._svgContent = '';
      return;
    }
    const url = `${this.defaultPath}/${val}.svg`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'image/svg+xml');
      const svgEl = doc.documentElement;
      if (svgEl && svgEl.tagName === 'svg') {
        this._svgContent = svgEl.outerHTML;
      } else {
        this._svgContent = '';
      }
    } catch (err) {
      console.error('[swim-icon] Failed to load SVG:', url, err);
      this._svgContent = '';
    }
  }

  render() {
    if (this._svgContent) {
      return html`
        <span
          class="swim-icon__svg"
          role="${this.alt ? 'img' : 'presentation'}"
          aria-label="${this.alt || nothing}"
          aria-hidden="${this.alt ? 'false' : 'true'}"
        >
          ${unsafeSVG(this._svgContent)}
        </span>
      `;
    }

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
