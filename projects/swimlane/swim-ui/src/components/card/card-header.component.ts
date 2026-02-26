import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { cardHeaderComponentStyles } from './card-header.styles';

/**
 * SwimCardHeader - Card header section. Used inside swim-card.
 *
 * @slot - Default content (e.g. extra content in title group).
 * @slot avatar - Card avatar (swim-card-avatar).
 * @slot tag - Tag line above title.
 * @slot title - Main title.
 * @slot subtitle - Subtitle below title.
 */
const CARD_HEADER_TAG = 'swim-card-header';
export class SwimCardHeader extends LitElement {
  static styles = cardHeaderComponentStyles;

  /** Optional label for vertical card (shown below header with line). */
  @property({ type: String })
  label = '';

  /** Set by parent or for styling: 'horizontal' | 'vertical'. */
  @property({ type: String, reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  render() {
    return html`
      <slot name="avatar"></slot>
      <div class="swim-card-header__title-group">
        <slot></slot>
        ${this.label ? html`<div class="swim-card-header__label">${this.label}</div>` : nothing}
        <slot name="tag"></slot>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </div>
    `;
  }
}

if (!customElements.get(CARD_HEADER_TAG)) {
  customElements.define(CARD_HEADER_TAG, SwimCardHeader);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-card-header': SwimCardHeader;
  }
}
