import { LitElement, html, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { baseStyles } from '../../styles/base';
import { iconStyles } from './icon.styles';
import { scheduleEnsureSwimUiIconFontFace } from './icon-font-face';
import { iconRegistry } from '../../utils/icon-registry';

scheduleEnsureSwimUiIconFontFace();

/**
 * SwimIcon - Icon component matching @swimlane/ngx-ui design system.
 * Uses a font icon (`fontIcon` + `fontSet`), an image (`src`), or slotted content.
 * When `src` is set, the image is shown. If it fails to load, the font icon or slot is shown.
 * A failed image with no font icon keeps the 1em box.
 * Existing `font-icon` usage is unchanged when `src` is empty.
 *
 * Registers @font-face for SWIM_ICON_FONT_FAMILY when this module loads (CDN / bundled apps).
 * Hosts may still override with their own @font-face if they prefer a different asset URL.
 *
 * @slot - Default content when no fontIcon and no src (e.g. slotted swim-icon or image)
 *
 * @csspart icon - The icon element (img, i, or span)
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
   * Icon set name for font icons (e.g. "lit"). Used to expand keys like "arrow-left" to "lit:arrow-left".
   */
  @property({ type: String, attribute: 'font-set' })
  fontSet = 'lit';

  /**
   * Optional CSS class(es) applied to the host and to the actual icon element (the inner <i> or icon part).
   * Reflected to the host so selectors like .scrollbars-demo-icon work; inherited styles (e.g. font-size) apply to the icon.
   */
  @property({ type: String, attribute: 'icon-class' })
  iconClass = '';

  /**
   * Image URL. When set, the image replaces the font icon until it fails to load.
   * Same role as `src` on `ngx-card-avatar` / `swim-card-avatar`, sized to the icon box.
   */
  @property({ type: String })
  src = '';

  @state()
  private _cssClasses: string[] = [];

  @state()
  private _srcFailed = false;

  private _iconClassTokensOnHost: string[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this._updateFontIcon();
  }

  willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('fontIcon') || changedProperties.has('fontSet')) {
      this._updateFontIcon();
    }
    if (changedProperties.has('src')) {
      this._srcFailed = false;
    }
  }

  updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.has('iconClass')) {
      this._syncIconClassToHost();
    }
  }

  /** Marks the image as failed only if the error belongs to the current `src`. */
  private _onImgError(failedSrc: string): void {
    if (failedSrc === (this.src?.trim() ?? '')) {
      this._srcFailed = true;
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
    const src = this.src?.trim() ?? '';

    if (src && !this._srcFailed) {
      // keyed: a new <img> per URL, so a late error from an earlier URL fires on the
      // old element with the old URL captured and is ignored by _onImgError.
      return keyed(
        src,
        html`
          <img
            part="icon"
            class="swim-icon__img ${iconClass}"
            src=${src}
            alt=${hasAlt ? this.alt : ''}
            draggable="false"
            @error=${() => this._onImgError(src)}
          />
        `
      );
    }

    if (!classes || classes.length === 0) {
      const fallbackClass = src ? 'swim-icon__fallback' : '';
      const slotClass = [fallbackClass, iconClass].filter(Boolean).join(' ');
      return html`
        <span
          part="icon"
          class="${slotClass}"
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
