import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cardPlaceholderComponentStyles } from './card-placeholder.styles';
import { CardPlaceholderSize } from './card-placeholder-size.enum';

/**
 * SwimCardPlaceholder - Skeleton placeholder bar for card content. Used inside swim-card sections.
 */
@customElement('swim-card-placeholder')
export class SwimCardPlaceholder extends LitElement {
  static styles = cardPlaceholderComponentStyles;

  /** Size of the placeholder bar: small, medium, or large. */
  @property({ type: String, reflect: true })
  size: CardPlaceholderSize | 'small' | 'medium' | 'large' = CardPlaceholderSize.Medium;

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-card-placeholder': SwimCardPlaceholder;
  }
}
