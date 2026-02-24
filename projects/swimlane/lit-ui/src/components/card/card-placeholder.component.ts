import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { cardPlaceholderComponentStyles } from './card-placeholder.styles';
import { CardPlaceholderSize } from './card-placeholder-size.enum';

/**
 * SwimCardPlaceholder - Skeleton placeholder bar for card content. Used inside swim-card sections.
 */
const CARD_PLACEHOLDER_TAG = 'swim-card-placeholder';
export class SwimCardPlaceholder extends LitElement {
  static styles = cardPlaceholderComponentStyles;

  /** Size of the placeholder bar: small, medium, or large. */
  @property({ type: String, reflect: true })
  size: CardPlaceholderSize | 'small' | 'medium' | 'large' = CardPlaceholderSize.Medium;

  render() {
    return html``;
  }
}

if (!customElements.get(CARD_PLACEHOLDER_TAG)) {
  customElements.define(CARD_PLACEHOLDER_TAG, SwimCardPlaceholder);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-card-placeholder': SwimCardPlaceholder;
  }
}
