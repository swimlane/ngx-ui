import { LitElement, html } from 'lit';
import { cardBodyComponentStyles } from './card-body.styles';

const CARD_BODY_TAG = 'swim-card-body';

/**
 * SwimCardBody - Body section for vertical cards. Used inside swim-card.
 *
 * @slot - Body content (e.g. title, subtitle, description).
 */
export class SwimCardBody extends LitElement {
  static styles = cardBodyComponentStyles;

  render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get(CARD_BODY_TAG)) {
  customElements.define(CARD_BODY_TAG, SwimCardBody);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-card-body': SwimCardBody;
  }
}
