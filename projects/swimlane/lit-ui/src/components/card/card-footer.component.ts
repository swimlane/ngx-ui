import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cardFooterComponentStyles } from './card-footer.styles';

/**
 * SwimCardFooter - Card footer section. Used inside swim-card.
 *
 * @slot - Footer content (e.g. actions).
 */
@customElement('swim-card-footer')
export class SwimCardFooter extends LitElement {
  static styles = cardFooterComponentStyles;

  /** Optional label for vertical card (shown above footer with line). */
  @property({ type: String })
  label = '';

  render() {
    return html`
      ${this.label ? html`<div class="swim-card-footer__label">${this.label}</div>` : nothing}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-card-footer': SwimCardFooter;
  }
}
