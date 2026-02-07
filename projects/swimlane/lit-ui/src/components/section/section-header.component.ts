import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { sectionHeaderStyles } from './section-header.styles';

/**
 * SwimSectionHeader - Custom header content for swim-section.
 * Place content in the default slot; it will appear in the section header bar.
 *
 * @slot - Default slot for header content (e.g. custom title, links, actions)
 */
@customElement('swim-section-header')
export class SwimSectionHeader extends LitElement {
  static styles = sectionHeaderStyles;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-section-header': SwimSectionHeader;
  }
}
