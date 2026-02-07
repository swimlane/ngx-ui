import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cardBodyComponentStyles } from './card-body.styles';

/**
 * SwimCardBody - Body section for vertical cards. Used inside swim-card.
 *
 * @slot - Body content (e.g. title, subtitle, description).
 */
@customElement('swim-card-body')
export class SwimCardBody extends LitElement {
  static styles = cardBodyComponentStyles;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-card-body': SwimCardBody;
  }
}
